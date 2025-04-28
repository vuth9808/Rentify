// Khai báo các giá trị lọc chung để dùng xuyên suốt ứng dụng
// Đảm bảo tính nhất quán giữa SearchBar và AdvancedFilter

export const priceRanges = [
  { label: 'Tất cả', value: '' },
  { label: 'Dưới 2 triệu', value: '0-2000000' },
  { label: '2 - 3 triệu', value: '2000000-3000000' },
  { label: '3 - 5 triệu', value: '3000000-5000000' },
  { label: '5 - 7 triệu', value: '5000000-7000000' },
  { label: '7 - 10 triệu', value: '7000000-10000000' },
  { label: '10 - 15 triệu', value: '10000000-15000000' },
  { label: 'Trên 15 triệu', value: '15000000-999999999' }
];

export const areaRanges = [
  { label: 'Tất cả', value: '' },
  { label: 'Dưới 20m²', value: '0-20' },
  { label: '20 - 30m²', value: '20-30' },
  { label: '30 - 50m²', value: '30-50' },
  { label: '50 - 70m²', value: '50-70' },
  { label: '70 - 90m²', value: '70-90' },
  { label: 'Trên 90m²', value: '90-999' }
];

export const propertyTypes = [
  { label: 'Tất cả', value: '' },
  { label: 'Phòng trọ', value: 'phong-tro' },
  { label: 'Chung cư mini', value: 'chung-cu-mini' },
  { label: 'Nhà nguyên căn', value: 'nha-nguyen-can' },
  { label: 'Căn hộ', value: 'can-ho' },
  { label: 'Ở ghép', value: 'o-ghep' }
];

export const districts = [
  'Quận 1', 'Quận 3', 'Quận 4', 'Quận 5', 'Quận 6', 'Quận 7', 'Quận 8', 'Quận 10', 
  'Quận 11', 'Quận 12', 'Quận Bình Tân', 'Quận Bình Thạnh', 'Quận Gò Vấp', 
  'Quận Phú Nhuận', 'Quận Tân Bình', 'Quận Tân Phú', 'Quận Thủ Đức'
]; 