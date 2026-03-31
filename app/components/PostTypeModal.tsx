"use client";

import { Home, Search } from "lucide-react";
import { useRouter } from "next/navigation";

interface PostTypeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PostTypeModal({ isOpen, onClose }: PostTypeModalProps) {
  const router = useRouter();

  if (!isOpen) return null;

  const handleSelectChoThue = () => {
    setTimeout(() => {
      onClose();
      router.push("/cho-thue/create");
    }, 100);
  };

  const handleSelectTimPhong = () => {
    setTimeout(() => {
      onClose();
      router.push("/tim-phong/create");
    }, 100);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className="relative z-10 w-full max-w-2xl mx-4 bg-white rounded-xl border-2 border-black shadow-[var(--shadow-primary)] p-8"
        style={{
          animation: 'modalBounce 0.25s ease-out',
        }}
      >
        <style jsx>{`
          @keyframes modalBounce {
            0% {
              transform: scale(0.95);
              opacity: 0.8;
            }
            50% {
              transform: scale(1.02);
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
        `}</style>
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full hover:bg-zinc-100 transition-colors"
        >
          <span className="text-xl font-bold">×</span>
        </button>

        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold">Bạn muốn đăng bài gì?</h2>
        </div>

        {/* Options */}
        <div className="grid gap-4 md:grid-cols-2">
          {/* Option 1: Cho thuê phòng */}
          <button
            onClick={handleSelectChoThue}
            className="group p-6 rounded-xl border-2 border-black bg-blue-100 transition-all btn-modal-flat"
          >
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 rounded-full bg-blue-300 border-2 border-black flex items-center justify-center">
                <Home className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">Cho thuê phòng / nhà</h3>
                <p className="text-sm text-zinc-600">
                  Bạn là chủ nhà, muốn đăng tin cho thuê phòng trọ, căn hộ, nhà riêng...
                </p>
              </div>
            </div>
          </button>

          {/* Option 2: Tìm phòng thuê */}
          <button
            onClick={handleSelectTimPhong}
            className="group p-6 rounded-xl border-2 border-black bg-pink-100 transition-all btn-modal-flat"
          >
            <div className="flex flex-col items-center text-center gap-4">
              <div className="w-16 h-16 rounded-full bg-pink-300 border-2 border-black flex items-center justify-center">
                <Search className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">Tìm phòng thuê</h3>
                <p className="text-sm text-zinc-600">
                  Bạn đang tìm phòng để thuê và muốn đăng yêu cầu để chủ nhà liên hệ lại
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
