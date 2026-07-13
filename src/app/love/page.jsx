"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  Heart,
  ArrowLeft,
  Package,
  Share2,
  ExternalLink,
  Check,
  Copy,
} from "lucide-react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";

/* ---------------- COMPONENT ---------------- */
const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [mounted, setMounted] = useState(false);
  const [sharePopup, setSharePopup] = useState(null);
  const [copiedId, setCopiedId] = useState(null);
  const shareRef = useRef(null);

  // Load cart items from localStorage on mount
  useEffect(() => {
    setMounted(true);
    const savedWishlist = JSON.parse(localStorage.getItem("wishlist") || "[]");
    const itemsWithQuantity = savedWishlist.map((item) => ({
      ...item,
      quantity: item.quantity || 1,
    }));
    setCartItems(itemsWithQuantity);
  }, []);

  // Save to localStorage whenever cart changes
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("wishlist", JSON.stringify(cartItems));
    }
  }, [cartItems, mounted]);

  // Close share popup on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (shareRef.current && !shareRef.current.contains(e.target)) {
        setSharePopup(null);
      }
    };
    if (sharePopup) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [sharePopup]);

  const updateQuantity = (id, type) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id
          ? {
              ...item,
              quantity: type === "inc" ? item.quantity + 1 : Math.max(1, item.quantity - 1),
            }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prev) => prev.filter((item) => item._id !== id));
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("wishlist");
  };

  // Get product share URL
  const getProductUrl = (productId) => {
    return `${window.location.origin}/product_detials/${productId}`;
  };

  // Copy link to clipboard
  const copyToClipboard = async (productId) => {
    const url = getProductUrl(productId);
    try {
      await navigator.clipboard.writeText(url);
      setCopiedId(productId);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  // Share to WhatsApp
  const shareToWhatsApp = (item) => {
    const url = getProductUrl(item._id);
    const text = `Check out this product from Lumière Beauty!%0A%0A${item.productName}%0A${item.displayPrice || `${item.price?.toLocaleString("en-IN")}`}%0A%0A${url}`;
    window.open(`https://wa.me/?text=${text}`, "_blank");
    setSharePopup(null);
  };

  // Share to Twitter/X
  const shareToTwitter = (item) => {
    const url = getProductUrl(item._id);
    const text = `Check out ${item.productName} from Lumière Beauty! ${url}`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, "_blank");
    setSharePopup(null);
  };

  // Share via Email
  const shareToEmail = (item) => {
    const url = getProductUrl(item._id);
    const subject = `Check out ${item.productName} from Lumière Beauty`;
    const body = `I found this product from Lumière Beauty and thought you might like it!%0A%0A${item.productName}%0A${item.displayPrice || `${item.price?.toLocaleString("en-IN")}`}%0A%0AView here: ${url}`;
    window.open(`mailto:?subject=${encodeURIComponent(subject)}&body=${body}`, "_blank");
    setSharePopup(null);
  };

  // Share via native Web Share API (mobile)
  const nativeShare = async (item) => {
    const url = getProductUrl(item._id);
    if (navigator.share) {
      try {
        await navigator.share({
          title: item.productName,
          text: `Check out ${item.productName} from Lumière Beauty!`,
          url: url,
        });
      } catch (err) {
        console.log("Share cancelled");
      }
    }
    setSharePopup(null);
  };

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#FEFCFA] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#e5d8cf] border-t-[#8B6F47] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FEFCFA]">
      <Nav />

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        className="text-[#1B1613]"
      >
        {/* Header */}
        <div className="bg-[#1B1613] text-[#F4EAE3] py-12 sm:py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Heart size={16} strokeWidth={1.5} className="text-[#8B6F47]" />
              <span className="text-[10px] sm:text-[11px] tracking-[0.25em] uppercase text-[#8B6F47] font-medium">
                Your Wishlist
              </span>
              <Heart size={16} strokeWidth={1.5} className="text-[#8B6F47]" />
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl mb-4">
              Saved Products
            </h1>
            <p className="text-[13px] sm:text-sm text-[#9a8d80] max-w-md mx-auto font-light">
              {cartItems.length === 0
                ? "Your wishlist is empty. Start adding products you love!"
                : `${cartItems.length} ${cartItems.length === 1 ? "product" : "products"} saved in your wishlist`}
            </p>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-6 lg:px-12 py-12">
          {/* Breadcrumb */}
          <nav className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase mb-8 text-[#9a8d80]">
            <Link href="/" className="hover:text-[#8B6F47] transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-[#1B1613] font-medium">Wishlist</span>
          </nav>

          {cartItems.length === 0 ? (
            /* Empty State */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-20"
            >
              <div className="w-24 h-24 rounded-full bg-[#F4EAE3]/50 flex items-center justify-center mx-auto mb-6">
                <Heart size={40} strokeWidth={1.5} className="text-[#9a8d80]" />
              </div>
              <h2 className="font-serif text-2xl text-[#1B1613] mb-3">Your Wishlist is Empty</h2>
              <p className="text-[13px] text-[#9a8d80] mb-8 max-w-md mx-auto font-light">
                Browse our collection and add products to your wishlist. They'll be saved here for you.
              </p>
              <Link
                href="/all_products"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-[#8B6F47] text-white text-[11px] tracking-[0.2em] uppercase font-medium hover:bg-[#A6845F] transition-all duration-300"
              >
                <ShoppingBag size={15} strokeWidth={1.5} />
                Browse Products
              </Link>
            </motion.div>
          ) : (

            
            <div>
              <div className="flex items-center justify-between mb-6">
                <p className="text-[12px] text-[#9a8d80]">
                  {cartItems.length} {cartItems.length === 1 ? "product" : "products"} saved
                </p>
                <button
                  onClick={clearCart}
                  className="text-[11px] tracking-wider uppercase text-[#9a8d80] hover:text-red-500 transition-colors flex items-center gap-1.5"
                >
                  <Trash2 size={13} strokeWidth={1.5} />
                  Clear All
                </button>
              </div>

              <AnimatePresence>
                {cartItems.map((item, index) => (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    className="bg-white border border-[#e5d8cf] p-4 sm:p-6 mb-4 hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex gap-4 sm:gap-6">
                      {/* Image */}
                      <Link
                        href={`/product_detials/${item._id}`}
                        className="relative w-24 h-24 sm:w-32 sm:h-32 bg-[#F4EAE3]/30 flex-shrink-0 overflow-hidden group"
                      >
                        {item.mainImage?.url ? (
                          <img
                            src={item.mainImage.url}
                            alt={item.productName}
                            className="object-contain p-3 transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Package size={32} strokeWidth={1.5} className="text-[#9a8d80]" />
                          </div>
                        )}
                      </Link>

                      {/* Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                          <div className="flex-1">
                            <span className="text-[9px] tracking-[0.2em] uppercase text-[#8B6F47] font-medium">
                              {item.category}
                            </span>
                            <Link
                              href={`/product_detials/${item._id}`}
                              className="block text-[14px] font-medium text-[#1B1613] mt-1 hover:text-[#8B6F47] transition-colors"
                            >
                              {item.productName}
                            </Link>
                            <p className="text-[11px] text-[#9a8d80] mt-0.5">{item.brand}</p>
                            
                            {/* Price */}
                            <div className="mt-2">
                              <span className="text-[16px] font-medium text-[#1B1613]">
                                {item.displayPrice || `${(item.price || 0).toLocaleString("en-IN")}`}
                              </span>
                              {item.comparePrice && (
                                <span className="text-[12px] text-[#9a8d80] line-through ml-2">
                                  {item.comparePrice?.toLocaleString("en-IN")}
                                </span>
                              )}
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex items-center gap-4 mt-3">
                              <div className="flex border border-[#e5d8cf]">
                                <button
                                  onClick={() => updateQuantity(item._id, "dec")}
                                  className="px-3 py-1.5 hover:bg-[#F4EAE3] transition-colors"
                                >
                                  <Minus size={13} strokeWidth={1.5} />
                                </button>
                                <span className="px-4 py-1.5 flex items-center text-[13px] font-medium border-x border-[#e5d8cf] min-w-[2.5rem] justify-center">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQuantity(item._id, "inc")}
                                  className="px-3 py-1.5 hover:bg-[#F4EAE3] transition-colors"
                                >
                                  <Plus size={13} strokeWidth={1.5} />
                                </button>
                              </div>
                              <button
                                onClick={() => removeItem(item._id)}
                                className="text-[10px] tracking-wider uppercase text-[#9a8d80] hover:text-red-500 transition-colors flex items-center gap-1"
                              >
                                <Trash2 size={12} strokeWidth={1.5} />
                                Remove
                              </button>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex sm:flex-col gap-2 flex-shrink-0">
                            {/* Buy Now Button */}
                            {item.platforms?.filter(p => p.active)?.[0] ? (
                              <a
                                href={item.platforms.filter(p => p.active)[0].url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#1B1613] text-white text-[10px] tracking-[0.15em] uppercase font-medium hover:bg-[#8B6F47] transition-all duration-300 whitespace-nowrap"
                              >
                                <ExternalLink size={13} strokeWidth={1.5} />
                                Buy Now
                              </a>
                            ) : (
                              <button
                                disabled
                                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-gray-300 text-gray-500 text-[10px] tracking-[0.15em] uppercase font-medium cursor-not-allowed whitespace-nowrap"
                              >
                                Unavailable
                              </button>
                            )}

                            {/* Share Button */}
                            <div className="relative">
                              <button
                                onClick={() => setSharePopup(sharePopup === item._id ? null : item._id)}
                                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-[#e5d8cf] text-[#1B1613] text-[10px] tracking-[0.15em] uppercase font-medium hover:bg-[#F4EAE3] transition-all duration-300 whitespace-nowrap"
                              >
                                <Share2 size={13} strokeWidth={1.5} />
                                Share
                              </button>

                              {/* Share Popup */}
                              <AnimatePresence>
                                {sharePopup === item._id && (
                                  <motion.div
                                    ref={shareRef}
                                    initial={{ opacity: 0, y: 5, scale: 0.95 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, y: 5, scale: 0.95 }}
                                    className="absolute right-0 top-full mt-2 w-56 bg-white border border-[#e5d8cf] shadow-xl z-50 p-3"
                                  >
                                    <p className="text-[10px] tracking-[0.15em] uppercase text-[#9a8d80] font-medium mb-3">Share Product</p>
                                    
                                    <div className="space-y-1.5">
                                      {/* Copy Link */}
                                      <button
                                        onClick={() => copyToClipboard(item._id)}
                                        className="w-full flex items-center gap-3 px-3 py-2.5 text-[12px] text-[#1B1613] hover:bg-[#F4EAE3]/50 transition-all"
                                      >
                                        {copiedId === item._id ? (
                                          <>
                                            <Check size={14} strokeWidth={1.5} className="text-green-600" />
                                            <span className="text-green-600">Copied!</span>
                                          </>
                                        ) : (
                                          <>
                                            <Copy size={14} strokeWidth={1.5} className="text-[#9a8d80]" />
                                            <span>Copy Link</span>
                                          </>
                                        )}
                                      </button>

                                      {/* WhatsApp */}
                                      <button
                                        onClick={() => shareToWhatsApp(item)}
                                        className="w-full flex items-center gap-3 px-3 py-2.5 text-[12px] text-[#1B1613] hover:bg-[#F4EAE3]/50 transition-all"
                                      >
                                        <span className="w-4 h-4 rounded-full bg-green-500 flex items-center justify-center text-[8px] text-white font-bold">W</span>
                                        <span>WhatsApp</span>
                                      </button>

                                      {/* Twitter/X */}
                                      <button
                                        onClick={() => shareToTwitter(item)}
                                        className="w-full flex items-center gap-3 px-3 py-2.5 text-[12px] text-[#1B1613] hover:bg-[#F4EAE3]/50 transition-all"
                                      >
                                        <span className="w-4 h-4 rounded-full bg-black flex items-center justify-center text-[8px] text-white font-bold">X</span>
                                        <span>Twitter / X</span>
                                      </button>

                                      {/* Email */}
                                      <button
                                        onClick={() => shareToEmail(item)}
                                        className="w-full flex items-center gap-3 px-3 py-2.5 text-[12px] text-[#1B1613] hover:bg-[#F4EAE3]/50 transition-all"
                                      >
                                        <span className="w-4 h-4 rounded-full bg-[#8B6F47] flex items-center justify-center text-[8px] text-white font-bold">@</span>
                                        <span>Email</span>
                                      </button>

                                      {/* Native Share (mobile) */}
                                      {typeof navigator !== "undefined" && navigator.share && (
                                        <button
                                          onClick={() => nativeShare(item)}
                                          className="w-full flex items-center gap-3 px-3 py-2.5 text-[12px] text-[#1B1613] hover:bg-[#F4EAE3]/50 transition-all"
                                        >
                                          <Share2 size={14} strokeWidth={1.5} className="text-[#9a8d80]" />
                                          <span>More Options</span>
                                        </button>
                                      )}
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Continue Shopping */}
              <div className="mt-8 text-center">
                <Link
                  href="/all_products"
                  className="inline-flex items-center gap-2 text-[11px] tracking-wider uppercase text-[#9a8d80] hover:text-[#1B1613] transition-colors font-medium"
                >
                  <ArrowLeft size={14} strokeWidth={1.5} />
                  Continue Shopping
                </Link>
              </div>
            </div>
          )}
        </div>
      </motion.section>

      <Footer />
    </div>
  );
};

export default CartPage;