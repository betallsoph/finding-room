"use client";

import Link from "next/link";
import Image from "next/image";
import { SparklesText } from "./components/sparkles-text";
import MainHeader from "./components/MainHeader";
import ShareFooter from "./components/ShareFooter";
import ProfileReminderModal from "./components/ProfileReminderModal";
import { useProfileReminder } from "./hooks/useProfileReminder";
import { Search, Home, MessageCircle, ArrowRight, MapPin, ShieldCheck, Star, BadgeCheck, Clock, ChevronLeft, ChevronRight } from "lucide-react";

const ListingCard = ({ image, title, price, location }: any) => (
  <Link href="#" className="block bg-white rounded-2xl border border-[#e8e4de] overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-lg">
    <div className="aspect-[4/3] bg-gray-100 relative">
      <img src={image} alt={title} className="w-full h-full object-cover" />
    </div>
    <div className="p-5">
      <h3 className="font-semibold text-[#1c1917] mb-2 line-clamp-3 h-[78px]">{title}</h3>
      <p className="text-[#f43f5e] font-bold mb-3">{price}</p>
      <div className="flex items-center gap-2 text-[#78716c] text-sm">
        <MapPin className="w-4 h-4 shrink-0" />
        <span className="truncate">{location}</span>
      </div>
    </div>
  </Link>
);

import { useState } from "react";

