'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function GlobalError({
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
    <html>
      <body>
        <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Xảy ra lỗi nghiêm trọng!</h1>
          <p className="text-gray-600 mb-8 max-w-md">
            Có vẻ như ứng dụng gặp phải lỗi đáng tiếc. Chúng tôi đã ghi nhận vấn đề này.
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
      </body>
    </html>
  );
} 