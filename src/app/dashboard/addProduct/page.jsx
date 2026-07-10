// // app/dashboard/products/add/page.jsx
// "use client";

// import React, { useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import Image from "next/image";
// import { motion, AnimatePresence } from "framer-motion";
// import {
//   ArrowLeft,
//   Plus,
//   X,
//   Check,
//   Upload,
//   Link2,
//   Globe,
//   ExternalLink,
//   Save,
//   Eye,
//   AlertCircle,
//   Info,
//   Image as ImageIcon,
//   Tag,
//   DollarSign,
//   Percent,
//   Package,
//   Sparkles,
//   ChevronDown,
//   Trash2,
//   Copy,
// } from "lucide-react";

// /* -------------------- PLATFORM OPTIONS -------------------- */
// const platformOptions = [
//   { 
//     name: "Amazon", 
//     color: "bg-orange-500", 
//     icon: "A",
//     baseUrl: "https://amazon.com/",
//     description: "World's largest e-commerce marketplace",
//     commissionRange: "2-10%",
//   },
//   { 
//     name: "Nykaa", 
//     color: "bg-pink-500", 
//     icon: "N",
//     baseUrl: "https://nykaa.com/",
//     description: "India's leading beauty retailer",
//     commissionRange: "5-15%",
//   },
//   { 
//     name: "Flipkart", 
//     color: "bg-blue-500", 
//     icon: "F",
//     baseUrl: "https://flipkart.com/",
//     description: "Major Indian e-commerce platform",
//     commissionRange: "3-12%",
//   },
//   { 
//     name: "Myntra", 
//     color: "bg-purple-500", 
//     icon: "M",
//     baseUrl: "https://myntra.com/",
//     description: "Fashion and beauty destination",
//     commissionRange: "5-15%",
//   },
//   { 
//     name: "Alibaba", 
//     color: "bg-red-500", 
//     icon: "B",
//     baseUrl: "https://alibaba.com/",
//     description: "Global wholesale marketplace",
//     commissionRange: "1-8%",
//   },
//   { 
//     name: "Tata Cliq", 
//     color: "bg-teal-500", 
//     icon: "T",
//     baseUrl: "https://tatacliq.com/",
//     description: "Premium Indian e-commerce",
//     commissionRange: "4-12%",
//   },
//   { 
//     name: "Ajio", 
//     color: "bg-yellow-500", 
//     icon: "A",
//     baseUrl: "https://ajio.com/",
//     description: "Trendy fashion and beauty",
//     commissionRange: "5-12%",
//   },
//   { 
//     name: "Shoppers Stop", 
//     color: "bg-indigo-500", 
//     icon: "S",
//     baseUrl: "https://shoppersstop.com/",
//     description: "Premium department store",
//     commissionRange: "5-10%",
//   },
// ];

// const categories = [
//   "Skincare",
//   "Haircare",
//   "Makeup",
//   "Fragrance",
//   "Body Care",
//   "Men's Grooming",
//   "Tools & Accessories",
//   "Wellness",
//   "Gift Sets",
//   "Travel Size",
// ];

// const subCategories = {
//   Skincare: ["Serums", "Moisturizers", "Cleansers", "Toners", "Masks", "Eye Care", "Sunscreen", "Oils"],
//   Haircare: ["Shampoo", "Conditioner", "Hair Oil", "Hair Mask", "Styling", "Treatments"],
//   Makeup: ["Foundation", "Lipstick", "Eyeshadow", "Mascara", "Blush", "Concealer", "Primer"],
//   Fragrance: ["Eau de Parfum", "Eau de Toilette", "Body Mist", "Perfume Oil"],
//   "Body Care": ["Body Lotion", "Body Wash", "Scrubs", "Hand Cream", "Deodorant"],
//   "Men's Grooming": ["Beard Care", "Shaving", "Face Care", "Body Care"],
//   "Tools & Accessories": ["Brushes", "Sponges", "Applicators", "Storage"],
//   Wellness: ["Supplements", "Aromatherapy", "Sleep Aid", "Stress Relief"],
//   "Gift Sets": ["Skincare Sets", "Makeup Sets", "Fragrance Sets", "Discovery Sets"],
//   "Travel Size": ["Mini Skincare", "Mini Makeup", "Travel Kits"],
// };

// /* -------------------- MONOGRAM LOGO -------------------- */
// const Monogram = ({ className = "" }) => (
//   <svg
//     width="28"
//     height="28"
//     viewBox="0 0 40 40"
//     fill="none"
//     xmlns="http://www.w3.org/2000/svg"
//     aria-hidden="true"
//     className={className}
//   >
//     <path d="M9 8V32H24" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
//     <path d="M31 8V32H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" />
//     <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="1.2" opacity="0.3" />
//   </svg>
// );

// /* -------------------- MAIN COMPONENT -------------------- */
// const AddProductPage = () => {
//   const router = useRouter();
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showSuccess, setShowSuccess] = useState(false);
//   const [activeTab, setActiveTab] = useState("basic");
//   const [errors, setErrors] = useState({});

//   // Form State
//   const [formData, setFormData] = useState({
//     // Basic Information
//     productName: "",
//     brand: "Lumière Beauty",
//     category: "",
//     subCategory: "",
//     description: "",
//     highlights: [""],
    
//     // Pricing & Commission
//     price: "",
//     comparePrice: "",
//     commission: "",
//     commissionType: "percentage", // percentage or fixed
//     currency: "INR",
    
//     // Images
//     mainImage: null,
//     mainImagePreview: null,
//     galleryImages: [],
//     galleryPreviews: [],
    
//     // Affiliate Platforms
//     platforms: [],
    
//     // SEO & Meta
//     metaTitle: "",
//     metaDescription: "",
//     slug: "",
//     tags: [],
    
//     // Additional
//     stockStatus: "in_stock", // in_stock, out_of_stock, coming_soon
//     isFeatured: false,
//     isBestSeller: false,
//     weight: "",
//     dimensions: "",
//     sku: "",
//     notes: "",
//   });

//   // Tag input state
//   const [tagInput, setTagInput] = useState("");
//   const [highlightInput, setHighlightInput] = useState("");

//   /* -------------------- FORM HANDLERS -------------------- */

//   const handleChange = (field, value) => {
//     setFormData((prev) => ({ ...prev, [field]: value }));
//     // Clear error for this field
//     if (errors[field]) {
//       setErrors((prev) => {
//         const newErrors = { ...prev };
//         delete newErrors[field];
//         return newErrors;
//       });
//     }
//   };

//   // Handle Main Image Upload
//   const handleMainImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setFormData((prev) => ({
//           ...prev,
//           mainImage: file,
//           mainImagePreview: reader.result,
//         }));
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   // Handle Gallery Images Upload
//   const handleGalleryUpload = (e) => {
//     const files = Array.from(e.target.files);
//     const newPreviews = [];
    
//     files.forEach((file) => {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         newPreviews.push(reader.result);
//         if (newPreviews.length === files.length) {
//           setFormData((prev) => ({
//             ...prev,
//             galleryImages: [...prev.galleryImages, ...files],
//             galleryPreviews: [...prev.galleryPreviews, ...newPreviews],
//           }));
//         }
//       };
//       reader.readAsDataURL(file);
//     });
//   };

//   // Remove Gallery Image
//   const removeGalleryImage = (index) => {
//     setFormData((prev) => ({
//       ...prev,
//       galleryImages: prev.galleryImages.filter((_, i) => i !== index),
//       galleryPreviews: prev.galleryPreviews.filter((_, i) => i !== index),
//     }));
//   };

//   // Toggle Platform
//   const togglePlatform = (platformName) => {
//     setFormData((prev) => {
//       const existing = prev.platforms.find((p) => p.name === platformName);
//       if (existing) {
//         return {
//           ...prev,
//           platforms: prev.platforms.filter((p) => p.name !== platformName),
//         };
//       } else {
//         const platformInfo = platformOptions.find((p) => p.name === platformName);
//         return {
//           ...prev,
//           platforms: [
//             ...prev.platforms,
//             {
//               name: platformName,
//               url: platformInfo?.baseUrl || "",
//               affiliateId: "",
//               active: true,
//               icon: platformInfo?.icon || platformName[0],
//               color: platformInfo?.color || "bg-gray-500",
//             },
//           ],
//         };
//       }
//     });
//   };

//   // Update Platform URL
//   const updatePlatformUrl = (platformName, url) => {
//     setFormData((prev) => ({
//       ...prev,
//       platforms: prev.platforms.map((p) =>
//         p.name === platformName ? { ...p, url } : p
//       ),
//     }));
//   };

//   // Update Platform Affiliate ID
//   const updatePlatformAffiliateId = (platformName, affiliateId) => {
//     setFormData((prev) => ({
//       ...prev,
//       platforms: prev.platforms.map((p) =>
//         p.name === platformName ? { ...p, affiliateId } : p
//       ),
//     }));
//   };

//   // Remove Platform
//   const removePlatform = (platformName) => {
//     setFormData((prev) => ({
//       ...prev,
//       platforms: prev.platforms.filter((p) => p.name !== platformName),
//     }));
//   };

//   // Add Tag
//   const addTag = () => {
//     if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
//       setFormData((prev) => ({
//         ...prev,
//         tags: [...prev.tags, tagInput.trim()],
//       }));
//       setTagInput("");
//     }
//   };

//   // Remove Tag
//   const removeTag = (tagToRemove) => {
//     setFormData((prev) => ({
//       ...prev,
//       tags: prev.tags.filter((tag) => tag !== tagToRemove),
//     }));
//   };

//   // Add Highlight
//   const addHighlight = () => {
//     if (highlightInput.trim()) {
//       setFormData((prev) => ({
//         ...prev,
//         highlights: [...prev.highlights, highlightInput.trim()],
//       }));
//       setHighlightInput("");
//     }
//   };

//   // Remove Highlight
//   const removeHighlight = (index) => {
//     setFormData((prev) => ({
//       ...prev,
//       highlights: prev.highlights.filter((_, i) => i !== index),
//     }));
//   };

//   // Generate Slug from Product Name
//   const generateSlug = () => {
//     const slug = formData.productName
//       .toLowerCase()
//       .replace(/[^a-z0-9]+/g, "-")
//       .replace(/^-|-$/g, "");
//     handleChange("slug", slug);
//   };

//   // Validate Form
//   const validateForm = () => {
//     const newErrors = {};
    
