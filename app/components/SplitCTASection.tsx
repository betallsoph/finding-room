"use client";

import Link from "next/link";
import { useAuth } from "../contexts/AuthContext";
import { ArrowRight } from "lucide-react";

interface SplitCTASectionProps {
  leftHeading: string;
  leftSubheading?: string;
  leftButton: string;
  leftReturnUrl: string;
  onPostClick?: () => void;
  rightHeading: string;
  rightButton: string;
  rightLink: string;
  variant?: "blue" | "pink";
}

export default function SplitCTASection({
  leftHeading,
  leftSubheading = "Đăng tin ngay, hoàn toàn miễn phí!",
  leftButton,
  leftReturnUrl,
  onPostClick,
  rightHeading,
  rightButton,
  rightLink,
  variant = "blue",
}: SplitCTASectionProps) {
  const { isAuthenticated } = useAuth();

  const leftGradient = variant === "blue"
    ? "linear-gradient(135deg, #eef2ff 0%, #c7d2fe 100%)"
    : "linear-gradient(135deg, #fff1f2 0%, #fecdd3 100%)";
  const rightGradient = variant === "blue"
    ? "linear-gradient(135deg, #fff1f2 0%, #fecdd3 100%)"
    : "linear-gradient(135deg, #eef2ff 0%, #c7d2fe 100%)";

  const leftAccent  = variant === "blue" ? "#4f46e5" : "#f43f5e";
  const rightAccent = variant === "blue" ? "#f43f5e" : "#4f46e5";

  return (
    <div className="mt-16 grid gap-5 md:grid-cols-2">
      {/* Left */}
      <div className="rounded-2xl p-8 border border-[#e8e4de]"
        style={{ background: leftGradient, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
        <h2 className="mb-2 text-xl font-bold text-[#1c1917]">{leftHeading}</h2>
        <p className="mb-6 text-sm text-[#57534e]">{leftSubheading}</p>
        {isAuthenticated ? (
          <button
            onClick={() => { onPostClick?.(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm text-white transition-all hover:-translate-y-1"
            style={{ background: leftAccent, boxShadow: `0 2px 12px ${leftAccent}44` }}
          >
            {leftButton} <ArrowRight className="w-4 h-4" />
          </button>
        ) : (
          <Link
            href={`/auth?returnUrl=${leftReturnUrl}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm text-white transition-all hover:-translate-y-1"
            style={{ background: leftAccent, boxShadow: `0 2px 12px ${leftAccent}44` }}
          >
            Đăng nhập để đăng tin <ArrowRight className="w-4 h-4" />
          </Link>
        )}
      </div>

      {/* Right */}
      <div className="rounded-2xl p-8 border border-[#e8e4de]"
        style={{ background: rightGradient, boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
        <h2 className="mb-2 text-xl font-bold text-[#1c1917]">{rightHeading}</h2>
        <p className="mb-6 text-sm text-[#57534e]">Khám phá thêm nhiều lựa chọn khác!</p>
        <Link
          href={rightLink}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm text-white transition-all hover:-translate-y-1"
          style={{ background: rightAccent, boxShadow: `0 2px 12px ${rightAccent}44` }}
        >
          {rightButton} <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
