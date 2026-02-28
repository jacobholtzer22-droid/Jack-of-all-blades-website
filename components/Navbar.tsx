"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Phone, Menu, X } from "lucide-react";

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
  const [mobileOpen, setMobileOpen] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const showBg = scrolled || !isHome;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        showBg
          ? "bg-dark-950/95 backdrop-blur-md shadow-lg shadow-black/20 py-3"
          : "bg-transparent py-5"
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
                  : "text-dark-200 hover:text-forest-400"
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
            className="flex items-center gap-2 border border-dark-500 hover:border-forest-500/50 text-dark-100 hover:text-forest-400 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all"
          >
            <Phone size={16} />
            <span>Call Now</span>
          </a>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden text-white p-2 relative z-[60]"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden fixed inset-0 top-0 bg-dark-950/98 backdrop-blur-xl transition-all duration-300 z-[55] ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-2xl font-heading font-semibold transition-colors ${
                pathname === link.href
                  ? "text-forest-400"
                  : "text-dark-100 hover:text-forest-400"
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
        </div>
      </div>
    </header>
  );
}
