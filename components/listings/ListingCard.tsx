'use client';

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import { CldImage } from 'next-cloudinary';

import useCountries from "@/hooks/useCountries";
import { SafeUser } from "@/types";

import HeartButton from "../HeartButton";
import Button from "../Button";

interface ListingCardProps {
  data: any;
  currentUser?: SafeUser | null;
}

const ListingCard: React.FC<ListingCardProps> = ({
  data,
  currentUser,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  const location = data.locationValue ? getByValue(data.locationValue) : null;

  const price = useMemo(() => {
    if (data.price) {
      return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(data.price);
    }

    return 'Thương lượng';
  }, [data.price]);

  return (
    <div 
      onClick={() => router.push(`/listings/${data.id}`)} 
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col gap-2 w-full">
        <div 
          className="
            aspect-square 
            w-full 
            relative 
            overflow-hidden 
            rounded-xl
          "
        >
          {data.imageSrc && (
            <Image
              src={data.imageSrc || "/images/placeholder.jpg"}
              alt={data.title || "Listing"}
              className="object-cover h-full w-full group-hover:scale-110 transition"
              fill
            />
          )}
          <div className="
            absolute
            top-3
            right-3
          ">
            <HeartButton 
              listingId={data.id} 
              currentUser={currentUser}
            />
          </div>
        </div>
        <div className="font-semibold text-lg">
          {data.title || "Chưa có tiêu đề"}
        </div>
        <div className="font-light text-neutral-500">
          {location?.label || data.locationValue || "Chưa có địa chỉ"}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">
            {price}
          </div>
          <div className="font-light">/tháng</div>
        </div>
      </div>
    </div>
   );
}

export default ListingCard; 