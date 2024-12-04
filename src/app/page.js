import { getServerSideData } from "@/utils/get-api";
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
    shopByCategory: `/shop-by-category/?populate[category_links][populate]=*`,
    mustHaveProduct: `/must-have-product/?populate[search_words][populate]=*`,
    card: `/home-product-cards/?populate=*`,
    about: `/home-about/?populate=*`,
    shop: `/shops/?populate=image`,
  };
  const [hero, shopByCategory, mustHaveProduct, card, about, shop] =
    await Promise.all([
      getServerSideData(urls.hero),
      getServerSideData(urls.shopByCategory),
      getServerSideData(urls.mustHaveProduct),
      getServerSideData(urls.card, true),
      getServerSideData(urls.about),
      getServerSideData(urls.shop, true),
    ]);

  return (
    <div>
      <Layout>
        <Hero data={hero} />
        <DepartmentSlider data={shopByCategory} />
        <Products data={mustHaveProduct} />
        <ProductCards data={card?.data} />
        <AboutUs data={about} />
        <Shop data={shop?.data} />
      </Layout>
    </div>
  );
};

export default Page;
