// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Counter {
    uint256 public count;

    function increment() public {
        count += 1;
    }

    function getCount() public view returns (uint256) {
        return count;
    }

    function setCount(uint256 _value) public {
        count = _value;
    }

    function decrement() public {
        require(count > 0, "Underflow");
        count -= 1;
    }
}
