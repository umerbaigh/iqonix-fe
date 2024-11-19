"use client";
import { Search } from "@/icons";
import React, { useCallback, useState, useEffect } from "react";
import { getServerSideData } from "@/utils/get-api";
import Link from "next/link";
import Image from "next/image";
import { debounce } from "lodash";

const SearchInput = () => {
  const [search, setSearch] = useState("");
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const debouncedFilterProducts = useCallback(
    debounce(async (input) => {
      const products = await getServerSideData(
        `/custom-products?search_word=${input}`,
        true
      );
      console.log(products);
      setProduct(products);
      setLoading(false);
    }, 1000),
    [] // Dependencies for debounce
  );

  useEffect(() => {
    if (search?.length > 2) {
      debouncedFilterProducts(search);
    }
  }, [search, debouncedFilterProducts]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
    if (e.target.value.length > 2) {
      setLoading(true);
    }
  };

  const highlightText = (text, searchWords) => {
    if (!searchWords.length) return text;

    let parts = [text];
    searchWords.forEach((searchWord) => {
      parts = parts.flatMap((part) =>
        typeof part === "string" && part.toLowerCase().includes(searchWord)
          ? part
              .split(new RegExp(`(${searchWord})`, "i"))
              .flatMap((chunk, idx) =>
                idx % 2 === 1
                  ? [{ text: chunk, highlight: true }]
                  : chunk.split("")
              )
          : [part]
      );
    });

    return parts.map((part, idx) =>
      typeof part === "string" ? (
        <span key={idx}>{part}</span>
      ) : part.highlight ? (
        <strong key={idx}>{part.text}</strong>
      ) : (
        <span key={idx}>{part}</span>
      )
    );
  };

  return (
    <div className="relative flex justify-center items-center w-full max-w-[715px]">
      <input
        type="text"
        placeholder="Search for products"
        value={search}
        onChange={handleSearch}
        className="py-4 lg:py-2 pl-[15px] pr-10 lg:border-2 w-full text-[#767676] placeholder-[#767676] border-borderColor text-sm focus:outline-none"
      />
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
        {loading ? (
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
            className={`animate-spin size-5`}
          >
            <path d="M21 12a9 9 0 1 1-6.219-8.56" />
          </svg>
        ) : (
          <Search />
        )}
      </div>
      {search && product.length !== 0 && (
        <div className="absolute left-0 right-0 max-h-[60vh] grid grid-cols-2 overflow-y-auto filters top-full bg-white border border-gray-300 rounded-b-md shadow-md mt-1 z-10">
          {product?.map((item, index) => (
            <Link
              href={item?.slug}
              key={index}
              className={`flex p-3 gap-3 hover:bg-gray-100 border-b border-[#0000001b] ${
                index % 2 === 0 ? "border-r" : ""
              }`}
            >
              <Image
                src={item?.product_image}
                alt={item?.product_name}
                width={65}
                height={65}
              />
              <div>
                <p className="text-third text-sm font-medium font-poppins mb-2">
                  {item?.product_name.split(" ").map((word, idx) => (
                    <React.Fragment key={idx}>
                      {highlightText(word, search.split(" ").filter(Boolean))}{" "}
                    </React.Fragment>
                  ))}
                </p>
                <p className="text-primary text-sm font-medium font-poppins">
                  {item?.regular_price && (
                    <span className="text-[#bbb] text-[13px] font-normal line-through mr-1">
                      {item?.regular_price} €
                    </span>
                  )}
                  {item?.sale_price} €
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
      {search && product.length === 0 && (
        <ul className="absolute left-0 right-0 top-full bg-white border border-gray-300 rounded-b-md shadow-md mt-1 z-10">
          <li className="py-2 px-4">Not found</li>
        </ul>
      )}
    </div>
  );
};

export default SearchInput;
