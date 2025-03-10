"use client";

import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  isLoading?: boolean;
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = ({
  text,
  isLoading = false,
  variant = "default",
  size = "md",
  className,
  ...buttonProps
}: ButtonProps) => {
  const baseStyles =
    "relative font-medium rounded-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed";

  const variants = {
    default:
      "bg-blue-600 text-white hover:bg-blue-700 border border-transparent",
    outline:
      "border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white",
    ghost: "text-blue-600 hover:bg-blue-50 border-transparent",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm min-w-[80px]",
    md: "px-5 py-2.5 text-base min-w-[100px]",
    lg: "px-6 py-3 text-lg min-w-[120px]",
  };

  return (
    <button
      {...buttonProps}
      type="button"
      disabled={isLoading || buttonProps.disabled}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
    >
      {isLoading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        </div>
      ) : null}
      <span className={cn(isLoading && "invisible")}>{text}</span>
    </button>
  );
};
