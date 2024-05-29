import React from "react";

import Image from "next/image";
import { Montserrat, Poppins } from "next/font/google";
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
type Props = {};

const page = (props: Props) => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-start">
      <div className="font-semibold px-2 p-12 lg:!py-16">
        <h1
          className={`${montserrat.className} text-[3rem] above-480:text-[3.8rem] sm:!text-[4.4rem] lg:!text-[5.5rem] text-center`}
        >
          About Us
        </h1>
      </div>
      <div className="grid sm:grid-cols-2 gap-4 p-8">
        <div className="w-full h-[30rem] bg-red-900">
          <Image
            width={5000}
            className="w-full h-full object-cover"
            height={5000}
            src={"/photo-1.avif"}
            alt={""}
          />
        </div>
        <div className="p-4 py-12 w-full gap-4 flex flex-col justify-center items-start">
          <h5
            className={`${montserrat.className}  text-4xl md:text-6xl font-semibold`}
          >
            Get to know the possibilities
          </h5>
          <p className={`text-gray-600 ${poppins.className}`}>
            Welcome to Fly Travel, where innovation meets excellence. Our
            mission is to unlock the potential within every project, pushing the
            boundaries of what`s possible. With a passion for creativity and a
            commitment to quality, we strive to deliver outstanding results that
            exceed expectations.
          </p>
          <p className={`text-gray-600 ${poppins.className}`}>
            Explore the possibilities with us and discover how we can make a
            difference together. Join us on this journey of growth, creativity,
            and success.
          </p>
        </div>
      </div>
    </main>
  );
};

export default page;
