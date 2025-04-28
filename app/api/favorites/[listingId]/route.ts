// @ts-nocheck
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prismadb";

export async function POST(
  request: NextRequest,
  { params }: { params: { listingId: string } }
): Promise<NextResponse> {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { listingId } = params;

    if (!listingId || typeof listingId !== "string") {
      return new NextResponse("Invalid ID", { status: 400 });
    }

    let favoriteIds = [...(session.user.favoriteIds || [])];
    favoriteIds.push(listingId);

    const user = await prisma.user.update({
      where: {
        email: session.user.email
      },
      data: {
        favoriteIds
      }
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("[FAVORITES_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { listingId: string } }
): Promise<NextResponse> {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { listingId } = params;

    if (!listingId || typeof listingId !== "string") {
      return new NextResponse("Invalid ID", { status: 400 });
    }

    let favoriteIds = [...(session.user.favoriteIds || [])];
    favoriteIds = favoriteIds.filter((id) => id !== listingId);

    const user = await prisma.user.update({
      where: {
        email: session.user.email
      },
      data: {
        favoriteIds
      }
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error("[FAVORITES_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
} 