"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Phone, ArrowUp, ClipboardList } from "lucide-react";

export default function MobileFloatingButtons() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="md:hidden">
      {/* Back to Top */}
      <button
        onClick={scrollToTop}
        aria-label="Back to top"
        className={`fixed right-4 bottom-24 z-[70] w-11 h-11 rounded-full bg-dark-800/90 border border-dark-600/30 backdrop-blur-sm flex items-center justify-center shadow-lg shadow-black/30 transition-all duration-300 ${
          showBackToTop
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <ArrowUp size={20} className="text-white" />
      </button>

      {/* Bottom bar: Call Now + Free Estimate */}
      <div className="fixed bottom-0 left-0 right-0 z-[70] flex shadow-[0_-4px_20px_rgba(0,0,0,0.3)] safe-area-bottom">
        <a
          href="tel:6162508044"
          className="flex-1 flex items-center justify-center gap-2 bg-forest-600 hover:bg-forest-500 text-white py-3.5 font-semibold text-sm transition-colors"
        >
          <Phone size={18} />
          <span>Call Now</span>
        </a>
        <Link
          href="/contact"
          className="flex-1 flex items-center justify-center gap-2 bg-dark-800 hover:bg-dark-700 text-white py-3.5 font-semibold text-sm transition-colors border-l border-dark-600"
        >
          <ClipboardList size={18} />
          <span>Free Estimate</span>
        </Link>
      </div>
    </div>
  );
}
