"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
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
} from "lucide-react";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";

/* -------------------- CATEGORY SLUG MAP -------------------- */
// Maps your Nav href slugs to actual database category names
const slugToCategoryMap = {
  "skincare": "Skincare",
  "haircare": "Haircare",
  "makeup": "Makeup",
  "fragrance": "Fragrance",
  "body-care": "Body Care",
  "travel": "Travel Size",
  "women": "Women",
  "men": "Men",
  "kids-baby": "Kids & Baby",
  "gift-sets": "Gift Sets",
};

/* -------------------- CATEGORY DATA -------------------- */
const categoryInfo = {
  "Skincare": {
    title: "Skincare",
    description: "Transform your skin with our curated collection of serums, moisturizers, cleansers, and treatments.",
    subcategories: ["Serums", "Moisturizers", "Cleansers", "Toners", "Masks", "Eye Care", "Sunscreen", "Oils"],
    image: "https://images.unsplash.com/photo-1570194065650-d99fb4ee8849?w=800",
  },
  "Haircare": {
    title: "Haircare",
    description: "Nourish and restore your hair with our premium shampoos, conditioners, and treatments.",
    subcategories: ["Shampoo", "Conditioner", "Hair Oil", "Hair Mask", "Styling", "Treatments"],
    image: "https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=800",
  },
  "Makeup": {
    title: "Makeup",
    description: "Express yourself with our collection of foundations, lipsticks, eyeshadows, and more.",
    subcategories: ["Foundation", "Lipstick", "Eyeshadow", "Mascara", "Blush", "Concealer", "Primer"],
    image: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800",
  },
  "Fragrance": {
    title: "Fragrance",
    description: "Discover your signature scent with our exquisite collection of perfumes and body mists.",
    subcategories: ["Eau de Parfum", "Eau de Toilette", "Body Mist", "Perfume Oil"],
    image: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=800",
  },
  "Body Care": {
    title: "Body Care",
    description: "Pamper your body with our luxurious lotions, washes, scrubs, and hand creams.",
    subcategories: ["Body Lotion", "Body Wash", "Scrubs", "Hand Cream", "Deodorant"],
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800",
  },
  "Men's Grooming": {
    title: "Men's Grooming",
    description: "Premium grooming essentials for the modern man — beard care, shaving, and skincare.",
    subcategories: ["Beard Care", "Shaving", "Face Care", "Body Care"],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800",
  },
  "Tools & Accessories": {
    title: "Tools & Accessories",
    description: "Professional beauty tools and accessories for your daily routine.",
    subcategories: ["Brushes", "Sponges", "Applicators", "Storage"],
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800",
  },
  "Wellness": {
    title: "Wellness",
    description: "Holistic wellness products to nourish your mind, body, and soul.",
    subcategories: ["Supplements", "Aromatherapy", "Sleep Aid", "Stress Relief"],
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800",
  },
  "Gift Sets": {
    title: "Gift Sets",
    description: "Curated gift sets for every occasion — the perfect present for beauty lovers.",
    subcategories: ["Skincare Sets", "Makeup Sets", "Fragrance Sets", "Discovery Sets"],
    image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=800",
  },
  "Travel Size": {
    title: "Travel Size",
    description: "Travel-friendly mini versions of your favorite beauty products.",
    subcategories: ["Mini Skincare", "Mini Makeup", "Travel Kits"],
    image: "https://images.unsplash.com/photo-1588534387222-0c41d27f30ed?w=800",
  },
  "Women": {
    title: "Women",
    description: "Beauty products curated for women — skincare, makeup, and more.",
    subcategories: [],
    image: "https://images.unsplash.com/photo-1487412912498-0447578fcca8?w=800",
  },
  "Men": {
    title: "Men",
    description: "Grooming essentials for the modern man.",
    subcategories: [],
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800",
  },
  "Kids & Baby": {
    title: "Kids & Baby",
    description: "Gentle and safe beauty products for kids and babies.",
    subcategories: [],
    image: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=800",
  },
};

