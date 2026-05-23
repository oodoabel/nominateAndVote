import 'dotenv/config';
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { seedNominations } from "./seedNominations";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Starting seed for NominationPayment...");
  try {
    // Use createMany with skipDuplicates to keep existing rows (reference is unique)
    const result = await prisma.nominationPayment.createMany({
      data: seedNominations,
      skipDuplicates: true,
    });
    console.log(`Inserted ${result.count} new nomination(s). Duplicates were skipped.`);
  } catch (error) {
    console.error("Seeding failed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
