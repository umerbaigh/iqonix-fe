import { BlocksRender } from "@/components";

const AboutUs = ({ data }) => {
  return (
    <div className="relative">
      <div className="relative w-full h-[600px] mt-24">
        <img
          src={data?.image?.data?.attributes?.url}
          alt="Background"
          className="object-cover w-full h-full object-top"
        />
      </div>

      <div className="absolute bg-white p-8 rounded-lg text-[#777777] container z-40 left-1/2 transform -translate-x-1/2 top-1/2">
        <BlocksRender data={data?.about_text} />
      </div>
    </div>
  );
};

export default AboutUs;
