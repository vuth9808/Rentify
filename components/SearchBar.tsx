'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiSearch, FiMapPin, FiDollarSign, FiHome } from 'react-icons/fi';
import { priceRanges, propertyTypes } from '@/constants/filters';

type SearchBarProps = {
  className?: string;
};

export default function SearchBar({ className = '' }: SearchBarProps) {
  const router = useRouter();
  const [location, setLocation] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [propertyType, setPropertyType] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    const params = new URLSearchParams();
    if (location) params.append('location', location);
    if (priceRange) params.append('price', priceRange);
    if (propertyType) params.append('type', propertyType);
    
    router.push(`/listings?${params.toString()}`);
  };

  return (
    <form 
      onSubmit={handleSearch}
      className={`w-full bg-white rounded-lg shadow-lg p-3 md:p-4 ${className}`}
    >
      <div className="flex flex-col space-y-3 md:flex-row md:space-y-0 md:space-x-3">
        <div className="flex-1">
          <label htmlFor="location" className="sr-only">
            Địa điểm
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FiMapPin className="w-5 h-5 text-gray-400" />
            </div>
            <input
              id="location"
              type="text"
              placeholder="Thành phố, quận, phường..."
              className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex-1">
          <label htmlFor="price" className="sr-only text-gray-800">
            Khoảng giá
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FiDollarSign className="w-5 h-5 text-gray-400" />
            </div>
            <select
              id="price"
              className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 appearance-none font-medium text-gray-800"
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
            >
              <option value="">Chọn khoảng giá</option>
              {priceRanges.map((range) => (
                <option key={range.value} value={range.value}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="flex-1">
          <label htmlFor="type" className="sr-only">
            Loại phòng
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FiHome className="w-5 h-5 text-gray-400" />
            </div>
            <select
              id="type"
              className="w-full pl-10 pr-3 py-2.5 bg-gray-50 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 appearance-none font-medium text-gray-800"
              value={propertyType}
              onChange={(e) => setPropertyType(e.target.value)}
            >
              <option value="">Chọn loại phòng</option>
              {propertyTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <button
          type="submit"
          className="flex items-center justify-center px-6 py-2.5 font-medium text-white rounded-md bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          <FiSearch className="w-5 h-5 mr-2" />
          <span>Tìm kiếm</span>
        </button>
      </div>
    </form>
  );
} 