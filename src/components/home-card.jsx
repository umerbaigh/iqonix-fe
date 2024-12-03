import Image from "next/image";
import Link from "next/link";

const HomeCard = ({ data }) => {
  return (
    <div className="group h-full mx-auto max-w-[400px] sm:max-w-full w-full">
      <div className="flex items-center justify-between flex-col md:flex-row gap-y-6 bg-[#f8f8f8] overflow-hidden md:group p-4 h-full w-full">
        <Image
          src={data?.image?.data?.attributes?.url}
          alt={data?.title}
          width={150}
          height={100}
          className="transform scale-100 md:group-hover:scale-[1.3] transition duration-500 ease-in-out"
        />
        <div className="flex flex-col items-center md:items-end justify-center mr-4 transition duration-500 ease-in-out">
          <div className="transform transition duration-500 ease-in-out md:group-hover:-translate-y-3 mb-5 md:mb-0">
            <p className="text-[#a5a5a5] uppercase mx-auto md:mr-0 md:ml-auto w-fit">
              {data?.tag}
            </p>
            <h3 className="mt-2 mx-auto md:mr-0 md:ml-auto sm:max-w-[159px] text-center md:text-right text-lg sm:text-2xl font-semibold text-secondary uppercase">
              {data?.title}
            </h3>
            <p className="mt-1 text-center md:text-right text-sm text-gray-600 mx-auto md:mr-0 md:ml-auto max-w-[180px]">
              {data?.description}
            </p>
          </div>
          <Link
            href={data?.link}
            className="text-[13px] font-poppins text-white bg-black uppercase font-semibold py-2 px-3 flex md:justify-end md:ml-auto md:opacity-0 md:transform md:translate-y-10 transition-transform duration-500 ease-in-out md:group-hover:opacity-100 md:group-hover:translate-y-0"
          >
            {data?.btn_txt}
          </Link>
        </div>
      </div>
      {/* <div className="flex justify-center items-center h-[200px] w-[200px] bg-cover bg-center">
        <Image
          src={data?.image?.data?.attributes?.url}
          alt={data?.title}
          width={200}
          height={200}
          className="object-cover w-full tranform group-hover:scale-[1.1] transition duration-500 ease-in-out"
        />
      </div>
      <div className="ml-auto my-auto">
        <div className="transform transition duration-500 ease-in-out group-hover:-translate-y-4">
          <p className="text-[#a5a5a5] uppercase ml-auto w-fit">{data?.tag}</p>
          <h3 className="mt-2 ml-auto max-w-[159px] text-right text-2xl font-semibold text-secondary uppercase">
            {data?.title}
          </h3>
          <p className="mt-1 text-right text-sm text-gray-600 ml-auto max-w-[180px]">
            {data?.description}
          </p>
        </div>
        <button className="text-[13px] font-poppins text-white bg-black uppercase font-semibold py-2 px-3 flex justify-end ml-auto opacity-0 transform translate-y-8 transition-transform duration-500 ease-in-out group-hover:opacity-100 group-hover:translate-y-0">
          {data?.btn_txt}
        </button>
      </div> */}
    </div>
  );
};

export default HomeCard;
