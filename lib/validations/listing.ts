import * as z from "zod";

export const listingSchema = z.object({
  title: z.string().min(1, 'Vui lòng nhập tiêu đề'),
  description: z.string().min(1, 'Vui lòng nhập mô tả'),
  price: z.number().min(1, 'Vui lòng nhập giá'),
  area: z.number().min(1, 'Vui lòng nhập diện tích'),
  propertyType: z.string().min(1, 'Vui lòng chọn loại hình'),
  address: z.string().min(1, 'Vui lòng nhập địa chỉ'),
  city: z.string().min(1, 'Vui lòng nhập thành phố'),
  district: z.string().min(1, 'Vui lòng nhập quận/huyện'),
  ward: z.string().min(1, 'Vui lòng nhập phường/xã'),
  bedrooms: z.number().min(0, 'Số phòng ngủ không hợp lệ'),
  bathrooms: z.number().min(0, 'Số phòng tắm không hợp lệ'),
  amenities: z.array(z.string()).min(1, 'Vui lòng chọn ít nhất 1 tiện ích'),
  images: z.array(z.string()).min(1, 'Vui lòng tải lên ít nhất 1 ảnh'),
  latitude: z.number(),
  longitude: z.number(),
});

export type ListingFormData = z.infer<typeof listingSchema>; 