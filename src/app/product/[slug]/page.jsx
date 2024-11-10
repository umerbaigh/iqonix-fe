// import { BASE_URL, isLocal } from "@/utils/axios_instance";
import { getServerSideData } from "@/utils/get-api";
import Layout from "@/layout/page";
import { ProductDetail } from "@/views/product";

export async function metadata() {
  // const resp = await getServerSideData("api/home-meta/?populate=*");
  // const faviconUrl = isLocal
  //   ? BASE_URL + resp?.favicon.data.attributes.url
  //   : resp?.favicon.data.attributes.url;
  // return {
  //   title: resp?.title,
  //   description: resp?.description,
  //   verification: {
  //     google: "Aahq02UlpbJw3PbuUBWCiXqueMvK4qN0fZNrO4wUWcE",
  //   },
  //   icons: {
  //     icon: [
  //       {
  //         url: faviconUrl,
  //         href: faviconUrl,
  //       },
  //     ],
  //   },
  //   openGraph: {
  //     url: `https://wawcd.com/`,
  //     title: resp?.title,
  //     description: resp?.description,
  //     siteName: "WAWCD: WhatsApp CRM with Contact Saver, Broadcasting & more",
  //     locale: "en_EN",
  //     images: [
  //       {
  //         url: faviconUrl,
  //         width: 800,
  //         height: 600,
  //         alt: resp?.title,
  //       },
  //     ],
  //   },
  // };
}

const Page = async ({ params }) => {
  const { slug } = await params;
  const urls = {
    product: `/products/?filters[slug][$eq]=${slug}&populate[shops][populate]=*&populate[brand][populate]=*`,
  };
  const [product] = await Promise.all([getServerSideData(urls.product, true)]);
  // console.log(product?.data?.[0]?.attributes);
  // const jsonLd = {
  //   "@context": "https://schema.org",
  //   "@type": "Organization",
  //   name: meta?.title,
  //   image: isLocal
  //     ? BASE_URL + template?.image?.data?.attributes?.url
  //     : template?.image?.data?.attributes?.url,
  //   description: meta?.description,
  //   url: "https://wawcd.com/",
  // };
  return (
    <div>
      {/* <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      /> */}
      <Layout>
        <ProductDetail product={product?.data?.[0]?.attributes} />
      </Layout>
    </div>
  );
};

export default Page;
