import { getServerSideData } from "@/utils/get-api";
import { Header, Footer } from ".";

const Layout = async ({ children }) => {
  const urls = {
    header:
      "/header/?populate[logo][populate]=*&populate[social_links][populate]=*&populate[nav_links][populate]=*",
    footer:
      "/footer/?populate[footer_links][populate]=*&populate[footer_links2][populate]=*",
  };
  const [header, footer] = await Promise.all([
    getServerSideData(urls.header),
    getServerSideData(urls.footer),
  ]);

  return (
    <div className="min-h-[100vh] flex flex-col justify-between">
      <Header data={header} />
      {children}
      <Footer data={footer} icons={header} />
    </div>
  );
};

export default Layout;
