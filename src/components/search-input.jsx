"use client";
import { Search } from "@/icons";
import { useState } from "react";

const SearchInput = () => {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div className="relative flex justify-center items-center w-full max-w-[715px]">
      <input
        type="text"
        placeholder="Search for products"
        value={search}
        onChange={handleSearch}
        className="py-4 lg:py-2 pl-[15px] pr-10 lg:border-2 w-full text-[#767676] placeholder-[#767676] border-borderColor text-sm focus:outline-none"
      />
      <div className="absolute right-10 top-1/2 transform -translate-y-1/2">
        <Search />
      </div>
      {search && (
        <ul className="absolute left-0 right-0 top-full bg-white border border-gray-300 rounded-b-md shadow-md mt-1 z-10">
          <li className="py-2 px-4">Not found</li>
        </ul>
      )}
    </div>
  );
};

export default SearchInput;
