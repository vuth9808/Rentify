"use client";

import { FiCheck } from "react-icons/fi";

interface ListingAmenitiesProps {
  amenities: string[];
}

export default function ListingAmenities({ amenities }: ListingAmenitiesProps) {
  if (!amenities || amenities.length === 0) {
    return null; // Không hiển thị nếu không có tiện nghi
  }

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-4">Tiện nghi</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-2">
        {amenities.map((amenity, index) => (
          <div key={index} className="flex items-center text-gray-700">
            <FiCheck className="text-emerald-600 mr-2 flex-shrink-0" />
            <span>{amenity}</span>
          </div>
        ))}
      </div>
    </div>
  );
} 