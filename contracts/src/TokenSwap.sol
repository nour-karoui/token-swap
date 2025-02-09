// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import { ReentrancyGuard } from "openzeppelin-contracts/contracts/utils/ReentrancyGuard.sol";
import { Token } from "./Token.sol";

contract TokenSwap is ReentrancyGuard {
    Token public tokenA;
    Token public tokenB;

    event LiquidityAdded(address funder, uint256 amountA, uint256 amountB);
    event TokensSwapped(address swapper, uint256 amount, bool aTob, uint256 amountA, uint256 amountB);

    event LiquidityAdded(uint256 amountA, uint256 amountB, address user);
    event Swapped(uint256 amount, bool aTob, address user);

    constructor(address _tokenA, address _tokenB) {
        tokenA = Token(_tokenA);
        tokenB = Token(_tokenB);
    }

    function addLiquidity(uint256 amountA, uint256 amountB) public {
        require(tokenA.allowance(msg.sender, address(this)) >= amountA, "Insufficient TokenA allowance");
        require(tokenB.allowance(msg.sender, address(this)) >= amountB, "Insufficient TokenB allowance");
        tokenA.transferFrom(msg.sender, address(this), amountA);
        tokenB.transferFrom(msg.sender, address(this), amountB);
        emit LiquidityAdded(msg.sender, tokenA.balanceOf(address(this)), tokenB.balanceOf(address(this)));
    }

    /**
    * @dev Swaps two tokens for each other
    * @param amount The address of the first token that the address holds
    * @param aTob The amount of token2 the user wants to get
     */
     // 100, tru => I give 100 B to get some A
    function swap(uint256 amount, bool aTob) nonReentrant public {
        if (aTob) {
            require(tokenA.allowance(msg.sender, address(this)) >= amount, "Insufficient tokenA allowance");
            require(tokenA.balanceOf(address(this)) > amount, "Insufficient TokenA liquidity");
            // calculate the amount of tokenB the user will get
            uint256 amountOut = amount * tokenB.balanceOf(address(this)) / tokenA.balanceOf(address(this));
            require(tokenB.balanceOf(address(this)) > amountOut, "Insufficient TokenB liquidity");
            tokenA.transferFrom(msg.sender, address(this), amount);
            tokenB.transfer(msg.sender, amountOut);
        } else {
            require(tokenB.allowance(msg.sender, address(this)) >= amount, "Insufficient TokenB allowance");
            require(tokenB.balanceOf(address(this)) > amount, "Insufficient TokenB liquidity");
            // calculate the amount of tokenB the user will get
            uint256 amountOut = amount * tokenA.balanceOf(address(this)) / tokenB.balanceOf(address(this));
            require(tokenA.balanceOf(address(this)) > amountOut, "Insufficient TokenA liquidity");
            tokenB.transferFrom(msg.sender, address(this), amount);
            tokenA.transfer(msg.sender, amountOut);
        }
        emit TokensSwapped(msg.sender, amount, aTob, tokenA.balanceOf(address(this)), tokenB.balanceOf(address(this)));
    }
}