//     if (!formData.productName.trim()) newErrors.productName = "Product name is required";
//     if (!formData.category) newErrors.category = "Category is required";
//     if (!formData.price || parseFloat(formData.price) <= 0) newErrors.price = "Valid price is required";
//     if (!formData.commission || parseFloat(formData.commission) <= 0) newErrors.commission = "Commission is required";
//     if (formData.platforms.length === 0) newErrors.platforms = "At least one platform is required";
//     if (formData.platforms.some(p => !p.url.trim())) newErrors.platformUrls = "All platform URLs must be filled";
//     if (!formData.mainImage) newErrors.mainImage = "Product image is required";
//     if (!formData.description.trim()) newErrors.description = "Description is required";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   // Handle Submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!validateForm()) return;

//     setIsSubmitting(true);

//     // Simulate API call
//     try {
//       // Here you would send the data to your backend API
//       // const response = await fetch('/api/products', {
//       //   method: 'POST',
//       //   headers: { 'Content-Type': 'application/json' },
//       //   body: JSON.stringify(formData),
//       // });

//       await new Promise((resolve) => setTimeout(resolve, 1500));

//       setShowSuccess(true);
      
//       // Redirect after success
//       setTimeout(() => {
//         router.push("/dashboard");
//       }, 2000);
//     } catch (error) {
//       console.error("Error adding product:", error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Auto-generate slug when product name changes
//   React.useEffect(() => {
//     if (formData.productName) {
//       generateSlug();
//     }
//   }, [formData.productName]);

//   return (
//     <div className="min-h-screen bg-[#F4EAE3]/30">
//       {/* Header */}
//       <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-[#e5d8cf]">
//         <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
//           <div className="flex items-center gap-4">
//             <Link
//               href="/dashboard"
//               className="flex items-center gap-2 text-[#9a8d80] hover:text-[#1B1613] transition-colors"
//             >
//               <ArrowLeft size={18} strokeWidth={1.5} />
//               <span className="text-[11px] tracking-wider uppercase font-medium">Back</span>
//             </Link>
//             <div className="w-px h-5 bg-[#e5d8cf]" />
//             <div className="flex items-center gap-2">
//               <Sparkles size={14} strokeWidth={1.5} className="text-[#8B6F47]" />
//               <h1 className="font-serif text-lg text-[#1B1613]">Add New Product</h1>
//             </div>
//           </div>
//           <div className="flex items-center gap-3">
//             <button
//               onClick={() => router.push("/dashboard")}
//               className="px-4 py-2 text-[11px] tracking-wider uppercase text-[#9a8d80] hover:text-[#1B1613] transition-colors font-medium"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={handleSubmit}
//               disabled={isSubmitting}
//               className="flex items-center gap-2 px-6 py-2.5 bg-[#8B6F47] text-white text-[11px] tracking-wider uppercase hover:bg-[#A6845F] transition-all duration-300 font-medium shadow-lg shadow-[#8B6F47]/20 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {isSubmitting ? (
//                 <>
//                   <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                   Saving...
//                 </>
//               ) : (
//                 <>
//                   <Save size={14} strokeWidth={1.5} />
//                   Save Product
//                 </>
//               )}
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <div className="max-w-5xl mx-auto px-6 py-8">
//         {/* Tab Navigation */}
//         <div className="flex gap-1 mb-8 bg-white border border-[#e5d8cf] p-1">
//           {[
//             { id: "basic", label: "Basic Info", icon: Info },
//             { id: "pricing", label: "Pricing & Commission", icon: DollarSign },
//             { id: "images", label: "Images", icon: ImageIcon },
//             { id: "platforms", label: "Affiliate Platforms", icon: Globe },
//             { id: "seo", label: "SEO & Meta", icon: Tag },
//           ].map((tab) => (
//             <button
//               key={tab.id}
//               onClick={() => setActiveTab(tab.id)}
//               className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-[11px] tracking-wider uppercase transition-all duration-300 font-medium ${
//                 activeTab === tab.id
//                   ? "bg-[#8B6F47] text-white"
//                   : "text-[#9a8d80] hover:text-[#1B1613] hover:bg-[#F4EAE3]/30"
//               }`}
//             >
//               <tab.icon size={14} strokeWidth={1.5} />
//               {tab.label}
//             </button>
//           ))}
//         </div>

//         <form onSubmit={handleSubmit}>
//           {/* ========== BASIC INFO TAB ========== */}
//           <AnimatePresence mode="wait">
//             {activeTab === "basic" && (
//               <motion.div
//                 key="basic"
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -10 }}
//                 className="space-y-6"
//               >
//                 {/* Product Name */}
//                 <div className="bg-white border border-[#e5d8cf] p-6">
//                   <label className="block text-[10px] tracking-wider uppercase text-[#9a8d80] font-medium mb-2">
//                     Product Name *
//                   </label>
//                   <input
//                     type="text"
//                     value={formData.productName}
//                     onChange={(e) => handleChange("productName", e.target.value)}
//                     placeholder="e.g., Radiance Renewal Serum 50ml"
//                     className={`w-full px-4 py-3 border text-[13px] text-[#1B1613] placeholder:text-[#9a8d80] focus:outline-none focus:border-[#8B6F47] transition-all duration-300 ${
//                       errors.productName ? "border-red-300" : "border-[#e5d8cf]"
//                     }`}
//                   />
//                   {errors.productName && (
//                     <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
//                       <AlertCircle size={12} /> {errors.productName}
//                     </p>
//                   )}
//                 </div>

//                 {/* Brand & Category Row */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div className="bg-white border border-[#e5d8cf] p-6">
//                     <label className="block text-[10px] tracking-wider uppercase text-[#9a8d80] font-medium mb-2">
//                       Brand
//                     </label>
//                     <input
//                       type="text"
//                       value={formData.brand}
//                       onChange={(e) => handleChange("brand", e.target.value)}
//                       className="w-full px-4 py-3 border border-[#e5d8cf] text-[13px] text-[#1B1613] focus:outline-none focus:border-[#8B6F47] transition-all duration-300"
//                     />
//                   </div>
//                   <div className="bg-white border border-[#e5d8cf] p-6">
//                     <label className="block text-[10px] tracking-wider uppercase text-[#9a8d80] font-medium mb-2">
//                       Category *
//                     </label>
//                     <select
//                       value={formData.category}
//                       onChange={(e) => handleChange("category", e.target.value)}
//                       className={`w-full px-4 py-3 border text-[13px] text-[#1B1613] focus:outline-none focus:border-[#8B6F47] transition-all duration-300 cursor-pointer ${
//                         errors.category ? "border-red-300" : "border-[#e5d8cf]"
//                       }`}
//                     >
//                       <option value="">Select category</option>
//                       {categories.map((cat) => (
//                         <option key={cat} value={cat}>{cat}</option>
//                       ))}
//                     </select>
//                     {errors.category && (
//                       <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
//                         <AlertCircle size={12} /> {errors.category}
//                       </p>
//                     )}
//                   </div>
//                 </div>

//                 {/* Sub Category */}
//                 {formData.category && (
//                   <div className="bg-white border border-[#e5d8cf] p-6">
//                     <label className="block text-[10px] tracking-wider uppercase text-[#9a8d80] font-medium mb-2">
//                       Sub Category
//                     </label>
//                     <select
//                       value={formData.subCategory}
//                       onChange={(e) => handleChange("subCategory", e.target.value)}
//                       className="w-full px-4 py-3 border border-[#e5d8cf] text-[13px] text-[#1B1613] focus:outline-none focus:border-[#8B6F47] transition-all duration-300 cursor-pointer"
//                     >
//                       <option value="">Select sub category</option>
//                       {subCategories[formData.category]?.map((sub) => (
//                         <option key={sub} value={sub}>{sub}</option>
//                       ))}
//                     </select>
//                   </div>
//                 )}

//                 {/* Description */}
//                 <div className="bg-white border border-[#e5d8cf] p-6">
//                   <label className="block text-[10px] tracking-wider uppercase text-[#9a8d80] font-medium mb-2">
//                     Description *
//                   </label>
//                   <textarea
//                     value={formData.description}
//                     onChange={(e) => handleChange("description", e.target.value)}
//                     rows={5}
//                     placeholder="Describe your product in detail..."
//                     className={`w-full px-4 py-3 border text-[13px] text-[#1B1613] placeholder:text-[#9a8d80] focus:outline-none focus:border-[#8B6F47] transition-all duration-300 resize-none ${
//                       errors.description ? "border-red-300" : "border-[#e5d8cf]"
//                     }`}
//                   />
//                   {errors.description && (
//                     <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
//                       <AlertCircle size={12} /> {errors.description}
//                     </p>
//                   )}
//                 </div>

//                 {/* Product Highlights */}
//                 <div className="bg-white border border-[#e5d8cf] p-6">
//                   <label className="block text-[10px] tracking-wider uppercase text-[#9a8d80] font-medium mb-3">
//                     Product Highlights
//                   </label>
//                   <div className="space-y-2 mb-4">
//                     {formData.highlights.map((highlight, index) => (
//                       <div key={index} className="flex items-center gap-2">
//                         <span className="text-[#8B6F47]">•</span>
//                         <span className="flex-1 text-[13px] text-[#1B1613]">{highlight}</span>
//                         <button
//                           type="button"
//                           onClick={() => removeHighlight(index)}
//                           className="text-[#9a8d80] hover:text-red-500 transition-colors"
//                         >
//                           <X size={14} strokeWidth={1.5} />
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                   <div className="flex gap-2">
//                     <input
//                       type="text"
//                       value={highlightInput}
//                       onChange={(e) => setHighlightInput(e.target.value)}
//                       onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addHighlight())}
//                       placeholder="Add a highlight..."
//                       className="flex-1 px-4 py-2.5 border border-[#e5d8cf] text-[13px] text-[#1B1613] placeholder:text-[#9a8d80] focus:outline-none focus:border-[#8B6F47] transition-all duration-300"
//                     />
//                     <button
//                       type="button"
//                       onClick={addHighlight}
//                       className="px-4 py-2.5 border border-[#e5d8cf] text-[11px] tracking-wider uppercase text-[#9a8d80] hover:text-[#1B1613] hover:bg-[#F4EAE3] transition-all duration-300"
//                     >
//                       Add
//                     </button>
//                   </div>
//                 </div>
//               </motion.div>
//             )}

