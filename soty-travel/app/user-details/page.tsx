/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

type Props = {};

const page = (props: Props) => {
  const router = useRouter();

  useEffect(() => {
    router.push("/");
  }, [router]);
  return <div></div>;
};

export default page;
