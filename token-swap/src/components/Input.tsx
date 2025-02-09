"use client";

import { InputHTMLAttributes } from "react";

export const Input: React.FC<{ label: string } & InputHTMLAttributes<HTMLInputElement>> = (
  props: {
    label: string;
  } & InputHTMLAttributes<HTMLInputElement>
) => {
  const { label, ...inputProps } = props;
  return (
    <div>
      <label className="mb-2 text-lg block">{label}</label>
      <input
        {...inputProps}
        type="number"
        placeholder="Large Input"
        className="px-4 py-2.5 text-lg rounded-md bg-white border border-gray-400 w-full outline-blue-500"
      />
    </div>
  );
};
