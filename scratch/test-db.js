
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const count = await prisma.record.count();
    console.log('Record count:', count);
  } catch (e) {
    console.error('Error fetching count:', e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
