import Image from "next/image";

const HomeCard = ({ data }) => {
  return (
    <div className="group h-full">
      <div className="relative overflow-hidden group mx-auto max-w-[500px] xl:max-w-auto">
        <Image
          src={data?.image?.data?.attributes?.url}
          alt={data?.title}
          width={600}
          height={600}
          className="object-cover w-full transform scale-100 group-hover:scale-[1.3] transition duration-500 ease-in-out"
        />
        <div className="absolute inset-0 flex flex-col items-end justify-center mr-4 transition duration-500 ease-in-out">
          <div className="transform transition duration-500 ease-in-out group-hover:-translate-y-3">
            <p className="text-[#a5a5a5] uppercase ml-auto w-fit">
              {data?.tag}
            </p>
            <h3 className="mt-2 ml-auto sm:max-w-[159px] text-right text-lg sm:text-2xl font-semibold text-secondary uppercase">
              {data?.title}
            </h3>
            <p className="mt-1 text-right text-sm text-gray-600 ml-auto max-w-[180px]">
              {data?.description}
            </p>
          </div>
          <button className="text-[13px] font-poppins text-white bg-black uppercase font-semibold py-2 px-3 flex justify-end ml-auto opacity-0 transform translate-y-10 transition-transform duration-500 ease-in-out group-hover:opacity-100 group-hover:translate-y-0">
            {data?.btn_txt}
          </button>
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
