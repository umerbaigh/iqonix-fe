"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (newSearchParams.get("page")) {
      router.push(newSearchParams.get("page"));
    } else {
      router.push("/404");
    }
  }, []);
  return <div></div>;
};

export default Page;
