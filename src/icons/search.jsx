const Search = ({ isMobile = false }) => {
  return (
    <svg
      className={`h-5 w-5 text-[#242424]`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 19.9 19.7"
    >
      <g fill="none" strokeWidth={isMobile ? 1.3 : 1} stroke="#242424">
        <path strokeLinecap="square" d="M18.5 18.3l-5.4-5.4" />
        <circle cx="8" cy="8" r="7" />
      </g>
    </svg>
  );
};

export default Search;
