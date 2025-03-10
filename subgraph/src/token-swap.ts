import {
  LiquidityAdded as LiquidityAddedEvent,
  TokensSwapped as TokensSwappedEvent,
} from "../generated/TokenSwap/TokenSwap";
import { LiquidityAddition, Swap } from "../generated/schema";

export function handleLiquidityAdded(event: LiquidityAddedEvent): void {
  let liquidityAddition = new LiquidityAddition(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  liquidityAddition.funder = event.params.funder;
  liquidityAddition.amountA = event.params.amountA;
  liquidityAddition.amountB = event.params.amountB;

  liquidityAddition.blockNumber = event.block.number;
  liquidityAddition.blockTimestamp = event.block.timestamp;
  liquidityAddition.transactionHash = event.transaction.hash;

  liquidityAddition.save();
}

export function handleTokensSwapped(event: TokensSwappedEvent): void {
  let swap = new Swap(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  );
  swap.swapper = event.params.swapper;
  swap.amount = event.params.amount;
  swap.aTob = event.params.aTob;
  swap.amountA = event.params.amountA;
  swap.amountB = event.params.amountB;

  swap.blockNumber = event.block.number;
  swap.blockTimestamp = event.block.timestamp;
  swap.transactionHash = event.transaction.hash;

  swap.save();
}