const sortOptions = [
  { label: "Newest First", value: "createdAt-desc" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Most Popular", value: "clicks-desc" },
  { label: "Best Selling", value: "conversions-desc" },
  { label: "Name: A to Z", value: "productName-asc" },
];

/* -------------------- PRODUCT CARD -------------------- */
const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);

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
              <img
                src={product.mainImage.url}
                alt={product.productName}
                className="object-cover p-6 lg:p-8"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </motion.div>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Package size={40} strokeWidth={1.5} className="text-[#9a8d80]" />
            </div>
          )}

          {product.discountPercentage > 0 && (
            <div className="absolute top-3 left-3 z-10 px-2 py-1 bg-red-500 text-white text-[9px] font-medium">
              -{product.discountPercentage}%
            </div>
          )}

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
        </div>

        <div className="px-1">
          <h3 className="text-[12px] sm:text-[13px] text-[#1B1613] font-medium mb-1.5 leading-snug group-hover:text-[#8B6F47] transition-colors line-clamp-2">
            {product.productName}
          </h3>
          <p className="text-[10px] text-[#9a8d80] mb-1.5 uppercase tracking-wider">{product.category}</p>
          <div className="flex items-center gap-2">
            <span className="text-[14px] font-light text-[#1B1613]">
              {product.displayPrice || `₹${product.price?.toLocaleString("en-IN")}`}
            </span>
            {product.comparePrice && (
              <span className="text-[11px] text-[#9a8d80] line-through">
                ₹{product.comparePrice?.toLocaleString("en-IN")}
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
      <div className="h-4 bg-[#e5d8cf]/50 w-3/4" />
      <div className="h-3 bg-[#e5d8cf]/50 w-1/3" />
      <div className="h-5 bg-[#e5d8cf]/50 w-1/4" />
    </div>
  </div>
);

/* -------------------- MAIN COMPONENT -------------------- */
const CategoryPage = () => {
  const params = useParams();
  const rawSlug = params.categoryType; // ✅ Using categoryType as the param name

  console.log("🔍 URL Slug:", rawSlug);

  // Get the correct category name from the slug
  const categoryName = slugToCategoryMap[rawSlug?.toLowerCase()] || null;

  console.log("📝 Matched Category:", categoryName);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState("createdAt-desc");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const limit = 12;

  const categoryData = categoryName ? categoryInfo[categoryName] : null;

  // Fetch products
  const fetchProducts = useCallback(async () => {
    if (!categoryName) return;

    setLoading(true);
    setError(null);

    try {
      const queryParams = new URLSearchParams();
      queryParams.append("category", categoryName);
      queryParams.append("page", page);
      queryParams.append("limit", limit);
      // queryParams.append("status", "active");

      if (searchQuery) queryParams.append("search", searchQuery);
      if (sortBy) {
        const [field, order] = sortBy.split("-");
        queryParams.append("sortBy", field);
        queryParams.append("sortOrder", order);
      }

      console.log("📡 Fetching:", `/api/product?${queryParams.toString()}`);

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
      console.error("Error fetching products:", err);
      setError("Failed to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  }, [categoryName, page, searchQuery, sortBy]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    setPage(1);
  }, [searchQuery, sortBy]);

  // Category not found
  if (!categoryName || !categoryData) {
    return (
      <div className="min-h-screen bg-[#FEFCFA]">
        <Nav />
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20 text-center">
          <AlertCircle size={48} strokeWidth={1.5} className="text-red-400 mx-auto mb-4" />
          <h2 className="font-serif text-2xl text-[#1B1613] mb-4">Category Not Found</h2>
          <p className="text-[13px] text-[#9a8d80] mb-2">
            The category "{decodeURIComponent(rawSlug || '')}" doesn't exist.
          </p>
          <p className="text-[11px] text-[#9a8d80] mb-6">
            Available: {Object.keys(slugToCategoryMap).join(", ")}
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#8B6F47] text-white text-[11px] tracking-wider uppercase hover:bg-[#A6845F] transition-all duration-300 font-medium"
          >
            <ArrowLeft size={14} strokeWidth={1.5} />
            Browse All Products
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FEFCFA]">
      <Nav />

      {/* Category Hero */}
      <div className="relative bg-[#1B1613] text-[#F4EAE3] py-16 sm:py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image src={categoryData.image} alt={categoryData.title} fill className="object-cover" priority />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Sparkles size={16} strokeWidth={1.5} className="text-[#8B6F47]" />
            <span className="text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-[#8B6F47] font-medium">
              The Lumière Collection
            </span>
            <Sparkles size={16} strokeWidth={1.5} className="text-[#8B6F47]" />
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl mb-4">{categoryData.title}</h1>
          <p className="text-[13px] sm:text-sm text-[#9a8d80] max-w-lg mx-auto font-light">
            {categoryData.description}
          </p>
          <p className="text-[11px] text-[#8B6F47]/60 mt-4 tracking-wider uppercase">
            {totalProducts} Products
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
        {/* Breadcrumb */}
        <nav className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase mb-8 text-[#9a8d80]">
          <Link href="/" className="hover:text-[#8B6F47] transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/products" className="hover:text-[#8B6F47] transition-colors">Products</Link>
          <span className="mx-2">/</span>
          <span className="text-[#1B1613] font-medium">{categoryData.title}</span>
        </nav>

        {/* Toolbar */}
        <div className="bg-white border border-[#e5d8cf] p-4 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <p className="text-[12px] text-[#9a8d80]">
              Showing <span className="font-medium text-[#1B1613]">{totalProducts}</span> products in {categoryData.title}
            </p>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="relative flex-1 sm:flex-none">
                <Search size={14} strokeWidth={1.5} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9a8d80]" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-48 pl-9 pr-8 py-2 border border-[#e5d8cf] text-[12px] text-[#1B1613] placeholder:text-[#9a8d80] focus:outline-none focus:border-[#8B6F47] transition-all duration-300"
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
            <Package size={48} strokeWidth={1.5} className="text-[#e5d8cf] mx-auto mb-4" />
            <h3 className="font-serif text-xl text-[#1B1613] mb-2">No Products Yet</h3>
            <p className="text-[13px] text-[#9a8d80] mb-6">
              No products found in {categoryData.title}. Check back soon!
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 px-6 py-3 border border-[#e5d8cf] text-[11px] tracking-wider uppercase text-[#1B1613] hover:bg-[#F4EAE3] transition-all duration-300 font-medium"
            >
              View All Products
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product._id || product.productId} product={product} />
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
      </div>
      <Footer />
    </div>
  );
};

export default CategoryPage;