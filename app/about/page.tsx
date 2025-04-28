"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-center mb-8">Về Rentify</h1>
        
        <div className="grid grid-cols-12 gap-4 mb-12">
          {/* Hình ảnh chính */}
          <div className="col-span-12 relative h-[400px] rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2069&auto=format&fit=crop"
              alt="Rentify Office Main"
              fill
              className="object-cover"
              priority
            />
          </div>
          
          {/* Hình ảnh phụ */}
          <div className="col-span-12 md:col-span-4 relative h-[200px] rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1604328698692-f76ea9498e76?q=80&w=2070&auto=format&fit=crop"
              alt="Rentify Meeting Room"
              fill
              className="object-cover"
            />
          </div>
          <div className="col-span-12 md:col-span-4 relative h-[200px] rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1497215842964-222b430dc094?q=80&w=2070&auto=format&fit=crop"
              alt="Rentify Workspace"
              fill
              className="object-cover"
            />
          </div>
          <div className="col-span-12 md:col-span-4 relative h-[200px] rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?q=80&w=2070&auto=format&fit=crop"
              alt="Rentify Collaboration Space"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="space-y-6 text-lg">
          <p className="text-xl leading-relaxed">
            Rentify là nền tảng kết nối chủ nhà và người thuê nhà hàng đầu tại Việt Nam. 
            Chúng tôi cung cấp giải pháp toàn diện giúp việc tìm kiếm và cho thuê nhà trở nên 
            dễ dàng, an toàn và hiệu quả hơn.
          </p>

          <h2 className="text-3xl font-semibold mt-12">Sứ mệnh của chúng tôi</h2>
          <p className="text-gray-600">
            Sứ mệnh của Rentify là tạo ra một hệ sinh thái cho thuê nhà minh bạch và chuyên nghiệp, 
            nơi mọi người đều có thể tìm thấy ngôi nhà phù hợp với nhu cầu và ngân sách của mình.
          </p>

          <h2 className="text-3xl font-semibold mt-12">Giá trị cốt lõi</h2>
          <ul className="list-none space-y-4">
            <li className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
              <span>Minh bạch trong mọi giao dịch</span>
            </li>
            <li className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
              <span>Đặt lợi ích khách hàng lên hàng đầu</span>
            </li>
            <li className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
              <span>Không ngừng đổi mới và cải tiến</span>
            </li>
            <li className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
              <span>Xây dựng cộng đồng bền vững</span>
            </li>
          </ul>

          <h2 className="text-3xl font-semibold mt-12 mb-8">Con số ấn tượng</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="text-5xl font-bold text-emerald-600 mb-2">10,000+</div>
              <div className="text-gray-600">Tin đăng hoạt động</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="text-5xl font-bold text-emerald-600 mb-2">50,000+</div>
              <div className="text-gray-600">Người dùng tin cậy</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="text-5xl font-bold text-emerald-600 mb-2">63</div>
              <div className="text-gray-600">Tỉnh thành phủ sóng</div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 