"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Save,
  AlertCircle,
  Info,
  DollarSign,
  Image as ImageIcon,
  Globe,
  Tag,
  Sparkles,
  Plus,
  X,
  Check,
  ExternalLink,
  Copy,
  Trash2,
  RefreshCw,
  Link2,
  Loader2,
  Package,
} from "lucide-react";

/* -------------------- PLATFORM OPTIONS -------------------- */
const platformOptions = [
  { name: "Amazon", color: "bg-orange-500", icon: "A", baseUrl: "https://amazon.com/" },
  { name: "Nykaa", color: "bg-pink-500", icon: "N", baseUrl: "https://nykaa.com/" },
  { name: "Flipkart", color: "bg-blue-500", icon: "F", baseUrl: "https://flipkart.com/" },
  { name: "Myntra", color: "bg-purple-500", icon: "M", baseUrl: "https://myntra.com/" },
  { name: "Alibaba", color: "bg-red-500", icon: "B", baseUrl: "https://alibaba.com/" },
  { name: "Tata Cliq", color: "bg-teal-500", icon: "T", baseUrl: "https://tatacliq.com/" },
  { name: "Ajio", color: "bg-yellow-500", icon: "A", baseUrl: "https://ajio.com/" },
  { name: "Shoppers Stop", color: "bg-indigo-500", icon: "S", baseUrl: "https://shoppersstop.com/" },
];

const categories = [
  "Skincare", "Haircare", "Makeup", "Fragrance", "Body Care",
  "Men's Grooming", "Tools & Accessories", "Wellness", "Gift Sets", "Travel Size",
  "Women", "Men", "Kids", "Best Sellers",
];

const subCategories = {
  Skincare: ["Serums", "Moisturizers", "Cleansers", "Toners", "Masks", "Eye Care", "Sunscreen", "Oils"],
  Haircare: ["Shampoo", "Conditioner", "Hair Oil", "Hair Mask", "Styling", "Treatments"],
  Makeup: ["Foundation", "Lipstick", "Eyeshadow", "Mascara", "Blush", "Concealer", "Primer"],
  Fragrance: ["Eau de Parfum", "Eau de Toilette", "Body Mist", "Perfume Oil"],
  "Body Care": ["Body Lotion", "Body Wash", "Scrubs", "Hand Cream", "Deodorant"],
  "Men's Grooming": ["Beard Care", "Shaving", "Face Care", "Body Care"],
  "Tools & Accessories": ["Brushes", "Sponges", "Applicators", "Storage"],
  Wellness: ["Supplements", "Aromatherapy", "Sleep Aid", "Stress Relief"],
  "Gift Sets": ["Skincare Sets", "Makeup Sets", "Fragrance Sets", "Discovery Sets"],
  "Travel Size": ["Mini Skincare", "Mini Makeup", "Travel Kits"],
};

