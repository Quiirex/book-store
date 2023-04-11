import { PrismaClient } from '@prisma/client';

declare global {
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

async function connectToDatabase() {
  try {
    await prisma.$connect();
    console.log('> Connected to the database');
  } catch {
    console.error('> Failed to connect to the database');
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

export default connectToDatabase;
