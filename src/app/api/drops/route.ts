import { NextRequest } from 'next/server';
import { addDrop, collectDrops } from '@/lib/crud';
import { DropFilters, FreshDrop } from '@/lib/types';

export async function GET(request: NextRequest) {
  const buckets = request?.nextUrl?.searchParams.getAll('bucket');
  const accounts = request?.nextUrl?.searchParams.getAll('account');

  const filters: DropFilters = {
    accounts,
    buckets
  };

  const drops = await collectDrops(filters);

  return Response.json({ data: drops });
}

export async function POST(request: NextRequest) {
  const freshDrop: FreshDrop = await request.json();
  await addDrop(freshDrop);
}