/* -------------------- UPDATE PRODUCT PAGE -------------------- */
const UpdateProductPage = () => {
  const router = useRouter();
  const params = useParams();
  const productId = params.id;

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);

  const [formData, setFormData] = useState({
    productName: "",
    brand: "Lumière Beauty",
    category: "",
    subCategory: "",
    description: "",
    highlights: [],
    price: "",
    comparePrice: "",
    commission: "",
    commissionType: "percentage",
    currency: "INR",
    mainImageUrl: "",
    galleryImageUrls: [""],
    platforms: [],
    metaTitle: "",
    metaDescription: "",
    slug: "",
    tags: [],
    stockStatus: "in_stock",
    isFeatured: false,
    isBestSeller: false,
  });

  const [tagInput, setTagInput] = useState("");
  const [highlightInput, setHighlightInput] = useState("");
  const [originalData, setOriginalData] = useState(null);

  // Fetch product data from API
  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;
      
      setIsLoading(true);
      setApiError(null);

      try {
        const response = await fetch(`/api/product/${productId}`);
        const data = await response.json();

        if (data.success && data.data) {
          const product = data.data;
          
          // Map API data to form data
          const mappedData = {
            productName: product.productName || "",
            brand: product.brand || "Lumière Beauty",
            category: product.category || "",
            subCategory: product.subCategory || "",
            description: product.description || "",
            highlights: product.highlights || [],
            price: product.price?.toString() || "",
            comparePrice: product.comparePrice?.toString() || "",
            commission: product.commission?.toString() || "",
            commissionType: product.commissionType || "percentage",
            currency: product.currency || "INR",
            mainImageUrl: product.mainImage?.url || "",
            galleryImageUrls: product.galleryImages?.map(img => img.url) || [""],
            platforms: product.platforms || [],
            metaTitle: product.metaTitle || "",
            metaDescription: product.metaDescription || "",
            slug: product.slug || "",
            tags: product.tags || [],
            stockStatus: product.stockStatus || "in_stock",
            isFeatured: product.isFeatured || false,
            isBestSeller: product.isBestSeller || false,
            // Store original stats for display
            _clicks: product.clicks || 0,
            _conversions: product.conversions || 0,
            _revenue: product.revenue || 0,
            _displayRevenue: product.displayRevenue || "₹0",
            _status: product.status || "draft",
            _productId: product.productId || "",
          };

          setFormData(mappedData);
          setOriginalData(JSON.parse(JSON.stringify(mappedData)));
        } else {
          setApiError(data.message || "Product not found");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
        setApiError("Failed to load product. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  // Track changes
  useEffect(() => {
    if (originalData && formData) {
      // Compare only editable fields (ignore stats)
      const { _clicks, _conversions, _revenue, _displayRevenue, _status, _productId, ...editable } = formData;
      const { _clicks: oC, _conversions: oCo, _revenue: oR, _displayRevenue: oDR, _status: oS, _productId: oPI, ...origEditable } = originalData;
      const changed = JSON.stringify(editable) !== JSON.stringify(origEditable);
      setHasChanges(changed);
    }
  }, [formData, originalData]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // Gallery image URL handlers
  const addGalleryImageField = () => {
    setFormData((prev) => ({
      ...prev,
      galleryImageUrls: [...prev.galleryImageUrls, ""],
    }));
  };

  const updateGalleryImageUrl = (index, value) => {
    const updatedUrls = [...formData.galleryImageUrls];
    updatedUrls[index] = value;
    setFormData((prev) => ({ ...prev, galleryImageUrls: updatedUrls }));
  };

  const removeGalleryImageUrl = (index) => {
    setFormData((prev) => ({
      ...prev,
      galleryImageUrls: prev.galleryImageUrls.filter((_, i) => i !== index),
    }));
  };

  // Platform handlers
  const togglePlatform = (platformName) => {
    setFormData((prev) => {
      const existing = prev.platforms.find((p) => p.name === platformName);
      if (existing) {
        return { ...prev, platforms: prev.platforms.filter((p) => p.name !== platformName) };
      } else {
        const platformInfo = platformOptions.find((p) => p.name === platformName);
        return {
          ...prev,
          platforms: [...prev.platforms, {
            name: platformName,
            url: platformInfo?.baseUrl || "",
            affiliateId: "",
            active: true,
            icon: platformInfo?.icon || platformName[0],
            color: platformInfo?.color || "bg-gray-500",
          }],
        };
      }
    });
  };

  const updatePlatformUrl = (platformName, url) => {
    setFormData((prev) => ({
      ...prev,
      platforms: prev.platforms.map((p) => p.name === platformName ? { ...p, url } : p),
    }));
  };

  const updatePlatformAffiliateId = (platformName, affiliateId) => {
    setFormData((prev) => ({
      ...prev,
      platforms: prev.platforms.map((p) => p.name === platformName ? { ...p, affiliateId } : p),
    }));
  };

  const removePlatform = (platformName) => {
    setFormData((prev) => ({
      ...prev,
      platforms: prev.platforms.filter((p) => p.name !== platformName),
    }));
  };

  // Tag handlers
  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({ ...prev, tags: [...prev.tags, tagInput.trim()] }));
      setTagInput("");
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData((prev) => ({ ...prev, tags: prev.tags.filter((tag) => tag !== tagToRemove) }));
  };

  // Highlight handlers
  const addHighlight = () => {
    if (highlightInput.trim()) {
      setFormData((prev) => ({ ...prev, highlights: [...prev.highlights, highlightInput.trim()] }));
      setHighlightInput("");
    }
  };

  const removeHighlight = (index) => {
    setFormData((prev) => ({ ...prev, highlights: prev.highlights.filter((_, i) => i !== index) }));
  };

  // Generate slug
  const generateSlug = () => {
    const slug = formData.productName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    handleChange("slug", slug);
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.productName.trim()) newErrors.productName = "Product name is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.price || parseFloat(formData.price) <= 0) newErrors.price = "Valid price is required";
    if (!formData.commission || parseFloat(formData.commission) <= 0) newErrors.commission = "Commission is required";
    if (formData.platforms.length === 0) newErrors.platforms = "At least one platform is required";
    if (formData.platforms.some(p => !p.url.trim())) newErrors.platformUrls = "All platform URLs must be filled";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Prepare data for API
  const prepareSubmitData = () => {
    const galleryImages = formData.galleryImageUrls
      .filter(url => url.trim())
      .map(url => ({ url: url.trim(), altText: formData.productName }));

    return {
      productName: formData.productName,
      brand: formData.brand,
      category: formData.category,
      subCategory: formData.subCategory || undefined,
      description: formData.description,
      highlights: formData.highlights.filter(h => h.trim()),
      price: parseFloat(formData.price),
      comparePrice: formData.comparePrice ? parseFloat(formData.comparePrice) : null,
      commission: parseFloat(formData.commission),
      commissionType: formData.commissionType,
      currency: formData.currency,
      mainImage: formData.mainImageUrl.trim() ? {
        url: formData.mainImageUrl.trim(),
        altText: formData.productName,
      } : undefined,
      galleryImages,
      platforms: formData.platforms.map(p => ({
        name: p.name,
        url: p.url,
        affiliateId: p.affiliateId,
        active: p.active,
        icon: p.icon,
        color: p.color,
      })),
      metaTitle: formData.metaTitle || formData.productName,
      metaDescription: formData.metaDescription || formData.description?.substring(0, 160),
      slug: formData.slug,
      tags: formData.tags,
      stockStatus: formData.stockStatus,
      isFeatured: formData.isFeatured,
      isBestSeller: formData.isBestSeller,
    };
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    setApiError(null);

    try {
      const submitData = prepareSubmitData();
      
      const response = await fetch(`/api/product/${productId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submitData),
      });

      const data = await response.json();

      if (data.success) {
        setShowSuccess(true);
        setTimeout(() => router.push("/dashboard"), 2000);
      } else {
        setApiError(data.message || "Failed to update product");
        if (data.errors) {
          const fieldErrors = {};
          data.errors.forEach(err => { fieldErrors[err.field] = err.message; });
          setErrors(fieldErrors);
        }
      }
    } catch (error) {
      console.error("Error updating product:", error);
      setApiError("Failed to update product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F4EAE3]/30 flex items-center justify-center">
        <div className="text-center">
          <Loader2 size={40} strokeWidth={1.5} className="animate-spin text-[#8B6F47] mx-auto mb-4" />
          <p className="text-[13px] text-[#9a8d80]">Loading product details...</p>
        </div>
      </div>
    );
  }

  // Error State
  if (apiError && !formData.productName) {
    return (
      <div className="min-h-screen bg-[#F4EAE3]/30 flex items-center justify-center">
        <div className="text-center max-w-md bg-white border border-[#e5d8cf] p-12">
          <AlertCircle size={48} strokeWidth={1.5} className="text-red-400 mx-auto mb-4" />
          <h3 className="font-serif text-xl text-[#1B1613] mb-2">Error Loading Product</h3>
          <p className="text-[13px] text-[#9a8d80] mb-6">{apiError}</p>
          <button onClick={() => router.push("/dashboard")} className="inline-flex items-center gap-2 px-6 py-3 bg-[#8B6F47] text-white text-[11px] tracking-wider uppercase hover:bg-[#A6845F] transition-all font-medium">
            <ArrowLeft size={14} />Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4EAE3]/30">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-[#e5d8cf]">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="flex items-center gap-2 text-[#9a8d80] hover:text-[#1B1613] transition-colors">
              <ArrowLeft size={18} strokeWidth={1.5} />
              <span className="text-[11px] tracking-wider uppercase font-medium">Back</span>
            </Link>
            <div className="w-px h-5 bg-[#e5d8cf]" />
            <div className="flex items-center gap-2">
              <Sparkles size={14} strokeWidth={1.5} className="text-[#8B6F47]" />
              <h1 className="font-serif text-lg text-[#1B1613]">Edit Product</h1>
              <span className="text-[11px] text-[#9a8d80]">| {formData._productId || productId}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {hasChanges && (
              <span className="text-[10px] text-[#9a8d80] flex items-center gap-1">
                <RefreshCw size={10} />Unsaved changes
              </span>
            )}
            <button
              onClick={() => router.push("/dashboard")}
              className="px-4 py-2 text-[11px] tracking-wider uppercase text-[#9a8d80] hover:text-[#1B1613] transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !hasChanges}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#8B6F47] text-white text-[11px] tracking-wider uppercase hover:bg-[#A6845F] transition-all duration-300 font-medium shadow-lg shadow-[#8B6F47]/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <><Loader2 size={14} strokeWidth={1.5} className="animate-spin" />Updating...</>
              ) : (
                <><Save size={14} strokeWidth={1.5} />Update Product</>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* API Error */}
      {apiError && (
        <div className="max-w-5xl mx-auto px-6 pt-4">
          <div className="p-4 bg-red-50 border border-red-200 flex items-center gap-3">
            <AlertCircle size={18} strokeWidth={1.5} className="text-red-500 shrink-0" />
            <p className="text-[12px] text-red-600">{apiError}</p>
          </div>
        </div>
      )}

      {/* Product Stats Bar */}
      <div className="max-w-5xl mx-auto px-6 py-4">
        <div className="bg-white border border-[#e5d8cf] p-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-[10px] text-[#9a8d80] uppercase tracking-wider">Status</p>
              <span className="inline-flex items-center gap-1.5 mt-1">
                <span className={`w-1.5 h-1.5 rounded-full ${formData._status === "active" ? "bg-green-500" : "bg-yellow-500"}`} />
                <span className="text-[12px] font-medium">{formData._status === "active" ? "Active" : formData._status}</span>
              </span>
            </div>
            <div>
              <p className="text-[10px] text-[#9a8d80] uppercase tracking-wider">Total Clicks</p>
              <p className="text-[13px] font-medium text-[#1B1613] mt-1">{formData._clicks?.toLocaleString() || "0"}</p>
            </div>
            <div>
              <p className="text-[10px] text-[#9a8d80] uppercase tracking-wider">Conversions</p>
              <p className="text-[13px] font-medium text-[#1B1613] mt-1">{formData._conversions || "0"}</p>
            </div>
            <div>
              <p className="text-[10px] text-[#9a8d80] uppercase tracking-wider">Revenue</p>
              <p className="text-[13px] font-medium text-[#1B1613] mt-1">{formData._displayRevenue || "₹0"}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Form */}
      <div className="max-w-5xl mx-auto px-6 pb-8">
        {/* Tab Navigation */}
        <div className="flex gap-1 mb-8 bg-white border border-[#e5d8cf] p-1 overflow-x-auto">
          {[
            { id: "basic", label: "Basic Info", icon: Info },
            { id: "pricing", label: "Pricing", icon: DollarSign },
            { id: "images", label: "Images", icon: ImageIcon },
            { id: "platforms", label: "Platforms", icon: Globe },
            { id: "seo", label: "SEO", icon: Tag },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-[11px] tracking-wider uppercase transition-all duration-300 font-medium whitespace-nowrap ${
                activeTab === tab.id ? "bg-[#8B6F47] text-white" : "text-[#9a8d80] hover:text-[#1B1613] hover:bg-[#F4EAE3]/30"
              }`}
            >
              <tab.icon size={14} strokeWidth={1.5} />{tab.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <AnimatePresence mode="wait">
            {/* BASIC INFO TAB */}
            {activeTab === "basic" && (
              <motion.div key="basic" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                <div className="bg-white border border-[#e5d8cf] p-6">
                  <label className="block text-[10px] tracking-wider uppercase text-[#9a8d80] font-medium mb-2">Product Name *</label>
                  <input type="text" value={formData.productName} onChange={(e) => handleChange("productName", e.target.value)} className={`w-full px-4 py-3 border text-[13px] focus:outline-none focus:border-[#8B6F47] transition-all ${errors.productName ? "border-red-300" : "border-[#e5d8cf]"}`} />
                  {errors.productName && <p className="text-[11px] text-red-500 mt-1"><AlertCircle size={12} className="inline mr-1" />{errors.productName}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white border border-[#e5d8cf] p-6">
                    <label className="block text-[10px] tracking-wider uppercase text-[#9a8d80] font-medium mb-2">Brand</label>
                    <input type="text" value={formData.brand} onChange={(e) => handleChange("brand", e.target.value)} className="w-full px-4 py-3 border border-[#e5d8cf] text-[13px] focus:outline-none focus:border-[#8B6F47] transition-all" />
                  </div>
                  <div className="bg-white border border-[#e5d8cf] p-6">
                    <label className="block text-[10px] tracking-wider uppercase text-[#9a8d80] font-medium mb-2">Category *</label>
                    <select value={formData.category} onChange={(e) => handleChange("category", e.target.value)} className={`w-full px-4 py-3 border text-[13px] focus:outline-none focus:border-[#8B6F47] cursor-pointer transition-all ${errors.category ? "border-red-300" : "border-[#e5d8cf]"}`}>
                      <option value="">Select category</option>
                      {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                  </div>
                </div>

                {formData.category && subCategories[formData.category] && (
                  <div className="bg-white border border-[#e5d8cf] p-6">
                    <label className="block text-[10px] tracking-wider uppercase text-[#9a8d80] font-medium mb-2">Sub Category</label>
                    <select value={formData.subCategory} onChange={(e) => handleChange("subCategory", e.target.value)} className="w-full px-4 py-3 border border-[#e5d8cf] text-[13px] focus:outline-none focus:border-[#8B6F47] cursor-pointer transition-all">
                      <option value="">Select sub category</option>
                      {subCategories[formData.category]?.map((sub) => <option key={sub} value={sub}>{sub}</option>)}
                    </select>
                  </div>
                )}

                <div className="bg-white border border-[#e5d8cf] p-6">
                  <label className="block text-[10px] tracking-wider uppercase text-[#9a8d80] font-medium mb-2">Description *</label>
                  <textarea value={formData.description} onChange={(e) => handleChange("description", e.target.value)} rows={5} className="w-full px-4 py-3 border border-[#e5d8cf] text-[13px] focus:outline-none focus:border-[#8B6F47] transition-all resize-none" />
                </div>

                <div className="bg-white border border-[#e5d8cf] p-6">
                  <label className="block text-[10px] tracking-wider uppercase text-[#9a8d80] font-medium mb-3">Product Highlights</label>
                  <div className="space-y-2 mb-4">
                    {formData.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <span className="text-[#8B6F47]">•</span>
                        <span className="flex-1 text-[13px] text-[#1B1613]">{highlight}</span>
                        <button type="button" onClick={() => removeHighlight(index)} className="text-[#9a8d80] hover:text-red-500"><X size={14} /></button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input type="text" value={highlightInput} onChange={(e) => setHighlightInput(e.target.value)} onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addHighlight())} placeholder="Add a highlight..." className="flex-1 px-4 py-2.5 border border-[#e5d8cf] text-[13px] focus:outline-none focus:border-[#8B6F47]" />
                    <button type="button" onClick={addHighlight} className="px-4 py-2.5 border border-[#e5d8cf] text-[11px] uppercase text-[#9a8d80] hover:text-[#1B1613]">Add</button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* PRICING TAB */}
            {activeTab === "pricing" && (
              <motion.div key="pricing" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                <div className="bg-white border border-[#e5d8cf] p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] tracking-wider uppercase text-[#9a8d80] font-medium mb-2">Price (₹) *</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[13px] text-[#9a8d80]">₹</span>
                        <input type="number" value={formData.price} onChange={(e) => handleChange("price", e.target.value)} className={`w-full pl-10 pr-4 py-3 border text-[13px] focus:outline-none focus:border-[#8B6F47] ${errors.price ? "border-red-300" : "border-[#e5d8cf]"}`} />
                      </div>
                      {errors.price && <p className="text-[11px] text-red-500 mt-1"><AlertCircle size={12} className="inline mr-1" />{errors.price}</p>}
                    </div>
                    <div>
                      <label className="block text-[10px] tracking-wider uppercase text-[#9a8d80] font-medium mb-2">Compare Price (MRP)</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[13px] text-[#9a8d80]">₹</span>
                        <input type="number" value={formData.comparePrice} onChange={(e) => handleChange("comparePrice", e.target.value)} className="w-full pl-10 pr-4 py-3 border border-[#e5d8cf] text-[13px] focus:outline-none focus:border-[#8B6F47]" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-[#e5d8cf] p-6">
                  <label className="block text-[10px] tracking-wider uppercase text-[#9a8d80] font-medium mb-2">Commission *</label>
                  <div>
                    <div className="flex gap-4 mb-3">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" checked={formData.commissionType === "percentage"} onChange={() => handleChange("commissionType", "percentage")} className="accent-[#8B6F47]" />
                        <span className="text-[12px]">Percentage (%)</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" checked={formData.commissionType === "fixed"} onChange={() => handleChange("commissionType", "fixed")} className="accent-[#8B6F47]" />
                        <span className="text-[12px]">Fixed (₹)</span>
                      </label>
                    </div>
                    <div className="relative max-w-xs">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[13px] text-[#9a8d80]">{formData.commissionType === "percentage" ? "%" : "₹"}</span>
                      <input type="number" value={formData.commission} onChange={(e) => handleChange("commission", e.target.value)} className={`w-full pl-10 pr-4 py-3 border text-[13px] focus:outline-none focus:border-[#8B6F47] ${errors.commission ? "border-red-300" : "border-[#e5d8cf]"}`} />
                    </div>
                    {errors.commission && <p className="text-[11px] text-red-500 mt-1"><AlertCircle size={12} className="inline mr-1" />{errors.commission}</p>}
                  </div>
                </div>
              </motion.div>
            )}

            {/* IMAGES TAB */}
            {activeTab === "images" && (
              <motion.div key="images" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                <div className="bg-white border border-[#e5d8cf] p-6">
                  <label className="block text-[10px] tracking-wider uppercase text-[#9a8d80] font-medium mb-2">Main Product Image URL</label>
                  <div className="relative">
                    <Link2 size={16} strokeWidth={1.5} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9a8d80]" />
                    <input type="url" value={formData.mainImageUrl} onChange={(e) => handleChange("mainImageUrl", e.target.value)} placeholder="https://example.com/image.jpg" className="w-full pl-12 pr-4 py-3 border border-[#e5d8cf] text-[13px] focus:outline-none focus:border-[#8B6F47] transition-all" />
                  </div>
                  {formData.mainImageUrl && (
                    <div className="mt-4 w-40 h-40 bg-[#F4EAE3]/30 border border-[#e5d8cf] overflow-hidden">
                      <img src={formData.mainImageUrl} alt="Preview" className="w-full h-full object-cover" onError={(e) => { e.target.style.display = "none"; }} />
                    </div>
                  )}
                </div>

                <div className="bg-white border border-[#e5d8cf] p-6">
                  <div className="flex items-center justify-between mb-4">
                    <label className="block text-[10px] tracking-wider uppercase text-[#9a8d80] font-medium">Gallery Image URLs</label>
                    <button type="button" onClick={addGalleryImageField} className="flex items-center gap-1.5 text-[10px] tracking-wider uppercase text-[#8B6F47] hover:text-[#1B1613] transition-colors font-medium">
                      <Plus size={14} />Add Image
                    </button>
                  </div>
                  <div className="space-y-3">
                    {formData.galleryImageUrls.map((url, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="flex-1">
                          <input type="url" value={url} onChange={(e) => updateGalleryImageUrl(index, e.target.value)} placeholder={`Gallery image ${index + 1} URL`} className="w-full px-4 py-3 border border-[#e5d8cf] text-[13px] focus:outline-none focus:border-[#8B6F47] transition-all" />
                          {url && (
                            <div className="mt-2 w-20 h-20 bg-[#F4EAE3]/30 border border-[#e5d8cf] overflow-hidden inline-block">
                              <img src={url} alt={`Gallery ${index + 1}`} className="w-full h-full object-cover" onError={(e) => { e.target.style.display = "none"; }} />
                            </div>
                          )}
                        </div>
                        {formData.galleryImageUrls.length > 1 && (
                          <button type="button" onClick={() => removeGalleryImageUrl(index)} className="mt-3 p-2 text-[#9a8d80] hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* PLATFORMS TAB */}
            {activeTab === "platforms" && (
              <motion.div key="platforms" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                <div className="bg-white border border-[#e5d8cf] p-6">
                  <label className="block text-[10px] tracking-wider uppercase text-[#9a8d80] font-medium mb-4">Affiliate Platforms *</label>
                  {errors.platforms && <p className="text-[11px] text-red-500 mb-3"><AlertCircle size={12} className="inline mr-1" />{errors.platforms}</p>}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
                    {platformOptions.map((platform) => {
                      const isSelected = formData.platforms.some((p) => p.name === platform.name);
                      return (
                        <button key={platform.name} type="button" onClick={() => togglePlatform(platform.name)} className={`flex items-center gap-3 p-4 border-2 transition-all ${isSelected ? "border-[#8B6F47] bg-[#8B6F47]/5" : "border-[#e5d8cf] hover:border-[#8B6F47]/50"}`}>
                          <span className={`w-10 h-10 rounded-full ${platform.color} flex items-center justify-center text-sm text-white font-bold`}>{platform.icon}</span>
                          <span className="text-[12px] font-medium">{platform.name}</span>
                          {isSelected && <Check size={16} className="text-[#8B6F47] ml-auto" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {formData.platforms.map((platform) => (
                  <div key={platform.name} className="bg-white border border-[#e5d8cf] p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <span className={`w-8 h-8 rounded-full ${platform.color} flex items-center justify-center text-xs text-white font-bold`}>{platform.icon}</span>
                        <p className="text-[12px] font-medium">{platform.name}</p>
                      </div>
                      <button type="button" onClick={() => removePlatform(platform.name)} className="text-[#9a8d80] hover:text-red-500"><Trash2 size={16} /></button>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-[9px] uppercase text-[#9a8d80] mb-1">Affiliate URL *</label>
                        <div className="flex gap-2">
                          <input type="url" value={platform.url} onChange={(e) => updatePlatformUrl(platform.name, e.target.value)} className="flex-1 px-3 py-2.5 border border-[#e5d8cf] text-[12px] focus:outline-none focus:border-[#8B6F47]" />
                          <button type="button" onClick={() => window.open(platform.url, "_blank")} className="px-3 py-2.5 border border-[#e5d8cf] text-[#9a8d80] hover:text-[#1B1613]" title="Test URL"><ExternalLink size={14} /></button>
                          <button type="button" onClick={() => navigator.clipboard.writeText(platform.url)} className="px-3 py-2.5 border border-[#e5d8cf] text-[#9a8d80] hover:text-[#1B1613]" title="Copy URL"><Copy size={14} /></button>
                        </div>
                      </div>
                      <div>
                        <label className="block text-[9px] uppercase text-[#9a8d80] mb-1">Affiliate ID</label>
                        <input type="text" value={platform.affiliateId} onChange={(e) => updatePlatformAffiliateId(platform.name, e.target.value)} className="w-full px-3 py-2.5 border border-[#e5d8cf] text-[12px] focus:outline-none focus:border-[#8B6F47]" />
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {/* SEO TAB */}
            {activeTab === "seo" && (
              <motion.div key="seo" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="space-y-6">
                <div className="bg-white border border-[#e5d8cf] p-6">
                  <label className="block text-[10px] uppercase text-[#9a8d80] font-medium mb-2">Meta Title</label>
                  <input type="text" value={formData.metaTitle} onChange={(e) => handleChange("metaTitle", e.target.value)} className="w-full px-4 py-3 border border-[#e5d8cf] text-[13px] focus:outline-none focus:border-[#8B6F47]" />
                </div>
                <div className="bg-white border border-[#e5d8cf] p-6">
                  <label className="block text-[10px] uppercase text-[#9a8d80] font-medium mb-2">Meta Description</label>
                  <textarea value={formData.metaDescription} onChange={(e) => handleChange("metaDescription", e.target.value)} rows={3} className="w-full px-4 py-3 border border-[#e5d8cf] text-[13px] focus:outline-none focus:border-[#8B6F47] resize-none" />
                </div>
                <div className="bg-white border border-[#e5d8cf] p-6">
                  <label className="block text-[10px] uppercase text-[#9a8d80] font-medium mb-2">URL Slug</label>
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] text-[#9a8d80]">/product/</span>
                    <input type="text" value={formData.slug} onChange={(e) => handleChange("slug", e.target.value)} className="flex-1 px-4 py-3 border border-[#e5d8cf] text-[13px] focus:outline-none focus:border-[#8B6F47]" />
                    <button type="button" onClick={generateSlug} className="px-4 py-3 text-[11px] uppercase text-[#9a8d80] hover:text-[#1B1613] border border-[#e5d8cf] hover:bg-[#F4EAE3] transition-all">Generate</button>
                  </div>
                </div>
                <div className="bg-white border border-[#e5d8cf] p-6">
                  <label className="block text-[10px] uppercase text-[#9a8d80] font-medium mb-3">Tags</label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {formData.tags.map((tag) => (
                      <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F4EAE3]/50 border border-[#e5d8cf] text-[11px]">
                        {tag}
                        <button type="button" onClick={() => removeTag(tag)} className="text-[#9a8d80] hover:text-red-500"><X size={12} /></button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input type="text" value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())} placeholder="Add a tag..." className="flex-1 px-4 py-2.5 border border-[#e5d8cf] text-[13px] focus:outline-none focus:border-[#8B6F47]" />
                    <button type="button" onClick={addTag} className="px-4 py-2.5 border border-[#e5d8cf] text-[11px] uppercase text-[#9a8d80]">Add</button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom Actions */}
          <div className="mt-8 bg-white border border-[#e5d8cf] p-4 flex items-center justify-between sticky bottom-0">
            <button type="button" onClick={() => router.push("/dashboard")} className="px-6 py-2.5 text-[11px] uppercase text-[#9a8d80] hover:text-[#1B1613]">Cancel</button>
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={isSubmitting || !hasChanges}
              className="flex items-center gap-2 px-8 py-3 bg-[#8B6F47] text-white text-[11px] uppercase hover:bg-[#A6845F] transition-all font-medium shadow-lg disabled:opacity-50"
            >
              {isSubmitting ? (
                <><Loader2 size={15} strokeWidth={1.5} className="animate-spin" />Updating...</>
              ) : (
                <><Save size={15} />Update Product</>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white p-8 shadow-2xl text-center max-w-md">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <Check size={32} className="text-green-600" />
              </div>
              <h3 className="font-serif text-xl mb-2">Product Updated!</h3>
              <p className="text-[13px] text-[#9a8d80] mb-6">Changes saved successfully. Redirecting to dashboard...</p>
              <div className="w-full bg-gray-100 h-1 overflow-hidden">
                <motion.div initial={{ width: "100%" }} animate={{ width: "0%" }} transition={{ duration: 2 }} className="h-full bg-[#8B6F47]" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UpdateProductPage;