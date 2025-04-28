import bcrypt from "bcrypt"
import { NextResponse } from "next/server"
import prisma from "@/lib/prismadb"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, name, password } = body

    if (!email || !name || !password) {
      return NextResponse.json({ code: 'INVALID_INPUT', error: "Thiếu thông tin đăng ký" }, { status: 400 })
    }

    // Kiểm tra email đã tồn tại chưa
    const existingUser = await prisma.user.findUnique({
      where: {
        email
      }
    })

    if (existingUser) {
      return NextResponse.json({ code: 'EMAIL_EXISTS', error: "Email đã được sử dụng" }, { status: 400 })
    }

    // Mã hóa mật khẩu
    const hashedPassword = await bcrypt.hash(password, 12)

    // Tạo user mới
    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
      }
    })

    return NextResponse.json(user)
  } catch (error) {
    console.log("[REGISTER_ERROR]", error)
    return NextResponse.json({ code: 'SERVER_ERROR', error: "Lỗi đăng ký" }, { status: 500 })
  }
} 