"use client";

import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { useEffect, useState } from "react";
import { TokenAAddress, TokenBAddress, TokenContractConfig, TokenSwapContractConfig } from "@/config/contract";
import { useToken } from "@/hooks/useToken";
import { useTokenSwap } from "@/hooks/useTokenSwap";
import { useReadContract } from "wagmi";

export default function Page() {
  const { fund } = useTokenSwap();

  const { name: tokenAName, approve: approveTokenA } = useToken(TokenAAddress);
  const { name: tokenBName, approve: approveTokenB } = useToken(TokenBAddress);

  const [tokenA, setTokenA] = useState({
    name: tokenAName,
    amount: BigInt(500),
    selectedAmount: BigInt(0),
  });
  const [tokenB, setTokenB] = useState({
    name: tokenBName,
    amount: BigInt(1000),
    selectedAmount: BigInt(0),
  });
  const { data: tokenABalance } = useReadContract({
    ...TokenContractConfig,
    address: TokenAAddress,
    functionName: "balanceOf",
    args: [TokenSwapContractConfig.address],
  });
  const { data: tokenBBalance } = useReadContract({
    ...TokenContractConfig,
    address: TokenBAddress,
    functionName: "balanceOf",
    args: [TokenSwapContractConfig.address],
  });

  // Update state when data becomes available
  useEffect(() => {
    if (tokenAName && tokenABalance) {
      setTokenA((prev) => ({
        ...prev,
        name: tokenAName,
        amount: tokenABalance as bigint,
      }));
    }
  }, [tokenAName, tokenABalance]);

  useEffect(() => {
    if (tokenBName && tokenBBalance) {
      setTokenB((prev) => ({
        ...prev,
        name: tokenBName,
        amount: tokenBBalance as bigint,
      }));
    }
  }, [tokenBName, tokenBBalance]);

  const doApproveTokenA = () => {
    approveTokenA(BigInt(tokenA.selectedAmount));
  };

  const doApproveTokenB = () => {
    approveTokenB(BigInt(tokenB.selectedAmount));
  };

  const fundPool = () => {
    fund(tokenA.selectedAmount, tokenB.selectedAmount);
  };

  return (
    <>
      <div className="flex justify-between items-center w-full px-8 py-4">
        <div className="flex flex-col w-1/3">
          <Input
            label={tokenA.name as string}
            value={tokenA.selectedAmount.toString()}
            onChange={(event) =>
              setTokenA((prev) => ({
                ...prev,
                selectedAmount: BigInt(event.target.value),
              }))
            }
          />
          <Button
            text="approve"
            onClick={doApproveTokenA}
            disabled={tokenA.selectedAmount === BigInt(0)}
          />
        </div>

        <div className="flex flex-col w-1/3">
          <Input
            label={tokenB.name as string}
            value={tokenB.selectedAmount.toString()}
            onChange={(event) =>
              setTokenB((prev) => ({
                ...prev,
                selectedAmount: BigInt(event.target.value),
              }))
            }
          />
          <Button
            text="approve"
            disabled={tokenB.selectedAmount === BigInt(0)}
            onClick={doApproveTokenB}
          />
        </div>
      </div>

      <Button onClick={fundPool} text="Fund" />
    </>
  );
}
