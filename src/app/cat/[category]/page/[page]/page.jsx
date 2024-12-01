// import { BASE_URL, isLocal } from "@/utils/axios_instance";
import { getServerSideData } from "@/utils/get-api";
import { getGraphql } from "@/utils/get-graphql-api";
import Layout from "@/layout/page";
import { Categories, Products } from "@/views/departments";

const Page = async ({ params, searchParams }) => {
  const {
    order,
    color,
    delivery,
    width,
    height,
    depth,
    size,
    material,
    min,
    max,
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
  let url = `/category/${category}/?page=${page}&pageSize=2`;
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
  if (color) {
    queryParams.push(`color=${color}`);
  }
  if (delivery) {
    queryParams.push(`delivery=${delivery}`);
  }
  if (width) {
    queryParams.push(`width=${width}`);
  }
  if (height) {
    queryParams.push(`height=${height}`);
  }
  if (depth) {
    queryParams.push(`depth=${depth}`);
  }
  if (size) {
    queryParams.push(`size=${size}`);
  }
  if (material) {
    queryParams.push(`material=${material}`);
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
  // console.log(categories);

  const [sub_categories] = await Promise.all([
    getServerSideData(
      `/categories/?filters[parent][$eq]=${categories?.data?.[0]?.id}`,
      true
    ),
  ]);

  const length = allProducts?.products?.length;

  return (
    <div>
      <Layout>
        <Categories
          totalProducts={length}
          breadcrumbs={breadcrumbs}
          categories={sub_categories?.data}
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
