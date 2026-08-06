import { PrismaClient, DepositStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: 'trader@example.com' },
    update: {},
    create: {
      userCode: 'FX-10928',
      fullName: 'Alex Morgan',
      email: 'trader@example.com',
      password: '',
      telegram: '@alexfx',
      service: 'Managed Account',
      balance: 5000,
    },
  });

  await prisma.deposit.create({
    data: {
      userId: user.id,
      amount: 1000,
      amountUsd: 1000,
      coin: 'USDT',
      network: 'TRC20',
      reference: 'REF-849201',
      status: DepositStatus.APPROVED,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });