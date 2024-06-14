# 🦀 utility.rs

[🐙 GitHub source](https://github.com/bluealloy/revm/tree/99e177d6bedf3823a717d3017b3cfeb98ed2aeac/crates/interpreter/src/instructions/utility.rs)

```rust
pub(crate) unsafe fn read_i16(ptr: *const u8) -> i16 {
    i16::from_be_bytes(core::slice::from_raw_parts(ptr, 2).try_into().unwrap())
}

pub(crate) unsafe fn read_u16(ptr: *const u8) -> u16 {
    u16::from_be_bytes(core::slice::from_raw_parts(ptr, 2).try_into().unwrap())
}
```
