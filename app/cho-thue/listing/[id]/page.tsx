"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Flag,
  MapPin,
  Calendar,
  Clock,
  Home,
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
  ChevronLeft,
  ChevronRight,
  Building2,
  Ruler,
  Layers,
  Bath,
} from "lucide-react";
import MainHeader from "../../../components/MainHeader";
import ShareFooter from "../../../components/ShareFooter";
import ReportModal from "../../../components/ReportModal";
import { getListingById } from "../../../data/listings";
import { RoomListing } from "../../../data/types";
import { useAuth } from "../../../contexts/AuthContext";

const rentalTypeLabels: Record<string, string> = {
  "nha-tro": "Nhà trọ / Phòng trọ",
  "can-ho": "Căn hộ / Chung cư",
  "nha-rieng": "Nhà riêng",
  "phong-dv": "Phòng dịch vụ",
};

const amenityLabels: Record<string, string> = {
  ac: "Điều hòa",
  wifi: "Wifi",
  washing: "Máy giặt",
  fridge: "Tủ lạnh",
  kitchen: "Bếp",
  parking: "Chỗ đậu xe",
  pool: "Hồ bơi",
  gym: "Gym",
  elevator: "Thang máy",
  security: "Bảo vệ 24/7",
  balcony: "Ban công",
  furnished: "Nội thất đầy đủ",
};

const tenantPrefLabels: Record<string, Record<string, string>> = {
  gender: { male: "Nam", female: "Nữ", any: "Không quan trọng" },
  occupation: { student: "Sinh viên", worker: "Đi làm", any: "Không quan trọng" },
  pets: { "no-pet": "Không nuôi thú cưng", "pet-ok": "Được nuôi thú cưng", any: "Không quan trọng" },
  smoking: { "no-smoke": "Không hút thuốc", "smoke-ok": "Được hút thuốc", any: "Không quan trọng" },
  cooking: { "no-cook": "Không nấu ăn", "cook-ok": "Được nấu ăn", any: "Không quan trọng" },
};

