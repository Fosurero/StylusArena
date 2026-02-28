#![cfg_attr(not(any(feature = "export-abi", test)), no_main)]
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
}
