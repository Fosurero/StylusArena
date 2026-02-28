#![cfg_attr(not(any(feature = "export-abi", test)), no_main)]
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
}
