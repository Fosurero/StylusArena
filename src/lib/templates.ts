export interface ContractTemplate {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  badgeColor: string;
  code: string;
  solidityEquivalent: string;
  gasStylus: number;
  gasEvm: number;
}

export const templates: ContractTemplate[] = [
  {
    id: "solana-pda-counter",
    title: "PDA Counter",
    subtitle: "For Solana Devs",
    description:
      "Familiar Rust patterns — account-based counter like Solana PDAs but on Arbitrum Stylus. No Anchor needed.",
    badge: "Solana Devs",
    badgeColor: "bg-purple-500/20 text-purple-400 border-purple-500/30",
    code: `#![cfg_attr(not(any(feature = "export-abi", test)), no_main)]
extern crate alloc;

use stylus_sdk::{alloy_primitives::U256, prelude::*, storage::StorageU256};

sol_storage! {
    #[entrypoint]
    pub struct Counter {
        uint256 count;
    }
}

#[public]
impl Counter {
    /// Similar to Solana's increment instruction —
    /// but no PDA derivation or account setup needed!
    pub fn increment(&mut self) {
        let current = self.count.get();
        self.count.set(current + U256::from(1));
    }

    /// Read counter value — like Solana's account data fetch
    pub fn get_count(&self) -> U256 {
        self.count.get()
    }

    /// Set to arbitrary value — full storage write
    pub fn set_count(&mut self, value: U256) {
        self.count.set(value);
    }

    /// Decrement with underflow check
    pub fn decrement(&mut self) {
        let current = self.count.get();
        if current > U256::ZERO {
            self.count.set(current - U256::from(1));
        }
    }
}`,
    solidityEquivalent: `// SPDX-License-Identifier: MIT
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
}`,
    gasStylus: 21520,
    gasEvm: 43410,
  },
  {
    id: "solidity-migration",
    title: "ERC-20 Token",
    subtitle: "Migrate from Solidity in 5 min",
    description:
      "Your first Stylus ERC-20. Same interface Solidity contracts call, but compiled from Rust with massive gas savings.",
    badge: "Solidity Migration",
    badgeColor: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    code: `#![cfg_attr(not(any(feature = "export-abi", test)), no_main)]
extern crate alloc;

use alloc::string::String;
use stylus_sdk::{
    alloy_primitives::{Address, U256},
    prelude::*,
    storage::{StorageAddress, StorageMap, StorageString, StorageU256, StorageU8},
};

sol_storage! {
    #[entrypoint]
    pub struct Erc20 {
        string name;
        string symbol;
        uint8 decimals;
        uint256 total_supply;
        mapping(address => uint256) balances;
        mapping(address => mapping(address => uint256)) allowances;
    }
}

#[public]
impl Erc20 {
    /// Initialize token (call once after deploy)
    pub fn initialize(&mut self, name: String, symbol: String) {
        self.name.set_str(&name);
        self.symbol.set_str(&symbol);
        self.decimals.set(18u8.into());
    }

    pub fn name(&self) -> String {
        self.name.get_string()
    }

    pub fn symbol(&self) -> String {
        self.symbol.get_string()
    }

    pub fn total_supply(&self) -> U256 {
        self.total_supply.get()
    }

    pub fn balance_of(&self, owner: Address) -> U256 {
        self.balances.get(owner)
    }

    /// Mint tokens to caller — simplified for demo
    pub fn mint(&mut self, amount: U256) {
        let sender = msg::sender();
        let balance = self.balances.get(sender);
        self.balances.setter(sender).set(balance + amount);
        let supply = self.total_supply.get();
        self.total_supply.set(supply + amount);
    }

    /// Transfer tokens
    pub fn transfer(&mut self, to: Address, amount: U256) -> bool {
        let sender = msg::sender();
        let sender_bal = self.balances.get(sender);
        if sender_bal < amount {
            return false;
        }
        self.balances.setter(sender).set(sender_bal - amount);
        let to_bal = self.balances.get(to);
        self.balances.setter(to).set(to_bal + amount);
        true
    }
}`,
    solidityEquivalent: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SimpleERC20 {
    string public name;
    string public symbol;
    uint8 public decimals = 18;
    uint256 public totalSupply;
    mapping(address => uint256) public balanceOf;

    function initialize(string memory _name, string memory _symbol) public {
        name = _name;
        symbol = _symbol;
    }

    function mint(uint256 amount) public {
        balanceOf[msg.sender] += amount;
        totalSupply += amount;
    }

    function transfer(address to, uint256 amount) public returns (bool) {
        require(balanceOf[msg.sender] >= amount, "Insufficient");
        balanceOf[msg.sender] -= amount;
        balanceOf[to] += amount;
        return true;
    }
}`,
    gasStylus: 26180,
    gasEvm: 51340,
  },
  {
    id: "heavy-compute-fibonacci",
    title: "Fibonacci Compute",
    subtitle: "Heavy Compute Benchmark",
    description:
      "Where Stylus truly shines — compute-heavy on-chain Fibonacci. See 10-100x gas savings compared to EVM on raw computation.",
    badge: "Compute Heavy",
    badgeColor: "bg-orange-500/20 text-orange-400 border-orange-500/30",
    code: `#![cfg_attr(not(any(feature = "export-abi", test)), no_main)]
extern crate alloc;

use stylus_sdk::{alloy_primitives::U256, prelude::*, storage::StorageU256};

sol_storage! {
    #[entrypoint]
    pub struct Fibonacci {
        uint256 result;
    }
}

#[public]
impl Fibonacci {
    /// Compute Fibonacci iteratively — this is where WASM
    /// destroys the EVM. Pure computation = massive savings.
    pub fn compute(&mut self, n: u32) -> U256 {
        let result = Self::fib(n);
        self.result.set(result);
        result
    }

    /// Read last computed result
    pub fn get_result(&self) -> U256 {
        self.result.get()
    }

    /// Pure Rust computation — compiles to native WASM
    /// No EVM opcode overhead!
    fn fib(n: u32) -> U256 {
        if n <= 1 {
            return U256::from(n);
        }
        let mut a = U256::ZERO;
        let mut b = U256::from(1);
        for _ in 2..=n {
            let temp = b;
            b = a + b;
            a = temp;
        }
        b
    }

    /// Benchmark: compute fib(n) and return gas-relevant result
    pub fn benchmark(&mut self, n: u32) -> U256 {
        self.compute(n)
    }
}`,
    solidityEquivalent: `// SPDX-License-Identifier: MIT
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
}`,
    gasStylus: 8740,
    gasEvm: 72600,
  },
  {
    id: "storage-vault",
    title: "Key-Value Vault",
    subtitle: "Web2 Devs – Simple Storage",
    description:
      "A dead-simple key-value store. If you've used Redis or a database, you already understand this contract.",
    badge: "Web2 Friendly",
    badgeColor: "bg-green-500/20 text-green-400 border-green-500/30",
    code: `#![cfg_attr(not(any(feature = "export-abi", test)), no_main)]
extern crate alloc;

use alloc::string::String;
use stylus_sdk::{
    alloy_primitives::{Address, U256},
    prelude::*,
    storage::{StorageAddress, StorageMap, StorageU256},
};

sol_storage! {
    #[entrypoint]
    pub struct Vault {
        /// Think of this like a HashMap<Address, uint256>
        mapping(address => uint256) balances;
        /// Total stored across all users
        uint256 total_stored;
        /// Owner of the vault
        address owner;
    }
}

#[public]
impl Vault {
    /// Initialize the vault owner
    pub fn initialize(&mut self) {
        self.owner.set(msg::sender());
    }

    /// Store a value — like Redis SET but on-chain
    pub fn store(&mut self, value: U256) {
        let sender = msg::sender();
        let old = self.balances.get(sender);
        self.balances.setter(sender).set(value);
        let total = self.total_stored.get();
        self.total_stored.set(total - old + value);
    }

    /// Retrieve your value — like Redis GET
    pub fn retrieve(&self) -> U256 {
        self.balances.get(msg::sender())
    }

    /// Get any user's stored value
    pub fn retrieve_for(&self, user: Address) -> U256 {
        self.balances.get(user)
    }

    /// Total of all stored values
    pub fn get_total(&self) -> U256 {
        self.total_stored.get()
    }

    /// Owner address
    pub fn get_owner(&self) -> Address {
        self.owner.get()
    }
}`,
    solidityEquivalent: `// SPDX-License-Identifier: MIT
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
}`,
    gasStylus: 23100,
    gasEvm: 44800,
  },
  {
    id: "multi-sig-lite",
    title: "Multi-Sig Lite",
    subtitle: "DeFi Building Block",
    description:
      "A lightweight multi-signature approval pattern. Shows how Stylus handles complex state + access control efficiently.",
    badge: "DeFi Pattern",
    badgeColor: "bg-pink-500/20 text-pink-400 border-pink-500/30",
    code: `#![cfg_attr(not(any(feature = "export-abi", test)), no_main)]
