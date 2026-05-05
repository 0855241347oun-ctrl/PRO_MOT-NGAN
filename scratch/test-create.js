
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  try {
    const record = await prisma.record.create({
      data: {
        h1: "Test Title",
        h2: "Test Subtitle",
        h3: "Test Meta",
        content1: "Test Content 1",
        content2: "Test Content 2"
      }
    });
    console.log('Created record:', record);
  } catch (e) {
    console.error('Error creating record:', e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
