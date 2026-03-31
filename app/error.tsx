"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import ShareFooter from "./components/ShareFooter";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="border-b-2 border-black bg-red-300">
        <div className="wrapper py-6">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo/logo1.png"
              alt="roomieVerse"
              width={480}
              height={120}
              className="h-24 w-auto transition-transform duration-200 hover:scale-105"
              priority
            />
          </Link>
        </div>
      </header>

      {/* Error Content */}
      <main className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="max-w-2xl text-center">
          <div className="mb-8">
            <h1 className="text-9xl font-black text-black mb-4">Oops!</h1>
            <div className="inline-block rounded-xl border-2 border-black bg-red-300 px-6 py-3 text-2xl font-bold shadow-[var(--shadow-primary)]">
              Có lỗi xảy ra
            </div>
          </div>

          <p className="mb-8 text-lg text-zinc-700 font-medium">
            Đã có lỗi xảy ra khi tải trang này.
            <br />
            Đừng lo, hãy thử lại hoặc quay về trang chủ!
          </p>

          {/* Error details (only in development) */}
          {process.env.NODE_ENV === "development" && (
            <div className="mb-8 rounded-lg border-2 border-black bg-zinc-100 p-4 text-left">
              <p className="text-sm font-mono text-red-600">
                {error.message}
              </p>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => reset()}
              className="btn-primary text-base sm:text-lg px-8 py-4"
            >
              Thử lại
            </button>
            <Link
              href="/"
              className="btn-secondary text-base sm:text-lg px-8 py-4"
            >
              Về trang chủ
            </Link>
          </div>

          {/* Fun illustration */}
          <div className="mt-12 text-6xl opacity-50">
            😵💫
          </div>
        </div>
      </main>

      <ShareFooter />
    </div>
  );
}
