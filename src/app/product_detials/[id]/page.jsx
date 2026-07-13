"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  Heart,
  Share2,
  Minus,
  Plus,
  ShieldCheck,
  Truck,
  Sparkles,
  Leaf,
  Droplets,
  ArrowRight,
  Star,
  Check,
  RefreshCw,
  Package,
  AlertCircle,
  ExternalLink,
  ShoppingBag,
} from "lucide-react";
import Nav from "../../components/Nav";
import Footer from "../../components/Footer";

/* -------------------- SKELETON LOADER -------------------- */
const ProductDetailSkeleton = () => (
  <div className="animate-pulse">
    <div className="px-6 lg:px-12 py-5 border-b border-[#e5d8cf]/50 bg-[#F4EAE3]/30">
      <div className="max-w-7xl mx-auto flex items-center gap-2">
        <div className="h-3 bg-[#e5d8cf]/50 w-16" />
        <div className="h-3 bg-[#e5d8cf]/50 w-20" />
        <div className="h-3 bg-[#e5d8cf]/50 w-32" />
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-7">
          <div className="aspect-square bg-[#e5d8cf]/30" />
        </div>
        <div className="lg:col-span-5 space-y-6">
          <div className="h-3 bg-[#e5d8cf]/50 w-1/3" />
          <div className="h-8 bg-[#e5d8cf]/50 w-3/4" />
          <div className="h-6 bg-[#e5d8cf]/50 w-1/4" />
          <div className="space-y-2">
            <div className="h-3 bg-[#e5d8cf]/50 w-full" />
            <div className="h-3 bg-[#e5d8cf]/50 w-5/6" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-12 bg-[#e5d8cf]/30" />
            ))}
          </div>
          <div className="h-14 bg-[#e5d8cf]/50" />
        </div>
      </div>
    </div>
  </div>
);

