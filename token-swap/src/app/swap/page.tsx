"use client";

import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { useEffect, useState } from "react";
import { GoArrowSwitch } from "react-icons/go";
import {
  TokenAAddress,
  TokenBAddress,
  TokenContractConfig,
  TokenSwapContractConfig,
} from "@/config/contract";
import { useTokenSwap } from "@/hooks/useTokenSwap";
import { useToken } from "@/hooks/useToken";
import { useReadContract } from "wagmi";

export default function Page() {
  const { swap } = useTokenSwap();

  const { name: tokenAName, approve: approveTokenA } = useToken(TokenAAddress);
  const { name: tokenBName, approve: approveTokenB } = useToken(TokenBAddress);
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

  const doApprove = () => {
    if (tokenA.name === tokenAName) approveTokenA(tokenA.selectedAmount);
    else approveTokenB(tokenA.selectedAmount);
  };

  const [tokenA, setTokenA] = useState({
    name: tokenAName,
    amount: tokenABalance as bigint,
    selectedAmount: BigInt(0),
  });
  const [tokenB, setTokenB] = useState({
    name: tokenBName,
    amount: tokenBBalance as bigint,
    selectedAmount: BigInt(0),
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

  const switchTokens = () => {
    const token = tokenA;
    setTokenA(tokenB);
    setTokenB(token);
  };

  const handleTokenChange = (value: bigint, aTob: boolean) => {
    if (aTob) {
      setTokenA((prev) => ({ ...prev, selectedAmount: value }));
      setTokenB((prev) => ({
        ...prev,
        selectedAmount: (value * prev.amount) / tokenA.amount,
      }));
    } else {
      setTokenB((prev) => ({ ...prev, selectedAmount: value }));
      setTokenA((prev) => ({
        ...prev,
        selectedAmount: (value * prev.amount) / tokenB.amount,
      }));
    }
  };

  const handleSwap = () => {
    swap(tokenA.selectedAmount, tokenA.name === tokenAName);
  };

  return (
    <>
      <div className="flex justify-between items-center w-full px-8 py-4">
        <div className="flex flex-col w-1/3">
          <Input
            label={tokenA.name as string}
            value={tokenA.selectedAmount.toString()}
            onChange={(event) =>
              handleTokenChange(BigInt(event.target.value), true)
            }
          />
          <span className="text-sm text-gray-500">
            Balance: {tokenA.amount}
          </span>
          <Button
            onClick={doApprove}
            text="approve"
            disabled={tokenA.selectedAmount === BigInt(0)}
          />
        </div>

        {/* Switch Button */}
        <button onClick={switchTokens}>
          <GoArrowSwitch
            size={50}
            className="mt-4 text-[#007bff] hover:cursor-pointer"
          />
        </button>

        <div className="flex flex-col w-1/3 space-y-2">
          <Input
            label={tokenB.name as string}
            value={tokenB.selectedAmount.toString()}
            onChange={(event) => {
              try {
                const value =
                  event.target.value === ""
                    ? BigInt(0)
                    : BigInt(event.target.value);
                handleTokenChange(value, false);
              } catch (error) {
                console.error("Invalid input value:", error);
              }
            }}
          />
          <span className="text-sm text-gray-500">
            Balance: {tokenB.amount}
          </span>
        </div>
      </div>

      <Button onClick={handleSwap} text="Swap" />
    </>
  );
}
