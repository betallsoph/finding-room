"use client";

import Link from "next/link";
import Image from "next/image";
import { MessageCircle, Search, Home, ArrowRight } from "lucide-react";
import { SparklesText } from "../components/sparkles-text";
import MainHeader from "../components/MainHeader";
import ShareFooter from "../components/ShareFooter";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <MainHeader />

      {/* Hero Section */}
      <section className="section bg-blue-50 py-16 sm:py-24 md:py-32">
        <div className="wrapper text-center">
          <h1 className="mb-8 font-bold leading-tight text-black">
            Về <span className="text-blue-500">roomie</span>
            <span className="text-pink-500">Verse</span>
          </h1>
          <p className="mb-10 text-base font-medium text-zinc-600 sm:text-lg md:text-xl max-w-3xl mx-auto">
            Nền tảng kết nối những người tìm phòng và roommate đáng tin cậy ở Việt Nam, đặc biệt là khu vực Sài Gòn.
            roomieVerse tin rằng tìm được người ở cùng phù hợp sẽ giúp cuộc sống của bạn trở nên tốt đẹp hơn.
          </p>
        </div>
      </section>

      {/* ── Tìm phòng thuê dễ dàng Hero ──────────────────── */}
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

      {/* Mission Section */}
      <section className="py-16 md:py-20 border-t-2 border-black">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 md:grid-cols-2 items-center">
            <div>
              <h2 className="mb-6 text-3xl font-bold sm:text-4xl">
                Sứ mệnh của chúng tôi
              </h2>
              <p className="mb-6 text-base sm:text-lg text-zinc-700 leading-relaxed">
                RoomieVerse ra đời với mong muốn giải quyết bài toán khó khăn trong việc tìm kiếm
                người ở ghép và phòng trọ phù hợp tại các thành phố lớn.
              </p>
              <p className="text-base sm:text-lg text-zinc-700 leading-relaxed">
                Chúng tôi không chỉ giúp bạn tìm phòng, mà còn tìm được những người bạn cùng phòng
                có lối sống, thói quen và giá trị tương đồng - để việc ở chung trở thành trải nghiệm tích cực.
              </p>
            </div>
            <div className="card bg-pink-200 p-8 text-center">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-2xl font-bold mb-3">Mục tiêu</h3>
              <p className="text-zinc-700">
                Kết nối 10,000+ người tìm phòng và roommate trong năm 2025
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── How it works ──────────────────────────────────── */}
      <section id="how-it-works" className="section bg-white border-t border-[#f0ede8]">
        <div className="wrapper">
          <div className="text-center mb-14">
            <h2 className="mb-3">Cách hoạt động</h2>
            <p className="text-[#78716c] max-w-lg mx-auto">Chỉ 3 bước đơn giản để tìm được phòng ưng ý</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                step: "01",
                icon: <MessageCircle className="w-7 h-7" style={{ color: "#4f46e5" }} />,
                bg: "#eef2ff",
                title: "Tạo tài khoản",
                desc: "Đăng ký miễn phí trong 1 phút bằng email hoặc Google.",
                time: "⏱ 1 phút",
              },
              {
                step: "02",
                icon: <Search className="w-7 h-7" style={{ color: "#f43f5e" }} />,
                bg: "#fff1f2",
                title: "Đăng tin hoặc tìm kiếm",
                desc: "Chủ nhà đăng tin cho thuê. Người thuê tìm kiếm hoặc đăng yêu cầu.",
                time: "⏱ 5 phút",
              },
              {
                step: "03",
                icon: <Home className="w-7 h-7" style={{ color: "#f59e0b" }} />,
                bg: "#fef3c7",
                title: "Liên hệ trực tiếp",
                desc: "Trao đổi qua điện thoại hoặc Zalo. Không trung gian, không phí.",
                time: "⏱ Ngay lập tức",
              },
            ].map(({ step, icon, bg, title, desc, time }) => (
              <div key={step}
                className="rounded-2xl p-7 border border-[#e8e4de] bg-white transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(0,0,0,0.09)]"
                style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ background: bg }}>
                    {icon}
                  </div>
                  <span className="text-3xl font-black text-[#e7e5e4]">{step}</span>
                </div>
                <h3 className="mb-2 text-lg font-semibold">{title}</h3>
                <p className="text-sm text-[#78716c] mb-4 leading-relaxed">{desc}</p>
                <span className="inline-block text-xs font-medium px-3 py-1 rounded-full"
                  style={{ background: bg, color: "#57534e" }}>
                  {time}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why choose us ─────────────────────────────────── */}
      <section id="why-choose-us" className="section" style={{ background: "#faf9f7" }}>
        <div className="wrapper">
          <div className="text-center mb-14">
            <h2 className="mb-3">Tại sao chọn FindingRoom?</h2>
            <p className="text-[#78716c] max-w-lg mx-auto">Được xây dựng để kết nối chủ nhà và người thuê đơn giản nhất</p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                img: "/assets/easymatch.png",
                accent: "#4f46e5",
                title: "Tìm nhanh. Chính xác.",
                desc: "Lọc theo loại hình, khu vực, giá cả. Tìm đúng phòng trong vài phút.",
              },
              {
                img: "/assets/verify.png",
                accent: "#f43f5e",
                title: "Chính chủ. Đáng tin cậy.",
                desc: "Chủ nhà đăng trực tiếp. Không qua trung gian, trao đổi thẳng để có giá tốt nhất.",
              },
              {
                img: "/assets/simple.png",
                accent: "#f59e0b",
                title: "Đơn giản. Miễn phí.",
                desc: "Đăng tin trong 5 phút. Hoàn toàn miễn phí. Không cần kỹ năng kỹ thuật.",
              },
            ].map(({ img, accent, title, desc }) => (
              <div key={title}
                className="rounded-2xl p-7 bg-white border border-[#e8e4de] flex flex-col items-start gap-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(0,0,0,0.09)]"
                style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}>
                <Image src={img} alt={title} width={80} height={80} className="w-20 h-20 object-contain" />
                <div>
                  <h3 className="mb-2 text-lg font-semibold" style={{ color: accent }}>{title}</h3>
                  <p className="text-sm text-[#78716c] leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/about" className="btn-secondary inline-flex items-center gap-2">
              Tìm hiểu thêm <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-4 text-center text-3xl font-bold sm:text-4xl md:text-5xl">
            Đội ngũ phát triển
          </h2>
          <p className="mb-12 text-center text-zinc-600 max-w-2xl mx-auto">
            Những người trẻ đam mê công nghệ và mong muốn tạo ra giá trị cho cộng đồng
          </p>

          <div className="flex justify-center">
            <div className="card bg-blue-100 p-8 text-center max-w-sm">
              <div className="mb-4 mx-auto h-24 w-24 rounded-full border-3 border-black bg-gradient-to-br from-blue-300 to-pink-300 flex items-center justify-center text-4xl">
                👨‍💻
              </div>
              <h3 className="text-xl font-bold mb-1">RoomieVerse Team</h3>
              <p className="text-zinc-600 mb-4">Founder & Developer</p>
              <p className="text-sm text-zinc-700">
                Với niềm đam mê công nghệ và mong muốn giải quyết vấn đề thực tế,
                chúng tôi xây dựng RoomieVerse để giúp mọi người dễ dàng tìm được nơi ở lý tưởng.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 border-t-2 border-black">
        <div className="mx-auto max-w-4xl px-6">
          <div className="card bg-gradient-to-br from-blue-300 to-pink-300 p-8 sm:p-12 text-center">
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
              Sẵn sàng bắt đầu?
            </h2>
            <p className="mb-8 text-lg text-zinc-700">
              Tham gia cộng đồng RoomieVerse và tìm người đồng hành lý tưởng ngay hôm nay!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/roommate" className="btn-primary text-base px-8 py-4">
                Tìm roommate
              </Link>
              <Link href="/roomshare" className="btn-pink text-base px-8 py-4">
                Tìm phòng
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ShareFooter />
    </div>
  );
}
