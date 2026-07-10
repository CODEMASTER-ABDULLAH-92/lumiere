// app/about/page.jsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  Leaf,
  Heart,
  Globe,
  ShieldCheck,
  ArrowRight,
  Star,
  Users,
  Award,
  Truck,
} from "lucide-react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-[#FEFCFA]">
      <Nav />

      {/* Hero Section */}
      <div className="relative bg-[#1B1613] text-[#F4EAE3] py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-15">
          <Image
            src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=1200"
            alt="Lumière Beauty"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <Sparkles size={16} strokeWidth={1.5} className="text-[#8B6F47]" />
              <span className="text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-[#8B6F47] font-medium">
                Our Story
              </span>
              <Sparkles size={16} strokeWidth={1.5} className="text-[#8B6F47]" />
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl mb-6 leading-[1.1]">
              Beauty,<br />Worn Honestly.
            </h1>
            <p className="text-[14px] sm:text-[15px] text-[#9a8d80] max-w-xl mx-auto font-light leading-relaxed">
              We believe skincare should be simple, effective, and honest. No false promises. No hidden ingredients. Just products that work.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Mission Section */}
      <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-[10px] tracking-[0.2em] uppercase text-[#8B6F47] font-medium">
                Our Mission
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#1B1613] mt-3 mb-6 leading-[1.2]">
                Redefining beauty<br />through transparency.
              </h2>
              <p className="text-[14px] text-[#5c5248] leading-relaxed mb-6 font-light">
                Lumière was born from a simple belief: everyone deserves access to clean, effective beauty products without the confusion. We cut through the noise of complicated routines and misleading marketing to bring you skincare that simply works.
              </p>
              <p className="text-[14px] text-[#5c5248] leading-relaxed mb-8 font-light">
                Every product we create is formulated with intention — combining scientifically-proven ingredients with natural botanicals. We're committed to full transparency about what goes into our products and why.
              </p>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 text-[11px] tracking-[0.2em] uppercase text-[#1B1613] border-b border-[#1B1613] pb-1.5 hover:text-[#8B6F47] hover:border-[#8B6F47] transition-all duration-300 font-medium"
              >
                Explore Our Products
                <ArrowRight size={14} strokeWidth={1.5} />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative aspect-[4/5] bg-[#F4EAE3]/50 overflow-hidden"
            >
              <img
                src="https://i.pinimg.com/736x/14/59/d1/1459d1a88800c4e5640be72df7914ec3.jpg"
                alt="Lumière Beauty Products"
                className="object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 sm:py-28 bg-[#F4EAE3]/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#8B6F47] font-medium">
              What We Stand For
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1B1613] mt-3">
              Our Values
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Leaf,
                title: "Clean Ingredients",
                description: "We use only safe, effective, and ethically-sourced ingredients. No parabens, sulfates, or synthetic fragrances.",
              },
              {
                icon: Heart,
                title: "Cruelty Free",
                description: "We never test on animals. Every product is 100% cruelty-free and certified by Leaping Bunny.",
              },
              {
                icon: Globe,
                title: "Sustainable",
                description: "Our packaging is recyclable or biodegradable. We're committed to reducing our environmental footprint.",
              },
              {
                icon: ShieldCheck,
                title: "Transparency",
                description: "Full ingredient disclosure. No hidden formulas. You deserve to know exactly what you're putting on your skin.",
              },
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white border border-[#e5d8cf] p-8 text-center hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-full bg-[#8B6F47]/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-[#8B6F47] transition-colors duration-300">
                  <value.icon size={24} strokeWidth={1.5} className="text-[#8B6F47] group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-serif text-lg text-[#1B1613] mb-3">{value.title}</h3>
                <p className="text-[12px] text-[#5c5248] leading-relaxed font-light">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Timeline */}
      <section className="py-20 sm:py-28">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#8B6F47] font-medium">
              Our Journey
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1B1613] mt-3">
              From Idea to Impact
            </h2>
          </motion.div>

          <div className="space-y-0">
            {[
              {
                year: "2022",
                title: "The Beginning",
                description: "Founded in Sydney with a vision to create clean, effective beauty products that everyone can trust. Started with just 3 skincare products.",
              },
              {
                year: "2023",
                title: "Growing Community",
                description: "Reached 50,000 customers across Australia. Expanded into haircare and body care. Launched our sustainability initiative.",
              },
              {
                year: "2024",
                title: "International Expansion",
                description: "Launched in the UK market. Introduced our fragrance collection. Partnered with major retailers across both continents.",
              },
              {
                year: "2025",
                title: "Award Recognition",
                description: "Won 'Best Clean Beauty Brand' at the Australian Beauty Awards. Reached 250,000+ happy customers worldwide.",
              },
              {
                year: "2026",
                title: "Looking Forward",
                description: "Continuing to innovate with new products, expand our reach, and stay true to our mission of honest, effective beauty.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex gap-8 pb-12 relative"
              >
                {/* Timeline line */}
                {index < 4 && (
                  <div className="absolute left-[27px] top-16 bottom-0 w-px bg-[#e5d8cf]" />
                )}
                
                {/* Year */}
                <div className="flex-shrink-0 w-14 h-14 rounded-full bg-[#1B1613] text-white flex items-center justify-center text-[12px] font-medium z-10">
                  {item.year}
                </div>

                {/* Content */}
                <div className="pt-3">
                  <h3 className="font-serif text-xl text-[#1B1613] mb-2">{item.title}</h3>
                  <p className="text-[13px] text-[#5c5248] leading-relaxed font-light">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 sm:py-20 bg-[#1B1613] text-[#F4EAE3]">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: "250K+", label: "Happy Customers" },
              { value: "45+", label: "Products" },
              { value: "2", label: "Continents" },
              { value: "98%", label: "Satisfaction Rate" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <p className="font-serif text-3xl sm:text-4xl text-[#8B6F47] mb-2">{stat.value}</p>
                <p className="text-[11px] tracking-[0.15em] uppercase text-[#9a8d80] font-light">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      {/* <section className="py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-[10px] tracking-[0.2em] uppercase text-[#8B6F47] font-medium">
              The People Behind Lumière
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1B1613] mt-3">
              Meet Our Team
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Sophie Anderson",
                role: "Founder & CEO",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
                bio: "Former cosmetic chemist with 15 years of experience. Passionate about clean, effective beauty.",
              },
              {
                name: "Dr. Emma Williams",
                role: "Head of Research",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
                bio: "Dermatologist with a PhD in Cosmetic Science. Leads our product development and testing.",
              },
              {
                name: "James Mitchell",
                role: "Creative Director",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400",
                bio: "Award-winning designer with a love for minimal aesthetics and sustainable packaging.",
              },
            ].map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden bg-[#F4EAE3]/50">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <h3 className="font-serif text-lg text-[#1B1613]">{member.name}</h3>
                <p className="text-[11px] tracking-[0.15em] uppercase text-[#8B6F47] font-medium mt-1 mb-3">
                  {member.role}
                </p>
                <p className="text-[12px] text-[#5c5248] max-w-xs mx-auto font-light">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-20 sm:py-28 bg-[#F4EAE3]/30">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Sparkles size={20} strokeWidth={1.5} className="text-[#8B6F47] mx-auto mb-4" />
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1B1613] mb-4">
              Ready to Experience Lumière?
            </h2>
            <p className="text-[14px] text-[#5c5248] mb-8 max-w-lg mx-auto font-light">
              Discover our collection of clean, effective beauty products crafted with care in Australia.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/products"
                className="px-8 py-4 bg-[#1B1613] text-white text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-[#8B6F47] transition-all duration-300 inline-flex items-center gap-2"
              >
                Shop Now
                <ArrowRight size={15} strokeWidth={1.5} />
              </Link>
              <Link
                href="/journal"
                className="px-8 py-4 border border-[#e5d8cf] text-[11px] tracking-[0.2em] uppercase text-[#1B1613] font-medium hover:bg-white transition-all duration-300"
              >
                Read Our Journal
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;