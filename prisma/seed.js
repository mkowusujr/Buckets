const xlsx = require('xlsx');
const path = require('path');
const { PrismaClient } = require('@prisma/client');

const prismaClientSingleton = () => {
  return new PrismaClient();
};

// Use a global prisma singleton in dev to avoid exhausting connections
if (!global.prisma) {
  global.prisma = prismaClientSingleton();
}
const prisma = global.prisma;

// Convert Excel serial date to JS Date
const xlsxDateToJsDate = serial => new Date((serial - 25569) * 86400 * 1000);

const addDrop = async drop => {
  await prisma.drop.create({
    data: {
      name: drop.name,
      date: drop.date,
      price: drop.price,
      bucket: {
        connectOrCreate: {
          where: { name: drop.bucket.toLowerCase() },
          create: { name: drop.bucket.toLowerCase() }
        }
      },
      account: {
        connectOrCreate: {
          where: { name: drop.account.toLowerCase() },
          create: { name: drop.account.toLowerCase() }
        }
      }
    }
  });
};

const sheetPath = path.resolve(__dirname, 'Buckets.xlsx');
console.log('Loading sheet from:', sheetPath);

const workbook = xlsx.readFile(sheetPath);
const worksheet = workbook.Sheets['Drops'];

const rows = xlsx.utils.sheet_to_json(worksheet).map(r => ({
  name: r['Item name'],
  bucket: r.Type,
  price: r.Price,
  account: r.Card,
  date: xlsxDateToJsDate(r.Date).toISOString()
}));

async function seed() {
  for (const r of rows) {
    try {
      await addDrop(r);
    } catch (e) {
      console.error('Failed creating entry:', e);
    }
  }
}

seed()
  .then(() => {
    console.log('Seeding complete.');
    process.exit(0);
  })
  .catch(err => {
    console.error('Seeding failed:', err);
    process.exit(1);
  });
