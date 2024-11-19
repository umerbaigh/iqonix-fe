"use client";
import {
  useRouter,
  useSearchParams,
  usePathname,
  useParams,
} from "next/navigation";
import { ProductCard } from "@/components";
import { useEffect, useState, useMemo } from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import { ChevronDown, Info } from "@/icons";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import MobileNav from "@/components/mobile_nav";

const ITEMS_PER_PAGE = 2;

const Filters = ({ allProducts, setLoading }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [open, setOpen] = useState([]);
  const [range, setRange] = useState([10, 3000]);

  const [minSalePrice, maxSalePrice] = useMemo(() => {
    const salePrices = allProducts
      .map((product) => product?.attributes?.sale_price)
      .filter((price) => price != null);

    const minPrice = Math.min(...salePrices);
    const maxPrice = Math.max(...salePrices);

    return [minPrice, maxPrice];
  }, [allProducts]);

  useEffect(() => {
    setRange([minSalePrice, maxSalePrice]);
  }, [minSalePrice, maxSalePrice]);

  const handleSliderChange = (value) => {
    setRange(value);
  };

  const handleFilterClick = () => {
    setLoading(true);
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("min", range[0]);
    newSearchParams.set("max", range[1]);
    const newPath = pathname.replace(/\/page\/\d+\/?$/, "/page/1/");
    router.push(`${newPath}?${newSearchParams.toString()}`);
  };

  const handleAttributeFilter = (attribute, value) => {
    setLoading(true);
    const newSearchParams = new URLSearchParams(searchParams);
    if (searchParams?.get(attribute) === value.split(" ").join("_")) {
      newSearchParams.delete(attribute);
    } else {
      newSearchParams.set(attribute, value.split(" ").join("_"));
    }

    const newPath = pathname.replace(/\/page\/\d+\/?$/, "/page/1/");
    router.push(`${newPath}?${newSearchParams.toString()}`);
  };

  const handleOpen = (index) => {
    setOpen((prevOpen) => {
      if (prevOpen.includes(index)) {
        return prevOpen.filter((item) => item !== index);
      } else {
        return [...prevOpen, index];
      }
    });
  };

  const attributeCounts = useMemo(() => {
    const counts = {
      color: {},
      delivery: {},
      width: {},
      height: {},
      depth: {},
    };

    allProducts?.forEach((product) => {
      Object.keys(counts).forEach((attribute) => {
        const value = product?.attributes[attribute];
        if (value) {
          counts[attribute][value] = (counts[attribute][value] || 0) + 1;
        }
      });
    });
    return counts;
  }, [allProducts]);

  return (
    <div className="px-2 lg:px-0">
      <h2 className="text-base font-poppins text-third uppercase font-semibold mb-1">
        Filter by Price
      </h2>

      <div className="mb-4">
        <Slider
          range
          min={minSalePrice}
          max={maxSalePrice}
          defaultValue={[minSalePrice, maxSalePrice]}
          value={range}
          onChange={handleSliderChange}
          trackStyle={[{ backgroundColor: "#8B4513", height: "1px" }]}
          railStyle={{ height: "1px" }}
          handleStyle={[
            {
              backgroundColor: "#8B4513",
              borderColor: "#8B4513",
              width: "3px",
              borderRadius: "0px",
              marginTop: "-6px",
              opacity: "1",
              cursor: "pointer",
              boxShadow: "none",
            },
            {
              backgroundColor: "#8B4513",
              borderColor: "#8B4513",
              width: "3px",
              borderRadius: "0px",
              marginTop: "-6px",
              opacity: "1",
              cursor: "pointer",
              boxShadow: "none",
            },
          ]}
        />
      </div>

      <div className="flex xl:items-center justify-between gap-y-4 flex-col xl:flex-row">
        <div className="text-sm font-lato font-semibold text-[#242424]">
          <span className="text-[#767676] font-normal">Price:</span> {range[0]}{" "}
          € – {range[1]} €
        </div>
        <button
          className="px-4 py-3 bg-[#f7f7f7] uppercase text-third text-xs font-lato font-semibold rounded hover:bg-gray-300"
          onClick={handleFilterClick}
        >
          Filter
        </button>
      </div>

      {Object.entries(attributeCounts).map(([attribute, values], index) => (
        <Accordion
          open={open.includes(index)}
          key={attribute}
          className="border-b border-blue-gray-100 outline-none"
        >
          <AccordionHeader
            onClick={() => handleOpen(index)}
            className="border-0 py-0 my-5 text-black w-fit outline-none flex gap-1"
          >
            <h3 className="font-semibold text-base font-poppins text-[#242424] uppercase">
              {attribute}
            </h3>
            <span
              className={`text-black w-3 h-3 transition-all duration-300 ease-in-out ${
                open.includes(index) ? "rotate-180" : ""
              }`}
            >
              <ChevronDown />
            </span>
          </AccordionHeader>
          <AccordionBody className="pt-0">
            <ul className="max-h-[223px] h-fit overflow-y-auto filters">
              {Object.entries(values).map(([value, count]) => (
                <li
                  key={value}
                  className="flex justify-between mb-3 font-lato text-[#767676] font-normal cursor-pointer group"
                  onClick={() => handleAttributeFilter(attribute, value)}
                >
                  <span
                    className={`capitalize text-sm group-hover:text-secondary ${
                      searchParams?.get(attribute) ===
                      value.split(" ").join("_")
                        ? "text-secondary"
                        : ""
                    }`}
                  >
                    {value}
                  </span>
                  <span
                    className={`p-1 rounded-full border leading-none text-xs min-w-[30px] text-center group-hover:bg-primary group-hover:text-white ${
                      searchParams?.get(attribute) ===
                      value.split(" ").join("_")
                        ? "bg-primary text-white"
                        : ""
                    }`}
                  >
                    {count}
                  </span>
                </li>
              ))}
            </ul>
          </AccordionBody>
        </Accordion>
      ))}
    </div>
  );
};

