import fs from 'fs';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
(async () => {
  try {
    const raw = fs.readFileSync('data/newsletter.json','utf8');
    const data = JSON.parse(raw);
    for (const r of data) {
      await prisma.newsletterSubscriber.upsert({
        where: { email: r.email },
        update: {},
        create: { email: r.email, sources: r.source || '', consentAt: new Date(r.consentAt || Date.now()) }
      });
    }
    console.log('Seeded', data.length, 'subscribers');
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
})();
