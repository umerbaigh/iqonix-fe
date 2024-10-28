import { getServerSideData } from "@/utils/get-api";
import { Header } from ".";

const Layout = async ({ children }) => {
  const urls = {
    header:
      "/header/?populate[logo][populate]=*&populate[social_links][populate]=*",
    departments: "/departments/?populate=*&sort=id",
    shops: "/shops/?populate=*&sort=id",
    // footer: "api/footer",
  };
  const [header, departments, shops] = await Promise.all([
    getServerSideData(urls.header),
    getServerSideData(urls.departments, true),
    getServerSideData(urls.shops, true),
  ]);

  return (
    <div className="min-h-[100vh] flex flex-col justify-between">
      <Header
        data={header}
        departments={departments?.data}
        shops={shops?.data}
      />
      {children}
      {/* <Footer data={footer} /> */}
    </div>
  );
};

export default Layout;
