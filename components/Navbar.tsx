"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Phone, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const showBg = scrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[90] transition-all duration-500 ${
        showBg
          ? "bg-dark-950/95 backdrop-blur-md shadow-lg shadow-black/20 py-3"
          : "bg-black/60 backdrop-blur-md py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto section-padding flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group">
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
        </a>

        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium tracking-wide uppercase transition-colors text-white hover:text-forest-400"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <a
            href="#contact"
            className="flex items-center gap-2 bg-forest-600 hover:bg-forest-500 text-white px-5 py-2.5 rounded-lg text-sm font-semibold transition-all hover:shadow-lg hover:shadow-forest-600/25"
          >
            <span>Free Estimate</span>
          </a>
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
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="lg:hidden text-white p-3 -m-1 relative z-[120] min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="lg:hidden fixed inset-0 top-0 bg-[#0a0a0a]/98 z-[100] touch-manipulation overscroll-none flex flex-col items-center justify-center gap-8"
          aria-hidden={!isOpen}
        >
          <button
            onClick={() => setIsOpen(false)}
            type="button"
            className="absolute top-4 right-4 z-[110] text-white p-3 -m-1 min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation rounded-lg hover:bg-white/10 active:bg-white/20 transition-colors"
            aria-label="Close menu"
          >
            <X size={24} />
          </button>

          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-2xl font-heading font-semibold transition-colors py-3 px-6 -my-2 min-h-[48px] flex items-center touch-manipulation text-dark-100 hover:text-forest-400 active:text-forest-300"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-center gap-2 bg-forest-600 hover:bg-forest-500 text-white px-8 py-3.5 rounded-lg text-lg font-semibold transition-all mt-4"
          >
            Free Estimate
          </a>
        </div>
      )}
    </header>
  );
}
