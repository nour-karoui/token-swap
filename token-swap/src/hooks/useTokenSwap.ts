import { TokenSwapContractConfig } from "@/config/contract";
import { useWriteContract } from "wagmi";

export const useTokenSwap = () => {
  const { data: hash, writeContract, error } = useWriteContract();

  const fund = (amountA: bigint, amountB: bigint) => {
    const res = writeContract({
      ...TokenSwapContractConfig,
      functionName: "addLiquidity",
      args: [amountA, amountB],
    });
    console.log(res, hash);
    console.log(error);
  };

  const swap = (amount: bigint, aTob: boolean) => {
    writeContract({
      ...TokenSwapContractConfig,
      functionName: "swap",
      args: [amount, aTob],
    });
  };

  return { fund, hash, swap };
};
