'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { priceRanges } from '@/constants/filters'

export default function AdvancedFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Lấy giá trị hiện tại từ URL
  const currentPrice = searchParams.get('price') || '';
  const currentType = searchParams.get('type') || '';
  const currentArea = searchParams.get('area') || '';
  const currentDistrict = searchParams.get('district') || '';

  // State cho các bộ lọc
  const [selectedPrice, setSelectedPrice] = useState(currentPrice);
  const [selectedArea, setSelectedArea] = useState(currentArea);
  const [selectedDistrict, setSelectedDistrict] = useState(currentDistrict);
  const [selectedType, setSelectedType] = useState(currentType);

  // Xử lý khi nhấn nút tìm kiếm
  const handleSearch = () => {
    // Tạo đối tượng URLSearchParams để xử lý các tham số URL
    const params = new URLSearchParams();
    
    // Thêm các tham số đã chọn vào URL
    if (selectedPrice) params.set('price', selectedPrice);
    if (selectedArea) params.set('area', selectedArea);
    if (selectedDistrict) params.set('district', selectedDistrict);
    if (selectedType) params.set('type', selectedType);
    
    // Chuyển hướng đến URL mới với các tham số lọc
    router.push(`/listings?${params.toString()}`);
  };

  // Xử lý khi nhấn nút reset
  const handleReset = () => {
    setSelectedPrice('');
    setSelectedArea('');
    setSelectedDistrict('');
    setSelectedType('');
    router.push('/listings');
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <h2 className="text-lg font-semibold mb-4">Lọc nâng cao</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 items-end">
        <div>
          <label className="block text-sm font-medium mb-1">Khoảng giá</label>
          <select 
            value={selectedPrice} 
            onChange={(e) => setSelectedPrice(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Chọn khoảng giá</option>
            {priceRanges.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Diện tích</label>
          <select 
            value={selectedArea} 
            onChange={(e) => setSelectedArea(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Chọn diện tích</option>
            <option value="0-20">Dưới 20m²</option>
            <option value="20-30">20m² - 30m²</option>
            <option value="30-50">30m² - 50m²</option>
            <option value="50-0">Trên 50m²</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Quận/Huyện</label>
          <select 
            value={selectedDistrict} 
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Chọn quận/huyện</option>
            <option value="quan-1">Quận 1</option>
            <option value="quan-2">Quận 2</option>
            <option value="quan-3">Quận 3</option>
            <option value="quan-4">Quận 4</option>
            <option value="quan-5">Quận 5</option>
            <option value="quan-6">Quận 6</option>
            <option value="quan-7">Quận 7</option>
            <option value="quan-8">Quận 8</option>
            <option value="quan-9">Quận 9</option>
            <option value="quan-10">Quận 10</option>
            <option value="quan-11">Quận 11</option>
            <option value="quan-12">Quận 12</option>
            <option value="quan-binh-thanh">Bình Thạnh</option>
            <option value="quan-phu-nhuan">Phú Nhuận</option>
            <option value="quan-go-vap">Gò Vấp</option>
            <option value="quan-tan-binh">Tân Bình</option>
            <option value="quan-tan-phu">Tân Phú</option>
            <option value="quan-binh-tan">Bình Tân</option>
            <option value="quan-thu-duc">Thủ Đức</option>
            <option value="huyen-nha-be">Nhà Bè</option>
            <option value="huyen-binh-chanh">Bình Chánh</option>
            <option value="huyen-hoc-mon">Hóc Môn</option>
            <option value="huyen-cu-chi">Củ Chi</option>
            <option value="huyen-can-gio">Cần Giờ</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Loại phòng</label>
          <select 
            value={selectedType} 
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Chọn loại phòng</option>
            <option value="phong-tro">Phòng trọ</option>
            <option value="can-ho">Căn hộ</option>
            <option value="nha-nguyen-can">Nhà nguyên căn</option>
            <option value="chung-cu-mini">Chung cư mini</option>
          </select>
        </div>
        <div className="flex space-x-2 col-span-2 md:col-span-2">
          <Button variant="outline" onClick={handleReset} className="w-1/2">Xóa bộ lọc</Button>
          <Button onClick={handleSearch} className="w-1/2">Tìm kiếm</Button>
        </div>
      </div>
    </div>
  )
} 