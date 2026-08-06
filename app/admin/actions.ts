'use server';

import { prisma } from '@/lib/prisma';
import { DepositStatus } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export async function updateDepositStatus(
  depositId: string,
  newStatus: DepositStatus
) {
  try {
    await prisma.$transaction(async (tx) => {
      // 1. Fetch current deposit details
      const deposit = await tx.deposit.findUnique({
        where: { id: depositId },
        select: { id: true, status: true, amountUsd: true, userId: true },
      });

      if (!deposit) throw new Error('Deposit record not found');
      if (deposit.status === newStatus) return; // Prevent redundant updates

      // 2. Determine balance adjustment logic
      const amount = Number(deposit.amountUsd);
      let balanceAdjustment = 0;

      // Transitioning into APPROVED -> Add balance
      if (newStatus === DepositStatus.APPROVED && deposit.status !== DepositStatus.APPROVED) {
        balanceAdjustment = amount;
      } 
      // Reverting from APPROVED to something else -> Deduct balance
      else if (deposit.status === DepositStatus.APPROVED && newStatus !== DepositStatus.APPROVED) {
        balanceAdjustment = -amount;
      }

      // 3. Update User Balance if needed
      if (balanceAdjustment !== 0) {
        await tx.user.update({
          where: { id: deposit.userId },
          data: {
            balance: {
              increment: balanceAdjustment,
            },
          },
        });
      }

      // 4. Update Deposit Status
      await tx.deposit.update({
        where: { id: depositId },
        data: { status: newStatus },
      });
    });

    // 5. Instantly refresh server components
    revalidatePath('/admin');
    return { success: true };
  } catch (error) {
    console.error('Failed to update deposit status:', error);
    return { success: false, error: 'Database update failed' };
  }
}