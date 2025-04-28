/**
 * Loading Component cho trang Listings
 * Hiển thị skeleton loading khi đang tải danh sách phòng
 */

import Container from '@/components/Container';
import ListingCard from '@/components/listings/ListingCard';
import EmptyState from '@/components/EmptyState';

export default function Loading() {
  return (
    <Container>
      <div className="grid grid-cols-1 gap-8 pt-24 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {[...Array(10)].map((_, index) => (
          <div
            key={index}
            className="col-span-1 animate-pulse"
          >
            <div className="flex flex-col gap-2">
              <div className="aspect-square w-full relative overflow-hidden rounded-xl bg-gray-200" />
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-4 bg-gray-200 rounded w-1/2" />
              <div className="h-4 bg-gray-200 rounded w-1/4" />
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
} 