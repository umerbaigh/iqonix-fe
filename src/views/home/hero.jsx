import Image from "next/image";

const Hero = ({ data }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-[1600px] w-full mx-auto">
      <Image
        src={data?.image?.data?.attributes?.url}
        width={1920}
        height={1080}
        alt="sofa"
      />
      <div className="md:max-w-[650px] w-full px-4">
        <h1 className="text-secondary font-poppins text-[38px] text-center">
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