//             {/* ========== PRICING & COMMISSION TAB ========== */}
//             {activeTab === "pricing" && (
//               <motion.div
//                 key="pricing"
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -10 }}
//                 className="space-y-6"
//               >
//                 {/* Price Row */}
//                 <div className="bg-white border border-[#e5d8cf] p-6">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                       <label className="block text-[10px] tracking-wider uppercase text-[#9a8d80] font-medium mb-2">
//                         Price (₹) *
//                       </label>
//                       <div className="relative">
//                         <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[13px] text-[#9a8d80]">₹</span>
//                         <input
//                           type="number"
//                           value={formData.price}
//                           onChange={(e) => handleChange("price", e.target.value)}
//                           placeholder="4,850"
//                           className={`w-full pl-10 pr-4 py-3 border text-[13px] text-[#1B1613] placeholder:text-[#9a8d80] focus:outline-none focus:border-[#8B6F47] transition-all duration-300 ${
//                             errors.price ? "border-red-300" : "border-[#e5d8cf]"
//                           }`}
//                         />
//                       </div>
//                       {errors.price && (
//                         <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
//                           <AlertCircle size={12} /> {errors.price}
//                         </p>
//                       )}
//                     </div>
//                     <div>
//                       <label className="block text-[10px] tracking-wider uppercase text-[#9a8d80] font-medium mb-2">
//                         Compare Price (MRP)
//                       </label>
//                       <div className="relative">
//                         <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[13px] text-[#9a8d80]">₹</span>
//                         <input
//                           type="number"
//                           value={formData.comparePrice}
//                           onChange={(e) => handleChange("comparePrice", e.target.value)}
//                           placeholder="5,200"
//                           className="w-full pl-10 pr-4 py-3 border border-[#e5d8cf] text-[13px] text-[#1B1613] placeholder:text-[#9a8d80] focus:outline-none focus:border-[#8B6F47] transition-all duration-300"
//                         />
//                       </div>
//                       <p className="text-[10px] text-[#9a8d80] mt-1">Shows a strikethrough price for perceived discount</p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Commission */}
//                 <div className="bg-white border border-[#e5d8cf] p-6">
//                   <label className="block text-[10px] tracking-wider uppercase text-[#9a8d80] font-medium mb-2">
//                     Commission *
//                   </label>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                       <div className="flex gap-4 mb-3">
//                         <label className="flex items-center gap-2 cursor-pointer">
//                           <input
//                             type="radio"
//                             checked={formData.commissionType === "percentage"}
//                             onChange={() => handleChange("commissionType", "percentage")}
//                             className="accent-[#8B6F47]"
//                           />
//                           <span className="text-[12px] text-[#1B1613]">Percentage (%)</span>
//                         </label>
//                         <label className="flex items-center gap-2 cursor-pointer">
//                           <input
//                             type="radio"
//                             checked={formData.commissionType === "fixed"}
//                             onChange={() => handleChange("commissionType", "fixed")}
//                             className="accent-[#8B6F47]"
//                           />
//                           <span className="text-[12px] text-[#1B1613]">Fixed Amount (₹)</span>
//                         </label>
//                       </div>
//                       <div className="relative">
//                         <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[13px] text-[#9a8d80]">
//                           {formData.commissionType === "percentage" ? "%" : "₹"}
//                         </span>
//                         <input
//                           type="number"
//                           value={formData.commission}
//                           onChange={(e) => handleChange("commission", e.target.value)}
//                           placeholder={formData.commissionType === "percentage" ? "15" : "500"}
//                           className={`w-full pl-10 pr-4 py-3 border text-[13px] text-[#1B1613] placeholder:text-[#9a8d80] focus:outline-none focus:border-[#8B6F47] transition-all duration-300 ${
//                             errors.commission ? "border-red-300" : "border-[#e5d8cf]"
//                           }`}
//                         />
//                       </div>
//                       {errors.commission && (
//                         <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
//                           <AlertCircle size={12} /> {errors.commission}
//                         </p>
//                       )}
//                     </div>
//                     <div className="bg-[#F4EAE3]/30 p-4 border border-[#e5d8cf]">
//                       <p className="text-[10px] tracking-wider uppercase text-[#9a8d80] font-medium mb-2">
//                         Commission Preview
//                       </p>
//                       {formData.price && formData.commission ? (
//                         <div>
//                           <p className="text-[13px] text-[#1B1613]">
//                             {formData.commissionType === "percentage" ? (
//                               <>₹{((parseFloat(formData.price) * parseFloat(formData.commission)) / 100).toLocaleString("en-IN")} per sale</>
//                             ) : (
//                               <>₹{parseInt(formData.commission).toLocaleString("en-IN")} per sale</>
//                             )}
//                           </p>
//                           <p className="text-[10px] text-[#9a8d80] mt-1">
//                             {formData.commissionType === "percentage"
//                               ? `${formData.commission}% of ₹${parseInt(formData.price).toLocaleString("en-IN")}`
//                               : "Fixed commission amount"}
//                           </p>
//                         </div>
//                       ) : (
//                         <p className="text-[12px] text-[#9a8d80]">Enter price and commission to see preview</p>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Additional Options */}
//                 <div className="bg-white border border-[#e5d8cf] p-6">
//                   <label className="block text-[10px] tracking-wider uppercase text-[#9a8d80] font-medium mb-3">
//                     Additional Options
//                   </label>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <label className="flex items-center gap-3 p-3 border border-[#e5d8cf] cursor-pointer hover:bg-[#F4EAE3]/20 transition-colors">
//                       <input
//                         type="checkbox"
//                         checked={formData.isFeatured}
//                         onChange={(e) => handleChange("isFeatured", e.target.checked)}
//                         className="accent-[#8B6F47]"
//                       />
//                       <div>
//                         <p className="text-[12px] font-medium text-[#1B1613]">Featured Product</p>
//                         <p className="text-[10px] text-[#9a8d80]">Show on homepage featured section</p>
//                       </div>
//                     </label>
//                     <label className="flex items-center gap-3 p-3 border border-[#e5d8cf] cursor-pointer hover:bg-[#F4EAE3]/20 transition-colors">
//                       <input
//                         type="checkbox"
//                         checked={formData.isBestSeller}
//                         onChange={(e) => handleChange("isBestSeller", e.target.checked)}
//                         className="accent-[#8B6F47]"
//                       />
//                       <div>
//                         <p className="text-[12px] font-medium text-[#1B1613]">Best Seller</p>
//                         <p className="text-[10px] text-[#9a8d80]">Mark as best selling product</p>
//                       </div>
//                     </label>
//                   </div>
//                 </div>
//               </motion.div>
//             )}

//             {/* ========== IMAGES TAB ========== */}
//             {activeTab === "images" && (
//               <motion.div
//                 key="images"
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -10 }}
//                 className="space-y-6"
//               >
//                 {/* Main Image */}
//                 <div className="bg-white border border-[#e5d8cf] p-6">
//                   <label className="block text-[10px] tracking-wider uppercase text-[#9a8d80] font-medium mb-3">
//                     Main Product Image *
//                   </label>
//                   {formData.mainImagePreview ? (
//                     <div className="relative w-64 h-64 bg-[#F4EAE3]/30 border border-[#e5d8cf] overflow-hidden group">
//                       <img
//                         src={formData.mainImagePreview}
//                         alt="Preview"
//                         className="w-full h-full object-cover"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => handleChange("mainImage", null) & handleChange("mainImagePreview", null)}
//                         className="absolute top-2 right-2 w-8 h-8 bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
//                       >
//                         <X size={16} strokeWidth={1.5} />
//                       </button>
//                     </div>
//                   ) : (
//                     <label className={`flex flex-col items-center justify-center w-64 h-64 border-2 border-dashed cursor-pointer hover:border-[#8B6F47] transition-all duration-300 ${
//                       errors.mainImage ? "border-red-300 bg-red-50" : "border-[#e5d8cf] bg-[#F4EAE3]/10"
//                     }`}>
//                       <Upload size={32} strokeWidth={1.5} className="text-[#9a8d80] mb-2" />
//                       <span className="text-[11px] text-[#9a8d80]">Upload Main Image</span>
//                       <span className="text-[10px] text-[#9a8d80] mt-1">800 x 800px recommended</span>
//                       <input
//                         type="file"
//                         accept="image/*"
//                         onChange={handleMainImageUpload}
//                         className="hidden"
//                       />
//                     </label>
//                   )}
//                   {errors.mainImage && (
//                     <p className="text-[11px] text-red-500 mt-2 flex items-center gap-1">
//                       <AlertCircle size={12} /> {errors.mainImage}
//                     </p>
//                   )}
//                 </div>

//                 {/* Gallery Images */}
//                 <div className="bg-white border border-[#e5d8cf] p-6">
//                   <label className="block text-[10px] tracking-wider uppercase text-[#9a8d80] font-medium mb-3">
//                     Gallery Images
//                   </label>
//                   <div className="flex flex-wrap gap-4 mb-4">
//                     {formData.galleryPreviews.map((preview, index) => (
//                       <div key={index} className="relative w-28 h-28 bg-[#F4EAE3]/30 border border-[#e5d8cf] group">
//                         <img
//                           src={preview}
//                           alt={`Gallery ${index + 1}`}
//                           className="w-full h-full object-cover"
//                         />
//                         <button
//                           type="button"
//                           onClick={() => removeGalleryImage(index)}
//                           className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
//                         >
//                           <X size={12} strokeWidth={1.5} />
//                         </button>
//                       </div>
//                     ))}
//                     <label className="flex flex-col items-center justify-center w-28 h-28 border-2 border-dashed border-[#e5d8cf] cursor-pointer hover:border-[#8B6F47] transition-all duration-300 bg-[#F4EAE3]/10">
//                       <Plus size={20} strokeWidth={1.5} className="text-[#9a8d80] mb-1" />
//                       <span className="text-[10px] text-[#9a8d80]">Add Image</span>
//                       <input
//                         type="file"
//                         accept="image/*"
//                         multiple
//                         onChange={handleGalleryUpload}
//                         className="hidden"
//                       />
//                     </label>
//                   </div>
//                   <p className="text-[10px] text-[#9a8d80]">Upload up to 6 gallery images. First image will be used as main if none selected.</p>
//                 </div>
//               </motion.div>
//             )}

//             {/* ========== AFFILIATE PLATFORMS TAB ========== */}
//             {activeTab === "platforms" && (
//               <motion.div
//                 key="platforms"
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -10 }}
//                 className="space-y-6"
//               >
//                 {/* Platform Selection */}
//                 <div className="bg-white border border-[#e5d8cf] p-6">
//                   <div className="flex items-center justify-between mb-4">
//                     <div>
//                       <label className="block text-[10px] tracking-wider uppercase text-[#9a8d80] font-medium">
//                         Select Affiliate Platforms *
//                       </label>
//                       <p className="text-[10px] text-[#9a8d80] mt-1">Choose where this product will be available</p>
//                     </div>
//                     <span className="text-[11px] text-[#9a8d80]">
//                       {formData.platforms.length} selected
//                     </span>
//                   </div>

