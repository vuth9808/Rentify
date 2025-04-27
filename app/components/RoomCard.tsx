'use client'

import Image from 'next/image'
import Link from 'next/link'

interface RoomCardProps {
  id: string
  title: string
  price: number
  address: string
  area: number
  imageUrl?: string // Làm cho imageUrl là optional
}

export default function RoomCard({ id, title, price, address, area, imageUrl }: RoomCardProps) {
  return (
    <Link href={`/listings/${id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <div className="relative h-48 bg-gray-200">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover"
            />
          )}
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2">{title}</h3>
          <p className="text-primary font-bold mb-2">{price.toLocaleString('vi-VN')} VNĐ/tháng</p>
          <p className="text-gray-600 mb-2">{address}</p>
          <p className="text-gray-600">Diện tích: {area}m²</p>
        </div>
      </div>
    </Link>
  )
} 