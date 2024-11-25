"use client";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRef, useState, useEffect } from "react";
import { ChevronDown } from "@/icons";

const Shop = ({ data }) => {
  const sliderRef = useRef();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(3);
  let isDragging = false;

  const handleBeforeChange = () => {
    isDragging = true; // Set dragging to true when the slider starts moving
  };

  const handleAfterChange = (index) => {
    isDragging = false; // Reset dragging after the slider stops moving
    setCurrentSlide(index); // Update the current slide
  };

  useEffect(() => {
    // Adjust slidesToShow dynamically based on screen width
    const updateSlidesToShow = () => {
      if (window.innerWidth <= 640) {
        setSlidesToShow(1);
      } else if (window.innerWidth <= 1024) {
        setSlidesToShow(2);
      } else {
        setSlidesToShow(3);
      }
    };

    updateSlidesToShow();
    window.addEventListener("resize", updateSlidesToShow);

    return () => window.removeEventListener("resize", updateSlidesToShow);
  }, []);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
    beforeChange: handleBeforeChange, // Detect slider drag start
    afterChange: handleAfterChange, // Detect slider drag end
  };

  return (
    <div className="mt-[980px] sm:mt-[600px] md:mt-[420px] lg:mt-[330px] relative container mx-auto mb-12 shops">
      <div
        className={`absolute left-0 top-1/2 transform rotate-90 w-5 h-5 -translate-y-1/2 z-10 ${
          data?.length > slidesToShow ? "" : "block lg:hidden"
        } ${
          currentSlide === 0
            ? "cursor-not-allowed text-[#a5a5a5]"
            : "cursor-pointer"
        }`}
        onClick={() => {
          if (currentSlide !== 0) sliderRef.current.slickPrev();
        }}
      >
        <ChevronDown />
      </div>

      <div className="overflow-hidden">
        <Slider ref={sliderRef} {...settings}>
          {data?.map((item, index) => (
            <div
              key={index}
              className="flex justify-center items-center w-full h-full outline-none"
            >
              <Link
                href={item?.attributes?.slug}
                className="w-fit outline-none"
                onClick={(e) => {
                  if (isDragging) {
                    e.preventDefault(); // Prevent the link from opening if dragging
                  }
                }}
              >
                <Image
                  src={item?.attributes?.image?.data?.attributes?.url}
                  alt={item?.attributes?.name}
                  width={200}
                  height={200}
                />
              </Link>
            </div>
          ))}
        </Slider>
      </div>

      <div
        className={`absolute right-0 top-1/2 transform rotate-[270deg] -translate-y-1/2 w-5 h-5 z-10 ${
          data?.length > slidesToShow ? "" : "block lg:hidden"
        } ${
          currentSlide >= data?.length - slidesToShow
            ? "cursor-not-allowed text-[#a5a5a5]"
            : "cursor-pointer"
        }`}
        onClick={() => {
          if (currentSlide < data?.length - slidesToShow)
            sliderRef.current.slickNext();
        }}
      >
        <ChevronDown />
      </div>
    </div>
  );
};

export default Shop;
