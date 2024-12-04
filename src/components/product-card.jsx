import { Navigate } from "@/icons";
import Image from "next/image";
import Link from "next/link";

// Function to calculate discount percentage
const calculateDiscount = (regularPrice, salePrice) => {
  if (regularPrice && salePrice && regularPrice > salePrice) {
    const discount = ((regularPrice - salePrice) / regularPrice) * 100;
    return Math.round(discount);
  }
  return 0;
};

const ProductCard = ({ product, isSearch }) => {
  const {
    product_name,
    product_image1,
    slug,
    regular_price,
    sale_price,
    product_url,
    categories,
    shops,
  } = isSearch ? product || {} : product?.attributes || {};
  // Access category properly
  const category = Array.isArray(categories)
    ? categories?.[0]
    : categories?.data?.[0]?.attributes;

  // Access shop properly
  const shop = Array.isArray(shops) ? shops?.[0] : shops?.data?.[0]?.attributes;

  const discount = regular_price
    ? calculateDiscount(regular_price, sale_price)
    : 0;

  return (
    <div className="border rounded-md shadow-md h-full flex flex-col justify-between">
      <div>
        <Link href={`/pr/${slug}`} className="relative w-full">
          <Image
            src={product_image1}
            alt="product"
            width={500}
            height={250}
            className="rounded-md object-cover"
          />
          {discount > 0 && (
            <span className="absolute top-2 left-2 flex items-center justify-center bg-red-500 text-white font-lato text-xs font-bold w-10 h-10 rounded-full">
              -{discount}%
            </span>
          )}
        </Link>
        <div className="mt-3 mx-2">
          <Link href={`/pr/${slug}`} className="w-fit block">
            <h3 className="text-sm font-poppins text-third font-medium">
              {product_name}
            </h3>
          </Link>
          {category && (
            <Link
              href={`/cat/${category?.slug}`}
              className="text-xs text-[#A5A5A5] font-lato hover:text-third py-2 block w-fit"
            >
              {category?.name}
            </Link>
          )}
          {shop && (
            <Link
              href={`/shop/${shop?.slug}`}
              className="text-xs text-[#A5A5A5] font-lato hover:text-third"
            >
              {shop?.name}
            </Link>
          )}
          <p className="text-primary text-sm font-semibold font-lato py-2">
            {regular_price !== sale_price && (
              <span className="text-[#bbb] text-[13px] font-normal font-lato line-through mr-1">
                {regular_price} €
              </span>
            )}
            {sale_price} €
          </p>
        </div>
      </div>
      <Link
        href={`/single-product/?page=${product_url}`}
        passHref
        legacyBehavior
        className=""
      >
        <a
          rel="nofollow"
          target="_blank"
          className="relative w-[92%] bg-[#536162] hover:bg-third transition-all ease-in-out duration-300 text-white text-[13px] font-lato py-5 block mx-auto my-2 group font-semibold rounded-md overflow-hidden"
        >
          <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 transform group-hover:-translate-y-full opacity-100 group-hover:opacity-0 uppercase">
            TO THE SHOP
          </div>
          <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
            <div className="w-6 h-6 m-auto">
              <Navigate />
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default ProductCard;
