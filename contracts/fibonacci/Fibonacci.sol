// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Fibonacci {
    uint256 public result;

    function compute(uint32 n) public returns (uint256) {
        result = fib(n);
        return result;
    }

    function fib(uint32 n) internal pure returns (uint256) {
        if (n <= 1) return n;
        uint256 a = 0;
        uint256 b = 1;
        for (uint32 i = 2; i <= n; i++) {
            uint256 temp = b;
            b = a + b;
            a = temp;
        }
        return b;
    }

    function benchmark(uint32 n) public returns (uint256) {
        return compute(n);
    }
}
