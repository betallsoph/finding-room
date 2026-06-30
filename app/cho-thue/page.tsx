"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getListingsByCategory } from "../data/listings";
import { RoomListing, RentalType } from "../data/types";
import MainHeader from "../components/MainHeader";
import ShareFooter from "../components/ShareFooter";
import FilterButtons from "../components/FilterButtons";
import ListingCard from "../components/ListingCard";
import SplitCTASection from "../components/SplitCTASection";
import ProfileReminderModal from "../components/ProfileReminderModal";
import PostTypeModal from "../components/PostTypeModal";
import { useProfileReminder } from "../hooks/useProfileReminder";

const rentalTypeLabels: Record<RentalType, string> = {
  "nha-tro": "Nhà trọ, phòng trọ",
  "can-ho": "Căn hộ, chung cư",
  "nha-rieng": "Nhà riêng nguyên căn",
  "phong-dv": "Phòng dịch vụ cao cấp",
};

export default function ChoThuePage() {
  const [mode, setMode] = useState<RentalType>("nha-tro");
  const [listings, setListings] = useState<RoomListing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showPostTypeModal, setShowPostTypeModal] = useState(false);
  const { showReminder, dismissReminder } = useProfileReminder();

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const data = await getListingsByCategory("cho-thue");
      setListings(data);
      setIsLoading(false);
    }
    fetchData();
  }, []);

  // Filter listings based on rental type
  const allFilteredListings = listings.filter((listing) => {
    return listing.rentalType === mode;
  });

  // Limit to 9 cards
  const displayedListings = allFilteredListings.slice(0, 9);
  const hasMore = allFilteredListings.length > 9;

  return (
    <div className="min-h-screen bg-white">
      <MainHeader />

      {/* Profile Reminder Modal */}
      <ProfileReminderModal isOpen={showReminder} onClose={dismissReminder} />

      {/* Hero Section */}
      <section className="py-10 sm:py-14" style={{ background: "linear-gradient(135deg, #eef2ff 0%, #f5f5f4 100%)" }}>
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="mb-6 text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl">
            Phòng cho thuê
          </h1>
          <p className="mb-8 max-w-2xl text-base sm:text-lg text-zinc-700">
            Tìm phòng trọ, căn hộ, nhà riêng tại TP.HCM. Chính chủ đăng, không qua môi giới.
          </p>

          <FilterButtons
            mode={mode}
            onModeChange={setMode}
          />
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 pb-16 pt-10">

        {/* Listing Header */}
        <div className="mb-8 space-y-3">
          <span className="text-sm font-medium text-zinc-600">
            {allFilteredListings.length} kết quả
          </span>
          <h2 className="text-3xl font-bold">{rentalTypeLabels[mode]}</h2>
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
                variant="blue"
              />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center">
            <p className="text-lg text-zinc-500">Chưa có tin đăng nào trong mục này</p>
            <p className="mt-2 text-sm text-zinc-400">Hãy là người đầu tiên đăng tin!</p>
          </div>
        )}

        {/* View All Button */}
        {hasMore && (
          <div className="mt-10 text-center">
            <Link
              href={`/cho-thue/all?type=${mode}`}
              className="inline-flex h-14 w-48 items-center justify-center gap-2 rounded-md border-2 border-blue-400 bg-white text-base font-semibold text-blue-400 transition-all duration-200 hover:bg-blue-400 hover:text-white"
            >
              Xem tất cả
            </Link>
          </div>
        )}

        {/* Divider */}
        <div className="my-16 border-t-2 border-black" />

        {/* CTA Section */}
        <SplitCTASection
          leftHeading="Bạn có phòng muốn cho thuê?"
          leftSubheading="Đăng tin cho thuê ngay, miễn phí!"
          leftButton="Đăng tin cho thuê"
          leftReturnUrl="/cho-thue"
          onPostClick={() => setShowPostTypeModal(true)}
          rightHeading="Bạn đang tìm phòng thuê?"
          rightButton="Xem người tìm phòng"
          rightLink="/tim-phong"
          variant="blue"
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
