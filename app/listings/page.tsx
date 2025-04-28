'use client'

import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Container from '@/components/Container'
import AdvancedFilter from '@/app/components/AdvancedFilter'
import PageHeading from '@/app/components/PageHeading'
import AppPagination from '@/app/components/AppPagination'
import RoomCard from '@/app/components/RoomCard'

// Dữ liệu mẫu
const sampleRooms = [
  {
    id: "1",
    title: 'Phòng trọ cao cấp Quận 1',
    price: 5000000,
    address: '123 Nguyễn Huệ, Quận 1, TP.HCM',
    roomType: 'phong-tro',
    area: 25,
    district: 'quan-1',
    listedDate: '2023-11-01',
  },
  {
    id: "2",
    title: 'Phòng trọ gần ĐH Bách Khoa',
    price: 3500000,
    address: '45 Lý Thường Kiệt, Quận 10, TP.HCM',
    roomType: 'phong-tro',
    area: 18,
    district: 'quan-10',
    listedDate: '2023-11-05',
  },
  {
    id: "3",
    title: 'Phòng trọ mới xây Bình Thạnh',
    price: 4000000,
    address: '78 Điện Biên Phủ, Bình Thạnh, TP.HCM',
    roomType: 'phong-tro',
    area: 22,
    district: 'quan-binh-thanh',
    listedDate: '2023-11-10',
  },
  {
    id: "4",
    title: 'Căn hộ dịch vụ Phú Nhuận',
    price: 8000000,
    address: '56 Phan Xích Long, Phú Nhuận, TP.HCM',
    roomType: 'can-ho',
    area: 35,
    district: 'quan-phu-nhuan',
    listedDate: '2023-11-15',
  },
  {
    id: "5",
    title: 'Căn hộ cao cấp view sông',
    price: 9500000,
    address: '102 Nguyễn Văn Linh, Quận 7, TP.HCM',
    roomType: 'can-ho',
    area: 48,
    district: 'quan-7',
    listedDate: '2023-11-20',
  },
  {
    id: "6",
    title: 'Nhà nguyên căn Thủ Đức',
    price: 7500000,
    address: '25 Võ Văn Ngân, Thủ Đức, TP.HCM',
    roomType: 'nha-nguyen-can',
    area: 60,
    district: 'quan-thu-duc',
    listedDate: '2023-11-25',
  },
];

export default function ListingsPage() {
  const searchParams = useSearchParams();
  const [filteredRooms, setFilteredRooms] = useState(sampleRooms);
  
  // Phân trang
  const pageSize = 6;
  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const totalPages = Math.ceil(filteredRooms.length / pageSize);
  const paginatedRooms = filteredRooms.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  useEffect(() => {
    let results = [...sampleRooms];
    
    // Lọc theo giá
    const priceRange = searchParams.get('price');
    if (priceRange) {
      const [minPrice, maxPrice] = priceRange.split('-').map(price => parseInt(price));
      
      if (!isNaN(minPrice)) {
        if (!isNaN(maxPrice) && maxPrice > 0) {
          // Nếu có cả giá min và max
          results = results.filter(room => room.price >= minPrice && room.price <= maxPrice);
        } else {
          // Nếu chỉ có giá min hoặc maxPrice = 0 (không giới hạn)
          results = results.filter(room => room.price >= minPrice);
        }
      }
    }
    
    // Lọc theo loại phòng
    const roomType = searchParams.get('type');
    if (roomType) {
      results = results.filter(room => room.roomType === roomType);
    }
    
    // Lọc theo diện tích
    const areaRange = searchParams.get('area');
    if (areaRange) {
      const [minArea, maxArea] = areaRange.split('-').map(area => parseInt(area));
      
      if (!isNaN(minArea)) {
        if (!isNaN(maxArea) && maxArea > 0) {
          // Nếu có cả diện tích min và max
          results = results.filter(room => room.area >= minArea && room.area <= maxArea);
        } else {
          // Nếu chỉ có diện tích min hoặc maxArea = 0 (không giới hạn)
          results = results.filter(room => room.area >= minArea);
        }
      }
    }
    
    // Lọc theo quận/huyện
    const district = searchParams.get('district');
    if (district) {
      results = results.filter(room => room.district === district);
    }
    
    setFilteredRooms(results);
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Container>
        <div className="py-8">
          <PageHeading 
            title="Danh sách phòng trọ" 
            subtitle="Tìm kiếm phòng trọ phù hợp với nhu cầu của bạn"
          />
          
          <AdvancedFilter />
          
          {/* Hiển thị số kết quả tìm kiếm */}
          <div className="mb-4 text-gray-600">
            <p>Tìm thấy {filteredRooms.length} kết quả</p>
          </div>
          
          {/* Danh sách phòng trọ */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {paginatedRooms.map(room => (
              <RoomCard
                key={room.id}
                id={room.id}
                title={room.title}
                price={room.price}
                address={room.address}
                area={room.area}
              />
            ))}
          </div>
          
          <AppPagination totalPages={totalPages} />
        </div>
      </Container>
    </div>
  )
} 