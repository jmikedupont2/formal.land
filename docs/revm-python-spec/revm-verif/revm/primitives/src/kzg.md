# 🦀 kzg.rs

[🐙 GitHub source](https://github.com/bluealloy/revm/tree/99e177d6bedf3823a717d3017b3cfeb98ed2aeac/crates/primitives/src/kzg.rs)

```rust
mod env_settings;
mod trusted_setup_points;

pub use c_kzg::KzgSettings;
pub use env_settings::EnvKzgSettings;
pub use trusted_setup_points::{
    parse_kzg_trusted_setup, G1Points, G2Points, KzgErrors, BYTES_PER_G1_POINT, BYTES_PER_G2_POINT,
    G1_POINTS, G2_POINTS, NUM_G1_POINTS, NUM_G2_POINTS,
};
```
