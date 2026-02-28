import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileFloatingButtons from "@/components/MobileFloatingButtons";
import "./globals.css";

const heading = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const body = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://jackofallbladeslandscaping.com"),
  title: {
    default: "Jack of All Blades Landscaping | East Grand Rapids, MI",
    template: "%s | Jack of All Blades Landscaping",
  },
  description:
    "Professional landscaping, lawn care, hardscaping & tree services in East Grand Rapids, Grand Rapids, Kentwood & West Michigan. Man Made Excellence. Call 616-250-8044 for a free estimate.",
  keywords: [
    "landscaping East Grand Rapids",
    "lawn care Grand Rapids",
    "hardscaping Kentwood",
    "snow removal Wyoming",
    "East Grand Rapids",
    "Grand Rapids",
    "Michigan",
    "tree trimming",
    "seasonal cleanup",
    "Jack of All Blades",
  ],
  other: {
    "geo.region": "US-MI",
    "geo.placename": "East Grand Rapids",
    "geo.position": "42.9634;-85.6681",
    "ICBM": "42.9634, -85.6681",
  },
  openGraph: {
    title: "Jack of All Blades Landscaping | East Grand Rapids, MI",
    description:
      "Professional landscaping, lawn care, hardscaping & tree services in East Grand Rapids, Grand Rapids & West Michigan. Man Made Excellence.",
    type: "website",
    locale: "en_US",
    siteName: "Jack of All Blades Landscaping",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/icon-192.webp", sizes: "192x192", type: "image/webp" },
      { url: "/icon-512.webp", sizes: "512x512", type: "image/webp" },
    ],
    apple: [
      { url: "/apple-icon.webp", sizes: "180x180", type: "image/webp" },
    ],
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${heading.variable} ${body.variable}`}>
      <head>
        {/* Critical above-the-fold CSS - prevents white flash before main stylesheet loads */}
        <style
          dangerouslySetInnerHTML={{
            __html: `html{scroll-behavior:smooth;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale;-webkit-tap-highlight-color:transparent}body{background-color:#0f1a0e;color:#fff;font-family:var(--font-body),sans-serif}::selection{background-color:rgba(45,90,39,.4);color:#fff}`,
          }}
        />
        {/* Preconnect & DNS prefetch for external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <link rel="dns-prefetch" href="https://www.instagram.com" />
        <link rel="dns-prefetch" href="https://www.tiktok.com" />
        <link rel="dns-prefetch" href="https://www.google.com" />
        <link rel="dns-prefetch" href="https://alignandacquire.com" />
      </head>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <MobileFloatingButtons />
      </body>
    </html>
  );
}
