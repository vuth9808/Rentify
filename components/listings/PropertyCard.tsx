'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { formatDistance } from 'date-fns';
import { vi } from 'date-fns/locale';
import { FiHome, FiDroplet, FiMaximize, FiHeart } from 'react-icons/fi';

// Define the property interface
export interface Property {
  id: string;
  title: string;
  price: number;
  address: string;
  area: number;
  imageUrl: string;
  bedrooms?: number;
  bathrooms?: number;
  isFeatured?: boolean;
  createdAt: string;
}

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const timeAgo = formatDistance(new Date(property.createdAt), new Date(), {
    addSuffix: true,
    locale: vi,
  });

  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsFavorite(!isFavorite);
    // In a real app, we would send an API request to update the favorite status
  };

  return (
    <Link href={`/listings/${property.id}`}>
      <div className="overflow-hidden bg-white rounded-lg shadow-md transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
        <div className="relative">
          <div className="relative w-full h-48">
            <Image
              src={property.imageUrl}
              alt={property.title}
              fill
              style={{ objectFit: 'cover' }}
              className="transition-transform duration-300 hover:scale-105"
            />
          </div>
          <button
            onClick={toggleFavorite}
            className="absolute p-2 text-white bg-black bg-opacity-50 rounded-full top-2 right-2 hover:bg-opacity-70"
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            <FiHeart
              className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-white'}`}
            />
          </button>
          {property.isFeatured && (
            <div className="absolute top-2 left-2 bg-primary-600 text-white text-xs font-semibold px-2 py-1 rounded">
              Nổi bật
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 px-4 py-2 text-white bg-gradient-to-t from-black/70 to-transparent">
            <p className="text-xl font-bold">{formatPrice(property.price)}/tháng</p>
          </div>
        </div>
        <div className="p-4">
          <h3 className="mb-2 text-lg font-semibold text-gray-800 line-clamp-1">{property.title}</h3>
          <p className="mb-3 text-sm text-gray-600 line-clamp-1">{property.address}</p>
          
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-3 text-gray-700">
              {property.bedrooms !== undefined && (
                <div className="flex items-center">
                  <FiHome className="w-4 h-4 mr-1" />
                  <span className="text-sm">{property.bedrooms}</span>
                </div>
              )}
              
              {property.bathrooms !== undefined && (
                <div className="flex items-center">
                  <FiDroplet className="w-4 h-4 mr-1" />
                  <span className="text-sm">{property.bathrooms}</span>
                </div>
              )}
              
              <div className="flex items-center">
                <FiMaximize className="w-4 h-4 mr-1" />
                <span className="text-sm">{property.area} m²</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-2 mt-2 text-xs text-gray-500 border-t border-gray-100">
            <span>{timeAgo}</span>
          </div>
        </div>
      </div>
    </Link>
  );
} 