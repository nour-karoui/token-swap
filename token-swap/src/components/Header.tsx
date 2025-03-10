// components/Header.tsx
"use client";

import Link from "next/link";
import { ConnectWallet } from "./WalletConnect";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export const Header = () => {
  const pathname = usePathname();

  const NavLink = ({
    href,
    children,
  }: {
    href: string;
    children: React.ReactNode;
  }) => {
    const isActive = pathname === href;

    return (
      <Link
        href={href}
        className={cn(
          "px-4 py-2 text-sm rounded-full font-bold transition-all duration-300",
          "border-2 border-blue-600",
          isActive
            ? "bg-blue-600 text-white hover:bg-blue-700 hover:border-blue-700"
            : "bg-white text-blue-600 hover:bg-blue-600 hover:text-white"
        )}
      >
        {children}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto">
        <div className="flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Link href="/" className="text-xl font-bold text-blue-600">
              Token Swap
            </Link>
          </div>

          <nav className="flex items-center gap-4">
            <ConnectWallet />
            <NavLink href="/fund">Fund</NavLink>
            <NavLink href="/swap">Swap</NavLink>
          </nav>
        </div>
      </div>
    </header>
  );
};
