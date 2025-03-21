import Link from 'next/link';
import Image from 'next/image';
import SearchBar from '@/components/SearchBar';
import FeaturedListings from '@/components/home/FeaturedListings';
import HowItWorks from '@/components/home/HowItWorks';
import TestimonialsSection from '@/components/home/TestimonialsSection';

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center w-full h-[600px] bg-gradient-to-r from-primary-900 to-primary-700 text-white">
        <div className="absolute inset-0 z-0 opacity-30">
          <Image
            src="/images/hero-bg.jpg"
            alt="Background"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
        <div className="container z-10 flex flex-col items-center px-4 mx-auto text-center">
          <h1 className="mb-6 text-4xl font-bold md:text-5xl lg:text-6xl">
            Tìm phòng trọ lý tưởng của bạn
          </h1>
          <p className="mb-8 text-xl md:text-2xl">
            Nền tảng cho thuê và tìm kiếm phòng trọ trực tuyến uy tín hàng đầu
          </p>
          <SearchBar className="w-full max-w-3xl" />
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
            <Link
              href="/listings"
              className="px-6 py-3 text-lg font-medium text-white transition-colors rounded-lg bg-primary-500 hover:bg-primary-600"
            >
              Tìm phòng ngay
            </Link>
            <Link
              href="/create-listing"
              className="px-6 py-3 text-lg font-medium transition-colors border-2 rounded-lg text-primary-50 border-primary-50 hover:bg-white/10"
            >
              Đăng tin cho thuê
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Listings Section */}
      <FeaturedListings />

      {/* How It Works Section */}
      <HowItWorks />

      {/* Testimonials Section */}
      <TestimonialsSection />
    </div>
  );
} 