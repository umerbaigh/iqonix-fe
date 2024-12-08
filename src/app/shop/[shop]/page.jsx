import { getServerSideData } from "@/utils/get-api";
import { getGraphql } from "@/utils/get-graphql-api";
import Layout from "@/layout/page";
import { Categories, Products } from "@/views/departments";

const Page = async ({ params, searchParams }) => {
  const {
    order,
    delivery,
    furniture_color,
    furniture_material,
    breite,
    hoehe,
    tiefe,
    damen_normalgr,
    damen_jeansgr,
    damen_kurzgr,
    damen_langgr,
    cup_gr,
    brustumfang,
    miederhosengr,
    strumpfhosengr,
    sockengr,
    herren_normalgr,
    herren_jeansgr,
    kragenweite,
    herren_untersetztgr,
    herren_schlankgr,
    waschegr,
    herren_bauchgr,
    baby_normalgr,
    kinder_normalg,
    kinder_sockengr,
    schuhgr,
    kinder_schuhgr,
    fashion_material,
    fashion_color,
    shoes_material,
    shoes_color,
    min,
    max,
  } = (await searchParams) || {};
  // console.log("page", page);
  const page = 1;
  const { shop } = await params;
  const urls = {
    shops: `/shops/?filters[slug][$eq]=${shop}`,
  };
  const [shops] = await Promise.all([getServerSideData(urls.shops, true)]);
  // console.log(shops?.data[0]?.attributes);
  let sortOption = "";
  if (order === "date") {
    sortOption = 'sort: "createdAt:desc"';
  } else if (order === "price") {
    sortOption = 'sort: "sale_price:asc"';
  } else if (order === "price-desc") {
    sortOption = 'sort: "sale_price:desc"';
  }

  let productFilters = {};
  if (furniture_color)
    productFilters.furniture_color = {
      eq: furniture_color.split("_").join(" "),
    };
  if (furniture_material)
    productFilters.furniture_material = {
      eq: furniture_material.split("_").join(" "),
    };
  if (breite) productFilters.breite = { eq: breite.split("_").join(" ") };
  if (hoehe) productFilters.hoehe = { eq: hoehe.split("_").join(" ") };
  if (tiefe) productFilters.tiefe = { eq: tiefe.split("_").join(" ") };
  if (delivery) productFilters.delivery = { eq: delivery.split("_").join(" ") };
  if (damen_normalgr)
    productFilters.damen_normalgr = {
      eq: damen_normalgr.split("_").join(" "),
    };
  if (damen_jeansgr)
    productFilters.damen_jeansgr = {
      eq: damen_jeansgr.split("_").join(" "),
    };
  if (damen_kurzgr)
    productFilters.damen_kurzgr = {
      eq: damen_kurzgr.split("_").join(" "),
    };
  if (damen_langgr)
    productFilters.damen_langgr = {
      eq: damen_langgr.split("_").join(" "),
    };
  if (cup_gr) productFilters.cup_gr = { eq: cup_gr.split("_").join(" ") };
  if (brustumfang)
    productFilters.brustumfang = {
      eq: brustumfang.split("_").join(" "),
    };
  if (miederhosengr)
    productFilters.miederhosengr = {
      eq: miederhosengr.split("_").join(" "),
    };
  if (strumpfhosengr)
    productFilters.strumpfhosengr = {
      eq: strumpfhosengr.split("_").join(" "),
    };
  if (sockengr) productFilters.sockengr = { eq: sockengr.split("_").join(" ") };
  if (herren_normalgr)
    productFilters.herren_normalgr = {
      eq: herren_normalgr.split("_").join(" "),
    };
  if (herren_jeansgr)
    productFilters.herren_jeansgr = {
      eq: herren_jeansgr.split("_").join(" "),
    };
  if (kragenweite)
    productFilters.kragenweite = {
      eq: kragenweite.split("_").join(" "),
    };
  if (herren_untersetztgr)
    productFilters.herren_untersetztgr = {
      eq: herren_untersetztgr.split("_").join(" "),
    };
  if (herren_schlankgr)
    productFilters.herren_schlankgr = {
      eq: herren_schlankgr.split("_").join(" "),
    };
  if (waschegr) productFilters.waschegr = { eq: waschegr.split("_").join(" ") };
  if (herren_bauchgr)
    productFilters.herren_bauchgr = {
      eq: herren_bauchgr.split("_").join(" "),
    };
  if (baby_normalgr)
    productFilters.baby_normalgr = {
      eq: baby_normalgr.split("_").join(" "),
    };
  if (kinder_normalg)
    productFilters.kinder_normalg = {
      eq: kinder_normalg.split("_").join(" "),
    };
  if (kinder_sockengr)
    productFilters.kinder_sockengr = {
      eq: kinder_sockengr.split("_").join(" "),
    };
  if (schuhgr) productFilters.schuhgr = { $eq: schuhgr.split("_").join(" ") };
  if (kinder_schuhgr)
    productFilters.kinder_schuhgr = {
      eq: kinder_schuhgr.split("_").join(" "),
    };
  if (fashion_material)
    productFilters.fashion_material = {
      eq: fashion_material.split("_").join(" "),
    };
  if (fashion_color)
    productFilters.fashion_color = {
      eq: fashion_color.split("_").join(" "),
    };
  if (shoes_material)
    productFilters.shoes_material = {
      eq: shoes_material.split("_").join(" "),
    };
  if (shoes_color)
    productFilters.shoes_color = {
      eq: shoes_color.split("_").join(" "),
    };

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
      shops(filters: { slug: { eq: "${shop}" } }) {
        data {
          id
          attributes {
            name
            products(${productFiltersString}, pagination: { limit: -1 }, ${sortOption}) {
              data {
                id
                attributes {
                  sale_price
                  delivery
                  furniture_color
                  furniture_material
                  breite
                  hoehe
                  tiefe
                  damen_normalgr
                  damen_jeansgr
                  damen_kurzgr
                  damen_langgr
                  cup_gr
                  brustumfang
                  miederhosengr
                  strumpfhosengr
                  sockengr
                  herren_normalgr
                  herren_jeansgr
                  kragenweite
                  herren_untersetztgr
                  herren_schlankgr
                  waschegr
                  herren_bauchgr
                  baby_normalgr
                  kinder_normalg
                  kinder_sockengr
                  schuhgr
                  kinder_schuhgr
                  fashion_material
                  fashion_color
                  shoes_material
                  shoes_color
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
      shops(filters: { slug: { eq: "${shop}" } }) {
        data {
          id
          attributes {
            name
            products(${productFiltersString}, pagination: { page: ${page}, pageSize: 35 }, ${sortOption}) {
              data {
                id
                attributes {
                  product_name
                  regular_price
                  sale_price
                  product_image1
                  product_url 
                  slug
                  shops {
                    data {
                      id
                      attributes {
                        name
                        slug
                      }
                    }
                  }
                  categories {
                    data {
                      id
                      attributes {
                        name
                        slug
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
  // console.log("allProducts", allProducts);
  // console.log("pageProducts", pageProducts);
  // const breadcrumbs = [
  //   "home page",
  //   `product shops ${pageProducts?.data?.shops?.data[0]?.attributes?.name}`,
  // ];
  const breadcrumbs = [
    { title: "home page", link: "/" },
    {
      title: `product shops ${pageProducts?.data?.shops?.data[0]?.attributes?.name}`,
    },
  ];

  const length =
    allProducts?.data?.shops?.data[0]?.attributes?.products?.data?.length;
  return (
    <div>
      <Layout>
        <Categories totalProducts={length} breadcrumbs={breadcrumbs} />
        <Products
          departmentName={pageProducts?.data?.shops?.data[0]?.attributes?.name}
          allProducts={
            allProducts?.data?.shops?.data[0]?.attributes?.products?.data
          }
          products={
            pageProducts?.data?.shops?.data[0]?.attributes?.products?.data
          }
          totalProducts={length}
          description={shops?.data[0]?.attributes?.description}
        />
      </Layout>
    </div>
  );
};

export default Page;
