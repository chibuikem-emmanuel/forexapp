'use server';

import { prisma } from '@/lib/prisma';
import { DepositStatus } from '@prisma/client';

export interface RegisterUserInput {
  fullName: string;
  email: string;
  telegram?: string;
  service: string;
  country?: string;
  capitalPlan?: string;
  userCode?: string;
  password?: string;
}

export async function registerUser(input: RegisterUserInput | FormData) {
  try {
    let fullName: string;
    let email: string;
    let telegram: string | undefined;
    let service: string;
    let userCode: string;
    let password = '';

    if (input instanceof FormData) {
      fullName = input.get('fullName') as string;
      email = input.get('email') as string;
      telegram = (input.get('telegram') as string) || undefined;
      service = (input.get('service') as string) || (input.get('capitalPlan') as string) || 'Standard';
      userCode = (input.get('userCode') as string) || `FX-${Math.floor(10000 + Math.random() * 90000)}`;
    } else {
      fullName = input.fullName;
      email = input.email;
      telegram = input.telegram;
      service = input.service || input.capitalPlan || 'Standard';
      userCode = input.userCode || `FX-${Math.floor(10000 + Math.random() * 90000)}`;
      password = input.password || '';
    }

    const user = await prisma.user.create({
      data: {
        userCode,
        fullName,
        email,
        telegram: telegram || null,
        service,
        password,
      },
    });

    return {
      success: true,
      userId: user.id,
      userCode: user.userCode,
      user,
    };
  } catch (err: any) {
    return {
      success: false,
      userId: null,
      error: err?.message || 'Failed to register user account.',
    };
  }
}

export async function submitDeposit({
  userId,
  amountUsd,
  coin,
  network,
  reference,
}: {
  userId: string;
  amountUsd: number;
  coin: string;
  network: string;
  reference: string;
}) {
  return await prisma.deposit.create({
    data: {
      userId,
      amount: amountUsd,
      amountUsd,
      coin,
      network,
      reference,
      status: DepositStatus.PENDING,
    },
  });
}