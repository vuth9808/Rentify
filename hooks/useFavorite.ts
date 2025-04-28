import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useMemo } from "react";
import { toast } from "react-hot-toast";

import { SafeUser } from "@/types";

interface IUseFavorite {
  listingId: string;
  currentUser?: SafeUser | null;
}

const useFavorite = ({ listingId, currentUser }: IUseFavorite) => {
  const router = useRouter();

  const hasFavorited = useMemo(() => {
    const list = currentUser?.favoriteIds || [];

    return list.includes(listingId);
  }, [currentUser, listingId]);

  const toggleFavorite = useCallback(async (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();

    if (!currentUser) {
      return toast.error('Vui lòng đăng nhập');
    }

    try {
      let request;

      if (hasFavorited) {
        request = () => axios.delete(`/api/favorites/${listingId}`);
      } else {
        request = () => axios.post(`/api/favorites/${listingId}`);
      }

      await request();
      router.refresh();
      toast.success(hasFavorited ? 'Đã xóa khỏi danh sách yêu thích' : 'Đã thêm vào danh sách yêu thích');
    } catch (error) {
      toast.error('Có lỗi xảy ra');
    }
  }, 
  [
    currentUser, 
    hasFavorited, 
    listingId, 
    router
  ]);

  return {
    hasFavorited,
    toggleFavorite,
  }
}

export default useFavorite; 