import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { mockProperties } from '@/app/api/mock-data';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || !session.user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }
    
    // Filter properties by user ID
    const userProperties = mockProperties.filter(p => p.userId === session.user.id);
    
    return NextResponse.json(userProperties);
  } catch (error) {
    console.error("Error fetching user properties:", error);
    return NextResponse.json(
      { error: "Failed to fetch user properties" },
      { status: 500 }
    );
  }
} 