//                   {errors.platforms && (
//                     <p className="text-[11px] text-red-500 mb-3 flex items-center gap-1">
//                       <AlertCircle size={12} /> {errors.platforms}
//                     </p>
//                   )}

//                   <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-6">
//                     {platformOptions.map((platform) => {
//                       const isSelected = formData.platforms.some((p) => p.name === platform.name);
//                       return (
//                         <button
//                           key={platform.name}
//                           type="button"
//                           onClick={() => togglePlatform(platform.name)}
//                           className={`flex items-center gap-3 p-4 border-2 transition-all duration-300 text-left ${
//                             isSelected
//                               ? "border-[#8B6F47] bg-[#8B6F47]/5 shadow-md"
//                               : "border-[#e5d8cf] hover:border-[#8B6F47]/50 hover:bg-[#F4EAE3]/10"
//                           }`}
//                         >
//                           <span className={`w-10 h-10 rounded-full ${platform.color} flex items-center justify-center text-sm text-white font-bold shrink-0`}>
//                             {platform.icon}
//                           </span>
//                           <div className="min-w-0">
//                             <p className="text-[12px] font-medium text-[#1B1613]">{platform.name}</p>
//                             <p className="text-[10px] text-[#9a8d80]">{platform.commissionRange}</p>
//                           </div>
//                           {isSelected && (
//                             <Check size={16} strokeWidth={2} className="text-[#8B6F47] ml-auto shrink-0" />
//                           )}
//                         </button>
//                       );
//                     })}
//                   </div>
//                 </div>

//                 {/* Platform URLs */}
//                 {formData.platforms.length > 0 && (
//                   <div className="bg-white border border-[#e5d8cf] p-6">
//                     <label className="block text-[10px] tracking-wider uppercase text-[#9a8d80] font-medium mb-4">
//                       Affiliate Links & Details
//                     </label>
//                     {errors.platformUrls && (
//                       <p className="text-[11px] text-red-500 mb-3 flex items-center gap-1">
//                         <AlertCircle size={12} /> {errors.platformUrls}
//                       </p>
//                     )}
//                     <div className="space-y-4">
//                       {formData.platforms.map((platform, index) => {
//                         const platformInfo = platformOptions.find((p) => p.name === platform.name);
//                         return (
//                           <div key={platform.name} className="p-4 border border-[#e5d8cf] bg-[#F4EAE3]/10">
//                             <div className="flex items-center justify-between mb-3">
//                               <div className="flex items-center gap-3">
//                                 <span className={`w-8 h-8 rounded-full ${platformInfo?.color || "bg-gray-500"} flex items-center justify-center text-xs text-white font-bold`}>
//                                   {platform.icon}
//                                 </span>
//                                 <div>
//                                   <p className="text-[12px] font-medium text-[#1B1613]">{platform.name}</p>
//                                   <p className="text-[10px] text-[#9a8d80]">{platformInfo?.description}</p>
//                                 </div>
//                               </div>
//                               <button
//                                 type="button"
//                                 onClick={() => removePlatform(platform.name)}
//                                 className="text-[#9a8d80] hover:text-red-500 transition-colors"
//                               >
//                                 <Trash2 size={16} strokeWidth={1.5} />
//                               </button>
//                             </div>
//                             <div className="space-y-3">
//                               <div>
//                                 <label className="block text-[9px] tracking-wider uppercase text-[#9a8d80] font-medium mb-1">
//                                   Affiliate URL *
//                                 </label>
//                                 <div className="flex gap-2">
//                                   <input
//                                     type="url"
//                                     value={platform.url}
//                                     onChange={(e) => updatePlatformUrl(platform.name, e.target.value)}
//                                     placeholder={platformInfo?.baseUrl + "your-affiliate-link"}
//                                     className="flex-1 px-3 py-2.5 border border-[#e5d8cf] text-[12px] text-[#1B1613] placeholder:text-[#9a8d80] focus:outline-none focus:border-[#8B6F47] transition-all duration-300"
//                                   />
//                                   <button
//                                     type="button"
//                                     onClick={() => window.open(platform.url, "_blank")}
//                                     className="px-3 py-2.5 border border-[#e5d8cf] text-[#9a8d80] hover:text-[#1B1613] transition-colors"
//                                     title="Test URL"
//                                   >
//                                     <ExternalLink size={14} strokeWidth={1.5} />
//                                   </button>
//                                   <button
//                                     type="button"
//                                     onClick={() => {
//                                       navigator.clipboard.writeText(platform.url);
//                                     }}
//                                     className="px-3 py-2.5 border border-[#e5d8cf] text-[#9a8d80] hover:text-[#1B1613] transition-colors"
//                                     title="Copy URL"
//                                   >
//                                     <Copy size={14} strokeWidth={1.5} />
//                                   </button>
//                                 </div>
//                               </div>
//                               <div>
//                                 <label className="block text-[9px] tracking-wider uppercase text-[#9a8d80] font-medium mb-1">
//                                   Affiliate ID / Tracking Code
//                                 </label>
//                                 <input
//                                   type="text"
//                                   value={platform.affiliateId}
//                                   onChange={(e) => updatePlatformAffiliateId(platform.name, e.target.value)}
//                                   placeholder="e.g., lumiere-beauty-21"
//                                   className="w-full px-3 py-2.5 border border-[#e5d8cf] text-[12px] text-[#1B1613] placeholder:text-[#9a8d80] focus:outline-none focus:border-[#8B6F47] transition-all duration-300"
//                                 />
//                               </div>
//                             </div>
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 )}
//               </motion.div>
//             )}

//             {/* ========== SEO & META TAB ========== */}
//             {activeTab === "seo" && (
//               <motion.div
//                 key="seo"
//                 initial={{ opacity: 0, y: 10 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 exit={{ opacity: 0, y: -10 }}
//                 className="space-y-6"
//               >
//                 {/* Meta Title */}
//                 <div className="bg-white border border-[#e5d8cf] p-6">
//                   <label className="block text-[10px] tracking-wider uppercase text-[#9a8d80] font-medium mb-2">
//                     Meta Title
//                   </label>
//                   <input
//                     type="text"
//                     value={formData.metaTitle}
//                     onChange={(e) => handleChange("metaTitle", e.target.value)}
//                     placeholder="Radiance Renewal Serum | Lumière Beauty"
//                     className="w-full px-4 py-3 border border-[#e5d8cf] text-[13px] text-[#1B1613] placeholder:text-[#9a8d80] focus:outline-none focus:border-[#8B6F47] transition-all duration-300"
//                   />
//                   <p className="text-[10px] text-[#9a8d80] mt-1">Recommended: 50-60 characters</p>
//                 </div>

//                 {/* Meta Description */}
//                 <div className="bg-white border border-[#e5d8cf] p-6">
//                   <label className="block text-[10px] tracking-wider uppercase text-[#9a8d80] font-medium mb-2">
//                     Meta Description
//                   </label>
//                   <textarea
//                     value={formData.metaDescription}
//                     onChange={(e) => handleChange("metaDescription", e.target.value)}
//                     rows={3}
//                     placeholder="Discover the Radiance Renewal Serum by Lumière Beauty..."
//                     className="w-full px-4 py-3 border border-[#e5d8cf] text-[13px] text-[#1B1613] placeholder:text-[#9a8d80] focus:outline-none focus:border-[#8B6F47] transition-all duration-300 resize-none"
//                   />
//                   <p className="text-[10px] text-[#9a8d80] mt-1">Recommended: 150-160 characters</p>
//                 </div>

//                 {/* Slug */}
//                 <div className="bg-white border border-[#e5d8cf] p-6">
//                   <label className="block text-[10px] tracking-wider uppercase text-[#9a8d80] font-medium mb-2">
//                     URL Slug
//                   </label>
//                   <div className="flex items-center gap-2">
//                     <span className="text-[12px] text-[#9a8d80]">/product/</span>
//                     <input
//                       type="text"
//                       value={formData.slug}
//                       onChange={(e) => handleChange("slug", e.target.value)}
//                       className="flex-1 px-4 py-3 border border-[#e5d8cf] text-[13px] text-[#1B1613] focus:outline-none focus:border-[#8B6F47] transition-all duration-300"
//                     />
//                     <button
//                       type="button"
//                       onClick={generateSlug}
//                       className="px-4 py-3 text-[11px] tracking-wider uppercase text-[#9a8d80] hover:text-[#1B1613] border border-[#e5d8cf] hover:bg-[#F4EAE3] transition-all duration-300"
//                     >
//                       Generate
//                     </button>
//                   </div>
//                 </div>

//                 {/* Tags */}
//                 <div className="bg-white border border-[#e5d8cf] p-6">
//                   <label className="block text-[10px] tracking-wider uppercase text-[#9a8d80] font-medium mb-3">
//                     Tags
//                   </label>
//                   <div className="flex flex-wrap gap-2 mb-3">
//                     {formData.tags.map((tag) => (
//                       <span
//                         key={tag}
//                         className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F4EAE3]/50 border border-[#e5d8cf] text-[11px] text-[#1B1613]"
//                       >
//                         {tag}
//                         <button
//                           type="button"
//                           onClick={() => removeTag(tag)}
//                           className="text-[#9a8d80] hover:text-red-500 transition-colors"
//                         >
//                           <X size={12} strokeWidth={1.5} />
//                         </button>
//                       </span>
//                     ))}
//                   </div>
//                   <div className="flex gap-2">
//                     <input
//                       type="text"
//                       value={tagInput}
//                       onChange={(e) => setTagInput(e.target.value)}
//                       onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
//                       placeholder="Add a tag..."
//                       className="flex-1 px-4 py-2.5 border border-[#e5d8cf] text-[13px] text-[#1B1613] placeholder:text-[#9a8d80] focus:outline-none focus:border-[#8B6F47] transition-all duration-300"
//                     />
//                     <button
//                       type="button"
//                       onClick={addTag}
//                       className="px-4 py-2.5 border border-[#e5d8cf] text-[11px] tracking-wider uppercase text-[#9a8d80] hover:text-[#1B1613] hover:bg-[#F4EAE3] transition-all duration-300"
//                     >
//                       Add
//                     </button>
//                   </div>
//                 </div>
//               </motion.div>
//             )}
//           </AnimatePresence>

