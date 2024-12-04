import { getServerSideData } from "@/utils/get-api";
import Layout from "@/layout/page";
import { Categories, Products } from "@/views/departments";

const Page = async ({ searchParams }) => {
  const {
    search,
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
    sales,
  } = (await searchParams) || {};
  const page = 1;
  const all = true;
  let url = `/custom-products/?search_word=${search}&page=${page}&pageSize=35`;
  let url2 = `/custom-products/?search_word=${search}&all=${all}`;
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
  const [products, allProducts] = await Promise.all([
    getServerSideData(url, true),
    getServerSideData(url2, true),
  ]);
  // console.log(products?.data[0]);

  const breadcrumbs = [
    { title: "home page", link: "/" },
    {
      title: `product search`,
    },
  ];

  const length = allProducts?.data?.length;
  return (
    <div>
      <Layout>
        <Categories totalProducts={length} breadcrumbs={breadcrumbs} />
        <Products
          departmentName={`Search: ${search}`}
          products={products?.data}
          allProducts={allProducts?.data}
          totalProducts={length}
          isSearch={true}
        />
      </Layout>
    </div>
  );
};

export default Page;
