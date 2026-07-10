"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Search, Menu, X, ChevronDown, Heart, ShoppingBag, User, Sparkles } from "lucide-react";

const categoryGroups = [
  {
    title: "Shop by category",
    items: [
      { name: "Skincare", href: "/category/skincare", badge: "New" },
      { name: "Haircare", href: "/category/haircare" },
      { name: "Makeup", href: "/category/makeup" },
      { name: "Fragrance", href: "/category/fragrance", badge: "Hot" },
      { name: "Body care", href: "/category/body-care" },
      { name: "Travel size", href: "/category/travel" },
    ],
  },
  {
    title: "Shop by you",
    items: [
      { name: "Women", href: "/category/women" },
      { name: "Men", href: "/category/men" },
      // { name: "Gift sets", href: "/category/gift-sets", badge: "Luxe" },
    ],
  },
  {
    title: "Featured",
    items: [
      { name: "Best sellers", href: "/best-sellers" },
      { name: "New arrivals", href: "/all_products" },
      { name: "About Lumière", href: "/about" },
    ],
  },
];

const quickLinks = [
  { name: "Best Sellers", href: "/best-sellers" },
  // { name: "Gifts", href: "/category/gift-sets" },
];

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

const Nav = () => {
  const [open, setOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);
  const [mobileShopOpen, setMobileShopOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const searchRef = useRef(null);
  const shopTimeout = useRef(null);

  // Handle scroll effect for nav refinement
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Focus search input when opened
  useEffect(() => {
    if (searchOpen && searchRef.current) {
      setTimeout(() => searchRef.current?.focus(), 100);
    }
  }, [searchOpen]);

  // Click outside handler for search
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.closest("#nav-search-wrap")?.contains(e.target)) {
        setSearchOpen(false);
        setSearchQuery("");
      }
    };
    if (searchOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchOpen]);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setOpen(false);
        setMobileShopOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle shop dropdown with delay for better UX
  const handleShopEnter = () => {
    clearTimeout(shopTimeout.current);
    setShopOpen(true);
  };
  const handleShopLeave = () => {
    shopTimeout.current = setTimeout(() => setShopOpen(false), 200);
  };

  return (
    <div className="sticky top-0 z-50">
      {/* Luxury utility bar */}
      <div className="bg-[#1B1613] text-[#F4EAE3] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-2.5 flex items-center justify-center gap-2">
          <Sparkles size={12} strokeWidth={1.5} className="text-[#C4A97D] animate-pulse" />
          <p className="text-[10px] md:text-[11px] tracking-[0.25em] uppercase font-light">
            Complimentary shipping across Australia &amp; the UK
          </p>
          <Sparkles size={12} strokeWidth={1.5} className="text-[#C4A97D] animate-pulse" />
        </div>
      </div>

      {/* Main Navigation */}
      <nav
        className={`bg-[#F4EAE3] border-b transition-all duration-500 ease-out ${
          scrolled
            ? "border-[#d4c5b8] shadow-[0_4px_24px_rgba(27,22,19,0.04)]"
            : "border-[#e5d8cf]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex items-center justify-between h-[72px] md:h-[80px]">
            {/* ---- Desktop Left Links ---- */}
            <div className="hidden lg:flex items-center gap-0 flex-1">
              {/* Shop Mega Menu Trigger */}
              <div
                className="relative"
                onMouseEnter={handleShopEnter}
                onMouseLeave={handleShopLeave}
              >
                <button
                  className={`group flex items-center gap-1.5 px-4 py-7 text-[11.5px] tracking-[0.2em] uppercase font-medium transition-all duration-300 ${
                    shopOpen ? "text-[#8B6F47]" : "text-[#1B1613] hover:text-[#8B6F47]"
                  }`}
                  aria-expanded={shopOpen}
                >
                  <span className="relative">
                    Shop
                    <span
                      className={`absolute -bottom-1 left-0 h-[1.5px] bg-[#8B6F47] transition-all duration-500 ease-out ${
                        shopOpen ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </span>
                  <ChevronDown
                    size={12}
                    strokeWidth={2}
                    className={`transition-transform duration-500 ease-out ${
                      shopOpen ? "rotate-180 text-[#8B6F47]" : ""
                    }`}
                  />
                </button>

                {/* Mega Dropdown */}
                <div
                  className={`absolute top-full left-0 w-[640px] bg-[#FEFCFA] border border-[#e5d8cf] shadow-2xl shadow-[#1B1613]/5 overflow-hidden transition-all duration-500 ease-out origin-top-left ${
                    shopOpen
                      ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                      : "opacity-0 -translate-y-3 scale-[0.97] pointer-events-none"
                  }`}
                  onMouseEnter={handleShopEnter}
                  onMouseLeave={handleShopLeave}
                >
                  <div className="p-8 grid grid-cols-3 gap-8">
                    {categoryGroups.map((group, idx) => (
                      <div key={group.title} className={`${idx === 2 ? "border-l border-[#e5d8cf] pl-8" : ""}`}>
                        <p className="text-[9.5px] tracking-[0.25em] uppercase text-[#9a8d80] mb-5 font-medium">
                          {group.title}
                        </p>
                        <ul className="flex flex-col gap-3.5">
                          {group.items.map((item) => (
                            <li key={item.name}>
                              <Link
                                href={item.href}
                                className="group/link inline-flex items-center gap-2 text-[13.5px] text-[#3a332c] hover:text-[#8B6F47] transition-all duration-300 font-light tracking-wide"
                                onClick={() => setShopOpen(false)}
                              >
                                <span className="relative">
                                  {item.name}
                                  <span className="absolute -bottom-0.5 left-0 h-[1px] w-0 bg-[#8B6F47] transition-all duration-300 group-hover/link:w-full" />
                                </span>
                                {item.badge && (
                                  <span className="text-[9px] tracking-[0.15em] uppercase px-2 py-0.5 rounded-full bg-[#8B6F47]/10 text-[#8B6F47] font-medium animate-fadeIn">
                                    {item.badge}
                                  </span>
                                )}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                  {/* Dropdown Footer */}
                  <div className="border-t border-[#e5d8cf] px-8 py-4 bg-[#F4EAE3]/50 flex items-center justify-between">
                    <Link
                      href="/all_products"
                      className="text-[11px] tracking-[0.2em] uppercase text-[#1B1613] hover:text-[#8B6F47] transition-colors duration-300 font-medium"
                      onClick={() => setShopOpen(false)}
                    >
                      View All Products →
                    </Link>
                    <div className="flex items-center gap-4 text-[#9a8d80]">
                      <Link href="/love" className="hover:text-[#1B1613] transition-colors duration-200" aria-label="Wishlist">
                        <Heart size={16} strokeWidth={1.5} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="group relative px-4 py-7 text-[11.5px] tracking-[0.2em] uppercase font-medium text-[#1B1613] hover:text-[#8B6F47] transition-colors duration-300"
                >
                  <span className="relative">
                    {link.name}
                    <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-[#8B6F47] transition-all duration-500 ease-out group-hover:w-full" />
                  </span>
                  {link.highlight && (
                    <span className="absolute top-3 -right-1 w-1.5 h-1.5 rounded-full bg-[#8B6F47] animate-pulse" />
                  )}
                </Link>
              ))}
            </div>

            {/* ---- Logo Center ---- */}
            <Link
              href="/"
              className="flex items-center justify-center gap-3 group flex-shrink-0"
              aria-label="Lumière Home"
            >
              <Monogram className="transition-all duration-500 ease-out group-hover:scale-110 group-hover:text-[#8B6F47] text-[#1B1613]" />
              <span className="font-serif text-2xl md:text-[26px] tracking-[0.15em] text-[#1B1613] transition-all duration-500 ease-out group-hover:text-[#8B6F47] group-hover:tracking-[0.2em]">
                LUMIÈRE
              </span>
            </Link>

            {/* ---- Desktop Right Links ---- */}
            <div className="hidden lg:flex items-center gap-0 flex-1 justify-end">
              {/* Hideable text links during search */}
              <div
                className={`flex items-center gap-0 transition-all duration-500 ease-out ${
                  searchOpen
                    ? "opacity-0 -translate-x-4 w-0 overflow-hidden"
                    : "opacity-100 translate-x-0"
                }`}
              >
                <Link
                  href="/about"
                  className="group relative px-4 py-7 text-[11.5px] tracking-[0.2em] uppercase font-medium text-[#1B1613] hover:text-[#8B6F47] transition-colors duration-300 whitespace-nowrap"
                >
                  <span className="relative">
                    About
                    <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-[#8B6F47] transition-all duration-500 ease-out group-hover:w-full" />
                  </span>
                </Link>
              </div>

              {/* Icons Group */}
              <div className="flex items-center gap-1 ml-2">
                {/* Search */}
                <div id="nav-search-wrap" className="flex items-center">
                  <div
                    className={`flex items-center border-b transition-all duration-500 ease-out overflow-hidden ${
                      searchOpen
                        ? "w-60 opacity-100 border-[#8B6F47]"
                        : "w-0 opacity-0 border-transparent"
                    }`}
                  >
                    <Search size={16} strokeWidth={1.5} className="text-[#8B6F47] shrink-0" />
                    <input
                      ref={searchRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search..."
                      className="w-full bg-transparent border-none outline-none px-3 py-2 text-[13px] text-[#1B1613] placeholder:text-[#9a8d80] font-light tracking-wide"
                    />
                    <button
                      onClick={() => {
                        setSearchOpen(false);
                        setSearchQuery("");
                      }}
                      aria-label="Close search"
                      className="text-[#9a8d80] hover:text-[#1B1613] transition-colors duration-200 shrink-0 p-1"
                    >
                      <X size={15} strokeWidth={1.5} />
                    </button>
                  </div>
                  <button
                    onClick={() => setSearchOpen(true)}
                    aria-label="Open search"
                    className={`p-2 text-[#1B1613] hover:text-[#8B6F47] transition-all duration-500 ease-out ${
                      searchOpen ? "w-0 opacity-0 overflow-hidden p-0" : "w-auto opacity-100"
                    }`}
                  >
                    <Search size={19} strokeWidth={1.5} />
                  </button>
                </div>

                {/* Wishlist */}
                <Link
                  href="/love"
                  className="p-2 text-[#1B1613] hover:text-[#8B6F47] transition-colors duration-300 relative"
                  aria-label="Wishlist"
                >
                  <Heart size={19} strokeWidth={1.5} />
                  <span className="absolute top-1 right-0.5 w-1.5 h-1.5 rounded-full bg-[#8B6F47] opacity-0 transition-opacity duration-300" />
                </Link>
              </div>
            </div>

            {/* ---- Mobile Toggles ---- */}
            <div className="flex lg:hidden items-center gap-4">
              <button
                onClick={() => {
                  setSearchOpen(!searchOpen);
                  setOpen(false);
                }}
                aria-label={searchOpen ? "Close search" : "Open search"}
                className="text-[#1B1613] transition-all duration-300"
              >
                <span className={`inline-block transition-transform duration-300 ${searchOpen ? "rotate-90" : "rotate-0"}`}>
                  {searchOpen ? <X size={21} strokeWidth={1.5} /> : <Search size={21} strokeWidth={1.5} />}
                </span>
              </button>
              <button
                onClick={() => {
                  setOpen(!open);
                  setSearchOpen(false);
                }}
                aria-label={open ? "Close menu" : "Open menu"}
                className="text-[#1B1613] transition-all duration-300"
              >
                <span className={`inline-block transition-transform duration-300 ${open ? "rotate-90" : "rotate-0"}`}>
                  {open ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
                </span>
              </button>
            </div>
          </div>

          {/* ---- Mobile Search Bar ---- */}
          <div
            className={`lg:hidden overflow-hidden transition-all duration-500 ease-out ${
              searchOpen ? "max-h-20 opacity-100 pb-5" : "max-h-0 opacity-0"
            }`}
          >
            <div className="flex items-center border-b border-[#8B6F47]/60">
              <Search size={16} strokeWidth={1.5} className="text-[#8B6F47] shrink-0" />
              <input
                type="text"
                placeholder="Search Lumière..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-none outline-none px-3 py-2.5 text-[13px] text-[#1B1613] placeholder:text-[#9a8d80] font-light"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="text-[#9a8d80] p-1">
                  <X size={14} strokeWidth={1.5} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* ---- Mobile Menu Panel ---- */}
        <div
          className={`lg:hidden bg-[#F4EAE3] border-t border-[#e5d8cf] overflow-hidden transition-all duration-500 ease-out ${
            open ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0 border-t-0"
          }`}
        >
          <div className="px-6 py-4">
            {/* Mobile Shop Accordion */}
            <div className="border-b border-[#e5d8cf]/80">
              <button
                onClick={() => setMobileShopOpen(!mobileShopOpen)}
                className="flex items-center justify-between w-full py-5 text-[12px] tracking-[0.2em] uppercase font-medium text-[#1B1613]"
              >
                <span className="flex items-center gap-2">
                  <Sparkles size={14} strokeWidth={1.5} className="text-[#8B6F47]" />
                  Shop
                </span>
                <ChevronDown
                  size={15}
                  strokeWidth={1.5}
                  className={`transition-transform duration-500 ease-out text-[#8B6F47] ${
                    mobileShopOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-out ${
                  mobileShopOpen ? "max-h-[500px] opacity-100 pb-5" : "max-h-0 opacity-0"
                }`}
              >
                <div className="flex flex-col gap-6 pl-2">
                  {categoryGroups.map((group) => (
                    <div key={group.title}>
                      <p className="text-[9.5px] tracking-[0.2em] uppercase text-[#9a8d80] mb-3 font-medium">
                        {group.title}
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {group.items.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-center gap-2 text-[13px] text-[#3a332c] font-light tracking-wide py-1.5 hover:text-[#8B6F47] transition-colors duration-200"
                            onClick={() => setOpen(false)}
                          >
                            {item.name}
                            {item.badge && (
                              <span className="text-[8px] tracking-[0.15em] uppercase px-1.5 py-0.5 rounded-full bg-[#8B6F47]/10 text-[#8B6F47] font-medium">
                                {item.badge}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Mobile Quick Links */}
            {quickLinks.map((link) => (
              <div key={link.name} className="border-b border-[#e5d8cf]/80">
                <Link
                  href={link.href}
                  className="flex items-center gap-2 py-5 text-[12px] tracking-[0.2em] uppercase font-medium text-[#1B1613] hover:text-[#8B6F47] transition-colors duration-200"
                  onClick={() => setOpen(false)}
                >
                  {link.highlight && <span className="w-1.5 h-1.5 rounded-full bg-[#8B6F47] animate-pulse" />}
                  {link.name}
                </Link>
              </div>
            ))}

            {/* Mobile Bottom Links */}
            <div className="border-b border-[#e5d8cf]/80">
            </div>
            <div className="border-b border-[#e5d8cf]/80">
              <Link
                href="/about"
                className="block py-5 text-[12px] tracking-[0.2em] uppercase font-medium text-[#1B1613] hover:text-[#8B6F47] transition-colors duration-200"
                onClick={() => setOpen(false)}
              >
                About
              </Link>
            </div>

            {/* Mobile User Links */}
            <div className="flex items-center gap-6 pt-5 pb-2">
              <Link
                href="/love"
                className="flex items-center gap-2 text-[12px] tracking-[0.15em] uppercase text-[#1B1613] hover:text-[#8B6F47] transition-colors duration-200"
                onClick={() => setOpen(false)}
              >
                <Heart size={16} strokeWidth={1.5} />
                Wishlist
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Nav;