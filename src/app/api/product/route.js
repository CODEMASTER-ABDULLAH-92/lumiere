import { NextResponse } from "next/server";
import connectDB from "../../lib/mongodb";
import Product from "../../models/product";


export async function GET(request) {
  try {
    await connectDB();
    
    const { searchParams } = new URL(request.url);
    
    console.log("📥 GET /api/product - Raw params:", Object.fromEntries(searchParams));
    
    // Pagination
    const page = parseInt(searchParams.get("page")) || 1;
    const limit = parseInt(searchParams.get("limit")) || 10;
    
    // Filters
    const category = searchParams.get("category");
    const subCategory = searchParams.get("subCategory");
    const status = searchParams.get("status");
    const search = searchParams.get("search");
    
    // Sorting
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") || "desc";
    
    // Build query
    const query = {};
    
    // ✅ FIX: Exact match for category
    if (category && category !== "all") {
      query.category = category;
      console.log("🔍 Filtering by category:", category);
    }
    
    if (subCategory) {
      query.subCategory = subCategory;
    }
    
    if (status && status !== "all") {
      query.status = status;
      console.log("🔍 Filtering by status:", status);
    }
    
    // Search across multiple fields
    if (search) {
      query.$or = [
        { productName: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } },
        { productId: { $regex: search, $options: "i" } },
        { tags: { $regex: search, $options: "i" } },
      ];
    }
    
    console.log("🔍 Final MongoDB Query:", JSON.stringify(query));
    
    // Build sort object
    const sortObj = {};
    sortObj[sortBy] = sortOrder === "asc" ? 1 : -1;
    
    // First, let's check what categories exist in the database
    const allCategories = await Product.distinct("category");
    console.log("📊 All categories in DB:", allCategories);
    
    // Check total count without filters
    const totalInDB = await Product.countDocuments({});
    console.log("📊 Total products in DB:", totalInDB);
    
    // Execute query with pagination
    const total = await Product.countDocuments(query);
    console.log("📊 Matching products count:", total);
    
    const products = await Product.find(query)
      .sort(sortObj)
      .skip((page - 1) * limit)
      .limit(limit)
      .select("-__v")
      .lean();
    
    console.log(`✅ Returning ${products.length} products`);
    
    const totalPages = Math.ceil(total / limit);
    
    return NextResponse.json({
      success: true,
      data: products,
      pagination: {
        total,
        page,
        limit,
        totalPages,
        hasNextPage: page * limit < total,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    console.error("❌ GET /api/product Error:", error);
    return NextResponse.json(
      { 
        success: false, 
        message: error.message || "Failed to fetch products",
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();
    
    const body = await request.json();
    
    console.log("📦 Creating product:", body.productName, "| Category:", body.category);
    
    // Validate required fields
    if (!body.productName || !body.category || !body.price || !body.description) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }
    
    const product = await Product.create(body);
    
    console.log("✅ Product created:", product.productId);
    
    return NextResponse.json(
      { success: true, message: "Product created successfully", data: product },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ POST Error:", error.message);
    
    if (error.name === "ValidationError") {
      const errors = Object.values(error.errors).map((err) => ({
        field: err.path,
        message: err.message,
      }));
      return NextResponse.json(
        { success: false, message: "Validation Error", errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

// PUT /api/product - Bulk update products
export async function PUT(request) {
  try {
    await connectDB();
    
    const body = await request.json();
    const { ids, updates } = body;
    
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { success: false, message: "Product IDs are required" },
        { status: 400 }
      );
    }
    
    const result = await Product.updateMany(
      { _id: { $in: ids } },
      { $set: updates },
      { runValidators: true }
    );
    
    return NextResponse.json({
      success: true,
      message: `${result.modifiedCount} products updated successfully`,
      data: { modifiedCount: result.modifiedCount },
    });
  } catch (error) {
    console.error("PUT /api/product Error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to update products" },
      { status: 500 }
    );
  }
}


