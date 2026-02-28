#![cfg_attr(not(any(feature = "export-abi", test)), no_main)]
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
}