export default function LandingPage() {
  const { showReminder, dismissReminder } = useProfileReminder();
  const [featuredPage, setFeaturedPage] = useState(0);

  const handleFeaturedScroll = (e: any) => {
    const { scrollLeft, scrollWidth, clientWidth } = e.target;
    // On very wide screens, scroll space might be zero or tiny.
    if (scrollWidth - clientWidth <= 10) {
      if (featuredPage !== 0) setFeaturedPage(0);
      return;
    }
    const progress = scrollLeft / (scrollWidth - clientWidth);
    const newPage = Math.round(progress * 3); // 4 dots (0, 1, 2, 3)
    if (newPage !== featuredPage) {
      setFeaturedPage(newPage);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "#faf9f7" }}>
      <MainHeader />
      <ProfileReminderModal isOpen={showReminder} onClose={dismissReminder} />

      {/* ── Hero ──────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #eef2ff 0%, #fff1f2 50%, #faf9f7 100%)",
          paddingTop: "80px",
          paddingBottom: "96px",
        }}
      >
        {/* Decorative blobs */}
        <div aria-hidden className="absolute -top-24 -left-24 w-96 h-96 rounded-full opacity-30 pointer-events-none"
          style={{ background: "radial-gradient(circle, #c7d2fe 0%, transparent 70%)" }} />
        <div aria-hidden className="absolute -bottom-12 -right-12 w-72 h-72 rounded-full opacity-20 pointer-events-none"
          style={{ background: "radial-gradient(circle, #fecdd3 0%, transparent 70%)" }} />

        <div className="wrapper relative z-10 text-center">


          <h1 className="mb-6 font-bold leading-tight text-[#1c1917] max-w-3xl mx-auto">
            Tìm phòng thuê{" "}
            <SparklesText
              className="font-bold"
              sparklesCount={12}
              colors={{ first: "#6366f1", second: "#f43f5e" }}
            >
              dễ dàng.
            </SparklesText>
            <br className="hidden sm:block" />
            Kết nối thẳng chủ nhà.
          </h1>



          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Link href="/cho-thue" className="btn-primary text-base px-8 py-4 flex items-center gap-2">
              <Home className="w-4 h-4" />
              Xem phòng cho thuê
            </Link>
            <Link href="/tim-phong" className="btn-pink text-base px-8 py-4 flex items-center gap-2">
              <Search className="w-4 h-4" />
              Đăng tìm phòng
            </Link>
          </div>


        </div>
      </section>



      {/* ── Tin ưu tiên ──────────────────────────────────── */}
      <section className="section bg-white border-t border-[#f0ede8]">
        <div className="wrapper">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold">Tin ưu tiên</h2>
              <Star className="w-7 h-7" />
            </div>
            
            <div className="hidden md:flex gap-2">
              <button 
                onClick={() => document.getElementById('carousel-featured')?.scrollBy({ left: -300, behavior: 'smooth' })}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm border border-[#e8e4de] text-gray-600 hover:text-black hover:bg-gray-50 transition-all pointer-events-auto"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => document.getElementById('carousel-featured')?.scrollBy({ left: 300, behavior: 'smooth' })}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm border border-[#e8e4de] text-gray-600 hover:text-black hover:bg-gray-50 transition-all pointer-events-auto"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="relative w-full">
            <div 
              id="carousel-featured"
              onScroll={handleFeaturedScroll}
              className="grid grid-rows-2 grid-flow-col gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-4"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="snap-start w-[280px] sm:w-[300px]">
                  <ListingCard 
                    image={`https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80`}
                    title="Căn hộ mini full nội thất, khu vực an ninh, giờ giấc tự do"
                    price="4.5 Triệu/tháng"
                    location="Quận Bình Thạnh, TP.HCM"
                  />
                </div>
              ))}
            </div>
            
            {/* Pagination Dots */}
            <div className="flex justify-center items-center gap-2 mt-2">
              {[0, 1, 2, 3].map((page) => (
                <button
                  key={page}
                  onClick={() => {
                    const carousel = document.getElementById('carousel-featured');
                    if (carousel) {
                      const maxScroll = carousel.scrollWidth - carousel.clientWidth;
                      carousel.scrollTo({ left: (maxScroll / 3) * page, behavior: 'smooth' });
                    }
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    featuredPage === page ? "bg-[#4f46e5] w-6" : "bg-[#d6d3d1] w-2 hover:bg-[#a8a29e]"
                  }`}
                  aria-label={`Go to page ${page + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Dự án tài trợ & Quảng cáo ──────────────────────── */}
      <section className="section" style={{ background: "#faf9f7" }}>
        <div className="wrapper">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold">Dự án nổi bật / Tài trợ</h2>
              <BadgeCheck className="w-7 h-7" />
            </div>
            <div className="hidden md:flex gap-2">
              <button 
                onClick={() => document.getElementById('carousel-sponsored')?.scrollBy({ left: -300, behavior: 'smooth' })}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm border border-[#e8e4de] text-gray-600 hover:text-black hover:bg-gray-50 transition-all pointer-events-auto"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => document.getElementById('carousel-sponsored')?.scrollBy({ left: 300, behavior: 'smooth' })}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm border border-[#e8e4de] text-gray-600 hover:text-black hover:bg-gray-50 transition-all pointer-events-auto"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="relative">
            <div 
              id="carousel-sponsored"
              className="flex gap-6 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-4"
            >
              {[
                {
                  img: "https://images.unsplash.com/photo-1598928506311-c5520a76a89c?w=800&q=80",
                  title: "Ký túc xá cao cấp Sleepbox ngay trung tâm, khu sinh hoạt chung siêu rộng",
                  price: "Từ 1.8 Triệu/tháng",
                  location: "Quận 10, TP.HCM"
                },
                {
                  img: "https://images.unsplash.com/photo-1522771731478-44fbcd4b2169?w=800&q=80",
                  title: "Căn hộ dịch vụ Studio cửa sổ lớn, full nội thất gỗ, ban công cực chill",
                  price: "6.5 Triệu/tháng",
                  location: "Quận Bình Thạnh, TP.HCM"
                },
                {
                  img: "https://images.unsplash.com/photo-1502672260266-1c1e52697299?w=800&q=80",
                  title: "Nhà trọ cao cấp có gác xép, lối đi riêng, camera an ninh, giờ giấc tự do",
                  price: "3.5 Triệu/tháng",
                  location: "Quận 7, TP.HCM"
                },
                {
                  img: "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&q=80",
                  title: "Căn hộ mini cao cấp quận 3, thẻ từ an ninh, free dọn dẹp",
                  price: "5.5 Triệu/tháng",
                  location: "Quận 3, TP.HCM"
                },
                {
                  img: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&q=80",
                  title: "Ký túc xá sinh viên gần trường đại học, view thành phố tuyệt đẹp",
                  price: "Từ 1.5 Triệu/tháng",
                  location: "Giáp ranh Q1 & Phú Nhuận"
                }
              ].map((item, i) => (
                <div key={i} className="snap-start shrink-0 w-[280px] sm:w-[340px]">
                  <ListingCard 
                    image={item.img}
                    title={item.title}
                    price={item.price}
                    location={item.location}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Tin mới đăng ─────────────────────────────────── */}
      <section className="section bg-white border-t border-[#f0ede8]">
        <div className="wrapper">
          <div className="flex justify-between items-end mb-8">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold">Tin mới đăng</h2>
              <Clock className="w-7 h-7" />
            </div>
            <Link href="/cho-thue" className="text-sm font-semibold text-[#4f46e5] hover:underline flex items-center gap-1">
              Xem tất cả <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <ListingCard 
                key={i}
                image={`https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&q=80`}
                title="Phòng trọ gác xép mới xây, thoáng mát an ninh tốt"
                price="3.2 Triệu/tháng"
                location="Quận 7, TP.HCM"
                tag="Mới đây"
                tagColor="bg-emerald-500"
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Section ───────────────────────────────────── */}
      <section id="cta-section" className="section bg-white border-t border-[#f0ede8]">
        <div className="wrapper">
          <div className="rounded-3xl overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #4f46e5 100%)",
              padding: "clamp(40px, 6vw, 72px)",
            }}>
            <div className="text-center text-white max-w-2xl mx-auto">
              <ShieldCheck className="w-12 h-12 mx-auto mb-6 opacity-80" />
              <h2 className="mb-4 text-white font-bold" style={{ letterSpacing: "-0.02em" }}>
                Bạn đang cần gì hôm nay?
              </h2>
              <p className="mb-10 text-white/70 text-lg">
                Chọn mục phù hợp với bạn — chủ nhà hay người đi thuê
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/cho-thue"
                  className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-[#4f46e5] font-semibold text-base transition-all hover:-translate-y-1 hover:shadow-xl"
                  style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.15)" }}
                >
                  <Home className="w-5 h-5" />
                  Xem phòng cho thuê
                </Link>
                <Link
                  href="/tim-phong"
                  className="flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white/15 text-white font-semibold text-base border border-white/30 transition-all hover:-translate-y-1 hover:bg-white/25"
                >
                  <Search className="w-5 h-5" />
                  Đăng tìm phòng
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ShareFooter />
    </div>
  );
}
