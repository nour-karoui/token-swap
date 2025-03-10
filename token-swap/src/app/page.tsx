/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useHistoricData } from "@/hooks/useHistoricData";
import MainLayout from "./layouts/MainLayout";
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";

export default function Home() {
  const { fetchLiquidityAdditions, fetchSwaps } = useHistoricData();
  const [liquidities, setLiquidities] = useState();
  const [swaps, setSwaps] = useState();
  const [activeTab, setActiveTab] = useState("liquidity");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (liquidities) {
      return;
    }
    const fetchLiquidity = async () => {
      try {
        const liquidity = await fetchLiquidityAdditions();
        setLiquidities(liquidity);
      } catch (error) {
        console.error("Error fetching liquidity data:", error);
      }
    };
    fetchLiquidity();
  }, [fetchLiquidityAdditions, liquidities]);

  useEffect(() => {
    if (swaps) {
      return;
    }
    const fetchAllSwaps = async () => {
      try {
        const swapList = await fetchSwaps();
        setSwaps(swapList);
      } catch (error) {
        console.error("Error fetching swaps data:", error);
      }
    };
    fetchAllSwaps();
  }, [fetchSwaps, swaps]);

  useEffect(() => {
    if (liquidities && swaps) {
      setIsLoading(false);
    }
  }, [liquidities, swaps]);

  const formatTimestamp = (timestamp: string) => {
    if (!timestamp) return "Unknown";
    const date = new Date(parseInt(timestamp) * 1000);
    return formatDistanceToNow(date, { addSuffix: true });
  };

  const truncateString = (str: string, startLength = 6, endLength = 4) => {
    if (!str) return "";
    return `${str.substring(0, startLength)}...${str.substring(
      str.length - endLength
    )}`;
  };

  return (
    <MainLayout>
      <div className="flex flex-col min-h-[calc(100vh-4rem)] px-4 py-8 max-w-7xl mx-auto w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Token Swap Dashboard
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            View liquidity additions and token swaps on our decentralized
            platform.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="w-full">
            {/* Tab Navigation */}
            <div className="border-b border-gray-200 mb-6">
              <nav className="flex space-x-8">
                <button
                  onClick={() => setActiveTab("liquidity")}
                  className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "liquidity"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Liquidity Additions
                </button>
                <button
                  onClick={() => setActiveTab("swaps")}
                  className={`pb-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === "swaps"
                      ? "border-blue-500 text-blue-600"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  }`}
                >
                  Token Swaps
                </button>
              </nav>
            </div>

            {/* Liquidity Tab Content */}
            {activeTab === "liquidity" && (
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Funder
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Token A
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Token B
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Time
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Transaction
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {liquidities &&
                        // @ts-expect-error this works
                        liquidities.map((liquidity: any, index: number) => (
                          <tr key={`${liquidity.transactionHash}-${index}`}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {truncateString(liquidity.funder)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {liquidity.amountA}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {liquidity.amountB}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatTimestamp(liquidity.blockTimestamp)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-500 hover:underline">
                              <a
                                href={`https://sepolia.basescan.org/tx/${liquidity.transactionHash}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {truncateString(liquidity.transactionHash)}
                              </a>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Swaps Tab Content */}
            {activeTab === "swaps" && (
              <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Swapper
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Direction
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Amount
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Time
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Transaction
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {/* @ts-expect-error this works */}
                      {swaps && swaps.map((swap: any) => (
                          <tr key={swap.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {truncateString(swap.swapper)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span
                                className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                  swap.aTob
                                    ? "bg-green-100 text-green-800"
                                    : "bg-purple-100 text-purple-800"
                                }`}
                              >
                                {swap.aTob ? "A → B" : "B → A"}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {swap.amount}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {formatTimestamp(swap.blockTimestamp)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-500 hover:underline">
                              <a
                                href={`https://sepolia.basescan.org/tx/${swap.transactionHash}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {truncateString(swap.transactionHash)}
                              </a>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
