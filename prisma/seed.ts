import { PrismaClient, DepositStatus } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  await prisma.deposit.deleteMany();
  await prisma.user.deleteMany();

  const user1 = await prisma.user.create({
    data: {
      userCode: 'USR-1001',
      fullName: 'Alex Morgan',
      email: 'alex.morgan@example.com',
      telegram: '@alex_m',
      service: 'VIP Investment Plan',
      deposits: {
        create: [
          {
            reference: 'DEP-883921',
            coin: 'USDT',
            network: 'TRC20',
            amountUsd: 2500.0,
            status: DepositStatus.APPROVED,
          },
        ],
      },
    },
  });

  console.log(`✅ Seeded user: ${user1.fullName}`);
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