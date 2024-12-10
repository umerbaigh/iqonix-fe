"use client";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { Collapse, Button } from "@material-tailwind/react";
import { ChevronDown } from "@/icons";

const ITEMS_PER_PAGE = 35;

const Categories = ({ totalProducts, breadcrumbs, categories }) => {
  const params = useParams();
  const [open, setOpen] = useState(false);

  const toggleOpen = () => setOpen((cur) => !cur);
  const page = parseInt(params.page || 1);

  const startIndex = (page - 1) * ITEMS_PER_PAGE + 1;
  const endIndex = Math.min(page * ITEMS_PER_PAGE, totalProducts);
  return (
    <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-8">
      <div className="flex flex-col sm:flex-row flex-wrap gap-y-4 items-start justify-between w-full py-8 border-b border-[#0000001b]">
        <div className="flex gap-1 flex-wrap">
          {breadcrumbs?.map((item, index) =>
            index !== breadcrumbs?.length - 1 ? (
              <Link
                href={item?.link}
                key={index}
                className="text-[#767676] text-sm font-lato hover:text-third"
              >
                {item?.title} {"/"}
              </Link>
            ) : (
              <p key={index} className="text-third text-sm font-lato font-bold">
                {item?.title}
              </p>
            )
          )}
        </div>
        {totalProducts > 1 && (
          <div>
            <p className="text-[#777777] text-sm font-lato">
              {totalProducts > ITEMS_PER_PAGE
                ? `Showing results ${startIndex} – ${endIndex} of ${totalProducts}`
                : `Showing all ${totalProducts} results`}
            </p>
          </div>
        )}
      </div>
      {categories && categories?.length > 0 && (
        <div>
          <div className="hidden lg:flex gap-x-4 gap-y-4 sm:gap-x-6 flex-wrap items-center justify-center px-4 py-4 mt-4 border border-[#7A7A7A] w-full">
            {categories?.map((category) => (
              <Link
                href={`/cat/${category?.attributes?.slug}`}
                key={category.id}
                className="text-sm text-third font-lato uppercase whitespace-nowrap font-semibold hover:text-primary"
              >
                {category?.attributes?.name}
              </Link>
            ))}
          </div>
          <div className="lg:hidden px-4 py-4 mt-4 border border-[#7A7A7A] w-full">
            <Button
              variant="text"
              className="flex items-center mx-auto !text-[14px] !text-third hover:!text-primary hover:!bg-transparent focus:!outline-none font-bold !font-lato uppercase !p-0"
              onClick={toggleOpen}
            >
              Categories
              <div className="w-3 h-3">
                <ChevronDown />
              </div>
            </Button>
            <Collapse open={open} className="grid grid-cols-2 gap-x-4">
              {categories?.map((category) => (
                <Link
                  href={`/cat/${category?.attributes?.slug}`}
                  key={category.id}
                  className="text-sm text-third text-center mt-4 font-lato uppercase whitespace-nowrap font-semibold hover:text-primary"
                >
                  {category?.attributes?.name}
                </Link>
              ))}
            </Collapse>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
