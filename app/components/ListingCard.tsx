"use client";

import { Home, MapPin, Calendar, User, ArrowUpRight } from "lucide-react";

interface ListingCardProps {
  listing: {
    id: number | string;
    title: string;
    author: string;
    price: string;
    location: string;
    moveInDate: string;
    description: string;
    phone: string;
    postedDate: string;
    category?: "cho-thue" | "tim-phong";
  };
  variant?: "blue" | "pink";
  layout?: "grid" | "list";
}

function getListingRoute(listing: ListingCardProps["listing"]): string {
  const id = String(listing.id);
  if (id.startsWith("ct-")) return `/cho-thue/listing/${id}`;
  if (id.startsWith("tp-")) return `/tim-phong/listing/${id}`;
  if (listing.category === "tim-phong") return `/tim-phong/listing/${id}`;
  return `/cho-thue/listing/${id}`;
}

export default function ListingCard({ listing, variant = "blue", layout = "grid" }: ListingCardProps) {
  const isTimPhong = variant === "pink" || listing.category === "tim-phong";
  const accentColor = isTimPhong ? "#f43f5e" : "#4f46e5";
  const accentBg    = isTimPhong ? "#fff1f2" : "#eef2ff";
  const accentText  = isTimPhong ? "#e11d48" : "#4338ca";
  const listingRoute = getListingRoute(listing);

  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setTimeout(() => { window.location.href = listingRoute; }, 100);
  };

  if (layout === "list") {
    return (
      <a
        href={listingRoute}
        onClick={handleCardClick}
        className="group flex gap-4 rounded-2xl border border-[#e8e4de] bg-white p-4 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_28px_rgba(0,0,0,0.10)]"
        style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.06)" }}
      >
        <div className="h-28 w-36 flex-shrink-0 overflow-hidden rounded-xl bg-[#f5f5f4] flex items-center justify-center">
          <Home className="h-10 w-10 text-[#a8a29e]" strokeWidth={1.5} />
        </div>
        <div className="flex flex-1 flex-col justify-between min-w-0">
          <div>
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="text-base font-semibold text-[#1c1917] line-clamp-1 leading-snug">{listing.title}</h3>
              <span className="flex-shrink-0 text-sm font-bold px-2.5 py-0.5 rounded-full"
                style={{ background: accentBg, color: accentText }}>
                {listing.price}
              </span>
            </div>
            <div className="flex flex-wrap gap-3 text-xs text-[#78716c]">
              <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{listing.location}</span>
              <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{listing.moveInDate}</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-[#a8a29e]">
            <User className="h-3 w-3" />
            <span>{listing.author}</span>
            <span>·</span>
            <span>{listing.postedDate}</span>
          </div>
        </div>
      </a>
    );
  }

  return (
    <a
      href={listingRoute}
      onClick={handleCardClick}
      className="group flex flex-col rounded-2xl border border-[#e8e4de] bg-white overflow-hidden transition-all duration-220 hover:-translate-y-2 hover:shadow-[0_12px_36px_rgba(0,0,0,0.12)] cursor-pointer"
      style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.07)" }}
    >
      {/* Image placeholder */}
      <div className="h-44 w-full bg-[#f5f5f4] flex items-center justify-center relative overflow-hidden">
        <Home className="h-16 w-16 text-[#d6d3d1]" strokeWidth={1} />
        {/* Category badge */}
        <span
          className="absolute top-3 left-3 text-xs font-semibold px-2.5 py-1 rounded-full"
          style={{ background: accentBg, color: accentText }}
        >
          {isTimPhong ? "Tìm phòng" : "Cho thuê"}
        </span>
        {/* Arrow icon on hover */}
        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.12)" }}>
          <ArrowUpRight className="w-4 h-4 text-[#1c1917]" />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        {/* Price */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-xl font-bold tracking-tight" style={{ color: accentColor }}>{listing.price}</span>
          <div className="flex items-center gap-1 text-xs text-[#a8a29e]">
            <User className="h-3 w-3" />
            <span>{listing.author}</span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-[15px] font-semibold text-[#1c1917] leading-snug line-clamp-2 mb-3 flex-1">
          {listing.title}
        </h3>

        {/* Divider */}
        <div className="border-t border-[#f0ede8] mb-3" />

        {/* Meta */}
        <div className="space-y-1.5 text-xs text-[#78716c]">
          <p className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
            <span className="truncate">{listing.location}</span>
          </p>
          <p className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5 flex-shrink-0" />
            <span>{isTimPhong ? "Muốn dọn vào: " : "Dọn vào: "}{listing.moveInDate}</span>
          </p>
        </div>
      </div>
    </a>
  );
}
