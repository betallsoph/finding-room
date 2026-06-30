'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import MainHeader from "../components/MainHeader";
import ShareFooter from "../components/ShareFooter";
import ProtectedRoute from "../components/ProtectedRoute";
import CompleteProfileModal from "../components/CompleteProfileModal";
import EditProfileModal from "../components/EditProfileModal";
import PostTypeModal from "../components/PostTypeModal";
import { useAuth } from "../contexts/AuthContext";
import { useRouter, useSearchParams } from "next/navigation";
import { Heart, Loader2, Sparkles, MapPin, Calendar } from "lucide-react";
import { getUserProfile, saveUserProfile } from "../data/users";
import { getListingsByUserId } from "../data/listings";
import { UserProfile, RoomListing } from "../data/types";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showCompleteProfileModal, setShowCompleteProfileModal] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showPostTypeModal, setShowPostTypeModal] = useState(false);
  const [profileData, setProfileData] = useState<UserProfile | null>(null);
  const [myListings, setMyListings] = useState<RoomListing[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Check if redirected from reminder modal
  const shouldOpenCompleteModal = searchParams.get('complete') === 'true';

  // Load profile and listings from Firestore
  useEffect(() => {
    async function loadData() {
      if (!user) {
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      // --- MOCK PROFILE BYPASS ---
      if (user.uid === "mock-user-123") {
        setProfileData({
          uid: user.uid,
          email: "chloe.tran@example.com",
          displayName: "Chloe Tran",
          photoURL: "https://api.dicebear.com/7.x/notionists/svg?seed=Chloe",
          gender: "Nữ",
          birthYear: "1999",
          occupation: "Designer / UI UX",
        });
        
        // Mock listings
        setMyListings([
          {
            id: "ct-101",
            title: "Pass lại phòng trọ full nội thất, ban công chill Q. Phú Nhuận",
            author: "Chloe Tran",
            price: "4.5 Triệu/tháng",
            location: "Quận Phú Nhuận, TP.HCM",
            moveInDate: "Tới ở liền",
            description: "Do chuyển công tác nên mình cần pass lại phòng. Phòng cực rộng rãi mát mẻ, có sẵn giường tủ nệm, máy lạnh, tủ lạnh con...",
            phone: "0901234567",
            postedDate: "2 ngày trước",
            rentalType: "nha-tro",
            status: "active",
            category: "cho-thue"
          },
          {
            id: "tp-202",
            title: "Tìm 1 bạn nữ ở ghép, chung cư cao cấp Novaland Q4",
            author: "Chloe Tran",
            price: "Share 3.5 Triệu/tháng",
            location: "Quận 4, TP.HCM",
            moveInDate: "Tháng sau",
            description: "Mình đang thuê nguyên căn hộ 2PN, cần tìm 1 bạn nữ vô ở chung share tiền phòng. Yêu cầu sạch sẽ, gọn gàng, tôn trọng không gian chung.",
            phone: "0901234567",
            postedDate: "1 tuần trước",
            propertyTypes: ["can-ho"],
            status: "active",
            category: "tim-phong"
          }
        ]);
        
        setIsLoading(false);
        return;
      }
      // --- END MOCK BYPASS ---

      try {
        // Load profile from Firestore
        const profile = await getUserProfile(user.uid);

        if (profile) {
          setProfileData(profile);
          // Check if profile is incomplete - show modal if incomplete OR if redirected with ?complete=true
          if (!profile.gender || !profile.birthYear || !profile.occupation) {
            setShowCompleteProfileModal(true);
          } else if (shouldOpenCompleteModal) {
            // Profile already complete, clear the query param
            router.replace('/profile');
          }
        } else {
          // Create initial profile from Firebase Auth data
          const newProfile: UserProfile = {
            uid: user.uid,
            email: user.email || '',
            displayName: user.displayName || '',
            photoURL: user.photoURL || undefined,
          };
          setProfileData(newProfile);
          setShowCompleteProfileModal(true);
        }

        // Load user's listings
        const listings = await getListingsByUserId(user.uid);
        setMyListings(listings);
      } catch (error) {
        console.error("Error loading profile data:", error);
        // Still show page with Firebase Auth data
        const newProfile: UserProfile = {
          uid: user.uid,
          email: user.email || '',
          displayName: user.displayName || '',
          photoURL: user.photoURL || undefined,
        };
        setProfileData(newProfile);
        // Still show complete modal on error if redirected
        if (shouldOpenCompleteModal) {
          setShowCompleteProfileModal(true);
        }
      }

      setIsLoading(false);
    }

    loadData();
  }, [user, shouldOpenCompleteModal, router]);

  const handleLogout = () => {
    setTimeout(() => {
      logout();
      if (window.history.length > 2) {
        router.back();
      } else {
        router.push("/");
      }
    }, 150);
  };

  const handleCompleteProfileSubmit = async (data: { gender: string; birthYear: string; occupation: string }) => {
    if (!user || !profileData) return;

    const updatedProfile: UserProfile = {
      ...profileData,
      gender: data.gender,
      birthYear: data.birthYear,
      occupation: data.occupation,
    };

    try {
      // Save to Firestore
      await saveUserProfile(updatedProfile);
      setProfileData(updatedProfile);
      setShowCompleteProfileModal(false);
    } catch (error) {
      console.error("Error saving profile:", error);
      // Still update local state even if Firestore fails
      setProfileData(updatedProfile);
      setShowCompleteProfileModal(false);
    }
  };

  const handleEditProfileSave = async (data: { gender: string; birthYear: string; occupation: string }) => {
    if (!user || !profileData) return;

    const updatedProfile: UserProfile = {
      ...profileData,
      gender: data.gender,
      birthYear: data.birthYear,
      occupation: data.occupation,
    };

    try {
      await saveUserProfile(updatedProfile);
      setProfileData(updatedProfile);
      setShowEditProfileModal(false);
    } catch (error) {
      console.error("Error saving profile:", error);
      setProfileData(updatedProfile);
      setShowEditProfileModal(false);
    }
  };

  const handleModalClose = () => {
    setShowCompleteProfileModal(false);
  };

  // Get display name or fallback
  const displayName = profileData?.displayName || user?.displayName || 'Người dùng';
  const photoURL = profileData?.photoURL || user?.photoURL;

  // Get status display text and color
  const getStatusDisplay = (status?: string) => {
    switch (status) {
      case 'active':
        return { text: 'Đang hiển thị', color: 'bg-green-200' };
      case 'hidden':
        return { text: 'Đã ẩn', color: 'bg-yellow-200' };
      case 'deleted':
        return { text: 'Đã xóa', color: 'bg-red-200' };
      default:
        return { text: 'Đang hiển thị', color: 'bg-green-200' };
    }
  };

  if (isLoading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-white">
          <MainHeader />
          <div className="flex min-h-[60vh] items-center justify-center">
            <Loader2 className="h-12 w-12 animate-spin text-zinc-400" />
          </div>
          <ShareFooter />
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-white">
        <MainHeader />

        {/* Complete Profile Modal - only for first time */}
        <CompleteProfileModal
          isOpen={showCompleteProfileModal}
          onClose={handleModalClose}
          onComplete={handleCompleteProfileSubmit}
        />

        {/* Edit Profile Modal - for editing existing data */}
        <EditProfileModal
          isOpen={showEditProfileModal}
          onClose={() => setShowEditProfileModal(false)}
          onSave={handleEditProfileSave}
          initialData={{
            gender: profileData?.gender || '',
            birthYear: profileData?.birthYear || '',
            occupation: profileData?.occupation || ''
          }}
        />

        {/* Post Type Modal */}
        <PostTypeModal
          isOpen={showPostTypeModal}
          onClose={() => setShowPostTypeModal(false)}
        />

        {/* Hero Section */}
        <section className="bg-[#faf9f7] py-10 sm:py-14 border-b border-[#f0ede8]">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-8">
              <h1 className="mb-2 text-3xl font-extrabold leading-tight sm:text-4xl">
                Hồ sơ của bạn
              </h1>
              <p className="text-base text-zinc-600">
                Quản lý thông tin cá nhân và các bài đăng của bạn
              </p>
            </div>

            {/* Profile Info Card */}
            <div className="rounded-2xl border border-[#e8e4de] bg-white p-6 sm:p-8" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-5">
                  {photoURL ? (
                    <img
                      src={photoURL}
                      alt={displayName}
                      className="h-20 w-20 rounded-full object-cover shadow-sm border border-[#e8e4de]"
                    />
                  ) : (
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-100 text-blue-600 text-3xl font-bold">
                      {displayName.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <h2 className="text-2xl font-bold text-zinc-900">{displayName}</h2>
                    {user?.email && (
                      <p className="text-sm font-medium text-zinc-500 mt-1">{user.email}</p>
                    )}
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="rounded-full px-6 py-2.5 text-sm font-semibold text-red-600 bg-red-50 hover:bg-red-100 transition-colors"
                >
                  Đăng xuất
                </button>
              </div>
            </div>

            {/* Personal Info Section */}
            <div className="mt-6 rounded-2xl border border-[#e8e4de] bg-white p-6 sm:p-8" style={{ boxShadow: "0 2px 12px rgba(0,0,0,0.04)" }}>
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#f0ede8]">
                <h3 className="text-lg font-bold text-zinc-900">Thông tin cá nhân</h3>
                <button
                  onClick={() => setShowEditProfileModal(true)}
                  className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Chỉnh sửa
                </button>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {/* Giới tính */}
                <div>
                  <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1.5">Giới tính</p>
                  <p className="text-base font-semibold text-zinc-800">{profileData?.gender || 'Chưa cập nhật'}</p>
                </div>

                {/* Năm sinh */}
                <div>
                  <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1.5">Năm sinh</p>
                  <p className="text-base font-semibold text-zinc-800">{profileData?.birthYear || 'Chưa cập nhật'}</p>
                </div>

                {/* Nghề nghiệp */}
                <div>
                  <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider mb-1.5">Nghề nghiệp</p>
                  <p className="text-base font-semibold text-zinc-800">{profileData?.occupation || 'Chưa cập nhật'}</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-6 grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
              <div
                onClick={() => setTimeout(() => router.push('/favorites'), 150)}
                className="group flex items-center gap-4 rounded-2xl border border-pink-100 bg-pink-50/50 p-6 cursor-pointer hover:bg-pink-50 hover:border-pink-200 transition-all"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-pink-100 text-pink-500 group-hover:scale-105 transition-transform">
                  <Heart className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-zinc-900 group-hover:text-pink-600 transition-colors">
                    Yêu thích của tôi
                  </h3>
                  <p className="text-sm text-zinc-600 mt-0.5">
                    Xem các bài đăng đã lưu
                  </p>
                </div>
              </div>

              <div
                onClick={() => setTimeout(() => router.push('/profile/lifestyle'), 150)}
                className="group flex items-center gap-4 rounded-2xl border border-blue-100 bg-blue-50/50 p-6 cursor-pointer hover:bg-blue-50 hover:border-blue-200 transition-all"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-500 group-hover:scale-105 transition-transform">
                  <Sparkles className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-zinc-900 group-hover:text-blue-600 transition-colors">
                    Hồ sơ lối sống
                  </h3>
                  <p className="text-sm text-zinc-600 mt-0.5">
                    Thói quen & sở thích của bạn
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Listings Section */}
        <section className="py-12 bg-white">
          <div className="mx-auto max-w-7xl px-6">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-zinc-900">Bài đăng của tôi</h2>
              <button
                onClick={() => setShowPostTypeModal(true)}
                className="rounded-full bg-[#4f46e5] hover:bg-[#4338ca] text-white text-sm font-semibold px-5 py-2.5 transition-all shadow-sm"
              >
                Đăng bài mới
              </button>
            </div>

            {/* Listings Grid */}
            {myListings.length > 0 ? (
              <div className="grid gap-6">
                {myListings.map((listing) => {
                  const statusDisplay = getStatusDisplay(listing.status);
                  return (
                    <div key={listing.id} className="rounded-2xl border border-[#e8e4de] bg-white p-6 hover:shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all">
                      <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="mb-2 flex items-center gap-2">
                            <Link
                              href={`/listing/${listing.id}`}
                              className="text-lg font-bold text-zinc-900 hover:text-blue-600 transition-colors line-clamp-1"
                            >
                              {listing.title}
                            </Link>
                            <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${statusDisplay.color.replace('bg-', 'bg-').replace('200', '100')} text-zinc-700`}>
                              {statusDisplay.text}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-4 text-sm text-zinc-500">
                            <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4" /> {listing.location}</span>
                            <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {listing.moveInDate}</span>
                          </div>
                        </div>
                        <div className="flex-shrink-0 text-right">
                          <span className="inline-block rounded-full bg-blue-50 text-blue-700 px-3 py-1.5 text-sm font-bold">
                            {listing.price}
                          </span>
                        </div>
                      </div>

                      <p className="mb-5 text-sm text-zinc-600 line-clamp-2">
                        {listing.description}
                      </p>

                      <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-[#f5f5f4]">
                        <button className="rounded-full px-4 py-1.5 text-sm font-medium text-[#4f46e5] bg-[#eef2ff] hover:bg-blue-100 transition-colors">
                          Chỉnh sửa
                        </button>
                        <Link
                          href={`/listing/${listing.id}`}
                          className="rounded-full px-4 py-1.5 text-sm font-medium text-zinc-700 bg-zinc-100 hover:bg-zinc-200 transition-colors"
                        >
                          Xem chi tiết
                        </Link>
                        <div className="flex-1"></div>
                        <button className="rounded-full px-4 py-1.5 text-sm font-medium text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 transition-colors">
                          Tạm ẩn
                        </button>
                        <button className="rounded-full px-4 py-1.5 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors">
                          Xóa
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="rounded-2xl border border-dashed border-[#d6d3d1] bg-[#faf9f7] p-12 text-center">
                <h3 className="text-lg font-bold text-zinc-900 mb-2">Chưa có bài đăng nào</h3>
                <p className="text-zinc-500 mb-6">Bạn chưa tạo bài đăng cho thuê hoặc tìm phòng nào.</p>
                <button
                  onClick={() => setShowPostTypeModal(true)}
                  className="rounded-full bg-white border border-[#e8e4de] text-zinc-800 text-sm font-semibold px-6 py-2.5 hover:bg-zinc-50 transition-all shadow-sm"
                >
                  Đăng bài đầu tiên
                </button>
              </div>
            )}
          </div>
        </section>

        <ShareFooter />
      </div>
    </ProtectedRoute>
  );
}
