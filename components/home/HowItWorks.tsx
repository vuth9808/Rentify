import { FiSearch, FiHome, FiMessageCircle, FiCheckCircle } from 'react-icons/fi';

const steps = [
  {
    icon: <FiSearch className="w-12 h-12 mx-auto text-primary-500" />,
    title: 'Tìm kiếm',
    description:
      'Tìm kiếm phòng trọ theo địa điểm, giá cả, diện tích và các tiện ích phù hợp với nhu cầu của bạn.',
  },
  {
    icon: <FiMessageCircle className="w-12 h-12 mx-auto text-primary-500" />,
    title: 'Liên hệ',
    description:
      'Liên hệ trực tiếp với chủ trọ qua hệ thống chat hoặc số điện thoại để đặt lịch xem phòng.',
  },
  {
    icon: <FiHome className="w-12 h-12 mx-auto text-primary-500" />,
    title: 'Xem phòng',
    description:
      'Xem phòng trực tiếp để đánh giá chất lượng, vị trí và môi trường xung quanh.',
  },
  {
    icon: <FiCheckCircle className="w-12 h-12 mx-auto text-primary-500" />,
    title: 'Ký hợp đồng',
    description:
      'Sau khi hài lòng, tiến hành đặt cọc và ký hợp đồng thuê trọ với chủ phòng.',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 bg-white">
      <div className="container px-4 mx-auto">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold text-gray-900">Cách Rentify hoạt động</h2>
          <p className="max-w-2xl mx-auto text-lg text-gray-600">
            Thuê phòng trọ chưa bao giờ dễ dàng hơn với quy trình đơn giản và hiệu quả của chúng tôi.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className="p-6 text-center bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="mb-4">{step.icon}</div>
              <h3 className="mb-3 text-xl font-semibold text-gray-800">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
              <div className="flex items-center justify-center mt-4">
                <span className="flex items-center justify-center w-8 h-8 text-white rounded-full bg-primary-500">
                  {index + 1}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <h3 className="mb-6 text-2xl font-semibold text-gray-800">
            Bạn là chủ nhà cần đăng tin cho thuê?
          </h3>
          <a
            href="/create-listing"
            className="inline-flex items-center px-6 py-3 text-lg font-medium text-white rounded-lg bg-primary-600 hover:bg-primary-700"
          >
            Đăng tin ngay
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
} 