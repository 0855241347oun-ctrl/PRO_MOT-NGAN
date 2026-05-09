
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function syncEmails() {
  try {
    console.log('Starting sync...');
    // Use raw SQL to update profiles from auth.users
    const result = await prisma.$executeRawUnsafe(`
      UPDATE public.profiles
      SET email = auth.users.email
      FROM auth.users
      WHERE public.profiles.id = auth.users.id
    `);

    console.log('Rows updated:', result);

    // Fetch and show the updated profiles
    const profiles = await prisma.$queryRawUnsafe('SELECT id, full_name, email FROM public.profiles');
    console.log('Updated profiles:', profiles);
  } catch (err) {
    console.error('Error syncing emails:', err);
  } finally {
    await prisma.$disconnect();
  }
}

syncEmails();
