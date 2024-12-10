import { SearchInput } from "@/components";

const PageNotFound = () => {
  return (
    <div className="w-full flex items-center px-6 mb-20 justify-center">
      <div>
        <h1 className="text-primary text-[80px] font-bold text-center uppercase my-20">
          404 Not Found
        </h1>
        <h2 className="text-secondary text-3xl font-bold text-center">
          This is somewhat embarrassing, isn’t it?
        </h2>
        <p className="text-[#777777] text-base font-normal text-center my-6">
          It looks like nothing was found at this location. Maybe try a search?
        </p>
        <SearchInput />
      </div>
    </div>
  );
};

export default PageNotFound;
