#![cfg_attr(not(any(feature = "export-abi", test)), no_main)]
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
}
