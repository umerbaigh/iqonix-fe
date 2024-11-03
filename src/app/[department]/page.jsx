// import { BASE_URL, isLocal } from "@/utils/axios_instance";
import { getServerSideData } from "@/utils/get-api";
import { getGraphql } from "@/utils/get-graphql-api";
import Layout from "@/layout/page";
import { Categories, Products } from "@/views/departments";

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

const Page = async ({ params, searchParams }) => {
  const { page } = (await searchParams) || 1;
  // console.log("page", page);
  const { department } = await params;
  const breadcrumbs = ["Home Page", department];
  const urls = {
    categories: `/departments/?filters[slug][$eq]=/${department}&populate[categories][populate]=*`,
  };
  const [categories] = await Promise.all([
    getServerSideData(urls.categories, true),
  ]);
  // console.log(categories?.data[0]?.attributes?.categories?.data);
  const query1 = `
    query {
      departments(filters: { slug: { eq: "${department}" } }) {
        data {
          id
          attributes {
            name
            products {
              meta {
                pagination {
                  total
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
      departments(filters: { slug: { eq: "/${department}" } }) {
        data {
          id
          attributes {
            name
            products(pagination: { page: ${page}, pageSize: 2 }) {
              data {
                id
                attributes {
                  product_name
                  regular_price
                  sale_price
                  product_image 
                }
              }
            }
          }
        }
      }
    }
  `;

  // const totalCount = await getGraphql(query1, true);
  const products = await getGraphql(query2, true);
  const totalCount = 128912;
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
        {/* <Products data={departmentsGraphql?.data?.departments?.data} /> */}
        <Categories
          totalCount={totalCount}
          breadcrumbs={breadcrumbs}
          categories={categories?.data[0]?.attributes?.categories?.data}
        />
        <Products
          products={
            products?.data?.departments?.data[0]?.attributes?.products?.data
          }
        />
      </Layout>
    </div>
  );
};

export default Page;
