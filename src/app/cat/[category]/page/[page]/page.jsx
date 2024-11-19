// import { BASE_URL, isLocal } from "@/utils/axios_instance";
import { getServerSideData } from "@/utils/get-api";
import { getGraphql } from "@/utils/get-graphql-api";
import Layout from "@/layout/page";
import { Categories, Products } from "@/views/departments";

const Page = async ({ params, searchParams }) => {
  const { order, color, delivery, width, height, depth, min, max } =
    (await searchParams) || {};
  // console.log("page", page);
  const { category, page } = await params;
  const breadcrumbs = ["Home Page", category];
  const urls = {
    categories: `/categories/?filters[slug][$eq]=${category}&populate[sub_categories][populate]=*`,
  };
  const [categories] = await Promise.all([
    getServerSideData(urls.categories, true),
  ]);
  // console.log(categories?.data[0]?.attributes);
  let sortOption = "";
  if (order === "date") {
    sortOption = 'sort: "createdAt:desc"';
  } else if (order === "price") {
    sortOption = 'sort: "sale_price:asc"';
  } else if (order === "price-desc") {
    sortOption = 'sort: "sale_price:desc"';
  }

  let productFilters = {};
  if (color) productFilters.color = { eq: color.split("_").join(" ") };
  if (delivery) productFilters.delivery = { eq: delivery.split("_").join(" ") };
  if (width) productFilters.width = { eq: width.split("_").join(" ") };
  if (height) productFilters.height = { eq: height.split("_").join(" ") };
  if (depth) productFilters.depth = { eq: depth.split("_").join(" ") };

  // Handle min and max for sale_price as a single filter object
  if (min !== undefined || max !== undefined) {
    productFilters.sale_price = {};
    if (min !== undefined) productFilters.sale_price.gt = parseFloat(min) - 1;
    if (max !== undefined) productFilters.sale_price.lt = parseFloat(max) + 1;
  }

  // Convert filters to GraphQL string format if there are any
  const productFiltersString = Object.entries(productFilters).length
    ? `filters: { ${Object.entries(productFilters)
        .map(
          ([key, value]) =>
            `${key}: { ${Object.entries(value)
              .map(([k, v]) => `${k}: ${typeof v === "string" ? `"${v}"` : v}`)
              .join(", ")} }`
        )
        .join(", ")} }`
    : "";

  const query1 = `
    query {
      categories(filters: { slug: { eq: "${category}" } }) {
        data {
          id
          attributes {
            name
            products(${productFiltersString}, pagination: { limit: -1 }, ${sortOption}) {
              data {
                id
                attributes {
                  sale_price
                  color
                  delivery
                  width
                  height
                  depth
                }
              }
            }
          }
        }
      }
    }
  `;

  const query2 = `
    query {
      categories(filters: { slug: { eq: "${category}" } }) {
        data {
          id
          attributes {
            name
            products(${productFiltersString}, pagination: { page: ${page}, pageSize: 2 }, ${sortOption}) {
              data {
                id
                attributes {
                  product_name
                  regular_price
                  sale_price
                  product_image 
                  slug
                  shops {
                    data {
                      id
                      attributes {
                        name
                      }
                    }
                  }
                  categories {
                    data {
                      id
                      attributes {
                        name
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  const [allProducts, pageProducts] = await Promise.all([
    getGraphql(query1, true),
    getGraphql(query2, true),
  ]);

  const length =
    allProducts?.data?.categories?.data[0]?.attributes?.products?.data?.length;

  return (
    <div>
      <Layout>
        <Categories
          totalProducts={length}
          breadcrumbs={breadcrumbs}
          categories={categories?.data[0]?.attributes?.sub_categories?.data}
        />
        <Products
          departmentName={
            pageProducts?.data?.categories?.data[0]?.attributes?.name
          }
          allProducts={
            allProducts?.data?.categories?.data[0]?.attributes?.products?.data
          }
          products={
            pageProducts?.data?.categories?.data[0]?.attributes?.products?.data
          }
          totalProducts={length}
          description={categories?.data[0]?.attributes?.description}
        />
      </Layout>
    </div>
  );
};

export default Page;
