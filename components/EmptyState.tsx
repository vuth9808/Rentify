'use client';

import { useRouter } from "next/navigation";
import Button from "./Button";
import Heading from "./Heading";

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
  showLogin?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = "Không tìm thấy kết quả",
  subtitle = "Thử thay đổi hoặc xóa bộ lọc tìm kiếm của bạn",
  showReset,
  showLogin
}) => {
  const router = useRouter();

  return ( 
    <div className="h-[60vh] flex flex-col gap-2 justify-center items-center">
      <Heading
        center
        title={title}
        subtitle={subtitle}
      />
      <div className="w-48 mt-4">
        {showReset && (
          <Button
            outline
            label="Xóa bộ lọc"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => router.push('/')}
          />
        )}
        {showLogin && (
          <Button
            outline
            label="Đăng nhập"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => router.push('/auth/login')}
          />
        )}
      </div>
    </div>
   );
}

export default EmptyState; 