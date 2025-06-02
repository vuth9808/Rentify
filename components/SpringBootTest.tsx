"use client";

import { useState, useEffect } from 'react';
import { fetchHello } from '@/lib/api';

interface HelloResponse {
  message: string;
}

export default function SpringBootTest() {
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const data = await fetchHello();
        setMessage(data.message);
        setError(null);
      } catch (err) {
        setError('Không thể kết nối đến Spring Boot API. Đảm bảo rằng server đang chạy.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  return (
    <div className="p-4 border rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Kết nối Spring Boot</h2>
      
      {loading && (
        <div className="text-gray-500">Đang tải...</div>
      )}
      
      {error && (
        <div className="text-red-500">{error}</div>
      )}
      
      {!loading && !error && (
        <div className="text-green-600">
          <p>Tin nhắn từ Spring Boot API:</p>
          <p className="font-medium">{message}</p>
        </div>
      )}
    </div>
  );
} 