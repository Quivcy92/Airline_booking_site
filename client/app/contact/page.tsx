import React from "react";
import {  Poppins } from "next/font/google";
import TextInput from "@/components/Input/TextInput";
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
type Props = {};

const page = (props: Props) => {
  const handleInputChange = (e: any) => {};
  return (
    <main className={`flex p-4 pt-8 pb-14 lg:pb-20 lg:pt-14 lg:p-8 flex-col gap-8 ${poppins.className}`}>
      <div className="font-semibold px-2 p-12 lg:!py-16">
        <h1 className="text-[3rem] above-480:text-[3.8rem] sm:!text-[4.4rem] lg:!text-[5.5rem] text-center">
          Contact Us
        </h1>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex gap-2 ">
          <h2 className="above-480:text-4xl  text-2xl">Write a Message</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-8">
          <TextInput
            label="Name"
            placeholder="Name"
            
          />
          <TextInput
            label="Email"
            placeholder="Email" 
            
          />
          <TextInput
            label="Phone Number"
            placeholder="Phone Number"
          
            type="tel"
          />
          <TextInput
            label="Subject"
            placeholder="Subject"
           
          />

          <div className="flex flex-col gap-1 col-span-2 ">
            <label className="text-gray-700">Message</label>
            <textarea
              rows={6}
              cols={10}
              placeholder="Message"
              className="outline-none py-3 px-4 text-lg border-2 border-black focus-within:border-gray-500 transition-all"
            />
          </div>
        </div>
        <div className="flex justify-start items-center">
          <button className="p-3 px-6 bg-black text-white border-2 border-black hover:bg-white hover:text-black transition-all font-semibold">
            Submit
          </button>
        </div>
      </div>
    </main>
  );
};

export default page;
