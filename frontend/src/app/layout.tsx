import type { Metadata } from "next";
import { Comic_Neue, Fredoka } from "next/font/google";
import "./globals.css";
import Layout from "@/components/layout/Layout";
// import StrapiConnectivityProbe from "@/components/debug/StrapiConnectivityProbe";

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
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "AuDHD.co - The Autistic & ADHD Perspective",
    description: "Practical frameworks & tools for neurodivergent minds",
    images: ["/og-image.png"],
    type: "website",
    siteName: "AuDHD.co",
  },
  twitter: {
    card: "summary_large_image",
    title: "AuDHD.co - The Autistic & ADHD Perspective",
    description: "Practical frameworks & tools for neurodivergent minds",
    images: ["/og-image.png"],
  },
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
        {/* <StrapiConnectivityProbe /> */}
      </body>
    </html>
  );
}
