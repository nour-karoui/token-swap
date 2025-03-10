import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import { LiquidityAdded, TokensSwapped } from "../generated/TokenSwap/TokenSwap"

export function createLiquidityAddedEvent(
  funder: Address,
  amountA: BigInt,
  amountB: BigInt
): LiquidityAdded {
  let liquidityAddedEvent = changetype<LiquidityAdded>(newMockEvent())

  liquidityAddedEvent.parameters = new Array()

  liquidityAddedEvent.parameters.push(
    new ethereum.EventParam("funder", ethereum.Value.fromAddress(funder))
  )
  liquidityAddedEvent.parameters.push(
    new ethereum.EventParam(
      "amountA",
      ethereum.Value.fromUnsignedBigInt(amountA)
    )
  )
  liquidityAddedEvent.parameters.push(
    new ethereum.EventParam(
      "amountB",
      ethereum.Value.fromUnsignedBigInt(amountB)
    )
  )

  return liquidityAddedEvent
}

export function createTokensSwappedEvent(
  swapper: Address,
  amount: BigInt,
  aTob: boolean,
  amountA: BigInt,
  amountB: BigInt
): TokensSwapped {
  let tokensSwappedEvent = changetype<TokensSwapped>(newMockEvent())

  tokensSwappedEvent.parameters = new Array()

  tokensSwappedEvent.parameters.push(
    new ethereum.EventParam("swapper", ethereum.Value.fromAddress(swapper))
  )
  tokensSwappedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  tokensSwappedEvent.parameters.push(
    new ethereum.EventParam("aTob", ethereum.Value.fromBoolean(aTob))
  )
  tokensSwappedEvent.parameters.push(
    new ethereum.EventParam(
      "amountA",
      ethereum.Value.fromUnsignedBigInt(amountA)
    )
  )
  tokensSwappedEvent.parameters.push(
    new ethereum.EventParam(
      "amountB",
      ethereum.Value.fromUnsignedBigInt(amountB)
    )
  )

  return tokensSwappedEvent
}
