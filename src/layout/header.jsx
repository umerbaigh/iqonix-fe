"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Search } from "@/icons";
import { Menu, MenuHandler, MenuList, Button } from "@material-tailwind/react";
import { SocialLinks, ProductByDepartment, SearchInput } from "@/components";
import MobileNav from "../components/mobile_nav";

const Header = ({ data }) => {
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
                  {data?.nav_links?.map((item) => (
                    <Link
                      key={item?.id}
                      href={item?.link}
                      className="outline-none !text-[13px] !text-third p-4 border-b hover:!text-primary font-bold !font-lato uppercase block"
                    >
                      {item?.text}
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
        {data?.nav_links?.map((item) =>
          item?.dropdown_links?.length > 0 ? (
            <Menu
              key={item?.id}
              animate={{
                mount: { y: 0 },
                unmount: { y: 25 },
              }}
              allowHover
            >
              <MenuHandler>
                <Link href={item?.link} className="outline-none">
                  <Button
                    variant="text"
                    className="flex items-center !text-[13px] !text-third hover:!text-primary hover:!bg-transparent focus:!outline-none font-bold !font-lato uppercase !p-0 "
                  >
                    {item?.text}
                    <div className="w-3 h-3">
                      <ChevronDown />
                    </div>
                  </Button>
                </Link>
              </MenuHandler>
              <MenuList className="max-w-[1600px] overflow-hidden w-full px-4 py-8">
                <div className="grid grid-cols-4 gap-y-6 gap-x-12 outline-none mx-auto w-fit">
                  {item?.dropdown_links?.map((category) => (
                    <Link
                      key={category?.id}
                      href={category?.link}
                      className="text-gray1 font-sm hover:text-primary w-fit"
                    >
                      {category?.text}
                    </Link>
                  ))}
                </div>
              </MenuList>
            </Menu>
          ) : (
            <Link
              key={item?.id}
              href={item?.link}
              className="flex items-center !text-[13px] !text-third hover:!text-primary hover:!bg-transparent focus:!outline-none font-bold !font-lato uppercase !p-0 "
            >
              {item?.text}
              <div className="w-3 h-3">
                <ChevronDown />
              </div>
            </Link>
          )
        )}
      </div>
    </div>
  );
};

export default Header;
