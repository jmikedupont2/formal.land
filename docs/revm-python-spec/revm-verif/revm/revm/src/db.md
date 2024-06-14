# 🦀 db.rs

[🐙 GitHub source](https://github.com/bluealloy/revm/tree/99e177d6bedf3823a717d3017b3cfeb98ed2aeac/crates/revm/src/db.rs)

```rust
//! [Database] implementations.

#[cfg(feature = "alloydb")]
pub mod alloydb;
pub mod emptydb;
#[cfg(feature = "ethersdb")]
pub mod ethersdb;
pub mod in_memory_db;
pub mod states;

pub use crate::primitives::db::*;
#[cfg(feature = "alloydb")]
pub use alloydb::AlloyDB;
pub use emptydb::{EmptyDB, EmptyDBTyped};
#[cfg(feature = "ethersdb")]
pub use ethersdb::EthersDB;
pub use in_memory_db::*;
pub use states::{
    AccountRevert, AccountStatus, BundleAccount, BundleState, CacheState, DBBox,
    OriginalValuesKnown, PlainAccount, RevertToSlot, State, StateBuilder, StateDBBox,
    StorageWithOriginalValues, TransitionAccount, TransitionState,
};
```
