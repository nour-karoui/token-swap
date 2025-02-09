import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  LiquidityAdded,
  LiquidityAdded1,
  Swapped,
  TokensSwapped
} from "../generated/TokenSwap/TokenSwap"

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

export function createLiquidityAdded1Event(
  amountA: BigInt,
  amountB: BigInt,
  user: Address
): LiquidityAdded1 {
  let liquidityAdded1Event = changetype<LiquidityAdded1>(newMockEvent())

  liquidityAdded1Event.parameters = new Array()

  liquidityAdded1Event.parameters.push(
    new ethereum.EventParam(
      "amountA",
      ethereum.Value.fromUnsignedBigInt(amountA)
    )
  )
  liquidityAdded1Event.parameters.push(
    new ethereum.EventParam(
      "amountB",
      ethereum.Value.fromUnsignedBigInt(amountB)
    )
  )
  liquidityAdded1Event.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )

  return liquidityAdded1Event
}

export function createSwappedEvent(
  amount: BigInt,
  aTob: boolean,
  user: Address
): Swapped {
  let swappedEvent = changetype<Swapped>(newMockEvent())

  swappedEvent.parameters = new Array()

  swappedEvent.parameters.push(
    new ethereum.EventParam("amount", ethereum.Value.fromUnsignedBigInt(amount))
  )
  swappedEvent.parameters.push(
    new ethereum.EventParam("aTob", ethereum.Value.fromBoolean(aTob))
  )
  swappedEvent.parameters.push(
    new ethereum.EventParam("user", ethereum.Value.fromAddress(user))
  )

  return swappedEvent
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
