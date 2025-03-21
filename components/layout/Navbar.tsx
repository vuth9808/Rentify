'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { FiMenu, FiX, FiUser, FiHeart, FiMessageSquare, FiPlusCircle } from 'react-icons/fi';

const navigation = [
  { name: 'Trang chủ', href: '/' },
  { name: 'Tìm phòng', href: '/listings' },
  { name: 'Đăng tin', href: '/create-listing' },
  { name: 'Về chúng tôi', href: '/about' },
  { name: 'Liên hệ', href: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const isLoggedIn = false; // Replace with actual auth state

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.svg"
                alt="Rentify Logo"
                width={40}
                height={40}
                className="w-auto h-8"
              />
              <span className="ml-2 text-xl font-bold text-primary-600">Rentify</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center ml-10 space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-2 text-sm font-medium rounded-md ${
                    pathname === item.href
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* User Menu */}
          <div className="hidden md:block">
            <div className="flex items-center ml-4 space-x-4">
              {isLoggedIn ? (
                <>
                  <Link href="/favorites" className="text-gray-500 hover:text-primary-600">
                    <FiHeart className="w-6 h-6" />
                  </Link>
                  <Link href="/messages" className="text-gray-500 hover:text-primary-600">
                    <FiMessageSquare className="w-6 h-6" />
                  </Link>
                  <Link
                    href="/profile"
                    className="flex items-center text-sm font-medium text-gray-700 rounded-full hover:text-primary-600 focus:outline-none"
                  >
                    <span className="sr-only">Open user menu</span>
                    <div className="w-8 h-8 overflow-hidden bg-gray-200 rounded-full">
                      <FiUser className="w-full h-full p-1 text-gray-600" />
                    </div>
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="px-4 py-2 text-sm font-medium text-gray-700 border border-transparent rounded-md hover:bg-gray-50"
                  >
                    Đăng nhập
                  </Link>
                  <Link
                    href="/register"
                    className="px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md bg-primary-600 hover:bg-primary-700"
                  >
                    Đăng ký
                  </Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center -mr-2 md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <FiX className="block w-6 h-6" aria-hidden="true" />
              ) : (
                <FiMenu className="block w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white sm:px-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-3 py-2 text-base font-medium rounded-md ${
                  pathname === item.href
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            {isLoggedIn ? (
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex items-center px-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 overflow-hidden bg-gray-200 rounded-full">
                      <FiUser className="w-full h-full p-1 text-gray-600" />
                    </div>
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-gray-800">Tên người dùng</div>
                    <div className="text-sm font-medium text-gray-500">email@example.com</div>
                  </div>
                </div>
                <div className="px-2 mt-3 space-y-1">
                  <Link
                    href="/profile"
                    className="block px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:text-primary-600 hover:bg-gray-50"
                    onClick={() => setIsOpen(false)}
                  >
                    Hồ sơ cá nhân
                  </Link>
                  <Link
                    href="/favorites"
                    className="block px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:text-primary-600 hover:bg-gray-50"
                    onClick={() => setIsOpen(false)}
                  >
                    Danh sách yêu thích
                  </Link>
                  <Link
                    href="/messages"
                    className="block px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:text-primary-600 hover:bg-gray-50"
                    onClick={() => setIsOpen(false)}
                  >
                    Tin nhắn
                  </Link>
                  <button
                    className="block w-full px-3 py-2 text-base font-medium text-left text-gray-700 rounded-md hover:text-primary-600 hover:bg-gray-50"
                    onClick={() => setIsOpen(false)}
                  >
                    Đăng xuất
                  </button>
                </div>
              </div>
            ) : (
              <div className="pt-4 pb-3 mt-4 border-t border-gray-200">
                <div className="flex flex-col space-y-3 px-4">
                  <Link
                    href="/login"
                    className="block px-4 py-2 text-base font-medium text-center text-gray-700 bg-gray-50 border border-gray-200 rounded-md hover:bg-gray-100"
                    onClick={() => setIsOpen(false)}
                  >
                    Đăng nhập
                  </Link>
                  <Link
                    href="/register"
                    className="block px-4 py-2 text-base font-medium text-center text-white border border-transparent rounded-md bg-primary-600 hover:bg-primary-700"
                    onClick={() => setIsOpen(false)}
                  >
                    Đăng ký
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
} 