"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Filter,
  X,
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  Grid3X3,
  List,
  Star,
  Heart,
  ShoppingBag,
  Sparkles,
  Tag,
  Package,
  AlertCircle,
  RefreshCw,
  Check,
} from "lucide-react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

/* -------------------- CATEGORIES -------------------- */
const categories = [
  { name: "All Products", value: "all", icon: Package },
  { name: "Skincare", value: "Skincare", icon: Sparkles },
  { name: "Haircare", value: "Haircare", icon: Sparkles },
  { name: "Makeup", value: "Makeup", icon: Sparkles },
  { name: "Fragrance", value: "Fragrance", icon: Sparkles },
  { name: "Body Care", value: "Body Care", icon: Sparkles },
  { name: "Men's Grooming", value: "Men's Grooming", icon: Sparkles },
  { name: "Gift Sets", value: "Gift Sets", icon: Sparkles },
  { name: "Travel Size", value: "Travel Size", icon: Sparkles },
];

const sortOptions = [
  { label: "Newest First", value: "createdAt-desc" },
  { label: "Oldest First", value: "createdAt-asc" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Most Popular", value: "clicks-desc" },
  { label: "Best Selling", value: "conversions-desc" },
  { label: "Name: A to Z", value: "productName-asc" },
  { label: "Name: Z to A", value: "productName-desc" },
];

/* -------------------- PRODUCT CARD -------------------- */
const ProductCard = ({ product, viewMode, id }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showAddedFeedback, setShowAddedFeedback] = useState(false);

  // Check wishlist status from localStorage on mount
  useEffect(() => {
    try {
      const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
      const exists = wishlist.some(
        (item) => item._id === (product._id || product.productId)
      );
      setIsWishlisted(exists);
    } catch (e) {
      console.error("Error reading wishlist:", e);
    }
  }, [product._id, product.productId]);

  // Toggle wishlist in localStorage
  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
      const productId = product._id || product.productId;

      if (isWishlisted) {
        // Remove from wishlist
        const updated = wishlist.filter((item) => item._id !== productId);
        localStorage.setItem("wishlist", JSON.stringify(updated));
        setIsWishlisted(false);
      } else {
        // Add to wishlist
        const wishlistItem = {
          _id: productId,
          productId: product.productId,
          productName: product.productName,
          price: product.price,
          displayPrice: product.displayPrice,
          comparePrice: product.comparePrice,
          category: product.category,
          mainImage: product.mainImage,
          brand: product.brand,
          commission: product.commission,
          platforms: product.platforms,
          quantity: 1,
          addedAt: new Date().toISOString(),
        };
        localStorage.setItem("wishlist", JSON.stringify([...wishlist, wishlistItem]));
        setIsWishlisted(true);
        setShowAddedFeedback(true);
        setTimeout(() => setShowAddedFeedback(false), 1500);
      }
    } catch (e) {
      console.error("Error updating wishlist:", e);
    }
  };

  // LIST VIEW
  if (viewMode === "list") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-[#e5d8cf] p-4 flex gap-6 hover:shadow-md transition-all duration-300 group"
      >
        <Link href={`/product_detials/${id}`} className="w-32 h-32 bg-[#F4EAE3]/30 flex-shrink-0 relative overflow-hidden">
          <div className={`absolute inset-0 z-20 pointer-events-none transition-all duration-500 ${isHovered ? "border-2 border-[#8B6F47]" : "border-2 border-transparent"}`} />
          {product.mainImage?.url ? (
            <Image src={product.mainImage.url} alt={product.productName} fill className="object-cover p-4 transition-transform duration-500 group-hover:scale-105" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Package size={32} strokeWidth={1.5} className="text-[#9a8d80]" />
            </div>
          )}
        </Link>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-2">
            <div>
              <span className="text-[9px] tracking-[0.2em] uppercase text-[#8B6F47] font-medium">{product.category}</span>
              <Link href={`/product_detials/${id}`} className="block text-[14px] font-medium text-[#1B1613] mt-1 hover:text-[#8B6F47] transition-colors">
                {product.productName}
              </Link>
            </div>
            <button onClick={handleWishlistToggle} className="relative text-[#9a8d80] hover:text-red-400 transition-colors flex-shrink-0">
              <Heart size={18} strokeWidth={2} className={isWishlisted ? "fill-red-400 text-red-400" : ""} />
              {showAddedFeedback && (
                <span className="absolute -top-8 -right-2 px-2 py-1 bg-green-600 text-white text-[9px] whitespace-nowrap shadow-lg rounded">
                  <Check size={10} className="inline mr-1" />Added
                </span>
              )}
            </button>
          </div>
          <p className="text-[12px] text-[#5c5248] line-clamp-2 mb-3 font-light">{product.description}</p>
          <div className="flex items-center gap-4">
            <span className="text-[16px] font-medium text-[#1B1613]">{product.displayPrice || `${product.price?.toLocaleString("en-IN")}`}</span>
            {product.comparePrice && (
              <span className="text-[12px] text-[#9a8d80] line-through">{product.comparePrice?.toLocaleString("en-IN")}</span>
            )}
            <span className="flex items-center gap-1 text-[11px] text-green-600"><Tag size={12} />{product.commission}%</span>
          </div>
          <div className="flex flex-wrap gap-1.5 mt-3">
            {product.platforms?.slice(0, 3).map((platform) => (
              <span key={platform.name} className="inline-flex items-center gap-1 px-2 py-0.5 text-[9px] border border-[#e5d8cf] text-[#9a8d80]">
                <span className={`w-3 h-3 rounded-full ${platform.color || "bg-gray-400"}`} />{platform.name}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  // GRID VIEW
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/product_detials/${id}`} className="block">
        <div className="relative aspect-square bg-[#F4EAE3]/30 overflow-hidden mb-4">
          {/* Animated Border */}
          <div className={`absolute inset-0 z-20 pointer-events-none transition-all duration-500 ${isHovered ? "border-2 border-[#8B6F47]" : "border-2 border-transparent"}`} />
          {/* Corner Accents */}
          <div className={`absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-[#8B6F47] z-20 transition-all duration-300 ${isHovered ? "opacity-100" : "opacity-0 -translate-x-2 -translate-y-2"}`} />
          <div className={`absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-[#8B6F47] z-20 transition-all duration-300 ${isHovered ? "opacity-100" : "opacity-0 translate-x-2 -translate-y-2"}`} />
          <div className={`absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-[#8B6F47] z-20 transition-all duration-300 ${isHovered ? "opacity-100" : "opacity-0 -translate-x-2 translate-y-2"}`} />
          <div className={`absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-[#8B6F47] z-20 transition-all duration-300 ${isHovered ? "opacity-100" : "opacity-0 translate-x-2 translate-y-2"}`} />

          {product.mainImage?.url ? (
            <motion.div animate={{ scale: isHovered ? 1.05 : 1 }} transition={{ duration: 0.6 }} className="w-full h-full relative z-10">
              <Image src={product.mainImage.url} alt={product.productName} fill unoptimized loading="eager" className="object-cover p-6 lg:p-8" sizes="(max-width: 640px) 100vw, 33vw" />
            </motion.div>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Package size={40} strokeWidth={1.5} className="text-[#9a8d80]" />
            </div>
          )}

          {/* Badges */}
          {product.isBestSeller && (
            <div className="absolute top-3 left-3 z-30 px-2.5 py-1 bg-[#1B1613] text-[#F4EAE3] text-[9px] tracking-[0.15em] uppercase font-medium">Best Seller</div>
          )}
          {product.isFeatured && !product.isBestSeller && (
            <div className="absolute top-3 left-3 z-30 px-2.5 py-1 bg-[#8B6F47] text-white text-[9px] tracking-[0.15em] uppercase font-medium">Featured</div>
          )}
          {product.discountPercentage > 0 && (
            <div className="absolute top-3 right-3 z-30 px-2 py-1 bg-red-500 text-white text-[9px] font-medium">-{product.discountPercentage}%</div>
          )}

          {/* Quick View */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: isHovered ? 1 : 0 }} className="absolute inset-0 z-20 bg-[#1B1613]/5 flex items-end justify-center pb-6">
            <span className="bg-white/95 backdrop-blur-sm text-[#1B1613] px-6 py-3 text-[10px] tracking-[0.15em] uppercase font-medium shadow-lg hover:bg-[#8B6F47] hover:text-white transition-all duration-300 flex items-center gap-2 cursor-pointer">
              <ShoppingBag size={14} strokeWidth={1.5} />Quick View
            </span>
          </motion.div>

          {/* Wishlist Button */}
          <button
            onClick={handleWishlistToggle}
            className={`absolute top-3 right-3 z-30 w-8 h-8 flex items-center justify-center bg-white/90 backdrop-blur-sm shadow-sm transition-all duration-300 hover:scale-110 ${isWishlisted || isHovered ? "opacity-100" : "opacity-0"}`}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart size={14} strokeWidth={2} className={`transition-all duration-300 ${isWishlisted ? "fill-red-400 text-red-400" : "text-[#1B1613]"}`} />
          </button>

          {/* Added Feedback */}
          <AnimatePresence>
            {showAddedFeedback && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 px-4 py-2 bg-green-600 text-white text-[10px] font-medium shadow-lg rounded flex items-center gap-1.5 whitespace-nowrap">
                <Check size={12} strokeWidth={2} />Added to Wishlist
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Product Info */}
        <div className="px-1">
          <div className="flex items-center gap-1 mb-1.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={10} strokeWidth={1.5} className={i < 4 ? "fill-[#8B6F47] text-[#8B6F47]" : "fill-none text-[#e5d8cf]"} />
            ))}
            <span className="text-[10px] text-[#9a8d80] ml-1">(4.8)</span>
          </div>
          <h3 className="text-[12px] sm:text-[13px] text-[#1B1613] font-medium mb-1.5 leading-snug group-hover:text-[#8B6F47] transition-colors line-clamp-2">{product.productName}</h3>
          <p className="text-[10px] text-[#9a8d80] mb-2 uppercase tracking-wider">{product.category}</p>
          <div className="flex items-center gap-2">
            <span className="text-[14px] font-light text-[#1B1613]">{product.displayPrice || `${product.price?.toLocaleString("en-IN")}`}</span>
            {product.comparePrice && <span className="text-[11px] text-[#9a8d80] line-through">{product.comparePrice?.toLocaleString("en-IN")}</span>}
          </div>
          <div className="flex flex-wrap gap-1 mt-2">
            {product.platforms?.slice(0, 2).map((platform) => (
              <span key={platform.name} className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[8px] border border-[#e5d8cf] text-[#9a8d80]">
                <span className={`w-2 h-2 rounded-full ${platform.color || "bg-gray-400"}`} />{platform.name}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

/* -------------------- SKELETON -------------------- */
const ProductSkeleton = ({ viewMode }) => {
  if (viewMode === "list") {
    return (
      <div className="bg-white border border-[#e5d8cf] p-4 flex gap-6 animate-pulse">
        <div className="w-32 h-32 bg-[#e5d8cf]/50" />
        <div className="flex-1 space-y-3">
          <div className="h-3 bg-[#e5d8cf]/50 w-1/4" />
          <div className="h-4 bg-[#e5d8cf]/50 w-3/4" />
          <div className="h-3 bg-[#e5d8cf]/50 w-full" />
          <div className="h-5 bg-[#e5d8cf]/50 w-1/3" />
        </div>
      </div>
    );
  }
  return (
    <div className="animate-pulse">
      <div className="aspect-square bg-[#e5d8cf]/50 mb-4" />
      <div className="space-y-2 px-1">
        <div className="h-3 bg-[#e5d8cf]/50 w-1/2" />
        <div className="h-4 bg-[#e5d8cf]/50 w-3/4" />
        <div className="h-3 bg-[#e5d8cf]/50 w-1/3" />
        <div className="h-5 bg-[#e5d8cf]/50 w-1/4" />
      </div>
    </div>
  );
};

/* -------------------- MAIN COMPONENT -------------------- */
const AllProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("createdAt-desc");
  const [viewMode, setViewMode] = useState("grid");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [isClient, setIsClient] = useState(false);
  const limit = 12;

  useEffect(() => { setIsClient(true); }, []);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      
      const params = new URLSearchParams();
      params.append("page", String(page));
      params.append("limit", String(limit));
      params.append("status", "active");
      
      if (selectedCategory !== "all") params.append("category", selectedCategory);
      if (priceRange.min) params.append("minPrice", priceRange.min);
      if (priceRange.max) params.append("maxPrice", priceRange.max);
      if (searchQuery) params.append("search", searchQuery);
      if (sortBy) {
        const [field, order] = sortBy.split("-");
        params.append("sortBy", field);
        params.append("sortOrder", order);
      }

      const response = await fetch(`/api/product?${params.toString()}`);
      const data = await response.json();

      if (data.success) {
        setProducts(data.data);
        setTotalPages(data.pagination?.totalPages || 1);
        setTotalProducts(data.pagination?.total || 0);
      } else {
        setError(data.message || "Failed to fetch products");
      }
    } catch (err) {
      setError("Failed to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [page, selectedCategory, priceRange, searchQuery, sortBy]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);
  useEffect(() => { setPage(1); }, [selectedCategory, priceRange, searchQuery, sortBy]);

  const clearFilters = () => {
    setSelectedCategory("all");
    setPriceRange({ min: "", max: "" });
    setSearchQuery("");
    setSortBy("createdAt-desc");
    setPage(1);
  };

  const hasActiveFilters = selectedCategory !== "all" || priceRange.min || priceRange.max || searchQuery;

  return (
    <div className="min-h-screen bg-[#F4EAE3]/20">
      <Nav />
      
      {/* Hero Header */}
      <div className="bg-[#1B1613] text-[#F4EAE3] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles size={16} strokeWidth={1.5} className="text-[#8B6F47]" />
            <span className="text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-[#8B6F47] font-medium">The Lumière Collection</span>
            <Sparkles size={16} strokeWidth={1.5} className="text-[#8B6F47]" />
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl mb-4">All Products</h1>
          <p className="text-[13px] sm:text-sm text-[#9a8d80] max-w-md mx-auto font-light">
            Discover our complete range of luxury skincare, haircare, and beauty products
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
        {/* Mobile Filter Toggle */}
        <div className="lg:hidden mb-6">
          <button onClick={() => setMobileFilterOpen(!mobileFilterOpen)} className="w-full flex items-center justify-between px-6 py-4 bg-white border border-[#e5d8cf] text-[#1B1613]">
            <span className="flex items-center gap-2 text-[12px] tracking-wider uppercase font-medium">
              <SlidersHorizontal size={16} strokeWidth={1.5} />Filters & Categories
              {hasActiveFilters && <span className="w-2 h-2 rounded-full bg-[#8B6F47]" />}
            </span>
            {mobileFilterOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <AnimatePresence>
            {(mobileFilterOpen || (isClient && typeof window !== "undefined" && window.innerWidth >= 1024)) && (
              <motion.aside
                initial={isClient && typeof window !== "undefined" && window.innerWidth < 1024 ? { height: 0, opacity: 0 } : false}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className={`lg:w-72 flex-shrink-0 ${mobileFilterOpen ? "block" : "hidden lg:block"}`}
              >
                <div className="lg:sticky lg:top-24 space-y-6">
                  {/* Search */}
                  <div className="bg-white border border-[#e5d8cf] p-4">
                    <div className="relative">
                      <Search size={14} strokeWidth={1.5} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9a8d80]" />
                      <input type="text" placeholder="Search products..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-9 pr-4 py-2.5 border border-[#e5d8cf] text-[12px] text-[#1B1613] placeholder:text-[#9a8d80] focus:outline-none focus:border-[#8B6F47] transition-all duration-300" />
                      {searchQuery && <button onClick={() => setSearchQuery("")} className="absolute right-2 top-1/2 -translate-y-1/2 text-[#9a8d80] hover:text-[#1B1613]"><X size={14} strokeWidth={1.5} /></button>}
                    </div>
                  </div>

                  {/* Categories */}
                  <div className="bg-white border border-[#e5d8cf]">
                    <h3 className="text-[10px] tracking-[0.2em] uppercase text-[#9a8d80] font-medium px-4 py-4 border-b border-[#e5d8cf]">Categories</h3>
                    <div className="py-2">
                      {categories.map((category) => (
                        <button
                          key={category.value}
                          onClick={() => setSelectedCategory(category.value)}
                          className={`w-full flex items-center gap-3 px-4 py-3 text-[12px] transition-all duration-200 ${
                            selectedCategory === category.value
                              ? "bg-[#8B6F47]/10 text-[#8B6F47] font-medium border-l-2 border-[#8B6F47]"
                              : "text-[#1B1613] hover:bg-[#F4EAE3]/30 border-l-2 border-transparent"
                          }`}
                        >
                          <category.icon size={14} strokeWidth={1.5} />
                          {category.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div className="bg-white border border-[#e5d8cf] p-4">
                    <h3 className="text-[10px] tracking-[0.2em] uppercase text-[#9a8d80] font-medium mb-3">Price Range ()</h3>
                    <div className="flex items-center gap-2">
                      <input type="number" placeholder="Min" value={priceRange.min} onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })} className="w-full px-3 py-2 border border-[#e5d8cf] text-[11px] focus:outline-none focus:border-[#8B6F47] transition-all duration-300" />
                      <span className="text-[#9a8d80]">-</span>
                      <input type="number" placeholder="Max" value={priceRange.max} onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })} className="w-full px-3 py-2 border border-[#e5d8cf] text-[11px] focus:outline-none focus:border-[#8B6F47] transition-all duration-300" />
                    </div>
                  </div>

                  {/* Clear Filters */}
                  {hasActiveFilters && (
                    <button onClick={clearFilters} className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-[#e5d8cf] text-[11px] tracking-wider uppercase text-[#9a8d80] hover:text-[#1B1613] hover:bg-[#F4EAE3] transition-all duration-300 font-medium bg-white">
                      <X size={14} strokeWidth={1.5} />Clear All Filters
                    </button>
                  )}
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Products Grid */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <div className="bg-white border border-[#e5d8cf] p-4 mb-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <p className="text-[12px] text-[#9a8d80]">
                  <span className="font-medium text-[#1B1613]">{totalProducts}</span> products found
                  {hasActiveFilters && <span className="text-[10px] text-[#8B6F47] ml-2"><Filter size={10} className="inline mr-1" />Filtered</span>}
                </p>
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="flex-1 sm:flex-none px-3 py-2 border border-[#e5d8cf] text-[11px] text-[#1B1613] bg-white focus:outline-none focus:border-[#8B6F47] cursor-pointer">
                    {sortOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                  </select>
                  <div className="hidden sm:flex border border-[#e5d8cf]">
                    <button onClick={() => setViewMode("grid")} className={`p-2 transition-all ${viewMode === "grid" ? "bg-[#8B6F47] text-white" : "text-[#9a8d80] hover:text-[#1B1613]"}`}><Grid3X3 size={16} strokeWidth={1.5} /></button>
                    <button onClick={() => setViewMode("list")} className={`p-2 transition-all ${viewMode === "list" ? "bg-[#8B6F47] text-white" : "text-[#9a8d80] hover:text-[#1B1613]"}`}><List size={16} strokeWidth={1.5} /></button>
                  </div>
                </div>
              </div>
            </div>

            {/* Product Display */}
            {loading ? (
              <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
                {[...Array(6)].map((_, i) => <ProductSkeleton key={i} viewMode={viewMode} />)}
              </div>
            ) : error ? (
              <div className="bg-white border border-[#e5d8cf] p-12 text-center">
                <AlertCircle size={40} strokeWidth={1.5} className="text-red-400 mx-auto mb-4" />
                <h3 className="text-[16px] font-medium text-[#1B1613] mb-2">Error Loading Products</h3>
                <p className="text-[13px] text-[#9a8d80] mb-6">{error}</p>
                <button onClick={fetchProducts} className="inline-flex items-center gap-2 px-6 py-3 bg-[#8B6F47] text-white text-[11px] tracking-wider uppercase hover:bg-[#A6845F] transition-all duration-300 font-medium"><RefreshCw size={14} strokeWidth={1.5} />Try Again</button>
              </div>
            ) : products.length === 0 ? (
              <div className="bg-white border border-[#e5d8cf] p-12 text-center">
                <Package size={48} strokeWidth={1.5} className="text-[#e5d8cf] mx-auto mb-4" />
                <h3 className="text-[16px] font-medium text-[#1B1613] mb-2">No Products Found</h3>
                <p className="text-[13px] text-[#9a8d80] mb-6">{hasActiveFilters ? "No products match your current filters." : "No products available."}</p>
                {hasActiveFilters && <button onClick={clearFilters} className="inline-flex items-center gap-2 px-6 py-3 border border-[#e5d8cf] text-[11px] tracking-wider uppercase text-[#1B1613] hover:bg-[#F4EAE3] transition-all duration-300 font-medium">Clear Filters</button>}
              </div>
            ) : (
              <>
                <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
                  {products.map((product) => (
                    <ProductCard key={product._id || product.productId} product={product} viewMode={viewMode} id={product._id} />
                  ))}
                </div>
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-10">
                    <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} className="px-4 py-2 border border-[#e5d8cf] text-[11px] text-[#1B1613] hover:bg-[#F4EAE3] transition-all duration-300 disabled:opacity-50">Previous</button>
                    {[...Array(totalPages)].map((_, i) => (
                      <button key={i} onClick={() => setPage(i + 1)} className={`w-10 h-10 text-[12px] transition-all ${page === i + 1 ? "bg-[#8B6F47] text-white" : "border border-[#e5d8cf] text-[#1B1613] hover:bg-[#F4EAE3]"}`}>{i + 1}</button>
                    ))}
                    <button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages} className="px-4 py-2 border border-[#e5d8cf] text-[11px] text-[#1B1613] hover:bg-[#F4EAE3] transition-all duration-300 disabled:opacity-50">Next</button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AllProductsPage;