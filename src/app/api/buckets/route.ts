import { NextRequest } from 'next/server';
import { collectBuckets } from '@/lib/crud';

export async function GET() {
  const buckets = await collectBuckets();
  return Response.json({ data: buckets });
}

export async function POST(request: NextRequest) {}
