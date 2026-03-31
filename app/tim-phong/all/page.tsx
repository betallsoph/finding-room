"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { getListingsByCategory } from "../../data/listings";
import { RoomListing } from "../../data/types";
import MainHeader from "../../components/MainHeader";
import ShareFooter from "../../components/ShareFooter";
import FilterTabs from "../../components/FilterTabs";
import ListingCard from "../../components/ListingCard";
import { Loader2 } from "lucide-react";

type PropertyPreference = "all" | "nha-tro" | "can-ho" | "nha-rieng" | "phong-dv";

function TimPhongAllContent() {
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type") as PropertyPreference | null;

  const [activeType, setActiveType] = useState<PropertyPreference>(typeParam || "all");
  const [listings, setListings] = useState<RoomListing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const ITEMS_PER_PAGE = 12;

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const data = await getListingsByCategory("tim-phong");
      setListings(data);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  // Reset page when type changes
  useEffect(() => {
    setPage(1);
  }, [activeType]);

  const filteredListings = listings.filter((l) => {
    if (activeType === "all") return true;
    return l.propertyTypes?.includes(activeType) || l.rentalType === activeType;
  });

  const totalPages = Math.ceil(filteredListings.length / ITEMS_PER_PAGE);
  const paginatedListings = filteredListings.slice(0, page * ITEMS_PER_PAGE);
  const hasMore = page < totalPages;

  return (
    <div className="min-h-screen bg-white">
      <MainHeader />

      {/* Hero */}
      <section className="bg-pink-50 py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex items-center gap-3 mb-4 text-sm text-zinc-600">
            <Link href="/" className="hover:text-black">Trang chủ</Link>
            <span>/</span>
            <Link href="/tim-phong" className="hover:text-black">Người tìm phòng</Link>
            <span>/</span>
            <span className="font-medium text-black">Tất cả</span>
          </div>
          <h1 className="mb-6 text-4xl font-extrabold leading-tight sm:text-5xl">
            Tất cả người tìm phòng
          </h1>
          <FilterTabs activeType={activeType} onTypeChange={setActiveType} />
        </div>
      </section>

      <div className="h-16 bg-gradient-to-b from-pink-50 to-white" />

      <div className="mx-auto max-w-7xl px-6 pb-16">
        <div className="mb-8">
          <span className="text-sm font-medium text-zinc-600">
            {filteredListings.length} kết quả
          </span>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="h-10 w-10 animate-spin text-zinc-400" />
          </div>
        ) : paginatedListings.length > 0 ? (
          <>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {paginatedListings.map((listing) => (
                <ListingCard key={listing.id} listing={listing} variant="pink" />
              ))}
            </div>
            {hasMore && (
              <div className="mt-10 text-center">
                <button
                  onClick={() => setPage(p => p + 1)}
                  className="btn-secondary"
                >
                  Xem thêm ({filteredListings.length - paginatedListings.length} bài còn lại)
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="py-16 text-center">
            <p className="text-lg text-zinc-500">Chưa có tin đăng nào</p>
          </div>
        )}
      </div>

      <ShareFooter />
    </div>
  );
}

export default function TimPhongAllPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-pink-400" />
      </div>
    }>
      <TimPhongAllContent />
    </Suspense>
  );
}
