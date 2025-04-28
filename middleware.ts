import { withAuth } from "next-auth/middleware"

export default withAuth({
  callbacks: {
    authorized: ({ req, token }) => {
      const path = req.nextUrl.pathname;
      
      // Cho phép truy cập trang đăng nhập và đăng ký
      if (path === '/login' || path === '/register') {
        return true;
      }

      // Yêu cầu xác thực cho các API routes
      if (path.startsWith('/api')) {
        return !!token;
      }

      // Cho phép truy cập các routes khác
      return true;
    }
  }
});

// Chỉ áp dụng middleware cho các route cụ thể
export const config = {
  matcher: [
    '/api/listings/:path*',
    '/api/upload/:path*',
    '/create-listing',
  ]
} 