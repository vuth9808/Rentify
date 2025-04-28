'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const testimonials = [
  {
    id: 1,
    content:
      'Nhờ Rentify mà mình đã tìm được phòng trọ ưng ý trong vòng 2 ngày. Giao diện dễ sử dụng, thông tin chi tiết và đặc biệt là có hình ảnh thực tế giúp mình tiết kiệm thời gian xem phòng rất nhiều.',
    name: 'Nguyễn Minh Anh',
    role: 'Sinh viên Đại học',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
  },
  {
    id: 2,
    content:
      'Là chủ nhà cho thuê, tôi rất hài lòng với Rentify. Việc đăng tin dễ dàng, có nhiều người quan tâm liên hệ và tôi cho thuê được phòng nhanh chóng mà không cần qua môi giới.',
    name: 'Trần Văn Hùng',
    role: 'Chủ nhà trọ',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
  },
  {
    id: 3,
    content:
      'Mình là người hay di chuyển công tác, và Rentify là ứng dụng không thể thiếu mỗi khi cần tìm chỗ ở mới. Đặc biệt tính năng lọc theo vị trí và bản đồ giúp mình định vị được nơi ở gần công ty rất tiện.',
    name: 'Lê Thị Hương',
    role: 'Nhân viên văn phòng',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
  },
  {
    id: 4,
    content:
      'Tính năng chat trực tiếp với chủ trọ của Rentify rất hữu ích, giúp tôi làm rõ nhiều thông tin trước khi quyết định xem phòng. Điều này tiết kiệm rất nhiều thời gian cho cả hai bên.',
    name: 'Pham Quang Minh',
    role: 'Freelancer',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e',
  },
];

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const next = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container px-4 mx-auto">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">
            Người dùng nói gì về Rentify
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Hàng nghìn người dùng đã tin tưởng Rentify để tìm kiếm và cho thuê phòng trọ
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden bg-white rounded-xl shadow-lg">
            <div className="px-6 py-8 md:p-10">
              <div className="flex flex-col items-center md:flex-row">
                <div className="flex-shrink-0 mb-6 md:mb-0 md:mr-8">
                  <div className="relative w-24 h-24 overflow-hidden rounded-full">
                    <Image
                      src={testimonials[currentIndex].avatar}
                      alt={testimonials[currentIndex].name}
                      fill
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <blockquote className="mb-4 text-lg italic text-gray-700">
                    "{testimonials[currentIndex].content}"
                  </blockquote>
                  <div>
                    <p className="text-lg font-semibold text-gray-900">
                      {testimonials[currentIndex].name}
                    </p>
                    <p className="text-gray-600">{testimonials[currentIndex].role}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center mt-8 space-x-4">
            <button
              onClick={prev}
              className="p-2 text-gray-600 transition-colors border border-gray-300 rounded-full hover:bg-gray-100"
              aria-label="Previous testimonial"
            >
              <FiChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={next}
              className="p-2 text-gray-600 transition-colors border border-gray-300 rounded-full hover:bg-gray-100"
              aria-label="Next testimonial"
            >
              <FiChevronRight className="w-6 h-6" />
            </button>
          </div>

          <div className="flex justify-center mt-4">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 mx-1 rounded-full ${
                  currentIndex === index ? 'bg-primary-600' : 'bg-gray-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
} 