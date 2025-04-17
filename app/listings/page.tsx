'use client'

import RoomCard from '../components/RoomCard'
import AdvancedFilter from '../components/AdvancedFilter'

// Dữ liệu mẫu
const sampleRooms = [
  {
    id: '1',
    title: 'Phòng trọ cao cấp Quận 1',
    price: 5000000,
    address: '123 Nguyễn Huệ, Quận 1, TP. HCM',
    area: 25,
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267'
  },
  {
    id: '2',
    title: 'Phòng trọ gần ĐH Bách Khoa',
    price: 3500000,
    address: '456 Lý Thường Kiệt, Quận 10, TP. HCM',
    area: 20,
    imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688'
  },
  {
    id: '3',
    title: 'Phòng trọ mới xây Bình Thạnh',
    price: 4000000,
    address: '789 Xô Viết Nghệ Tĩnh, Bình Thạnh, TP. HCM',
    area: 22,
    imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af'
  }
]

export default function ListingsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Danh sách phòng trọ</h1>
      
      {/* Phần lọc nâng cao */}
      <AdvancedFilter />

      {/* Danh sách phòng */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sampleRooms.map(room => (
          <RoomCard
            key={room.id}
            {...room}
          />
        ))}
      </div>

      {/* Phân trang */}
      <div className="mt-8 flex justify-center">
        {/* Sẽ thêm phân trang ở đây */}
      </div>
    </div>
  )
} 