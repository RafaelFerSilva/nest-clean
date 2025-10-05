import { execSync } from "child_process";
import { randomUUID } from "crypto";
import "dotenv/config";

import { PrismaClient } from "generated/prisma";

const prisma = new PrismaClient();

function generatedUniqueDatabaseURL(schemaId: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error(
      "DATABASE_URL is not defined in the environment variables."
    );
  }

  const url = new URL(process.env.DATABASE_URL);

  url.searchParams.set("schema", schemaId);
  return url.toString();
}

const schemaId = randomUUID();

beforeAll(async () => {
  const databaseUrl = generatedUniqueDatabaseURL(schemaId);
  process.env.DATABASE_URL = databaseUrl;
  execSync('pnpm prisma db push', { stdio: 'inherit' })
  console.log(`Connecting to database at ${databaseUrl}`);
});

afterAll(async () => {
  await prisma.$executeRawUnsafe(`DROP SCHEMA IF EXISTS "${schemaId}" CASCADE`)
  await prisma.$disconnect();
  console.log('Database schema dropped and Prisma client disconnected: ', schemaId);
});

export default prisma;
