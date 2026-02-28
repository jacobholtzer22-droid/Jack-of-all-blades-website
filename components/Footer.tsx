import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative border-t-2 border-forest-700/50">
      <div className="absolute inset-0 bg-earthy-950" />

      <div className="relative z-10 max-w-7xl mx-auto section-padding py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="/images/logo-transparent.webp"
                alt="Jack of All Blades Logo"
                width={36}
                height={36}
                className="rounded-md"
                loading="lazy"
                decoding="async"
              />
              <div className="font-heading font-bold text-lg tracking-tight">
                <span className="text-white">Jack of All</span>{" "}
                <span className="text-forest-400">Blades</span>
              </div>
            </div>
            <p className="text-dark-300 text-sm leading-relaxed max-w-md mb-6">
              Professional landscaping, hardscaping, and lawn care services
              serving East Grand Rapids, Grand Rapids, Kentwood, Ada, Cascade, and
              all of West Michigan. Man Made Excellence since day one.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://www.instagram.com/jackofallbladeslandscape"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-10 h-10 rounded-lg bg-dark-800/40 border border-dark-600/20 flex items-center justify-center hover:border-forest-600/30 transition-all"
                aria-label="Instagram"
              >
                <svg
                  className="w-4 h-4 text-dark-300 group-hover:text-forest-400 transition-colors"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@jackofallbladeslscp"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-10 h-10 rounded-lg bg-dark-800/40 border border-dark-600/20 flex items-center justify-center hover:border-forest-600/30 transition-all"
                aria-label="TikTok"
              >
                <svg
                  className="w-4 h-4 text-dark-300 group-hover:text-forest-400 transition-colors"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.75a8.18 8.18 0 004.77 1.52V6.84a4.84 4.84 0 01-1-.15z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about" },
                { label: "Portfolio", href: "/portfolio" },
                { label: "Testimonials", href: "/testimonials" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-dark-300 hover:text-forest-400 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Service Areas
            </h4>
            <ul className="space-y-3">
              {[
                { label: "East Grand Rapids", href: "/service-areas/east-grand-rapids" },
                { label: "Grand Rapids", href: "/service-areas/grand-rapids" },
                { label: "Kentwood", href: "/service-areas/kentwood" },
                { label: "Wyoming", href: "/service-areas/wyoming-mi" },
                { label: "Ada", href: "/service-areas/ada" },
                { label: "Cascade", href: "/service-areas/cascade" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-dark-300 hover:text-forest-400 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-white mb-4 text-sm uppercase tracking-wider">
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:6162508044"
                  className="flex items-center gap-2 text-dark-300 hover:text-forest-400 text-sm transition-colors"
                >
                  <Phone size={14} />
                  616-250-8044
                </a>
              </li>
              <li>
                <a
                  href="mailto:jackofallbladeslandscaping@gmail.com"
                  className="flex items-center gap-2 text-dark-300 hover:text-forest-400 text-sm transition-colors break-all"
                >
                  <Mail size={14} className="flex-shrink-0" />
                  jackofallbladeslandscaping@gmail.com
                </a>
              </li>
              <li>
                <span className="flex items-center gap-2 text-dark-300 text-sm">
                  <MapPin size={14} className="flex-shrink-0" />
                  Grand Rapids, MI 49506
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Request Estimate CTA */}
        <div className="flex justify-center mb-8">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-forest-600 hover:bg-forest-500 text-white px-8 py-3.5 rounded-xl text-base font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-forest-600/25"
          >
            Request a Free Estimate
          </Link>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-forest-800/30 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-dark-400 text-sm">
            &copy; 2026 Jack of All Blades Landscaping. All rights reserved.
          </p>
          <p className="text-dark-500 text-sm">
            Website by{" "}
            <a
              href="https://alignandacquire.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-2 py-0.5 rounded-md bg-gold-500/15 border border-gold-500/30 text-gold-400 hover:text-gold-300 hover:bg-gold-500/25 hover:border-gold-500/50 transition-all font-semibold"
            >
              Align and Acquire
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
