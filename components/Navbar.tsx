"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import Image from "next/image";
import { Phone, Menu, X, ChevronDown } from "lucide-react";
import { SERVICES } from "@/data/services";

const simpleLinks = [
  { label: "About", href: "/about" },
  { label: "Gallery", href: "/portfolio" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const servicesBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => setMounted(true), []);

  const closeMenu = () => {
    setIsOpen(false);
    setMobileServicesOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-[90] bg-[#111] shadow-lg shadow-black/20 py-3">
      <div className="max-w-7xl mx-auto section-padding flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <Image
            src="/images/logo-transparent.webp"
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

        <nav className="hidden lg:flex items-center gap-3 xl:gap-4">
          <Link
            href="/"
            className="whitespace-nowrap text-[14px] font-medium tracking-wide uppercase transition-colors text-white hover:text-forest-400"
          >
            Home
          </Link>

          {/* Services dropdown */}
          <div
            ref={servicesRef}
            className="relative"
            onMouseEnter={() => setServicesOpen(true)}
            onMouseLeave={() => setServicesOpen(false)}
            onBlur={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                setServicesOpen(false);
              }
            }}
          >
            <button
              ref={servicesBtnRef}
              type="button"
              aria-haspopup="true"
              aria-expanded={servicesOpen}
              onClick={() => setServicesOpen((v) => !v)}
              onKeyDown={(e) => {
                if (e.key === "Escape") setServicesOpen(false);
              }}
              className="flex items-center gap-1 whitespace-nowrap text-[14px] font-medium tracking-wide uppercase transition-colors text-white hover:text-forest-400"
            >
              Services
              <ChevronDown
                size={14}
                className={`transition-transform ${servicesOpen ? "rotate-180" : ""}`}
              />
            </button>

            {servicesOpen && (
              <div
                role="menu"
                className="absolute top-full left-0 pt-3 w-64 z-[95]"
              >
                <div className="rounded-xl bg-[#1a1a1a] border border-forest-800/40 shadow-xl shadow-black/40 py-2">
                  {SERVICES.map((service) => (
                    <Link
                      key={service.slug}
                      href={`/services/${service.slug}`}
                      role="menuitem"
                      onClick={() => setServicesOpen(false)}
                      className="block px-4 py-2.5 text-sm text-dark-100 hover:text-forest-300 hover:bg-forest-900/30 transition-colors"
                    >
                      {service.shortName ?? service.name}
                    </Link>
                  ))}
                  <Link
                    href="/services"
                    role="menuitem"
                    onClick={() => setServicesOpen(false)}
                    className="block px-4 py-2.5 mt-1 border-t border-forest-800/40 text-sm font-semibold text-forest-400 hover:text-forest-300 hover:bg-forest-900/30 transition-colors"
                  >
                    All Services
                  </Link>
                </div>
              </div>
            )}
          </div>

          <Link
            href="/service-areas"
            className="whitespace-nowrap text-[14px] font-medium tracking-wide uppercase transition-colors text-white hover:text-forest-400"
          >
            Service Areas
          </Link>

          {simpleLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="whitespace-nowrap text-[14px] font-medium tracking-wide uppercase transition-colors text-white hover:text-forest-400"
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
            className="lg:hidden fixed inset-0 top-0 bg-[#111] z-[9999] pointer-events-auto touch-manipulation overscroll-contain overflow-y-auto flex flex-col items-center justify-start gap-2 py-20 px-6"
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

            <Link
              href="/"
              onClick={closeMenu}
              className="block w-full text-center text-2xl font-heading font-semibold py-4 min-h-[52px] flex items-center justify-center text-dark-100 hover:text-forest-400 active:text-forest-300"
            >
              Home
            </Link>

            {/* Services section */}
            <button
              type="button"
              onClick={() => setMobileServicesOpen((v) => !v)}
              aria-expanded={mobileServicesOpen}
              className="w-full flex items-center justify-center gap-2 text-2xl font-heading font-semibold py-4 min-h-[52px] text-dark-100 hover:text-forest-400 active:text-forest-300"
            >
              Services
              <ChevronDown
                size={20}
                className={`transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`}
              />
            </button>
            {mobileServicesOpen && (
              <div className="w-full flex flex-col items-center gap-1 pb-2">
                {SERVICES.map((service) => (
                  <Link
                    key={service.slug}
                    href={`/services/${service.slug}`}
                    onClick={closeMenu}
                    className="block w-full text-center text-base py-3 min-h-[44px] flex items-center justify-center text-dark-300 hover:text-forest-300"
                  >
                    {service.shortName ?? service.name}
                  </Link>
                ))}
                <Link
                  href="/services"
                  onClick={closeMenu}
                  className="block w-full text-center text-base py-3 min-h-[44px] flex items-center justify-center font-semibold text-forest-400 hover:text-forest-300"
                >
                  All Services
                </Link>
              </div>
            )}

            <Link
              href="/service-areas"
              onClick={closeMenu}
              className="block w-full text-center text-2xl font-heading font-semibold py-4 min-h-[52px] flex items-center justify-center text-dark-100 hover:text-forest-400 active:text-forest-300"
            >
              Service Areas
            </Link>

            {simpleLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="block w-full text-center text-2xl font-heading font-semibold py-4 min-h-[52px] flex items-center justify-center text-dark-100 hover:text-forest-400 active:text-forest-300"
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
