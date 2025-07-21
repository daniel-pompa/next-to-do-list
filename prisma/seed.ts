import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Truncate tables in order to avoid FK conflicts and replica identity errors
  await prisma.$executeRawUnsafe('TRUNCATE TABLE "Session" CASCADE;');
  await prisma.$executeRawUnsafe('TRUNCATE TABLE "Account" CASCADE;');
  await prisma.$executeRawUnsafe('TRUNCATE TABLE "Task" CASCADE;');
  await prisma.$executeRawUnsafe('TRUNCATE TABLE "User" CASCADE;');

  const email = 'john.doe@example.com';
  const hashedPassword = bcrypt.hashSync('J0hnD03!', 10);

  await prisma.user.create({
    data: {
      name: 'John Doe',
      email,
      password: hashedPassword,
      roles: ['admin', 'user'],
      tasks: {
        create: [
          {
            title: 'Next.js Fundamentals',
            description:
              'Master routing, pages, and rendering in Next.js for efficient development.',
          },
          {
            title: 'TypeScript Proficiency',
            description:
              'Enhance your coding skills with strong typing, interfaces, and classes.',
            complete: true,
          },
          {
            title: 'UI Design with Tailwind CSS',
            description:
              'Build responsive, mobile-first user interfaces using Tailwind CSS.',
          },
          {
            title: 'Database Management with Prisma',
            description:
              'Integrate Prisma ORM for robust and type-safe database operations.',
          },
          {
            title: 'PostgreSQL with Docker',
            description:
              'Set up and run PostgreSQL databases using Docker for local development.',
          },
          {
            title: 'Full-Stack Development',
            description:
              'Build a full-stack application connecting Next.js with a PostgreSQL database.',
          },
        ],
      },
    },
  });

  console.log('✅ Database seeded successfully!');
}

if (process.env.NODE_ENV !== 'production') {
  main()
    .catch(e => {
      console.error('❌ Error seeding database:', e);
      process.exit(1);
    })
    .finally(async () => {
      await prisma.$disconnect();
    });
} else {
  console.log('⛔ Seeding skipped: NODE_ENV is production');
}
