// import { BASE_URL, isLocal } from "@/utils/axios_instance";
import { getServerSideData } from "@/utils/get-api";
import { getGraphql } from "@/utils/get-graphql-api";
import Layout from "@/layout/page";

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
  const parameters = await params;
  const breadcrumbs = [
    "Home Page",
    parameters?.department,
    parameters?.category,
  ];
  const urls = {
    hero: `/home-hero-section/?populate=*`,
    department: `/departments/?populate=image&populate=icon&sort=id`,
    card: `/home-product-cards/?populate=*`,
    about: `/home-about/?populate=*`,
    shop: `/shops/?populate=*`,
  };
  const [hero, department, card, about, shop] = await Promise.all([
    getServerSideData(urls.hero),
    getServerSideData(urls.department, true),
    getServerSideData(urls.card, true),
    getServerSideData(urls.about),
    getServerSideData(urls.shop, true),
  ]);
  const query = `
  query {
    departments {
      data {
        id
        attributes {
          name
          icon {
            data {
              attributes {
                url
                name
              }
            }
          }
          products(pagination: { limit: 5 }) {
            data {
              id
              attributes {
                product_name
                regular_price
                sale_price
                product_image
                brand {
                  data {
                    id
                    attributes {
                      name
                    }
                  }
                }
                categories {
                  data {
                    id
                    attributes {
                      name
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

  const departmentsGraphql = await getGraphql(query, true);
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
      </Layout>
    </div>
  );
};

export default Page;
