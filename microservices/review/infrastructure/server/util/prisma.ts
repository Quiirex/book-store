import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

async function connectToDatabase() {
  while (true) {
    try {
      await prisma.$connect();
      console.log('> Connected to the database');
      break;
    } catch {
      console.error(
        '> Failed to connect to the database. Retrying in 5 seconds...',
      );
      await new Promise((resolve) => setTimeout(resolve, 5000));
    }
  }
}

export default connectToDatabase;
