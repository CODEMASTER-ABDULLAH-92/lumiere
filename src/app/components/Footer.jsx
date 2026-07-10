"use client";
import React from "react";
import Link from "next/link";
import { MapPin, Phone, ChevronRight } from "lucide-react";

const Monogram = ({ className = "" }) => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    className={className}
  >
    <path d="M9 8V32H24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    <path d="M31 8V32H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
    <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1.2" opacity="0.3" />
  </svg>
);

const footerLinks = {
  shop: [
    { name: "Skincare", href: "/category/skincare" },
    { name: "Haircare", href: "/category/haircare" },
    { name: "Makeup", href: "/category/makeup" },
    { name: "Fragrance", href: "/category/fragrance" },
    { name: "Body care", href: "/category/body-care" },
    { name: "Gift sets", href: "/category/gift-sets" },
    { name: "Travel size", href: "/category/travel" },
  ],
  explore: [
    { name: "Shop Now", href: "/all_products" },
    { name: "About Lumière", href: "/about" },
    { name: "Best sellers", href: "/best-sellers" },
    { name: "Contact us", href: "/contact" },
  ],
};

const Footer = () => {
  return (
    <footer className="bg-[#1B1613] text-[#F4EAE3] border-t border-[#8B6F47]/20">
      {/* Top decorative line */}
      <div className="h-[1px] bg-gradient-to-r from-transparent via-[#8B6F47]/40 to-transparent" />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-16 sm:pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-3 group mb-6">
              <Monogram className="transition-all duration-500 ease-out group-hover:scale-110 text-[#8B6F47]" />
              <span className="font-serif text-xl tracking-[0.15em] text-[#F4EAE3] transition-all duration-500 ease-out group-hover:text-[#8B6F47] group-hover:tracking-[0.2em]">
                LUMIÈRE
              </span>
            </Link>

            <p className="text-[13px] text-[#9a8d80] leading-relaxed mb-8 font-light max-w-xs">
              Luxury skincare, haircare, and beauty — crafted with intention for every face that wears them.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-[13px] text-[#9a8d80] hover:text-[#F4EAE3] transition-colors duration-300 cursor-default">
                <Phone size={14} strokeWidth={1.5} className="text-[#8B6F47] shrink-0" />
                <span>+92 3233381938</span>
              </div>
              <div className="flex items-center gap-3 text-[13px] text-[#9a8d80] hover:text-[#F4EAE3] transition-colors duration-300 cursor-default">
                <MapPin size={14} strokeWidth={1.5} className="text-[#8B6F47] shrink-0" />
                <span>Perth, Australia | FSD, PAK</span>
              </div>
            </div>
          </div>

          {/* Shop Links */}
          <div className="lg:col-span-4">
            <h4 className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-[#8B6F47] mb-6 font-medium">
              Shop
            </h4>
            <ul className="flex flex-col gap-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group/link inline-flex items-center gap-2 text-[13px] text-[#9a8d80] hover:text-[#F4EAE3] transition-all duration-300 font-light"
                  >
                    <span className="relative">
                      {link.name}
                      <span className="absolute -bottom-0.5 left-0 h-[1px] w-0 bg-[#8B6F47] transition-all duration-300 group-hover/link:w-full" />
                    </span>
                    <ChevronRight size={12} strokeWidth={1.5} className="opacity-0 -translate-x-2 transition-all duration-300 group-hover/link:opacity-100 group-hover/link:translate-x-0 text-[#8B6F47]" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore Links */}
          <div className="lg:col-span-4">
            <h4 className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-[#8B6F47] mb-6 font-medium">
              Explore
            </h4>
            <ul className="flex flex-col gap-3">
              {footerLinks.explore.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group/link inline-flex items-center gap-2 text-[13px] text-[#9a8d80] hover:text-[#F4EAE3] transition-all duration-300 font-light"
                  >
                    <span className="relative">
                      {link.name}
                      <span className="absolute -bottom-0.5 left-0 h-[1px] w-0 bg-[#8B6F47] transition-all duration-300 group-hover/link:w-full" />
                    </span>
                    <ChevronRight size={12} strokeWidth={1.5} className="opacity-0 -translate-x-2 transition-all duration-300 group-hover/link:opacity-100 group-hover/link:translate-x-0 text-[#8B6F47]" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#8B6F47]/20">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[10px] sm:text-[11px] tracking-[0.15em] uppercase text-[#9a8d80]/60 font-light">
              &copy; {new Date().getFullYear()} Lumière Beauty. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;







    {/* ========== Newsletter Column (3 cols) ========== */}
          // <div className="lg:col-span-3">
          //   <div className="bg-[#F4EAE3]/[0.03] border border-[#8B6F47]/20 p-6 sm:p-8 backdrop-blur-sm">
          //     <div className="flex items-center gap-2 mb-4">
          //       <Sparkles size={14} strokeWidth={1.5} className="text-[#8B6F47]" />
          //       <h4 className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-[#8B6F47] font-medium">
          //         The Lumière Letter
          //       </h4>
          //     </div>

          //     <p className="text-[13px] text-[#9a8d80] mb-6 leading-relaxed font-light">
          //       Subscribe for exclusive access to new collections, beauty rituals, and members-only offers.
          //     </p>

          //     <form onSubmit={handleSubscribe} className="space-y-4">
          //       <div className="relative group">
          //         <input
          //           type="email"
          //           value={email}
          //           onChange={(e) => setEmail(e.target.value)}
          //           placeholder="Your email address"
          //           required
          //           className="w-full bg-transparent border-b border-[#8B6F47]/30 px-0 py-3 text-[13px] text-[#F4EAE3] placeholder:text-[#9a8d80]/60 outline-none transition-all duration-300 focus:border-[#8B6F47] group-hover:border-[#8B6F47]/60 font-light"
          //         />
          //         <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-[#8B6F47] transition-all duration-500 group-focus-within:w-full" />
          //       </div>

          //       <button
          //         type="submit"
          //         className="group relative w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#8B6F47] text-[#F4EAE3] text-[11px] tracking-[0.2em] uppercase font-medium overflow-hidden transition-all duration-500 hover:bg-[#A6845F]"
          //       >
          //         <span className="relative z-10 flex items-center gap-2">
          //           {subscribed ? "Subscribed!" : "Subscribe"}
          //           {!subscribed && <ArrowRight size={14} strokeWidth={1.5} className="transition-transform duration-300 group-hover:translate-x-1" />}
          //         </span>
          //         {subscribed && (
          //           <span className="absolute inset-0 flex items-center justify-center bg-[#A6845F] animate-fadeIn">
          //             <Sparkles size={16} className="text-[#F4EAE3]" />
          //           </span>
          //         )}
          //       </button>

          //       {subscribed && (
          //         <p className="text-[11px] text-[#8B6F47] text-center animate-fadeIn font-light">
          //           Welcome to the Lumière family.
          //         </p>
          //       )}
          //     </form>

          //     {/* Trust Indicators */}
          //     <div className="mt-8 pt-6 border-t border-[#8B6F47]/20">
          //       <p className="text-[10px] tracking-[0.15em] uppercase text-[#8B6F47]/60 mb-4 text-center">
          //         Complimentary shipping across Australia &amp; the UK
          //       </p>
          //       <div className="flex items-center justify-center gap-4 text-[#9a8d80]/60">
          //         <div className="w-8 h-5 border border-current rounded opacity-40" />
          //         <div className="w-8 h-5 border border-current rounded opacity-40" />
          //         <div className="w-8 h-5 border border-current rounded opacity-40" />
          //         <div className="w-8 h-5 border border-current rounded opacity-40" />
          //       </div>
          //     </div>
          //   </div>
          // </div>







