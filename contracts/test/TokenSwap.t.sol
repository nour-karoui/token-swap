// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.26;

import {Test, console} from "forge-std/Test.sol";
import {TokenSwap} from "../src/TokenSwap.sol";
import {Token} from "../src/Token.sol";

contract TokenSwapTest is Test {
    TokenSwap public tokenSwap;
    Token public tokenA;
    Token public tokenB;
    address alice = makeAddr("alice");
    address bob = makeAddr("bob");

    function setUp() public {
        vm.startPrank(alice);
        tokenA = new Token("TokenA", "TKA");

        tokenB = new Token("TokenB", "TKB");

        tokenSwap = new TokenSwap(address(tokenA), address(tokenB));

        vm.stopPrank();  
    }

    function test_CanAddLiquidity() public {
        vm.startPrank(alice);

        tokenA.approve(address(tokenSwap), 100);
        tokenB.approve(address(tokenSwap), 100);

        tokenSwap.addLiquidity(100, 100);
        assertEq(tokenA.balanceOf(address(tokenSwap)), 100);
        assertEq(tokenB.balanceOf(address(tokenSwap)), 100);
        vm.stopPrank();
    }

    function test_CannotAddLiquidityWithoutApproval() public {
        vm.startPrank(bob);
        tokenA.mint(bob, 1000);
        tokenB.mint(bob, 1000);

        vm.expectRevert("Insufficient TokenA allowance");
        tokenSwap.addLiquidity(100, 100);

        tokenA.approve(address(tokenSwap), 100);

        vm.expectRevert("Insufficient TokenB allowance");
        tokenSwap.addLiquidity(100, 100);

        vm.stopPrank();
    }

    function test_canSwap() public {
        vm.startPrank(alice);
        tokenA.approve(address(tokenSwap), 100);
        tokenB.approve(address(tokenSwap), 100);

        tokenSwap.addLiquidity(100, 100);

        tokenA.approve(address(tokenSwap), 50);

        vm.expectRevert("Insufficient tokenA allowance");
        tokenSwap.swap(100, true);

        tokenA.approve(address(tokenSwap), 100);

        vm.expectRevert("Insufficient TokenA liquidity");
        tokenSwap.swap(100, true);

        tokenSwap.swap(50, true);

        vm.assertEq(tokenA.balanceOf(address(tokenSwap)), 150);
        vm.assertEq(tokenB.balanceOf(address(tokenSwap)), 50);

        tokenSwap.swap(50, true);
        vm.assertEq(tokenA.balanceOf(address(tokenSwap)), 200);
        vm.assertEq(tokenB.balanceOf(address(tokenSwap)), 34);

        tokenB.approve(address(tokenSwap), 50);
        tokenSwap.swap(10, false);
        vm.assertEq(tokenA.balanceOf(address(tokenSwap)), 142);
        vm.assertEq(tokenB.balanceOf(address(tokenSwap)), 44);
        vm.stopPrank();
    }
}
