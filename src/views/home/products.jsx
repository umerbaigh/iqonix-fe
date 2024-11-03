"use client";
import { ProductCard } from "@/components";
import Image from "next/image";
import { useState } from "react";

const Products = ({ data }) => {
  const [selected, setSelected] = useState(0);

  // Category selection handler
  const handleCategorySelect = (index) => {
    setSelected(index);
  };

  return (
    <div className="flex flex-col lg:flex-row max-w-[1600px] w-full mx-auto px-4 sm:px-8 gap-8">
      <div className="lg:w-[26%]">
        <h2 className="text-[#242424] text-[26px] font-poppins font-semibold text-center lg:text-start">
          Must-have Products and more
        </h2>
        <p className="text-[#777777] text-sm font-lato mt-2 mb-4 text-center lg:text-start">
          Everything you need for repairs in one place
        </p>
        <div className="flex flex-row lg:flex-col gap-4 flex-wrap justify-center">
          {data?.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => handleCategorySelect(index)}
            >
              <Image
                src={item?.attributes?.icon?.data?.attributes?.url}
                alt={item?.attributes?.name}
                width={24}
                height={24}
              />
              <p
                className={`text-sm font-poppins font-semibold uppercase ${
                  selected === index ? "text-[#83B735]" : "text-third"
                }`}
              >
                {item?.attributes?.name}
              </p>
            </div>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-2 w-full h-fit">
        {data[selected]?.attributes?.products?.data
          ?.slice(0, 5)
          ?.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
      </div>
    </div>
  );
};

export default Products;
