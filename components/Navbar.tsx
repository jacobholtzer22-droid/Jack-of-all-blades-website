"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { Phone, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/portfolio" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-[90] bg-[#111] shadow-lg shadow-black/20 py-3">
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

        <nav className="hidden lg:flex items-center gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[14px] font-medium tracking-wide uppercase transition-colors text-white hover:text-forest-400"
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
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all border border-dark-500 hover:border-forest-500/50 text-dark-100 hover:text-forest-400"
          >
            <Phone size={16} />
            <span>Call Now</span>
          </a>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="lg:hidden text-white p-3 -m-1 relative z-[10000] min-w-[44px] min-h-[44px] flex items-center justify-center touch-manipulation"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isOpen &&
        mounted &&
        createPortal(
          <div
            onClick={closeMenu}
            className="lg:hidden fixed inset-0 top-0 bg-[#111] z-[9999] pointer-events-auto touch-manipulation overscroll-none flex flex-col items-center justify-center gap-6"
            aria-hidden={!isOpen}
            style={{ zIndex: 9999 }}
          >
            <button
              onClick={closeMenu}
              type="button"
              className="absolute top-4 right-4 text-white p-4 min-w-[48px] min-h-[48px] flex items-center justify-center touch-manipulation rounded-lg hover:bg-white/10 active:bg-white/20 transition-colors"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="block w-full text-center text-2xl font-heading font-semibold transition-colors py-4 px-6 min-h-[52px] flex items-center justify-center touch-manipulation text-dark-100 hover:text-forest-400 active:text-forest-300"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={closeMenu}
              className="flex items-center justify-center gap-2 bg-forest-600 hover:bg-forest-500 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all mt-2 min-h-[52px]"
            >
              Free Estimate
            </Link>
          </div>,
          document.body
        )}
    </header>
  );
}
