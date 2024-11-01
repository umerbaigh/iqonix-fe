import { HomeCard } from "@/components";

const ProductCards = ({ data }) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 my-16 max-w-[1600px] mx-auto px-4 sm:px-8">
      {data?.map((item, index) => (
        <div key={index} className="h-full">
          <HomeCard data={item?.attributes} />
        </div>
      ))}
    </div>
  );
};

export default ProductCards;
