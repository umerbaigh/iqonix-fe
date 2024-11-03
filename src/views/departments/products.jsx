"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ProductCard } from "@/components";

const ITEMS_PER_PAGE = 2;

const Products = ({ products }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Get the current page from searchParams or default to 1
  const currentPage = parseInt(searchParams.get("page")) || 1;

  // Calculate total pages based on the number of products and items per page
  const totalPages = 3;

  // Handle page change and update searchParams
  const handlePageChange = (page) => {
    router.push(`?page=${page}`);
  };

  return (
    <div>
      {/* Product Grid */}
      <div className="grid grid-cols-5 gap-4">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-3 py-1 border rounded ${
              page === currentPage ? "bg-primary text-white" : "bg-gray-200"
            }`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Products;
