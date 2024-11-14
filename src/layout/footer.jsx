import { ProductByDepartment, SocialLinks } from "@/components";
import Image from "next/image";
import Link from "next/link";

const Footer = ({ data, icons, products }) => {
  return (
    <div className="flex justify-center items-center w-full bg-[#f7f7f7]">
      <div className="max-w-[1600px] w-full sm:mx-8 mx-4 my-6 flex flex-col lg:flex-row justify-between gap-8">
        <div className="flex flex-col sm:flex-row justify-between w-full sm:w-[85%] lg:w-[55%] gap-8">
          <div className="flex flex-col gap-6">
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
            <SocialLinks data={icons?.social_links} />
          </div>
          <div>
            {data?.footer_links1?.map((item, index) => (
              <Link
                className="text-sm font-lato font-medium text-gray1 mb-4 block whitespace-nowrap"
                href={item?.link}
                key={index}
              >
                {item?.text}
              </Link>
            ))}
          </div>
          <div>
            {data?.footer_links2?.map((item, index) => (
              <Link
                className="text-sm font-lato font-medium text-gray1 mb-4 block whitespace-nowrap"
                href={item?.link}
                key={index}
              >
                {item?.text}
              </Link>
            ))}
          </div>
        </div>
        <div className="w-full max-w-[450px] lg:max-w-none lg:w-[37%]">
          <ProductByDepartment isFooter={true} allProducts={products} />
        </div>
      </div>
    </div>
  );
};

export default Footer;
