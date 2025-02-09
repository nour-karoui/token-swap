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

  const { data: hash, writeContract, error } = useWriteContract();

  const approve = (amount: bigint) => {
    const res = writeContract({
      ...TokenContractConfig,
      address: address,
      functionName: "approve",
      args: [TokenSwapContractConfig.address, amount],
    });
    console.log(res, hash);
    console.log(error);
  };

  return { name: tokenAName, approve, hash };
};
