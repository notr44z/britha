const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env.local') });
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
(async () => {
  try {
    console.log('DATABASE_URL=', process.env.DATABASE_URL);
    await prisma.$connect();
    console.log('CONNECTED');
    await prisma.$disconnect();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
