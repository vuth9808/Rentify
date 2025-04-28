/**
 * API Route cho Listings (Phòng trọ)
 * 
 * Các endpoint:
 * GET /api/listings - Lấy danh sách phòng trọ
 * POST /api/listings - Tạo phòng trọ mới
 * 
 * Chức năng:
 * - Lấy danh sách phòng với filter
 * - Tạo phòng mới với đầy đủ thông tin
 * - Xử lý upload hình ảnh
 * - Validate dữ liệu đầu vào
 * - Kiểm tra quyền người dùng
 */

import { NextResponse } from "next/server"
import prisma from "@/lib/prismadb"
import getCurrentUser from "@/app/actions/getCurrentUser"
import { Image, User } from "@/types"

// GET /api/listings - Lấy danh sách phòng trọ
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    
    // Xây dựng query filters
    const where: any = {}
    
    // Thêm các điều kiện lọc từ searchParams
    if (searchParams.has('userId')) {
      where.userId = searchParams.get('userId')
    }
    
    if (searchParams.has('propertyType')) {
      where.propertyType = searchParams.get('propertyType')
    }
    
    // Query database với filters
    const listings = await prisma.property.findMany({
      where,
      include: {
        user: true,
        images: true
      }
    })

    return NextResponse.json(listings)
  } catch (error) {
    console.error('[LISTINGS_GET]', error)
    return new NextResponse('Internal Error', { status: 500 })
  }
}

// POST /api/listings - Tạo phòng trọ mới
export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser()
    const body = await request.json()
    const {
      title,
      description,
      imageSrc,
      images,
      roomCount,
      bathroomCount,
      bedrooms,
      bathrooms,
      price,
      locationValue,
      area,
      type,
      address,
      city,
      district,
      phone,
      latitude,
      longitude,
    } = body

    if (!currentUser) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const property = await prisma.property.create({
      data: {
        title,
        description,
        bedrooms,
        bathrooms,
        price: parseInt(price, 10),
        area: parseFloat(area),
        propertyType: type,
        address,
        city,
        district,
        latitude,
        longitude,
        userId: currentUser.id,
        images: {
          create: images.map((image: Image) => ({
            url: image.url
          }))
        }
      }
    })

    return NextResponse.json(property)
  } catch (error) {
    console.error("[LISTINGS_POST]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
} 