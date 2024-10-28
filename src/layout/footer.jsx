"use client";
// import { useEffect } from "react";
// import { FooterCol, IconButton } from "@/components";
// import { useParams } from "next/navigation";
// import Image from "next/image";

const Footer = ({ data }) => {
  return (
    <div className="flex justify-center items-center w-full">
      {/* <div className="max-w-[1440px] w-full px-5 sm:px-12 py-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-y-8">
        <FooterCol title={data?.about?.title} items={data?.about?.links} />
        <FooterCol title={data?.support?.title} items={data?.support?.links} />
        <FooterCol title={data?.faq?.title} items={data?.faq?.links} />
        <FooterCol
          title={data?.collaboration?.title}
          items={data?.collaboration?.links}
        />
        <div className="col-span-2 sm:col-span-2">
          <div className="flex items-center gap-2">
            <Image
              src={data?.title?.logo}
              //priority={true}
              width={32}
              height={32}
              alt="logo"
            />
            <p className="text-primary text-xl font-plus leading-9 font-bold">
              {data?.title?.name}
            </p>
          </div>
          <p className="text-third font-plus leading-6 font-medium mt-2">
            {data?.address}
          </p>
          <div className="flex gap-4 my-6">
            {data?.logo?.map((item, index) => (
              <a
                key={index}
                href={item?.link}
                aria-label={index}
                target="_blank"
                className="scale-1 hover:scale-[1.1] transition-all cursor-pointer"
              >
                <Image
                  src={item?.icon}
                  //priority={true}
                  width={24}
                  height={24}
                  alt="icon"
                  className="object-cover"
                />
              </a>
            ))}
          </div>
          <a href={data?.whatsapp_button?.link} target="_blank">
            <IconButton
              text={data?.whatsapp_button?.title}
              isStarted={true}
              isWhatsapp={true}
            />
          </a>
        </div>
      </div> */}
    </div>
  );
};

export default Footer;
