"use client";

import Image from 'next/image';
import { useState } from 'react';

interface ImageProps {
  id: string;
  url: string;
}

interface ListingImageGalleryProps {
  images: ImageProps[];
  title: string;
}

export default function ListingImageGallery({ images, title }: ListingImageGalleryProps) {
  const [isLoading, setLoading] = useState(true);

  if (!images || images.length === 0) {
    return (
      <div className="mb-8 h-[300px] md:h-[400px] bg-gray-200 rounded-lg flex items-center justify-center">
        <p className="text-gray-500">Không có hình ảnh</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-8 rounded-lg overflow-hidden" style={{ maxHeight: '500px' }}>
      {/* Ảnh lớn nhất (ảnh đầu tiên) */}
      <div className="relative col-span-1 md:col-span-2 row-span-2 h-[400px]">
        <Image
          src={images[0].url}
          alt={`${title} - Ảnh 1`}
          fill
          sizes="(max-width: 768px) 100vw, 66vw"
          priority
          className={`
            object-cover w-full h-full
            duration-700 ease-in-out
            ${isLoading ? 'scale-110 blur-lg' : 'scale-100 blur-0'}
          `}
          onLoadingComplete={() => setLoading(false)}
        />
      </div>

      {/* Các ảnh nhỏ hơn */}
      <div className="hidden md:grid grid-rows-2 gap-2 h-[400px]">
        {images.slice(1, 3).map((image, index) => (
          <div key={image.id} className="relative h-full">
            <Image
              src={image.url}
              alt={`${title} - Ảnh ${index + 2}`}
              fill
              sizes="33vw"
              className={`
                object-cover w-full h-full rounded-lg
                duration-700 ease-in-out
                ${isLoading ? 'scale-110 blur-lg' : 'scale-100 blur-0'}
              `}
              onLoadingComplete={() => setLoading(false)}
            />
          </div>
        ))}
      </div>

      {/* Nút xem tất cả ảnh */}
      {images.length > 3 && (
        <button
          className="absolute bottom-4 right-4 bg-white text-gray-800 px-4 py-2 rounded-lg shadow-lg hover:bg-gray-100 transition-colors"
          onClick={() => {/* Thêm logic xem tất cả ảnh ở đây */}}
        >
          Xem tất cả {images.length} ảnh
        </button>
      )}
    </div>
  );
} 