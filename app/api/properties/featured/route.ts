import { NextResponse } from 'next/server';
import { mockProperties } from '../../mock-data';

export async function GET() {
  try {
    // Filter featured properties from mock data
    const featuredProperties = mockProperties.filter(property => property.isFeatured);
    
    return NextResponse.json(featuredProperties);
  } catch (error) {
    console.error("Error fetching featured properties:", error);
    return NextResponse.json(
      { error: "Failed to fetch featured properties" },
      { status: 500 }
    );
  }
}