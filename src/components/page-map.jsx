import Link from "next/link";

const PageMap = ({ data }) => {
  return (
    <div>
      {data?.map((item, index) =>
        index === data.length - 1 ? (
          <Link
            href={item.toLowerCase()}
            className="text-[#767676] text-sm font-lato"
          >
            {item} {"/ "}
          </Link>
        ) : (
          <p className="text-third text-sm font-lato">{item}</p>
        )
      )}
    </div>
  );
};

export default PageMap;
