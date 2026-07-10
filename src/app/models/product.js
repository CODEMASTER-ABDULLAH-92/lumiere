import mongoose from "mongoose";

const platformSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Platform name is required"],
    enum: [
      "Amazon",
      "Nykaa",
      "Flipkart",
      "Myntra",
      "Alibaba",
      "Tata Cliq",
      "Ajio",
      "Shoppers Stop",
    ],
  },
  url: {
    type: String,
    required: [true, "Affiliate URL is required"],
    validate: {
      validator: function (v) {
        // More lenient URL validation
        return /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/.test(
          v,
        );
      },
      message: "Please enter a valid URL",
    },
  },
  affiliateId: {
    type: String,
    trim: true,
  },
  active: {
    type: Boolean,
    default: true,
  },
  icon: {
    type: String,
    default: "A",
  },
  color: {
    type: String,
    default: "bg-gray-500",
  },
});

const productSchema = new mongoose.Schema(
  {
    // Basic Information
    productName: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxlength: [200, "Product name cannot exceed 200 characters"],
      index: true,
    },
    brand: {
      type: String,
      required: [true, "Brand name is required"],
      trim: true,
      default: "Lumière Beauty",
    },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: [
        "Skincare",
        "Haircare",
        "Makeup",
        "Fragrance",
        "Body Care",
        "Travel Size",
        "Women",
        "Men",
        "Kids",
        "Gift",
        "Best Sellers",
      ],
    },
    subCategory: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      maxlength: [2000, "Description cannot exceed 2000 characters"],
    },
    highlights: [
      {
        type: String,
        trim: true,
        maxlength: [100, "Highlight cannot exceed 100 characters"],
      },
    ],

    // Pricing & Commission
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    comparePrice: {
      type: Number,
      min: [0, "Compare price cannot be negative"],
      default: null,
    },
    commission: {
      type: Number,
      required: [true, "Commission is required"],
      min: [0, "Commission cannot be negative"],
    },
    commissionType: {
      type: String,
      enum: ["percentage", "fixed"],
      default: "percentage",
    },
    currency: {
      type: String,
      default: "INR",
      enum: ["INR", "USD", "EUR", "GBP", "AUD"],
    },

    // Images
    mainImage: {
      url: {
        type: String,
        required: [true, "Main product image is required"],
      },
      publicId: {
        type: String,
      },
      altText: {
        type: String,
        default: "Product image",
      },
    },
    galleryImages: [
      {
        url: {
          type: String,
          required: true,
        },
        publicId: {
          type: String,
        },
        altText: {
          type: String,
          default: "Product gallery image",
        },
      },
    ],

    // Affiliate Platforms
    platforms: {
      type: [platformSchema],
      validate: {
        validator: function (v) {
          return v.length > 0;
        },
        message: "At least one affiliate platform is required",
      },
    },

    // SEO & Meta
    metaTitle: {
      type: String,
      maxlength: [60, "Meta title should be under 60 characters"],
    },
    metaDescription: {
      type: String,
      maxlength: [160, "Meta description should be under 160 characters"],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
      sparse: true, // Allow null/undefined values
    },
    tags: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],

    // Product Status
    status: {
      type: String,
      enum: ["active", "draft", "inactive"],
default: "active",
    },
    stockStatus: {
      type: String,
      enum: ["in_stock", "out_of_stock", "coming_soon"],
      default: "in_stock",
    },

    // Featured & Best Seller Flags
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isBestSeller: {
      type: Boolean,
      default: false,
    },

    // Analytics & Tracking
    clicks: {
      type: Number,
      default: 0,
      min: 0,
    },
    conversions: {
      type: Number,
      default: 0,
      min: 0,
    },
    revenue: {
      type: Number,
      default: 0,
      min: 0,
    },
    conversionRate: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Additional Information
    sku: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },
    weight: {
      type: String,
      trim: true,
    },
    dimensions: {
      type: String,
      trim: true,
    },
    notes: {
      type: String,
      maxlength: [500, "Notes cannot exceed 500 characters"],
    },

    // Product ID (Custom format: LUM-XXX)
    productId: {
      type: String,
      unique: true,
      sparse: true, // Allow null values for new documents before save
      trim: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Virtual for display price
productSchema.virtual("displayPrice").get(function () {
  if (this.currency === "INR") {
    return `₹${this.price?.toLocaleString("en-IN") || "0"}`;
  }
  return `${this.currency} ${this.price || 0}`;
});

// Virtual for display compare price
productSchema.virtual("displayComparePrice").get(function () {
  if (!this.comparePrice) return null;
  if (this.currency === "INR") {
    return `₹${this.comparePrice.toLocaleString("en-IN")}`;
  }
  return `${this.currency} ${this.comparePrice}`;
});

// Virtual for display revenue
productSchema.virtual("displayRevenue").get(function () {
  if (this.currency === "INR") {
    return `₹${this.revenue?.toLocaleString("en-IN") || "0"}`;
  }
  return `${this.currency} ${this.revenue || 0}`;
});

// Virtual for discount percentage
productSchema.virtual("discountPercentage").get(function () {
  if (this.comparePrice && this.comparePrice > this.price) {
    return Math.round(
      ((this.comparePrice - this.price) / this.comparePrice) * 100,
    );
  }
  return 0;
});

// Pre-save middleware to generate productId and slug
// FIXED: Removed 'next' callback - use only async/await
productSchema.pre("save", async function () {
  try {
    // Generate productId if not provided
    if (!this.productId) {
      const Product = this.constructor;
      const lastProduct = await Product.findOne({}, { productId: 1 })
        .sort({ createdAt: -1 })
        .limit(1)
        .lean();

      let nextNumber = 1;
      if (lastProduct && lastProduct.productId) {
        const lastNumber = parseInt(lastProduct.productId.split("-")[1]);
        if (!isNaN(lastNumber)) {
          nextNumber = lastNumber + 1;
        }
      }

      this.productId = `LUM-${String(nextNumber).padStart(3, "0")}`;
    }

    // Generate slug if not provided
    if (!this.slug && this.productName) {
      this.slug =
        this.productName
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/^-|-$/g, "") +
        "-" +
        this.productId.toLowerCase();
    }

    // Generate SKU if not provided
    if (!this.sku && this.category) {
      this.sku = `LUM-${this.category.substring(0, 3).toUpperCase()}-${Date.now().toString().slice(-6)}`;
    }

    // Calculate conversion rate
    if (this.clicks > 0) {
      this.conversionRate = (this.conversions / this.clicks) * 100;
    }
  } catch (error) {
    // In Mongoose 7+, throw the error directly instead of calling next(error)
    throw error;
  }
});

// Index for better query performance
productSchema.index({ category: 1, status: 1 });
productSchema.index({ isFeatured: 1, status: 1 });
productSchema.index({ isBestSeller: 1, status: 1 });
productSchema.index({ tags: 1 });
productSchema.index({ "platforms.name": 1 });
productSchema.index({ createdAt: -1 });
productSchema.index({ clicks: -1 });
productSchema.index({ revenue: -1 });

// Check if model exists before creating
const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;
