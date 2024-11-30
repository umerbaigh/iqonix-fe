import { getServerSideData } from "@/utils/get-api";
import { Header, Footer, Cookie } from ".";

const Layout = async ({ children }) => {
  const urls = {
    header:
      "/header/?populate[logo][populate]=*&populate[social_links][populate]=*&populate[nav_links][populate]=*",
    footer:
      "/footer/?populate[footer_links][populate]=*&populate[footer_links2][populate]=*",
    cookies: "/cookie",
  };
  const [header, footer, cookies] = await Promise.all([
    getServerSideData(urls.header),
    getServerSideData(urls.footer),
    getServerSideData(urls.cookies),
  ]);

  return (
    <div className="min-h-[100vh] flex flex-col justify-between">
      <Header data={header} />
      {children}
      <Footer data={footer} icons={header} />
      <Cookie data={cookies} />
    </div>
  );
};

export default Layout;
