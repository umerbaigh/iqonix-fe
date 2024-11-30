"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const newSearchParams = new URLSearchParams(searchParams);
    router.push(newSearchParams.get("page"));
  }, []);
  return <div></div>;
};

export default Page;
