import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Trang không tồn tại</h2>
      <p className="text-gray-600 mb-8 max-w-md">
        Rất tiếc, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
      </p>
      <div className="flex gap-4">
        <Button asChild>
          <Link href="/">
            Về trang chủ
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/listings">
            Xem danh sách phòng trọ
          </Link>
        </Button>
      </div>
    </div>
  );
} 