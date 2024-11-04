"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ProductCard } from "@/components";
import { useEffect, useState } from "react";
import { ChevronDown } from "@/icons";

const ITEMS_PER_PAGE = 2;

const Products = ({ departmentName, products, totalProducts }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);

  const currentPage = parseInt(searchParams.get("page")) || 1;
  const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE);

  // Function to handle sorting change
  const handleSortChange = (event) => {
    setLoading(true);
    const order = event.target.value;
    const newSearchParams = new URLSearchParams(searchParams);

    if (order === "none") {
      newSearchParams.delete("order");
    } else {
      newSearchParams.set("order", order);
      newSearchParams.set("page", 1);
    }

    router.push(`?${newSearchParams.toString()}`);
  };

  const handlePageChange = (page) => {
    setLoading(true);
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", page);
    router.push(`?${newSearchParams.toString()}`);
  };

  useEffect(() => {
    setLoading(false);
  }, [currentPage, searchParams]);

  return (
    <div className="max-w-[1600px] mx-auto w-full px-4 sm:px-8 mb-12">
      <div className="flex justify-between items-center mb-4 p-8 bg-[#f8f8f8] w-full">
        <h2 className="text-2xl font-poppins font-semibold text-[#242424]">
          {departmentName}
        </h2>
        <div className="relative inline-block w-fit">
          <select
            className="w-fit border-b-2 border-[#0000001a] pb-1 outline-none focus:outline-none rounded-none text-[#242424] focus:border-primary transition-all duration-300 ease-in-out font-semibold font-lato text-sm bg-[#f8f8f8] appearance-none pr-8"
            onChange={handleSortChange}
            defaultValue={searchParams.get("order") || "none"}
          >
            <option value="none">Sort by</option>
            <option value="date">Sort by newest</option>
            <option value="price">Sort by price: Low to High</option>
            <option value="price-desc">Sort by price: High to Low</option>
          </select>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <div className="w-4 h-4 text-[#242424]">
              <ChevronDown />
            </div>
          </span>
        </div>
      </div>

      {loading ? (
        <p className="text-center text-third align-middle">loading...</p>
      ) : (
        <div className="grid grid-cols-5 gap-4">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      )}

      {totalProducts > ITEMS_PER_PAGE && (
        <div className="flex justify-center mt-8 space-x-2">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-[14px] py-[8px] text-sm font-lato border font-semibold rounded ${
                page === currentPage
                  ? "bg-primary text-white"
                  : "hover:bg-gray-200 text-[#242424]"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
