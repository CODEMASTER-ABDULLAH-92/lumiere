"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search,
  X,
  Heart,
  Sparkles,
  Package,
  AlertCircle,
  RefreshCw,
  ArrowLeft,
  ShoppingBag,
  Star,
  TrendingUp,
  Crown,
  Award,
  Flame,
} from "lucide-react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

const sortOptions = [
  { label: "Most Popular", value: "clicks-desc" },
  { label: "Best Selling", value: "conversions-desc" },
  { label: "Highest Revenue", value: "revenue-desc" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Newest First", value: "createdAt-desc" },
  { label: "Name: A to Z", value: "productName-asc" },
];

/* -------------------- PRODUCT CARD -------------------- */
const ProductCard = ({ product, rank }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const rankBadge = {
    1: { icon: Crown, color: "bg-yellow-500", label: "#1 Best Seller" },
    2: { icon: Award, color: "bg-gray-400", label: "#2 Best Seller" },
    3: { icon: Flame, color: "bg-orange-500", label: "#3 Best Seller" },
  };

  const RankBadge = rankBadge[rank];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/product/${product.productId || product._id}`} className="block">
        <div className="relative aspect-square bg-[#F4EAE3]/30 overflow-hidden mb-4">
          {product.mainImage?.url ? (
            <motion.div
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 0.6 }}
              className="w-full h-full relative"
            >
              <Image
                src={product.mainImage.url}
                alt={product.productName}
                fill
                className="object-cover p-6 lg:p-10"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </motion.div>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Package size={40} strokeWidth={1.5} className="text-[#9a8d80]" />
            </div>
          )}

          {/* Rank Badge */}
          {rank <= 3 && RankBadge && (
            <div className={`absolute top-3 left-3 z-10 flex items-center gap-1.5 px-3 py-1.5 ${RankBadge.color} text-white text-[9px] font-medium shadow-lg`}>
              <RankBadge.icon size={12} strokeWidth={1.5} />
              {RankBadge.label}
            </div>
          )}
          {rank > 3 && (
            <div className="absolute top-3 left-3 z-10 px-3 py-1.5 bg-[#1B1613] text-[#F4EAE3] text-[9px] tracking-[0.15em] uppercase font-medium">
              #{rank} Trending
            </div>
          )}

          {/* Discount Badge */}
          {product.discountPercentage > 0 && (
            <div className="absolute top-3 right-3 z-10 px-2 py-1 bg-red-500 text-white text-[9px] font-medium">
              -{product.discountPercentage}%
            </div>
          )}

          {/* Commission Badge */}
          <div className="absolute bottom-3 left-3 z-10 px-2.5 py-1 bg-[#8B6F47] text-white text-[9px] font-medium">
            {product.commission}% Commission
          </div>

          {/* Quick View Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 bg-[#1B1613]/5 flex items-end justify-center pb-6"
          >
            <span className="bg-white/95 backdrop-blur-sm text-[#1B1613] px-6 py-3 text-[10px] tracking-[0.15em] uppercase font-medium shadow-lg flex items-center gap-2 cursor-pointer">
              <ShoppingBag size={14} strokeWidth={1.5} />
              Quick View
            </span>
          </motion.div>

          {/* Wishlist */}
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsWishlisted(!isWishlisted);
            }}
            className={`absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center bg-white/90 backdrop-blur-sm shadow-sm transition-all duration-300 ${
              isWishlisted || isHovered ? "opacity-100" : "opacity-0"
            }`}
          >
            <Heart
              size={14}
              strokeWidth={1.5}
              className={isWishlisted ? "fill-red-400 text-red-400" : "text-[#1B1613]"}
            />
          </button>
        </div>

        {/* Product Info */}
        <div className="px-1">
          <div className="flex items-center gap-1 mb-1.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={10}
                strokeWidth={1.5}
                className={i < 4 ? "fill-[#8B6F47] text-[#8B6F47]" : "fill-none text-[#e5d8cf]"}
              />
            ))}
            <span className="text-[10px] text-[#9a8d80] ml-1">(4.8)</span>
          </div>

          <h3 className="text-[12px] sm:text-[13px] text-[#1B1613] font-medium mb-1.5 leading-snug group-hover:text-[#8B6F47] transition-colors line-clamp-2">
            {product.productName}
          </h3>

          <p className="text-[10px] text-[#9a8d80] mb-2 uppercase tracking-wider">{product.brand}</p>

          <div className="flex items-center gap-2">
            <span className="text-[14px] font-light text-[#1B1613]">
              {product.displayPrice || `${product.price?.toLocaleString("en-IN")}`}
            </span>
            {product.comparePrice && (
              <span className="text-[11px] text-[#9a8d80] line-through">
                {product.comparePrice?.toLocaleString("en-IN")}
              </span>
            )}
          </div>

          {/* Stats */}
          <div className="flex items-center gap-3 mt-2 text-[9px] text-[#9a8d80]">
            <span className="flex items-center gap-1">
              <ShoppingBag size={10} />
              {product.conversions?.toLocaleString() || 0} sold
            </span>
            <span className="flex items-center gap-1">
              <TrendingUp size={10} />
              {product.clicks?.toLocaleString() || 0} views
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

/* -------------------- SKELETON -------------------- */
const ProductSkeleton = () => (
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

/* -------------------- MAIN COMPONENT -------------------- */
const BestSellersPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("clicks-desc");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const limit = 12;

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const queryParams = new URLSearchParams();
      queryParams.append("category", "Best Sellers");
      queryParams.append("page", page);
      queryParams.append("limit", limit);
      queryParams.append("status", "active");

      if (searchQuery) queryParams.append("search", searchQuery);
      if (sortBy) {
        const [field, order] = sortBy.split("-");
        queryParams.append("sortBy", field);
        queryParams.append("sortOrder", order);
      }

      console.log("📡 Fetching Best Sellers:", `/api/product?${queryParams.toString()}`);

      const response = await fetch(`/api/product?${queryParams.toString()}`);
      const data = await response.json();

      console.log("📥 Response:", data);

      if (data.success) {
        setProducts(data.data);
        setTotalPages(data.pagination?.totalPages || 1);
        setTotalProducts(data.pagination?.total || 0);
      } else {
        setError(data.message || "Failed to fetch products");
      }
    } catch (err) {
      console.error("Error fetching best sellers:", err);
      setError("Failed to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [page, searchQuery, sortBy]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    setPage(1);
  }, [searchQuery, sortBy]);

  return (
    <div className="min-h-screen bg-[#FEFCFA]">
      <Nav />

      {/* Hero Section */}
      <div className="relative bg-[#1B1613] text-[#F4EAE3] py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=1200"
            alt="Best Sellers"
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
            <div className="flex items-center justify-center gap-2 mb-4">
              <Crown size={18} strokeWidth={1.5} className="text-[#8B6F47]" />
              <span className="text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-[#8B6F47] font-medium">
                Most Loved Products
              </span>
              <Crown size={18} strokeWidth={1.5} className="text-[#8B6F47]" />
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl mb-4">
              Best Sellers
            </h1>
            <p className="text-[13px] sm:text-sm text-[#9a8d80] max-w-lg mx-auto font-light">
              Our most-loved products, chosen by thousands of customers. These are the essentials everyone's talking about.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="border-b border-[#e5d8cf] bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-3 gap-4 py-4">
            <div className="text-center">
              <p className="text-[10px] tracking-[0.15em] uppercase text-[#9a8d80]">Products</p>
              <p className="text-[16px] font-medium text-[#1B1613] mt-1">{totalProducts}</p>
            </div>
            <div className="text-center border-x border-[#e5d8cf]">
              <p className="text-[10px] tracking-[0.15em] uppercase text-[#9a8d80]">Avg. Rating</p>
              <p className="text-[16px] font-medium text-[#1B1613] mt-1 flex items-center justify-center gap-1">
                <Star size={14} className="fill-[#8B6F47] text-[#8B6F47]" />
                4.8
              </p>
            </div>
            <div className="text-center">
              <p className="text-[10px] tracking-[0.15em] uppercase text-[#9a8d80]">Total Sold</p>
              <p className="text-[16px] font-medium text-[#1B1613] mt-1">
                {products.reduce((sum, p) => sum + (p.conversions || 0), 0).toLocaleString()}+
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
        {/* Breadcrumb */}
        <nav className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase mb-8 text-[#9a8d80]">
          <Link href="/" className="hover:text-[#8B6F47] transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-[#1B1613] font-medium">Best Sellers</span>
        </nav>

        {/* Toolbar */}
        <div className="bg-white border border-[#e5d8cf] p-4 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-[12px] text-[#9a8d80]">
              Showing <span className="font-medium text-[#1B1613]">{totalProducts}</span> best selling products
            </p>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-none">
                <Search size={14} strokeWidth={1.5} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9a8d80]" />
                <input
                  type="text"
                  placeholder="Search best sellers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-56 pl-9 pr-8 py-2 border border-[#e5d8cf] text-[12px] text-[#1B1613] placeholder:text-[#9a8d80] focus:outline-none focus:border-[#8B6F47] transition-all duration-300"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="absolute right-2 top-1/2 -translate-y-1/2 text-[#9a8d80] hover:text-[#1B1613]">
                    <X size={14} strokeWidth={1.5} />
                  </button>
                )}
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-[#e5d8cf] text-[11px] text-[#1B1613] bg-white focus:outline-none focus:border-[#8B6F47] cursor-pointer"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => <ProductSkeleton key={i} />)}
          </div>
        ) : error ? (
          <div className="bg-white border border-[#e5d8cf] p-12 text-center">
            <AlertCircle size={40} strokeWidth={1.5} className="text-red-400 mx-auto mb-4" />
            <p className="text-[13px] text-[#9a8d80] mb-6">{error}</p>
            <button
              onClick={fetchProducts}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#8B6F47] text-white text-[11px] tracking-wider uppercase hover:bg-[#A6845F] transition-all duration-300 font-medium"
            >
              <RefreshCw size={14} strokeWidth={1.5} /> Try Again
            </button>
          </div>
          
        ) : products.length === 0 ? (
          <div className="bg-white border border-[#e5d8cf] p-12 text-center">
            <Crown size={48} strokeWidth={1.5} className="text-[#e5d8cf] mx-auto mb-4" />
            <h3 className="font-serif text-xl text-[#1B1613] mb-2">No Best Sellers Yet</h3>
            <p className="text-[13px] text-[#9a8d80] mb-6">
              Our best selling products will appear here soon. Check back later!
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 border border-[#e5d8cf] text-[11px] tracking-wider uppercase text-[#1B1613] hover:bg-[#F4EAE3] transition-all duration-300 font-medium"
            >
              Browse All Products
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product, index) => (
                <ProductCard key={product._id || product.productId} product={product} rank={index + 1} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-10">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 border border-[#e5d8cf] text-[11px] text-[#1B1613] hover:bg-[#F4EAE3] transition-all duration-300 disabled:opacity-50"
                >
                  Previous
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`w-10 h-10 text-[12px] transition-all ${
                      page === i + 1 ? "bg-[#8B6F47] text-white" : "border border-[#e5d8cf] text-[#1B1613] hover:bg-[#F4EAE3]"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 border border-[#e5d8cf] text-[11px] text-[#1B1613] hover:bg-[#F4EAE3] transition-all duration-300 disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}

        {/* Bottom CTA */}
        <div className="mt-16 bg-[#F4EAE3]/50 border border-[#e5d8cf] p-8 sm:p-12 text-center">
          <Sparkles size={20} strokeWidth={1.5} className="text-[#8B6F47] mx-auto mb-4" />
          <h2 className="font-serif text-2xl text-[#1B1613] mb-3">Don't See What You're Looking For?</h2>
          <p className="text-[13px] text-[#5c5248] mb-6 max-w-md mx-auto font-light">
            Browse our complete collection of skincare, haircare, makeup, and more.
          </p>
          <Link
            href="/all_products"
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#1B1613] text-white text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-[#8B6F47] transition-all duration-300"
          >
            View All Products
            <ArrowLeft size={14} strokeWidth={1.5} className="rotate-180" />
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BestSellersPage;