import { getServerSideData } from "@/utils/get-api";
import { Header, Footer } from ".";

const Layout = async ({ children }) => {
  const urls = {
    header:
      "/header/?populate[logo][populate]=*&populate[social_links][populate]=*",
    departments: "/departments/?populate=*&sort=id",
    shops: "/shops/?populate=*&sort=id&pagination[limit]=3",
    footer:
      "/footer/?populate[footer_links1][populate]=*&populate[footer_links2][populate]=*",
  };
  const [header, departments, shops, footer] = await Promise.all([
    getServerSideData(urls.header),
    getServerSideData(urls.departments, true),
    getServerSideData(urls.shops, true),
    getServerSideData(urls.footer),
  ]);

  return (
    <div className="min-h-[100vh] flex flex-col justify-between">
      {/* <Header
        data={header}
        departments={departments?.data}
        shops={shops?.data}
      /> */}
      {children}
      <Footer data={footer} icons={header} />
    </div>
  );
};

export default Layout;
