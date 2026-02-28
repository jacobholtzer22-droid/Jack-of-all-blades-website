import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
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
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
