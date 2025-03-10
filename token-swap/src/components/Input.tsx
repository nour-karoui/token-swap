"use client";

import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className, ...props }, ref) => {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <div className="relative">
          <input
            {...props}
            ref={ref}
            type={props.type || "text"}
            className={cn(
              "w-full px-4 py-2.5 rounded-lg border transition-colors duration-200",
              "text-gray-900 placeholder-gray-400",
              "bg-white border-gray-300",
              "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
              "disabled:bg-gray-50 disabled:text-gray-500 disabled:border-gray-200 disabled:cursor-not-allowed",
              error && "border-red-500 focus:ring-red-500 focus:border-red-500",
              className
            )}
          />
        </div>
        {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
        {helperText && !error && (
          <p className="text-sm text-gray-500 mt-1">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
