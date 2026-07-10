import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ProductCardProps {
  name: string;
  price: string;
  image: any;
  id:number
}

const ProductCard: React.FC<ProductCardProps> = ({ name, price, image ,id}) => {
  return (
    <div
      className="
        group
        bg-[#F9F6F2]
        border border-black/10
        p-6 sm:p-7
        transition-all duration-500
        hover:border-black
      "
    >
      {/* Image */}
      <div className="relative flex justify-center mb-6 sm:mb-8">
        <img
          src={image}
          alt={name}
          className="
            w-[120px]
            sm:w-[140px]
            md:w-37.5
            h-auto
            transition-transform duration-500
            group-hover:scale-105
          "
        />
      </div>

      {/* Divider */}
      <div className="w-full h-[1px] bg-black/10 mb-4" />

      {/* Product Info */}
      <h3 className="text-xs sm:text-sm uppercase tracking-wide mb-2">
        {name}
      </h3>

      <p className="text-sm sm:text-base font-medium">
        {price}
      </p>

      {/* Hover CTA */}
      <div className="mt-4 overflow-hidden h-5">
        <Link href={`product_detials/${id}`}
          className="
            block text-[10px] sm:text-xs uppercase tracking-widest
            translate-y-6 opacity-0
            transition-all duration-500
            group-hover:translate-y-0
            group-hover:opacity-100
          "
        >
<div>
</div>
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
