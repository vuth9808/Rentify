'use client'

const districts = [
  'Quận 1', 'Quận 3', 'Quận 4', 'Quận 5', 'Quận 6', 'Quận 7', 'Quận 8', 'Quận 10', 
  'Quận 11', 'Quận 12', 'Quận Bình Tân', 'Quận Bình Thạnh', 'Quận Gò Vấp', 
  'Quận Phú Nhuận', 'Quận Tân Bình', 'Quận Tân Phú', 'Quận Thủ Đức'
]

const priceRanges = [
  { label: 'Tất cả', value: '' },
  { label: 'Dưới 2 triệu', value: '0-2000000' },
  { label: '2 - 3 triệu', value: '2000000-3000000' },
  { label: '3 - 5 triệu', value: '3000000-5000000' },
  { label: '5 - 7 triệu', value: '5000000-7000000' },
  { label: '7 - 10 triệu', value: '7000000-10000000' },
  { label: '10 - 15 triệu', value: '10000000-15000000' },
  { label: 'Trên 15 triệu', value: '15000000-999999999' }
]

const areaRanges = [
  { label: 'Tất cả', value: '' },
  { label: 'Dưới 20m²', value: '0-20' },
  { label: '20 - 30m²', value: '20-30' },
  { label: '30 - 50m²', value: '30-50' },
  { label: '50 - 70m²', value: '50-70' },
  { label: '70 - 90m²', value: '70-90' },
  { label: 'Trên 90m²', value: '90-999' }
]

export default function AdvancedFilter() {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-xl font-semibold mb-4">Lọc nâng cao</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Khoảng giá */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Khoảng giá
          </label>
          <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary">
            {priceRanges.map(range => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>

        {/* Diện tích */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Diện tích
          </label>
          <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary">
            {areaRanges.map(range => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
        </div>

        {/* Quận/Huyện */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quận/Huyện
          </label>
          <select className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary">
            <option value="">Tất cả</option>
            {districts.map(district => (
              <option key={district} value={district}>{district}</option>
            ))}
          </select>
        </div>

        {/* Nút tìm kiếm */}
        <div className="flex items-end">
          <button className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark transition-colors">
            Tìm kiếm
          </button>
        </div>
      </div>
    </div>
  )
} 