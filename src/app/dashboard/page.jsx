"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Package,
  Plus,
  Edit,
  Trash2,
  Search,
  X,
  Check,
  ExternalLink,
  TrendingUp,
  DollarSign,
  BarChart3,
  Settings,
  Menu,
  AlertCircle,
  RefreshCw,
  Loader2,
  Eye,
} from "lucide-react";

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

/* -------------------- STATUS BADGE -------------------- */
const StatusBadge = ({ status }) => {
  const styles = {
    active: "bg-green-100 text-green-700 border-green-200",
    draft: "bg-yellow-100 text-yellow-700 border-yellow-200",
    inactive: "bg-gray-100 text-gray-500 border-gray-200",
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium border ${styles[status]}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${
        status === "active" ? "bg-green-500" : status === "draft" ? "bg-yellow-500" : "bg-gray-400"
      }`} />
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

/* -------------------- MAIN DASHBOARD -------------------- */
const Dashboard = () => {
  const router = useRouter();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [togglingId, setTogglingId] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setSidebarOpen(window.innerWidth >= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch products from API
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/product?limit=100&sortBy=createdAt&sortOrder=desc");
      const data = await response.json();

      if (data.success) {
        setProducts(data.data);
      } else {
        setError(data.message || "Failed to fetch products");
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Failed to load products. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Filter and sort products
  const filteredProducts = products
    .filter((product) => {
      const matchesSearch =
        (product.productName || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.productId || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (product.brand || "").toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === "all" || product.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      if (sortBy === "newest") return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === "clicks") return (b.clicks || 0) - (a.clicks || 0);
      if (sortBy === "revenue") return (b.revenue || 0) - (a.revenue || 0);
      if (sortBy === "name") return (a.productName || "").localeCompare(b.productName || "");
      return 0;
    });

  // Stats calculations
  const stats = {
    totalProducts: products.length,
    activeProducts: products.filter(p => p.status === "active").length,
    totalClicks: products.reduce((sum, p) => sum + (p.clicks || 0), 0),
    totalRevenue: products.reduce((sum, p) => sum + (p.revenue || 0), 0),
    totalConversions: products.reduce((sum, p) => sum + (p.conversions || 0), 0),
  };

  // Handle Toggle Product Status
  const handleToggleStatus = async (id) => {
    setTogglingId(id);
    try {
      const product = products.find(p => (p._id === id || p.productId === id));
      const newStatus = product.status === "active" ? "inactive" : "active";
      
      const response = await fetch("/api/product/status", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });

      const data = await response.json();

      if (data.success) {
        setProducts(prev =>
          prev.map(p =>
            (p._id === id || p.productId === id) ? { ...p, status: newStatus } : p
          )
        );
      }
    } catch (err) {
      console.error("Error toggling status:", err);
    } finally {
      setTogglingId(null);
    }
  };

  // Handle Delete Product
  const handleDeleteProduct = async (id) => {
    setDeleting(true);
    try {
      const response = await fetch(`/api/product/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        setProducts(prev => prev.filter(p => p._id !== id && p.productId !== id));
        setShowDeleteConfirm(null);
      }
    } catch (err) {
      console.error("Error deleting product:", err);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4EAE3]/30 flex">
      {/* ========== MAIN CONTENT ========== */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-[#e5d8cf]">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-4">
              {!sidebarOpen && (
                <button onClick={() => setSidebarOpen(true)} className="text-[#1B1613] hover:text-[#8B6F47] transition-colors">
                  <Menu size={22} strokeWidth={1.5} />
                </button>
              )}
              <h1 className="font-serif text-xl text-[#1B1613]">Product Manager</h1>
            </div>
            <Link
              href="/dashboard/addProduct"
              className="flex items-center gap-2 px-5 py-2.5 bg-[#8B6F47] text-white rounded-lg text-[11px] tracking-wider uppercase hover:bg-[#A6845F] transition-all duration-300 font-medium shadow-lg shadow-[#8B6F47]/20"
            >
              <Plus size={15} strokeWidth={1.5} />
              Add Product
            </Link>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 lg:p-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {[
              { label: "Total Products", value: stats.totalProducts, icon: Package, color: "from-[#8B6F47] to-[#A6845F]" },
              { label: "Active", value: stats.activeProducts, icon: Check, color: "from-green-600 to-green-700" },
              { label: "Total Clicks", value: stats.totalClicks.toLocaleString(), icon: TrendingUp, color: "from-[#1B1613] to-[#3a332c]" },
              { label: "Revenue", value: `₹${(stats.totalRevenue / 100000).toFixed(1)}L`, icon: DollarSign, color: "from-purple-600 to-purple-700" },
            ].map((stat) => (
              <motion.div
                key={stat.label}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-white border border-[#e5d8cf] p-4 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                    <stat.icon size={16} strokeWidth={1.5} className="text-white" />
                  </div>
                  <div>
                    <p className="text-[10px] text-[#9a8d80] tracking-wide uppercase">{stat.label}</p>
                    <p className="text-lg font-medium text-[#1B1613]">{stat.value}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Filters Bar */}
          <div className="bg-white border border-[#e5d8cf] p-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search size={15} strokeWidth={1.5} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9a8d80]" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-[#F4EAE3]/20 border border-[#e5d8cf] text-[13px] text-[#1B1613] placeholder:text-[#9a8d80] focus:outline-none focus:border-[#8B6F47] transition-all duration-300"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2.5 border border-[#e5d8cf] text-[12px] text-[#1B1613] bg-white focus:outline-none focus:border-[#8B6F47] cursor-pointer"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="draft">Draft</option>
                <option value="inactive">Inactive</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2.5 border border-[#e5d8cf] text-[12px] text-[#1B1613] bg-white focus:outline-none focus:border-[#8B6F47] cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="name">Name A-Z</option>
                <option value="clicks">Most Clicks</option>
                <option value="revenue">Highest Revenue</option>
              </select>
            </div>
          </div>

          {/* Products Table */}
          <div className="bg-white border border-[#e5d8cf] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#e5d8cf] bg-[#F4EAE3]/20">
                    <th className="text-left text-[10px] tracking-wider uppercase text-[#9a8d80] font-medium px-6 py-4">Product</th>
                    <th className="text-left text-[10px] tracking-wider uppercase text-[#9a8d80] font-medium px-6 py-4">Price</th>
                    <th className="text-left text-[10px] tracking-wider uppercase text-[#9a8d80] font-medium px-6 py-4">Platforms</th>
                    <th className="text-left text-[10px] tracking-wider uppercase text-[#9a8d80] font-medium px-6 py-4">Revenue</th>
                    <th className="text-right text-[10px] tracking-wider uppercase text-[#9a8d80] font-medium px-6 py-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td colSpan={8} className="px-6 py-12 text-center">
                        <Loader2 size={32} strokeWidth={1.5} className="animate-spin text-[#8B6F47] mx-auto mb-3" />
                        <p className="text-[13px] text-[#9a8d80]">Loading products...</p>
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td colSpan={8} className="px-6 py-12 text-center">
                        <AlertCircle size={40} strokeWidth={1.5} className="text-red-400 mx-auto mb-3" />
                        <p className="text-[13px] text-[#9a8d80] mb-4">{error}</p>
                        <button onClick={fetchProducts} className="inline-flex items-center gap-2 px-4 py-2 bg-[#8B6F47] text-white text-[11px] tracking-wider uppercase hover:bg-[#A6845F] transition-all font-medium">
                          <RefreshCw size={13} />Try Again
                        </button>
                      </td>
                    </tr>
                  ) : filteredProducts.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-6 py-12 text-center">
                        <Package size={40} strokeWidth={1.5} className="text-[#e5d8cf] mx-auto mb-3" />
                        <p className="text-[13px] text-[#9a8d80]">No products found</p>
                        <Link href="/dashboard/addProduct" className="text-[12px] text-[#8B6F47] hover:text-[#1B1613] transition-colors mt-2 inline-block">
                          Add your first product
                        </Link>
                      </td>
                    </tr>
                  ) : (
                    filteredProducts.map((product, index) => (
                      <motion.tr
                        key={product._id || product.productId}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.03 }}
                        className="border-b border-[#e5d8cf]/50 hover:bg-[#F4EAE3]/10 transition-colors"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-[#F4EAE3]/50 flex items-center justify-center flex-shrink-0 overflow-hidden">
                              {product.mainImage?.url ? (
                                <img src={product.mainImage.url} alt={product.productName} width={40} height={40} className="object-cover" />
                              ) : (
                                <Package size={18} strokeWidth={1.5} className="text-[#9a8d80]" />
                              )}
                            </div>
                            <div>
                              <p className="text-[12px] font-medium text-[#1B1613]">{product.productName}</p>
                              <p className="text-[10px] text-[#9a8d80]">{product.productId || product._id?.slice(-8)} • {product.category}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-[13px] font-medium text-[#1B1613]">
                            {product.displayPrice || `₹${product.price?.toLocaleString("en-IN")}`}
                          </p>
                          {product.comparePrice && (
                            <p className="text-[10px] text-[#9a8d80] line-through">₹{product.comparePrice?.toLocaleString("en-IN")}</p>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1 max-w-[180px]">
                            {product.platforms?.filter(p => p.active).slice(0, 2).map((platform) => (
                              <span key={platform.name} className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[9px] border border-[#e5d8cf] text-[#9a8d80] rounded-full">
                                <span className={`w-2 h-2 rounded-full ${platform.color || "bg-gray-400"}`} />
                                {platform.name}
                              </span>
                            ))}
                            {product.platforms?.filter(p => p.active).length > 2 && (
                              <span className="text-[9px] text-[#9a8d80]">+{product.platforms.filter(p => p.active).length - 2}</span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-[13px] font-medium text-[#1B1613]">
                            {product.displayRevenue || `₹${(product.revenue || 0).toLocaleString("en-IN")}`}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-1">
                            {/* Toggle Status */}
                            <button
                              onClick={() => handleToggleStatus(product._id || product.productId)}
                              disabled={togglingId === (product._id || product.productId)}
                              className={`p-2 transition-colors ${
                                product.status === "active" ? "text-green-600 hover:bg-green-50" : "text-[#9a8d80] hover:bg-gray-50"
                              }`}
                              title={product.status === "active" ? "Deactivate" : "Activate"}
                            >
                              {togglingId === (product._id || product.productId) ? (
                                <Loader2 size={15} strokeWidth={1.5} className="animate-spin" />
                              ) : product.status === "active" ? (
                                <Check size={15} strokeWidth={1.5} />
                              ) : (
                                <RefreshCw size={15} strokeWidth={1.5} />
                              )}
                            </button>

                            {/* View Product */}
                            <Link
                              href={`/product_detials/${product._id || product.productId}`}
                              target="_blank"
                              className="p-2 text-[#9a8d80] hover:text-[#8B6F47] hover:bg-[#F4EAE3]/30 transition-colors"
                              title="View"
                            >
                              <Eye size={15} strokeWidth={1.5} />
                            </Link>

                            {/* Edit */}
                            <Link
                              href={`/dashboard/updateProduct/${product._id || product.productId}`}
                              className="p-2 text-[#9a8d80] hover:text-[#8B6F47] hover:bg-[#F4EAE3]/30 transition-colors"
                              title="Edit"
                            >
                              <Edit size={15} strokeWidth={1.5} />
                            </Link>

                            {/* Delete */}
                            <button
                              onClick={() => setShowDeleteConfirm(product._id || product.productId)}
                              className="p-2 text-[#9a8d80] hover:text-red-500 hover:bg-red-50 transition-colors"
                              title="Delete"
                            >
                              <Trash2 size={15} strokeWidth={1.5} />
                            </button>
                          </div>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination Info */}
          <div className="flex items-center justify-between mt-6 text-[12px] text-[#9a8d80]">
            <p>Showing {filteredProducts.length} of {products.length} products</p>
          </div>
        </main>
      </div>

      {/* ========== DELETE CONFIRMATION MODAL ========== */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowDeleteConfirm(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full max-w-md p-8 shadow-2xl text-center"
            >
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
                <Trash2 size={28} strokeWidth={1.5} className="text-red-500" />
              </div>
              <h3 className="font-serif text-xl text-[#1B1613] mb-2">Delete Product?</h3>
              <p className="text-[13px] text-[#9a8d80] mb-6">
                This action cannot be undone. All data associated with this product will be permanently removed.
              </p>
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(null)}
                  className="px-6 py-3 border border-[#e5d8cf] text-[11px] tracking-wider uppercase text-[#1B1613] hover:bg-[#F4EAE3] transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteProduct(showDeleteConfirm)}
                  disabled={deleting}
                  className="px-6 py-3 bg-red-500 text-white text-[11px] tracking-wider uppercase hover:bg-red-600 transition-colors font-medium disabled:opacity-50 flex items-center gap-2"
                >
                  {deleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                  {deleting ? "Deleting..." : "Delete"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;