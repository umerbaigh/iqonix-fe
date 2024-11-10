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

const ProductCard = ({ product }) => {
  const { product_name, product_image, slug, regular_price, sale_price } =
    product?.attributes || {};
  const discount = regular_price
    ? calculateDiscount(regular_price, sale_price)
    : 0;

  return (
    <Link
      href={`/product/${slug}`}
      className="border rounded-md shadow-md p-2 h-full flex flex-col justify-between"
    >
      <div>
        <div className="relative w-full">
          <Image
            src={product_image}
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
        </div>
        <div className="mt-3">
          <h3 className="text-sm font-poppins text-third font-medium">
            {product_name}
          </h3>
          <p className="text-xs text-[#A5A5A5] font-lato hover:text-third py-2">
            {product?.attributes?.categories?.data[0]?.attributes?.name}
          </p>
          <p className="text-xs text-[#A5A5A5] font-lato hover:text-third">
            {product?.attributes?.shops?.data[0]?.attributes?.name}
          </p>
          <p className="text-primary text-sm font-semibold font-lato py-2">
            {regular_price && (
              <span className="text-[#bbb] text-[13px] font-normal font-lato line-through mr-1">
                {regular_price} €
              </span>
            )}
            {sale_price} €
          </p>
        </div>
      </div>
      <button className="relative w-full bg-[#536162] hover:bg-third transition-all ease-in-out duration-300 text-white text-[13px] font-lato py-5 group font-semibold rounded-md overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 transform group-hover:-translate-y-full opacity-100 group-hover:opacity-0 uppercase">
          TO THE SHOP
        </div>
        <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 transform translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
          <div className="w-6 h-6 m-auto">
            <Navigate />
          </div>
        </div>
      </button>
    </Link>
  );
};

export default ProductCard;
