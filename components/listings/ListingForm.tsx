'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { useSession } from "next-auth/react";
import Map from '@/components/Map';
import Input from '@/components/inputs/Input';
import TextArea from '@/components/inputs/TextArea';
import Select from '@/components/inputs/Select';
import Button from '@/components/Button';
import ImageUpload from '@/components/inputs/ImageUpload';
import { listingSchema, ListingFormData } from '@/lib/validations/listing';

const propertyTypes = [
  { value: 'ROOM', label: 'Phòng trọ' },
  { value: 'APARTMENT', label: 'Căn hộ' },
  { value: 'HOUSE', label: 'Nhà nguyên căn' },
  { value: 'STUDIO', label: 'Studio' },
  { value: 'SHARED', label: 'Ở ghép' },
];

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
];

export default function ListingForm() {
  const router = useRouter();
  const { data: session } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [images, setImages] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ListingFormData>({
    resolver: zodResolver(listingSchema),
    defaultValues: {
      title: '',
      description: '',
      price: 0,
      area: 0,
      propertyType: '',
      address: '',
      city: '',
      district: '',
      ward: '',
      bedrooms: 0,
      bathrooms: 0,
      amenities: [],
      images: [],
      latitude: 0,
      longitude: 0,
    }
  });

  const handleImageUpload = async (files: FileList) => {
    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: 'POST',
            body: formData,
          }
        );

        const data = await response.json();
        return data.secure_url;
      });

      const uploadedUrls = await Promise.all(uploadPromises);
      setImages(prev => [...prev, ...uploadedUrls]);
      setValue('images', [...images, ...uploadedUrls]);
    } catch (error) {
      toast.error('Có lỗi xảy ra khi tải ảnh lên');
    }
  };

  const onSubmit: SubmitHandler<ListingFormData> = async (data) => {
    if (!session) {
      toast.error('Vui lòng đăng nhập để đăng tin');
      router.push('/auth/login');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/listings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Có lỗi xảy ra");
      }

      toast.success("Đăng tin thành công!");
      router.push("/my-listings");
    } catch (error) {
      toast.error("Đã có lỗi xảy ra, vui lòng thử lại");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8">
      <div className="space-y-4">
        <Input
          id="title"
          label="Tiêu đề"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />

        <TextArea
          id="description"
          label="Mô tả"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            id="price"
            label="Giá thuê/tháng"
            type="number"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />

          <Input
            id="area"
            label="Diện tích (m²)"
            type="number"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
        </div>

        <Select
          id="propertyType"
          label="Loại hình"
          disabled={isLoading}
          register={register}
          errors={errors}
          options={propertyTypes}
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            id="city"
            label="Thành phố"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />

          <Input
            id="district"
            label="Quận/Huyện"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />

          <Input
            id="ward"
            label="Phường/Xã"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
        </div>

        <Input
          id="address"
          label="Địa chỉ cụ thể"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            id="bedrooms"
            label="Số phòng ngủ"
            type="number"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />

          <Input
            id="bathrooms"
            label="Số phòng tắm"
            type="number"
            disabled={isLoading}
            register={register}
            errors={errors}
            required
          />
        </div>
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Tiện ích
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {amenityOptions.map((amenity) => (
            <label
              key={amenity}
              className="flex items-center space-x-2 cursor-pointer"
            >
              <input
                type="checkbox"
                {...register('amenities')}
                value={amenity}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span>{amenity}</span>
            </label>
          ))}
        </div>
        {errors.amenities && (
          <p className="mt-1 text-sm text-red-600">{errors.amenities.message}</p>
        )}
      </div>

      <div className="space-y-4">
        <label className="block text-sm font-medium text-gray-700">
          Hình ảnh
        </label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => e.target.files && handleImageUpload(e.target.files)}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-primary file:text-white
            hover:file:bg-primary-dark"
        />
        {errors.images && (
          <p className="mt-1 text-sm text-red-600">{errors.images.message}</p>
        )}

        {images.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
            {images.map((url, index) => (
              <div key={index} className="relative aspect-square">
                <img
                  src={url}
                  alt={`Preview ${index + 1}`}
                  className="object-cover rounded-lg w-full h-full"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImages(images.filter((_, i) => i !== index));
                    setValue('images', images.filter((_, i) => i !== index));
                  }}
                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-end">
        <Button
          label="Đăng tin"
          onClick={handleSubmit(onSubmit)}
          disabled={isLoading}
        />
      </div>
    </form>
  );
} 