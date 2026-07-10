// app/api/products/[id]/route.js
import { NextResponse } from "next/server";
import Product from "../../../models/product";
import { apiHandler } from "../../../lib/apiHandler";
import connectDB from '../../../lib/mongodb'
// GET /api/products/[id] - Get single product




// PATCH /api/products/[id] - Partial update product
export async function PATCH(request, { params }) {
  return apiHandler(async (req, res) => {
    const { id } = params;
    const body = await request.json();
    
    // Remove protected fields
    delete body._id;
    delete body.productId;
    delete body.createdAt;
    delete body.updatedAt;
    delete body.clicks;
    delete body.conversions;
    delete body.revenue;
    delete body.conversionRate;
    
    const product = await Product.findOneAndUpdate(
      {
        $or: [{ productId: id }, { _id: id }],
      },
      { $set: body },
      {
        new: true,
        runValidators: true,
      }
    );
    
    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  });
}


export async function GET(request, { params }) {
  try {
    await connectDB();
    
    const { id } = await params; // ✅ Await params in Next.js 15+
    
    console.log("📥 Fetching product with ID:", id);
    
    if (!id) {
      return NextResponse.json(
        { success: false, message: "Product ID is required" },
        { status: 400 }
      );
    }
    
    // Find by productId, _id, or slug
    const query = { $or: [{ productId: id }, { slug: id }] };
    
    // Only add _id search if it's a valid MongoDB ObjectId
    if (id.match(/^[0-9a-fA-F]{24}$/)) {
      query.$or.push({ _id: id });
    }
    
    const product = await Product.findOne(query).select("-__v").lean();
    
    if (!product) {
      console.log("❌ Product not found:", id);
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }
    
    console.log("✅ Product found:", product.productName);
    
    return NextResponse.json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error("❌ GET /api/product/[id] Error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to fetch product" },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    await connectDB();
    
    const { id } = await params;
    const body = await request.json();
    
    // Remove protected fields
    delete body._id;
    delete body.productId;
    delete body.createdAt;
    delete body.updatedAt;
    delete body.clicks;
    delete body.conversions;
    delete body.revenue;
    delete body.conversionRate;
    
    const product = await Product.findOneAndUpdate(
      { $or: [{ productId: id }, { _id: id }] },
      { $set: body },
      { new: true, runValidators: true }
    );
    
    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    console.error("❌ PUT /api/product/[id] Error:", error);
    
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
      { success: false, message: error.message || "Failed to update product" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    
    const { id } = await params;
    
    const product = await Product.findOneAndDelete({
      $or: [{ productId: id }, { _id: id }],
    });
    
    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error("❌ DELETE /api/product/[id] Error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Failed to delete product" },
      { status: 500 }
    );
  }
}