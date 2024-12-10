// import { BASE_URL, isLocal } from "@/utils/axios_instance";
import { getServerSideData } from "@/utils/get-api";
import Layout from "@/layout/page";
import { ProductDetail } from "@/views/product";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const resp = await getServerSideData(
    `/products/?filters[slug][$eq]=${slug}`,
    true
  );

  return {
    title: resp?.data[0]?.attributes?.product_name,
    description: `Product details of ${resp?.data[0]?.attributes?.product_name}`,
  };
}

const Page = async ({ params }) => {
  const { slug } = await params;
  const urls = {
    product: `/products/?filters[slug][$eq]=${slug}&populate[shops][populate]=image`,
  };
  const [product] = await Promise.all([getServerSideData(urls.product, true)]);
  return (
    <div>
      <Layout>
        <ProductDetail product={product?.data?.[0]?.attributes} />
      </Layout>
    </div>
  );
};

export default Page;
