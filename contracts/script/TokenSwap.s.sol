// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console} from "forge-std/Script.sol";
import {TokenSwap} from "../src/TokenSwap.sol";
import {Token} from "../src/Token.sol";

contract CounterScript is Script {
    TokenSwap public tokenSwap;
    Token public tokenA;
    Token public tokenB;
    function setUp() public {}

    function run() public {
        vm.startBroadcast();
        tokenA = new Token("TokenA", "TKA");
        tokenB = new Token("TokenB", "TKB");
        tokenSwap = new TokenSwap(address(tokenA), address(tokenB));

        vm.stopBroadcast();
    }
}
