'use client';

import { useState, useEffect } from 'react';
import PropertyCardAdapter from '@/components/PropertyCardAdapter';
import { Property } from '@/types';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export default function FeaturedListings() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3;

  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/properties/featured');
        
        if (!response.ok) {
          throw new Error('Failed to fetch featured properties');
        }
        
        const data = await response.json();
        setProperties(data);
      } catch (err) {
        console.error('Error fetching featured properties:', err);
        setError('Failed to load featured properties');
      } finally {
        setLoading(false);
      }
    };
    
    fetchFeaturedProperties();
  }, []);

  const pageCount = Math.ceil(properties.length / itemsPerPage);

  const handlePrevPage = () => {
    setCurrentPage((prev) => (prev === 0 ? pageCount - 1 : prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev === pageCount - 1 ? 0 : prev + 1));
  };

  const displayedProperties = properties.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  if (loading) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="container px-4 mx-auto text-center">
          <p>Đang tải...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="container px-4 mx-auto text-center">
          <p className="text-red-500">{error}</p>
        </div>
      </section>
    );
  }

  if (properties.length === 0) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="container px-4 mx-auto text-center">
          <p>Không có phòng trọ nổi bật nào.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">Phòng trọ nổi bật</h2>
          <div className="flex space-x-2">
            <button
              onClick={handlePrevPage}
              className="p-1 text-gray-600 border border-gray-300 rounded-full hover:bg-gray-100"
              aria-label="Previous page"
              disabled={properties.length <= itemsPerPage}
            >
              <FiChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNextPage}
              className="p-1 text-gray-600 border border-gray-300 rounded-full hover:bg-gray-100"
              aria-label="Next page"
              disabled={properties.length <= itemsPerPage}
            >
              <FiChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displayedProperties.map((property) => (
            <PropertyCardAdapter key={property.id} property={property} />
          ))}
        </div>

        <div className="mt-10 text-center">
          <a
            href="/listings"
            className="inline-block px-6 py-3 text-lg font-medium text-white transition-colors rounded-lg bg-primary-600 hover:bg-primary-700"
          >
            Xem tất cả phòng trọ
          </a>
        </div>
      </div>
    </section>
  );
} 