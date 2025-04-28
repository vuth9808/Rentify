"use client";

import { FiMapPin } from "react-icons/fi";

interface ListingHeaderProps {
  title: string;
  location: string;
}

export default function ListingHeader({ title, location }: ListingHeaderProps) {
  return (
    <div className="mb-6">
      <h1 className="text-3xl md:text-4xl font-bold mb-2">{title}</h1>
      {location && (
        <div className="flex items-center text-gray-600">
          <FiMapPin className="mr-2" />
          <span>{location}</span>
        </div>
      )}
    </div>
  );
} 