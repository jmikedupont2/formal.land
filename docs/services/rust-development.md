# 🦀 Rust development

We **help you build** your products by offering [Rust](https://www.rust-lang.org/) **development services**. We work as contractors only. Some of our developers have more than **10 years of experience** in software development, either in **embedded systems** or in **Web applications (front and back)**. We strive to follow **strict schedule** and fulfill **customer requirements**.
```rust
let name = if name_length > 0 {
    let name_slice: &mut [u8] = &mut account_data[position..position + name_length];
    let name = String::from_utf8(name_slice.to_vec())
        .map_err(|_| CandyError::CouldNotRetrieveConfigLineData)?;
    name.trim_end_matches(NULL_STRING).to_string()
} else {
    EMPTY_STR.to_string()
};
```
We focus on **software quality**. As an example of project, we work on security tools for the Rust language with the [Rust verification](/docs/verification/rust) project. The goal is to enable formal verification with the [Coq proof system 🐓](https://coq.inria.fr/) on Rust. This is a way to exhaustively test a program against a specification writing mathematical proofs, to make sure the code is sound and with no bugs.

Contact us:
* by email at [&#099;&#111;&#110;&#116;&#097;&#099;&#116;&#064;formal&#046;&#108;&#097;&#110;&#100;](mailto:&#099;&#111;&#110;&#116;&#097;&#099;&#116;&#064;formal&#046;&#108;&#097;&#110;&#100;) ✉️
* with a call on [koalendar.com/e/meet-with-formal-land](https://koalendar.com/e/meet-with-formal-land) ☎️

<!-- > The more you are demanding, the more you need us 🙂. -->
> Helping you build 🚀
