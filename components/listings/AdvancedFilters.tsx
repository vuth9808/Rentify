"use client";

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
// Xóa import từ thư viện UI không dùng

const roomTypes = ['Phòng trọ', 'Căn hộ mini', 'Nhà nguyên căn', 'Phòng trọ cao cấp'];
const districts = ['Quận 1', 'Quận 2', 'Quận 3', 'Quận Bình Thạnh', 'Quận Gò Vấp', 'Quận Tân Bình']; // Ví dụ

type PriceRange = {
  min: number | undefined;
  max: number | undefined;
  label?: string;
}

type PriceRanges = {
  [key: string]: PriceRange;
}

// Định nghĩa các khoảng giá theo format của SearchBar
const priceRanges: PriceRanges = {
  'all': { min: undefined, max: undefined },
  '0-2000000': { min: 0, max: 2000000, label: 'Dưới 2 triệu' },
  '2000000-3000000': { min: 2000000, max: 3000000, label: '2 - 3 triệu' },
  '3000000-5000000': { min: 3000000, max: 5000000, label: '3 - 5 triệu' },
  '5000000-10000000': { min: 5000000, max: 10000000, label: '5 - 10 triệu' },
  '10000000-0': { min: 10000000, max: undefined, label: 'Trên 10 triệu' }
}

// Định nghĩa các khoảng diện tích
const areaRanges = {
  'all': { min: undefined, max: undefined },
  '0-20': { min: 0, max: 20 },
  '20-30': { min: 20, max: 30 },
  '30-50': { min: 30, max: 50 },
  '50+': { min: 50, max: undefined },
}

export default function AdvancedFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State cho các bộ lọc
  const [selectedPriceRange, setSelectedPriceRange] = useState('all');
  const [selectedAreaRange, setSelectedAreaRange] = useState(searchParams.get('areaRange') || 'all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedDistrict, setSelectedDistrict] = useState(searchParams.get('district') || 'all');

  // Cập nhật state khi searchParams thay đổi
  useEffect(() => {
    // Đồng bộ khoảng giá từ URL
    const price = searchParams.get('price');
    if (price && priceRanges[price]) {
      setSelectedPriceRange(price);
    } else {
      setSelectedPriceRange('all');
    }

    // Đồng bộ loại phòng từ URL
    const type = searchParams.get('type');
    if (type) {
      setSelectedType(type);
    } else {
      setSelectedType('all');
    }

    setSelectedAreaRange(searchParams.get('areaRange') || 'all');
    setSelectedDistrict(searchParams.get('district') || 'all');
  }, [searchParams]);

  const handleApplyFilters = () => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    // Xử lý khoảng giá
    if (selectedPriceRange !== 'all') {
      current.set('price', selectedPriceRange);
    } else {
      current.delete('price');
    }

    // Xử lý diện tích
    const areaRange = areaRanges[selectedAreaRange as keyof typeof areaRanges];
    if (areaRange?.min !== undefined) {
      current.set('minArea', areaRange.min.toString());
    } else {
      current.delete('minArea');
    }
    if (areaRange?.max !== undefined) {
      current.set('maxArea', areaRange.max.toString());
    } else {
      current.delete('maxArea');
    }

    // Xử lý loại phòng
    if (selectedType !== 'all') {
      current.set('type', selectedType);
    } else {
      current.delete('type');
    }

    // Xử lý quận/huyện
    if (selectedDistrict !== 'all') {
      current.set('district', selectedDistrict);
    } else {
      current.delete('district');
    }

    const search = current.toString();
    const query = search ? `?${search}` : '';
    router.push(`/listings${query}`);
  };

  const handleResetFilters = () => {
    setSelectedPriceRange('all');
    setSelectedAreaRange('all');
    setSelectedType('all');
    setSelectedDistrict('all');
    router.push('/listings');
  };

  return (
    <div className="bg-gray-100 p-4 rounded-lg mb-8 shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Lọc nâng cao</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-4 items-end">
        {/* Khoảng giá */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Khoảng giá</label>
          <select
            value={selectedPriceRange}
            onChange={(e) => setSelectedPriceRange(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
          >
            <option value="all">Tất cả</option>
            <option value="0-2000000">Dưới 2 triệu</option>
            <option value="2000000-3000000">2 - 3 triệu</option>
            <option value="3000000-5000000">3 - 5 triệu</option>
            <option value="5000000-10000000">5 - 10 triệu</option>
            <option value="10000000-0">Trên 10 triệu</option>
          </select>
        </div>

        {/* Diện tích */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Diện tích</label>
          <select
            value={selectedAreaRange}
            onChange={(e) => setSelectedAreaRange(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
          >
            <option value="all">Tất cả</option>
            <option value="0-20">Dưới 20 m²</option>
            <option value="20-30">20 - 30 m²</option>
            <option value="30-50">30 - 50 m²</option>
            <option value="50+">Trên 50 m²</option>
          </select>
        </div>

        {/* Loại phòng */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Loại phòng</label>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
          >
            <option value="all">Tất cả</option>
            <option value="phong-tro">Phòng trọ</option>
            <option value="chung-cu-mini">Chung cư mini</option>
            <option value="nha-nguyen-can">Nhà nguyên căn</option>
            <option value="can-ho">Căn hộ</option>
            <option value="o-ghep">Ở ghép</option>
          </select>
        </div>

        {/* Quận/Huyện */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Quận/Huyện</label>
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
          >
            <option value="all">Tất cả</option>
            <option value="Quận 1">Quận 1</option>
            <option value="Quận 2">Quận 2</option>
            <option value="Quận 3">Quận 3</option>
            <option value="Quận 4">Quận 4</option>
            <option value="Quận 5">Quận 5</option>
            <option value="Quận 6">Quận 6</option>
            <option value="Quận 7">Quận 7</option>
            <option value="Quận 8">Quận 8</option>
            <option value="Quận 9">Quận 9</option>
            <option value="Quận 10">Quận 10</option>
            <option value="Quận 11">Quận 11</option>
            <option value="Quận 12">Quận 12</option>
            <option value="Quận Bình Thạnh">Quận Bình Thạnh</option>
            <option value="Quận Gò Vấp">Quận Gò Vấp</option>
            <option value="Quận Phú Nhuận">Quận Phú Nhuận</option>
            <option value="Quận Tân Bình">Quận Tân Bình</option>
            <option value="Quận Tân Phú">Quận Tân Phú</option>
            <option value="Quận Thủ Đức">Quận Thủ Đức</option>
            <option value="Huyện Bình Chánh">Huyện Bình Chánh</option>
            <option value="Huyện Cần Giờ">Huyện Cần Giờ</option>
            <option value="Huyện Củ Chi">Huyện Củ Chi</option>
            <option value="Huyện Hóc Môn">Huyện Hóc Môn</option>
            <option value="Huyện Nhà Bè">Huyện Nhà Bè</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="col-span-full md:col-start-5 md:col-span-1 flex justify-end md:justify-start space-x-2">
          <button
            onClick={handleResetFilters}
            className="rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
          >
            Reset
          </button>
          <button
            onClick={handleApplyFilters}
            className="rounded-md border border-transparent bg-teal-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"
          >
            Áp dụng
          </button>
        </div>
      </div>
    </div>
  );
} 