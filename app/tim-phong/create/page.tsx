"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import MainHeader from "../../components/MainHeader";
import ShareFooter from "../../components/ShareFooter";
import { useAuth } from "../../contexts/AuthContext";
import { Lightbulb, Loader2, NotebookPen, CheckCircle2 } from "lucide-react";

type PropertyPreference = "nha-tro" | "can-ho" | "nha-rieng" | "phong-dv";

const propertyTypeOptions: { value: PropertyPreference; label: string; desc: string }[] = [
  { value: "nha-tro", label: "Nhà trọ / Phòng trọ", desc: "Phòng bình dân, giá tốt" },
  { value: "can-ho", label: "Căn hộ / Chung cư", desc: "Căn hộ mini, chung cư" },
  { value: "nha-rieng", label: "Nhà riêng", desc: "Nhà nguyên căn, nhà phố" },
  { value: "phong-dv", label: "Phòng dịch vụ", desc: "Bao điện nước, đầy đủ tiện nghi" },
];

const amenityOptions = [
  { value: "ac", label: "Điều hòa" },
  { value: "wifi", label: "Wifi" },
  { value: "washing", label: "Máy giặt" },
  { value: "fridge", label: "Tủ lạnh" },
  { value: "kitchen", label: "Bếp" },
  { value: "parking", label: "Chỗ đậu xe" },
  { value: "elevator", label: "Thang máy" },
  { value: "security", label: "Bảo vệ 24/7" },
  { value: "balcony", label: "Ban công" },
  { value: "furnished", label: "Nội thất đầy đủ" },
];

