"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getListingsByCategory } from "../data/listings";
import { RoomListing } from "../data/types";
import MainHeader from "../components/MainHeader";
import ShareFooter from "../components/ShareFooter";
import FilterTabs from "../components/FilterTabs";
import ListingCard from "../components/ListingCard";
import SplitCTASection from "../components/SplitCTASection";
import ProfileReminderModal from "../components/ProfileReminderModal";
import PostTypeModal from "../components/PostTypeModal";
import { useProfileReminder } from "../hooks/useProfileReminder";

type PropertyPreference = "all" | "nha-tro" | "can-ho" | "nha-rieng" | "phong-dv";

const propertyTypeLabels: Record<PropertyPreference, string> = {
  all: "Tất cả người tìm phòng",
  "nha-tro": "Tìm nhà trọ, phòng trọ",
  "can-ho": "Tìm căn hộ, chung cư",
  "nha-rieng": "Tìm nhà riêng nguyên căn",
  "phong-dv": "Tìm phòng dịch vụ cao cấp",
};

export default function TimPhongPage() {
  const [activeType, setActiveType] = useState<PropertyPreference>("all");
  const [listings, setListings] = useState<RoomListing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showPostTypeModal, setShowPostTypeModal] = useState(false);
  const { showReminder, dismissReminder } = useProfileReminder();

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const data = await getListingsByCategory("tim-phong");
      setListings(data);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  const allFilteredListings = listings.filter((listing) => {
    if (activeType === "all") return true;
    return listing.propertyTypes?.includes(activeType) || listing.rentalType === activeType;
  });

  const displayedListings = allFilteredListings.slice(0, 9);
  const hasMore = allFilteredListings.length > 9;

  return (
    <div className="min-h-screen bg-white">
      <MainHeader />

      {/* Profile Reminder Modal */}
      <ProfileReminderModal isOpen={showReminder} onClose={dismissReminder} />

      {/* Hero Section */}
      <section className="py-16 sm:py-24" style={{ background: "linear-gradient(135deg, #fff1f2 0%, #f5f5f4 100%)" }}>
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="mb-6 text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl">
            Người tìm phòng
          </h1>
          <p className="mb-8 max-w-2xl text-base sm:text-lg text-zinc-700">
            Kết nối trực tiếp với người tìm thuê. Xem yêu cầu và liên hệ ngay — không qua môi giới.
          </p>

          <FilterTabs
            activeType={activeType}
            onTypeChange={setActiveType}
          />
        </div>
      </section>

      <div className="h-10 bg-gradient-to-b from-[#fff1f2]/30 to-[#faf9f7]" />

      <div className="mx-auto max-w-7xl px-6 pb-16">

        {/* Listing Header */}
        <div className="mb-8 space-y-3">
          <span className="text-sm font-medium text-zinc-600">
            {allFilteredListings.length} kết quả
          </span>
          <h2 className="text-3xl font-bold">{propertyTypeLabels[activeType]}</h2>
        </div>

        {/* Listings Grid */}
        {isLoading ? (
          <div className="py-16 text-center">
            <p className="text-lg text-zinc-500">Đang tải...</p>
          </div>
        ) : displayedListings.length > 0 ? (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {displayedListings.map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                variant="pink"
              />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <p className="text-lg text-zinc-500">Chưa có người tìm phòng trong mục này</p>
            <p className="mt-2 text-sm text-zinc-400">Hãy là người đầu tiên đăng tin!</p>
          </div>
        )}

        {/* View All Button */}
        {hasMore && (
          <div className="mt-10 text-center">
            <Link
              href={`/tim-phong/all?type=${activeType}`}
              className="inline-flex h-14 w-48 items-center justify-center gap-2 rounded-md border-2 border-pink-400 bg-white text-base font-semibold text-pink-400 transition-all duration-200 hover:bg-pink-400 hover:text-white"
            >
              Xem tất cả
            </Link>
          </div>
        )}

        {/* Divider */}
        <div className="my-16 border-t-2 border-black" />

        {/* CTA Section */}
        <SplitCTASection
          leftHeading="Bạn đang tìm phòng thuê?"
          leftSubheading="Đăng yêu cầu ngay, chủ nhà sẽ liên hệ bạn!"
          leftButton="Đăng tìm phòng"
          leftReturnUrl="/tim-phong"
          onPostClick={() => setShowPostTypeModal(true)}
          rightHeading="Bạn có phòng cho thuê?"
          rightButton="Xem phòng cho thuê"
          rightLink="/cho-thue"
          variant="pink"
        />
      </div>

      {/* Post Type Modal */}
      <PostTypeModal
        isOpen={showPostTypeModal}
        onClose={() => setShowPostTypeModal(false)}
      />

      <ShareFooter />
    </div>
  );
}
