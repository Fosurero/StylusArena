#![cfg_attr(not(any(feature = "export-abi", test)), no_main)]
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
}
