import { auth } from '@clerk/nextjs/server';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  // const { sessionId } = auth();
  // console.log(sessionId);
  return Response.json({ message: 'good job' });
}
