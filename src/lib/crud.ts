import { prisma } from '@/lib/prisma';
import { FreshDrop, DropFilters } from './types';

export const addDrop = async (drop: FreshDrop) => {
  await prisma.drop.create({
    data: {
      name: drop.name,
      date: drop.date,
      price: drop.price,
      bucket: {
        connectOrCreate: {
          where: { name: drop.bucket },
          create: { name: drop.bucket }
        }
      },
      account: {
        connectOrCreate: {
          where: { name: drop.account },
          create: { name: drop.account }
        }
      }
    }
  });
};

export const collectDrops = async (filters: DropFilters) => {
  const drops = await prisma.drop.findMany({
    where: {
      ...(filters.buckets.length > 0 && {
        bucket: {
          name: {
            in: filters.buckets
          }
        }
      }),
      ...(filters.accounts.length > 0 && {
        account: {
          name: {
            in: filters.accounts
          }
        }
      })
    },
    include: {
      bucket: true,
      account: true
    }
  });

  return drops;
};

export const collectBuckets = async () => {
  return (await prisma.bucket.findMany({ select: { name: true } })).map(
    b => b.name
  );
};

export const collectAccounts = async () => {
  return (await prisma.account.findMany({ select: { name: true } })).map(
    a => a.name
  );
};
