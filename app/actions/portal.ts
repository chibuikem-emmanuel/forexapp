'use server';

import { prisma } from '@/lib/prisma';
import { DepositStatus } from '@prisma/client';
import { revalidatePath } from 'next/cache';

// Helper to generate unique user code
function generateUserCode(): string {
  return 'USR-' + Math.floor(100000 + Math.random() * 900000);
}

// Helper to generate deposit reference
function generateDepositRef(): string {
  return 'DEP-' + Math.floor(100000 + Math.random() * 900000);
}

export async function registerUser(data: {
  fullName: string;
  email: string;
  telegram?: string;
  country?: string;
  service: string;
  capitalPlan?: string;
  password?: string;
}) {
  // Ensure password is provided since the Prisma schema requires it
  if (!data.password || data.password.trim() === '') {
    return { success: false, error: 'Password is required to create an account.' };
  }

  const userCode = generateUserCode();

  try {
    const user = await prisma.user.create({
      data: {
        userCode,
        fullName: data.fullName,
        email: data.email,
        telegram: data.telegram || null,
        service: data.service,
        password: data.password, // Added required password field
      },
    });

    return { success: true, userId: user.id };
  } catch (error) {
    console.error('Error creating user:', error);
    return { success: false, error: 'Failed to create user account.' };
  }
}

export async function createDeposit(data: {
  userId: string;
  amountUsd: number;
  coin: string;
  network: string;
}) {
  const deposit = await prisma.deposit.create({
    data: {
      reference: generateDepositRef(),
      userId: data.userId,
      amountUsd: data.amountUsd,
      coin: data.coin,
      network: data.network,
      status: DepositStatus.PENDING,
    },
  });

  revalidatePath('/admin');
  return { success: true, depositId: deposit.id };
}

export async function updateDepositStatus(depositId: string, status: DepositStatus) {
  await prisma.deposit.update({
    where: { id: depositId },
    data: { status },
  });

  revalidatePath('/admin');
  return { success: true };
}