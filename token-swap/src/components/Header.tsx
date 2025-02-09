"use client";

import { ConnectWallet } from "./WalletConnect";

export const Header = () => (
  <header className="flex shadow-md py-4 px-4 sm:px-10 bg-white font-[sans-serif] min-h-[70px] tracking-wide relative z-50">
    <div className="flex flex-wrap items-center justify-between gap-5 w-full">
      <div className="flex max-lg:ml-auto space-x-4">
        <ConnectWallet></ConnectWallet>
        <a
          href="/fund"
          className="px-4 py-2 text-sm rounded-full font-bold text-[#007bff] border-2 border-[#007bff] bg-white hover:bg-[#007bff] hover:text-white transition-all ease-in-out duration-300"
        >
          Fund
        </a>
        <a
          href="/swap"
          className="px-4 py-2 text-sm rounded-full font-bold text-white border-2 border-[#007bff] bg-[#007bff] transition-all ease-in-out duration-300 hover:bg-transparent hover:text-[#007bff]"
        >
          Swap
        </a>
      </div>
    </div>
  </header>
);
