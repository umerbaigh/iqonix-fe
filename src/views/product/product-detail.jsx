import { Navigate } from "@/icons";
import Image from "next/image";
import Link from "next/link";

const ProductDetail = ({ product }) => {
  //   console.log("product", product);
  const calculateDiscount = (regularPrice, salePrice) => {
    if (regularPrice && salePrice && regularPrice > salePrice) {
      const discount = ((regularPrice - salePrice) / regularPrice) * 100;
      return Math.round(discount);
    }
    return 0;
  };
  const discount = product?.regular_price
    ? calculateDiscount(product?.regular_price, product?.sale_price)
    : 0;
  return (
    <div className="max-w-[1600px] w-full mx-auto mt-8">
      <div className="flex flex-col md:flex-row gap-8 bg-[#fafafa] px-4 sm:px-8 py-12 rounded-lg">
        <div className="md:w-1/2">
          <div className="relative">
            <Image
              src={product?.product_image}
              alt="product"
              width={800}
              height={650}
              className="rounded-lg w-full max-h-[500px] object-cover"
            />
            {discount > 0 && (
              <span className="absolute top-2 right-5 flex items-center justify-center bg-red-500 text-white font-lato text-sm font-bold w-[50px] h-[50px] rounded-full">
                -{discount}%
              </span>
            )}
          </div>
        </div>

        <div className="md:w-1/2 pb-8 border-b border-[#0000001c] h-fit">
          {/* <nav className="text-sm text-gray-500 mb-4">
          <a href="/" className="hover:underline">
            Startseite
          </a>{" "}
          /
          <a href="/moebel" className="hover:underline">
            {" "}
            Möbel
          </a>{" "}
          /
          <a href="/baenke" className="hover:underline">
            {" "}
            Bänke
          </a>{" "}
          /<span> {product?.product_name}</span>
        </nav> */}
          <p className="text-sm font-lato text-third font-semibold">
            {product?.product_name}
          </p>

          <Image
            src={
              product?.shops?.data[0]?.attributes?.image?.data?.attributes?.url
            }
            alt={product?.shops?.data[0]?.attributes?.name}
            width={90}
            height={50}
            className="my-4"
          />

          <h1 className="text-[28px] font-poppins text-third font-semibold">
            {product?.product_name}
          </h1>
          <p className="text-[#777777] text-sm font-lato my-6">
            {product?.short_description}
          </p>

          <p className="text-primary text-[34px] font-semibold font-lato py-2 mb-4">
            {product?.regular_price && (
              <span className="text-[#bbb] font-normal font-lato line-through mr-2">
                {product?.regular_price} €
              </span>
            )}
            {product?.sale_price} €
          </p>

          <Link href={product?.product_url}>
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
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-8 mx-4 sm:mx-8 my-8">
        <div className="bg-[#fafafa] px-4 pb-6 rounded-lg md:w-[55%]">
          <div className="html-desc font-poppins text-[#777777]">
            <div
              dangerouslySetInnerHTML={{
                __html: product?.long_description,
              }}
            ></div>
          </div>
        </div>
        <div className="bg-[#fafafa] text-secondary font-lato text-sm font-semibold px-4 py-6 rounded-lg md:w-[45%]">
          <h2 className="text-[22px] font-poppins mb-4">Product Detail</h2>
          <div className="w-full flex items-center justify-between pb-4">
            <p>Color</p>
            <p>{product?.color}</p>
          </div>
          <div className="w-full flex items-center justify-between pb-4">
            <p>Width</p>
            <p>{product?.width}</p>
          </div>
          <div className="w-full flex items-center justify-between pb-4">
            <p>Height</p>
            <p>{product?.height}</p>
          </div>
          <div className="w-full flex items-center justify-between pb-4">
            <p>Depth</p>
            <p>{product?.depth}</p>
          </div>
          <div className="w-full flex items-center justify-between pb-4">
            <p>Shop</p>
            <p>{product?.shops?.data[0]?.attributes?.name}</p>
          </div>
          <div className="w-full flex items-center justify-between pb-4 border-b border-[#0000001c]">
            <p>Brand</p>
            <p>{product?.brand?.data?.attributes?.name}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
