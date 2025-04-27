'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaBed, FaBath, FaRuler } from 'react-icons/fa';
import { formatPrice } from '@/lib/utils';

interface RoomCardProps {
  id: string;
  title: string;
  description: string;
  price: number;
  images: {
    url: string;
  }[];
  location: string;
  area: number;
}

export default function RoomCard({
  id,
  title,
  description,
  price,
  images,
  location,
  area,
}: RoomCardProps) {
  return (
    <Link href={`/listings/${id}`}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02] hover:shadow-lg">
        <div className="relative h-48">
          <Image
            src={images[0]?.url || '/images/room-placeholder.jpg'}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 truncate">{title}</h3>
          <p className="text-sm text-gray-500 mb-2 truncate">{location || 'Đang cập nhật địa chỉ'}</p>
          <p className="text-xl font-bold text-teal-600 mb-4">{formatPrice(price)}</p>
          <div className="flex items-center justify-between text-gray-600">
            <div className="flex items-center">
              <FaRuler className="mr-1" />
              <span className="text-sm">{area}m²</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
} 