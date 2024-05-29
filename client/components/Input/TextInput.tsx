import React from "react";

type Props = {
  label: string;
  placeholder: string;
  type?: string;
};

const TextInput = ({label, placeholder, type = "text"}: Props) => {
  return (
    <div className="flex flex-col gap-1 col-span-2 sm:col-span-1">
      <label className="text-gray-700">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="outline-none py-3 px-4 text-lg border-2 border-black focus-within:border-gray-500 transition-all"
      />
    </div>
  );
};

export default TextInput;