extern crate alloc;

use stylus_sdk::{
    alloy_primitives::{Address, U256},
    prelude::*,
    storage::{StorageAddress, StorageBool, StorageMap, StorageU256},
};

sol_storage! {
    #[entrypoint]
    pub struct MultiSig {
        address owner_a;
        address owner_b;
        uint256 proposal_value;
        bool approved_a;
        bool approved_b;
        bool executed;
        uint256 execution_count;
    }
}

#[public]
impl MultiSig {
    /// Setup the two signers
    pub fn initialize(&mut self, owner_a: Address, owner_b: Address) {
        self.owner_a.set(owner_a);
        self.owner_b.set(owner_b);
    }

    /// Propose a new value to store
    pub fn propose(&mut self, value: U256) {
        let sender = msg::sender();
        let a = self.owner_a.get();
        let b = self.owner_b.get();
        assert!(sender == a || sender == b, "Not an owner");

        self.proposal_value.set(value);
        self.approved_a.set(false);
        self.approved_b.set(false);
        self.executed.set(false);
    }

    /// Approve the current proposal
    pub fn approve(&mut self) {
        let sender = msg::sender();
        if sender == self.owner_a.get() {
            self.approved_a.set(true);
        } else if sender == self.owner_b.get() {
            self.approved_b.set(true);
        } else {
            panic!("Not an owner");
        }
    }

    /// Execute if both approved
    pub fn execute(&mut self) -> U256 {
        assert!(self.approved_a.get() && self.approved_b.get(), "Need both approvals");
        assert!(!self.executed.get(), "Already executed");

        self.executed.set(true);
        let count = self.execution_count.get();
        self.execution_count.set(count + U256::from(1));

        self.proposal_value.get()
    }

    /// Check proposal status
    pub fn get_status(&self) -> (bool, bool, bool) {
        (self.approved_a.get(), self.approved_b.get(), self.executed.get())
    }

    pub fn get_execution_count(&self) -> U256 {
        self.execution_count.get()
    }
}`,
    solidityEquivalent: `// SPDX-License-Identifier: MIT
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
}`,
    gasStylus: 28900,
    gasEvm: 52100,
  },
];
