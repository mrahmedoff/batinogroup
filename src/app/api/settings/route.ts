import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const contentPath = path.join(process.cwd(), 'src/data/content.json');

export async function GET() {
  try {
    const fileContents = fs.readFileSync(contentPath, 'utf8');
    const data = JSON.parse(fileContents);
    return NextResponse.json({
      settings: data.settings || {},
      contact: data.contact || {},
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read settings' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { settings, contact } = await request.json();
    const fileContents = fs.readFileSync(contentPath, 'utf8');
    const data = JSON.parse(fileContents);
    
    if (settings) {
      data.settings = { ...data.settings, ...settings };
    }
    
    if (contact) {
      data.contact = { ...data.contact, ...contact };
    }
    
    fs.writeFileSync(contentPath, JSON.stringify(data, null, 2));
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to save settings' }, { status: 500 });
  }
}
