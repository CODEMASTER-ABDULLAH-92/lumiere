"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  CreditCard,
  Truck,
  ShieldCheck,
  MapPin,
  CheckCircle,
} from "lucide-react";

const PlaceOrder = () => {
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const productPrice = 500;
  const shipping = 0;
  const cardFee = paymentMethod === "card" ? 20 : 0;
  const total = productPrice + shipping + cardFee;

  return (
    <section className="min-h-screen bg-[#fafafa] text-[#191919]">
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl font-serif mb-10"
        >
          Place Order
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-10">
            {/* Address */}
            <div className="bg-white border p-6">
              <h2 className="text-sm uppercase tracking-widest mb-4">
                Shipping Address
              </h2>

              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full border px-4 py-3 text-sm"
                />
                <input
                  type="text"
                  placeholder="Phone Number"
                  className="w-full border px-4 py-3 text-sm"
                />
                <input
                  type="text"
                  placeholder="Complete Address"
                  className="w-full border px-4 py-3 text-sm"
                />
                <input
                  type="text"
                  placeholder="City"
                  className="w-full border px-4 py-3 text-sm"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white border p-6">
              <h2 className="text-sm uppercase tracking-widest mb-6">
                Payment Method
              </h2>

              {/* COD */}
              <label className="flex items-start gap-4 border p-4 cursor-pointer mb-4">
                <input
                  type="radio"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                />
                <div>
                  <p className="font-medium flex items-center gap-2">
                    <Truck className="w-4 h-4" />
                    Cash on Delivery
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Pay when your order arrives. No extra charges.
                  </p>
                </div>
              </label>

              {/* Card */}
              <label className="flex items-start gap-4 border p-4 cursor-pointer">
                <input
                  type="radio"
                  checked={paymentMethod === "card"}
                  onChange={() => setPaymentMethod("card")}
                />
                <div className="w-full">
                  <p className="font-medium flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    Debit / Credit Card
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Secure card payment. Bank fee may apply.
                  </p>

                  {paymentMethod === "card" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                      <input
                        type="text"
                        placeholder="Card Number"
                        className="border px-4 py-3 text-sm"
                      />
                      <input
                        type="text"
                        placeholder="Card Holder Name"
                        className="border px-4 py-3 text-sm"
                      />
                      <input
                        type="text"
                        placeholder="MM / YY"
                        className="border px-4 py-3 text-sm"
                      />
                      <input
                        type="text"
                        placeholder="CVV"
                        className="border px-4 py-3 text-sm"
                      />
                    </div>
                  )}
                </div>
              </label>
            </div>
          </div>

          {/* RIGHT – SUMMARY */}
          <div className="bg-white border p-6 h-fit sticky top-10">
            <h2 className="text-sm uppercase tracking-widest mb-6">
              Order Summary
            </h2>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Product</span>
                <span>PKR {productPrice}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>

              {paymentMethod === "card" && (
                <div className="flex justify-between text-gray-500">
                  <span>Bank Charges</span>
                  <span>PKR {cardFee}</span>
                </div>
              )}

              <hr />

              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>PKR {total}</span>
              </div>
            </div>

            <button className="w-full mt-6 bg-[#191919] text-white py-4 text-[12px] uppercase tracking-[0.25em] hover:bg-[#333] transition">
              Confirm Order
            </button>

            {/* Trust */}
            <div className="mt-6 space-y-2 text-xs text-gray-500">
              <p className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4" />
                Secure Checkout
              </p>
              <p className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Verified Payment Methods
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                Nationwide Delivery
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlaceOrder;
