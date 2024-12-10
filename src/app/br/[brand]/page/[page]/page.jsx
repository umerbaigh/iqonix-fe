import { getServerSideData } from "@/utils/get-api";
import Layout from "@/layout/page";
import { Categories, Products } from "@/views/departments";

export async function generateMetadata({ params }) {
  const { brand } = await params;
  const resp = await getServerSideData(
    `/brands/?filters[slug][$eq]=${brand}`,
    true
  );

  return {
    title: resp?.data[0]?.attributes?.name,
    description: `Brand ${resp?.data[0]?.attributes?.name}`,
  };
}

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
    sales,
  } = (await searchParams) || {};
  // console.log("page", page);
  const { brand, page } = await params;
  const urls = {
    brands: `/brands/?filters[slug][$eq]=${brand}`,
  };
  let url = `/get-brand/${brand}/?page=${page}&pageSize=35`;
  let url2 = `/get-brand/${brand}/?page=-1`;
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

  const [brands, pageProducts, allProducts] = await Promise.all([
    getServerSideData(urls.brands, true),
    getServerSideData(url, true),
    getServerSideData(url2, true),
  ]);

  const breadcrumbs = [
    { title: "home page", link: "/" },
    {
      title: `product brand ${brands?.data[0]?.attributes?.name}`,
    },
  ];

  const length = allProducts?.meta?.total;
  return (
    <div>
      <Layout>
        <Categories totalProducts={length} breadcrumbs={breadcrumbs} />
        <Products
          departmentName={brands?.data[0]?.attributes?.name}
          allProducts={allProducts}
          products={pageProducts?.products}
          totalProducts={length}
          description={brands?.data[0]?.attributes?.description}
          isSearch={true}
        />
      </Layout>
    </div>
  );
};

export default Page;
