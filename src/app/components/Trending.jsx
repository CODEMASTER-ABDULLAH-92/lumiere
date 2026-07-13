"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Heart,
  ShoppingBag,
  Package,
  TrendingUp,
  ArrowRight,
  AlertCircle,
  RefreshCw,
  Flame,
  Check,
} from "lucide-react";

/* -------------------- PRODUCT CARD -------------------- */
const ProductCard = ({ product, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showAddedFeedback, setShowAddedFeedback] = useState(false);

  // Check if product is in wishlist on mount
  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const isInWishlist = wishlist.some(
      (item) => item._id === (product._id || product.productId)
    );
    setIsWishlisted(isInWishlist);
  }, [product._id, product.productId]);

  // Handle wishlist toggle
  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const productId = product._id || product.productId;

    if (isWishlisted) {
      // Remove from wishlist
      const updated = wishlist.filter((item) => item._id !== productId);
      localStorage.setItem("wishlist", JSON.stringify(updated));
      setIsWishlisted(false);
    } else {
      // Add to wishlist - store minimal product data
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
        addedAt: new Date().toISOString(),
      };
      const updated = [...wishlist, wishlistItem];
      localStorage.setItem("wishlist", JSON.stringify(updated));
      setIsWishlisted(true);

      // Show added feedback
      setShowAddedFeedback(true);
      setTimeout(() => setShowAddedFeedback(false), 1500);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link
        href={`/product_detials/${product._id || product.productId}`}
        className="block"
      >
        {/* Image Container with Animated Border */}
        <div className="relative aspect-square bg-[#F4EAE3]/30 overflow-hidden mb-4">
          {/* Animated Border Overlay */}
          <div
            className={`absolute inset-0 z-20 pointer-events-none transition-all duration-500 ${
              isHovered
                ? "border-2 border-[#8B6F47] shadow-[inset_0_0_0_1px_#8B6F47]"
                : "border-2 border-transparent"
            }`}
          />
          
          {/* Corner accents on hover */}
          <div
            className={`absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#8B6F47] z-20 transition-all duration-300 ${
              isHovered ? "opacity-100 translate-x-0 translate-y-0" : "opacity-0 -translate-x-2 -translate-y-2"
            }`}
          />
          <div
            className={`absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#8B6F47] z-20 transition-all duration-300 ${
              isHovered ? "opacity-100 translate-x-0 translate-y-0" : "opacity-0 translate-x-2 translate-y-2"
            }`}
          />
          <div
            className={`absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#8B6F47] z-20 transition-all duration-300 ${
              isHovered ? "opacity-100 translate-x-0 translate-y-0" : "opacity-0 -translate-x-2 translate-y-2"
            }`}
          />
          <div
            className={`absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#8B6F47] z-20 transition-all duration-300 ${
              isHovered ? "opacity-100 translate-x-0 translate-y-0" : "opacity-0 translate-x-2 translate-y-2"
            }`}
          />

          {product.mainImage?.url ? (
            <motion.div
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 0.6 }}
              className="w-full h-full relative z-10"
            >
              <img
                src={product.mainImage.url}
                alt={product.productName}
                loading="lazy"
                className="w-full h-full object-cover p-6 lg:p-8"
              />
            </motion.div>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Package size={40} strokeWidth={1.5} className="text-[#9a8d80]" />
            </div>
          )}

          {/* Trending Badge */}
          <div className="absolute top-3 left-3 z-30 px-2.5 py-1 bg-gradient-to-r from-[#8B6F47] to-[#A6845F] text-white text-[9px] tracking-[0.15em] uppercase font-medium shadow-lg flex items-center gap-1">
            <Flame size={10} strokeWidth={1.5} />
            Trending
          </div>

          {/* Discount Badge */}
          {product.discountPercentage > 0 && (
            <div className="absolute top-3 right-3 z-30 px-2 py-1 bg-red-500 text-white text-[9px] font-medium">
              -{product.discountPercentage}%
            </div>
          )}

          {/* Quick View Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            className="absolute inset-0 z-20 bg-[#1B1613]/5 flex items-end justify-center pb-6"
          >
            <span className="bg-white/95 backdrop-blur-sm text-[#1B1613] px-6 py-3 text-[10px] tracking-[0.15em] uppercase font-medium shadow-lg hover:bg-[#8B6F47] hover:text-white transition-all duration-300 flex items-center gap-2 cursor-pointer">
              <ShoppingBag size={14} strokeWidth={1.5} />
              Quick View
            </span>
          </motion.div>

          {/* Wishlist Button */}
          <button
            onClick={handleWishlistToggle}
            className={`absolute top-3 right-3 z-30 w-8 h-8 flex items-center justify-center bg-white/90 backdrop-blur-sm shadow-sm transition-all duration-300 hover:scale-110 ${
              isWishlisted || isHovered ? "opacity-100" : "opacity-0"
            }`}
            aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart
              size={14}
              strokeWidth={2}
              className={`transition-all duration-300 ${
                isWishlisted
                  ? "fill-red-400 text-red-400"
                  : "text-[#1B1613]"
              }`}
            />
          </button>

          {/* Added to Wishlist Feedback */}
          <AnimatePresence>
            {showAddedFeedback && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute bottom-3 left-1/2 -translate-x-1/2 z-30 px-4 py-2 bg-green-600 text-white text-[10px] font-medium shadow-lg flex items-center gap-1.5 whitespace-nowrap"
              >
                <Check size={12} strokeWidth={2} />
                Added to Wishlist
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Product Info */}
        <div className="px-1">
          <div className="flex items-center gap-1 mb-1.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={10}
                strokeWidth={1.5}
                className={
                  i < 4
                    ? "fill-[#8B6F47] text-[#8B6F47]"
                    : "fill-none text-[#e5d8cf]"
                }
              />
            ))}
            <span className="text-[10px] text-[#9a8d80] ml-1">(4.8)</span>
          </div>

          <h3 className="text-[12px] sm:text-[13px] text-[#1B1613] font-medium mb-1.5 leading-snug group-hover:text-[#8B6F47] transition-colors line-clamp-2">
            {product.productName}
          </h3>

          <p className="text-[10px] text-[#9a8d80] mb-2 uppercase tracking-wider">
            {product.category}
          </p>

          <div className="flex items-center gap-2">
            <span className="text-[14px] font-light text-[#1B1613]">
              {product.displayPrice ||
                `${product.price?.toLocaleString("en-IN")}`}
            </span>
            {product.comparePrice && (
              <span className="text-[11px] text-[#9a8d80] line-through">
                {product.comparePrice?.toLocaleString("en-IN")}
              </span>
            )}
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
const TrendingProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTrendingProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      params.append("page", "1");
      params.append("limit", "12");
      params.append("status", "active");
      params.append("sortBy", "createdAt");
      params.append("sortOrder", "desc");

      const response = await fetch(`/api/product?${params.toString()}`);
      const data = await response.json();

      console.log("📥 Trending Products Response:", data);

      if (data.success) {
        setProducts(data.data);
      } else {
        setError(data.message || "Failed to fetch products");
      }
    } catch (err) {
      console.error("Error fetching trending products:", err);
      setError("Failed to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTrendingProducts();
  }, [fetchTrendingProducts]);

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
            <Flame size={14} strokeWidth={1.5} className="text-[#8B6F47]" />
            <span className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-[#8B6F47] font-medium">
              Hot Right Now
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1B1613] mb-4">
            Trending Products
          </h2>
          <p className="text-[13px] sm:text-sm text-[#9a8d80] max-w-lg mx-auto font-light">
            Discover what everyone's loving right now. Our most popular picks, updated daily.
          </p>
        </motion.div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <ProductSkeleton key={i} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <AlertCircle size={40} strokeWidth={1.5} className="text-red-400 mx-auto mb-4" />
            <p className="text-[13px] text-[#9a8d80] mb-6">{error}</p>
            <button
              onClick={fetchTrendingProducts}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#8B6F47] text-white text-[11px] tracking-wider uppercase hover:bg-[#A6845F] transition-all duration-300 font-medium"
            >
              <RefreshCw size={14} strokeWidth={1.5} /> Try Again
            </button>
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <Package size={48} strokeWidth={1.5} className="text-[#e5d8cf] mx-auto mb-4" />
            <p className="text-[13px] text-[#9a8d80]">No trending products right now. Check back soon!</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.slice(0, 12).map((product, index) => (
                <ProductCard
                  key={product._id || product.productId}
                  product={product}
                  index={index}
                />
              ))}
            </div>

            {/* View All Link */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-14"
            >
              <Link
                href="/all_products"
                className="group inline-flex items-center gap-3 text-[11px] sm:text-[12px] tracking-[0.2em] uppercase text-[#1B1613] font-medium border-b border-[#1B1613] pb-2 hover:text-[#8B6F47] hover:border-[#8B6F47] transition-all duration-300"
              >
                View All Products
                <ArrowRight size={15} strokeWidth={1.5} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
};

export default TrendingProducts;