export default function ChoThueListingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { isAuthenticated } = useAuth();
  const [listing, setListing] = useState<RoomListing | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isFavorited, setIsFavorited] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const data = await getListingById(id);
      if (data && data.category !== "cho-thue") {
        router.replace(`/tim-phong/listing/${id}`);
        return;
      }
      setListing(data);
      setIsLoading(false);
    }
    fetchData();
  }, [id, router]);

  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      const favoriteIds = JSON.parse(savedFavorites) as (string | number)[];
      setIsFavorited(favoriteIds.includes(id));
    }
  }, [id]);

  const toggleFavorite = () => {
    const savedFavorites = localStorage.getItem('favorites');
    let favoriteIds: (string | number)[] = savedFavorites ? JSON.parse(savedFavorites) : [];
    if (isFavorited) {
      favoriteIds = favoriteIds.filter(fid => fid !== id);
    } else {
      favoriteIds.push(id);
    }
    localStorage.setItem('favorites', JSON.stringify(favoriteIds));
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
            <Link href="/cho-thue" className="btn-primary">
              Xem các phòng khác
            </Link>
          </div>
        </div>
        <ShareFooter />
      </div>
    );
  }

  const images = listing.images && listing.images.length > 0 ? listing.images : [];
  const hasImages = images.length > 0;

  const getDisplayAmenities = () => {
    if (listing.amenities && listing.amenities.length > 0) {
      return listing.amenities.filter(a => a !== 'other').map(a => amenityLabels[a] || a);
    }
    return [];
  };

  const displayAmenities = getDisplayAmenities();

  return (
    <div className="min-h-screen bg-white">
      <MainHeader />

      {/* Hero Section */}
      <section className="border-b-2 border-black bg-blue-50 py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-6 flex items-center gap-2 text-sm text-zinc-600">
            <Link href="/" className="hover:text-black">Trang chủ</Link>
            <span>/</span>
            <Link href="/cho-thue" className="hover:text-black">Phòng cho thuê</Link>
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

          {/* Rental type badge */}
          {listing.rentalType && (
            <span className="inline-block mb-4 px-3 py-1 rounded-lg border-2 border-black bg-blue-200 text-sm font-bold">
              {rentalTypeLabels[listing.rentalType] || listing.rentalType}
            </span>
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
            {/* Image Gallery */}
            <div className="overflow-hidden rounded-xl border-2 border-black bg-white shadow-[var(--shadow-secondary)]">
              {hasImages ? (
                <div className="relative">
                  <div className="h-72 sm:h-96 w-full relative">
                    <Image
                      src={images[currentImageIndex]}
                      alt={`Hình ${currentImageIndex + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  {images.length > 1 && (
                    <>
                      <button
                        onClick={() => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)}
                        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 border-2 border-black shadow-md hover:bg-white"
                      >
                        <ChevronLeft className="h-6 w-6" />
                      </button>
                      <button
                        onClick={() => setCurrentImageIndex((prev) => (prev + 1) % images.length)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 border-2 border-black shadow-md hover:bg-white"
                      >
                        <ChevronRight className="h-6 w-6" />
                      </button>
                    </>
                  )}
                </div>
              ) : (
                <div className="flex h-72 sm:h-96 w-full items-center justify-center bg-zinc-50">
                  <Home className="h-32 w-32 text-zinc-300" strokeWidth={1} />
                </div>
              )}
            </div>

            {/* Main Info Card */}
            <div className="rounded-xl border-2 border-black bg-white shadow-[var(--shadow-secondary)] overflow-hidden">
              {/* Price Header */}
              <div className="bg-blue-50 p-6 border-b-2 border-black">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-zinc-700 mb-1">Giá thuê / tháng</p>
                    <p className="text-3xl sm:text-4xl font-extrabold">{listing.price}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-zinc-700 mb-1">Đăng bởi</p>
                    <p className="text-xl font-bold flex items-center justify-end gap-2">
                      <User className="h-5 w-5" /> {listing.author}
                    </p>
                  </div>
                </div>
              </div>

              {/* Property Details */}
              <div className="p-6 border-b-2 border-black">
                <h3 className="mb-4 text-sm font-bold uppercase tracking-wide text-zinc-500">Thông tin phòng</h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <p className="text-zinc-500 mb-1">Địa chỉ</p>
                    <p className="font-semibold text-base flex items-center gap-2">
                      <MapPin className="h-4 w-4 flex-shrink-0" />
                      {listing.location}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-4">
                    {listing.rentalType && (
                      <div>
                        <p className="text-zinc-500 mb-1 flex items-center gap-1"><Building2 className="h-3.5 w-3.5" /> Loại hình</p>
                        <p className="font-semibold">{rentalTypeLabels[listing.rentalType]}</p>
                      </div>
                    )}
                    {listing.roomSize && (
                      <div>
                        <p className="text-zinc-500 mb-1 flex items-center gap-1"><Ruler className="h-3.5 w-3.5" /> Diện tích</p>
                        <p className="font-semibold">{listing.roomSize} m²</p>
                      </div>
                    )}
                    {listing.floor && (
                      <div>
                        <p className="text-zinc-500 mb-1 flex items-center gap-1"><Layers className="h-3.5 w-3.5" /> Tầng</p>
                        <p className="font-semibold">{listing.floor}</p>
                      </div>
                    )}
                    {listing.bathrooms && (
                      <div>
                        <p className="text-zinc-500 mb-1 flex items-center gap-1"><Bath className="h-3.5 w-3.5" /> Toilet</p>
                        <p className="font-semibold">{listing.bathrooms}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-zinc-500 mb-1 flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> Dọn vào</p>
                      <p className="font-semibold">{listing.moveInDate}</p>
                    </div>
                    {listing.minContractDuration && (
                      <div>
                        <p className="text-zinc-500 mb-1">Hợp đồng tối thiểu</p>
                        <p className="font-semibold">{listing.minContractDuration}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Amenities */}
              {displayAmenities.length > 0 && (
                <div className="p-6">
                  <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-zinc-500">Tiện nghi</h3>
                  <div className="flex flex-wrap gap-2">
                    {displayAmenities.map((amenity) => (
                      <span
                        key={amenity}
                        className="rounded-lg border-2 border-black bg-blue-100 px-3 py-1.5 text-sm font-medium"
                      >
                        {amenity}
                      </span>
                    ))}
                    {listing.amenitiesOther && (
                      <span className="rounded-lg border-2 border-black bg-yellow-100 px-3 py-1.5 text-sm font-medium">
                        {listing.amenitiesOther}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Description Card */}
            <div className="rounded-xl border-2 border-black bg-white shadow-[var(--shadow-secondary)] overflow-hidden">
              <div className="bg-purple-50 p-6 border-b-2 border-black">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <Sparkles className="h-5 w-5" /> Mô tả
                </h2>
              </div>
              <div className="p-6">
                <p className="text-base leading-relaxed text-zinc-700 whitespace-pre-line">
                  {listing.introduction || listing.description}
                </p>
              </div>
            </div>

            {/* Cost Breakdown */}
            {listing.costs && (
              <div className="rounded-xl border-2 border-black bg-white shadow-[var(--shadow-secondary)] overflow-hidden">
                <div className="bg-yellow-50 p-6 border-b-2 border-black">
                  <h2 className="text-xl font-bold">Chi phí hàng tháng</h2>
                </div>
                <div className="p-6 grid grid-cols-2 gap-4 text-sm">
                  {listing.costs.rent && listing.costs.rent !== "0" && (
                    <div>
                      <p className="text-zinc-500">Tiền phòng</p>
                      <p className="font-semibold">{Number(listing.costs.rent).toLocaleString("vi-VN")}đ</p>
                    </div>
                  )}
                  {listing.costs.deposit && listing.costs.deposit !== "0" && (
                    <div>
                      <p className="text-zinc-500">Tiền cọc</p>
                      <p className="font-semibold">{listing.costs.deposit.includes("tháng") ? listing.costs.deposit : `${Number(listing.costs.deposit).toLocaleString("vi-VN")}đ`}</p>
                    </div>
                  )}
                  {listing.costs.electricity && listing.costs.electricity !== "0" && (
                    <div>
                      <p className="text-zinc-500">Điện</p>
                      <p className="font-semibold">{listing.costs.electricity.includes("/") ? listing.costs.electricity : `${listing.costs.electricity}đ/kWh`}</p>
                    </div>
                  )}
                  {listing.costs.water && listing.costs.water !== "0" && (
                    <div>
                      <p className="text-zinc-500">Nước</p>
                      <p className="font-semibold">{Number(listing.costs.water).toLocaleString("vi-VN")}đ/người</p>
                    </div>
                  )}
                  {listing.costs.internet && listing.costs.internet !== "0" && (
                    <div>
                      <p className="text-zinc-500">Internet</p>
                      <p className="font-semibold">{Number(listing.costs.internet).toLocaleString("vi-VN")}đ</p>
                    </div>
                  )}
                  {listing.costs.parking && listing.costs.parking !== "0" && (
                    <div>
                      <p className="text-zinc-500">Giữ xe</p>
                      <p className="font-semibold">{Number(listing.costs.parking).toLocaleString("vi-VN")}đ</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tenant Preferences */}
            {listing.tenantPreferences && Object.keys(listing.tenantPreferences).some(k => {
              const val = listing.tenantPreferences![k as keyof typeof listing.tenantPreferences];
              return Array.isArray(val) ? val.length > 0 : !!val;
            }) && (
              <div className="rounded-xl border-2 border-black bg-white shadow-[var(--shadow-secondary)] overflow-hidden">
                <div className="bg-blue-50 p-6 border-b-2 border-black">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <User className="h-5 w-5" /> Yêu cầu đối với người thuê
                  </h2>
                </div>
                <div className="p-6 grid gap-4 sm:grid-cols-2">
                  {listing.tenantPreferences.gender && listing.tenantPreferences.gender.length > 0 && (
                    <div>
                      <p className="text-sm text-zinc-500 mb-1">Giới tính</p>
                      <p className="font-medium">
                        {listing.tenantPreferences.gender.map(v => tenantPrefLabels.gender[v] || v).join(", ")}
                      </p>
                    </div>
                  )}
                  {listing.tenantPreferences.occupation && listing.tenantPreferences.occupation.length > 0 && (
                    <div>
                      <p className="text-sm text-zinc-500 mb-1">Đối tượng</p>
                      <p className="font-medium">
                        {listing.tenantPreferences.occupation.map(v => tenantPrefLabels.occupation[v] || v).join(", ")}
                      </p>
                    </div>
                  )}
                  {listing.tenantPreferences.pets && listing.tenantPreferences.pets.length > 0 && (
                    <div>
                      <p className="text-sm text-zinc-500 mb-1">Thú cưng</p>
                      <p className="font-medium">
                        {listing.tenantPreferences.pets.map(v => tenantPrefLabels.pets[v] || v).join(", ")}
                      </p>
                    </div>
                  )}
                  {listing.tenantPreferences.smoking && listing.tenantPreferences.smoking.length > 0 && (
                    <div>
                      <p className="text-sm text-zinc-500 mb-1">Hút thuốc</p>
                      <p className="font-medium">
                        {listing.tenantPreferences.smoking.map(v => tenantPrefLabels.smoking[v] || v).join(", ")}
                      </p>
                    </div>
                  )}
                  {listing.tenantPreferences.other && (
                    <div className="sm:col-span-2">
                      <p className="text-sm text-zinc-500 mb-1">Yêu cầu khác</p>
                      <p className="font-medium">{listing.tenantPreferences.other}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Tips */}
            <div className="rounded-xl border-2 border-black bg-red-50 p-5 shadow-[var(--shadow-secondary)]">
              <h2 className="mb-3 text-lg font-bold flex items-center gap-2">
                <Lightbulb className="h-5 w-5" /> Lưu ý khi thuê phòng
              </h2>
              <ul className="space-y-1.5 text-sm text-zinc-700">
                <li>• Xem phòng trực tiếp trước khi đặt cọc</li>
                <li>• Đọc kỹ hợp đồng, chú ý các điều khoản phạt</li>
                <li>• Xác nhận giá điện nước trước khi ký</li>
                <li>• Chụp ảnh hiện trạng phòng trước khi dọn vào</li>
              </ul>
            </div>
          </div>

          {/* Right Column - Contact */}
          <div className="space-y-4">
            <div className="lg:sticky lg:top-32 rounded-xl border-2 border-black bg-blue-50 p-6 shadow-[var(--shadow-secondary)]">
              <h3 className="mb-1 text-sm font-bold uppercase tracking-wider text-zinc-600">
                Liên hệ chủ nhà
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
                        href={listing.facebook.startsWith('http') ? listing.facebook : `https://facebook.com/${listing.facebook}`}
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
                        href={listing.instagram.startsWith('http') ? listing.instagram : `https://instagram.com/${listing.instagram}`}
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
                  href={`/auth?returnUrl=/cho-thue/listing/${id}`}
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
                  <User className="h-5 w-5" /> Xem hồ sơ người đăng
                </Link>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <button
                onClick={toggleFavorite}
                className={`flex-1 flex items-center justify-center gap-2 rounded-lg border-2 border-black px-3 py-2.5 text-sm font-bold transition-all hover:translate-x-[2px] hover:translate-y-[2px] shadow-[var(--shadow-secondary)] hover:shadow-none
                  ${isFavorited ? 'bg-pink-300' : 'bg-white'}`}
              >
                <Heart className={`h-4 w-4 ${isFavorited ? 'fill-current' : ''}`} />
                {isFavorited ? 'Đã lưu' : 'Lưu'}
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
