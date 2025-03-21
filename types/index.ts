export type PropertyType = 'APARTMENT' | 'HOUSE' | 'ROOM' | 'VILLA' | 'OFFICE';
export type PropertyStatus = 'AVAILABLE' | 'RENTED' | 'PENDING' | 'DELETED';

export interface User {
  id: string;
  name: string;
  email?: string;
  emailVerified?: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
  role: 'USER' | 'HOST' | 'ADMIN';
}

export interface Image {
  id: string;
  url: string;
  propertyId: string;
  createdAt: string;
}

export interface Amenity {
  id: string;
  name: string;
  icon: string;
}

export interface PropertyAmenity {
  propertyId: string;
  amenityId: string;
  amenity: Amenity;
}

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  address: string;
  city: string;
  district: string;
  ward: string;
  area: number;
  bedrooms: number;
  bathrooms: number;
  propertyType: PropertyType;
  status: PropertyStatus;
  isFeatured: boolean;
  views: number;
  createdAt: string;
  updatedAt: string;
  userId: string;
  images: Image[];
  user: {
    id: string;
    name: string;
    image?: string;
  };
  amenities: PropertyAmenity[];
} 