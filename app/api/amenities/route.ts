import { NextResponse } from 'next/server';
import { mockAmenities } from '../mock-data';

export async function GET() {
  try {
    return NextResponse.json(mockAmenities);
  } catch (error) {
    console.error("Error fetching amenities:", error);
    return NextResponse.json(
      { error: "Failed to fetch amenities" },
      { status: 500 }
    );
  }
} 