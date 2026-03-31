"use client";

import Link from "next/link";

const navLinks = [
  { href: "/", label: "Trang chủ" },
  { href: "/cho-thue", label: "Phòng cho thuê" },
  { href: "/tim-phong", label: "Người tìm phòng" },
  { href: "/about", label: "Về chúng tôi" },
  { href: "/community", label: "Community" },
];

export default function ShareFooter() {
  return (
    <footer className="bg-[#eef2ff] border-t border-[#e0e7ff] text-[#57534e] py-16 sm:py-24">
      <div className="wrapper">
        {/* Top row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-10 mb-10">
          {/* Brand */}
          <div className="max-w-sm">
            <p className="text-2xl font-bold tracking-tight text-[#1c1917]">
              FindingRoom
            </p>
            <p className="mt-2 text-sm text-[#78716c] leading-relaxed">
              Kết nối người đi thuê và chủ phòng dễ dàng, minh bạch. Không qua môi giới trung gian.
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap items-center gap-x-8 gap-y-3">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-sm font-medium hover:text-[#4f46e5] transition-colors duration-150"
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Divider */}
        <hr className="border-[#f0ede8] w-full" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 text-xs text-[#a8a29e]">
          <p>© 2026 FindingRoom. Built by 99%-from-AI Labs.</p>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-[#4f46e5] transition-colors font-medium">Điều khoản</Link>
            <Link href="/about" className="hover:text-[#4f46e5] transition-colors font-medium">Bảo mật</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
