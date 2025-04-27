"use client";

import { useState, useEffect, ChangeEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
// Xóa import từ thư viện UI không dùng

const roomTypes = ['Phòng trọ', 'Căn hộ mini', 'Nhà nguyên căn', 'Phòng trọ cao cấp'];
const districts = ['Quận 1', 'Quận 2', 'Quận 3', 'Quận Bình Thạnh', 'Quận Gò Vấp', 'Quận Tân Bình']; // Ví dụ
const priceRanges = [
  { label: 'Dưới 2 triệu', value: '2000000' },
  { label: '2 - 3 triệu', value: '3000000' },
  { label: '3 - 4 triệu', value: '4000000' },
  { label: '4 - 5 triệu', value: '5000000' },
  { label: '5 - 7 triệu', value: '7000000' },
  { label: '7 - 10 triệu', value: '10000000' },
  { label: 'Trên 10 triệu', value: '10000001' }
];
const areaRanges = [
  { label: 'Dưới 20m²', value: '20' },
  { label: '20 - 30m²', value: '30' },
  { label: '30 - 40m²', value: '40' },
  { label: '40 - 50m²', value: '50' },
  { label: '50 - 70m²', value: '70' },
  { label: '70 - 100m²', value: '100' },
  { label: 'Trên 100m²', value: '101' }
];

export default function AdvancedFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Khôi phục state maxPrice, bỏ selectedPriceRange
  const [maxPrice, setMaxPrice] = useState<string>(''); 
  const [maxArea, setMaxArea] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');

  // Cập nhật state từ URL search params
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    setMaxPrice(params.get('maxPrice') || '');
    setMaxArea(params.get('maxArea') || '');
    setSelectedType(params.get('type') || '');
    setSelectedDistrict(params.get('district') || '');
  }, [searchParams]);

  // Hàm xử lý khi áp dụng bộ lọc
  const handleApplyFilters = () => {
    const params = new URLSearchParams();

    if (maxPrice) params.set('maxPrice', maxPrice);
    if (maxArea) params.set('maxArea', maxArea);
    if (selectedType) params.set('type', selectedType);
    if (selectedDistrict) params.set('district', selectedDistrict);

    router.push(`/listings?${params.toString()}`);
  };

  // Hàm reset bộ lọc
  const handleResetFilters = () => {
    router.push('/listings');
  };

  // Hàm tiện ích để xử lý input/select
  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setter(e.target.value);
  };
  
  // Xóa hàm handlePriceRangeChange

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-8">
      <h2 className="text-xl font-semibold mb-4">Lọc nâng cao</h2>
      
      <div className="flex flex-wrap items-end gap-3">
        {/* Lọc theo khoảng giá */}
        <div className="flex-1 min-w-[150px]">
          <label htmlFor="price-range" className="block text-sm font-medium text-gray-700 mb-1">Khoảng giá</label>
          <select
            id="price-range"
            value={maxPrice}
            onChange={handleInputChange(setMaxPrice)}
            className="w-full px-2 py-1.5 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          >
            <option value="">Tất cả</option>
            {priceRanges.map((range) => (
              <option key={range.value} value={range.value}>{range.label}</option>
            ))}
          </select>
        </div>

        {/* Lọc theo khoảng diện tích */}
        <div className="flex-1 min-w-[150px]">
          <label htmlFor="area-range" className="block text-sm font-medium text-gray-700 mb-1">Diện tích</label>
          <select
            id="area-range"
            value={maxArea}
            onChange={handleInputChange(setMaxArea)}
            className="w-full px-2 py-1.5 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          >
            <option value="">Tất cả</option>
            {areaRanges.map((range) => (
              <option key={range.value} value={range.value}>{range.label}</option>
            ))}
          </select>
        </div>

        {/* Lọc theo loại phòng */}
        <div className="flex-1 min-w-[150px]">
          <label htmlFor="room-type" className="block text-sm font-medium text-gray-700 mb-1">Loại phòng</label>
          <select
            id="room-type"
            value={selectedType}
            onChange={handleInputChange(setSelectedType)}
            className="w-full px-2 py-1.5 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          >
            <option value="">Tất cả</option>
            {roomTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        {/* Lọc theo quận/huyện */}
        <div className="flex-1 min-w-[150px]">
          <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-1">Quận/Huyện</label>
          <select
            id="district"
            value={selectedDistrict}
            onChange={handleInputChange(setSelectedDistrict)}
            className="w-full px-2 py-1.5 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm"
          >
            <option value="">Tất cả</option>
            {districts.map((district) => (
              <option key={district} value={district}>{district}</option>
            ))}
          </select>
        </div>

        {/* Nút áp dụng và reset */}
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleResetFilters}
            className="px-3 py-1.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={handleApplyFilters}
            className="px-3 py-1.5 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Áp dụng
          </button>
        </div>
      </div>
    </div>
  );
} 