import { NextRequest } from 'next/server';
import { collectAccounts } from '@/lib/crud';

export async function GET() {
  const accounts = await collectAccounts();
  return Response.json({ data: accounts });
}

export async function POST(request: NextRequest) {}
