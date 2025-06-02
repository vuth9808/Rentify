"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useCallback } from 'react';
import { RangeSlider } from '@/components/ui/RangeSlider';

const DISTRICT_OPTIONS = [
  { value: 'Quận 1', label: 'Quận 1' },
  { value: 'Quận 2', label: 'Quận 2' },
  { value: 'Quận 3', label: 'Quận 3' },
  { value: 'Quận 4', label: 'Quận 4' },
  { value: 'Quận 5', label: 'Quận 5' },
  { value: 'Quận 6', label: 'Quận 6' },
  { value: 'Quận 7', label: 'Quận 7' },
  { value: 'Quận 8', label: 'Quận 8' },
  { value: 'Quận 9', label: 'Quận 9' },
  { value: 'Quận 10', label: 'Quận 10' },
  { value: 'Quận 11', label: 'Quận 11' },
  { value: 'Quận 12', label: 'Quận 12' },
  { value: 'Quận Bình Thạnh', label: 'Quận Bình Thạnh' },
  { value: 'Quận Tân Bình', label: 'Quận Tân Bình' },
  { value: 'Quận Tân Phú', label: 'Quận Tân Phú' },
  { value: 'Quận Phú Nhuận', label: 'Quận Phú Nhuận' },
  { value: 'Quận Gò Vấp', label: 'Quận Gò Vấp' },
  { value: 'Thành phố Thủ Đức', label: 'Thành phố Thủ Đức' },
];

const FilterSidebar = () => {
  const router = useRouter();
  const params = useSearchParams();
  
  const [district, setDistrict] = useState<string | null>(params.get('district'));
  const [priceRange, setPriceRange] = useState<[number, number]>([
    Number(params.get('minPrice')) || 0,
    Number(params.get('maxPrice')) || 10000000,
  ]);
  const [areaRange, setAreaRange] = useState<[number, number]>([
    Number(params.get('minArea')) || 0,
    Number(params.get('maxArea')) || 100,
  ]);

  const onSubmit = useCallback(() => {
    const currentParams = new URLSearchParams();
    
    if (district) {
      currentParams.set('district', district);
    }
    
    if (priceRange[0] > 0) {
      currentParams.set('minPrice', String(priceRange[0]));
    }
    
    if (priceRange[1] < 10000000) {
      currentParams.set('maxPrice', String(priceRange[1]));
    }
    
    if (areaRange[0] > 0) {
      currentParams.set('minArea', String(areaRange[0]));
    }
    
    if (areaRange[1] < 100) {
      currentParams.set('maxArea', String(areaRange[1]));
    }
    
    const queryString = currentParams.toString();
    router.push(`/listings${queryString ? `?${queryString}` : ''}`);
  }, [router, district, priceRange, areaRange]);

  const resetFilters = useCallback(() => {
    setDistrict(null);
    setPriceRange([0, 10000000]);
    setAreaRange([0, 100]);
    router.push('/listings');
  }, [router]);

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Bộ lọc tìm kiếm</h2>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Quận/Huyện
        </label>
        <select
          value={district || ''}
          onChange={(e) => setDistrict(e.target.value || null)}
          className="w-full p-2 border border-gray-300 rounded-md text-sm"
        >
          <option value="">Tất cả</option>
          {DISTRICT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Khoảng giá (VNĐ/tháng)
        </label>
        <div className="px-2">
          <RangeSlider
            min={0}
            max={10000000}
            step={500000}
            values={priceRange}
            onChange={(values) => setPriceRange(values as [number, number])}
            formatLabel={(value) => `${new Intl.NumberFormat('vi-VN').format(value)}`}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>{new Intl.NumberFormat('vi-VN').format(priceRange[0])}đ</span>
          <span>{new Intl.NumberFormat('vi-VN').format(priceRange[1])}đ</span>
        </div>
      </div>
      
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Diện tích (m²)
        </label>
        <div className="px-2">
          <RangeSlider
            min={0}
            max={100}
            step={5}
            values={areaRange}
            onChange={(values) => setAreaRange(values as [number, number])}
          />
        </div>
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>{areaRange[0]} m²</span>
          <span>{areaRange[1]} m²</span>
        </div>
      </div>
      
      <div className="flex gap-2">
        <button
          onClick={onSubmit}
          className="flex-1 bg-primary-500 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-primary-600 transition-colors"
        >
          Áp dụng
        </button>
        <button
          onClick={resetFilters}
          className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-md text-sm font-medium hover:bg-gray-200 transition-colors"
        >
          Đặt lại
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar; 