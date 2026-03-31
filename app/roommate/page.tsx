"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export default function RoommatePage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/cho-thue");
  }, [router]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <Loader2 className="w-8 h-8 animate-spin text-zinc-400" />
    </div>
  );
}