/* -------------------- MAIN COMPONENT -------------------- */
const ProductDetailPage = () => {
  const params = useParams();
  const productId = params.id;

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [openSection, setOpenSection] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showWishlistFeedback, setShowWishlistFeedback] = useState(false);

  // Check wishlist status on mount
  useEffect(() => {
    try {
      const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
      const exists = wishlist.some(
        (item) => item._id === productId
      );
      setIsWishlisted(exists);
    } catch (e) {
      console.error("Error reading wishlist:", e);
    }
  }, [productId]);

  // Fetch product details
  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;
      
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/product/${productId}`);
        const data = await response.json();

        if (data.success) {
          setProduct(data.data);
          
          if (data.data.category) {
            fetchRelatedProducts(data.data.category, data.data._id || data.data.productId);
          }
        } else {
          setError(data.message || "Product not found");
        }
      } catch (err) {
        console.error("Error fetching product:", err);
        setError("Failed to load product. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  // Fetch related products
  const fetchRelatedProducts = async (category, currentProductId) => {
    try {
      const response = await fetch(
        `/api/product?category=${encodeURIComponent(category)}&status=active&limit=5&sortBy=clicks&sortOrder=desc`
      );
      const data = await response.json();

      if (data.success) {
        const filtered = data.data.filter(
          (p) => (p._id || p.productId) !== currentProductId
        );
        setRelatedProducts(filtered.slice(0, 4));
      }
    } catch (err) {
      console.error("Error fetching related products:", err);
    }
  };

  // Wishlist toggle with localStorage
  const handleWishlistToggle = () => {
    try {
      const wishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");

      if (isWishlisted) {
        const updated = wishlist.filter((item) => item._id !== productId);
        localStorage.setItem("wishlist", JSON.stringify(updated));
        setIsWishlisted(false);
      } else {
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
          quantity: quantity,
          addedAt: new Date().toISOString(),
        };
        localStorage.setItem("wishlist", JSON.stringify([...wishlist, wishlistItem]));
        setIsWishlisted(true);
        setShowWishlistFeedback(true);
        setTimeout(() => setShowWishlistFeedback(false), 2000);
      }
    } catch (e) {
      console.error("Error updating wishlist:", e);
    }
  };

  const toggleSection = (index) => {
    setOpenSection(openSection === index ? null : index);
  };

  // Get benefits from product highlights
  const getBenefits = () => {
    if (!product?.highlights?.length) return [];
    
    return product.highlights.slice(0, 4).map((highlight, index) => {
      const icons = [Sparkles, Droplets, ShieldCheck, Leaf];
      return {
        icon: icons[index] || Sparkles,
        text: highlight,
      };
    });
  };

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-[#FEFCFA]">
        <Nav />
        <ProductDetailSkeleton />
        <Footer />
      </div>
    );
  }

  // Error State
  if (error || !product) {
    return (
      <div className="min-h-screen bg-[#FEFCFA]">
        <Nav />
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
          <div className="bg-white border border-[#e5d8cf] p-12 text-center max-w-lg mx-auto">
            <AlertCircle size={48} strokeWidth={1.5} className="text-red-400 mx-auto mb-4" />
            <h3 className="font-serif text-xl text-[#1B1613] mb-2">Product Not Found</h3>
            <p className="text-[13px] text-[#9a8d80] mb-6">
              {error || "The product you're looking for doesn't exist or has been removed."}
            </p>
            <Link href="/all_products" className="inline-flex items-center gap-2 px-6 py-3 bg-[#8B6F47] text-white text-[11px] tracking-wider uppercase hover:bg-[#A6845F] transition-all duration-300 font-medium">
              <ArrowRight size={14} strokeWidth={1.5} />
              Browse All Products
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const benefits = getBenefits();
  const productImages = product.galleryImages?.length > 0
    ? [product.mainImage, ...product.galleryImages]
    : [product.mainImage];
  const activePlatforms = product.platforms?.filter(p => p.active) || [];

  return (
    <div className="min-h-screen bg-[#FEFCFA]">
      <Nav />

      {/* Breadcrumb */}
      <nav className="px-6 lg:px-12 py-5 text-[10px] sm:text-[11px] tracking-[0.2em] uppercase border-b border-[#e5d8cf]/50 bg-[#F4EAE3]/30">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-[#9a8d80] flex-wrap">
          <Link href="/" className="hover:text-[#8B6F47] transition-colors duration-300">Home</Link>
          <span className="text-[#e5d8cf]">/</span>
          <Link href="/all_products" className="hover:text-[#8B6F47] transition-colors duration-300">Products</Link>
          <span className="text-[#e5d8cf]">/</span>
          {product.category && (
            <>
              <Link href={`/category/${encodeURIComponent(product.category.toLowerCase().replace(/\s+/g, "-"))}`} className="hover:text-[#8B6F47] transition-colors duration-300">
                {product.category}
              </Link>
              <span className="text-[#e5d8cf]">/</span>
            </>
          )}
          <span className="text-[#1B1613] font-medium">{product.productName}</span>
        </div>
      </nav>

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-[#FEFCFA] text-[#1B1613]"
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* LEFT : IMAGE GALLERY */}
            <div className="lg:col-span-7">
              <div className="sticky top-24">
                <motion.div
                  key={activeImage}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="relative aspect-square bg-[#F4EAE3]/40 overflow-hidden group"
                >
                  {productImages[activeImage]?.url ? (
                    <img
                      src={productImages[activeImage].url}
                      alt={product.productName}
                      className="w-full h-full object-contain p-8 lg:p-16 transition-transform duration-700 group-hover:scale-105"
                      loading="eager"
                      onError={(e) => { e.currentTarget.style.display = "none"; }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package size={64} strokeWidth={1.5} className="text-[#9a8d80]" />
                    </div>
                  )}

                  {/* Rating Badge */}
                  <div className="absolute top-6 left-6 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 shadow-sm">
                    <Star size={14} strokeWidth={1.5} className="fill-[#8B6F47] text-[#8B6F47]" />
                    <span className="text-[12px] font-medium">4.8</span>
                    <span className="text-[11px] text-[#9a8d80]">({product.conversions || 0} sold)</span>
                  </div>

                  {/* Discount Badge */}
                  {product.discountPercentage > 0 && (
                    <div className="absolute top-6 right-20 px-2.5 py-1 bg-red-500 text-white text-[10px] font-medium">
                      -{product.discountPercentage}%
                    </div>
                  )}

                  {/* Wishlist Button */}
                  <button
                    onClick={handleWishlistToggle}
                    className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center bg-white/90 backdrop-blur-sm shadow-sm transition-all duration-300 hover:scale-110 z-10"
                    aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
                  >
                    <Heart
                      size={18}
                      strokeWidth={2}
                      className={`transition-all duration-300 ${
                        isWishlisted ? "fill-red-400 text-red-400" : "text-[#1B1613]"
                      }`}
                    />
                  </button>

                  {/* Wishlist Feedback */}
                  <AnimatePresence>
                    {showWishlistFeedback && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 px-4 py-2 bg-green-600 text-white text-[11px] font-medium shadow-lg rounded flex items-center gap-1.5 whitespace-nowrap"
                      >
                        <Check size={14} strokeWidth={2} />
                        {isWishlisted ? "Added to Wishlist" : "Removed from Wishlist"}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Thumbnail Gallery */}
                {productImages.length > 1 && (
                  <div className="flex justify-center gap-3 mt-6 flex-wrap">
                    {productImages.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setActiveImage(index)}
                        className={`relative w-20 h-20 border transition-all duration-300 ${
                          activeImage === index
                            ? "border-[#8B6F47] shadow-md"
                            : "border-[#e5d8cf] hover:border-[#8B6F47]/50"
                        } bg-[#F4EAE3]/30 overflow-hidden`}
                      >
                        {image?.url ? (
                          <img
                            src={image.url}
                            alt={`${product.productName} view ${index + 1}`}
                            className="w-full h-full object-contain p-2"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Package size={20} strokeWidth={1.5} className="text-[#9a8d80]" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT : PRODUCT DETAILS */}
            <div className="lg:col-span-5">
              {/* Brand & Category */}
              <motion.div
                initial={{ y: 16, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="flex items-center justify-between mb-4"
              >
                <span className="text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-[#8B6F47] font-medium">
                  {product.brand} • {product.category}
                </span>
                <button className="text-[#9a8d80] hover:text-[#1B1613] transition-colors duration-300" aria-label="Share product">
                  <Share2 size={16} strokeWidth={1.5} />
                </button>
              </motion.div>

              {/* Product Name */}
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-serif text-3xl lg:text-4xl xl:text-5xl mb-4 leading-[1.15]"
              >
                {product.productName}
              </motion.h1>

              {/* Price */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-center gap-3 mb-6"
              >
                <span className="text-2xl font-light">
                  {product.displayPrice || `${product.price?.toLocaleString("en-IN")}`}
                </span>
                {product.comparePrice && (
                  <span className="text-lg text-[#9a8d80] line-through font-light">
                    {product.comparePrice?.toLocaleString("en-IN")}
                  </span>
                )}
                {product.stockStatus === "in_stock" ? (
                  <span className="text-[10px] tracking-[0.15em] uppercase text-green-600 font-medium flex items-center gap-1">
                    <Check size={12} strokeWidth={2} />In Stock
                  </span>
                ) : (
                  <span className="text-[10px] tracking-[0.15em] uppercase text-red-500 font-medium">Out of Stock</span>
                )}
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-[13px] sm:text-sm text-[#5c5248] leading-relaxed mb-8 font-light"
              >
                {product.description}
              </motion.p>

              {/* Product Highlights */}
              {benefits.length > 0 && (
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="grid grid-cols-2 gap-3 mb-8"
                >
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 border border-[#e5d8cf] bg-[#F4EAE3]/20">
                      <benefit.icon size={16} strokeWidth={1.5} className="text-[#8B6F47] shrink-0" />
                      <span className="text-[11px] sm:text-[12px] text-[#1B1613] font-light">{benefit.text}</span>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* Quantity Selector */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex items-center gap-6 mb-8"
              >
                <span className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-[#1B1613] font-medium">Quantity</span>
                <div className="flex border border-[#e5d8cf]">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 py-3 hover:bg-[#F4EAE3] transition-colors duration-300">
                    <Minus size={14} strokeWidth={1.5} />
                  </button>
                  <span className="px-6 py-3 flex items-center text-sm font-medium min-w-[3rem] justify-center border-x border-[#e5d8cf]">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="px-4 py-3 hover:bg-[#F4EAE3] transition-colors duration-300">
                    <Plus size={14} strokeWidth={1.5} />
                  </button>
                </div>
              </motion.div>

              {/* BUY NOW BUTTONS - Affiliate Links */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="space-y-3 mb-10"
              >
                <p className="text-[10px] tracking-[0.2em] uppercase text-[#9a8d80] font-medium mb-3">
                  Buy Now
                </p>
                
                {activePlatforms.length > 0 ? (
                  activePlatforms.map((platform) => (
                    <a
                      key={platform.name}
                      href={platform.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative w-full py-4 px-6 text-[11px] sm:text-[12px] tracking-[0.2em] uppercase font-medium transition-all duration-500 bg-[#1B1613] text-[#F4EAE3] hover:bg-[#8B6F47] flex items-center justify-between"
                    >
                      <span className="flex items-center gap-3">
                        <ShoppingBag size={16} strokeWidth={1.5} />
                        Buy Now
                      </span>
                      <span className="flex items-center gap-2 text-[10px] font-normal tracking-wider">
                        {product.displayPrice || `${product.price?.toLocaleString("en-IN")}`}
                        <ExternalLink size={14} strokeWidth={1.5} className="transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </a>
                  ))
                ) : (
                  <button
                    disabled
                    className="w-full py-4 px-6 text-[11px] tracking-[0.2em] uppercase font-medium bg-gray-300 text-gray-500 cursor-not-allowed"
                  >
                    No purchase links available
                  </button>
                )}
              </motion.div>

              {/* Trust Badges */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-10"
              >
                <div className="flex items-center gap-2 text-[11px] text-[#5c5248] font-light">
                  <Truck size={14} strokeWidth={1.5} className="text-[#8B6F47] shrink-0" />Free Shipping
                </div>
                <div className="flex items-center gap-2 text-[11px] text-[#5c5248] font-light">
                  <RefreshCw size={14} strokeWidth={1.5} className="text-[#8B6F47] shrink-0" />Easy Returns
                </div>
                <div className="flex items-center gap-2 text-[11px] text-[#5c5248] font-light">
                  <ShieldCheck size={14} strokeWidth={1.5} className="text-[#8B6F47] shrink-0" />Authentic
                </div>
              </motion.div>

              {/* Accordion Details */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                className="space-y-1"
              >
                {[
                  { title: "Product Details", content: product.description },
                  { title: "Key Highlights", content: product.highlights?.length > 0 ? product.highlights.map(h => `• ${h}`).join("\n") : "No highlights available" },
                  { title: "Shipping & Delivery", content: "Complimentary shipping across Australia and the UK. Free returns within 30 days of delivery." },
                ].map((item, index) => (
                  <div key={index} className="border-b border-[#e5d8cf]/80">
                    <button
                      onClick={() => toggleSection(index)}
                      className="w-full flex justify-between items-center text-[11px] sm:text-[12px] tracking-[0.15em] uppercase font-medium py-5 text-[#1B1613] hover:text-[#8B6F47] transition-colors duration-300"
                    >
                      <span>{item.title}</span>
                      {openSection === index ? <ChevronUp size={15} strokeWidth={1.5} className="text-[#8B6F47]" /> : <ChevronDown size={15} strokeWidth={1.5} />}
                    </button>
                    <AnimatePresence>
                      {openSection === index && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.4 }} className="overflow-hidden">
                          <p className="text-[13px] text-[#5c5248] pb-5 leading-relaxed font-light whitespace-pre-line">{item.content}</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </motion.div>

              {/* SKU */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                className="mt-8 text-[10px] sm:text-[11px] text-[#9a8d80] tracking-[0.1em] font-light"
              >
                SKU: {product.sku || product.productId}
              </motion.p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* RELATED PRODUCTS */}
      {relatedProducts.length > 0 && (
        <section className="bg-[#F4EAE3] py-16 sm:py-24">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-center mb-14"
            >
              <div className="inline-flex items-center gap-2 mb-5 px-4 py-2 rounded-full bg-white/50 border border-[#e5d8cf]">
                <Sparkles size={12} strokeWidth={1.5} className="text-[#8B6F47]" />
                <span className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-[#8B6F47] font-medium">Complete Your Routine</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#1B1613]">You May Also Love</h2>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
              {relatedProducts.map((product, index) => (
                <motion.div
                  key={product._id || product.productId}
                  initial={{ y: 40, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Link href={`/product_detials/${product._id || product.productId}`} className="block group">
                    <div className="relative aspect-square bg-[#F4EAE3]/30 overflow-hidden mb-4">
                      {product.mainImage?.url ? (
                        <img src={product.mainImage.url} alt={product.productName} className="w-full h-full object-cover p-6 transition-transform duration-500 group-hover:scale-105" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Package size={40} strokeWidth={1.5} className="text-[#9a8d80]" />
                        </div>
                      )}
                    </div>
                    <h3 className="text-[12px] text-[#1B1613] font-medium mb-1 group-hover:text-[#8B6F47] transition-colors line-clamp-2">{product.productName}</h3>
                    <span className="text-[13px] font-light text-[#1B1613]">{product.displayPrice || `${product.price?.toLocaleString("en-IN")}`}</span>
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-center mt-14">
              <Link href="/all_products" className="group inline-flex items-center gap-3 text-[11px] sm:text-[12px] tracking-[0.2em] uppercase text-[#1B1613] font-medium border-b border-[#1B1613] pb-2 hover:text-[#8B6F47] hover:border-[#8B6F47] transition-all duration-300">
                View All Products
                <ArrowRight size={15} strokeWidth={1.5} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default ProductDetailPage;