"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import LocationInput from "@/components/inputs/LocationInput"
import Map from "@/components/Map"

interface FormData {
  title: string
  price: number
  area: number
  propertyType: string
  address: string
  city: string
  district: string
  ward: string
  description: string
  bedrooms: number
  bathrooms: number
  latitude: number
  longitude: number
}

export default function CreateListingPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [images, setImages] = useState<File[]>([])
  const [imageUrls, setImageUrls] = useState<string[]>([])

  const { register, handleSubmit, formState: { errors }, setValue, reset, watch } = useForm<FormData>()
  const address = watch('address')

  console.log("CreateListingPage Status:", status);
  console.log("CreateListingPage Session:", session);

  useEffect(() => {
    console.log("CreateListingPage useEffect Status:", status);
    if (status === "unauthenticated") {
      toast.error("Vui lòng đăng nhập để đăng tin")
      router.push("/auth/login")
    }
  }, [status, router])

  // Load saved form data when component mounts
  useEffect(() => {
    const savedData = localStorage.getItem('createListingForm')
    if (savedData) {
      const parsedData = JSON.parse(savedData)
      Object.keys(parsedData).forEach((key) => {
        setValue(key as keyof FormData, parsedData[key])
      })
    }

    const savedImageUrls = localStorage.getItem('createListingImageUrls')
    if (savedImageUrls) {
      setImageUrls(JSON.parse(savedImageUrls))
    }
  }, [setValue])

  // Save form data when it changes
  const saveFormData = (data: FormData) => {
    localStorage.setItem('createListingForm', JSON.stringify(data))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    setImages(files)

    // Tạo preview URLs
    const urls = files.map(file => URL.createObjectURL(file))
    setImageUrls(urls)
    localStorage.setItem('createListingImageUrls', JSON.stringify(urls))
  }

  const handleLocationChange = (value: string, lat?: number, lng?: number) => {
    setValue('address', value)
    if (lat && lng) {
      setValue('latitude', lat)
      setValue('longitude', lng)
    }
  }

  const onSubmit = async (data: FormData) => {
    if (status !== 'authenticated') {
      toast.error('Vui lòng đăng nhập để đăng tin');
      router.push('/auth/login');
      return;
    }
    try {
      setIsLoading(true)
      saveFormData(data)

      // Upload ảnh lên Cloudinary thông qua API
      const uploadPromises = images.map(image => {
        return new Promise<{ url: string; publicId: string }>(async (resolve, reject) => {
          try {
            const reader = new FileReader()
            reader.onloadend = async () => {
              const base64Data = reader.result as string
              const response = await fetch('/api/upload', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({ image: base64Data }),
              })

              if (!response.ok) {
                reject(new Error('Có lỗi xảy ra khi upload ảnh'))
                return
              }

              const result = await response.json()
              resolve(result)
            }
            reader.readAsDataURL(image)
          } catch (error) {
            reject(error)
          }
        })
      })

      const uploadedImages = await Promise.all(uploadPromises)

      // Gửi dữ liệu lên API
      const response = await fetch('/api/listings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          bedrooms: Number(data.bedrooms),
          bathrooms: Number(data.bathrooms),
          images: uploadedImages
        }),
      })

      const responseData = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          toast.error('Vui lòng đăng nhập để đăng tin');
          router.push('/auth/login');
          return;
        }
        toast.error(responseData.message || 'Có lỗi xảy ra khi đăng tin');
        return;
      }

      // Clear saved data after successful submission
      localStorage.removeItem('createListingForm');
      localStorage.removeItem('createListingImageUrls');

      toast.success('Đăng tin thành công!');
      // Chờ 1s cho toast hiện ra
      await new Promise(r => setTimeout(r, 1000));

      // Reset form và state ảnh
      reset();
      setImages([]);
      setImageUrls([]);

      // Redirect tới trang chi tiết tin vừa đăng
      if (responseData.id) {
        router.push(`/listings/${responseData.id}`);
      } else {
        router.push('/listings');
      }

    } catch (error) {
      console.error('Error:', error)
      toast.error('Có lỗi xảy ra, vui lòng thử lại')
    } finally {
      setIsLoading(false)
    }
  }

  if (status === "loading") {
    return <div className="flex justify-center items-center h-screen"><p>Đang tải dữ liệu người dùng...</p></div>
  }

  if (status !== "authenticated") {
    if (typeof window !== "undefined") {
      router.push("/auth/login");
    }
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-center text-red-500">
          Vui lòng đăng nhập để truy cập trang này.<br />
          Đang chuyển hướng đến trang đăng nhập...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Đăng tin cho thuê</h1>
      
      <div className="bg-white shadow-sm rounded-lg p-6">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Thông tin cơ bản */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Thông tin cơ bản</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Tiêu đề
                </label>
                <input
                  {...register("title", { required: "Vui lòng nhập tiêu đề" })}
                  type="text"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
                  placeholder="VD: Phòng trọ cao cấp quận 1"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Giá thuê (VNĐ/tháng)
                </label>
                <input
                  {...register("price", { 
                    required: "Vui lòng nhập giá thuê",
                    min: { value: 0, message: "Giá thuê phải lớn hơn 0" }
                  })}
                  type="number"
                  min="0"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
                  placeholder="VD: 5000000"
                />
                {errors.price && (
                  <p className="mt-1 text-sm text-red-600">{errors.price.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Diện tích (m²)
                </label>
                <input
                  {...register("area", { 
                    required: "Vui lòng nhập diện tích",
                    min: { value: 0, message: "Diện tích phải lớn hơn 0" }
                  })}
                  type="number"
                  min="0"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
                  placeholder="VD: 25"
                />
                {errors.area && (
                  <p className="mt-1 text-sm text-red-600">{errors.area.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Loại hình
                </label>
                <select 
                  {...register("propertyType", { required: "Vui lòng chọn loại hình" })}
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
                >
                  <option value="">Chọn loại hình</option>
                  <option value="ROOM">Phòng trọ</option>
                  <option value="APARTMENT">Căn hộ</option>
                  <option value="HOUSE">Nhà nguyên căn</option>
                  <option value="STUDIO">Studio</option>
                  <option value="SHARED">Ở ghép</option>
                </select>
                {errors.propertyType && (
                  <p className="mt-1 text-sm text-red-600">{errors.propertyType.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Địa chỉ */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Địa chỉ</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Địa chỉ cụ thể
                </label>
                <LocationInput
                  value={address || ""}
                  onChange={handleLocationChange}
                  placeholder="Nhập địa chỉ..."
                  className="mt-1"
                />
                {errors.address && (
                  <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
                )}
              </div>
              {/* Hiển thị bản đồ nếu có lat/lng */}
              {(watch('latitude') && watch('longitude')) && (
                <Map center={{ lat: watch('latitude'), lng: watch('longitude') }} markers={[{ lat: watch('latitude'), lng: watch('longitude'), title: address }]} />
              )}
            </div>
          </div>

          {/* Mô tả */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Mô tả chi tiết</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Mô tả
              </label>
              <textarea
                {...register("description", { required: "Vui lòng nhập mô tả" })}
                rows={4}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
                placeholder="Mô tả chi tiết về phòng/căn hộ của bạn..."
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
              )}
            </div>
          </div>

          {/* Tiện ích */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Tiện ích</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Số phòng ngủ
                </label>
                <input
                  {...register("bedrooms", { 
                    required: "Vui lòng nhập số phòng ngủ",
                    min: { value: 0, message: "Số phòng ngủ không hợp lệ" }
                  })}
                  type="number"
                  min="0"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
                  placeholder="VD: 2"
                />
                {errors.bedrooms && (
                  <p className="mt-1 text-sm text-red-600">{errors.bedrooms.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Số phòng tắm
                </label>
                <input
                  {...register("bathrooms", { 
                    required: "Vui lòng nhập số phòng tắm",
                    min: { value: 0, message: "Số phòng tắm không hợp lệ" }
                  })}
                  type="number"
                  min="0"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-teal-500 focus:outline-none focus:ring-teal-500 sm:text-sm"
                  placeholder="VD: 1"
                />
                {errors.bathrooms && (
                  <p className="mt-1 text-sm text-red-600">{errors.bathrooms.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Hình ảnh */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Hình ảnh</h2>
            <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
              <div className="space-y-1 text-center">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer rounded-md bg-white font-medium text-teal-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-teal-500 focus-within:ring-offset-2 hover:text-teal-500"
                  >
                    <span>Tải ảnh lên</span>
                    <input 
                      id="file-upload" 
                      name="file-upload" 
                      type="file" 
                      className="sr-only" 
                      multiple
                      onChange={handleImageChange}
                      accept="image/*"
                    />
                  </label>
                  <p className="pl-1">hoặc kéo thả vào đây</p>
                </div>
                <p className="text-xs text-gray-500">PNG, JPG, GIF tối đa 10MB</p>
              </div>
            </div>

            {/* Preview ảnh */}
            {imageUrls.length > 0 && (
              <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                {imageUrls.map((url, index) => (
                  <div key={index} className="relative">
                    <img
                      src={url}
                      alt={`Preview ${index + 1}`}
                      className="h-24 w-full object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      className="absolute top-0 right-0 p-1 bg-red-500 text-white rounded-full -mt-2 -mr-2"
                      onClick={() => {
                        setImages(images.filter((_, i) => i !== index))
                        setImageUrls(imageUrls.filter((_, i) => i !== index))
                      }}
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex justify-center rounded-md border border-transparent bg-teal-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Đang xử lý...' : 'Đăng tin'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 