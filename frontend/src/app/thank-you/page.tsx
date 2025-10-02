import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Thanks for Subscribing! | AuDHD.co",
  description: "Your subscription has been confirmed. Check your email!",
  robots: {
    index: false,
    follow: false,
  },
};

export default function ThankYouPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12">
      <div className="max-w-lg w-full text-center">
        {/* Envelope Icon */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            <svg
              width="120"
              height="90"
              viewBox="0 0 120 90"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-lg"
            >
              {/* Envelope body */}
              <rect
                x="5"
                y="15"
                width="110"
                height="70"
                rx="4"
                fill="white"
                stroke="#fcc029"
                strokeWidth="3"
              />
              {/* Envelope flap */}
              <path
                d="M5 15 L60 55 L115 15"
                stroke="#fcc029"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </svg>
          </div>
        </div>

        {/* Main heading */}
        <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Check Your Email !
        </h1>

        {/* Subheading */}
        <p className="text-lg sm:text-xl text-gray-600 mb-3 ">
          Your resource is on the way
        </p>
        <p className="text-lg sm:text-xl text-gray-600 mb-10 ">
          Make sure to check your spam folder.
        </p>

        {/* Go Home Button */}
        <Link
          href="/"
          className="inline-block px-8 py-3 text-base sm:text-lg font-bold text-gray-900 bg-[#fcc029] rounded-full transition-all duration-300 hover:bg-[#fcc029]/90 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
        >
          Home
        </Link>
      </div>
    </div>
  );
}
