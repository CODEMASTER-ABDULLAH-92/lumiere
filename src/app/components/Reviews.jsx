// app/components/Testimonials.jsx
"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Star,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Quote,
  Heart,
} from "lucide-react";

/* -------------------- TESTIMONIAL DATA -------------------- */
const testimonials = [
  {
    id: 1,
    name: "Sophie Anderson",
    location: "Sydney, Australia",
    avatar: null,
    rating: 5,
    text: "I've been using Lumière products for over a year now and my skin has completely transformed. The Radiance Serum is my absolute favorite — my dark spots have faded and I get compliments on my glow all the time!",
    product: "Radiance Renewal Serum",
    initials: "SA",
  },
  {
    id: 2,
    name: "Emma Williams",
    location: "London, UK",
    avatar: null,
    rating: 5,
    text: "Finally found skincare that actually works! The Hydra-Glow Moisturizer is lightweight but so hydrating. As someone with sensitive skin, I appreciate that all ingredients are clean and transparent.",
    product: "Hydra-Glow Moisturizer",
    initials: "EW",
  },
  {
    id: 3,
    name: "James Mitchell",
    location: "Melbourne, Australia",
    avatar: null,
    rating: 5,
    text: "My girlfriend got me the Beard Grooming Kit and I'm hooked. The oil smells amazing and my beard has never been softer. Finally a men's grooming brand that understands quality.",
    product: "Beard Grooming Kit",
    initials: "JM",
  },
  {
    id: 4,
    name: "Olivia Brown",
    location: "Brisbane, Australia",
    avatar: null,
    rating: 5,
    text: "The Ultimate Gift Box was the perfect present for my mom's birthday. She loved every product and now she's a Lumière convert too! The packaging is absolutely luxurious.",
    product: "Ultimate Beauty Gift Box",
    initials: "OB",
  },
  {
    id: 5,
    name: "Isabella Garcia",
    location: "Manchester, UK",
    avatar: null,
    rating: 5,
    text: "I've tried so many vitamin C serums but nothing compares to this one. It absorbs quickly, doesn't pill under makeup, and actually brightens my skin. Worth every penny!",
    product: "Vitamin C Brightening Oil",
    initials: "IG",
  },
  {
    id: 6,
    name: "Charlotte Taylor",
    location: "Perth, Australia",
    avatar: null,
    rating: 5,
    text: "The Rose & Oud perfume is my signature scent now. I get stopped everywhere I go asking what I'm wearing. It lasts all day and the bottle looks stunning on my vanity.",
    product: "Rose & Oud Eau de Parfum",
    initials: "CT",
  },
  {
    id: 7,
    name: "Amelia Wilson",
    location: "Edinburgh, UK",
    avatar: null,
    rating: 5,
    text: "The Silk Repair Hair Mask saved my damaged hair! After just two uses, my hair felt like I'd just left the salon. The keratin formula really works miracles on bleached hair.",
    product: "Silk Repair Hair Mask",
    initials: "AW",
  },
  {
    id: 8,
    name: "Harry Thompson",
    location: "Adelaide, Australia",
    avatar: null,
    rating: 5,
    text: "Bought the Men's Active Face Moisturizer on a whim and now I can't live without it. The SPF protection is a bonus and it doesn't leave any white cast. Perfect for daily use.",
    product: "Men's Active Face Moisturizer",
    initials: "HT",
  },
];

/* -------------------- STAR RATING -------------------- */
const StarRating = ({ rating, size = 12 }) => (
  <div className="flex items-center gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        size={size}
        strokeWidth={1.5}
        className={`${
          star <= rating
            ? "fill-[#8B6F47] text-[#8B6F47]"
            : "fill-none text-[#e5d8cf]"
        }`}
      />
    ))}
  </div>
);

