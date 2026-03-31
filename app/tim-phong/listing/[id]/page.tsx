"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Flag,
  MapPin,
  Calendar,
  Clock,
  Phone,
  Lock,
  Heart,
  Share2,
  ArrowLeft,
  User,
  Lightbulb,
  AlertTriangle,
  Search,
  Loader2,
  MessageCircle,
  Facebook,
  Instagram,
  Sparkles,
  Wallet,
  Home,
  CheckCircle2,
} from "lucide-react";
import MainHeader from "../../../components/MainHeader";
import ShareFooter from "../../../components/ShareFooter";
import ReportModal from "../../../components/ReportModal";
import { getListingById } from "../../../data/listings";
import { RoomListing } from "../../../data/types";
import { useAuth } from "../../../contexts/AuthContext";

const propertyTypeLabels: Record<string, string> = {
  "nha-tro": "Nhà trọ / Phòng trọ",
  "can-ho": "Căn hộ / Chung cư",
  "nha-rieng": "Nhà riêng",
  "phong-dv": "Phòng dịch vụ",
};

export default function TimPhongListingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { isAuthenticated } = useAuth();
  const [listing, setListing] = useState<RoomListing | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const data = await getListingById(id);
      if (data && data.category !== "tim-phong") {
        router.replace(`/cho-thue/listing/${id}`);
        return;
      }
      setListing(data);
      setIsLoading(false);
    }
    fetchData();
  }, [id, router]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    if (savedFavorites) {
      const favoriteIds = JSON.parse(savedFavorites) as (string | number)[];
      setIsFavorited(favoriteIds.includes(id));
    }
  }, [id]);

  const toggleFavorite = () => {
    const savedFavorites = localStorage.getItem("favorites");
    let favoriteIds: (string | number)[] = savedFavorites ? JSON.parse(savedFavorites) : [];
    if (isFavorited) {
      favoriteIds = favoriteIds.filter((fid) => fid !== id);
    } else {
      favoriteIds.push(id);
    }
    localStorage.setItem("favorites", JSON.stringify(favoriteIds));
    setIsFavorited(!isFavorited);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white">
        <MainHeader />
        <div className="flex min-h-[60vh] items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-zinc-400" />
        </div>
        <ShareFooter />
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-white">
        <MainHeader />
        <div className="flex min-h-[60vh] items-center justify-center">
          <div className="rounded-xl border-2 border-black bg-white p-16 text-center shadow-[var(--shadow-primary)]">
            <Search className="mx-auto mb-6 h-16 w-16 text-zinc-400" />
            <h1 className="mb-4 text-3xl font-bold">Không tìm thấy bài đăng</h1>
            <p className="mb-8 text-zinc-600">Bài đăng này có thể đã bị xóa hoặc không tồn tại.</p>
            <Link href="/tim-phong" className="btn-primary">
              Xem các yêu cầu khác
            </Link>
          </div>
        </div>
        <ShareFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <MainHeader />

      {/* Hero Section */}
      <section className="border-b-2 border-black bg-pink-50 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-6 flex items-center gap-2 text-sm text-zinc-600">
            <Link href="/" className="hover:text-black">Trang chủ</Link>
            <span>/</span>
            <Link href="/tim-phong" className="hover:text-black">Người tìm phòng</Link>
            <span>/</span>
            <span className="text-black font-medium">Chi tiết</span>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => router.back()}
              className="btn-secondary !inline-flex !py-2 !px-6 items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" /> Quay lại
            </button>
            <span className="flex items-center gap-2 text-sm text-zinc-600">
              <Clock className="h-4 w-4" /> Đăng {listing.postedDate}
            </span>
          </div>

          {/* Property type preferences badge */}
          {listing.propertyTypes && listing.propertyTypes.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {listing.propertyTypes.map((pt) => (
                <span
                  key={pt}
                  className="inline-block px-3 py-1 rounded-lg border-2 border-black bg-pink-200 text-sm font-bold"
                >
                  {propertyTypeLabels[pt] || pt}
                </span>
              ))}
            </div>
          )}

          <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
            {listing.title}
          </h1>
        </div>
      </section>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">

          {/* Left Column */}
          <div className="space-y-8">

            {/* Main Info Card */}
            <div className="rounded-xl border-2 border-black bg-white shadow-[var(--shadow-secondary)] overflow-hidden">
              {/* Budget Header */}
              <div className="bg-pink-50 p-6 border-b-2 border-black">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-zinc-700 mb-1">Ngân sách / tháng</p>
                    <p className="text-3xl sm:text-4xl font-extrabold">{listing.price}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-zinc-700 mb-1">Người tìm</p>
                    <p className="text-xl font-bold flex items-center justify-end gap-2">
                      <User className="h-5 w-5" /> {listing.author}
                    </p>
                  </div>
                </div>
              </div>

              {/* Tenant Details */}
              <div className="p-6 border-b-2 border-black">
                <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-zinc-500">Thông tin tìm phòng</h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="text-zinc-500 mb-1">Khu vực mong muốn</p>
                    <p className="font-semibold text-base flex items-center gap-2">
                      <MapPin className="h-4 w-4 flex-shrink-0" />
                      {listing.location}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-y-4 gap-x-4">
                    {listing.propertyTypes && listing.propertyTypes.length > 0 && (
                      <div>
                        <p className="text-zinc-500 mb-1 flex items-center gap-1"><Home className="h-3.5 w-3.5" /> Loại phòng mong muốn</p>
                        <p className="font-semibold">{listing.propertyTypes.map(pt => propertyTypeLabels[pt] || pt).join(", ")}</p>
                      </div>
                    )}
                    {listing.roomSize && (
                      <div>
                        <p className="text-zinc-500 mb-1 flex items-center gap-1"><Wallet className="h-3.5 w-3.5" /> Diện tích tối thiểu</p>
                        <p className="font-semibold">{listing.roomSize} m²</p>
                      </div>
                    )}
                    <div>
                      <p className="text-zinc-500 mb-1 flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> Muốn dọn vào</p>
                      <p className="font-semibold">{listing.moveInDate}</p>
                    </div>
                    {listing.minContractDuration && (
                      <div>
                        <p className="text-zinc-500 mb-1">Thời gian thuê dự kiến</p>
                        <p className="font-semibold">{listing.minContractDuration}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Required Amenities */}
              {listing.amenities && listing.amenities.length > 0 && (
                <div className="p-6">
                  <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-zinc-500">Yêu cầu tiện nghi</h3>
                  <div className="flex flex-wrap gap-2">
                    {listing.amenities.filter(a => a !== "other").map((amenity) => (
                      <span
                        key={amenity}
                        className="rounded-lg border-2 border-black bg-pink-100 px-3 py-1.5 text-sm font-medium flex items-center gap-1"
                      >
                        <CheckCircle2 className="h-3.5 w-3.5" /> {amenity}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Description Card */}
            <div className="rounded-xl border-2 border-black bg-white shadow-[var(--shadow-secondary)] overflow-hidden">
              <div className="bg-purple-50 p-6 border-b-2 border-black">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Sparkles className="h-5 w-5" /> Giới thiệu bản thân
                </h2>
              </div>
              <div className="p-6">
                <p className="text-base leading-relaxed text-zinc-700 whitespace-pre-line">
                  {listing.introduction || listing.description}
                </p>
              </div>
            </div>

            {/* Lifestyle / Preferences */}
            {listing.roommatePreferences && (
              <div className="rounded-xl border-2 border-black bg-white shadow-[var(--shadow-secondary)] overflow-hidden">
                <div className="bg-pink-50 p-6 border-b-2 border-black">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <User className="h-5 w-5" /> Thông tin thêm
                  </h2>
                </div>
                <div className="p-6 grid gap-4 sm:grid-cols-2">
                  {listing.roommatePreferences.gender && (
                    <div>
                      <p className="text-sm text-zinc-500 mb-1">Giới tính</p>
                      <p className="font-medium">{listing.roommatePreferences.gender}</p>
                    </div>
                  )}
                  {listing.roommatePreferences.occupation && (
                    <div>
                      <p className="text-sm text-zinc-500 mb-1">Nghề nghiệp</p>
                      <p className="font-medium">{listing.roommatePreferences.occupation}</p>
                    </div>
                  )}
                  {listing.roommatePreferences.pets !== undefined && (
                    <div>
                      <p className="text-sm text-zinc-500 mb-1">Nuôi thú cưng</p>
                      <p className="font-medium">{listing.roommatePreferences.pets ? "Có" : "Không"}</p>
                    </div>
                  )}
                  {listing.roommatePreferences.smoking !== undefined && (
                    <div>
                      <p className="text-sm text-zinc-500 mb-1">Hút thuốc</p>
                      <p className="font-medium">{listing.roommatePreferences.smoking ? "Có" : "Không"}</p>
                    </div>
                  )}
                  {listing.roommatePreferences.cooking !== undefined && (
                    <div>
                      <p className="text-sm text-zinc-500 mb-1">Nấu ăn</p>
                      <p className="font-medium">{listing.roommatePreferences.cooking ? "Có" : "Không"}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tips for landlords */}
            <div className="rounded-xl border-2 border-black bg-red-50 p-5 shadow-[var(--shadow-secondary)]">
              <h2 className="mb-3 text-lg font-bold flex items-center gap-2">
                <Lightbulb className="h-5 w-5" /> Lưu ý khi cho thuê
              </h2>
              <ul className="space-y-1.5 text-sm text-zinc-700">
                <li>• Xác nhận thông tin người thuê trước khi cho xem phòng</li>
                <li>• Ký hợp đồng rõ ràng, ghi đầy đủ điều khoản</li>
                <li>• Thu tiền cọc và lập biên bản bàn giao phòng</li>
                <li>• Chụp ảnh hiện trạng phòng trước khi giao chìa khóa</li>
              </ul>
            </div>
          </div>

          {/* Right Column - Contact */}
          <div className="space-y-4">
            <div className="lg:sticky lg:top-32 rounded-xl border-2 border-black bg-pink-50 p-6 shadow-[var(--shadow-secondary)]">
              <h3 className="mb-1 text-sm font-bold uppercase tracking-wider text-zinc-600">
                Liên hệ người tìm phòng
              </h3>
              <p className="mb-5 text-xl font-bold">{listing.author}</p>

              {isAuthenticated ? (
                <>
                  <a
                    href={`tel:${listing.phone.replace(/\s/g, "")}`}
                    className="mb-3 flex w-full items-center justify-center gap-2 rounded-lg border-2 border-black bg-white px-5 py-3 text-lg font-bold shadow-[var(--shadow-secondary)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
                  >
                    <Phone className="h-5 w-5" /> {listing.phone}
                  </a>

                  {listing.zalo ? (
                    <a
                      href={`https://zalo.me/${listing.zalo.replace(/\s/g, "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mb-3 flex w-full items-center justify-center gap-2 rounded-lg border-2 border-black bg-white px-5 py-3 font-bold shadow-[var(--shadow-secondary)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
                    >
                      <MessageCircle className="h-5 w-5" /> Zalo
                    </a>
                  ) : (
                    <div className="mb-3 flex w-full items-center justify-center gap-2 rounded-lg border-2 border-zinc-300 bg-zinc-100 px-5 py-3 font-bold text-zinc-400 cursor-not-allowed">
                      <MessageCircle className="h-5 w-5" /> Zalo
                    </div>
                  )}

                  <div className="flex gap-3 mb-4">
                    {listing.facebook ? (
                      <a
                        href={listing.facebook.startsWith("http") ? listing.facebook : `https://facebook.com/${listing.facebook}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-1 items-center justify-center gap-2 rounded-lg border-2 border-black bg-white px-5 py-3 font-bold shadow-[var(--shadow-secondary)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
                      >
                        <Facebook className="h-5 w-5" /> Facebook
                      </a>
                    ) : (
                      <div className="flex flex-1 items-center justify-center gap-2 rounded-lg border-2 border-zinc-300 bg-zinc-100 px-5 py-3 font-bold text-zinc-400 cursor-not-allowed">
                        <Facebook className="h-5 w-5" /> Facebook
                      </div>
                    )}
                    {listing.instagram ? (
                      <a
                        href={listing.instagram.startsWith("http") ? listing.instagram : `https://instagram.com/${listing.instagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex flex-1 items-center justify-center gap-2 rounded-lg border-2 border-black bg-white px-5 py-3 font-bold shadow-[var(--shadow-secondary)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
                      >
                        <Instagram className="h-5 w-5" /> Instagram
                      </a>
                    ) : (
                      <div className="flex flex-1 items-center justify-center gap-2 rounded-lg border-2 border-zinc-300 bg-zinc-100 px-5 py-3 font-bold text-zinc-400 cursor-not-allowed">
                        <Instagram className="h-5 w-5" /> Instagram
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <Link
                  href={`/auth?returnUrl=/tim-phong/listing/${id}`}
                  className="mb-4 flex w-full items-center justify-center gap-2 rounded-lg border-2 border-black bg-white px-5 py-3 font-bold shadow-[var(--shadow-secondary)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
                >
                  <Lock className="h-5 w-5" /> Đăng nhập để xem SĐT
                </Link>
              )}

              <p className="text-xs leading-relaxed text-zinc-600 flex items-start gap-1">
                <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                FindingRoom không chịu trách nhiệm cho các giao dịch giữa người dùng.
              </p>

              {listing.userId && (
                <Link
                  href={`/user/${listing.userId}`}
                  className="mt-4 flex items-center justify-center gap-2 w-full rounded-lg border-2 border-black bg-purple-100 px-5 py-3 font-bold shadow-[var(--shadow-secondary)] transition-all hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none"
                >
                  <User className="h-5 w-5" /> Xem hồ sơ người tìm
                </Link>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={toggleFavorite}
                className={`flex-1 flex items-center justify-center gap-2 rounded-lg border-2 border-black px-3 py-2.5 text-sm font-bold transition-all hover:translate-x-[2px] hover:translate-y-[2px] shadow-[var(--shadow-secondary)] hover:shadow-none
                  ${isFavorited ? "bg-pink-300" : "bg-white"}`}
              >
                <Heart className={`h-4 w-4 ${isFavorited ? "fill-current" : ""}`} />
                {isFavorited ? "Đã lưu" : "Lưu"}
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 rounded-lg border-2 border-black bg-white px-3 py-2.5 text-sm font-bold transition-all hover:translate-x-[2px] hover:translate-y-[2px] shadow-[var(--shadow-secondary)] hover:shadow-none">
                <Share2 className="h-4 w-4" /> Chia sẻ
              </button>
              <button
                onClick={() => setShowReportModal(true)}
                className="flex items-center justify-center gap-2 rounded-lg border-2 border-black bg-red-50 px-3 py-2.5 text-sm font-bold text-red-600 transition-all hover:translate-x-[2px] hover:translate-y-[2px] shadow-[var(--shadow-secondary)] hover:shadow-none"
              >
                <Flag className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {showReportModal && (
        <ReportModal
          listingId={listing.id}
          listingTitle={listing.title}
          onClose={() => setShowReportModal(false)}
          onSubmit={(data) => { console.log("Report submitted:", data); }}
        />
      )}

      <ShareFooter />
    </div>
  );
}
