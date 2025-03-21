'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Đã xảy ra lỗi!</h2>
      <p className="text-gray-600 mb-8 max-w-md">
        Rất tiếc, đã có lỗi xảy ra. Vui lòng thử lại sau hoặc quay về trang chủ.
      </p>
      <div className="flex gap-4">
        <Button
          onClick={reset}
          variant="default"
        >
          Thử lại
        </Button>
        <Button
          onClick={() => window.location.href = '/'}
          variant="outline"
        >
          Về trang chủ
        </Button>
      </div>
    </div>
  );
} 