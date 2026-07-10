"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Sparkles, ArrowRight, Shield, Leaf, Droplets } from "lucide-react";
import flower from "../../../public/heroFlower.svg";
const Hero = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Trust badges data
  const trustBadges = [
    { icon: Shield, text: "Dermatologist tested" },
    { icon: Leaf, text: "Clean ingredients" },
    { icon: Droplets, text: "Cruelty free" },
  ];

  return (
    <section className="relative bg-[#F4EAE3] overflow-hidden">
      {/* Subtle top grain texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(circle_at_50%_50%,_#1B1613_1px,_transparent_1px)] bg-[length:24px_24px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="relative grid grid-cols-1 lg:grid-cols-2 items-center min-h-[500px] sm:min-h-[600px] lg:min-h-[650px] py-16 lg:py-20 gap-12 lg:gap-8">
          
          {/* ========== LEFT CONTENT ========== */}
          <div className="relative flex items-center justify-center order-2 lg:order-1">
            {/* Decorative Flower - Elegant background element */}
            <div
              className={`absolute inset-0 flex items-center justify-center transition-all duration-[1500ms] ease-out ${
                mounted ? "opacity-60 scale-100 rotate-0" : "opacity-0 scale-95 rotate-3"
              }`}
            >
              <Image
                src={flower}
                alt=""
                aria-hidden="true"
                width={420}
                height={420}
                priority
                className="select-none"
              />
            </div>

            {/* Main Content Overlay */}
            <div
              className={`relative z-10 text-center px-6 sm:px-8 max-w-lg transition-all duration-1000 ease-out ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              }`}
            >
              {/* Pre-headline badge */}
              <div
                className={`inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-[#1B1613]/5 border border-[#1B1613]/10 transition-all duration-700 delay-200 ${
                  mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                }`}
              >
                <Sparkles size={12} strokeWidth={1.5} className="text-[#8B6F47]" />
                <span className="text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-[#8B6F47] font-medium">
                  Lumière Collection 2026
                </span>
              </div>

              {/* Headline */}
              <h1
                className={`font-serif text-[#1B1613] leading-[1.1] text-4xl sm:text-5xl md:text-[3.5rem] lg:text-[4rem] tracking-tight transition-all duration-1000 delay-300 ${
                  mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                Radiance
                <br />
                <span className="text-[#8B6F47]">redefined</span>
              </h1>

              {/* Subheadline */}
              <p
                className={`mt-6 text-[13px] sm:text-[14px] text-[#5c5248] max-w-sm mx-auto leading-relaxed font-light transition-all duration-1000 delay-500 ${
                  mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                Skincare, haircare, and makeup crafted for every face. 
                Australia and the UK, delivered with care.
              </p>

              {/* CTA Buttons */}
              <div
                className={`flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 transition-all duration-1000 delay-700 ${
                  mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                <Link
                  href="/all_products"
                  className="group relative inline-flex items-center gap-2 px-8 py-3.5 bg-[#1B1613] text-[#F4EAE3] text-[11px] tracking-[0.2em] uppercase font-medium overflow-hidden transition-all duration-500 hover:bg-[#8B6F47]"
                >
                  <span className="relative z-10">Shop Now</span>
                  <ArrowRight size={15} strokeWidth={1.5} className="relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                  <div className="absolute inset-0 bg-[#8B6F47] translate-y-full transition-transform duration-500 group-hover:translate-y-0" />
                </Link>

                <Link
                  href="/best-sellers"
                  className="group inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-[#1B1613] font-medium border-b border-[#1B1613]/30 pb-1 hover:text-[#8B6F47] hover:border-[#8B6F47] transition-all duration-300"
                >
                  Best sellers
                  <ArrowRight size={14} strokeWidth={1.5} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>

              {/* Trust Badges */}
              <div
                className={`flex items-center justify-center gap-6 sm:gap-8 mt-10 transition-all duration-1000 delay-900 ${
                  mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                {trustBadges.map((badge, index) => (
                  <div key={badge.text} className="flex items-center gap-2 group">
                    <badge.icon
                      size={14}
                      strokeWidth={1.5}
                      className="text-[#8B6F47]/60 transition-colors duration-300 group-hover:text-[#8B6F47]"
                    />
                    <span className="text-[10px] sm:text-[11px] text-[#9a8d80] tracking-wider whitespace-nowrap transition-colors duration-300 group-hover:text-[#5c5248]">
                      {badge.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ========== RIGHT IMAGE - PRODUCT SHOWCASE ========== */}
          <div className="relative flex justify-center items-center order-1 lg:order-2">
            {/* Ambient Glow Effects */}
            <div
              className={`absolute w-72 sm:w-96 md:w-[450px] lg:w-[500px] h-72 sm:h-96 md:h-[450px] lg:h-[500px] rounded-full bg-gradient-to-br from-[#8B6F47]/20 via-[#F4EAE3]/50 to-transparent blur-3xl transition-all duration-[1500ms] ease-out ${
                mounted ? "opacity-100 scale-100" : "opacity-0 scale-90"
              }`}
            />
            
            {/* Secondary glow for depth */}
            <div
              className={`absolute w-48 sm:w-64 md:w-80 h-48 sm:h-64 md:h-80 rounded-full bg-gradient-to-tr from-[#1B1613]/5 via-transparent to-transparent blur-2xl transition-all duration-[1500ms] delay-300 ease-out ${
                mounted ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
            />

            {/* Floating decorative elements */}
            <div
              className={`absolute top-10 right-10 lg:top-16 lg:right-16 w-12 h-12 sm:w-16 sm:h-16 border border-[#8B6F47]/20 rounded-full transition-all duration-1000 delay-500 ${
                mounted ? "opacity-100 scale-100" : "opacity-0 scale-50"
              }`}
            />
            <div
              className={`absolute bottom-12 left-8 lg:bottom-20 lg:left-12 w-8 h-8 sm:w-10 sm:h-10 border border-[#8B6F47]/15 rounded-full transition-all duration-1000 delay-700 ${
                mounted ? "opacity-100 scale-100" : "opacity-0 scale-50"
              }`}
            />

            {/* Main Product Image */}
            <div
              className={`relative transition-all duration-[1200ms] ease-out ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <img
                src="https://i.pinimg.com/1200x/7a/a9/64/7aa9644cd9eb32160e5927a6216efe51.jpg"
                alt="Lumière signature product "

                className="relative rounded-md w-64 sm:w-80 md:w-96 lg:w-[450px] h-auto drop-shadow-[0_35px_45px_rgba(27,22,19,0.15)] transition-all duration-700 ease-out hover:scale-[1.02] hover:drop-shadow-[0_40px_55px_rgba(27,22,19,0.2)]"
              />

              {/* Product label/tag */}
              <div
                className={`absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm border border-[#e5d8cf] px-6 py-3 shadow-lg transition-all duration-1000 delay-1000 ${
                  mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
                }`}
              >
                <p className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-[#1B1613] font-medium text-center whitespace-nowrap">
                  The Signature Collection
                </p>
                <p className="text-[9px] sm:text-[10px] tracking-[0.15em] uppercase text-[#8B6F47] text-center mt-0.5">
                  From $48
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade for seamless transition to next section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/50 to-transparent pointer-events-none" />
    </section>
  );
};

export default Hero;