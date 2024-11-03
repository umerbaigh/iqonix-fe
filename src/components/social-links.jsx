import Image from "next/image";
import Link from "next/link";

const SocialLinks = ({ data }) => {
  return (
    <div className="flex gap-2">
      {data?.map((social) => (
        <div key={social?.id}>
          <Link href={social?.link} target="_blank">
            <Image
              src={social?.image?.data?.attributes?.url}
              width={30}
              height={30}
              alt="logo"
            />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default SocialLinks;
