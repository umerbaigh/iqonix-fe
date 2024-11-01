"use client";
import Image from "next/image";
import Link from "next/link";

const Shop = ({ data }) => {
  return (
    <div className="mt-[980px] sm:mt-[600px] md:mt-[420px] lg:mt-[330px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 md:gap-0 items-center justify-between container mx-auto">
      {data?.map((item, index) => (
        <Link
          href={item?.attributes?.slug}
          key={index}
          className="flex justify-center"
        >
          <Image
            src={item?.attributes?.image?.data?.attributes?.url}
            alt={item?.attributes?.name}
            width={200}
            height={200}
          />
        </Link>
      ))}
    </div>
  );
};

export default Shop;
