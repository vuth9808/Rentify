import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import prisma from '@/lib/prismadb';
import { authOptions } from '@/lib/auth';

export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const body = await request.json();
    const { name, email } = body;

    const user = await prisma.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        name,
        email,
      },
    });

    return NextResponse.json(user);
  } catch (error) {
    console.error('[USER_UPDATE]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
} 