import { PrismaClient } from "./generated/prisma/client";
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({ 
  connectionString: process.env.DATABASE_URL 
});

export const db = new PrismaClient({ adapter });

// Disconnecting prisma gracefully after server shutdown
process.on("beforeExit", async () => {
  await db.$disconnect();
});

