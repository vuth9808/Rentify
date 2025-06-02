import SpringBootTest from '@/components/SpringBootTest';

export default function ApiTestPage() {
  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Kiểm tra kết nối Spring Boot</h1>
      <div className="max-w-md">
        <SpringBootTest />
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Hướng dẫn</h2>
        <ol className="list-decimal pl-6 space-y-2">
          <li>Đảm bảo Spring Boot server đang chạy trên port 8080</li>
          <li>Nếu thành công, bạn sẽ thấy tin nhắn từ Spring Boot API</li>
          <li>Nếu có lỗi, hãy kiểm tra console và đảm bảo server đang chạy</li>
        </ol>
      </div>
    </div>
  );
} 