import { TokenSwapContractConfig } from "@/config/contract";
import { useWriteContract } from "wagmi";

export const useSwapTokens = () => {
  const { data, writeContract, error, isPending, isSuccess } =
    useWriteContract();

  const swap = (amount: bigint, aTob: boolean) => {
    writeContract({
      ...TokenSwapContractConfig,
      functionName: "swap",
      args: [amount, aTob],
    });
  };

  return {
    isPending,
    isSuccess,
    data,
    error,
    swap,
  };
};

export const useFundLiquidity = () => {
  const {
    data,
    writeContract,
    error,
    isSuccess,
    isPending,
  } = useWriteContract();

  const fund = (amountA: bigint, amountB: bigint) => {
    writeContract({
      ...TokenSwapContractConfig,
      functionName: "addLiquidity",
      args: [amountA, amountB],
    });
  };

  return {
    fund,
    data,
    error,
    isPending,
    isSuccess,
  };
};
