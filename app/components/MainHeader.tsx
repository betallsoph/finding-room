"use client";

import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { User, Menu, X } from "lucide-react";
import HeaderLogo from "./HeaderLogo";
import { useState } from "react";

export default function MainHeader() {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push("/auth");
  };

  const navItems = [
    { href: "/", label: "Trang chủ" },
    { href: "/cho-thue", label: "Phòng cho thuê" },
    { href: "/tim-phong", label: "Tìm phòng" },
    { href: "https://roomieverse.blog/community", label: "Community" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#e8e4de]"
      style={{ boxShadow: "0 1px 12px rgba(0,0,0,0.06)" }}>
      <div className="wrapper py-3.5">
        <div className="flex items-center justify-between">

          {/* Left: Logo + nav */}
          <div className="flex items-center gap-7">
            <Link href="/" className="flex-shrink-0">
              <HeaderLogo className="h-24" />
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {navItems.map(({ href, label }) => {
                const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
                return (
                  <Link
                    key={href}
                    href={href}
                    className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-150
                      ${isActive
                        ? "text-[#3b82f6] font-extrabold tracking-tight"
                        : "text-[#57534e] hover:text-[#1c1917]"
                      }`}
                  >
                    {label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right: auth + mobile menu */}
          <div className="flex items-center gap-3">
            {/* Auth button */}
            {isAuthenticated ? (
              <Link
                href="/profile"
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#f5f5f4] hover:bg-[#e7e5e4] text-[#1c1917] text-sm font-medium transition-all"
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:inline">Hồ sơ</span>
              </Link>
            ) : (
              <Link
                href={`/auth?returnUrl=${pathname}`}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#4f46e5] hover:bg-[#4338ca] text-white text-sm font-semibold transition-all"
                style={{ boxShadow: "0 2px 8px rgba(79,70,229,0.25)" }}
              >
                <User className="w-4 h-4" />
                <span>Đăng nhập</span>
              </Link>
            )}

            {/* Mobile hamburger */}
            <button
              className="md:hidden flex items-center justify-center w-9 h-9 rounded-full bg-[#f5f5f4] hover:bg-[#e7e5e4] transition-all"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <nav className="md:hidden mt-3 pb-2 border-t border-[#e8e4de] pt-3 flex flex-col gap-1">
            {navItems.map(({ href, label }) => {
              const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-all
                    ${isActive
                      ? "text-[#3b82f6] font-extrabold tracking-tight"
                      : "text-[#57534e] hover:text-[#1c1917]"
                    }`}
                >
                  {label}
                </Link>
              );
            })}
            {isAuthenticated && (
              <button
                onClick={() => { handleLogout(); setMenuOpen(false); }}
                className="mt-1 px-4 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 text-left transition-all"
              >
                Đăng xuất
              </button>
            )}
          </nav>
        )}
      </div>
    </header>
  );
}
