"use client";

import { MessageCircle } from "lucide-react";
import Link from "next/link";

export function FloatingContact() {
  return (
    <Link
      href="http://t.me/cromasupport"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
    >
      <div
        className="
          relative w-14 h-14 rounded-full flex items-center justify-center
          bg-gradient-to-br from-orange-500 via-red-500 to-yellow-400
          shadow-[0_0_20px_rgba(255,100,0,0.6)]
          transition-all duration-300 ease-out
          hover:scale-110 hover:shadow-[0_0_30px_rgba(255,120,0,0.9)]
        "
      >
        <MessageCircle className="w-7 h-7 text-white drop-shadow-lg" />
      </div>
    </Link>
  );
}
