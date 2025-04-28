import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb";

export async function GET(request: Request) {
  try {
    const rooms = await prisma.property.findMany({
      include: {
        images: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return NextResponse.json(rooms);
  } catch (error) {
    console.error("Error fetching rooms:", error);
    return NextResponse.json(
      { error: "Có lỗi xảy ra khi tải danh sách phòng" },
      { status: 500 }
    );
  }
} 