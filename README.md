# Rentify - Nền tảng tìm kiếm và cho thuê trọ trực tuyến

Rentify là một nền tảng tìm kiếm và cho thuê phòng trọ, căn hộ trực tuyến, kết nối chủ trọ và người thuê một cách nhanh chóng và tiện lợi.

## Tính năng chính

- **Xác thực người dùng**: Đăng ký, đăng nhập bằng email hoặc mạng xã hội
- **Quản lý hồ sơ**: Chỉnh sửa thông tin cá nhân, mật khẩu
- **Đăng tin cho thuê**: Đăng tin với nhiều hình ảnh, thông tin chi tiết
- **Tìm kiếm và lọc**: Tìm kiếm theo địa điểm, giá, diện tích, tiện ích
- **Bản đồ**: Hiển thị vị trí phòng trọ trên bản đồ
- **Yêu thích**: Lưu tin đăng yêu thích để xem sau
- **Tin nhắn**: Chat trực tiếp giữa chủ trọ và người thuê
- **Đặt lịch xem phòng**: Đặt lịch và nhận thông báo

## Công nghệ sử dụng

- **Frontend**: Next.js 14+, TypeScript, Tailwind CSS, React Hook Form, React-Query
- **Backend**: Next.js API Routes, Prisma ORM
- **Cơ sở dữ liệu**: PostgreSQL
- **Xác thực**: NextAuth.js (Auth.js)
- **Lưu trữ hình ảnh**: Cloudinary
- **Bản đồ**: Mapbox
- **Thanh toán** _(tùy chọn)_: Stripe

## Cài đặt và chạy ứng dụng

### Yêu cầu

- Node.js 18.0.0 trở lên
- NPM hoặc Yarn
- PostgreSQL

### Các bước cài đặt

1. Clone repository:

   ```bash
   git clone https://github.com/your-username/rentify.git
   cd rentify
   ```

2. Cài đặt dependencies:

   ```bash
   npm install
   ```

3. Tạo file .env từ file .env.example và cập nhật các biến môi trường

4. Khởi tạo cơ sở dữ liệu:

   ```bash
   npx prisma db push
   ```

5. Chạy seed để tạo dữ liệu mẫu (tùy chọn):

   ```bash
   npx prisma db seed
   ```

6. Chạy ứng dụng ở môi trường phát triển:

   ```bash
   npm run dev
   ```

7. Truy cập ứng dụng tại `http://localhost:3000`

## Cấu trúc dự án

```
rentify/
  ├── app/                  # App router và các route
  ├── components/           # UI components
  ├── lib/                  # Các utility functions và API services
  ├── prisma/               # Prisma schema và migrations
  ├── public/               # Static assets
  └── ...
```

## Đóng góp

Vui lòng đọc [CONTRIBUTING.md](CONTRIBUTING.md) để biết chi tiết về quy trình đóng góp cho dự án.

## Giấy phép

Dự án này được cấp phép theo [MIT License](LICENSE).
