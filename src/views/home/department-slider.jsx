"use client";
import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

const DepartmentSlider = ({ data }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="my-8 overflow-hidden">
      <h2 className="text-center text-2xl text-[#333333] font-semibold mb-6">
        Shopping by Category
      </h2>
      <div className="slider-container overflow-hidden">
        <Slider {...settings}>
          {data?.map((category) => (
            <div key={category?.id} className="px-2">
              <div className="relative bg-gray-100 rounded-md overflow-hidden">
                <Image
                  src={category?.attributes?.image?.data?.attributes?.url}
                  alt={category?.attributes?.name}
                  width={300}
                  height={300}
                  className="object-cover w-full h-48"
                />
                <div className="absolute top-1/2 translate-x-1/2 bg-white rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                  {category?.attributes?.name?.toUpperCase()}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default DepartmentSlider;