const Products = ({
  departmentName,
  allProducts,
  products,
  totalProducts,
  description,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const toggleMenu = () => {
    setOpen(!open);
  };

  const currentPage = parseInt(params?.page) || 1;
  const totalPages = Math.ceil(totalProducts / ITEMS_PER_PAGE);

  const handleSortChange = (event) => {
    setLoading(true);
    const order = event.target.value;
    const newSearchParams = new URLSearchParams(searchParams);

    if (order === "none") {
      newSearchParams.delete("order");
    } else {
      newSearchParams.set("order", order);
    }

    const newPath = pathname.replace(/\/page\/\d+\/?$/, "/page/1/");
    router.push(`${newPath}?${newSearchParams.toString()}`);
  };

  const handlePageChange = (page) => {
    setLoading(true);
    const newSearchParams = new URLSearchParams(searchParams);
    const newPath = pathname.replace(/\/page\/\d+\/?$/, `/page/${page}/`);
    router.push(`${newPath}?${newSearchParams.toString()}`);
    // newSearchParams.set("page", page);
    // router.push(`?${newSearchParams.toString()}`);
  };

  useEffect(() => {
    setLoading(false);
  }, [currentPage, searchParams]);

  const appliedFilters = useMemo(() => {
    const filters = {};
    searchParams.forEach((value, key) => {
      if (key !== "order") {
        filters[key] = value.split("_").join(" ");
      }
    });
    return filters;
  }, [searchParams]);

  const clearFilter = (filterKey) => {
    setLoading(true);
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete(filterKey);
    const newPath = pathname.replace(/\/page\/\d+\/?$/, "/page/1/");
    router.push(`${newPath}?${newSearchParams.toString()}`);
  };

  const clearAllFilters = () => {
    setLoading(true);
    const newSearchParams = new URLSearchParams();
    if (searchParams.get("order"))
      newSearchParams.set("order", searchParams.get("order"));
    const newPath = pathname.replace(/\/page\/\d+\/?$/, "/page/1/");
    router.push(`${newPath}?${newSearchParams.toString()}`);
  };

  return (
    <div className="max-w-[1600px] mx-auto w-full px-4 sm:px-8 my-12">
      <div className="flex gap-6">
        {totalProducts > 0 && (
          <div className="w-[20%] hidden lg:block">
            <Filters allProducts={allProducts} setLoading={setLoading} />
          </div>
        )}

        <div
          className={`${
            totalProducts > 0 ? "w-[100%] lg:w-[80%]" : "w-[100%]"
          }`}
        >
          <div className="flex flex-col lg:flex-row justify-between gap-y-8 lg:items-center mb-4 p-8 bg-[#f8f8f8] w-full">
            <h2 className="text-2xl font-poppins font-semibold text-[#242424]">
              {departmentName}
            </h2>
            {totalProducts > 0 && (
              <div className="flex justify-between items-center w-full lg:w-fit">
                <div className="block lg:hidden">
                  <MobileNav
                    open={open}
                    toggleMenu={toggleMenu}
                    isFilter={true}
                  >
                    <Filters
                      allProducts={allProducts}
                      setLoading={setLoading}
                    />
                  </MobileNav>
                </div>
                <div className="relative inline-block w-fit">
                  <select
                    className="w-fit border-b-2 border-[#0000001a] pb-1 outline-none focus:outline-none rounded-none text-[#242424] focus:border-primary transition-all duration-300 ease-in-out font-semibold font-lato text-sm bg-[#f8f8f8] appearance-none pr-8"
                    onChange={handleSortChange}
                    defaultValue={searchParams.get("order") || "date"}
                  >
                    <option value="date">Sort by newest</option>
                    <option value="price">Sort by price: Low to High</option>
                    <option value="price-desc">
                      Sort by price: High to Low
                    </option>
                  </select>
                  <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <div className="w-4 h-4 text-[#242424]">
                      <ChevronDown />
                    </div>
                  </span>
                </div>
              </div>
            )}
          </div>
          {Object.keys(appliedFilters).length > 0 && (
            <div className="mb-4 flex flex-wrap gap-3">
              <div
                onClick={clearAllFilters}
                className="flex items-center gap-1 cursor-pointer text-secondary hover:text-gray-600 text-[13px] font-lato font-semibold !leading-[0px]"
              >
                <button className="text-xl font-normal">×</button>
                <span>Clear Filters</span>
              </div>
              {Object.entries(appliedFilters).map(([key, value]) => (
                <div
                  key={key}
                  className="flex items-center gap-1 cursor-pointer text-secondary hover:text-gray-600 text-[13px] font-lato font-semibold !leading-[0px]"
                  onClick={() => clearFilter(key)}
                >
                  <button className="text-xl font-normal">×</button>
                  <span className="capitalize">
                    {key}:{" "}
                    <span className="text-primary capitalize">
                      {value.replace("_", " ")}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          )}

          {loading ? (
            <div className="text-primary flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-spin size-8"
              >
                <path d="M21 12a9 9 0 1 1-6.219-8.56" />
              </svg>
            </div>
          ) : totalProducts > 0 ? (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-3 mb-10">
                {products?.map((product) => (
                  <ProductCard product={product} key={product.id} />
                ))}
              </div>
              {totalPages > 1 && (
                <div className="flex gap-1 justify-center">
                  {currentPage > 1 && (
                    <button
                      className={`px-3 py-2 rounded text-third font-lato font-semibold hover:bg-gray-200`}
                      onClick={() => handlePageChange(currentPage - 1)}
                    >
                      <div className="rotate-90 w-4 h-4 text-third">
                        <ChevronDown />
                      </div>
                    </button>
                  )}
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                      key={index + 1}
                      className={`px-4 py-2 rounded text-third font-lato font-semibold ${
                        currentPage === index + 1
                          ? "bg-primary text-white"
                          : "hover:bg-gray-200"
                      }`}
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </button>
                  ))}
                  {currentPage < totalPages && (
                    <button
                      className="px-3 py-2 rounded text-third font-lato font-semibold hover:bg-gray-200"
                      onClick={() => handlePageChange(currentPage + 1)}
                    >
                      <div className="-rotate-90 w-4 h-4 text-third">
                        <ChevronDown />
                      </div>
                    </button>
                  )}
                </div>
              )}
            </div>
          ) : (
            <div className="text-white flex items-center gap-4 bg-[#e0b252] px-8 py-6 mt-8">
              <Info />
              <p className="text-sm font-lato">
                No products were found matching your selection.
              </p>
            </div>
          )}
        </div>
      </div>
      {description && (
        <div className="html-desc font-poppins text-[#777777] mt-16">
          <div
            dangerouslySetInnerHTML={{
              __html: description,
            }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default Products;
