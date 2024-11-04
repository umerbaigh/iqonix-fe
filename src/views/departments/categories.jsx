"use client";
import { useSearchParams, useParams } from "next/navigation";
import Link from "next/link";

const ITEMS_PER_PAGE = 2;

const Categories = ({ totalProducts, breadcrumbs, categories }) => {
  const searchParams = useSearchParams();
  const { department } = useParams();

  const page = parseInt(searchParams.get("page")) || 1;

  const startIndex = (page - 1) * ITEMS_PER_PAGE + 1;
  const endIndex = Math.min(page * ITEMS_PER_PAGE, totalProducts);
  return (
    <div className="max-w-[1600px] w-full mx-auto px-4 sm:px-8">
      <div className="flex items-start justify-between w-full py-8 border-b border-[#0000001b]">
        <div className="flex gap-1">
          {breadcrumbs?.map((item, index) =>
            index !== breadcrumbs?.length - 1 ? (
              <Link
                href={index === 0 ? "/" : item.toLowerCase()}
                key={index}
                className="text-[#767676] text-sm font-lato"
              >
                {item} {"/"}
              </Link>
            ) : (
              <p key={index} className="text-third text-sm font-lato">
                {item}
              </p>
            )
          )}
        </div>
        <div>
          <p className="text-[#777777] text-sm font-lato">
            {totalProducts > ITEMS_PER_PAGE
              ? `Showing results ${startIndex} – ${endIndex} of ${totalProducts}`
              : `Showing all ${totalProducts} results`}
          </p>
        </div>
      </div>
      <div className="flex gap-x-4 gap-y-4 sm:gap-x-6 flex-wrap items-center justify-center px-4 py-4 mt-4 mb-12 border border-[#7A7A7A] w-full">
        {categories?.map((category) => (
          <Link
            href={`/${department}${category?.attributes?.slug}`}
            key={category.id}
            className="text-sm text-third font-lato uppercase font-semibold hover:text-primary"
          >
            {category?.attributes?.name}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
