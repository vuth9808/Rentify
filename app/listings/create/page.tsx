'use client'

import { useState } from 'react'
import Image from 'next/image'
import LocationPicker from '@/app/components/LocationPicker'

interface Location {
  lat: number
  lng: number
  address: string
}

interface FormData {
  title: string
  price: number
  area: number
  address: string
  description: string
  amenities: string[]
  images: File[]
  location: Location | null
}

const amenityOptions = [
  'Máy lạnh',
  'Tủ lạnh',
  'Máy giặt',
  'Nội thất',
  'Ban công',
  'Cửa sổ',
  'Bảo vệ 24/7',
  'Thang máy',
  'Gác lửng',
  'Wifi miễn phí',
  'Camera an ninh',
  'Tủ quần áo',
  'Bếp',
  'Tủ bếp'
]

export default function CreateListing() {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    price: 0,
    area: 0,
    address: '',
    description: '',
    amenities: [],
    images: [],
    location: null
  })

  const [previewImages, setPreviewImages] = useState<string[]>([])
  const [isPreviewMode, setIsPreviewMode] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleAmenityToggle = (amenity: string) => {
    setFormData(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    const newImages = Array.from(files)
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...newImages]
    }))

    // Tạo preview URLs cho ảnh
    const newPreviewUrls = newImages.map(file => URL.createObjectURL(file))
    setPreviewImages(prev => [...prev, ...newPreviewUrls])
  }

  const handleLocationSelect = (location: Location) => {
    setFormData(prev => ({
      ...prev,
      location,
      address: location.address
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const formDataToSend = new FormData()
      
      // Thêm các trường thông tin
      formDataToSend.append('title', formData.title)
      formDataToSend.append('price', formData.price.toString())
      formDataToSend.append('area', formData.area.toString())
      formDataToSend.append('address', formData.address)
      formDataToSend.append('description', formData.description)
      formDataToSend.append('amenities', JSON.stringify(formData.amenities))
      if (formData.location) {
        formDataToSend.append('location', JSON.stringify(formData.location))
      }

      // Thêm ảnh
      formData.images.forEach((image, index) => {
        formDataToSend.append(`image${index}`, image)
      })

      // Gửi request đến API
      const response = await fetch('/api/listings', {
        method: 'POST',
        body: formDataToSend
      })

      if (!response.ok) {
        throw new Error('Có lỗi xảy ra khi đăng tin')
      }

      // Chuyển hướng đến trang chi tiết tin đăng mới
      const data = await response.json()
      window.location.href = `/listings/${data.id}`
    } catch (error) {
      console.error('Error:', error)
      alert('Có lỗi xảy ra khi đăng tin')
    }
  }

  if (isPreviewMode) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setIsPreviewMode(false)}
            className="mb-4 text-primary hover:text-primary-dark"
          >
            ← Quay lại chỉnh sửa
          </button>

          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Ảnh */}
            {previewImages.length > 0 && (
              <div className="relative h-96">
                <Image
                  src={previewImages[0]}
                  alt={formData.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            {/* Thông tin chính */}
            <div className="p-6">
              <h1 className="text-3xl font-bold mb-4">{formData.title}</h1>
              <p className="text-2xl font-bold text-primary mb-4">
                {formData.price.toLocaleString('vi-VN')} VNĐ/tháng
              </p>
              <p className="text-gray-600 mb-4">{formData.address}</p>
              <p className="text-gray-600 mb-6">Diện tích: {formData.area}m²</p>

              {/* Mô tả */}
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Mô tả chi tiết</h2>
                <p className="text-gray-600 whitespace-pre-line">{formData.description}</p>
              </div>

              {/* Tiện ích */}
              {formData.amenities.length > 0 && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-2">Tiện ích</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {formData.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center">
                        <svg className="w-5 h-5 text-primary mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Vị trí trên bản đồ */}
              {formData.location && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-2">Vị trí</h2>
                  <div className="h-[300px]">
                    <LocationPicker
                      onLocationSelect={() => {}}
                    />
                  </div>
                </div>
              )}

              {/* Thêm ảnh khác */}
              {previewImages.length > 1 && (
                <div className="mt-6">
                  <h2 className="text-xl font-semibold mb-2">Hình ảnh khác</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {previewImages.slice(1).map((url, index) => (
                      <div key={index} className="relative aspect-square">
                        <Image
                          src={url}
                          alt={`Ảnh ${index + 2}`}
                          fill
                          className="object-cover rounded-lg"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 flex justify-end space-x-4">
            <button
              onClick={() => setIsPreviewMode(false)}
              className="px-6 py-3 rounded-md border border-primary text-primary hover:bg-primary hover:text-white transition-colors"
            >
              Chỉnh sửa
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-3 rounded-md bg-primary text-white hover:bg-primary-dark transition-colors"
            >
              Đăng tin
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Đăng tin cho thuê</h1>

      <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          {/* Thông tin cơ bản */}
          <h2 className="text-xl font-semibold mb-4">Thông tin cơ bản</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tiêu đề
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Giá thuê (VNĐ/tháng)
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  required
                  min="0"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Diện tích (m²)
                </label>
                <input
                  type="number"
                  name="area"
                  value={formData.area}
                  onChange={handleInputChange}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                  required
                  min="0"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Địa chỉ
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Mô tả chi tiết
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary"
                required
              />
            </div>
          </div>
        </div>

        {/* Vị trí */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Vị trí</h2>
          <LocationPicker onLocationSelect={handleLocationSelect} />
        </div>

        {/* Tiện ích */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Tiện ích</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {amenityOptions.map(amenity => (
              <label
                key={amenity}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={formData.amenities.includes(amenity)}
                  onChange={() => handleAmenityToggle(amenity)}
                  className="rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span>{amenity}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Upload ảnh */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Hình ảnh</h2>
          <div className="space-y-4">
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-primary file:text-white
                hover:file:bg-primary-dark"
            />

            {/* Preview ảnh */}
            {previewImages.length > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                {previewImages.map((url, index) => (
                  <div key={index} className="relative aspect-square">
                    <Image
                      src={url}
                      alt={`Preview ${index + 1}`}
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Nút xem trước và đăng tin */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => setIsPreviewMode(true)}
            className="px-6 py-3 rounded-md border border-primary text-primary hover:bg-primary hover:text-white transition-colors"
          >
            Xem trước
          </button>
          <button
            type="submit"
            className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-dark transition-colors"
          >
            Đăng tin
          </button>
        </div>
      </form>
    </div>
  )
} 