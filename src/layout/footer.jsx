"use client";
import { SocialLinks } from "@/components";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Footer = ({ data, icons }) => {
  const [showCookieBanner, setShowCookieBanner] = useState(false);

  useEffect(() => {
    // Check if the cookie "userConsent" exists
    const consent = document.cookie
      .split("; ")
      .find((row) => row.startsWith("userConsent="));
    if (!consent) {
      setShowCookieBanner(true); // Show the banner if no cookie found
    }
  }, []);
  return (
    <div
      className={`flex justify-center items-center w-full bg-[#f7f7f7] ${
        showCookieBanner ? "pb-24" : ""
      }`}
    >
      <div className="max-w-[1600px] w-full sm:mx-8 mx-4 my-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-10 gap-x-4">
        {/* <div className="flex flex-col sm:flex-row w-full gap-y-12 gap-x-24"> */}
        <div className="flex flex-col gap-6 h-full justify-between">
          <Link href="/">
            <Image
              src={icons?.logo?.data?.attributes?.url}
              width={160}
              height={58}
              alt="logo"
            />
          </Link>
          <p className="text-sm font-lato text-[#767676]">
            {data?.description}
          </p>
        </div>
        <div className="flex lg:justify-center sm:order-3 lg:order-2">
          <div className="w-fit">
            {data?.footer_links?.map((item, index) => (
              <Link
                className="text-sm font-lato font-medium text-gray1 mb-4 block whitespace-nowrap w-fit"
                href={item?.link}
                key={index}
              >
                {item?.text}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex lg:justify-center sm:order-4 lg:order-3">
          <div className="w-fit">
            {data?.footer_links2?.map((item, index) => (
              <Link
                className="text-sm font-lato font-medium text-gray1 mb-4 block whitespace-nowrap w-fit"
                href={item?.link}
                key={index}
              >
                {item?.text}
              </Link>
            ))}
          </div>
        </div>
        <div className="sm:order-2 lg:order-4 flex flex-col gap-6 h-full justify-between">
          <SocialLinks data={icons?.social_links} />
          <p className="text-sm font-lato text-[#767676] mt-6">
            {data?.copyright}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
