// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import {AggregatorV3Interface} from "@foundry-chainlink-toolkit/src/interfaces/feeds/AggregatorV3Interface.sol";

contract TokenSwap {

    /**
    * @dev Swaps two tokens for each other
    * @param token1 The address of the first token that the address holds
    * @param token2 The address of the second token that the address want to hold
    * @param amountToken1 The amount of token1 the user wants to swap for
    * @param amountToken2 The amount of token2 the user wants to get
     */
    function swap(address token1, address token2, uint256 amountToken1, uint256 amountToken2) payable public {
        // use an oracle that will fetch the amount of token1 compared to token2

        // and check if the amount of token1 is enough to swap for the amount of token2
        // also take into consideration that the user has to approve the token transfer before calling this function

        // if the user has approved enough balance, then retrieve the ERC20 contract and make the two transfers
    }
}