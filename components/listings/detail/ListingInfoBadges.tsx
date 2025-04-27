"use client";

import {
  FiMaximize2,
  FiHome,
  FiGrid,
  FiUsers
} from "react-icons/fi";

// Helper function to map listing type to readable text
const getListingTypeText = (type: string) => {
  switch (type) {
    case "APARTMENT": return "Căn hộ";
    case "HOUSE": return "Nhà nguyên căn";
    case "ROOM": return "Phòng cho thuê";
    case "STUDIO": return "Studio";
    default: return type;
  }
};

interface ListingInfoBadgesProps {
  area: number;
  type: string;
  bedrooms?: number | null;
  bathrooms?: number | null;
}

const InfoItem = ({ icon: Icon, label, value }: { icon: React.ElementType, label: string, value: string | number }) => (
  <div className="bg-gray-100 p-4 rounded-lg flex flex-col items-center text-center">
    <Icon className="text-emerald-600 text-2xl mb-2" />
    <span className="text-sm text-gray-500 mb-1">{label}</span>
    <span className="font-semibold">{value}</span>
  </div>
);

export default function ListingInfoBadges({ area, type, bedrooms, bathrooms }: ListingInfoBadgesProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <InfoItem icon={FiMaximize2} label="Diện tích" value={`${area} m²`} />
      <InfoItem icon={FiHome} label="Loại phòng" value={getListingTypeText(type)} />
      {bedrooms && <InfoItem icon={FiGrid} label="Phòng ngủ" value={bedrooms} />}
      {bathrooms && <InfoItem icon={FiUsers} label="Phòng tắm" value={bathrooms} />}
    </div>
  );
} 