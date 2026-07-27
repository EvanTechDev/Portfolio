import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get('token');
  
  // Check for a valid token to prevent abuse
  if (token !== process.env.REVALIDATION_TOKEN) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
  }
  
  // Revalidate the sitemap and relevant pages
  revalidatePath('/sitemap.xml');
  revalidatePath('/blog');
  
  return NextResponse.json({ revalidated: true, now: Date.now() });
} 