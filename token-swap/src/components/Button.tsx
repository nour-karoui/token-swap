"use client";

import { ButtonHTMLAttributes } from "react";

export const Button = (
  props: {
    text: string;
  } & ButtonHTMLAttributes<HTMLButtonElement>
) => {
  const { text, ...buttonProps } = props;
  return (
    <div className="font-[sans-serif] space-x-4 space-y-4 text-center mt-2">
      <button
        {...buttonProps}
        type="button"
        className="px-5 py-2.5 rounded-lg text-sm tracking-wider font-medium border text-[#007bff] outline-none bg-transparent hover:bg-[#007bff] disabled:text-white disabled:border-gray-300 disabled:bg-gray-300 disabled:cursor-not-allowed text-[#007bff] hover:text-white transition-all duration-300 hover:cursor-pointer"
      >
        {text}
      </button>
    </div>
  );
};
