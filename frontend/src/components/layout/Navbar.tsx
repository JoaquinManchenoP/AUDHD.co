"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="w-full py-4 sm:py-6 bg-white border-b border-gray-100">
      <div className="max-w-[1000px] mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="text-4xl sm:text-5xl md:text-6xl font-display font-bold relative group"
          >
            <span className="relative z-10 inline-block transform group-hover:animate-[wiggle_0.5s_ease-in-out] active:scale-95 transition-all duration-300">
              AuDHD
              <span className="text-gray-600">.co</span>
            </span>
            <div className="absolute bottom-0 left-0 w-full h-4 bg-[#fcc029] rounded-sm transform translate-y-2 -rotate-1 blur-[0.5px] group-hover:scale-x-110 group-hover:rotate-2 group-hover:translate-x-2 active:scale-90 transition-all duration-300"></div>
          </Link>

          <div className="flex items-center gap-4 sm:gap-6 md:gap-8 ml-auto">
            <Link
              href="/blog"
              className={`text-lg sm:text-xl hover:text-gray-900 relative group active:scale-95 ${
                pathname === "/blog"
                  ? "text-gray-900 font-medium"
                  : "text-gray-600"
              }`}
            >
              <span className="relative z-10">Blog</span>
              {pathname === "/blog" && (
                <div className="absolute inset-0 bg-[#fcc029] rounded-sm transform translate-y-1 -skew-y-2 blur-[0.5px] active:scale-90"></div>
              )}
            </Link>
            <Link
              href="/about"
              className={`text-lg sm:text-xl hover:text-gray-900 relative group active:scale-95 ${
                pathname === "/about"
                  ? "text-gray-900 font-medium"
                  : "text-gray-600"
              }`}
            >
              <span className="relative z-10">About</span>
              {pathname === "/about" && (
                <div className="absolute inset-0 bg-[#fcc029] rounded-sm transform translate-y-1 -skew-y-2 blur-[0.5px] active:scale-90"></div>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