//           {/* Bottom Action Bar */}
//           <div className="mt-8 bg-white border border-[#e5d8cf] p-4 flex items-center justify-between sticky bottom-0">
//             <div className="flex items-center gap-4">
//               <button
//                 type="button"
//                 onClick={() => router.push("/dashboard")}
//                 className="px-6 py-2.5 text-[11px] tracking-wider uppercase text-[#9a8d80] hover:text-[#1B1613] transition-colors font-medium"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="button"
//                 className="px-6 py-2.5 border border-[#e5d8cf] text-[11px] tracking-wider uppercase text-[#1B1613] hover:bg-[#F4EAE3] transition-all duration-300 font-medium flex items-center gap-2"
//               >
//                 <Eye size={14} strokeWidth={1.5} />
//                 Preview
//               </button>
//             </div>
//             <button
//               type="submit"
//               onClick={handleSubmit}
//               disabled={isSubmitting}
//               className="flex items-center gap-2 px-8 py-3 bg-[#8B6F47] text-white text-[11px] tracking-wider uppercase hover:bg-[#A6845F] transition-all duration-300 font-medium shadow-lg shadow-[#8B6F47]/20 disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {isSubmitting ? (
//                 <>
//                   <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
//                   Saving Product...
//                 </>
//               ) : (
//                 <>
//                   <Save size={15} strokeWidth={1.5} />
//                   Save Product
//                 </>
//               )}
//             </button>
//           </div>
//         </form>
//       </div>

//       {/* Success Modal */}
//       <AnimatePresence>
//         {showSuccess && (
//           <motion.div
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm"
//           >
//             <motion.div
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               className="bg-white w-full max-w-md p-8 shadow-2xl text-center"
//             >
//               <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
//                 <Check size={32} strokeWidth={2} className="text-green-600" />
//               </div>
//               <h3 className="font-serif text-xl text-[#1B1613] mb-2">Product Added!</h3>
//               <p className="text-[13px] text-[#9a8d80] mb-6">
//                 Your product has been successfully added to the affiliate dashboard. Redirecting...
//               </p>
//               <div className="w-full bg-gray-100 h-1 overflow-hidden">
//                 <motion.div
//                   initial={{ width: "100%" }}
//                   animate={{ width: "0%" }}
//                   transition={{ duration: 2 }}
//                   className="h-full bg-[#8B6F47]"
//                 />
//               </div>
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default AddProductPage;







// app/dashboard/products/add/page.jsx
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Plus,
  X,
  Check,
  Link2,
  Globe,
  ExternalLink,
  Save,
  Eye,
  AlertCircle,
  Info,
  Image as ImageIcon,
  Tag,
  DollarSign,
  Percent,
  Package,
  Sparkles,
  Trash2,
  Copy,
} from "lucide-react";

/* -------------------- PLATFORM OPTIONS -------------------- */
const platformOptions = [
  { 
    name: "Amazon", 
    color: "bg-orange-500", 
    icon: "A",
    baseUrl: "https://amazon.com/",
    description: "World's largest e-commerce marketplace",
    commissionRange: "2-10%",
  },
  { 
    name: "Nykaa", 
    color: "bg-pink-500", 
    icon: "N",
    baseUrl: "https://nykaa.com/",
    description: "India's leading beauty retailer",
    commissionRange: "5-15%",
  },
  { 
    name: "Flipkart", 
    color: "bg-blue-500", 
    icon: "F",
    baseUrl: "https://flipkart.com/",
    description: "Major Indian e-commerce platform",
    commissionRange: "3-12%",
  },
  { 
    name: "Myntra", 
    color: "bg-purple-500", 
    icon: "M",
    baseUrl: "https://myntra.com/",
    description: "Fashion and beauty destination",
    commissionRange: "5-15%",
  },
  { 
    name: "Alibaba", 
    color: "bg-red-500", 
    icon: "B",
    baseUrl: "https://alibaba.com/",
    description: "Global wholesale marketplace",
    commissionRange: "1-8%",
  },
  { 
    name: "Tata Cliq", 
    color: "bg-teal-500", 
    icon: "T",
    baseUrl: "https://tatacliq.com/",
    description: "Premium Indian e-commerce",
    commissionRange: "4-12%",
  },
  { 
    name: "Ajio", 
    color: "bg-yellow-500", 
    icon: "A",
    baseUrl: "https://ajio.com/",
    description: "Trendy fashion and beauty",
    commissionRange: "5-12%",
  },
  { 
    name: "Shoppers Stop", 
    color: "bg-indigo-500", 
    icon: "S",
    baseUrl: "https://shoppersstop.com/",
    description: "Premium department store",
    commissionRange: "5-10%",
  },
];

const categories = [
  "Skincare",
  "Haircare",
  "Makeup",
  "Fragrance",
  "Body Care",
  "Men's Grooming",
  "Tools & Accessories",
  "Wellness",
  "Gift Sets",
  "Travel Size",
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

/* -------------------- MONOGRAM LOGO -------------------- */
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

/* -------------------- MAIN COMPONENT -------------------- */
const AddProductPage = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    // Basic Information
    productName: "",
    brand: "Lumière Beauty",
    category: "",
    subCategory: "",
    description: "",
    highlights: [],
    
    // Pricing & Commission
    price: "",
    comparePrice: "",
    commission: "",
    commissionType: "percentage",
    currency: "INR",
    
    // Images (URLs instead of file uploads)
    mainImageUrl: "",
    galleryImageUrls: [""],
    
    // Affiliate Platforms
    platforms: [],
    
    // SEO & Meta
    metaTitle: "",
    metaDescription: "",
    slug: "",
    tags: [],
    
    // Additional
    stockStatus: "in_stock",
    isFeatured: false,
    isBestSeller: false,
    weight: "",
    dimensions: "",
    sku: "",
    notes: "",
  });

  const [tagInput, setTagInput] = useState("");
  const [highlightInput, setHighlightInput] = useState("");

  /* -------------------- FORM HANDLERS -------------------- */

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
    setApiError(null);
  };

  // Add Gallery Image URL field
  const addGalleryImageField = () => {
    setFormData((prev) => ({
      ...prev,
      galleryImageUrls: [...prev.galleryImageUrls, ""],
    }));
  };

  // Update Gallery Image URL
  const updateGalleryImageUrl = (index, value) => {
    const updatedUrls = [...formData.galleryImageUrls];
    updatedUrls[index] = value;
    setFormData((prev) => ({ ...prev, galleryImageUrls: updatedUrls }));
  };

  // Remove Gallery Image URL
  const removeGalleryImageUrl = (index) => {
    setFormData((prev) => ({
      ...prev,
      galleryImageUrls: prev.galleryImageUrls.filter((_, i) => i !== index),
    }));
  };

  // Toggle Platform
  const togglePlatform = (platformName) => {
    setFormData((prev) => {
      const existing = prev.platforms.find((p) => p.name === platformName);
      if (existing) {
        return {
          ...prev,
          platforms: prev.platforms.filter((p) => p.name !== platformName),
        };
      } else {
        const platformInfo = platformOptions.find((p) => p.name === platformName);
        return {
          ...prev,
          platforms: [
            ...prev.platforms,
            {
              name: platformName,
              url: platformInfo?.baseUrl || "",
              affiliateId: "",
              active: true,
              icon: platformInfo?.icon || platformName[0],
              color: platformInfo?.color || "bg-gray-500",
            },
          ],
        };
      }
    });
  };

  // Update Platform URL
  const updatePlatformUrl = (platformName, url) => {
    setFormData((prev) => ({
      ...prev,
      platforms: prev.platforms.map((p) =>
        p.name === platformName ? { ...p, url } : p
      ),
    }));
  };

  // Update Platform Affiliate ID
  const updatePlatformAffiliateId = (platformName, affiliateId) => {
    setFormData((prev) => ({
      ...prev,
      platforms: prev.platforms.map((p) =>
        p.name === platformName ? { ...p, affiliateId } : p
      ),
    }));
  };

  // Remove Platform
  const removePlatform = (platformName) => {
    setFormData((prev) => ({
      ...prev,
      platforms: prev.platforms.filter((p) => p.name !== platformName),
    }));
  };

  // Add Tag
  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput("");
    }
  };

  // Remove Tag
  const removeTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  // Add Highlight
  const addHighlight = () => {
    if (highlightInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        highlights: [...prev.highlights, highlightInput.trim()],
      }));
      setHighlightInput("");
    }
  };

  // Remove Highlight
  const removeHighlight = (index) => {
    setFormData((prev) => ({
      ...prev,
      highlights: prev.highlights.filter((_, i) => i !== index),
    }));
  };

  // Generate Slug
  const generateSlug = () => {
    const slug = formData.productName
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
    handleChange("slug", slug);
  };

  // Validate Form
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.productName.trim()) newErrors.productName = "Product name is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.price || parseFloat(formData.price) <= 0) newErrors.price = "Valid price is required";
    if (!formData.commission || parseFloat(formData.commission) <= 0) newErrors.commission = "Commission is required";
    if (formData.platforms.length === 0) newErrors.platforms = "At least one platform is required";
    if (formData.platforms.some(p => !p.url.trim())) newErrors.platformUrls = "All platform URLs must be filled";
    if (!formData.mainImageUrl.trim()) newErrors.mainImageUrl = "Main image URL is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Prepare data for API submission
  // const prepareSubmitData = () => {
  //   const galleryImages = formData.galleryImageUrls
  //     .filter(url => url.trim())
  //     .map(url => ({ url: url.trim(), altText: formData.productName }));

  //   return {
  //     productName: formData.productName,
  //     brand: formData.brand,
  //     category: formData.category,
  //     subCategory: formData.subCategory,
  //     description: formData.description,
  //     highlights: formData.highlights.filter(h => h.trim()),
  //     price: parseFloat(formData.price),
  //     comparePrice: formData.comparePrice ? parseFloat(formData.comparePrice) : null,
  //     commission: parseFloat(formData.commission),
  //     commissionType: formData.commissionType,
  //     currency: formData.currency,
  //     mainImage: {
  //       url: formData.mainImageUrl.trim(),
  //       altText: formData.productName,
  //     },
  //     galleryImages: galleryImages,
  //     platforms: formData.platforms.map(p => ({
  //       name: p.name,
  //       url: p.url,
  //       affiliateId: p.affiliateId,
  //       active: p.active,
  //       icon: p.icon,
  //       color: p.color,
  //     })),
  //     metaTitle: formData.metaTitle || formData.productName,
  //     metaDescription: formData.metaDescription || formData.description.substring(0, 160),
  //     slug: formData.slug,
  //     tags: formData.tags,
  //     stockStatus: formData.stockStatus,
  //     isFeatured: formData.isFeatured,
  //     isBestSeller: formData.isBestSeller,
  //     weight: formData.weight,
  //     dimensions: formData.dimensions,
  //     sku: formData.sku,
  //     notes: formData.notes,
  //   };
  // };


  // In your Add Product page

