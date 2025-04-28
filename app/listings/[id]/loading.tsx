export default function ListingLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Skeleton cho ảnh */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="md:col-span-2 h-[300px] bg-gray-200 animate-pulse rounded-lg"></div>
      </div>

      {/* Skeleton cho thông tin */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          {/* Tiêu đề */}
          <div className="h-8 bg-gray-200 animate-pulse rounded mb-4 w-3/4"></div>
          
          {/* Địa chỉ */}
          <div className="h-6 bg-gray-200 animate-pulse rounded mb-4 w-1/2"></div>

          {/* Thông tin cơ bản */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-gray-100 p-3 rounded-lg">
                <div className="h-4 bg-gray-200 animate-pulse rounded mb-2 w-1/2"></div>
                <div className="h-6 bg-gray-200 animate-pulse rounded w-3/4"></div>
              </div>
            ))}
          </div>

          {/* Mô tả */}
          <div className="mb-6">
            <div className="h-6 bg-gray-200 animate-pulse rounded mb-2 w-1/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 animate-pulse rounded w-full"></div>
              <div className="h-4 bg-gray-200 animate-pulse rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 animate-pulse rounded w-4/6"></div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div>
          <div className="bg-white p-6 rounded-lg shadow-lg sticky top-4">
            <div className="h-8 bg-gray-200 animate-pulse rounded mb-4"></div>
            <div className="h-12 bg-gray-200 animate-pulse rounded mb-2"></div>
            <div className="h-12 bg-gray-200 animate-pulse rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
} 