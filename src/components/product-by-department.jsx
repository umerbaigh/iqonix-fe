"use client";
import { getServerSideData } from "@/utils/get-api";
import Image from "next/image";
import { useState, useEffect } from "react";

const ProductByDepartment = ({ name, isFooter = false }) => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const url = isFooter
        ? "/products/?pagination[limit]=2"
        : `/products/?filters[departments][name][$eq]=${name}&pagination[limit]=2`;
      const resp = await getServerSideData(url, true);
      setProducts(resp?.data);
    };

    fetchData();
  }, [name]);
  return (
    <div>
      {products?.map((item, index) => (
        <div
          key={index}
          className={`flex gap-2 items-center ${
            index === 0 ? "pb-4 border-b border-[#0000001b]" : "pt-4"
          }`}
        >
          <Image
            src={item?.attributes?.product_image}
            alt={item?.attributes?.product_name}
            width={65}
            height={65}
          />
          <div>
            <p className="text-third text-sm font-medium font-poppins mb-2">
              {item?.attributes?.product_name}
            </p>
            <p className="text-primary text-sm font-medium font-poppins">
              {item?.attributes?.regular_price && (
                <span className="text-[#bbb] text-[13px] font-normal line-through mr-1">
                  {item?.attributes?.regular_price} €
                </span>
              )}
              {item?.attributes?.sale_price} €
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductByDepartment;