// const prepareSubmitData = () => {
//   // Filter out empty gallery image URLs
//   const galleryImages = formData.galleryImageUrls
//     .filter(url => url && url.trim() !== "")
//     .map(url => ({ 
//       url: url.trim(), 
//       altText: formData.productName || "Product image" 
//     }));

//   // Only include mainImage if URL is provided
//   const mainImage = formData.mainImageUrl?.trim() 
//     ? { 
//         url: formData.mainImageUrl.trim(), 
//         altText: formData.productName || "Product image" 
//       }
//     : null;

//   // Filter platforms to only include those with URLs
//   const platforms = formData.platforms
//     .filter(p => p.url && p.url.trim() !== "")
//     .map(p => ({
//       name: p.name,
//       url: p.url.trim(),
//       affiliateId: p.affiliateId?.trim() || "",
//       active: p.active !== false,
//       icon: p.icon,
//       color: p.color,
//     }));

//   // Filter empty highlights
//   const highlights = formData.highlights.filter(h => h && h.trim() !== "");

//   const data = {
//     productName: formData.productName?.trim() || "",
//     brand: formData.brand?.trim() || "Lumière Beauty",
//     category: formData.category,
//     subCategory: formData.subCategory || undefined,
//     description: formData.description?.trim() || "",
//     highlights: highlights.length > 0 ? highlights : [],
    
//     price: parseFloat(formData.price) || 0,
//     comparePrice: formData.comparePrice ? parseFloat(formData.comparePrice) : null,
//     commission: parseFloat(formData.commission) || 0,
//     commissionType: formData.commissionType || "percentage",
//     currency: formData.currency || "INR",
    
//     mainImage: mainImage,
//     galleryImages: galleryImages,
    
//     platforms: platforms,
    
//     metaTitle: formData.metaTitle?.trim() || formData.productName?.trim() || "",
//     metaDescription: formData.metaDescription?.trim() || formData.description?.trim()?.substring(0, 160) || "",
//     slug: formData.slug?.trim() || undefined,
//     tags: formData.tags.filter(t => t && t.trim() !== ""),
    
//     stockStatus: formData.stockStatus || "in_stock",
//     isFeatured: formData.isFeatured || false,
//     isBestSeller: formData.isBestSeller || false,
    
//     weight: formData.weight?.trim() || undefined,
//     dimensions: formData.dimensions?.trim() || undefined,
//     sku: formData.sku?.trim() || undefined,
//     notes: formData.notes?.trim() || undefined,
//   };

//   // Remove undefined values
//   Object.keys(data).forEach(key => {
//     if (data[key] === undefined) {
//       delete data[key];
//     }
//   });

//   console.log("📦 Prepared data:", JSON.stringify(data, null, 2));
  
//   return data;
// };
// In app/dashboard/addProduct/page.jsx

