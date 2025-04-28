"use client";

interface ListingDescriptionProps {
  description: string;
}

export default function ListingDescription({ description }: ListingDescriptionProps) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold mb-3">Mô tả</h2>
      <p className="text-gray-700 leading-relaxed">
        {description}
      </p>
    </div>
  );
} 