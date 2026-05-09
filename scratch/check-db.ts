
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const records = await prisma.record.findMany();
  console.log('RECORDS:', JSON.stringify(records, null, 2));
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
