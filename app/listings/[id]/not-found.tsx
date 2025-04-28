import Link from 'next/link';

export default function ListingNotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold text-primary-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Trang không tồn tại</h2>
      <p className="text-gray-600 mb-8 text-center max-w-md">
        Rất tiếc, phòng trọ bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
      </p>
      <div className="flex gap-4">
        <Link
          href="/"
          className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          Về trang chủ
        </Link>
        <Link
          href="/listings"
          className="px-6 py-3 border border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 transition-colors"
        >
          Xem danh sách phòng trọ
        </Link>
      </div>
    </div>
  );
} 