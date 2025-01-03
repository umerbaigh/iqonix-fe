"use client";
import { Navigate } from "@/icons";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const ProductDetail = ({ product }) => {
  //   console.log("product", product);
  const router = useRouter();

  useEffect(() => {
    if (!product) {
      router.push("/404");
    }
  }, [product, router]);

  if (!product) return null;
  const [selectedImage, setSelectedImage] = useState(product?.product_image1);
  const productImageArr = [
    product?.product_image1,
    product?.product_image2,
    product?.product_image3,
    product?.product_image4,
    product?.product_image5,
  ].filter((image) => image);
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
      <div className="flex flex-col lg:flex-row gap-8 bg-[#fafafa] px-4 sm:px-8 py-12 rounded-lg">
        <div className="lg:w-[55%] w-full flex flex-col sm:flex-row gap-8">
          {productImageArr?.length > 1 && (
            <div className="flex flex-row sm:flex-col justify-between lg:justify-start lg:mb-6">
              {productImageArr?.map((item, index) => (
                <div
                  key={index}
                  className={`sm:mb-8 rounded-lg cursor-pointer w-fit ${
                    item === selectedImage ? "border-2 border-primary" : ""
                  }`}
                  onClick={() => setSelectedImage(item)}
                >
                  <Image
                    src={item}
                    alt="product"
                    width={70}
                    height={70}
                    className="min-w-[50px] w-fit sm:min-w-[74px] rounded-lg h-[60px] sm:h-[74px] object-cover"
                  />
                </div>
              ))}
            </div>
          )}
          <div className="relative w-full">
            <Image
              src={selectedImage}
              alt="product"
              width={800}
              height={650}
              className="rounded-lg w-full h-full max-h-[500px] object-contain object-center"
            />
            {discount > 0 && (
              <span className="absolute top-2 right-5 flex items-center justify-center bg-red-500 text-white font-lato text-sm font-bold w-[50px] h-[50px] rounded-full">
                -{discount}%
              </span>
            )}
          </div>
        </div>

        <div className="lg:w-[45%] pb-8 border-b border-[#0000001c] h-fit">
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
          {/* <p className="text-sm font-lato text-third font-semibold">
            {product?.product_name}
          </p> */}

          {product?.shops?.data[0]?.attributes?.image?.data?.attributes
            ?.url && (
            <Image
              src={
                product?.shops?.data[0]?.attributes?.image?.data?.attributes
                  ?.url
              }
              alt={product?.shops?.data[0]?.attributes?.name}
              width={90}
              height={50}
              className="my-4"
            />
          )}

          <h1 className="text-[28px] font-poppins text-third font-semibold">
            {product?.product_name}
          </h1>
          {product?.short_description && (
            <p className="text-[#777777] text-sm font-lato my-6">
              {product?.short_description}
            </p>
          )}

          <p className="text-primary text-[34px] font-semibold font-lato py-2 mb-4">
            {product?.regular_price !== product?.sale_price && (
              <span className="text-[#bbb] font-normal font-lato line-through mr-2">
                {product?.regular_price} €
              </span>
            )}
            {product?.sale_price} €
          </p>

          <Link
            href={`/single-product/?page=${product?.product_url}`}
            passHref
            legacyBehavior
          >
            <a rel="nofollow" target="_blank">
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
            </a>
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
          {product?.delivery && (
            <div className="w-full flex items-center justify-between pb-4">
              <p>delivery</p>
              <p>{product?.delivery}</p>
            </div>
          )}
          {product?.damen_normalgr && (
            <div className="w-full flex items-center justify-between pb-4">
              <p>Damen Normalgr</p>
              <p>{product?.damen_normalgr}</p>
            </div>
          )}
          {product?.damen_jeansgr && (
            <div className="w-full flex items-center justify-between pb-4">
              <p>Damen Jeansgr</p>
              <p>{product?.damen_jeansgr}</p>
            </div>
          )}
          {product?.damen_kurzgr && (
            <div className="w-full flex items-center justify-between pb-4">
              <p>Damen Kurzgr</p>
              <p>{product?.damen_kurzgr}</p>
            </div>
          )}
          {product?.damen_langgr && (
            <div className="w-full flex items-center justify-between pb-4">
              <p>Damen Langgr</p>
              <p>{product?.damen_langgr}</p>
            </div>
          )}
          {product?.cup_gr && (
            <div className="w-full flex items-center justify-between pb-4">
              <p>Cup Gr</p>
              <p>{product?.cup_gr}</p>
            </div>
          )}
          {product?.brustumfang && (
            <div className="w-full flex items-center justify-between pb-4">
              <p>Brustumfang</p>
              <p>{product?.brustumfang}</p>
            </div>
          )}
          {product?.miederhosengr && (
            <div className="w-full flex items-center justify-between pb-4">
              <p>Miederhosengr</p>
              <p>{product?.miederhosengr}</p>
            </div>
          )}
          {product?.strumpfhosengr && (
            <div className="w-full flex items-center justify-between pb-4">
              <p>Strumpfhosengr</p>
              <p>{product?.strumpfhosengr}</p>
            </div>
          )}
          {product?.sockengr && (
            <div className="w-full flex items-center justify-between pb-4">
              <p>Sockengr</p>
              <p>{product?.sockengr}</p>
            </div>
          )}
          {product?.herren_normalgr && (
            <div className="w-full flex items-center justify-between pb-4">
              <p>Herren Normalgr</p>
              <p>{product?.herren_normalgr}</p>
            </div>
          )}
          {product?.herren_jeansgr && (
            <div className="w-full flex items-center justify-between pb-4">
              <p>Herren Jeansgr</p>
              <p>{product?.herren_jeansgr}</p>
            </div>
          )}
          {product?.kragenweite && (
            <div className="w-full flex items-center justify-between pb-4">
              <p>Kragenweite</p>
              <p>{product?.kragenweite}</p>
            </div>
          )}
          {product?.herren_untersetztgr && (
            <div className="w-full flex items-center justify-between pb-4">
              <p>Herren Untersetztgr</p>
              <p>{product?.herren_untersetztgr}</p>
            </div>
          )}
          {product?.herren_schlankgr && (
            <div className="w-full flex items-center justify-between pb-4">
              <p>Herren Schlankgr</p>
              <p>{product?.herren_schlankgr}</p>
            </div>
          )}
          {product?.waschegr && (
            <div className="w-full flex items-center justify-between pb-4">
              <p>Waschegr</p>
              <p>{product?.waschegr}</p>
            </div>
          )}
          {product?.herren_bauchgr && (
            <div className="w-full flex items-center justify-between pb-4">
              <p>Herren Bauchgr</p>
              <p>{product?.herren_bauchgr}</p>
            </div>
          )}
          {product?.baby_normalgr && (
            <div className="w-full flex items-center justify-between pb-4">
              <p>Baby Normalgr</p>
              <p>{product?.baby_normalgr}</p>
            </div>
          )}
          {product?.kinder_normalg && (
            <div className="w-full flex items-center justify-between pb-4">
              <p>Kinder Normalg</p>
              <p>{product?.kinder_normalg}</p>
            </div>
          )}
          {product?.kinder_sockengr && (
            <div className="w-full flex items-center justify-between pb-4">
              <p>Kinder Sockengr</p>
              <p>{product?.kinder_sockengr}</p>
            </div>
          )}
          {product?.schuhgr && (
            <div className="w-full flex items-center justify-between pb-4">
              <p>Schuhgr</p>
              <p>{product?.schuhgr}</p>
            </div>
          )}
          {product?.kinder_schuhgr && (
            <div className="w-full flex items-center justify-between pb-4">
              <p>Kinder Schuhgr</p>
              <p>{product?.kinder_schuhgr}</p>
            </div>
          )}
          {product?.fashion_material && (
            <div className="w-full flex items-center justify-between pb-4">
              <p>Fashion Material</p>
              <p>{product?.fashion_material}</p>
            </div>
          )}
          {product?.fashion_color && (
            <div className="w-full flex items-center justify-between pb-4">
              <p>Fashion Color</p>
              <p>{product?.fashion_color}</p>
            </div>
          )}
          {product?.shoes_material && (
            <div className="w-full flex items-center justify-between pb-4">
              <p>Shoes Material</p>
              <p>{product?.shoes_material}</p>
            </div>
          )}
          {product?.shoes_color && (
            <div className="w-full flex items-center justify-between pb-4">
              <p>Shoes Color</p>
              <p>{product?.shoes_color}</p>
            </div>
          )}
          {product?.breite && (
            <div className="w-full flex items-center justify-between pb-4">
              <p>Breite</p>
              <p>{product?.breite}</p>
            </div>
          )}
          {product?.hoehe && (
            <div className="w-full flex items-center justify-between pb-4">
              <p>Hoehe</p>
              <p>{product?.hoehe}</p>
            </div>
          )}
          {product?.tiefe && (
            <div className="w-full flex items-center justify-between pb-4">
              <p>Tiefe</p>
              <p>{product?.tiefe}</p>
            </div>
          )}
          {product?.furniture_color && (
            <div className="w-full flex items-center justify-between pb-4">
              <p>Furniture Color</p>
              <p>{product?.furniture_color}</p>
            </div>
          )}
          {product?.furniture_material && (
            <div className="w-full flex items-center justify-between pb-4">
              <p>Furniture Material</p>
              <p>{product?.furniture_material}</p>
            </div>
          )}
          {product?.shops?.data[0]?.attributes?.name && (
            <Link
              href={`/shop/${product?.shops?.data[0]?.attributes?.slug}`}
              className="w-full flex items-center justify-between pb-4 hover:text-primary"
            >
              <p>Shop</p>
              <p>{product?.shops?.data[0]?.attributes?.name}</p>
            </Link>
          )}
          {product?.brand?.data?.attributes?.name && (
            <Link
              href={`/br/${product?.brand?.data?.attributes?.slug}`}
              className="w-full flex items-center justify-between pb-4 border-b border-[#0000001c]"
            >
              <p>Brand</p>
              <p>{product?.brand?.data?.attributes?.name}</p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
