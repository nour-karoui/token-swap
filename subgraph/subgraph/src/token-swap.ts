import {
  LiquidityAdded as LiquidityAddedEvent,
  LiquidityAdded1 as LiquidityAdded1Event,
  Swapped as SwappedEvent,
  TokensSwapped as TokensSwappedEvent
} from "../generated/TokenSwap/TokenSwap"
import {
  LiquidityAdded,
  LiquidityAdded1,
  Swapped,
  TokensSwapped
} from "../generated/schema"

export function handleLiquidityAdded(event: LiquidityAddedEvent): void {
  let entity = new LiquidityAdded(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.funder = event.params.funder
  entity.amountA = event.params.amountA
  entity.amountB = event.params.amountB

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleLiquidityAdded1(event: LiquidityAdded1Event): void {
  let entity = new LiquidityAdded1(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.amountA = event.params.amountA
  entity.amountB = event.params.amountB
  entity.user = event.params.user

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleSwapped(event: SwappedEvent): void {
  let entity = new Swapped(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.amount = event.params.amount
  entity.aTob = event.params.aTob
  entity.user = event.params.user

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTokensSwapped(event: TokensSwappedEvent): void {
  let entity = new TokensSwapped(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.swapper = event.params.swapper
  entity.amount = event.params.amount
  entity.aTob = event.params.aTob
  entity.amountA = event.params.amountA
  entity.amountB = event.params.amountB

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
