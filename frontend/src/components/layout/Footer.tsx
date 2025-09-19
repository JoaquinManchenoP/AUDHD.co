import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full py-12 mt-auto">
      <div className="max-w-[650px] mx-auto px-4 flex flex-col items-center text-center">
        <h3 className="text-lg text-gray-600 mb-6">
          Find and follow me over here
        </h3>

        <div className="flex items-center gap-6 mb-8">
          <Link
            href="https://x.com/autisticadhdco"
            className="text-gray-600 hover:text-[#fcc029] transition-colors"
          >
            Twitter
          </Link>
          <Link
            href="https://www.instagram.com/autisticadhdco/"
            className="text-gray-600 hover:text-[#fcc029] transition-colors"
          >
            Instagram
          </Link>
        </div>

        <div className="text-sm text-gray-500">
          <p>©{new Date().getFullYear()} AuDHD.co</p>
        </div>
      </div>
    </footer>
  );
}
