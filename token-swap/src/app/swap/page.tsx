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
import { useSwapTokens } from "@/hooks/useTokenSwap";
import { useToken } from "@/hooks/useToken";
import { useAccount, useReadContract } from "wagmi";
import MainLayout from "../layouts/MainLayout";

interface TokenState {
  name: string | undefined;
  amount: bigint;
  selectedAmount: bigint;
}

export default function SwapPage() {
  // Token A Hooks
  const {
    name: tokenAName,
    approve: approveTokenA,
    error: approveTokenAError,
    isPending: approveALoading,
    isSuccess: approveTokenASuccess,
    data: approveTokenAHash,
  } = useToken(TokenAAddress);

  // Swap Hooks
  const {
    swap,
    isPending: isSwapLoading,
    isSuccess: swapSuccessful,
    error: swapError,
    data: swapHash,
  } = useSwapTokens();

  // Token B Hooks
  const { name: tokenBName, approve: approveTokenB } = useToken(TokenBAddress);

  // Balance Hooks
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

  const { address: userAddress } = useAccount();

  // State
  const [tokenA, setTokenA] = useState<TokenState>({
    name: tokenAName as string,
    amount: tokenABalance as bigint,
    selectedAmount: BigInt(0),
  });

  const [tokenB, setTokenB] = useState<TokenState>({
    name: tokenBName as string,
    amount: tokenBBalance as bigint,
    selectedAmount: BigInt(0),
  });

  // user balance
  const { data: userTokenABalance } = useReadContract({
    ...TokenContractConfig,
    address: TokenAAddress,
    functionName: "balanceOf",
    args: [userAddress],
  });
  const { data: userTokenBBalance } = useReadContract({
    ...TokenContractConfig,
    address: TokenBAddress,
    functionName: "balanceOf",
    args: [userAddress],
  });

  // Effects
  useEffect(() => {
    if (tokenAName && tokenABalance) {
      setTokenA((prev) => ({
        ...prev,
        name: tokenAName as string,
        amount: tokenABalance as bigint,
      }));
    }
  }, [tokenAName, tokenABalance]);

  useEffect(() => {
    if (tokenBName && tokenBBalance) {
      setTokenB((prev) => ({
        ...prev,
        name: tokenBName as string,
        amount: tokenBBalance as bigint,
      }));
    }
  }, [tokenBName, tokenBBalance]);

  // Handlers
  const switchTokens = () => {
    setTokenA(tokenB);
    setTokenB(tokenA);
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

  const handleApprove = () => {
    if (tokenA.name === tokenAName) {
      approveTokenA(tokenA.selectedAmount);
    } else {
      approveTokenB(tokenA.selectedAmount);
    }
  };

  const handleSwap = () => {
    swap(tokenA.selectedAmount, tokenA.name === tokenAName);
  };

  // Format balance for display
  const formatBalance = (balance: bigint) => {
    if (balance)
      return balance.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-6 space-y-8">
            <h1 className="text-2xl font-bold text-center text-gray-900">
              Swap Tokens
            </h1>

            <div className="space-y-6">
              {/* Token A Input */}
              <div className="relative">
                <Input
                  label={tokenA.name || "Token A"}
                  value={tokenA.selectedAmount.toString()}
                  onChange={(event) => {
                    try {
                      handleTokenChange(
                        BigInt(event.target.value || "0"),
                        true
                      );
                    } catch (error) {
                      console.error("Invalid input value:", error);
                    }
                  }}
                  helperText={`Pool Balance: ${formatBalance(
                    tokenA.amount
                  )} / Your Balance: ${formatBalance(
                    userTokenABalance as bigint
                  )}`}
                />
                <Button
                  text="Approve"
                  isLoading={approveALoading}
                  onClick={handleApprove}
                  disabled={tokenA.selectedAmount === BigInt(0)}
                  variant="outline"
                  size="sm"
                  className="mt-2"
                />
              </div>

              {/* Switch Button */}
              <div className="flex justify-center">
                <button
                  onClick={switchTokens}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <GoArrowSwitch
                    size={32}
                    className="text-blue-600 transform transition-transform hover:rotate-180"
                  />
                </button>
              </div>

              {/* Token B Input */}
              <Input
                label={tokenB.name || "Token B"}
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
                helperText={`Pool Balance: ${formatBalance(
                  tokenB.amount
                )} / Your Balance: ${formatBalance(
                  userTokenBBalance as bigint
                )}`}
              />

              {/* Swap Button */}
              <Button
                text="Swap Tokens"
                isLoading={isSwapLoading}
                onClick={handleSwap}
                disabled={tokenA.selectedAmount === BigInt(0)}
                className="w-full"
                size="lg"
              />
            </div>

            {/* Status Messages */}
            <div className="space-y-2">
              {approveTokenASuccess && (
                <div className="p-4 rounded-lg bg-green-50 text-green-700 text-sm">
                  Token {tokenA.name} approval successful
                  <div className="text-xs mt-1 text-green-600 truncate">
                    Hash: {approveTokenAHash}
                  </div>
                </div>
              )}

              {approveTokenAError && (
                <div className="p-4 rounded-lg bg-red-50 text-red-700 text-sm">
                  Failed to approve {tokenA.name}
                  <div className="text-xs mt-1 text-red-600">
                    {approveTokenAError.message}
                  </div>
                </div>
              )}

              {swapSuccessful && (
                <div className="p-4 rounded-lg bg-green-50 text-green-700 text-sm">
                  Swap successful
                  <div className="text-xs mt-1 text-green-600 truncate">
                    Hash: {swapHash}
                  </div>
                </div>
              )}

              {swapError && (
                <div className="p-4 rounded-lg bg-red-50 text-red-700 text-sm">
                  Swap failed
                  <div className="text-xs mt-1 text-red-600">
                    {swapError.message}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
