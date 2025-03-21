// Mock data for development without a database

export const mockProperties = [
  {
    id: '1',
    title: 'Phòng trọ cao cấp gần Đại học Bách Khoa',
    description: 'Phòng trọ mới xây, sạch sẽ, thoáng mát, có cửa sổ, ban công. Gần các trường đại học, chợ, siêu thị.',
    price: 3000000,
    address: 'Số 123 Đường ABC',
    city: 'Hà Nội',
    district: 'Hai Bà Trưng',
    ward: 'Bách Khoa',
    area: 25,
    bedrooms: 1,
    bathrooms: 1,
    propertyType: 'ROOM',
    status: 'AVAILABLE',
    isFeatured: true,
    views: 120,
    createdAt: '2023-06-15T07:12:00.000Z',
    updatedAt: '2023-06-15T07:12:00.000Z',
    userId: 'user1',
    images: [
      {
        id: 'img1',
        url: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
        propertyId: '1',
        createdAt: '2023-06-15T07:12:00.000Z',
      }
    ],
    user: {
      id: 'user1',
      name: 'Nguyễn Văn A',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    },
    amenities: [
      { propertyId: '1', amenityId: 'am1', amenity: { id: 'am1', name: 'Wi-Fi', icon: 'wifi' } },
      { propertyId: '1', amenityId: 'am2', amenity: { id: 'am2', name: 'Điều hòa', icon: 'air-conditioner' } },
      { propertyId: '1', amenityId: 'am3', amenity: { id: 'am3', name: 'Máy giặt', icon: 'washing-machine' } },
    ]
  },
  {
    id: '2',
    title: 'Căn hộ mini full nội thất khu vực Cầu Giấy',
    description: 'Căn hộ mini đầy đủ nội thất, có ban công, gần công viên, trung tâm thương mại.',
    price: 5500000,
    address: 'Số 45 Đường XYZ',
    city: 'Hà Nội',
    district: 'Cầu Giấy',
    ward: 'Dịch Vọng',
    area: 35,
    bedrooms: 1,
    bathrooms: 1,
    propertyType: 'APARTMENT',
    status: 'AVAILABLE',
    isFeatured: true,
    views: 85,
    createdAt: '2023-06-10T09:30:00.000Z',
    updatedAt: '2023-06-10T09:30:00.000Z',
    userId: 'user2',
    images: [
      {
        id: 'img2',
        url: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2',
        propertyId: '2',
        createdAt: '2023-06-10T09:30:00.000Z',
      }
    ],
    user: {
      id: 'user2',
      name: 'Trần Thị B',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    },
    amenities: [
      { propertyId: '2', amenityId: 'am1', amenity: { id: 'am1', name: 'Wi-Fi', icon: 'wifi' } },
      { propertyId: '2', amenityId: 'am4', amenity: { id: 'am4', name: 'Tủ lạnh', icon: 'fridge' } },
      { propertyId: '2', amenityId: 'am5', amenity: { id: 'am5', name: 'Bếp', icon: 'kitchen' } },
    ]
  },
  {
    id: '3',
    title: 'Phòng trọ mới xây có gác lửng, ban công',
    description: 'Phòng trọ mới xây, có gác lửng rộng rãi, ban công thoáng mát, khu vực an ninh.',
    price: 2500000,
    address: 'Số: 78 Đường DEF',
    city: 'TP. Hồ Chí Minh',
    district: 'Bình Thạnh',
    ward: 'Phường 11',
    area: 20,
    bedrooms: 1,
    bathrooms: 1,
    propertyType: 'ROOM',
    status: 'AVAILABLE',
    isFeatured: true,
    views: 95,
    createdAt: '2023-06-20T10:15:00.000Z',
    updatedAt: '2023-06-20T10:15:00.000Z',
    userId: 'user3',
    images: [
      {
        id: 'img3',
        url: 'https://images.unsplash.com/photo-1531835551805-16d864c8d311',
        propertyId: '3',
        createdAt: '2023-06-20T10:15:00.000Z',
      }
    ],
    user: {
      id: 'user3',
      name: 'Lê Văn C',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    },
    amenities: [
      { propertyId: '3', amenityId: 'am1', amenity: { id: 'am1', name: 'Wi-Fi', icon: 'wifi' } },
      { propertyId: '3', amenityId: 'am6', amenity: { id: 'am6', name: 'Giữ xe', icon: 'parking' } },
    ]
  }
];

export const mockUsers = [
  {
    id: 'user1',
    name: 'Nguyễn Văn A',
    email: 'nguyenvana@example.com',
    emailVerified: '2023-05-01T08:00:00.000Z',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    createdAt: '2023-05-01T08:00:00.000Z',
    updatedAt: '2023-05-01T08:00:00.000Z',
    role: 'HOST',
  },
  {
    id: 'user2',
    name: 'Trần Thị B',
    email: 'tranthib@example.com',
    emailVerified: '2023-05-02T09:00:00.000Z',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    createdAt: '2023-05-02T09:00:00.000Z',
    updatedAt: '2023-05-02T09:00:00.000Z',
    role: 'HOST',
  },
  {
    id: 'user3',
    name: 'Lê Văn C',
    email: 'levanc@example.com',
    emailVerified: '2023-05-03T10:00:00.000Z',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
    createdAt: '2023-05-03T10:00:00.000Z',
    updatedAt: '2023-05-03T10:00:00.000Z',
    role: 'HOST',
  },
  {
    id: 'user4',
    name: 'Phạm Thị D',
    email: 'phamthid@example.com',
    emailVerified: '2023-05-04T11:00:00.000Z',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    createdAt: '2023-05-04T11:00:00.000Z',
    updatedAt: '2023-05-04T11:00:00.000Z',
    role: 'USER',
  }
];

export const mockAmenities = [
  { id: 'am1', name: 'Wi-Fi', icon: 'wifi' },
  { id: 'am2', name: 'Điều hòa', icon: 'air-conditioner' },
  { id: 'am3', name: 'Máy giặt', icon: 'washing-machine' },
  { id: 'am4', name: 'Tủ lạnh', icon: 'fridge' },
  { id: 'am5', name: 'Bếp', icon: 'kitchen' },
  { id: 'am6', name: 'Giữ xe', icon: 'parking' },
  { id: 'am7', name: 'Bể bơi', icon: 'swimming-pool' },
  { id: 'am8', name: 'Bảo vệ', icon: 'security' },
  { id: 'am9', name: 'Thang máy', icon: 'elevator' },
  { id: 'am10', name: 'Nội thất', icon: 'furniture' },
]; 