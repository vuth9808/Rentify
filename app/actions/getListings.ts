import prisma from "@/lib/prismadb";

export interface IListingsParams {
  userId?: string;
  locationValue?: string;
  category?: string;
  bathroomCount?: number;
  roomCount?: number;
  startDate?: string;
  endDate?: string;
  price?: {
    gte?: number;
    lte?: number;
  };
}

export default async function getListings(
  params: IListingsParams = {}
) {
  try {
    const {
      userId,
      locationValue,
      category,
      roomCount, 
      bathroomCount,
      startDate,
      endDate,
      price,
    } = params;

    let query: any = {};

    if (userId) {
      query.userId = userId;
    }

    if (locationValue) {
      query.locationValue = locationValue;
    }

    if (category) {
      query.category = category;
    }

    if (roomCount) {
      query.roomCount = {
        gte: +roomCount
      };
    }

    if (bathroomCount) {
      query.bathroomCount = {
        gte: +bathroomCount
      };
    }

    if (price?.gte) {
      query.price = {
        ...query.price,
        gte: +price.gte,
      };
    }

    if (price?.lte) {
      query.price = {
        ...query.price,
        lte: +price.lte,
      };
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        user: true
      }
    });

    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
      user: {
        ...listing.user,
        createdAt: listing.user.createdAt.toISOString(),
        updatedAt: listing.user.updatedAt.toISOString(),
        emailVerified: listing.user.emailVerified?.toISOString() || null,
      }
    }));

    return safeListings;
  } catch (error: any) {
    throw new Error(error);
  }
} 