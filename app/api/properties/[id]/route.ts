import { NextResponse } from 'next/server';
import { mockProperties } from '../../mock-data';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id;
    
    // Find property by ID in mock data
    const property = mockProperties.find(p => p.id === id);
    
    if (!property) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }
    
    // Increment views count in a real app this would update the database
    // For mock data, we'll just return the property
    
    return NextResponse.json(property);
  } catch (error) {
    console.error("Error fetching property details:", error);
    return NextResponse.json(
      { error: "Failed to fetch property details" },
      { status: 500 }
    );
  }
} 