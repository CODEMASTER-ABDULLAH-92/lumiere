// lib/apiHandler.js
import connectDB from "./mongodb";

/**
 * Higher-order function to wrap API route handlers with:
 * - Database connection
 * - Error handling
 * - Standardized response format
 */
export function apiHandler(handler) {
  return async (req, res) => {
    try {
      // Connect to database
      await connectDB();

      // Call the actual handler
      await handler(req, res);
    } catch (error) {
      console.error("❌ API Error:", error);

      // Mongoose validation error
      if (error.name === "ValidationError") {
        const errors = Object.values(error.errors).map((err) => ({
          field: err.path,
          message: err.message,
        }));
        
        return res.status(400).json({
          success: false,
        message: "Validation Error",
          errors,
        });
      }

      // Mongoose duplicate key error
      if (error.code === 11000) {
        const field = Object.keys(error.keyValue)[0];
        return res.status(409).json({
          success: false,
          message: `Duplicate value for ${field}. This ${field} already exists.`,
        });
      }

      // Mongoose cast error (invalid ObjectId, etc.)
      if (error.name === "CastError") {
        return res.status(400).json({
          success: false,
          message: "Invalid ID format",
        });
      }

      // Default server error
      return res.status(500).json({
        success: false,
        message: "Internal server error",
        error: process.env.NODE_ENV === "development" ? error.message : undefined,
      });
    }
  };
}

/**
 * Standardized success response
 */
export function successResponse(res, data, message = "Success", statusCode = 200) {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
}

/**
 * Standardized error response
 */
export function errorResponse(res, message = "Error", statusCode = 400) {
  return res.status(statusCode).json({
    success: false,
    message,
  });
}

/**
 * Pagination helper
 */
export function paginate(query, page = 1, limit = 10) {
  const skip = (page - 1) * limit;
  return query.skip(skip).limit(limit);
}

/**
 * Generate pagination metadata
 */
export function paginationMeta(total, page, limit) {
  return {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    hasNextPage: page * limit < total,
    hasPrevPage: page > 1,
  };
}