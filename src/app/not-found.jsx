import Layout from "@/layout/page";
import { PageNotFound } from "@/views/page_not_found.jsx";

export async function metadata() {
  return {
    title: "Iqonix 404 Page",
    description: "Iqonix 404 Page",
  };
}

const Page = async () => {
  return (
    <div>
      <Layout>
        <PageNotFound />
      </Layout>
    </div>
  );
};

export default Page;
