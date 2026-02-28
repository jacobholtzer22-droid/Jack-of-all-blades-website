import type { Metadata, Viewport } from "next";
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

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0a0a0a",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://jackofallbladeslandscaping.com"),
  title: {
    default:
      "Jack of All Blades Landscaping | Lawn Care & Landscaping Grand Rapids MI",
    template: "%s",
  },
  description:
    "Professional landscaping, hardscaping, lawn care, snow removal, and tree services in Grand Rapids, MI. Fully bonded with 8+ years experience. Free estimates available. Call 616-250-8044.",
  keywords: [
    "landscaping Grand Rapids MI",
    "lawn care Grand Rapids",
    "hardscaping Grand Rapids Michigan",
    "snow removal Grand Rapids",
    "tree trimming Grand Rapids MI",
    "seasonal cleanup Grand Rapids",
    "Jack of All Blades Landscaping",
    "landscaping company Grand Rapids",
    "lawn mowing service Grand Rapids",
    "patio installation Grand Rapids MI",
  ],
  openGraph: {
    title:
      "Jack of All Blades Landscaping | Lawn Care & Landscaping Grand Rapids MI",
    description:
      "Professional landscaping, hardscaping, lawn care, snow removal, and tree services in Grand Rapids, MI. Fully bonded with 8+ years experience. Free estimates available.",
    url: "https://jackofallbladeslandscaping.com",
    siteName: "Jack of All Blades Landscaping",
    images: [
      {
        url: "/images/IMG_5510.jpg",
        width: 1200,
        height: 630,
        alt: "Professional lawn care and landscaping in Grand Rapids Michigan",
      },
    ],
    type: "website",
    locale: "en_US",
  },
  alternates: {
    canonical: "/",
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
    <html lang="en" className={`${heading.variable} ${body.variable}`}>
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <MobileFloatingButtons />
      </body>
    </html>
  );
}
