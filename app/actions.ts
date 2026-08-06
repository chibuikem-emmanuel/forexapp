'use server';

import { prisma } from '@/lib/prisma';
import { DepositStatus } from '@prisma/client';

export async function createUserAction(formData: FormData) {
  const userCode = formData.get('userCode') as string;
  const fullName = formData.get('fullName') as string;
  const email = formData.get('email') as string;
  const telegram = formData.get('telegram') as string;
  const service = formData.get('service') as string;

  return await prisma.user.create({
    data: {
      userCode,
      fullName,
      email,
      telegram: telegram || null,
      service,
      password: '', // Default password for schema validation
    },
  });
}

export async function createDepositAction(data: {
  userId: string;
  amountUsd: number;
  coin: string;
  network: string;
  reference: string;
}) {
  return await prisma.deposit.create({
    data: {
      userId: data.userId,
      amount: data.amountUsd,
      amountUsd: data.amountUsd,
      coin: data.coin,
      network: data.network,
      reference: data.reference,
      status: DepositStatus.PENDING,
    },
  });
}