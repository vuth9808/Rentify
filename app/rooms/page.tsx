import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Danh sách phòng trọ | Rentify',
  description: 'Tìm kiếm và lọc phòng trọ theo nhu cầu của bạn',
}

export default function RoomsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Danh sách phòng trọ</h1>
      
      {/* Phần lọc nâng cao */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Lọc nâng cao</h2>
        {/* Sẽ thêm các bộ lọc ở đây */}
      </div>

      {/* Danh sách phòng */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Sẽ thêm các card phòng ở đây */}
      </div>

      {/* Phân trang */}
      <div className="mt-8 flex justify-center">
        {/* Sẽ thêm phân trang ở đây */}
      </div>
    </div>
  )
} 