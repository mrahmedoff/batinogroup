import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const contentPath = path.join(process.cwd(), 'src/data/content.json');

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  try {
    const fileContents = fs.readFileSync(contentPath, 'utf8');
    const data = JSON.parse(fileContents);
    return NextResponse.json(data.messages || []);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read messages' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const message = await request.json();
    const fileContents = fs.readFileSync(contentPath, 'utf8');
    const data = JSON.parse(fileContents);
    
    if (!data.messages) {
      data.messages = [];
    }
    
    // Add new message with timestamp
    const newMessage = {
      ...message,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('az-AZ', { hour: '2-digit', minute: '2-digit' }),
      unread: true,
    };
    
    data.messages.unshift(newMessage);
    fs.writeFileSync(contentPath, JSON.stringify(data, null, 2));
    
    return NextResponse.json({ success: true, message: newMessage });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save message' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();
    const fileContents = fs.readFileSync(contentPath, 'utf8');
    const data = JSON.parse(fileContents);
    
    data.messages = data.messages.filter((m: any) => m.id !== id);
    fs.writeFileSync(contentPath, JSON.stringify(data, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete message' }, { status: 500 });
  }
}