function CreateTimPhongContent() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth?returnUrl=/tim-phong/create");
    }
  }, [isAuthenticated, router]);

  const [showStep2, setShowStep2] = useState(false);
  const [showStep3, setShowStep3] = useState(false);
  const [showDraftModal, setShowDraftModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [draftData, setDraftData] = useState<unknown>(null);

  // Step 1: What you're looking for
  const [propertyTypes, setPropertyTypes] = useState<PropertyPreference[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState("");
  const [moveInDate, setMoveInDate] = useState("");
  const [minRoomSize, setMinRoomSize] = useState("");
  const [leaseDuration, setLeaseDuration] = useState("");
  const [showValidation, setShowValidation] = useState(false);

  // Step 2: Lifestyle & amenity requirements
  const [gender, setGender] = useState("");
  const [occupation, setOccupation] = useState("");
  const [hasPets, setHasPets] = useState("");
  const [smokingHabit, setSmokingHabit] = useState("");
  const [cookingHabit, setCookingHabit] = useState("");
  const [requiredAmenities, setRequiredAmenities] = useState<string[]>([]);
  const [schedule, setSchedule] = useState("");

  // Step 3: Contact
  const [contactPhone, setContactPhone] = useState("");
  const [contactZalo, setContactZalo] = useState("");
  const [sameAsPhone, setSameAsPhone] = useState(false);
  const [contactFacebook, setContactFacebook] = useState("");

  useEffect(() => {
    if (sameAsPhone) setContactZalo(contactPhone);
  }, [sameAsPhone, contactPhone]);

  // Load draft
  useEffect(() => {
    const savedDraft = localStorage.getItem("tim_phong_draft");
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft);
        setDraftData(draft);
        setShowDraftModal(true);
      } catch { /* ignore */ }
    }
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleRestoreDraft = (draft: any) => {
    setPropertyTypes(draft.propertyTypes || []);
    setTitle(draft.title || "");
    setDescription(draft.description || "");
    setLocation(draft.location || "");
    setBudget(draft.budget || "");
    setMoveInDate(draft.moveInDate || "");
    setMinRoomSize(draft.minRoomSize || "");
    setLeaseDuration(draft.leaseDuration || "");
    setGender(draft.gender || "");
    setOccupation(draft.occupation || "");
    setHasPets(draft.hasPets || "");
    setSmokingHabit(draft.smokingHabit || "");
    setCookingHabit(draft.cookingHabit || "");
    setRequiredAmenities(draft.requiredAmenities || []);
    setSchedule(draft.schedule || "");
    setContactPhone(draft.contactPhone || "");
    setContactZalo(draft.contactZalo || "");
    setSameAsPhone(draft.sameAsPhone || false);
    setContactFacebook(draft.contactFacebook || "");
    setShowDraftModal(false);
  };

  const togglePropertyType = (pt: PropertyPreference) => {
    setPropertyTypes(prev =>
      prev.includes(pt) ? prev.filter(p => p !== pt) : [...prev, pt]
    );
  };

  const toggleAmenity = (value: string) => {
    setRequiredAmenities(prev =>
      prev.includes(value) ? prev.filter(a => a !== value) : [...prev, value]
    );
  };

  const isStep1Complete =
    propertyTypes.length > 0 &&
    title.trim() !== "" &&
    description.trim() !== "" &&
    location.trim() !== "" &&
    budget.trim() !== "" &&
    moveInDate.trim() !== "";

  const saveDraft = () => {
    const draft = {
      propertyTypes, title, description, location, budget, moveInDate, minRoomSize, leaseDuration,
      gender, occupation, hasPets, smokingHabit, cookingHabit, requiredAmenities, schedule,
      contactPhone, contactZalo, sameAsPhone, contactFacebook,
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem("tim_phong_draft", JSON.stringify(draft));
    alert("Đã lưu nháp!");
  };

  const handleSubmit = () => {
    if (!contactPhone.trim()) return;
    const listingData = {
      id: `tp-${Date.now()}`,
      category: "tim-phong",
      propertyTypes,
      title,
      description,
      location,
      price: budget,
      moveInDate,
      roomSize: minRoomSize,
      minContractDuration: leaseDuration,
      roommatePreferences: {
        gender,
        occupation,
        pets: hasPets === "yes",
        smoking: smokingHabit === "yes",
        cooking: cookingHabit === "yes",
        schedule,
      },
      amenities: requiredAmenities,
      phone: contactPhone,
      zalo: contactZalo,
      facebook: contactFacebook,
      author: user?.displayName || user?.email || "Ẩn danh",
      userId: user?.uid,
      createdAt: new Date().toISOString(),
    };

    const existing = JSON.parse(localStorage.getItem("tim_phong_listings") || "[]");
    existing.push(listingData);
    localStorage.setItem("tim_phong_listings", JSON.stringify(existing));
    localStorage.removeItem("tim_phong_draft");
    setShowSuccessModal(true);
  };

  if (!isAuthenticated) return null;

  const currentStep = showStep3 ? 3 : showStep2 ? 2 : 1;

  return (
    <div className="min-h-screen bg-white">
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          <div className="relative z-10 w-full max-w-md mx-4 bg-white rounded-xl border-2 border-black shadow-[var(--shadow-primary)] p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-100 border-2 border-black flex items-center justify-center">
              <span className="text-2xl">✓</span>
            </div>
            <h2 className="text-2xl font-bold mb-2">Đăng tin thành công!</h2>
            <p className="text-zinc-600 mb-6">Yêu cầu tìm phòng của bạn đã được đăng. Chủ nhà có thể tìm thấy và liên hệ bạn ngay!</p>
            <div className="flex gap-3">
              <button onClick={() => router.push("/profile")} className="btn-secondary flex-1">Về hồ sơ</button>
              <button onClick={() => router.push("/tim-phong")} className="btn-primary flex-1">Xem danh sách</button>
            </div>
          </div>
        </div>
      )}

      {/* Draft Modal */}
      {showDraftModal && draftData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="bg-white rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] w-full max-w-md p-6">
            <div className="flex items-center gap-3 mb-4">
              <NotebookPen className="w-8 h-8" strokeWidth={1.5} />
              <h3 className="text-xl font-bold">Tìm thấy bản nháp</h3>
            </div>
            <p className="text-zinc-600 mb-6">Bạn có bản nháp đã lưu. Bạn có muốn khôi phục không?</p>
            <div className="flex gap-3">
              <button onClick={() => { localStorage.removeItem("tim_phong_draft"); setShowDraftModal(false); }} className="flex-1 btn-secondary">Bỏ qua</button>
              <button onClick={() => handleRestoreDraft(draftData)} className="flex-1 btn-primary">Khôi phục</button>
            </div>
          </div>
        </div>
      )}

      <MainHeader />

      {/* Hero */}
      <section className="bg-pink-50 py-12">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="text-3xl font-extrabold sm:text-4xl">Đăng tìm phòng</h1>
          <p className="mt-2 text-zinc-600">Cho chủ nhà biết bạn đang cần gì — họ sẽ liên hệ bạn!</p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">

          {/* Form */}
          <div>
            {/* ── STEP 1 ── */}
            {!showStep2 && !showStep3 && (
              <div className="rounded-xl border-2 border-black bg-white shadow-[var(--shadow-secondary)]">
                <div className="flex items-center gap-3 border-b-2 border-black bg-pink-50 px-6 py-5 rounded-t-xl">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-black bg-pink-300 font-bold text-sm">1</span>
                  <h2 className="text-lg font-bold">Bạn đang tìm gì?</h2>
                </div>
                <div className="p-6 space-y-6">

                  {/* Property type */}
                  <div>
                    <label className="mb-2 block text-sm font-bold">Loại phòng mong muốn <span className="text-red-500">*</span></label>
                    <p className="mb-3 text-xs text-zinc-500">Chọn một hoặc nhiều loại</p>
                    <div className="grid grid-cols-2 gap-3">
                      {propertyTypeOptions.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => togglePropertyType(opt.value)}
                          className={`rounded-lg border-2 p-4 text-left transition-all ${
                            propertyTypes.includes(opt.value)
                              ? "border-black bg-pink-200 shadow-[3px_3px_0_0_#000]"
                              : "border-zinc-300 bg-white hover:border-black"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-sm">{opt.label}</span>
                            {propertyTypes.includes(opt.value) && <CheckCircle2 className="h-4 w-4" />}
                          </div>
                          <span className="text-xs text-zinc-500">{opt.desc}</span>
                        </button>
                      ))}
                    </div>
                    {showValidation && propertyTypes.length === 0 && (
                      <p className="mt-1 text-sm text-red-500">Vui lòng chọn ít nhất một loại phòng</p>
                    )}
                  </div>

                  {/* Title */}
                  <div>
                    <label className="mb-1 block text-sm font-bold">Tiêu đề <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                      placeholder="VD: Sinh viên tìm phòng trọ quận 1, giá dưới 3 triệu"
                      className="w-full rounded-lg border-2 border-black px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-pink-400"
                    />
                    {showValidation && !title.trim() && (
                      <p className="mt-1 text-sm text-red-500">Vui lòng nhập tiêu đề</p>
                    )}
                  </div>

                  {/* Location */}
                  <div>
                    <label className="mb-1 block text-sm font-bold">Khu vực mong muốn <span className="text-red-500">*</span></label>
                    <input
                      type="text"
                      value={location}
                      onChange={e => setLocation(e.target.value)}
                      placeholder="VD: Quận Bình Thạnh, TP.HCM"
                      className="w-full rounded-lg border-2 border-black px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-pink-400"
                    />
                    {showValidation && !location.trim() && (
                      <p className="mt-1 text-sm text-red-500">Vui lòng nhập khu vực</p>
                    )}
                  </div>

                  {/* Budget & Move-in */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1 block text-sm font-bold">Ngân sách / tháng <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        value={budget}
                        onChange={e => setBudget(e.target.value)}
                        placeholder="VD: 3.000.000đ"
                        className="w-full rounded-lg border-2 border-black px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-pink-400"
                      />
                      {showValidation && !budget.trim() && (
                        <p className="mt-1 text-sm text-red-500">Bắt buộc</p>
                      )}
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-bold">Muốn dọn vào <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        value={moveInDate}
                        onChange={e => setMoveInDate(e.target.value)}
                        placeholder="VD: 01/04/2025"
                        className="w-full rounded-lg border-2 border-black px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-pink-400"
                      />
                      {showValidation && !moveInDate.trim() && (
                        <p className="mt-1 text-sm text-red-500">Bắt buộc</p>
                      )}
                    </div>
                  </div>

                  {/* Room size & Lease */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1 block text-sm font-bold">Diện tích tối thiểu</label>
                      <input
                        type="text"
                        value={minRoomSize}
                        onChange={e => setMinRoomSize(e.target.value)}
                        placeholder="VD: 20"
                        className="w-full rounded-lg border-2 border-black px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-pink-400"
                      />
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-bold">Thời gian thuê dự kiến</label>
                      <select
                        value={leaseDuration}
                        onChange={e => setLeaseDuration(e.target.value)}
                        className="w-full rounded-lg border-2 border-black px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-pink-400"
                      >
                        <option value="">Chọn...</option>
                        <option value="1-3 tháng">1 - 3 tháng</option>
                        <option value="3-6 tháng">3 - 6 tháng</option>
                        <option value="6-12 tháng">6 - 12 tháng</option>
                        <option value="Trên 1 năm">Trên 1 năm</option>
                        <option value="Không xác định">Không xác định</option>
                      </select>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="mb-1 block text-sm font-bold">Giới thiệu bản thân <span className="text-red-500">*</span></label>
                    <textarea
                      value={description}
                      onChange={e => setDescription(e.target.value)}
                      rows={5}
                      placeholder="Mô tả về bản thân, nhu cầu tìm phòng, lý do tìm phòng..."
                      className="w-full rounded-lg border-2 border-black px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-pink-400 resize-none"
                    />
                    {showValidation && !description.trim() && (
                      <p className="mt-1 text-sm text-red-500">Vui lòng giới thiệu bản thân</p>
                    )}
                  </div>

                  <div className="flex justify-end gap-3 pt-2">
                    <button type="button" onClick={saveDraft} className="btn-secondary">
                      Lưu nháp
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowValidation(true);
                        if (isStep1Complete) {
                          setShowStep2(true);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }
                      }}
                      className="btn-primary"
                    >
                      Tiếp theo →
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ── STEP 2 ── */}
            {showStep2 && !showStep3 && (
              <div className="rounded-xl border-2 border-black bg-white shadow-[var(--shadow-secondary)]">
                <div className="flex items-center gap-3 border-b-2 border-black bg-pink-50 px-6 py-5 rounded-t-xl">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-black bg-pink-300 font-bold text-sm">2</span>
                  <h2 className="text-lg font-bold">Thông tin cá nhân &amp; yêu cầu tiện nghi</h2>
                </div>
                <div className="p-6 space-y-6">

                  {/* Personal info */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-1 block text-sm font-bold">Giới tính</label>
                      <select
                        value={gender}
                        onChange={e => setGender(e.target.value)}
                        className="w-full rounded-lg border-2 border-black px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-pink-400"
                      >
                        <option value="">Chọn...</option>
                        <option value="Nam">Nam</option>
                        <option value="Nữ">Nữ</option>
                        <option value="Khác">Khác</option>
                      </select>
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-bold">Nghề nghiệp</label>
                      <select
                        value={occupation}
                        onChange={e => setOccupation(e.target.value)}
                        className="w-full rounded-lg border-2 border-black px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-pink-400"
                      >
                        <option value="">Chọn...</option>
                        <option value="Sinh viên">Sinh viên</option>
                        <option value="Đi làm">Đi làm</option>
                        <option value="Tự kinh doanh">Tự kinh doanh</option>
                        <option value="Người nước ngoài">Người nước ngoài</option>
                        <option value="Khác">Khác</option>
                      </select>
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-bold">Nuôi thú cưng</label>
                      <select
                        value={hasPets}
                        onChange={e => setHasPets(e.target.value)}
                        className="w-full rounded-lg border-2 border-black px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-pink-400"
                      >
                        <option value="">Chọn...</option>
                        <option value="no">Không nuôi</option>
                        <option value="yes">Có nuôi</option>
                      </select>
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-bold">Hút thuốc</label>
                      <select
                        value={smokingHabit}
                        onChange={e => setSmokingHabit(e.target.value)}
                        className="w-full rounded-lg border-2 border-black px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-pink-400"
                      >
                        <option value="">Chọn...</option>
                        <option value="no">Không hút</option>
                        <option value="yes">Có hút</option>
                      </select>
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-bold">Nấu ăn</label>
                      <select
                        value={cookingHabit}
                        onChange={e => setCookingHabit(e.target.value)}
                        className="w-full rounded-lg border-2 border-black px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-pink-400"
                      >
                        <option value="">Chọn...</option>
                        <option value="no">Không nấu</option>
                        <option value="yes">Thường nấu ăn</option>
                      </select>
                    </div>
                    <div>
                      <label className="mb-1 block text-sm font-bold">Lịch sinh hoạt</label>
                      <select
                        value={schedule}
                        onChange={e => setSchedule(e.target.value)}
                        className="w-full rounded-lg border-2 border-black px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-pink-400"
                      >
                        <option value="">Chọn...</option>
                        <option value="Dậy sớm, ngủ sớm">Dậy sớm, ngủ sớm</option>
                        <option value="Thức khuya">Thức khuya</option>
                        <option value="Đi làm ca">Đi làm ca</option>
                        <option value="Bình thường">Bình thường</option>
                      </select>
                    </div>
                  </div>

                  {/* Required amenities */}
                  <div>
                    <label className="mb-2 block text-sm font-bold">Tiện nghi cần có</label>
                    <p className="mb-3 text-xs text-zinc-500">Chọn các tiện nghi bắt buộc với bạn</p>
                    <div className="flex flex-wrap gap-2">
                      {amenityOptions.map(opt => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => toggleAmenity(opt.value)}
                          className={`rounded-lg border-2 px-4 py-2 text-sm font-medium transition-all ${
                            requiredAmenities.includes(opt.value)
                              ? "border-black bg-pink-200 shadow-[2px_2px_0_0_#000]"
                              : "border-zinc-300 hover:border-black"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-between gap-3 pt-2">
                    <button type="button" onClick={() => { setShowStep2(false); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="btn-secondary">
                      ← Quay lại
                    </button>
                    <div className="flex gap-3">
                      <button type="button" onClick={saveDraft} className="btn-secondary">
                        Lưu nháp
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowStep3(true);
                          window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="btn-primary"
                      >
                        Tiếp theo →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── STEP 3 ── */}
            {showStep3 && (
              <div className="rounded-xl border-2 border-black bg-white shadow-[var(--shadow-secondary)]">
                <div className="flex items-center gap-3 border-b-2 border-black bg-pink-50 px-6 py-5 rounded-t-xl">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-black bg-pink-300 font-bold text-sm">3</span>
                  <h2 className="text-lg font-bold">Thông tin liên hệ</h2>
                </div>
                <div className="p-6 space-y-6">

                  <div>
                    <label className="mb-1 block text-sm font-bold">Số điện thoại <span className="text-red-500">*</span></label>
                    <input
                      type="tel"
                      value={contactPhone}
                      onChange={e => setContactPhone(e.target.value)}
                      placeholder="VD: 0912 345 678"
                      className="w-full rounded-lg border-2 border-black px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-pink-400"
                    />
                    {!contactPhone.trim() && (
                      <p className="mt-1 text-xs text-zinc-400">Bắt buộc — chủ nhà dùng để liên hệ bạn</p>
                    )}
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-bold">Zalo</label>
                    <div className="flex items-center gap-3 mb-2">
                      <input
                        type="checkbox"
                        id="same-as-phone-tp"
                        checked={sameAsPhone}
                        onChange={e => setSameAsPhone(e.target.checked)}
                        className="w-4 h-4"
                      />
                      <label htmlFor="same-as-phone-tp" className="text-sm">Giống số điện thoại</label>
                    </div>
                    <input
                      type="tel"
                      value={contactZalo}
                      onChange={e => { setSameAsPhone(false); setContactZalo(e.target.value); }}
                      placeholder="Số Zalo"
                      disabled={sameAsPhone}
                      className="w-full rounded-lg border-2 border-black px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-pink-400 disabled:bg-zinc-50 disabled:text-zinc-400"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-sm font-bold">Facebook (không bắt buộc)</label>
                    <input
                      type="text"
                      value={contactFacebook}
                      onChange={e => setContactFacebook(e.target.value)}
                      placeholder="Link Facebook hoặc username"
                      className="w-full rounded-lg border-2 border-black px-4 py-3 text-base focus:outline-none focus:ring-2 focus:ring-pink-400"
                    />
                  </div>

                  <div className="rounded-lg border-2 border-black bg-yellow-50 p-4 text-sm text-zinc-700">
                    <p className="font-bold mb-1">Lưu ý về bảo mật</p>
                    <p>Thông tin liên hệ của bạn chỉ hiển thị cho người dùng đã đăng nhập. Không chia sẻ thông tin cá nhân nhạy cảm khác trong phần giới thiệu.</p>
                  </div>

                  <div className="flex justify-between gap-3 pt-2">
                    <button type="button" onClick={() => { setShowStep3(false); window.scrollTo({ top: 0, behavior: "smooth" }); }} className="btn-secondary">
                      ← Quay lại
                    </button>
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={!contactPhone.trim()}
                      className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Đăng tin tìm phòng
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-4 lg:pt-0">
            {/* Progress */}
            <div className="rounded-xl border-2 border-black bg-white p-5 shadow-[var(--shadow-secondary)]">
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-zinc-500">Tiến trình</h3>
              <div className="space-y-3">
                {[
                  { step: 1, label: "Nhu cầu tìm phòng" },
                  { step: 2, label: "Thông tin cá nhân" },
                  { step: 3, label: "Liên hệ" },
                ].map(({ step, label }) => (
                  <div key={step} className="flex items-center gap-3">
                    <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border-2 border-black text-sm font-bold transition-colors
                      ${currentStep > step ? "bg-green-300" : currentStep === step ? "bg-pink-300" : "bg-zinc-100"}`}
                    >
                      {currentStep > step ? "✓" : step}
                    </div>
                    <span className={`text-sm ${currentStep === step ? "font-bold" : "text-zinc-500"}`}>{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips */}
            <div className="rounded-xl border-2 border-black bg-pink-50 p-5 shadow-[var(--shadow-secondary)]">
              <h3 className="mb-3 text-sm font-bold flex items-center gap-2">
                <Lightbulb className="h-4 w-4" /> Mẹo đăng tin hiệu quả
              </h3>
              <ul className="space-y-2 text-sm text-zinc-700">
                <li>• Ghi rõ khu vực cụ thể bạn muốn thuê</li>
                <li>• Đề cập ngân sách thực tế để chủ nhà phù hợp liên hệ</li>
                <li>• Giới thiệu bản thân chân thực giúp tăng uy tín</li>
                <li>• Cập nhật ngày muốn dọn vào chính xác</li>
              </ul>
            </div>

            {/* Save draft */}
            <button
              type="button"
              onClick={saveDraft}
              className="w-full rounded-xl border-2 border-black bg-white px-4 py-3 text-sm font-bold shadow-[var(--shadow-secondary)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none"
            >
              Lưu nháp
            </button>
          </div>
        </div>
      </div>

      <ShareFooter />
    </div>
  );
}

export default function TimPhongCreatePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-pink-400" />
      </div>
    }>
      <CreateTimPhongContent />
    </Suspense>
  );
}
