# 🦀 noop.rs

[🐙 GitHub source](https://github.com/bluealloy/revm/tree/99e177d6bedf3823a717d3017b3cfeb98ed2aeac/crates/revm/src/inspector/noop.rs)

```rust
use crate::{Database, Inspector};
/// Dummy [Inspector], helpful as standalone replacement.
#[derive(Clone, Copy, Debug, Default, PartialEq, Eq, PartialOrd, Ord, Hash)]
pub struct NoOpInspector;

impl<DB: Database> Inspector<DB> for NoOpInspector {}
```
