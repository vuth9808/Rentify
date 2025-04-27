'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import Map from '@/components/Map';
import mapboxgl from 'mapbox-gl';
import Input from '@/components/inputs/Input';
import TextArea from '@/components/inputs/TextArea';
import Select from '@/components/inputs/Select';
import Button from '@/components/Button';
import ImageUpload from '@/components/inputs/ImageUpload';
import useCountries from '@/hooks/useCountries';

const listingSchema = z.object({
  title: z.string().min(1, 'Vui lòng nhập tiêu đề'),
  description: z.string().min(1, 'Vui lòng nhập mô tả'),
  imageSrc: z.string().min(1, 'Vui lòng chọn ảnh'),
  price: z.number().min(1, 'Vui lòng nhập giá'),
  roomCount: z.number().min(1, 'Vui lòng nhập số phòng'),
  bathroomCount: z.number().min(1, 'Vui lòng nhập số phòng tắm'),
  locationValue: z.string().min(1, 'Vui lòng chọn khu vực'),
  utilities: z.array(z.string()).min(1, 'Vui lòng chọn ít nhất 1 tiện ích'),
  address: z.string().min(1, 'Vui lòng nhập địa chỉ'),
  phone: z.string().min(1, 'Vui lòng nhập số điện thoại'),
  latitude: z.number(),
  longitude: z.number(),
});

type ListingFormData = z.infer<typeof listingSchema>;

const utilities = [
  { value: "wifi", label: "Wifi" },
  { value: "air_conditioner", label: "Điều hòa" },
  { value: "washing_machine", label: "Máy giặt" },
  { value: "fridge", label: "Tủ lạnh" },
  { value: "parking", label: "Chỗ để xe" },
  { value: "security", label: "An ninh" },
  { value: "cleaning", label: "Dọn phòng" },
  { value: "water_heater", label: "Nóng lạnh" },
];

export default function ListingForm() {
  const router = useRouter();
  const { getAll } = useCountries();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ListingFormData>({
    resolver: zodResolver(listingSchema),
    defaultValues: {
      title: "",
      description: "",
      imageSrc: "",
      price: 0,
      roomCount: 1,
      bathroomCount: 1,
      locationValue: "",
      utilities: [],
      address: "",
      phone: "",
    },
  });

  const imageSrc = watch("imageSrc");

  const [location, setLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);

  const handleMapClick = (e: mapboxgl.MapMouseEvent) => {
    setLocation({
      lat: e.lngLat.lat,
      lng: e.lngLat.lng
    });
    setValue('latitude', e.lngLat.lat);
    setValue('longitude', e.lngLat.lng);
  };

  const onSubmit: SubmitHandler<ListingFormData> = async (data) => {
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
      <ImageUpload
        onChange={(value: string) => setValue("imageSrc", value)}
        value={imageSrc}
      />

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

      <Input
        id="price"
        label="Giá thuê/tháng"
        formatPrice
        type="number"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          id="roomCount"
          label="Số phòng"
          type="number"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
        <Input
          id="bathroomCount"
          label="Số phòng tắm"
          type="number"
          disabled={isLoading}
          register={register}
          errors={errors}
          required
        />
      </div>

      <Select
        id="locationValue"
        label="Địa điểm"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        options={getAll().map((location: { value: string; region: string; label: string }) => ({
          value: location.value,
          label: `${location.region} - ${location.label}`,
        }))}
      />

      <Select
        id="utilities"
        label="Tiện ích"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        multiple
        options={utilities}
      />

      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Vị trí</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Input
              id="address"
              label="Địa chỉ"
              disabled={isLoading}
              register={register}
              errors={errors}
              required
            />
            <div className="mt-4">
              <Map
                center={location || { lat: 10.762622, lng: 106.660172 }}
                onClick={handleMapClick}
                markers={location ? [{
                  lat: location.lat,
                  lng: location.lng
                }] : []}
              />
            </div>
          </div>
        </div>
      </div>

      <Input
        id="phone"
        label="Số điện thoại liên hệ"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />

      <div className="flex flex-col gap-2">
        <Button
          disabled={isLoading}
          label={isLoading ? "Đang xử lý..." : "Đăng tin"}
          onClick={() => {}}
        />
      </div>
    </form>
  );
} 