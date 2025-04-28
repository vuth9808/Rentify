import { NextResponse } from 'next/server';
import { mockProperties } from '../mock-data';

export async function GET(request: Request) {
  try {
    // Return mock data instead of fetching from database
    return NextResponse.json(mockProperties);
  } catch (error) {
    console.error("Error fetching properties:", error);
    return NextResponse.json(
      { error: "Failed to fetch properties" },
      { status: 500 }
    );
  }
} 