"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Search } from "@/icons";
import { Menu, MenuHandler, MenuList, Button } from "@material-tailwind/react";
import { SocialLinks, ProductByDepartment, SearchInput } from "@/components";
import MobileNav from "../components/mobile_nav";

const Header = ({ data, departments, shops, allProducts }) => {
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!open);
  };

  return (
    <div>
      <div className="bg-primary w-full h-[35px]"></div>
      <div className="flex justify-center items-center w-full bg-white">
        <div className="max-w-[1600px] w-full flex justify-between lg:justify-center items-center gap-8 px-4 sm:px-8 py-6 border-b">
          <div className="block lg:hidden">
            <MobileNav open={open} toggleMenu={toggleMenu}>
              <div>
                <div className="border-y">
                  <SearchInput />
                </div>
                <div>
                  {departments?.map((department) => (
                    <Link
                      key={department?.id}
                      href={`/dp/${department?.attributes?.slug}/page/1`}
                      className="outline-none !text-[13px] !text-third p-4 border-b hover:!text-primary font-bold !font-lato uppercase block"
                    >
                      {department?.attributes?.name}
                    </Link>
                  ))}
                </div>
              </div>
            </MobileNav>
          </div>
          <Link href="/">
            <Image
              src={data?.logo?.data?.attributes?.url}
              width={150}
              height={58}
              alt="logo"
              className="min-w-[150px] min-h-[47px]"
            />
          </Link>
          <div className="hidden lg:block w-full max-w-[715px]">
            <SearchInput />
          </div>
          <div className="hidden lg:block">
            <SocialLinks data={data?.social_links} />
          </div>
          <div onClick={toggleMenu} className="block lg:hidden">
            <Search isMobile={true} />
          </div>
        </div>
      </div>
      <div className="hidden lg:flex gap-4 mt-4 justify-center items-center">
        {departments?.map((department) => (
          <Menu
            key={department?.id}
            animate={{
              mount: { y: 0 },
              unmount: { y: 25 },
            }}
            allowHover
          >
            <MenuHandler>
              <Link
                href={`/dp/${department?.attributes?.slug}/page/1`}
                className="outline-none"
              >
                <Button
                  variant="text"
                  className="flex items-center !text-[13px] !text-third hover:!text-primary hover:!bg-transparent focus:!outline-none font-bold !font-lato uppercase !p-0 "
                >
                  {department?.attributes?.name}
                  <div className="w-3 h-3">
                    <ChevronDown />
                  </div>
                </Button>
              </Link>
            </MenuHandler>
            <MenuList className="max-w-[1600px] overflow-hidden w-full px-12 pb-8 pt-12">
              <div className="grid grid-cols-5 outline-none">
                <div className="grid grid-rows-4 grid-flow-col gap-4 outline-none mb-8 col-span-3">
                  {department?.attributes?.categories?.data?.map((category) => (
                    <Link
                      key={category?.id}
                      href={`/cat/${category?.attributes?.slug}/page/1`}
                      className="text-gray1 font-sm hover:text-primary w-fit"
                    >
                      {category?.attributes?.name}
                    </Link>
                  ))}
                </div>
                <div className="col-span-2">
                  <ProductByDepartment
                    name={department?.attributes?.name}
                    allProducts={allProducts}
                  />
                </div>
              </div>
              <div className="flex justify-between items-center gap-4 outline-none max-w-[1200px] mx-auto">
                {shops?.map((shop) => (
                  <div key={shop?.id}>
                    <Link href={`/shop/${shop?.attributes?.slug}/page/1`}>
                      <Image
                        src={shop?.attributes.image?.data?.attributes?.url}
                        width={200}
                        height={60}
                        alt="shop"
                      />
                    </Link>
                  </div>
                ))}
              </div>
            </MenuList>
          </Menu>
        ))}
      </div>
    </div>
  );
};

export default Header;
