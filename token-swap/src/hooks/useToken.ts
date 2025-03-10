import {
  TokenContractConfig,
  TokenSwapContractConfig,
} from "@/config/contract";

import { Address } from "viem";
import { useReadContract, useWriteContract } from "wagmi";

export const useToken = (address: Address) => {
  const { data: tokenAName } = useReadContract({
    ...TokenContractConfig,
    address: address,
    functionName: "name",
  });

  const { data, writeContract, error, isPending, isSuccess } =
    useWriteContract();

  const approve = (amount: bigint) => {
    writeContract({
      ...TokenContractConfig,
      address: address,
      functionName: "approve",
      args: [TokenSwapContractConfig.address, amount],
    });
  };

  return { name: tokenAName, approve, data, error, isPending, isSuccess };
};
