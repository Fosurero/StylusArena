// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract MultiSig {
    address public ownerA;
    address public ownerB;
    uint256 public proposalValue;
    bool public approvedA;
    bool public approvedB;
    bool public executed;
    uint256 public executionCount;

    function initialize(address _a, address _b) public {
        ownerA = _a;
        ownerB = _b;
    }

    function propose(uint256 value) public {
        require(msg.sender == ownerA || msg.sender == ownerB, "Not owner");
        proposalValue = value;
        approvedA = false;
        approvedB = false;
        executed = false;
    }

    function approve() public {
        if (msg.sender == ownerA) approvedA = true;
        else if (msg.sender == ownerB) approvedB = true;
        else revert("Not owner");
    }

    function execute() public returns (uint256) {
        require(approvedA && approvedB, "Need both");
        require(!executed, "Done");
        executed = true;
        executionCount++;
        return proposalValue;
    }
}
