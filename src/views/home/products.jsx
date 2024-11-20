"use client";
import { ProductCard } from "@/components";
import { Info } from "@/icons";
import { getServerSideData } from "@/utils/get-api";
import Image from "next/image";
import { useEffect, useState } from "react";

const Products = ({ data }) => {
  const [selected, setSelected] = useState(data?.search_words[0]?.text);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const resp = await getServerSideData(
          `/custom-products?search_word=${selected}&page=1&pageSize=5`,
          true
        );
        // console.log(resp?.data);
        setProducts(resp?.data);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [selected]);

  // Category selection handler
  const handleCategorySelect = (text) => {
    setSelected(text);
  };

  return (
    <div className="flex flex-col lg:flex-row max-w-[1600px] w-full mx-auto px-4 sm:px-8 gap-8">
      <div className="lg:w-[26%]">
        <h2 className="text-[#242424] text-[26px] font-poppins font-semibold text-center lg:text-start">
          {data?.title}
        </h2>
        <p className="text-[#777777] text-sm font-lato mt-2 mb-4 text-center lg:text-start">
          {data?.description}
        </p>
        <div className="flex flex-row lg:flex-col gap-4 flex-wrap justify-center">
          {data?.search_words?.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => handleCategorySelect(item?.text)}
            >
              <Image
                src={item?.icon?.data?.attributes?.url}
                alt={item?.text}
                width={24}
                height={24}
              />
              <p
                className={`text-sm font-poppins font-semibold uppercase ${
                  selected === item?.text ? "text-[#83B735]" : "text-third"
                }`}
              >
                {item?.text}
              </p>
            </div>
          ))}
        </div>
      </div>
      {loading ? (
        <div className="text-primary flex justify-center items-center w-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="animate-spin size-8"
          >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
        </div>
      ) : products?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2 w-full h-fit">
          {products?.map((product, index) => (
            <ProductCard key={index} product={product} isSearch={true} />
          ))}
        </div>
      ) : (
        <div className="text-white flex items-center gap-4 bg-[#e0b252] px-8 py-6 mt-3 h-fit w-full">
          <Info />
          <p className="text-sm font-lato">
            No products were found matching your selection.
          </p>
        </div>
      )}
    </div>
  );
};

export default Products;
