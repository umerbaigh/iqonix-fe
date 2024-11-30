import { getServerSideData } from "@/utils/get-api";
import Layout from "@/layout/page";
import { Categories, Products } from "@/views/departments";

const Page = async ({ searchParams, params }) => {
  const { search } = (await searchParams) || {};
  const { page } = await params;
  const all = true;
  const urls = {
    products: `/custom-products?search_word=${search}&page=${page}&pageSize=${2}`,
    // allProducts: `/custom-products?search_word=${search}&all=${all}`,
  };
  const [products, allProducts] = await Promise.all([
    getServerSideData(urls.products, true),
    // getServerSideData(urls.allProducts, true),
  ]);
  // console.log(products?.data[0]);

  const breadcrumbs = [
    { title: "home page", link: "/" },
    {
      title: `product search`,
    },
  ];

  const length = products?.meta?.total;
  return (
    <div>
      <Layout>
        <Categories totalProducts={length} breadcrumbs={breadcrumbs} />
        <Products
          departmentName={`Search: ${search}`}
          products={products?.data}
          // allProducts={allProducts?.data}
          totalProducts={length}
          isSearch={true}
        />
      </Layout>
    </div>
  );
};

export default Page;
