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
  description: "A guide to doing life with ADHD and Autism or at least avoiding my mistakes",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "AuDHD.co - The Autistic & ADHD Perspective",
    description: "A guide to doing life with ADHD and Autism or at least avoiding my mistakes",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AuDHD.co - The Autistic & ADHD Perspective",
      },
    ],
    type: "website",
    siteName: "AuDHD.co",
    url: "https://audhd-co.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "AuDHD.co - The Autistic & ADHD Perspective",
    description: "A guide to doing life with ADHD and Autism or at least avoiding my mistakes",
    images: ["/og-image.png"],
    creator: "@autisticadhdco",
    site: "@autisticadhdco",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${comicNeue.variable} ${fredoka.variable}`}>
      <head>
        {/* Override any external meta tags */}
        <meta property="og:title" content="AuDHD.co - The Autistic & ADHD Perspective" />
        <meta property="og:description" content="A guide to doing life with ADHD and Autism or at least avoiding my mistakes" />
        <meta property="og:image" content="https://audhd-co.vercel.app/og-image.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="AuDHD.co - The Autistic & ADHD Perspective" />
        <meta property="og:url" content="https://audhd-co.vercel.app" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="AuDHD.co" />
        
        {/* Twitter Card overrides */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="AuDHD.co - The Autistic & ADHD Perspective" />
        <meta name="twitter:description" content="A guide to doing life with ADHD and Autism or at least avoiding my mistakes" />
        <meta name="twitter:image" content="https://audhd-co.vercel.app/og-image.png" />
        <meta name="twitter:creator" content="@autisticadhdco" />
        <meta name="twitter:site" content="@autisticadhdco" />
        
        {/* Additional meta tags to prevent external overrides */}
        <meta name="description" content="A guide to doing life with ADHD and Autism or at least avoiding my mistakes" />
        <meta name="robots" content="index, follow" />
      </head>
      <body className="bg-white" suppressHydrationWarning={true}>
        <Layout>{children}</Layout>
        {/* <StrapiConnectivityProbe /> */}
      </body>
    </html>
  );
}
