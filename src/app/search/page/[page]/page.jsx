import { getServerSideData } from "@/utils/get-api";
import Layout from "@/layout/page";
import { Categories, Products } from "@/views/departments";

export async function generateMetadata({ searchParams }) {
  const { search } = (await searchParams) || {};

  return {
    title: `${search} products`,
    description: `Search products for ${search}`,
  };
}

const Page = async ({ params, searchParams }) => {
  const {
    search,
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
    sales,
  } = (await searchParams) || {};
  const { page } = await params;
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

  const length = allProducts?.meta?.total;
  return (
    <div>
      <Layout>
        <Categories totalProducts={length} breadcrumbs={breadcrumbs} />
        <Products
          departmentName={`Search: ${search}`}
          products={products?.data}
          allProducts={allProducts}
          totalProducts={length}
          isSearch={true}
        />
      </Layout>
    </div>
  );
};

export default Page;
