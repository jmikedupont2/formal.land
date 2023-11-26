---
title: Translation of function bodies from Rust to Coq
tags: [coq-of-rust, Rust, Coq]
authors: []
---

Our tool [coq-of-rust](https://github.com/formal-land/coq-of-rust) enables formal verification of [🦀&nbsp;Rust](https://www.rust-lang.org/) code, to make sure that a program has no bugs given a precise specification. We work by translating Rust programs to the general proof system [🐓&nbsp;Coq](https://coq.inria.fr/).

Here, we present how we translate function bodies from Rust to Coq in an example. We also show some of the optimizations we made to reduce the size of the translation.

:::tip Purchase

If you need to formally verify your Rust codebase to improve the security of your application, email us at&nbsp;[&#099;&#111;&#110;&#116;&#097;&#099;&#116;&#064;formal&#046;&#108;&#097;&#110;&#100;](mailto:contact@formal.land)!

:::

<!-- truncate -->

![Rust and Coq](2023-11-26/rust_and_coq.png)

## Translating a function body

We take the following Rust example as input:

```rust
// fn balance_of_impl(&self, owner: &AccountId) -> Balance { ... }

fn balance_of(&self, owner: AccountId) -> Balance {
    self.balance_of_impl(&owner)
}
```

Here is the corresponding Coq code that `coq-of-rust` generates _without optimizations_:

```coq
Definition balance_of
    (self : ref ltac:(Self))
    (owner : erc20.AccountId.t)
    : M ltac:(erc20.Balance) :=
  let* self : M.Val (ref ltac:(Self)) := M.alloc self in
  let* owner : M.Val erc20.AccountId.t := M.alloc owner in
  let* α0 : ref erc20.Erc20.t := M.read self in
  let* α1 : M.Val erc20.Erc20.t := deref α0 in
  let* α2 : ref erc20.Erc20.t := borrow α1 in
  let* α3 : M.Val (ref erc20.Erc20.t) := M.alloc α2 in
  let* α4 : ref erc20.Erc20.t := M.read α3 in
  let* α5 : ref erc20.AccountId.t := borrow owner in
  let* α6 : M.Val (ref erc20.AccountId.t) := M.alloc α5 in
  let* α7 : ref erc20.AccountId.t := M.read α6 in
  let* α8 : M.Val erc20.AccountId.t := deref α7 in
  let* α9 : ref erc20.AccountId.t := borrow α8 in
  let* α10 : M.Val (ref erc20.AccountId.t) := M.alloc α9 in
  let* α11 : ref erc20.AccountId.t := M.read α10 in
  let* α12 : u128.t := erc20.Erc20.t::["balance_of_impl"] α4 α11 in
  let* α13 : M.Val u128.t := M.alloc α12 in
  M.read α13.
```

This code is much more verbose than the original Rust code as we make all pointer manipulations explicit. We will see just after how to simplify it. We start with the function declaration:

```coq
Definition balance_of
    (self : ref ltac:(Self))
    (owner : erc20.AccountId.t)
    : M ltac:(erc20.Balance) :=
```

that repeats the parameters in the Rust source. Note that the final result is wrapped into the monad type `M`. This is a monad representing all the side-effects used in Rust programs (state, panic, non-termination, ...). Then, we allocate all the function parameters:

```coq
  let* self : M.Val (ref ltac:(Self)) := M.alloc self in
  let* owner : M.Val erc20.AccountId.t := M.alloc owner in
```

This ensures that both `self` and `owner` have an address in memory, in case we borrow them later. This allocation is also fresh, so we cannot access the address of the values from the caller by mistake. We use the monadic let `let*` as allocations can modify the memory state.

Then we start by the body of the function itself. We do all the necessary pointer manipulations to compute the parameters `self` and `&owner` of the function `balance_of_impl`. These representations are directly taken from the abstract syntax tree of the Rust compiler (using the [THIR](https://rustc-dev-guide.rust-lang.org/thir.html) version).

For example, for the first parameter `self`, named `α4` in this translation, we do:

```coq
  let* α0 : ref erc20.Erc20.t := M.read self in
  let* α1 : M.Val erc20.Erc20.t := deref α0 in
  let* α2 : ref erc20.Erc20.t := borrow α1 in
  let* α3 : M.Val (ref erc20.Erc20.t) := M.alloc α2 in
  let* α4 : ref erc20.Erc20.t := M.read α3 in
```

We combine the operators:

- `M.read`: to get a value of type `A` from a value with an address `M.Val`,
- `deref`: to get the value with an address `M.Val A` pointed by a reference `ref A`,
- `borrow`: to get the reference `ref A` to a value with an address `M.Val A`,
- `M.alloc`: to allocate a new value `A` in memory, returning a value with address `M.Val A`.

We do the same to compute the second parameter `&owner` of `balance_of_impl` with:

```coq
  let* α5 : ref erc20.AccountId.t := borrow owner in
  let* α6 : M.Val (ref erc20.AccountId.t) := M.alloc α5 in
  let* α7 : ref erc20.AccountId.t := M.read α6 in
  let* α8 : M.Val erc20.AccountId.t := deref α7 in
  let* α9 : ref erc20.AccountId.t := borrow α8 in
  let* α10 : M.Val (ref erc20.AccountId.t) := M.alloc α9 in
  let* α11 : ref erc20.AccountId.t := M.read α10 in
```

Finally, we call the `balance_of_impl` function and return the result:

```coq
  let* α12 : u128.t := erc20.Erc20.t::["balance_of_impl"] α4 α11 in
  let* α13 : M.Val u128.t := M.alloc α12 in
  M.read α13.
```

We do not keep the address of the result, as it will be allocated again by the caller function.

## Optimizations

Some operations can always be removed, namely:

- `M.read (M.alloc v) ==> v`: we do not need to allocate and give an address to a value if it will be immediately read,
- `deref (borrow v) ==> v` and `borrow (deref v) ==> v`: the borrowing and dereferencing operators are doing the opposite, so they cancel each other. We need to be careful of the mutability status of the borrowing and dereferencing.

Applying these simple simplification rules, we get the following slimed-down translation:

```coq
Definition balance_of
    (self : ref ltac:(Self))
    (owner : erc20.AccountId.t)
    : M ltac:(erc20.Balance) :=
  let* self : M.Val (ref ltac:(Self)) := M.alloc self in
  let* owner : M.Val erc20.AccountId.t := M.alloc owner in
  let* α0 : ref erc20.Erc20.t := M.read self in
  let* α1 : ref erc20.AccountId.t := borrow owner in
  erc20.Erc20.t::["balance_of_impl"] α0 α1.
```

This is much shorter and easier to verify!

## Conclusion

We have illustrated in an example how we translate a simple function from Rust to Coq. In this example, we saw how the pointer operations are made explicit in the abstract syntax tree of Rust, and how we simplify them for the frequent cases.

If you have any comments or suggestions, feel free to email us at&nbsp;[&#099;&#111;&#110;&#116;&#097;&#099;&#116;&#064;formal&#046;&#108;&#097;&#110;&#100;](mailto:contact@formal.land). In future posts, we will go into more detail about the verification process itself.
