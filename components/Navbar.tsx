"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Phone, Menu, X } from "lucide-react";
import { useMobileMenu } from "@/contexts/MobileMenuContext";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const { mobileMenuOpen, setMobileMenuOpen } = useMobileMenu();
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname, setMobileMenuOpen]);

  const showBg = scrolled || !isHome;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[90] transition-all duration-500 ${
        showBg
          ? "bg-dark-950/95 backdrop-blur-md shadow-lg shadow-black/20 py-3"
          : "bg-black/60 backdrop-blur-md py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto section-padding flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src="/images/logo-transparent.png"
            alt="Jack of All Blades Logo"
            width={36}
            height={36}
            className="rounded-md"
          />
          <div className="font-heading font-bold text-lg tracking-tight">
            <span className="text-white">Jack of All</span>{" "}
            <span className="text-forest-400">Blades</span>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium tracking-wide uppercase transition-colors ${
                pathname === link.href
                  ? "text-forest-400"
                  : "text-white hover:text-forest-400"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/contact"
            className="flex items-center gap-2 bg-forest-600 hover:bg-forest-500 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all hover:shadow-lg hover:shadow-forest-600/25"
          >
            <span>Free Estimate</span>
          </Link>
          <a
            href="tel:6162508044"
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all ${
              showBg
                ? "border border-dark-500 hover:border-forest-500/50 text-dark-100 hover:text-forest-400"
                : "bg-white text-black hover:bg-gray-100 border-0"
            }`}
          >
            <Phone size={16} />
            <span>Call Now</span>
          </a>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          type="button"
          className="lg:hidden text-white p-3 -m-1 relative z-[120] min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation"
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu overlay - z-[100] so it covers floating buttons (z-[70]) */}
      <div
        className={`lg:hidden fixed inset-0 top-0 bg-[#0a0a0a]/98 transition-all duration-300 z-[100] touch-manipulation ${
          mobileMenuOpen
            ? "opacity-100 pointer-events-auto visible"
            : "opacity-0 pointer-events-none invisible"
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        {/* Close button - inside overlay so it stays visible and tappable */}
        <button
          onClick={() => setMobileMenuOpen(false)}
          type="button"
          className="absolute top-4 right-4 z-[110] text-white p-3 -m-1 min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation rounded-lg hover:bg-white/10 active:bg-white/20 transition-colors"
          aria-label="Close menu"
        >
          <X size={24} />
        </button>

        <nav className="flex flex-col items-center justify-center h-full gap-8 relative z-[110]">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`text-2xl font-heading font-semibold transition-colors py-3 px-6 -my-2 min-h-[48px] flex items-center touch-manipulation ${
                pathname === link.href
                  ? "text-forest-400"
                  : "text-dark-100 hover:text-forest-400 active:text-forest-300"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-6 flex flex-col sm:flex-row items-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-forest-600 hover:bg-forest-500 text-white px-8 py-3.5 rounded-lg text-lg font-semibold transition-all"
            >
              <span>Free Estimate</span>
            </Link>
            <a
              href="tel:6162508044"
              className="w-full sm:w-auto flex items-center justify-center gap-3 border border-dark-500 hover:border-forest-500/50 text-dark-100 hover:text-forest-400 px-8 py-3.5 rounded-lg text-lg font-semibold transition-all"
            >
              <Phone size={20} />
              <span>616-250-8044</span>
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
