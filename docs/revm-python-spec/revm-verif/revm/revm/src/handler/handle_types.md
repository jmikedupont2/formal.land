# 🦀 handle_types.rs

[🐙 GitHub source](https://github.com/bluealloy/revm/tree/99e177d6bedf3823a717d3017b3cfeb98ed2aeac/crates/revm/src/handler/handle_types.rs)

```rust
// Modules

pub mod execution;
pub mod post_execution;
pub mod pre_execution;
pub mod validation;

// Exports

pub use validation::{
    ValidateEnvHandle, ValidateInitialTxGasHandle, ValidateTxEnvAgainstState, ValidationHandler,
};

pub use execution::{
    ExecutionHandler, FrameCallHandle, FrameCallReturnHandle, FrameCreateHandle,
    FrameCreateReturnHandle, InsertCallOutcomeHandle, InsertCreateOutcomeHandle,
};

pub use pre_execution::{
    DeductCallerHandle, LoadAccountsHandle, LoadPrecompilesHandle, PreExecutionHandler,
};

pub use post_execution::{
    EndHandle, OutputHandle, PostExecutionHandler, ReimburseCallerHandle, RewardBeneficiaryHandle,
};
```
