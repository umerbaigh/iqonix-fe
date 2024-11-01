"use client";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";
import Image from "next/image";

const BlocksRender = ({ data }) => {
  return (
    <div className="blocks-class">
      <BlocksRenderer
        content={data}
        blocks={{
          image: ({ image }) => {
            return (
              <Image
                priority={true}
                src={image.url}
                width={image.width}
                height={image.height}
                alt={image.alternativeText || "image"}
                className="block my-4"
              />
            );
          },
          heading: ({ children, level }) => {
            switch (level) {
              case 1:
                return (
                  <h1
                    className={`block my-6 text-[50px] font-bold leading-[120%] text-inherit font-poppins`}
                  >
                    {children}
                  </h1>
                );
              case 2:
                return (
                  <h2
                    className={`block my-[22px] text-[40px] font-bold leading-[120%] text-inherit font-poppins`}
                  >
                    {children}
                  </h2>
                );
              case 3:
                return (
                  <h3
                    className={`block my-5 text-[30px] font-bold leading-[120%] text-inherit font-poppins`}
                  >
                    {children}
                  </h3>
                );
              case 4:
                return (
                  <h4
                    className={`block my-[18px] text-[25px] font-bold leading-[120%] text-inherit font-poppins`}
                  >
                    {children}
                  </h4>
                );
              case 5:
                return (
                  <h5
                    className={`block my-4 text-[20px] font-bold leading-[120%] text-inherit font-poppins`}
                  >
                    {children}
                  </h5>
                );
              case 6:
                return (
                  <h6
                    className={`block my-[14px] text-lg font-bold leading-[120%] text-inherit font-poppins`}
                  >
                    {children}
                  </h6>
                );
              default:
                return (
                  <h6
                    className={`block my-[14px] text-lg font-bold leading-[120%] text-inherit font-poppins`}
                  >
                    {children}
                  </h6>
                );
            }
          },
          paragraph: ({ children }) => (
            <p
              className={`inline my-3 text-sm font-normal leading-relaxed text-inherit font-lato`}
            >
              {children}
            </p>
          ),
          list: ({ children, format }) => {
            switch (format) {
              case "ordered":
                return (
                  <ol
                    className={`list-decimal pl-5 my-3 text-lg text-inherit font-lato`}
                  >
                    {children}
                  </ol>
                );
              case "unordered":
                return (
                  <ul
                    className={`list-disc pl-5 my-3 text-base text-inherit font-lato`}
                  >
                    {children}
                  </ul>
                );
              default:
                return (
                  <ul
                    className={`list-disc pl-5 my-3 text-base text-inherit font-lato`}
                  >
                    {children}
                  </ul>
                );
            }
          },
        }}
      />
    </div>
  );
};

export default BlocksRender;
