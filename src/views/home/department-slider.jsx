"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const DepartmentSlider = ({ data }) => {
  const router = useRouter();
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1300,
        settings: { slidesToShow: 5 },
      },
      {
        breakpoint: 1023,
        settings: { slidesToShow: 4 },
      },
      {
        breakpoint: 767,
        settings: { slidesToShow: 2 },
      },
    ],
  };

  const handleClick = (link) => {
    router.push(link);
  };

  return (
    <div className="py-8 overflow-hidden max-w-[1600px] w-full mx-auto">
      <div className="border-b-2 mb-8 flex justify-center">
        <h2 className="border-b-2 w-fit border-primary -mb-[1px] pb-2 text-[22px] text-secondary font-poppins uppercase">
          Shopping by Category
        </h2>
      </div>
      <div className="slider-container mb-16">
        <Slider {...settings}>
          {data?.map((category) => (
            <div key={category?.id} className="px-2">
              <Link href={`/dp/${category?.attributes?.slug}/page/1`}>
                <div className="relative overflow-hidden group cursor-pointer">
                  <Image
                    src={category?.attributes?.image?.data?.attributes?.url}
                    alt={category?.attributes?.name}
                    width={300}
                    height={300}
                    className="object-cover w-full transform scale-[1.2] group-hover:scale-100 transition duration-500 ease-in-out"
                  />
                  <div
                    // onClick={() =>
                    //   handleClick(`/dp/${category?.attributes?.slug}/page/1`)
                    // }
                    className="absolute inset-0 hover:bg-black hover:bg-opacity-30 flex flex-col items-center justify-center transition duration-500 ease-in-out"
                  >
                    <div className="bg-white text-[13px] font-poppins text-third uppercase mt-6 font-medium w-fit h-fit rounded-full px-[10px] pt-[3px] pb-[2px] transform transition duration-500 ease-in-out group-hover:-translate-y-3">
                      {category?.attributes?.name}
                    </div>
                    <div className="text-[13px] font-poppins text-white font-medium opacity-0 transform translate-y-4 transition duration-500 ease-in-out group-hover:opacity-100 group-hover:translate-y-0">
                      100 products
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default DepartmentSlider;
