"use client";

import Image from "next/image";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import QuoteForm from "./QuoteForm";

const contactItems = [
  {
    icon: Phone,
    label: "Phone",
    value: "616-250-8044",
    href: "tel:6162508044",
  },
  {
    icon: Mail,
    label: "Email",
    value: "jackofallbladeslandscaping@gmail.com",
    href: "mailto:jackofallbladeslandscaping@gmail.com",
  },
  {
    icon: MapPin,
    label: "Service Area",
    value: "Grand Rapids, MI",
    secondary: "& surrounding West Michigan communities",
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon – Fri: 8:00 AM – 5:00 PM",
    secondary: "Sat – Sun: Closed",
  },
];

export default function ContactContent() {
  return (
    <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 min-h-screen overflow-hidden">
      <div className="absolute inset-0 bg-earthy-900">
        <Image
          src="/images/IMG_5510.webp"
          alt=""
          fill
          className="object-cover opacity-25"
          sizes="100vw"
          quality={70}
          priority
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-earthy-950/90 via-earthy-900/85 to-dark-950/95" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-forest-900/25 via-transparent to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto section-padding">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left: heading + contact info */}
          <div className="text-white">
            <span className="text-forest-400 text-sm font-semibold uppercase tracking-[0.2em] mb-4 block">
              Contact
            </span>
            <h1
              className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl mb-5 tracking-tight"
              style={{ textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}
            >
              Get In <span className="text-forest-400">Touch</span>
            </h1>
            <p className="text-dark-100 text-base sm:text-lg leading-relaxed max-w-xl mb-10">
              Whether you need a full landscape overhaul or consistent lawn
              care, our team is ready to help. Get in touch today for a free,
              no-obligation quote.
            </p>

            <ul className="space-y-5">
              {contactItems.map((item) => {
                const Icon = item.icon;
                const content = (
                  <>
                    <div className="w-12 h-12 rounded-xl bg-forest-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-forest-900/40">
                      <Icon size={22} className="text-white" aria-hidden />
                    </div>
                    <div className="min-w-0">
                      <div className="text-white font-heading font-semibold text-sm mb-1">
                        {item.label}
                      </div>
                      <div className="text-dark-100 text-base break-words">
                        {item.value}
                      </div>
                      {item.secondary && (
                        <div className="text-dark-200 text-sm mt-0.5">
                          {item.secondary}
                        </div>
                      )}
                    </div>
                  </>
                );

                return (
                  <li key={item.label}>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="group flex items-start gap-4 hover:text-forest-300 transition-colors"
                      >
                        {content}
                      </a>
                    ) : (
                      <div className="flex items-start gap-4">{content}</div>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right: quote form */}
          <div>
            <QuoteForm />
          </div>
        </div>
      </div>
    </section>
  );
}
