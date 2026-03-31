"use client";

import { RentalType } from "../data/types";

interface FilterButtonsProps {
  mode: RentalType;
  onModeChange: (mode: RentalType) => void;
}

const rentalTypeOptions: { value: RentalType; label: string; desc: string }[] = [
  { value: "nha-tro",   label: "Nhà trọ",        desc: "Phòng trọ, nhà trọ bình dân" },
  { value: "can-ho",    label: "Căn hộ",          desc: "Chung cư, căn hộ mini" },
  { value: "nha-rieng", label: "Nhà riêng",       desc: "Nhà nguyên căn, nhà phố" },
  { value: "phong-dv",  label: "Phòng dịch vụ",   desc: "Bao điện nước, dọn phòng" },
];

export default function FilterButtons({ mode, onModeChange }: FilterButtonsProps) {
  return (
    <div className="space-y-3">
      <div className="inline-flex flex-wrap gap-2 p-1.5 rounded-2xl"
        style={{ background: "rgba(255,255,255,0.6)", backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.9)", boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
        {rentalTypeOptions.map((opt) => {
          const active = mode === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onModeChange(opt.value)}
              className="rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-150 cursor-pointer"
              style={active
                ? { background: "#4f46e5", color: "#fff",
                    boxShadow: "0 2px 10px rgba(79,70,229,0.30)" }
                : { background: "transparent", color: "#57534e" }
              }
            >
              {opt.label}
            </button>
          );
        })}
      </div>

      <p className="text-sm" style={{ color: "#78716c" }}>
        {rentalTypeOptions.find(o => o.value === mode)?.desc}
      </p>
    </div>
  );
}
