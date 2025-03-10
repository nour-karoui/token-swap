"use client";

import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { useEffect, useState } from "react";
import {
  TokenAAddress,
  TokenBAddress,
  TokenContractConfig,
  TokenSwapContractConfig,
} from "@/config/contract";
import { useToken } from "@/hooks/useToken";
import { useFundLiquidity } from "@/hooks/useTokenSwap";
import { useAccount, useReadContract } from "wagmi";
import MainLayout from "../layouts/MainLayout";

interface TokenState {
  name: string | undefined;
  amount: bigint;
  selectedAmount: bigint;
}

export default function FundPage() {
  // Funding Hook
  const {
    fund,
    isPending: isFundingLoading,
    isSuccess: fundingSuccessful,
    error: fundingError,
    data: fundHash,
  } = useFundLiquidity();

  // Token A Hooks
  const {
    name: tokenAName,
    approve: approveTokenA,
    error: approveTokenAError,
    isPending: approveALoading,
    isSuccess: approveTokenASuccess,
    data: approveTokenAHash,
  } = useToken(TokenAAddress);

  // Token B Hooks
  const {
    name: tokenBName,
    approve: approveTokenB,
    error: approveTokenBError,
    isPending: approveBLoading,
    isSuccess: approveTokenBSuccess,
    data: approveTokenBHash,
  } = useToken(TokenBAddress);

  const { address: userAddress } = useAccount();

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

  // State
  const [tokenA, setTokenA] = useState<TokenState>({
    name: tokenAName as string,
    amount: (tokenABalance as bigint) || BigInt(0),
    selectedAmount: BigInt(0),
  });

  const [tokenB, setTokenB] = useState<TokenState>({
    name: tokenBName as string,
    amount: (tokenBBalance as bigint) || BigInt(0),
    selectedAmount: BigInt(0),
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
  const handleTokenAChange = (value: string) => {
    try {
      const amount = value === "" ? BigInt(0) : BigInt(value);
      setTokenA((prev) => ({ ...prev, selectedAmount: amount }));
    } catch (error) {
      console.error("Invalid input value:", error);
    }
  };

  const handleTokenBChange = (value: string) => {
    try {
      const amount = value === "" ? BigInt(0) : BigInt(value);
      setTokenB((prev) => ({ ...prev, selectedAmount: amount }));
    } catch (error) {
      console.error("Invalid input value:", error);
    }
  };

  const handleFundPool = () => {
    fund(tokenA.selectedAmount, tokenB.selectedAmount);
  };

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
              Fund Liquidity Pool
            </h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Token A Section */}
              <div className="space-y-4">
                <Input
                  label={tokenA.name || "Token A"}
                  value={tokenA.selectedAmount.toString()}
                  onChange={(e) => handleTokenAChange(e.target.value)}
                  helperText={`Pool Balance: ${formatBalance(
                    tokenA.amount
                  )} / Your Balance: ${formatBalance(
                    userTokenABalance as bigint
                  )}`}
                />
                <Button
                  isLoading={approveALoading}
                  text="Approve Token A"
                  onClick={() => approveTokenA(tokenA.selectedAmount)}
                  disabled={tokenA.selectedAmount === BigInt(0)}
                  variant="outline"
                  size="sm"
                  className="w-full"
                />

                {approveTokenASuccess && (
                  <div className="p-3 rounded-lg bg-green-50 text-green-700 text-sm">
                    Token A approval successful
                    <div className="text-xs mt-1 text-green-600 truncate">
                      Hash: {approveTokenAHash}
                    </div>
                  </div>
                )}

                {approveTokenAError && (
                  <div className="p-3 rounded-lg bg-red-50 text-red-700 text-sm">
                    Failed to approve Token A
                    <div className="text-xs mt-1 text-red-600">
                      {approveTokenAError.message}
                    </div>
                  </div>
                )}
              </div>

              {/* Token B Section */}
              <div className="space-y-4">
                <Input
                  label={tokenB.name || "Token B"}
                  value={tokenB.selectedAmount.toString()}
                  onChange={(e) => handleTokenBChange(e.target.value)}
                  helperText={`Pool Balance: ${formatBalance(
                    tokenB.amount
                  )} / Your Balance: ${formatBalance(
                    userTokenBBalance as bigint
                  )}`}
                />
                <Button
                  isLoading={approveBLoading}
                  text="Approve Token B"
                  onClick={() => approveTokenB(tokenB.selectedAmount)}
                  disabled={tokenB.selectedAmount === BigInt(0)}
                  variant="outline"
                  size="sm"
                  className="w-full"
                />

                {approveTokenBSuccess && (
                  <div className="p-3 rounded-lg bg-green-50 text-green-700 text-sm">
                    Token B approval successful
                    <div className="text-xs mt-1 text-green-600 truncate">
                      Hash: {approveTokenBHash}
                    </div>
                  </div>
                )}

                {approveTokenBError && (
                  <div className="p-3 rounded-lg bg-red-50 text-red-700 text-sm">
                    Failed to approve Token B
                    <div className="text-xs mt-1 text-red-600">
                      {approveTokenBError.message}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Fund Button */}
            <div className="pt-4">
              <Button
                isLoading={isFundingLoading}
                onClick={handleFundPool}
                text="Fund Pool"
                size="lg"
                className="w-full"
                disabled={
                  tokenA.selectedAmount === BigInt(0) &&
                  tokenB.selectedAmount === BigInt(0)
                }
              />
            </div>

            {/* Funding Status */}
            {fundingSuccessful && (
              <div className="p-4 rounded-lg bg-green-50 text-green-700 text-sm">
                Funding successful
                <div className="text-xs mt-1 text-green-600 truncate">
                  Hash: {fundHash}
                </div>
              </div>
            )}

            {fundingError && (
              <div className="p-4 rounded-lg bg-red-50 text-red-700 text-sm">
                Funding failed
                <div className="text-xs mt-1 text-red-600">
                  {fundingError.message}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
