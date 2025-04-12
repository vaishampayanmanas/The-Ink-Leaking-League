// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      username: 'Manas',
      email: 'vaishampayanmanas@gmail.com',
      password: bcrypt.hashSync('Manas2013', 12), // ideally hash this
      goal: -1,
      role: 'Owner',
    },
  });

  console.log('✅ Seeded user');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