const prepareSubmitData = () => {
  // Helper to validate URL
  const isValidUrl = (url) => {
    if (!url || typeof url !== 'string') return false;
    // Only accept http/https URLs, not base64 data
    return url.startsWith('http://') || url.startsWith('https://');
  };

  // Clean and validate main image URL
  const mainImageUrl = formData.mainImageUrl?.trim();
  const mainImage = isValidUrl(mainImageUrl) 
    ? { url: mainImageUrl, altText: formData.productName || "Product image" }
    : null;

  // Clean and validate gallery image URLs
  const galleryImages = formData.galleryImageUrls
    .filter(url => url && typeof url === 'string' && url.trim() !== '')
    .filter(url => isValidUrl(url.trim()))
    .map(url => ({ 
      url: url.trim(), 
      altText: formData.productName || "Product image" 
    }));

  // Clean platforms - ensure URLs are valid
  const platforms = formData.platforms
    .filter(p => p.url && typeof p.url === 'string' && p.url.trim() !== '')
    .filter(p => isValidUrl(p.url.trim()) || p.url.trim().startsWith('https://'))
    .map(p => ({
      name: p.name,
      url: p.url.trim(),
      affiliateId: (p.affiliateId && typeof p.affiliateId === 'string') ? p.affiliateId.trim() : "",
      active: p.active !== false,
      icon: p.icon || p.name[0],
      color: p.color || "bg-gray-500",
    }));

  // Clean highlights
  const highlights = formData.highlights.filter(h => h && typeof h === 'string' && h.trim() !== "");

  // Clean tags
  const tags = formData.tags.filter(t => t && typeof t === 'string' && t.trim() !== "");

  const data = {
    productName: formData.productName?.trim() || "",
    brand: formData.brand?.trim() || "Lumière Beauty",
    category: formData.category || "",
    subCategory: formData.subCategory?.trim() || undefined,
    description: formData.description?.trim() || "",
    highlights: highlights.length > 0 ? highlights : [],
    
    price: parseFloat(formData.price) || 0,
    comparePrice: formData.comparePrice ? parseFloat(formData.comparePrice) : null,
    commission: parseFloat(formData.commission) || 0,
    commissionType: formData.commissionType || "percentage",
    currency: formData.currency || "INR",
    
    mainImage: mainImage,
    galleryImages: galleryImages,
    
    platforms: platforms,
    
    metaTitle: formData.metaTitle?.trim() || formData.productName?.trim() || "",
    metaDescription: formData.metaDescription?.trim() || formData.description?.trim()?.substring(0, 160) || "",
    slug: formData.slug?.trim() || undefined,
    tags: tags,
    
    stockStatus: formData.stockStatus || "in_stock",
    isFeatured: Boolean(formData.isFeatured),
    isBestSeller: Boolean(formData.isBestSeller),
    
    weight: formData.weight?.trim() || undefined,
    dimensions: formData.dimensions?.trim() || undefined,
    sku: formData.sku?.trim() || undefined,
    notes: formData.notes?.trim() || undefined,
  };

  // Remove undefined values and empty strings for optional fields
  Object.keys(data).forEach(key => {
    if (data[key] === undefined || data[key] === "") {
      delete data[key];
    }
  });

  // Ensure mainImage is not null before sending
  if (!data.mainImage || !data.mainImage.url) {
    // Don't delete - the API will catch this as validation error
    console.warn("⚠️ Main image URL is missing or invalid");
  }

  console.log("📦 Prepared data:", JSON.stringify(data, null, 2));
  
  return data;
};
  // Handle Submit - POST to API
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setIsSubmitting(true);
    setApiError(null);
  console.log("Submit clicked");

  const valid = validateForm();

  console.log("Validation:", valid);
  console.log("Errors:", errors);

  if (!valid) return;

  console.log("Validation Passed");

    try {
      const submitData = prepareSubmitData();
      
      const response = await fetch('/api/product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submitData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || 'Failed to create product');
      }

      setShowSuccess(true);
      
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
    } catch (error) {
      console.error("Error adding product:", error);
      setApiError(error.message || "Failed to create product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Auto-generate slug
  React.useEffect(() => {
    if (formData.productName) {
      generateSlug();
    }
  }, [formData.productName]);

  return (
    <div className="min-h-screen bg-[#F4EAE3]/30">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-[#e5d8cf]">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="flex items-center gap-2 text-[#9a8d80] hover:text-[#1B1613] transition-colors"
            >
              <ArrowLeft size={18} strokeWidth={1.5} />
              <span className="text-[11px] tracking-wider uppercase font-medium">Back</span>
            </Link>
            <div className="w-px h-5 bg-[#e5d8cf]" />
            <div className="flex items-center gap-2">
              <Sparkles size={14} strokeWidth={1.5} className="text-[#8B6F47]" />
              <h1 className="font-serif text-lg text-[#1B1613]">Add New Product</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.push("/dashboard")}
              className="px-4 py-2 text-[11px] tracking-wider uppercase text-[#9a8d80] hover:text-[#1B1613] transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex items-center gap-2 px-6 py-2.5 bg-[#8B6F47] text-white text-[11px] tracking-wider uppercase hover:bg-[#A6845F] transition-all duration-300 font-medium shadow-lg shadow-[#8B6F47]/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save size={14} strokeWidth={1.5} />
                  Save Product
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* API Error Message */}
        {apiError && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 flex items-center gap-3">
            <AlertCircle size={18} strokeWidth={1.5} className="text-red-500 shrink-0" />
            <div>
              <p className="text-[13px] font-medium text-red-700">Error Creating Product</p>
              <p className="text-[12px] text-red-600">{apiError}</p>
            </div>
            <button
              onClick={() => setApiError(null)}
              className="ml-auto text-red-400 hover:text-red-600"
            >
              <X size={16} strokeWidth={1.5} />
            </button>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex gap-1 mb-8 bg-white border border-[#e5d8cf] p-1 overflow-x-auto">
          {[
            { id: "basic", label: "Basic Info", icon: Info },
            { id: "pricing", label: "Pricing & Commission", icon: DollarSign },
            { id: "images", label: "Images", icon: ImageIcon },
            { id: "platforms", label: "Affiliate Platforms", icon: Globe },
            { id: "seo", label: "SEO & Meta", icon: Tag },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-[11px] tracking-wider uppercase transition-all duration-300 font-medium whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-[#8B6F47] text-white"
                  : "text-[#9a8d80] hover:text-[#1B1613] hover:bg-[#F4EAE3]/30"
              }`}
            >
              <tab.icon size={14} strokeWidth={1.5} />
              {tab.label}
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <AnimatePresence mode="wait">
            {/* ========== BASIC INFO TAB ========== */}
            {activeTab === "basic" && (
              <motion.div
                key="basic"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="bg-white border border-[#e5d8cf] p-6">
                  <label className="block text-[10px] tracking-wider uppercase text-[#9a8d80] font-medium mb-2">
                    Product Name *
                  </label>
                  <input
                    type="text"
                    value={formData.productName}
                    onChange={(e) => handleChange("productName", e.target.value)}
                    placeholder="e.g., Radiance Renewal Serum 50ml"
                    className={`w-full px-4 py-3 border text-[13px] text-[#1B1613] placeholder:text-[#9a8d80] focus:outline-none focus:border-[#8B6F47] transition-all duration-300 ${
                      errors.productName ? "border-red-300" : "border-[#e5d8cf]"
                    }`}
                  />
                  {errors.productName && (
                    <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.productName}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white border border-[#e5d8cf] p-6">
                    <label className="block text-[10px] tracking-wider uppercase text-[#9a8d80] font-medium mb-2">Brand</label>
                    <input
                      type="text"
                      value={formData.brand}
                      onChange={(e) => handleChange("brand", e.target.value)}
                      className="w-full px-4 py-3 border border-[#e5d8cf] text-[13px] text-[#1B1613] focus:outline-none focus:border-[#8B6F47] transition-all duration-300"
                    />
                  </div>
                  <div className="bg-white border border-[#e5d8cf] p-6">
                    <label className="block text-[10px] tracking-wider uppercase text-[#9a8d80] font-medium mb-2">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => handleChange("category", e.target.value)}
                      className={`w-full px-4 py-3 border text-[13px] text-[#1B1613] focus:outline-none focus:border-[#8B6F47] transition-all duration-300 cursor-pointer ${
                        errors.category ? "border-red-300" : "border-[#e5d8cf]"
                      }`}
                    >
                      <option value="">Select category</option>
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                    {errors.category && (
                      <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                        <AlertCircle size={12} /> {errors.category}
                      </p>
                    )}
                  </div>
                </div>

                {formData.category && (
                  <div className="bg-white border border-[#e5d8cf] p-6">
                    <label className="block text-[10px] tracking-wider uppercase text-[#9a8d80] font-medium mb-2">Sub Category</label>
                    <select
                      value={formData.subCategory}
                      onChange={(e) => handleChange("subCategory", e.target.value)}
                      className="w-full px-4 py-3 border border-[#e5d8cf] text-[13px] text-[#1B1613] focus:outline-none focus:border-[#8B6F47] transition-all duration-300 cursor-pointer"
                    >
                      <option value="">Select sub category</option>
                      {subCategories[formData.category]?.map((sub) => (
                        <option key={sub} value={sub}>{sub}</option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="bg-white border border-[#e5d8cf] p-6">
                  <label className="block text-[10px] tracking-wider uppercase text-[#9a8d80] font-medium mb-2">
                    Description *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    rows={5}
                    placeholder="Describe your product in detail..."
                    className={`w-full px-4 py-3 border text-[13px] text-[#1B1613] placeholder:text-[#9a8d80] focus:outline-none focus:border-[#8B6F47] transition-all duration-300 resize-none ${
                      errors.description ? "border-red-300" : "border-[#e5d8cf]"
                    }`}
                  />
                  {errors.description && (
                    <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.description}
                    </p>
                  )}
                </div>

                {/* Highlights */}
                <div className="bg-white border border-[#e5d8cf] p-6">
                  <label className="block text-[10px] tracking-wider uppercase text-[#9a8d80] font-medium mb-3">
                    Product Highlights
                  </label>
                  <div className="space-y-2 mb-4">
                    {formData.highlights.map((highlight, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <span className="text-[#8B6F47]">•</span>
                        <span className="flex-1 text-[13px] text-[#1B1613]">{highlight}</span>
                        <button type="button" onClick={() => removeHighlight(index)} className="text-[#9a8d80] hover:text-red-500">
                          <X size={14} strokeWidth={1.5} />
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={highlightInput}
                      onChange={(e) => setHighlightInput(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addHighlight())}
                      placeholder="Add a highlight..."
                      className="flex-1 px-4 py-2.5 border border-[#e5d8cf] text-[13px] text-[#1B1613] placeholder:text-[#9a8d80] focus:outline-none focus:border-[#8B6F47] transition-all duration-300"
                    />
                    <button type="button" onClick={addHighlight} className="px-4 py-2.5 border border-[#e5d8cf] text-[11px] tracking-wider uppercase text-[#9a8d80] hover:text-[#1B1613] hover:bg-[#F4EAE3] transition-all duration-300">
                      Add
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ========== PRICING & COMMISSION TAB ========== */}
            {activeTab === "pricing" && (
              <motion.div
                key="pricing"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="bg-white border border-[#e5d8cf] p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] tracking-wider uppercase text-[#9a8d80] font-medium mb-2">Price (₹) *</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[13px] text-[#9a8d80]">₹</span>
                        <input
                          type="number"
                          value={formData.price}
                          onChange={(e) => handleChange("price", e.target.value)}
                          placeholder="4,850"
                          className={`w-full pl-10 pr-4 py-3 border text-[13px] text-[#1B1613] placeholder:text-[#9a8d80] focus:outline-none focus:border-[#8B6F47] transition-all duration-300 ${
                            errors.price ? "border-red-300" : "border-[#e5d8cf]"
                          }`}
                        />
                      </div>
                      {errors.price && (
                        <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                          <AlertCircle size={12} /> {errors.price}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-[10px] tracking-wider uppercase text-[#9a8d80] font-medium mb-2">Compare Price (MRP)</label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[13px] text-[#9a8d80]">₹</span>
                        <input
                          type="number"
                          value={formData.comparePrice}
                          onChange={(e) => handleChange("comparePrice", e.target.value)}
                          placeholder="5,200"
                          className="w-full pl-10 pr-4 py-3 border border-[#e5d8cf] text-[13px] text-[#1B1613] placeholder:text-[#9a8d80] focus:outline-none focus:border-[#8B6F47] transition-all duration-300"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white border border-[#e5d8cf] p-6">
                  <label className="block text-[10px] tracking-wider uppercase text-[#9a8d80] font-medium mb-2">Commission *</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <div className="flex gap-4 mb-3">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" checked={formData.commissionType === "percentage"} onChange={() => handleChange("commissionType", "percentage")} className="accent-[#8B6F47]" />
                          <span className="text-[12px] text-[#1B1613]">Percentage (%)</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" checked={formData.commissionType === "fixed"} onChange={() => handleChange("commissionType", "fixed")} className="accent-[#8B6F47]" />
                          <span className="text-[12px] text-[#1B1613]">Fixed Amount (₹)</span>
                        </label>
                      </div>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[13px] text-[#9a8d80]">
                          {formData.commissionType === "percentage" ? "%" : "₹"}
                        </span>
                        <input
                          type="number"
                          value={formData.commission}
                          onChange={(e) => handleChange("commission", e.target.value)}
                          placeholder={formData.commissionType === "percentage" ? "15" : "500"}
                          className={`w-full pl-10 pr-4 py-3 border text-[13px] text-[#1B1613] placeholder:text-[#9a8d80] focus:outline-none focus:border-[#8B6F47] transition-all duration-300 ${
                            errors.commission ? "border-red-300" : "border-[#e5d8cf]"
                          }`}
                        />
                      </div>
                      {errors.commission && (
                        <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
                          <AlertCircle size={12} /> {errors.commission}
                        </p>
                      )}
                    </div>
                    <div className="bg-[#F4EAE3]/30 p-4 border border-[#e5d8cf]">
                      <p className="text-[10px] tracking-wider uppercase text-[#9a8d80] font-medium mb-2">Commission Preview</p>
                      {formData.price && formData.commission ? (
                        <div>
                          <p className="text-[13px] text-[#1B1613]">
                            {formData.commissionType === "percentage"
                              ? <>₹{((parseFloat(formData.price) * parseFloat(formData.commission)) / 100).toLocaleString("en-IN")} per sale</>
                              : <>₹{parseInt(formData.commission).toLocaleString("en-IN")} per sale</>
                            }
                          </p>
                        </div>
                      ) : (
                        <p className="text-[12px] text-[#9a8d80]">Enter price and commission to see preview</p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ========== IMAGES TAB (URLs) ========== */}
            {activeTab === "images" && (
              <motion.div
                key="images"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                {/* Main Image URL */}
               {/* In the Images tab */}
<div className="bg-white border border-[#e5d8cf] p-6">
  <label className="block text-[10px] tracking-wider uppercase text-[#9a8d80] font-medium mb-2">
    Main Product Image URL *
  </label>
  <div className="relative">
    <Link2 size={16} strokeWidth={1.5} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9a8d80]" />
    <input
      type="url"
      value={formData.mainImageUrl}
      onChange={(e) => {
        const value = e.target.value;
        // Only allow http/https URLs
        if (value === '' || value.startsWith('http://') || value.startsWith('https://')) {
          handleChange("mainImageUrl", value);
        }
      }}
      placeholder="https://example.com/images/product-main.jpg"
      className={`w-full pl-12 pr-4 py-3 border text-[13px] text-[#1B1613] placeholder:text-[#9a8d80] focus:outline-none focus:border-[#8B6F47] transition-all duration-300 ${
        errors.mainImageUrl ? "border-red-300" : "border-[#e5d8cf]"
      }`}
    />
  </div>
  {errors.mainImageUrl && (
    <p className="text-[11px] text-red-500 mt-1 flex items-center gap-1">
      <AlertCircle size={12} /> {errors.mainImageUrl}
    </p>
  )}
  <p className="text-[10px] text-[#9a8d80] mt-1">
    Paste a direct image URL (must start with http:// or https://)
  </p>
  {/* Image Preview */}
  {formData.mainImageUrl && formData.mainImageUrl.startsWith('http') && (
    <div className="mt-4 w-48 h-48 bg-[#F4EAE3]/30 border border-[#e5d8cf] overflow-hidden">
      <img
        src={formData.mainImageUrl}
        alt="Main product preview"
        className="w-full h-full object-cover"
        onError={(e) => {
          e.target.style.display = 'none';
          e.target.parentElement.innerHTML = '<div class="w-full h-full flex items-center justify-center text-[11px] text-red-400 p-4 text-center">Invalid image URL</div>';
        }}
      />
    </div>
  )}
</div>

                {/* Gallery Image URLs */}
                <div className="bg-white border border-[#e5d8cf] p-6">
                  <div className="flex items-center justify-between mb-4">
                    <label className="block text-[10px] tracking-wider uppercase text-[#9a8d80] font-medium">
                      Gallery Image URLs
                    </label>
                    <button
                      type="button"
                      onClick={addGalleryImageField}
                      className="flex items-center gap-1.5 text-[10px] tracking-wider uppercase text-[#8B6F47] hover:text-[#1B1613] transition-colors font-medium"
                    >
                      <Plus size={14} strokeWidth={1.5} />
                      Add Image
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    {formData.galleryImageUrls.map((url, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="flex-1">
                          <div className="relative">
                            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] text-[#9a8d80]">{index + 1}.</span>
                            <input
                              type="url"
                              value={url}
                              onChange={(e) => updateGalleryImageUrl(index, e.target.value)}
                              placeholder="https://example.com/images/product-gallery-1.jpg"
                              className="w-full pl-10 pr-4 py-3 border border-[#e5d8cf] text-[13px] text-[#1B1613] placeholder:text-[#9a8d80] focus:outline-none focus:border-[#8B6F47] transition-all duration-300"
                            />
                          </div>
                          {url && (
                            <div className="mt-2 w-20 h-20 bg-[#F4EAE3]/30 border border-[#e5d8cf] overflow-hidden inline-block">
                              <img
                                src={url}
                                alt={`Gallery ${index + 1}`}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.style.display = 'none';
                                }}
                              />
                            </div>
                          )}
                        </div>
                        {formData.galleryImageUrls.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeGalleryImageUrl(index)}
                            className="mt-3 p-2 text-[#9a8d80] hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={16} strokeWidth={1.5} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  {formData.galleryImageUrls.length === 0 && (
                    <p className="text-[11px] text-[#9a8d80] text-center py-4">No gallery images added. Click "Add Image" to include more product images.</p>
                  )}
                </div>
              </motion.div>
            )}

            {/* ========== AFFILIATE PLATFORMS TAB ========== */}
            {activeTab === "platforms" && (
              <motion.div
                key="platforms"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="bg-white border border-[#e5d8cf] p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <label className="block text-[10px] tracking-wider uppercase text-[#9a8d80] font-medium">
                        Select Affiliate Platforms *
                      </label>
                      <p className="text-[10px] text-[#9a8d80] mt-1">Choose where this product will be available</p>
                    </div>
                    <span className="text-[11px] text-[#9a8d80]">{formData.platforms.length} selected</span>
                  </div>
                  {errors.platforms && (
                    <p className="text-[11px] text-red-500 mb-3 flex items-center gap-1">
                      <AlertCircle size={12} /> {errors.platforms}
                    </p>
                  )}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-6">
                    {platformOptions.map((platform) => {
                      const isSelected = formData.platforms.some((p) => p.name === platform.name);
                      return (
                        <button
                          key={platform.name}
                          type="button"
                          onClick={() => togglePlatform(platform.name)}
                          className={`flex items-center gap-3 p-4 border-2 transition-all duration-300 text-left ${
                            isSelected
                              ? "border-[#8B6F47] bg-[#8B6F47]/5 shadow-md"
                              : "border-[#e5d8cf] hover:border-[#8B6F47]/50 hover:bg-[#F4EAE3]/10"
                          }`}
                        >
                          <span className={`w-10 h-10 rounded-full ${platform.color} flex items-center justify-center text-sm text-white font-bold shrink-0`}>
                            {platform.icon}
                          </span>
                          <div className="min-w-0">
                            <p className="text-[12px] font-medium text-[#1B1613]">{platform.name}</p>
                            <p className="text-[10px] text-[#9a8d80]">{platform.commissionRange}</p>
                          </div>
                          {isSelected && <Check size={16} strokeWidth={2} className="text-[#8B6F47] ml-auto shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {formData.platforms.length > 0 && (
                  <div className="bg-white border border-[#e5d8cf] p-6">
                    <label className="block text-[10px] tracking-wider uppercase text-[#9a8d80] font-medium mb-4">Affiliate Links & Details</label>
                    {errors.platformUrls && (
                      <p className="text-[11px] text-red-500 mb-3 flex items-center gap-1">
                        <AlertCircle size={12} /> {errors.platformUrls}
                      </p>
                    )}
                    <div className="space-y-4">
                      {formData.platforms.map((platform) => {
                        const platformInfo = platformOptions.find((p) => p.name === platform.name);
                        return (
                          <div key={platform.name} className="p-4 border border-[#e5d8cf] bg-[#F4EAE3]/10">
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center gap-3">
                                <span className={`w-8 h-8 rounded-full ${platformInfo?.color || "bg-gray-500"} flex items-center justify-center text-xs text-white font-bold`}>
                                  {platform.icon}
                                </span>
                                <div>
                                  <p className="text-[12px] font-medium text-[#1B1613]">{platform.name}</p>
                                  <p className="text-[10px] text-[#9a8d80]">{platformInfo?.description}</p>
                                </div>
                              </div>
                              <button type="button" onClick={() => removePlatform(platform.name)} className="text-[#9a8d80] hover:text-red-500 transition-colors">
                                <Trash2 size={16} strokeWidth={1.5} />
                              </button>
                            </div>
                            <div className="space-y-3">
                              <div>
                                <label className="block text-[9px] tracking-wider uppercase text-[#9a8d80] font-medium mb-1">Affiliate URL *</label>
                                <div className="flex gap-2">
                                  <input
                                    type="url"
                                    value={platform.url}
                                    onChange={(e) => updatePlatformUrl(platform.name, e.target.value)}
                                    placeholder={platformInfo?.baseUrl + "your-affiliate-link"}
                                    className="flex-1 px-3 py-2.5 border border-[#e5d8cf] text-[12px] text-[#1B1613] placeholder:text-[#9a8d80] focus:outline-none focus:border-[#8B6F47] transition-all duration-300"
                                  />
                                  <button type="button" onClick={() => window.open(platform.url, "_blank")} className="px-3 py-2.5 border border-[#e5d8cf] text-[#9a8d80] hover:text-[#1B1613] transition-colors" title="Test URL">
                                    <ExternalLink size={14} strokeWidth={1.5} />
                                  </button>
                                  <button type="button" onClick={() => navigator.clipboard.writeText(platform.url)} className="px-3 py-2.5 border border-[#e5d8cf] text-[#9a8d80] hover:text-[#1B1613] transition-colors" title="Copy URL">
                                    <Copy size={14} strokeWidth={1.5} />
                                  </button>
                                </div>
                              </div>
                              <div>
                                <label className="block text-[9px] tracking-wider uppercase text-[#9a8d80] font-medium mb-1">Affiliate ID / Tracking Code</label>
                                <input
                                  type="text"
                                  value={platform.affiliateId}
                                  onChange={(e) => updatePlatformAffiliateId(platform.name, e.target.value)}
                                  placeholder="e.g., lumiere-beauty-21"
                                  className="w-full px-3 py-2.5 border border-[#e5d8cf] text-[12px] text-[#1B1613] placeholder:text-[#9a8d80] focus:outline-none focus:border-[#8B6F47] transition-all duration-300"
                                />
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* ========== SEO & META TAB ========== */}
            {activeTab === "seo" && (
              <motion.div
                key="seo"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="bg-white border border-[#e5d8cf] p-6">
                  <label className="block text-[10px] tracking-wider uppercase text-[#9a8d80] font-medium mb-2">Meta Title</label>
                  <input
                    type="text"
                    value={formData.metaTitle}
                    onChange={(e) => handleChange("metaTitle", e.target.value)}
                    placeholder="Radiance Renewal Serum | Lumière Beauty"
                    className="w-full px-4 py-3 border border-[#e5d8cf] text-[13px] text-[#1B1613] placeholder:text-[#9a8d80] focus:outline-none focus:border-[#8B6F47] transition-all duration-300"
                  />
                </div>

                <div className="bg-white border border-[#e5d8cf] p-6">
                  <label className="block text-[10px] tracking-wider uppercase text-[#9a8d80] font-medium mb-2">Meta Description</label>
                  <textarea
                    value={formData.metaDescription}
                    onChange={(e) => handleChange("metaDescription", e.target.value)}
                    rows={3}
                    placeholder="Discover the Radiance Renewal Serum by Lumière Beauty..."
                    className="w-full px-4 py-3 border border-[#e5d8cf] text-[13px] text-[#1B1613] placeholder:text-[#9a8d80] focus:outline-none focus:border-[#8B6F47] transition-all duration-300 resize-none"
                  />
                </div>

                <div className="bg-white border border-[#e5d8cf] p-6">
                  <label className="block text-[10px] tracking-wider uppercase text-[#9a8d80] font-medium mb-2">URL Slug</label>
                  <div className="flex items-center gap-2">
                    <span className="text-[12px] text-[#9a8d80]">/product/</span>
                    <input
                      type="text"
                      value={formData.slug}
                      onChange={(e) => handleChange("slug", e.target.value)}
                      className="flex-1 px-4 py-3 border border-[#e5d8cf] text-[13px] text-[#1B1613] focus:outline-none focus:border-[#8B6F47] transition-all duration-300"
                    />
                    <button type="button" onClick={generateSlug} className="px-4 py-3 text-[11px] tracking-wider uppercase text-[#9a8d80] hover:text-[#1B1613] border border-[#e5d8cf] hover:bg-[#F4EAE3] transition-all duration-300">
                      Generate
                    </button>
                  </div>
                </div>

                <div className="bg-white border border-[#e5d8cf] p-6">
                  <label className="block text-[10px] tracking-wider uppercase text-[#9a8d80] font-medium mb-3">Tags</label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {formData.tags.map((tag) => (
                      <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#F4EAE3]/50 border border-[#e5d8cf] text-[11px] text-[#1B1613]">
                        {tag}
                        <button type="button" onClick={() => removeTag(tag)} className="text-[#9a8d80] hover:text-red-500">
                          <X size={12} strokeWidth={1.5} />
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                      placeholder="Add a tag..."
                      className="flex-1 px-4 py-2.5 border border-[#e5d8cf] text-[13px] text-[#1B1613] placeholder:text-[#9a8d80] focus:outline-none focus:border-[#8B6F47] transition-all duration-300"
                    />
                    <button type="button" onClick={addTag} className="px-4 py-2.5 border border-[#e5d8cf] text-[11px] tracking-wider uppercase text-[#9a8d80] hover:text-[#1B1613] hover:bg-[#F4EAE3] transition-all duration-300">
                      Add
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Bottom Action Bar */}
          <div className="mt-8 bg-white border border-[#e5d8cf] p-4 flex items-center justify-between sticky bottom-0">
            <button
              type="button"
              onClick={() => router.push("/dashboard")}
              className="px-6 py-2.5 text-[11px] tracking-wider uppercase text-[#9a8d80] hover:text-[#1B1613] transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex items-center gap-2 px-8 py-3 bg-[#8B6F47] text-white text-[11px] tracking-wider uppercase hover:bg-[#A6845F] transition-all duration-300 font-medium shadow-lg shadow-[#8B6F47]/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Saving Product...
                </>
              ) : (
                <>
                  <Save size={15} strokeWidth={1.5} />
                  Save Product
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white w-full max-w-md p-8 shadow-2xl text-center"
            >
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                <Check size={32} strokeWidth={2} className="text-green-600" />
              </div>
              <h3 className="font-serif text-xl text-[#1B1613] mb-2">Product Added Successfully!</h3>
              <p className="text-[13px] text-[#9a8d80] mb-6">
                Your product has been created and saved to the database. Redirecting to dashboard...
              </p>
              <div className="w-full bg-gray-100 h-1 overflow-hidden">
                <motion.div
                  initial={{ width: "100%" }}
                  animate={{ width: "0%" }}
                  transition={{ duration: 2 }}
                  className="h-full bg-[#8B6F47]"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AddProductPage;