'use client'

import Image from 'next/image'
import { useParams } from 'next/navigation'

interface RoomContact {
  name: string
  phone: string
  email: string
}

interface Room {
  id: string
  title: string
  price: number
  address: string
  area: number
  imageUrl: string
  description: string
  amenities: string[]
  contact: RoomContact
}

type RoomDetails = {
  [key: string]: Room
}

// Dữ liệu mẫu - sau này sẽ lấy từ API
const roomDetails: RoomDetails = {
  '1': {
    id: '1',
    title: 'Phòng trọ cao cấp Quận 1',
    price: 5000000,
    address: '123 Nguyễn Huệ, Quận 1, TP. HCM',
    area: 25,
    imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
    description: 'Phòng trọ cao cấp mới xây, đầy đủ nội thất, có ban công, cửa sổ thoáng mát. Vị trí trung tâm, thuận tiện di chuyển.',
    amenities: [
      'Máy lạnh',
      'Tủ lạnh',
      'Máy giặt',
      'Nội thất',
      'Ban công',
      'Cửa sổ',
      'Bảo vệ 24/7',
      'Thang máy'
    ],
    contact: {
      name: 'Anh Tuấn',
      phone: '0912345678',
      email: 'tuan@example.com'
    }
  },
  '2': {
    id: '2',
    title: 'Phòng trọ gần ĐH Bách Khoa',
    price: 3500000,
    address: '456 Lý Thường Kiệt, Quận 10, TP. HCM',
    area: 20,
    imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688',
    description: 'Phòng trọ sinh viên, gần trường ĐH Bách Khoa, có gác lửng, khu vực an ninh.',
    amenities: [
      'Gác lửng',
      'Máy lạnh',
      'Tủ quần áo',
      'Bàn ghế',
      'Camera an ninh',
      'Wifi miễn phí'
    ],
    contact: {
      name: 'Chị Hương',
      phone: '0987654321',
      email: 'huong@example.com'
    }
  },
  '3': {
    id: '3',
    title: 'Phòng trọ mới xây Bình Thạnh',
    price: 4000000,
    address: '789 Xô Viết Nghệ Tĩnh, Bình Thạnh, TP. HCM',
    area: 22,
    imageUrl: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af',
    description: 'Phòng mới xây 100%, thiết kế hiện đại, full nội thất cao cấp, khu dân cư yên tĩnh.',
    amenities: [
      'Full nội thất',
      'Máy lạnh',
      'Tủ lạnh',
      'Máy giặt',
      'Bếp từ',
      'Tủ bếp',
      'Ban công',
      'Cửa sổ lớn'
    ],
    contact: {
      name: 'Anh Minh',
      phone: '0909123456',
      email: 'minh@example.com'
    }
  }
}

export default function RoomDetail() {
  const params = useParams()
  const room = roomDetails[params.id as string]

  if (!room) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-red-600">Không tìm thấy phòng trọ</h1>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Ảnh phòng */}
        <div className="relative h-96">
          <Image
            src={room.imageUrl}
            alt={room.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Thông tin chính */}
        <div className="p-6">
          <h1 className="text-3xl font-bold mb-4">{room.title}</h1>
          <p className="text-2xl font-bold text-primary mb-4">
            {room.price.toLocaleString('vi-VN')} VNĐ/tháng
          </p>
          <p className="text-gray-600 mb-4">{room.address}</p>
          <p className="text-gray-600 mb-6">Diện tích: {room.area}m²</p>

          {/* Mô tả */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Mô tả chi tiết</h2>
            <p className="text-gray-600">{room.description}</p>
          </div>

          {/* Tiện ích */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-2">Tiện ích</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {room.amenities.map((amenity: string, index: number) => (
                <div key={index} className="flex items-center">
                  <svg className="w-5 h-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{amenity}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Thông tin liên hệ */}
          <div className="border-t pt-6">
            <h2 className="text-xl font-semibold mb-4">Thông tin liên hệ</h2>
            <div className="space-y-2">
              <p><span className="font-medium">Người cho thuê:</span> {room.contact.name}</p>
              <p><span className="font-medium">Số điện thoại:</span> {room.contact.phone}</p>
              <p><span className="font-medium">Email:</span> {room.contact.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 