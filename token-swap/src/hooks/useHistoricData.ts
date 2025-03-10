export const useHistoricData = () => {
    
  const fetchLiquidityAdditions = async () => {
    const result = await (
      await fetch(
        // TODO: add this to .env file
        "https://subgraph.satsuma-prod.com/d46970b3fd7f/nours-team--280818/token-swap/api",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: `
            query {
                liquidityAdditions {
                    amountA
                    amountB
                    funder
                    blockTimestamp
                    transactionHash
                }
            }`,
          }),
        }
      )
    ).json();
    if (!result.data) {
      console.log("something went wrong while fetching liquidity additions");
      return;
    }
    return result.data.liquidityAdditions;
  };

  const fetchSwaps = async () => {
    const result = await (
      await fetch(
        // TODO: add this to .env file
        "https://subgraph.satsuma-prod.com/d46970b3fd7f/nours-team--280818/token-swap/api",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: `
            query {
                swaps {
                    id
                    swapper
                    aTob
                    transactionHash
                    amount
                    amountA
                    amountB
                    blockTimestamp
                }
            }`,
          }),
        }
      )
    ).json();
    if (!result.data) {
      console.log("something went wrong while fetching liquidity additions");
      return;
    }
    return result.data.swaps;
  };
  return { fetchLiquidityAdditions, fetchSwaps };
};
