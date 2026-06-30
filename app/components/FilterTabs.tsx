"use client";

type PropertyPreference = "all" | "nha-tro" | "can-ho" | "nha-rieng" | "phong-dv";

interface FilterTabsProps {
  activeType: PropertyPreference;
  onTypeChange: (type: PropertyPreference) => void;
}

const options: { value: PropertyPreference; label: string; desc: string }[] = [
  { value: "all",       label: "Tất cả",          desc: "Tất cả loại phòng đang tìm thuê" },
  { value: "nha-tro",   label: "Nhà trọ",          desc: "Người tìm phòng trọ, nhà trọ bình dân" },
  { value: "can-ho",    label: "Căn hộ",            desc: "Người tìm căn hộ, chung cư" },
  { value: "nha-rieng", label: "Nhà riêng",         desc: "Người tìm nhà riêng nguyên căn" },
  { value: "phong-dv",  label: "Phòng DV",          desc: "Người tìm phòng dịch vụ cao cấp" },
];

export default function FilterTabs({ activeType, onTypeChange }: FilterTabsProps) {
  return (
    <div className="space-y-3">
      <div className="inline-flex flex-wrap gap-2 p-1.5 rounded-2xl"
        style={{ background: "rgba(255,255,255,0.6)", backdropFilter: "blur(8px)",
          border: "1px solid rgba(255,255,255,0.9)", boxShadow: "0 2px 12px rgba(0,0,0,0.07)" }}>
        {options.map((opt) => {
          const active = activeType === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onTypeChange(opt.value)}
              className="rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-150 cursor-pointer"
              style={active
                ? { background: "#f43f5e", color: "#fff",
                    boxShadow: "0 2px 10px rgba(244,63,94,0.30)" }
                : { background: "transparent", color: "#57534e" }
              }
            >
              {opt.label}
            </button>
          );
        })}
      </div>

    </div>
  );
}
