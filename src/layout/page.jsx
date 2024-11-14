import { getServerSideData } from "@/utils/get-api";
import { Header, Footer } from ".";
import { getGraphql } from "@/utils/get-graphql-api";

const Layout = async ({ children }) => {
  const urls = {
    header:
      "/header/?populate[logo][populate]=*&populate[social_links][populate]=*",
    departments: "/departments/?populate=*&sort=id",
    shops: "/shops/?populate=*&sort=id&pagination[limit]=3",
    products: "/products/?pagination[limit]=2",
    footer:
      "/footer/?populate[footer_links1][populate]=*&populate[footer_links2][populate]=*",
  };
  const [header, departments, shops, products, footer] = await Promise.all([
    getServerSideData(urls.header),
    getServerSideData(urls.departments, true),
    getServerSideData(urls.shops, true),
    getServerSideData(urls.products, true),
    getServerSideData(urls.footer),
  ]);

  const query1 = `
    query {
      departments {
        data {
          id
          attributes {
            name
            products(pagination: { limit: 2 }) {
              data {
                id
                attributes {
                  product_name
                  product_image
                  regular_price
                  sale_price
                  slug
                }
              }
            }
          }
        }
      }
    }
  `;

  const [allProducts] = await Promise.all([getGraphql(query1, true)]);

  // console.log("All Products", allProducts?.data?.departments?.data);

  return (
    <div className="min-h-[100vh] flex flex-col justify-between">
      <Header
        data={header}
        departments={departments?.data}
        shops={shops?.data}
        allProducts={allProducts?.data?.departments?.data}
      />
      {children}
      <Footer data={footer} icons={header} products={products?.data} />
    </div>
  );
};

export default Layout;
