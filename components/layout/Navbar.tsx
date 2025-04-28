'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { FiMenu, FiX, FiUser, FiHeart, FiMessageSquare } from 'react-icons/fi';
import { useSession, signOut } from 'next-auth/react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';

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
  const { data: session, status } = useSession();
  const loading = status === 'loading';
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await signOut();
      setIsOpen(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleCreateListing = (e: React.MouseEvent) => {
    e.preventDefault();
    if (status !== 'authenticated') {
      toast.error('Vui lòng đăng nhập để đăng tin');
      router.push('/auth/login');
      return;
    }
    router.push('/create-listing');
  };

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
                (item.name === 'Đăng tin' ? (
                  <a
                    key={item.name}
                    href="/create-listing"
                    onClick={handleCreateListing}
                    className={`px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                      pathname === item.href
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                    }`}
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 ${
                      pathname === item.href
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                    }`}
                  >
                    {item.name}
                  </Link>
                ))
              ))}
            </div>
          </div>

          {/* User Menu */}
          <div className="hidden md:block">
            <div className="flex items-center ml-4 space-x-4">
              {loading ? (
                <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
              ) : session ? (
                <>
                  <Link href="/favorites" className="text-gray-500 hover:text-primary-600 transition-colors duration-200">
                    <div className="relative">
                      <FiHeart className="w-6 h-6" />
                      <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                        2
                      </span>
                    </div>
                  </Link>
                  <Link href="/messages" className="text-gray-500 hover:text-primary-600 transition-colors duration-200">
                    <div className="relative">
                      <FiMessageSquare className="w-6 h-6" />
                      <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary-500 text-xs text-white">
                        3
                      </span>
                    </div>
                  </Link>
                  <div className="relative group">
                    <button className="flex items-center text-sm font-medium text-gray-700 rounded-full hover:text-primary-600 focus:outline-none">
                      <span className="sr-only">Open user menu</span>
                      <div className="w-8 h-8 overflow-hidden bg-gray-200 rounded-full">
                        <FiUser className="w-full h-full p-1 text-gray-600" />
                      </div>
                    </button>
                    <div className="absolute right-0 w-48 py-2 mt-2 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Hồ sơ cá nhân
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Đăng xuất
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    href="/auth/login"
                    className="px-4 py-2 text-sm font-medium text-gray-700 border border-transparent rounded-md hover:bg-gray-50 transition-colors duration-200"
                  >
                    Đăng nhập
                  </Link>
                  <Link
                    href="/auth/register"
                    className="px-4 py-2 text-sm font-medium text-white border border-transparent rounded-md bg-primary-600 hover:bg-primary-700 transition-colors duration-200"
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
              className="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 transition-colors duration-200"
            >
              <span className="sr-only">Open main menu</span>
              <AnimatePresence mode="wait">
                {isOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FiX className="block w-6 h-6" aria-hidden="true" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <FiMenu className="block w-6 h-6" aria-hidden="true" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block px-3 py-2 text-base font-medium rounded-md transition-colors duration-200 ${
                    pathname === item.href
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              {loading ? (
                <div className="px-3 py-2">
                  <div className="w-24 h-6 bg-gray-200 rounded animate-pulse" />
                </div>
              ) : session ? (
                <div className="pt-4 pb-3 border-t border-gray-200">
                  <div className="flex items-center px-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 overflow-hidden bg-gray-200 rounded-full">
                        <FiUser className="w-full h-full p-1 text-gray-600" />
                      </div>
                    </div>
                    <div className="ml-3">
                      <div className="text-base font-medium text-gray-800">{session.user.name}</div>
                      <div className="text-sm font-medium text-gray-500">{session.user.email}</div>
                    </div>
                  </div>
                  <div className="px-2 mt-3 space-y-1">
                    <Link
                      href="/profile"
                      className="block px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:text-primary-600 hover:bg-gray-50 transition-colors duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      Hồ sơ cá nhân
                    </Link>
                    <Link
                      href="/favorites"
                      className="block px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:text-primary-600 hover:bg-gray-50 transition-colors duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      Danh sách yêu thích
                    </Link>
                    <Link
                      href="/messages"
                      className="block px-3 py-2 text-base font-medium text-gray-700 rounded-md hover:text-primary-600 hover:bg-gray-50 transition-colors duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      Tin nhắn
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full px-3 py-2 text-left text-base font-medium text-gray-700 rounded-md hover:text-primary-600 hover:bg-gray-50 transition-colors duration-200"
                    >
                      Đăng xuất
                    </button>
                  </div>
                </div>
              ) : (
                <div className="pt-4 pb-3 mt-4 border-t border-gray-200">
                  <div className="flex flex-col space-y-3 px-4">
                    <Link
                      href="/auth/login"
                      className="block px-4 py-2 text-base font-medium text-center text-gray-700 bg-gray-50 border border-gray-200 rounded-md hover:bg-gray-100 transition-colors duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      Đăng nhập
                    </Link>
                    <Link
                      href="/auth/register"
                      className="block px-4 py-2 text-base font-medium text-center text-white border border-transparent rounded-md bg-primary-600 hover:bg-primary-700 transition-colors duration-200"
                      onClick={() => setIsOpen(false)}
                    >
                      Đăng ký
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
} 