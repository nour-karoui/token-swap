import {
  assert,
  describe,
  test,
  clearStore,
  beforeAll,
  afterAll
} from "matchstick-as/assembly/index"
import { Address, BigInt } from "@graphprotocol/graph-ts"
import { LiquidityAdded } from "../generated/schema"
import { LiquidityAdded as LiquidityAddedEvent } from "../generated/TokenSwap/TokenSwap"
import { handleLiquidityAdded } from "../src/token-swap"
import { createLiquidityAddedEvent } from "./token-swap-utils"

// Tests structure (matchstick-as >=0.5.0)
// https://thegraph.com/docs/en/developer/matchstick/#tests-structure-0-5-0

describe("Describe entity assertions", () => {
  beforeAll(() => {
    let funder = Address.fromString(
      "0x0000000000000000000000000000000000000001"
    )
    let amountA = BigInt.fromI32(234)
    let amountB = BigInt.fromI32(234)
    let newLiquidityAddedEvent = createLiquidityAddedEvent(
      funder,
      amountA,
      amountB
    )
    handleLiquidityAdded(newLiquidityAddedEvent)
  })

  afterAll(() => {
    clearStore()
  })

  // For more test scenarios, see:
  // https://thegraph.com/docs/en/developer/matchstick/#write-a-unit-test

  test("LiquidityAdded created and stored", () => {
    assert.entityCount("LiquidityAdded", 1)

    // 0xa16081f360e3847006db660bae1c6d1b2e17ec2a is the default address used in newMockEvent() function
    assert.fieldEquals(
      "LiquidityAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "funder",
      "0x0000000000000000000000000000000000000001"
    )
    assert.fieldEquals(
      "LiquidityAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "amountA",
      "234"
    )
    assert.fieldEquals(
      "LiquidityAdded",
      "0xa16081f360e3847006db660bae1c6d1b2e17ec2a-1",
      "amountB",
      "234"
    )

    // More assert options:
    // https://thegraph.com/docs/en/developer/matchstick/#asserts
  })
})
