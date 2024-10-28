import Image from "next/image";

const Hero = ({ data }) => {
  return (
    <div className="grid grid-cols-2 gap-8 items-center max-w-[1440px] w-full mx-auto">
      <Image
        src={data?.image?.data?.attributes?.url}
        width={1920}
        height={1080}
        alt="sofa"
      />
      <div className="max-w-[620px] w-full">
        <h1 className="text-[#242424] font-poppins text-[38px] text-center">
          <span className="text-primary">{data.title1}</span> {data.title2}
        </h1>
        <p className="text-black font-lato text-[14px] text-center mt-5">
          {data?.detail}
        </p>
      </div>
    </div>
  );
};

export default Hero;
