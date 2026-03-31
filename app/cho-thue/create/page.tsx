"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter } from "next/navigation";
import MainHeader from "../../components/MainHeader";
import ShareFooter from "../../components/ShareFooter";
import { useAuth } from "../../contexts/AuthContext";
import { Lightbulb, Loader2, NotebookPen } from "lucide-react";
import { RentalType } from "../../data/types";

const rentalTypeOptions: { value: RentalType; label: string; desc: string }[] = [
  { value: "nha-tro", label: "Nhà trọ / Phòng trọ", desc: "Phòng bình dân, nhà trọ" },
  { value: "can-ho", label: "Căn hộ / Chung cư", desc: "Căn hộ mini, chung cư" },
  { value: "nha-rieng", label: "Nhà riêng", desc: "Nhà nguyên căn, nhà phố" },
  { value: "phong-dv", label: "Phòng dịch vụ", desc: "Bao điện nước, dịch vụ đầy đủ" },
];

const amenityOptions = [
  { value: 'ac', label: 'Điều hòa' },
  { value: 'wifi', label: 'Wifi' },
  { value: 'washing', label: 'Máy giặt' },
  { value: 'fridge', label: 'Tủ lạnh' },
  { value: 'kitchen', label: 'Bếp' },
  { value: 'parking', label: 'Chỗ đậu xe' },
  { value: 'pool', label: 'Hồ bơi' },
  { value: 'gym', label: 'Gym' },
  { value: 'elevator', label: 'Thang máy' },
  { value: 'security', label: 'Bảo vệ 24/7' },
  { value: 'balcony', label: 'Ban công' },
  { value: 'furnished', label: 'Nội thất đầy đủ' },
  { value: 'other', label: 'Khác' },
];

