// import { BASE_URL, isLocal } from "@/utils/axios_instance";
import { getServerSideData } from "@/utils/get-api";
import { getGraphql } from "@/utils/get-graphql-api";
import Layout from "@/layout/page";
import {
  AboutUs,
  DepartmentSlider,
  Hero,
  ProductCards,
  Products,
  Shop,
} from "@/views/home";

const Page = async () => {
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
                slug
                shops {
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
  return (
    <div>
      <Layout>
        <Hero data={hero} />
        <DepartmentSlider data={department?.data} />
        <Products data={departmentsGraphql?.data?.departments?.data} />
        <ProductCards data={card?.data} />
        <AboutUs data={about} />
        <Shop data={shop?.data} />
      </Layout>
    </div>
  );
};

export default Page;
