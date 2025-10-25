import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

// Force dynamic rendering
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  try {
    const contentPath = path.join(process.cwd(), 'src/data/content.json');
    const fileContents = fs.readFileSync(contentPath, 'utf8');
    const data = JSON.parse(fileContents);
    
    return NextResponse.json({ 
      maintenanceMode: data.settings?.maintenanceMode || false 
    });
  } catch (error) {
    return NextResponse.json({ maintenanceMode: false }, { status: 500 });
  }
}