function CreateChoThueContent() {
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth?returnUrl=/cho-thue/create");
    }
  }, [isAuthenticated, router]);

  const step = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("step") : null;

  const [showStep2, setShowStep2] = useState(false);
  const [showStep3, setShowStep3] = useState(false);
  const [showDraftModal, setShowDraftModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [draftData, setDraftData] = useState<unknown>(null);

  // Basic info
  const [rentalType, setRentalType] = useState<RentalType>("nha-tro");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [moveInDate, setMoveInDate] = useState("");
  const [roomSize, setRoomSize] = useState("");
  const [floor, setFloor] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [minContractDuration, setMinContractDuration] = useState("");
  const [showValidation, setShowValidation] = useState(false);

  // Step 2: Images & Amenities
  const [images, setImages] = useState<string[]>([]);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [amenitiesOther, setAmenitiesOther] = useState("");
  const [showImagesValidation, setShowImagesValidation] = useState(false);

  // Step 3: Tenant preferences & Contact
  const [prefGender, setPrefGender] = useState("");
  const [prefOccupation, setPrefOccupation] = useState("");
  const [prefPets, setPrefPets] = useState("");
  const [prefSmoking, setPrefSmoking] = useState("");
  const [prefOther, setPrefOther] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [contactZalo, setContactZalo] = useState("");
  const [sameAsPhone, setSameAsPhone] = useState(false);
  const [contactFacebook, setContactFacebook] = useState("");

  useEffect(() => {
    if (sameAsPhone) setContactZalo(contactPhone);
  }, [sameAsPhone, contactPhone]);

  // Load draft
  useEffect(() => {
    const savedDraft = localStorage.getItem('cho_thue_draft');
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
    setRentalType(draft.rentalType || "nha-tro");
    setTitle(draft.title || "");
    setDescription(draft.description || "");
    setLocation(draft.location || "");
    setPrice(draft.price || "");
    setMoveInDate(draft.moveInDate || "");
    setRoomSize(draft.roomSize || "");
    setFloor(draft.floor || "");
    setBathrooms(draft.bathrooms || "");
    setMinContractDuration(draft.minContractDuration || "");
    setImages(draft.images || []);
    setAmenities(draft.amenities || []);
    setAmenitiesOther(draft.amenitiesOther || "");
    setPrefGender(draft.prefGender || "");
    setPrefOccupation(draft.prefOccupation || "");
    setPrefPets(draft.prefPets || "");
    setPrefSmoking(draft.prefSmoking || "");
    setPrefOther(draft.prefOther || "");
    setContactPhone(draft.contactPhone || "");
    setContactZalo(draft.contactZalo || "");
    setSameAsPhone(draft.sameAsPhone || false);
    setContactFacebook(draft.contactFacebook || "");
    setShowDraftModal(false);
  };

  const isStep1Complete = title.trim() !== "" && description.trim() !== "" && location.trim() !== "" && price.trim() !== "" && moveInDate.trim() !== "";

  const saveDraft = () => {
    const draft = {
      rentalType, title, description, location, price, moveInDate, roomSize, floor, bathrooms, minContractDuration,
      images, amenities, amenitiesOther,
      prefGender, prefOccupation, prefPets, prefSmoking, prefOther,
      contactPhone, contactZalo, sameAsPhone, contactFacebook,
      savedAt: new Date().toISOString(),
    };
    localStorage.setItem('cho_thue_draft', JSON.stringify(draft));
    alert('Đã lưu nháp!');
  };

  const handleSubmit = () => {
    if (!contactPhone.trim()) return;
    const listingData = {
      id: `ct-${Date.now()}`,
      rentalType, title, description, location, price, moveInDate, roomSize, floor, bathrooms, minContractDuration,
      images, amenities, amenitiesOther,
      tenantPreferences: {
        gender: prefGender ? [prefGender] : [],
        occupation: prefOccupation ? [prefOccupation] : [],
        pets: prefPets ? [prefPets] : [],
        smoking: prefSmoking ? [prefSmoking] : [],
        other: prefOther,
      },
      contact: { phone: contactPhone, zalo: contactZalo, facebook: contactFacebook },
      createdAt: new Date().toISOString(),
      userId: user?.uid,
    };

    const existing = JSON.parse(localStorage.getItem('cho_thue_listings') || '[]');
    existing.push(listingData);
    localStorage.setItem('cho_thue_listings', JSON.stringify(existing));
    localStorage.removeItem('cho_thue_draft');
    setShowSuccessModal(true);
  };

  if (!isAuthenticated) return null;

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
            <p className="text-zinc-600 mb-6">Tin cho thuê của bạn đã được đăng. Người thuê có thể tìm thấy và liên hệ bạn ngay!</p>
            <div className="flex gap-3">
              <button onClick={() => router.push('/profile')} className="btn-secondary flex-1">Về hồ sơ</button>
              <button onClick={() => router.push('/cho-thue')} className="btn-primary flex-1">Xem danh sách</button>
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
              <button onClick={() => { localStorage.removeItem('cho_thue_draft'); setShowDraftModal(false); }} className="flex-1 btn-secondary">Bỏ qua</button>
              <button onClick={() => handleRestoreDraft(draftData)} className="flex-1 btn-primary">Khôi phục</button>
            </div>
          </div>
        </div>
      )}

      <MainHeader />

      {/* Hero */}
      <section className="py-12 bg-blue-50">
        <div className="mx-auto max-w-7xl px-6">
          <h1 className="text-3xl font-bold mb-2">Đăng tin cho thuê phòng / nhà</h1>
          <p className="text-zinc-600">Điền thông tin chi tiết để người thuê dễ dàng tìm thấy phòng của bạn</p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">

              {/* Step 1: Basic Info */}
              {!showStep2 && !showStep3 && (
                <div className="card bg-white">
                  <h2 className="text-xl font-bold mb-6">Thông tin cơ bản</h2>
                  <div className="space-y-5">

                    {/* Rental Type */}
                    <div>
                      <label className="block text-sm font-bold mb-2">Loại hình cho thuê</label>
                      <div className="grid grid-cols-2 gap-3">
                        {rentalTypeOptions.map((opt) => (
                          <label
                            key={opt.value}
                            className={`flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all ${
                              rentalType === opt.value ? 'border-blue-500 bg-blue-50' : 'border-black bg-white hover:bg-zinc-50'
                            }`}
                          >
                            <input
                              type="radio"
                              name="rentalType"
                              value={opt.value}
                              checked={rentalType === opt.value}
                              onChange={(e) => setRentalType(e.target.value as RentalType)}
                              className="w-4 h-4 appearance-none rounded-full border-2 border-black checked:bg-blue-500 checked:border-blue-500"
                            />
                            <div>
                              <p className="text-sm font-bold">{opt.label}</p>
                              <p className="text-xs text-zinc-500">{opt.desc}</p>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Title */}
                    <div>
                      <label className="block text-sm font-bold mb-2">Tiêu đề</label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => { if (e.target.value.length <= 80) setTitle(e.target.value); }}
                        maxLength={80}
                        placeholder="VD: Phòng trọ Q3, full nội thất, điều hòa..."
                        className="w-full px-4 py-3 rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                      {showValidation && !title.trim() && <p className="text-sm text-pink-500 mt-1">Vui lòng nhập tiêu đề</p>}
                    </div>

                    {/* Location */}
                    <div>
                      <label className="block text-sm font-bold mb-2">Địa chỉ cụ thể</label>
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Số nhà, đường, phường, quận..."
                        className="w-full px-4 py-3 rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                      {showValidation && !location.trim() && <p className="text-sm text-pink-500 mt-1">Vui lòng nhập địa chỉ</p>}
                    </div>

                    {/* Price */}
                    <div>
                      <label className="block text-sm font-bold mb-2">Giá thuê / tháng</label>
                      <input
                        type="text"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="VD: 3 triệu, 5.5tr, 8,000,000đ..."
                        className="w-full px-4 py-3 rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                      {showValidation && !price.trim() && <p className="text-sm text-pink-500 mt-1">Vui lòng nhập giá thuê</p>}
                    </div>

                    {/* Room Details */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-sm font-bold mb-2">Diện tích (m²)</label>
                        <input type="text" value={roomSize} onChange={(e) => setRoomSize(e.target.value)} placeholder="20" className="w-full px-4 py-3 rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-400" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold mb-2">Tầng</label>
                        <input type="text" value={floor} onChange={(e) => setFloor(e.target.value)} placeholder="3" className="w-full px-4 py-3 rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-400" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold mb-2">Toilet</label>
                        <input type="text" value={bathrooms} onChange={(e) => setBathrooms(e.target.value)} placeholder="1" className="w-full px-4 py-3 rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-400" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold mb-2">Hợp đồng tối thiểu</label>
                        <select value={minContractDuration} onChange={(e) => setMinContractDuration(e.target.value)} className="w-full px-3 py-3 h-[52px] rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white">
                          <option value="">Chọn...</option>
                          <option value="1 tháng">1 tháng</option>
                          <option value="3 tháng">3 tháng</option>
                          <option value="6 tháng">6 tháng</option>
                          <option value="1 năm">1 năm</option>
                          <option value="Linh hoạt">Linh hoạt</option>
                        </select>
                      </div>
                    </div>

                    {/* Move-in date */}
                    <div>
                      <label className="block text-sm font-bold mb-2">Ngày có thể dọn vào</label>
                      <input
                        type="text"
                        value={moveInDate}
                        onChange={(e) => setMoveInDate(e.target.value)}
                        placeholder="Ngay lập tức / 01/04/2026..."
                        className="w-full px-4 py-3 rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-400"
                      />
                      {showValidation && !moveInDate.trim() && <p className="text-sm text-pink-500 mt-1">Vui lòng nhập ngày dọn vào</p>}
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-sm font-bold mb-2">Mô tả chi tiết</label>
                      <textarea
                        rows={5}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Mô tả phòng, môi trường, tiện ích xung quanh, yêu cầu đặc biệt..."
                        className="w-full px-4 py-3 rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                      />
                      {showValidation && !description.trim() && <p className="text-sm text-pink-500 mt-1">Vui lòng mô tả phòng</p>}
                    </div>
                  </div>

                  <div className="flex gap-4 mt-6">
                    <button onClick={() => router.back()} className="btn-secondary flex-1">Huỷ</button>
                    <button
                      onClick={() => {
                        if (isStep1Complete) {
                          setShowStep2(true);
                          window.scrollTo({ top: 0, behavior: 'smooth' });
                        } else {
                          setShowValidation(true);
                        }
                      }}
                      className={`flex-1 ${isStep1Complete ? 'btn-primary' : 'btn-start opacity-50'}`}
                    >
                      Tiếp tục
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Images & Amenities */}
              {showStep2 && !showStep3 && (
                <div className="card bg-white">
                  <h2 className="text-xl font-bold mb-6">Hình ảnh & Tiện nghi</h2>
                  <div className="space-y-6">
                    {/* Images */}
                    <div>
                      <label className="block text-sm font-bold mb-2">Hình ảnh phòng (Tối đa 8 ảnh)</label>
                      {images.length > 0 && (
                        <div className="grid grid-cols-3 gap-3 mb-3">
                          {images.map((img, idx) => (
                            <div key={idx} className="relative group">
                              <img src={img} alt={`Preview ${idx + 1}`} className="w-full h-32 object-cover rounded-lg border-2 border-black" />
                              <button type="button" onClick={() => setImages(images.filter((_, i) => i !== idx))} className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">×</button>
                            </div>
                          ))}
                        </div>
                      )}
                      {images.length < 8 && (
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-black rounded-lg cursor-pointer hover:bg-zinc-50">
                          <svg className="w-8 h-8 mb-2 text-zinc-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                          <p className="text-sm text-zinc-500">Click để chọn ảnh ({images.length}/8)</p>
                          <input type="file" accept="image/*" className="hidden" onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file && images.length < 8) {
                              const reader = new FileReader();
                              reader.onloadend = () => setImages([...images, reader.result as string]);
                              reader.readAsDataURL(file);
                            }
                          }} />
                        </label>
                      )}
                      {showImagesValidation && images.length === 0 && <p className="text-sm text-pink-500 mt-1 font-bold">Vui lòng tải lên ít nhất 1 hình ảnh</p>}
                    </div>

                    {/* Amenities */}
                    <div>
                      <label className="block text-sm font-bold mb-2">Tiện nghi có sẵn</label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                        {amenityOptions.map((amenity) => (
                          <div key={amenity.value} className={amenity.value === 'other' ? 'col-span-2 sm:col-span-3' : ''}>
                            <label className={`flex items-center gap-2 px-3 py-2 rounded-lg border-2 cursor-pointer transition-all ${amenities.includes(amenity.value) ? 'border-blue-500 bg-blue-50' : 'border-black bg-white hover:bg-zinc-50'}`}>
                              <input
                                type="checkbox"
                                checked={amenities.includes(amenity.value)}
                                onChange={(e) => {
                                  if (e.target.checked) setAmenities([...amenities, amenity.value]);
                                  else setAmenities(amenities.filter(a => a !== amenity.value));
                                }}
                                className="w-4 h-4 appearance-none border-2 border-black checked:bg-blue-500 checked:border-blue-500 rounded cursor-pointer"
                              />
                              <span className="text-sm">{amenity.label}</span>
                            </label>
                            {amenity.value === 'other' && amenities.includes('other') && (
                              <input type="text" value={amenitiesOther} onChange={(e) => setAmenitiesOther(e.target.value)} placeholder="Nhập tiện nghi khác..." className="w-full mt-2 px-3 py-2 rounded-lg border-2 border-black focus:outline-none text-sm" autoFocus />
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-6">
                    <button onClick={() => { setShowStep2(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex-1 btn-secondary">Quay lại</button>
                    <button
                      onClick={() => {
                        if (images.length === 0) { setShowImagesValidation(true); return; }
                        setShowStep3(true);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                      className="flex-1 btn-primary"
                    >
                      Tiếp tục
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Preferences & Contact */}
              {showStep3 && (
                <div className="card bg-white">
                  <h2 className="text-xl font-bold mb-6">Yêu cầu người thuê & Liên hệ</h2>
                  <div className="space-y-6">
                    {/* Tenant Preferences */}
                    <div>
                      <h3 className="text-base font-bold mb-4">Yêu cầu đối với người thuê (tuỳ chọn)</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { label: "Giới tính", state: prefGender, setState: setPrefGender, options: [{ v: "male", l: "Nam" }, { v: "female", l: "Nữ" }, { v: "any", l: "Không quan trọng" }] },
                          { label: "Đối tượng", state: prefOccupation, setState: setPrefOccupation, options: [{ v: "student", l: "Sinh viên" }, { v: "worker", l: "Đi làm" }, { v: "any", l: "Không quan trọng" }] },
                          { label: "Thú cưng", state: prefPets, setState: setPrefPets, options: [{ v: "no-pet", l: "Không" }, { v: "pet-ok", l: "Được nuôi" }, { v: "any", l: "Không quan trọng" }] },
                          { label: "Hút thuốc", state: prefSmoking, setState: setPrefSmoking, options: [{ v: "no-smoke", l: "Không" }, { v: "smoke-ok", l: "Được" }, { v: "any", l: "Không quan trọng" }] },
                        ].map((pref) => (
                          <div key={pref.label}>
                            <label className="block text-sm font-bold mb-2">{pref.label}</label>
                            <select
                              value={pref.state}
                              onChange={(e) => pref.setState(e.target.value)}
                              className="w-full px-3 py-3 rounded-lg border-2 border-black focus:outline-none bg-white"
                            >
                              <option value="">-- Chọn --</option>
                              {pref.options.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
                            </select>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4">
                        <label className="block text-sm font-bold mb-2">Yêu cầu khác</label>
                        <input type="text" value={prefOther} onChange={(e) => setPrefOther(e.target.value)} placeholder="VD: Không tụ tập ồn ào, trả tiền đúng hạn..." className="w-full px-4 py-3 rounded-lg border-2 border-black focus:outline-none" />
                      </div>
                    </div>

                    <div className="border-t-2 border-black pt-6">
                      <h3 className="text-base font-bold mb-4">Thông tin liên hệ</h3>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-bold mb-2">Số điện thoại <span className="text-pink-500">*</span></label>
                          <input type="tel" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} placeholder="0123456789" className="w-full px-4 py-3 rounded-lg border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-400" />
                        </div>
                        <div>
                          <label className="block text-sm font-bold mb-2">Zalo</label>
                          <input type="text" value={contactZalo} onChange={(e) => setContactZalo(e.target.value)} placeholder="Số Zalo" disabled={sameAsPhone} className={`w-full px-4 py-3 rounded-lg border-2 border-black focus:outline-none ${sameAsPhone ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''}`} />
                          <label className="flex items-center gap-2 mt-2 cursor-pointer">
                            <input type="checkbox" checked={sameAsPhone} onChange={(e) => setSameAsPhone(e.target.checked)} className="w-4 h-4 appearance-none border-2 border-black checked:bg-blue-500 checked:border-blue-500 rounded" />
                            <span className="text-sm">Dùng chung số điện thoại</span>
                          </label>
                        </div>
                        <div>
                          <label className="block text-sm font-bold mb-2">Facebook</label>
                          <input type="text" value={contactFacebook} onChange={(e) => setContactFacebook(e.target.value)} placeholder="Link hoặc tên Facebook" className="w-full px-4 py-3 rounded-lg border-2 border-black focus:outline-none" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-6">
                    <button onClick={() => { setShowStep3(false); setShowStep2(true); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="btn-secondary flex-1">Quay lại</button>
                    <button
                      onClick={handleSubmit}
                      disabled={!contactPhone.trim()}
                      className={`flex-1 ${contactPhone.trim() ? 'btn-primary' : 'btn-start opacity-50 cursor-not-allowed'}`}
                    >
                      Đăng tin
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Progress */}
              <div className="card bg-white">
                <h3 className="font-bold mb-4">Tiến trình</h3>
                <div className="space-y-3">
                  {[
                    { label: "Thông tin cơ bản", active: !showStep2 && !showStep3, done: showStep2 || showStep3 },
                    { label: "Hình ảnh & Tiện nghi", active: showStep2 && !showStep3, done: showStep3 },
                    { label: "Yêu cầu & Liên hệ", active: showStep3, done: false },
                  ].map((s, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold flex-shrink-0 ${s.done ? 'bg-green-300 border-green-500' : s.active ? 'bg-blue-300 border-black scale-110' : 'bg-zinc-100 border-zinc-300'}`}>
                        {s.done ? '✓' : i + 1}
                      </div>
                      <span className={`text-sm ${s.active ? 'font-bold' : s.done ? 'text-zinc-500 line-through' : 'text-zinc-400'}`}>{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tips */}
              <div className="card bg-yellow-50 !p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="w-5 h-5 text-yellow-600" />
                  <h3 className="font-bold">Mẹo đăng tin hiệu quả</h3>
                </div>
                <ul className="space-y-2 text-sm text-zinc-600">
                  <li>• Đăng ảnh thực tế, sáng sủa của phòng</li>
                  <li>• Ghi rõ giá điện nước để tránh hiểu nhầm</li>
                  <li>• Mô tả chi tiết tiện ích xung quanh</li>
                  <li>• Cập nhật tin khi phòng đã có người thuê</li>
                </ul>
              </div>

              {/* Save Draft */}
              <button onClick={saveDraft} className="w-full btn-secondary">
                Lưu nháp
              </button>
            </div>
          </div>
        </div>
      </section>

      <ShareFooter />
    </div>
  );
}

export default function CreateChoThuePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-blue-400" />
      </div>
    }>
      <CreateChoThueContent />
    </Suspense>
  );
}
