import { NextResponse } from "next/server"
import { uploadImage } from "@/lib/cloudinary"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { image } = body

    if (!image) {
      return new NextResponse("No image provided", { status: 400 })
    }

    const result = await uploadImage(image)
    return NextResponse.json(result)
  } catch (error) {
    console.error("[UPLOAD_POST]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
} 