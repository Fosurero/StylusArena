// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Vault {
    mapping(address => uint256) public balances;
    uint256 public totalStored;
    address public owner;

    function initialize() public {
        owner = msg.sender;
    }

    function store(uint256 value) public {
        uint256 old = balances[msg.sender];
        balances[msg.sender] = value;
        totalStored = totalStored - old + value;
    }

    function retrieve() public view returns (uint256) {
        return balances[msg.sender];
    }

    function retrieveFor(address user) public view returns (uint256) {
        return balances[user];
    }

    function getTotal() public view returns (uint256) {
        return totalStored;
    }
}
