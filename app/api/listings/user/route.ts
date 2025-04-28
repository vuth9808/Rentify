import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import prisma from "@/lib/prismadb"
import { Prisma } from "@prisma/client"
import getCurrentUser from "@/app/actions/getCurrentUser"
import { Image, User } from "@/types"

const ROOM_SAMPLES = [
  "room1",
  "room2",
  "room3",
  "room1-2",
  "room2-2",
  "room3-2"
];

export async function GET(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.error();
    }

    const listings = await prisma.property.findMany({
      where: {
        userId: currentUser.id
      },
      include: {
        user: true,
        images: true
      }
    });

    const safeListings = listings.map(listing => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
      user: {
        ...listing.user,
        createdAt: listing.user.createdAt.toISOString(),
        updatedAt: listing.user.updatedAt.toISOString(),
        emailVerified: listing.user.emailVerified?.toISOString() || null,
      }
    }));

    return NextResponse.json(safeListings);
  } catch (error) {
    console.error("[LISTINGS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
} 