import { getServerSideData } from "@/utils/get-api";
import { getGraphql } from "@/utils/get-graphql-api";
import Layout from "@/layout/page";
import { Categories, Products } from "@/views/departments";

const Page = async ({ params, searchParams }) => {
  const {
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
    order,
    min,
    max,
    sales,
  } = (await searchParams) || {};
  // console.log("page", page);
  const { category, page } = await params;
  const fetchCategoryWithParents = async (slug) => {
    const breadcrumbs = [];
    let currentSlug = slug;

    // Fetch category and parents recursively using GraphQL
    while (currentSlug) {
      const query = `
      query {
        categories(filters: { slug: { eq: "${currentSlug}" } }) {
          data {
            id
            attributes {
              name
              slug
              parent {
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
    `;

      const response = await getGraphql(query, true); // Replace REST API call with GraphQL call
      const categoryData = response?.data?.categories?.data?.[0]?.attributes;

      if (!categoryData) break; // Exit loop if no category data found

      // Add current category to breadcrumbs
      breadcrumbs.unshift({
        title: categoryData.name,
        link: `/cat/${categoryData.slug}`,
      });

      // Set currentSlug to parent slug for the next iteration
      currentSlug = categoryData?.parent?.data?.attributes?.slug || null;
    }

    // Add the homepage breadcrumb
    breadcrumbs.unshift({
      title: "home page",
      link: "/",
    });

    return breadcrumbs;
  };

  // Usage example
  const breadcrumbs = await fetchCategoryWithParents(category);
  // console.log(breadcrumbs);

  const urls = {
    categories: `/categories/?filters[slug][$eq]=${category}&populate[parent][populate]=*`,
  };
  let url = `/category/${category}/?page=${page}&pageSize=35`;
  let url2 = `/category/${category}/?page=-1`;
  let sortOption = "";
  if (order === "date") {
    sortOption = "createdAt";
  } else if (order === "price") {
    sortOption = "sale_price";
  } else if (order === "price-desc") {
    sortOption = "-sale_price";
  }

  let queryParams = [];
  if (sortOption !== "" && sortOption) {
    queryParams.push(`sort=${sortOption}`);
  }
  if (furniture_color) {
    queryParams.push(`furniture_color=${furniture_color}`);
  }
  if (delivery) {
    queryParams.push(`delivery=${delivery}`);
  }
  if (furniture_material) {
    queryParams.push(`furniture_material=${furniture_material}`);
  }
  if (breite) {
    queryParams.push(`breite=${breite}`);
  }
  if (hoehe) {
    queryParams.push(`hoehe=${hoehe}`);
  }
  if (tiefe) {
    queryParams.push(`tiefe=${tiefe}`);
  }
  if (damen_normalgr) {
    queryParams.push(`damen_normalgr=${damen_normalgr}`);
  }
  if (damen_jeansgr) {
    queryParams.push(`damen_jeansgr=${damen_jeansgr}`);
  }
  if (damen_kurzgr) {
    queryParams.push(`damen_kurzgr=${damen_kurzgr}`);
  }
  if (damen_langgr) {
    queryParams.push(`damen_langgr=${damen_langgr}`);
  }
  if (cup_gr) {
    queryParams.push(`cup_gr=${cup_gr}`);
  }
  if (brustumfang) {
    queryParams.push(`brustumfang=${brustumfang}`);
  }
  if (miederhosengr) {
    queryParams.push(`miederhosengr=${miederhosengr}`);
  }
  if (strumpfhosengr) {
    queryParams.push(`strumpfhosengr=${strumpfhosengr}`);
  }
  if (sockengr) {
    queryParams.push(`sockengr=${sockengr}`);
  }
  if (herren_normalgr) {
    queryParams.push(`herren_normalgr=${herren_normalgr}`);
  }
  if (herren_jeansgr) {
    queryParams.push(`herren_jeansgr=${herren_jeansgr}`);
  }
  if (kragenweite) {
    queryParams.push(`kragenweite=${kragenweite}`);
  }
  if (herren_untersetztgr) {
    queryParams.push(`herren_untersetztgr=${herren_untersetztgr}`);
  }
  if (herren_schlankgr) {
    queryParams.push(`herren_schlankgr=${herren_schlankgr}`);
  }
  if (waschegr) {
    queryParams.push(`waschegr=${waschegr}`);
  }
  if (herren_bauchgr) {
    queryParams.push(`herren_bauchgr=${herren_bauchgr}`);
  }
  if (baby_normalgr) {
    queryParams.push(`baby_normalgr=${baby_normalgr}`);
  }
  if (kinder_normalg) {
    queryParams.push(`kinder_normalg=${kinder_normalg}`);
  }
  if (kinder_sockengr) {
    queryParams.push(`kinder_sockengr=${kinder_sockengr}`);
  }
  if (schuhgr) {
    queryParams.push(`schuhgr=${schuhgr}`);
  }
  if (kinder_schuhgr) {
    queryParams.push(`kinder_schuhgr=${kinder_schuhgr}`);
  }
  if (fashion_material) {
    queryParams.push(`fashion_material=${fashion_material}`);
  }
  if (fashion_color) {
    queryParams.push(`fashion_color=${fashion_color}`);
  }
  if (shoes_material) {
    queryParams.push(`shoes_material=${shoes_material}`);
  }
  if (shoes_color) {
    queryParams.push(`shoes_color=${shoes_color}`);
  }
  if (sales) {
    queryParams.push(`sales=${sales}`);
  }
  if (min) {
    queryParams.push(`min_sale_price=${min}`);
  }
  if (max) {
    queryParams.push(`max_sale_price=${max}`);
  }

  // Combine query params into the URL
  if (queryParams.length > 0) {
    url += `&${queryParams.join("&")}`;
    url2 += `&${queryParams.join("&")}`;
  }

  const [categories, pageProducts, allProducts] = await Promise.all([
    getServerSideData(urls.categories, true),
    getServerSideData(url, true),
    getServerSideData(url2, true),
  ]);

  let [sub_categories] = await Promise.all([
    getServerSideData(
      `/categories/?filters[parent][$eq]=${categories?.data?.[0]?.id}`,
      true
    ),
  ]);

  // console.log(sub_categories);
  const subCategorySlugs =
    sub_categories?.data?.map((category) => category?.attributes?.slug) || [];
  // console.log(subCategorySlugs);
  const validSubCategories = [];
  for (const slug of subCategorySlugs) {
    const response = await getServerSideData(
      `/category/${slug}/?page=${page}&pageSize=1`, // Adjust the endpoint as per your API requirements
      true
    );

    if (response?.products?.length > 0) {
      validSubCategories.push(slug);
    }
  }

  // console.log("Valid sub-categories:", validSubCategories);
  sub_categories =
    sub_categories?.data?.filter((cat) =>
      validSubCategories.includes(cat?.attributes?.slug)
    ) || [];
  const length = allProducts?.products?.length;

  return (
    <div>
      <Layout>
        <Categories
          totalProducts={length}
          breadcrumbs={breadcrumbs}
          categories={sub_categories}
        />
        <Products
          departmentName={categories?.data?.[0]?.attributes?.name}
          allProducts={allProducts?.products}
          products={pageProducts?.products}
          totalProducts={length}
          description={categories?.data[0]?.attributes?.description}
          isSearch={true}
        />
      </Layout>
    </div>
  );
};

export default Page;
