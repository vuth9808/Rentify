'use client';

import { Property as ApiProperty } from '@/types';
import PropertyCard, { Property as CardProperty } from '@/components/listings/PropertyCard';

interface PropertyCardAdapterProps {
  property: ApiProperty;
}

export default function PropertyCardAdapter({ property }: PropertyCardAdapterProps) {
  // Convert API property format to PropertyCard format
  const adaptedProperty: CardProperty = {
    id: property.id,
    title: property.title,
    price: property.price,
    address: `${property.district}, ${property.city}`,
    area: property.area,
    imageUrl: property.images[0]?.url || '/images/placeholder.jpg',
    bedrooms: property.bedrooms,
    bathrooms: property.bathrooms,
    isFeatured: property.isFeatured,
    createdAt: property.createdAt,
  };

  return <PropertyCard property={adaptedProperty} />;
} 