# Hướng dẫn tích hợp Next.js và Spring Boot

Dự án này tích hợp Next.js (frontend) và Spring Boot (backend) để tạo ứng dụng web đầy đủ tính năng.

## Cấu trúc dự án

- **Next.js (Frontend)**: Chạy trên port 3000
- **Spring Boot (Backend)**: Chạy trên port 8080

## Cài đặt và chạy dự án

### Bước 1: Chạy Spring Boot server

1. Mở terminal và chạy Maven:

```bash
mvn clean install
mvn spring-boot:run
```

Hoặc mở dự án trong Eclipse/IntelliJ và chạy `SpringBootWebApplication.java`.

2. Kiểm tra Spring Boot API đang hoạt động bằng cách truy cập:
   - http://localhost:8080/api/hello

### Bước 2: Chạy Next.js frontend

1. Mở terminal khác và cài đặt các dependencies (nếu chưa có):

```bash
npm install
```

2. Chạy server phát triển:

```bash
npm run dev
```

3. Mở trình duyệt và truy cập:
   - http://localhost:3000
   - http://localhost:3000/api-test (để kiểm tra kết nối)

## Cách gọi API từ Next.js

1. Sử dụng thư viện Axios đã được cấu hình trong `lib/api.ts`:

```typescript
import api from "@/lib/api";

// Gọi API
const response = await api.get("/endpoint");
const data = response.data;
```

2. Tạo thêm các hàm API mới trong `lib/api.ts`:

```typescript
export const fetchData = async () => {
  try {
    const response = await api.get("/your-endpoint");
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
```

## Tạo API Spring Boot mới

1. Tạo các endpoint mới trong `src/main/java/com/javaweb/api/web/ApiController.java`:

```java
@GetMapping("/data")
public ResponseEntity<YourResponseType> getData() {
    // Xử lý logic
    return ResponseEntity.ok(yourData);
}

@PostMapping("/create")
public ResponseEntity<YourResponseType> createData(@RequestBody YourRequestType request) {
    // Xử lý logic
    return ResponseEntity.ok(createdData);
}
```

## Xử lý lỗi phổ biến

1. **CORS Error**: Đã cấu hình CORS trong `WebConfig.java`. Nếu vẫn gặp lỗi, hãy kiểm tra:

   - Origin URL đúng (http://localhost:3000)
   - Headers và Methods được cho phép

2. **Connection Refused**: Kiểm tra:

   - Spring Boot server đang chạy
   - Port 8080 không bị chặn hoặc sử dụng bởi ứng dụng khác

3. **404 Not Found**: Kiểm tra:
   - Đường dẫn API chính xác
   - RequestMapping và Endpoint đúng

## Triển khai (Deployment)

Khi triển khai lên môi trường production:

1. Cập nhật URL API trong `lib/api.ts` để trỏ đến URL server thực
2. Cập nhật CORS trong `WebConfig.java` để cho phép domain production
3. Cấu hình các biến môi trường trong file `.env` của Next.js

## Mở rộng

1. Thêm xác thực JWT
2. Cài đặt Redux hoặc Context API để quản lý state
3. Tích hợp WebSocket cho real-time updates
