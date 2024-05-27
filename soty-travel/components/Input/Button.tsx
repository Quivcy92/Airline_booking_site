"use client";
import { Spinner } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type Props = {
  id: string;
};

const Button = ({ id }: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  return (
    <button
      onClick={() => {
        setIsLoading(true);
        router.push(`/user-details/${id}`);
      }}
      className="p-2 flex h-10 justify-center items-center relative px-12 uppercase text-white text-sm font-semibold rounded-sm hover:bg-orange-400 transition-all bg-orange-500"
    >
      {isLoading ? <Spinner /> : "View"}
    </button>
  );
};

export default Button;
