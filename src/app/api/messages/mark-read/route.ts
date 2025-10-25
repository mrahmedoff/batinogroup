import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const contentPath = path.join(process.cwd(), 'src/data/content.json');

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(request: Request) {
  try {
    const { id } = await request.json();
    
    const fileContents = fs.readFileSync(contentPath, 'utf8');
    const data = JSON.parse(fileContents);
    
    if (!data.messages) {
      return NextResponse.json({ error: 'No messages found' }, { status: 404 });
    }
    
    // Mesajı tap və oxunmuş kimi işarələ
    const message = data.messages.find((m: any) => m.id === id);
    if (message) {
      message.unread = false;
      fs.writeFileSync(contentPath, JSON.stringify(data, null, 2));
      return NextResponse.json({ success: true, message });
    }
    
    return NextResponse.json({ error: 'Message not found' }, { status: 404 });
  } catch (error) {
    console.error('Mark as read error:', error);
    return NextResponse.json({ error: 'Failed to mark as read' }, { status: 500 });
  }
}
