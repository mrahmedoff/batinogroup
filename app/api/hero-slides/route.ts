import { NextRequest, NextResponse } from 'next/server';
import { addDocument, updateDocument, deleteDocument, getDocuments } from '@/lib/firebaseHelpers';

export async function GET() {
  try {
    console.log('=== GET /api/hero-slides ===');
    console.log('Environment check:', {
      hasApiKey: !!process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      hasProjectId: !!process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
    });
    
    const slides = await getDocuments('hero-slides');
    console.log('Fetched slides:', slides.length, 'items');
    
    return NextResponse.json(slides);
  } catch (error) {
    console.error('Error fetching hero slides:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : 'No stack trace'
    });
    
    return NextResponse.json({ 
      error: 'Failed to fetch slides',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const slideData = await request.json();
    
    // Remove the id field - Firebase will generate it automatically
    const { id, ...cleanSlideData } = slideData;
    
    console.log('Creating slide with data:', cleanSlideData);
    
    const newSlide = await addDocument('hero-slides', cleanSlideData);
    console.log('Created slide:', newSlide);
    
    return NextResponse.json(newSlide);
  } catch (error) {
    console.error('Error creating hero slide:', error);
    return NextResponse.json({ 
      error: 'Failed to create slide',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const slideData = await request.json();
    const { id, ...updateData } = slideData;
    
    console.log('PUT Request - Slide ID:', id);
    console.log('PUT Request - Update Data:', updateData);
    
    if (!id) {
      console.error('No ID provided for update');
      return NextResponse.json({ error: 'ID is required for update' }, { status: 400 });
    }
    
    const result = await updateDocument('hero-slides', id, updateData);
    console.log('Update result:', result);
    
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error('Error updating hero slide:', error);
    return NextResponse.json({ 
      error: 'Failed to update slide', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();
    console.log('DELETE Request - Slide ID:', id);
    
    if (!id) {
      console.error('No ID provided for delete');
      return NextResponse.json({ error: 'ID is required for delete' }, { status: 400 });
    }
    
    await deleteDocument('hero-slides', id);
    console.log('Delete successful for ID:', id);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting hero slide:', error);
    return NextResponse.json({ 
      error: 'Failed to delete slide', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}