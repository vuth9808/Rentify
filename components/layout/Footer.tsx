import Link from 'next/link';
import Image from 'next/image';
import { FiMail, FiPhone, FiMapPin, FiFacebook, FiInstagram, FiTwitter, FiYoutube } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container px-4 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo and about */}
          <div>
            <Link href="/" className="flex items-center mb-4">
              <div className="w-10 h-10 mr-3 overflow-hidden bg-white rounded-md">
                <Image src="/logo.svg" alt="Rentify Logo" width={40} height={40} />
              </div>
              <span className="text-xl font-bold text-white">Rentify</span>
            </Link>
            <p className="mb-4 text-gray-400">
              Nền tảng tìm kiếm và cho thuê trọ trực tuyến hàng đầu Việt Nam. Kết nối chủ trọ và
              người thuê một cách đơn giản, nhanh chóng và hiệu quả.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <FiFacebook className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FiInstagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FiTwitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <FiYoutube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Liên kết nhanh</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/listings" className="text-gray-400 hover:text-white">
                  Tìm phòng
                </Link>
              </li>
              <li>
                <Link href="/create-listing" className="text-gray-400 hover:text-white">
                  Đăng tin cho thuê
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white">
                  Về chúng tôi
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white">
                  Liên hệ
                </Link>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Hỗ trợ</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/help" className="text-gray-400 hover:text-white">
                  Trung tâm trợ giúp
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-white">
                  Câu hỏi thường gặp
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 hover:text-white">
                  Điều khoản sử dụng
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-400 hover:text-white">
                  Chính sách bảo mật
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Liên hệ</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <FiMapPin className="w-5 h-5 mr-3 text-gray-400" />
                <span className="text-gray-400">
                  123 Đường Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh
                </span>
              </div>
              <div className="flex items-center">
                <FiPhone className="w-5 h-5 mr-3 text-gray-400" />
                <span className="text-gray-400">+84 (0) 123 456 789</span>
              </div>
              <div className="flex items-center">
                <FiMail className="w-5 h-5 mr-3 text-gray-400" />
                <span className="text-gray-400">contact@rentify.vn</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 mt-8 border-t border-gray-800">
          <p className="text-center text-gray-400">
            &copy; {new Date().getFullYear()} Rentify. Tất cả quyền được bảo lưu.
          </p>
        </div>
      </div>
    </footer>
  );
} 