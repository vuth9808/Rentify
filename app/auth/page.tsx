"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { FaUserCircle } from "react-icons/fa"

export default function AuthPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const error = searchParams.get('error')
  const callbackUrl = searchParams.get('callbackUrl')

  return (
    <div className="min-h-[600px] flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="text-center mb-8">
          <FaUserCircle className="mx-auto h-16 w-16 text-teal-600" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Yêu cầu đăng nhập
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Vui lòng đăng nhập hoặc đăng ký để tiếp tục
          </p>
        </div>

        {error && (
          <div className="mb-4 p-4 text-sm text-red-700 bg-red-100 rounded-lg">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <button
            onClick={() => router.push(`/auth/login${callbackUrl ? `?callbackUrl=${callbackUrl}` : ''}`)}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            Đăng nhập
          </button>
          
          <button
            onClick={() => router.push('/auth/register')}
            className="w-full flex justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
          >
            Đăng ký tài khoản mới
          </button>
        </div>

        <div className="mt-6 text-center">
          <button
            onClick={() => router.push('/')}
            className="text-sm text-teal-600 hover:text-teal-500"
          >
            Quay về trang chủ
          </button>
        </div>
      </div>
    </div>
  )
} 