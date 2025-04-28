import { NextResponse } from 'next/server';
import prisma from '@/lib/prismadb';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const listing = await prisma.listing.findUnique({
      where: {
        id: params.id
      },
      include: {
        images: true,
        location: true,
        user: {
          select: {
            name: true,
            email: true,
            image: true
          }
        }
      }
    });

    if (!listing) {
      return new NextResponse('Không tìm thấy phòng trọ', { status: 404 });
    }

    return NextResponse.json(listing);
  } catch (error) {
    console.error('[LISTING_GET]', error);
    return new NextResponse('Internal error', { status: 500 });
  }
} 