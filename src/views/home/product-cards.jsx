import { HomeCard } from "@/components";

const ProductCards = ({ data }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 my-16 w-full max-w-[1600px] mx-auto px-4 sm:px-8">
      {data?.map((item, index) => (
        <HomeCard key={index} data={item?.attributes} />
      ))}
    </div>
  );
};

export default ProductCards;