/* -------------------- MAIN COMPONENT -------------------- */
const Testimonials = ({ variant = "grid" }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedId, setExpandedId] = useState(null);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Grid Layout
  if (variant === "grid") {
    return (
      <section className="py-16 sm:py-24 bg-[#FEFCFA]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-[#8B6F47]/5 border border-[#8B6F47]/20">
              <Heart size={12} strokeWidth={1.5} className="text-[#8B6F47]" />
              <span className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-[#8B6F47] font-medium">
                Testimonials
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1B1613] mb-4">
              What Our Customers Say
            </h2>
            <p className="text-[13px] sm:text-sm text-[#9a8d80] max-w-lg mx-auto font-light">
              Real reviews from real people who love Lumière Beauty.
            </p>
          </motion.div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.slice(0, 8).map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white border border-[#e5d8cf] p-6 hover:shadow-lg transition-all duration-300 group"
              >
                {/* Quote Icon */}
                <Quote size={24} strokeWidth={1.5} className="text-[#8B6F47]/30 mb-4" />

                {/* Rating */}
                <StarRating rating={testimonial.rating} />
                
                {/* Text */}
                <p className="text-[12px] text-[#5c5248] leading-relaxed mt-3 mb-5 font-light line-clamp-4">
                  "{testimonial.text}"
                </p>

                {/* User Info */}
                <div className="flex items-center gap-3 mt-auto pt-4 border-t border-[#e5d8cf]/50">
                  <div className="w-9 h-9 rounded-full bg-[#8B6F47] flex items-center justify-center text-[10px] font-medium text-white flex-shrink-0">
                    {testimonial.initials}
                  </div>
                  <div className="min-w-0">
                    <p className="text-[12px] font-medium text-[#1B1613] truncate">{testimonial.name}</p>
                    <p className="text-[10px] text-[#9a8d80]">{testimonial.location}</p>
                  </div>
                </div>

                {/* Product Tag */}
                <div className="mt-3">
                  <span className="inline-block px-2 py-0.5 bg-[#F4EAE3]/50 text-[9px] text-[#8B6F47] tracking-wider uppercase">
                    {testimonial.product}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Carousel Layout
  if (variant === "carousel") {
    const current = testimonials[activeIndex];

    return (
      <section className="py-16 sm:py-24 bg-[#1B1613] text-[#F4EAE3]">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full bg-[#8B6F47]/20 border border-[#8B6F47]/30">
              <Sparkles size={12} strokeWidth={1.5} className="text-[#8B6F47]" />
              <span className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-[#8B6F47] font-medium">
                Customer Love
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#F4EAE3] mb-4">
              What People Are Saying
            </h2>
          </motion.div>

          {/* Carousel */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="px-4"
              >
                <Quote size={40} strokeWidth={1.5} className="text-[#8B6F47]/40 mx-auto mb-6" />
                
                <StarRating rating={current.rating} size={18} />
                
                <p className="text-[15px] sm:text-[17px] text-[#F4EAE3] leading-relaxed mt-6 mb-8 font-light italic max-w-2xl mx-auto">
                  "{current.text}"
                </p>

                <div className="flex items-center justify-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-[#8B6F47] flex items-center justify-center text-sm font-medium text-white">
                    {current.initials}
                  </div>
                  <div className="text-left">
                    <p className="text-[14px] font-medium text-[#F4EAE3]">{current.name}</p>
                    <p className="text-[11px] text-[#9a8d80]">{current.location}</p>
                  </div>
                </div>

                <p className="text-[11px] text-[#8B6F47] mt-4 tracking-wider uppercase">{current.product}</p>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 border border-[#8B6F47]/30 text-[#8B6F47] hover:bg-[#8B6F47] hover:text-white transition-all duration-300 flex items-center justify-center"
            >
              <ChevronLeft size={20} strokeWidth={1.5} />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 border border-[#8B6F47]/30 text-[#8B6F47] hover:bg-[#8B6F47] hover:text-white transition-all duration-300 flex items-center justify-center"
            >
              <ChevronRight size={20} strokeWidth={1.5} />
            </button>
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "bg-[#8B6F47] w-6"
                    : "bg-[#8B6F47]/30 hover:bg-[#8B6F47]/50"
                }`}
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  // Simple Featured Testimonial
  if (variant === "featured") {
    return (
      <section className="py-16 sm:py-20 bg-[#F4EAE3]/30">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Quote size={32} strokeWidth={1.5} className="text-[#8B6F47]/30 mx-auto mb-6" />
            
            <p className="text-[16px] sm:text-[18px] text-[#1B1613] leading-relaxed mb-8 font-light italic">
              "{testimonials[0].text}"
            </p>

            <StarRating rating={5} size={14} />

            <div className="mt-4">
              <p className="text-[14px] font-medium text-[#1B1613]">{testimonials[0].name}</p>
              <p className="text-[11px] text-[#9a8d80]">{testimonials[0].location}</p>
            </div>

            <div className="flex items-center justify-center gap-6 mt-8 text-[10px] tracking-[0.15em] uppercase text-[#9a8d80]">
              <span>⭐ 4.8 average rating</span>
              <span>•</span>
              <span>250K+ happy customers</span>
              <span>•</span>
              <span>98% satisfaction</span>
            </div>
          </motion.div>
        </div>
      </section>
    );
  }
};

export default Testimonials;