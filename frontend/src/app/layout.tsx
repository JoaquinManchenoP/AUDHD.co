import type { Metadata } from "next";
import { Comic_Neue, Fredoka } from "next/font/google";
import "./globals.css";
import Layout from "@/components/layout/Layout";

const comicNeue = Comic_Neue({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-comic-neue",
});

const fredoka = Fredoka({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-fredoka",
});

export const metadata: Metadata = {
  title: "AuDHD.co",
  description: "Practical frameworks & tools for neurodivergent minds",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${comicNeue.variable} ${fredoka.variable}`}>
      <body className="bg-white" suppressHydrationWarning={true}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
