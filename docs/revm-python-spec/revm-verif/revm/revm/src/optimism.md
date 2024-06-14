# 🦀 optimism.rs

[🐙 GitHub source](https://github.com/bluealloy/revm/tree/99e177d6bedf3823a717d3017b3cfeb98ed2aeac/crates/revm/src/optimism.rs)

```rust
//! Optimism-specific constants, types, and helpers.

mod handler_register;
mod l1block;

pub use handler_register::{
    deduct_caller, end, last_frame_return, load_accounts, optimism_handle_register, output,
    reward_beneficiary, validate_env, validate_tx_against_state,
};
pub use l1block::{L1BlockInfo, BASE_FEE_RECIPIENT, L1_BLOCK_CONTRACT, L1_FEE_RECIPIENT};
```
