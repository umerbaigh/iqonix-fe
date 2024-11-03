"use client";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Search } from "@/icons";
import { Menu, MenuHandler, MenuList, Button } from "@material-tailwind/react";
import { SocialLinks, ProductByDepartment } from "@/components";

const Header = ({ data, departments, shops }) => {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div>
      <div className="bg-primary w-full h-[35px]"></div>
      <div className="flex justify-center items-center w-full bg-white">
        <div className="max-w-[1600px] w-full flex justify-center items-center gap-8 px-4 sm:px-8 py-6 border-b">
          <Link href="/">
            <Image
              src={data?.logo?.data?.attributes?.url}
              width={150}
              height={58}
              alt="logo"
            />
          </Link>
          <div className="relative flex justify-center items-center w-full max-w-[715px]">
            <input
              type="text"
              placeholder={data?.search_placeholder}
              value={search}
              onChange={handleSearch}
              className="py-2 pl-[15px] pr-10 border-2 w-full text-[#767676] placeholder-[#767676] border-borderColor text-sm focus:outline-none"
            />
            <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
              <Search />
            </div>
            {search && (
              <ul className="absolute left-0 right-0 top-full bg-white border border-gray-300 rounded-b-md shadow-md mt-1 z-10">
                <li className="py-2 px-4">Not found</li>
              </ul>
            )}
          </div>
          <SocialLinks data={data?.social_links} />
        </div>
      </div>
      <div className="flex gap-4 mt-4 justify-center items-center">
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
                href={department?.attributes?.slug}
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
            <MenuList className="max-w-[1600px] overflow-hidden w-full px-4 pb-8 pt-12">
              <div className="grid grid-cols-5 outline-none">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 outline-none mb-8 col-span-3">
                  {department?.attributes?.categories?.data?.map((category) => (
                    <Link
                      key={category?.id}
                      href={`/category${category?.attributes?.slug}`}
                      className="text-gray1 font-sm hover:text-primary"
                    >
                      {category?.attributes?.name}
                    </Link>
                  ))}
                </div>
                <div className="col-span-2">
                  <ProductByDepartment name={department?.attributes?.name} />
                </div>
              </div>
              <div className="flex justify-between items-center gap-4 outline-none max-w-[1200px] mx-auto">
                {shops?.map((shop) => (
                  <div key={shop?.id}>
                    <Link href={`/shop${shop?.attributes?.slug}`}>
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
