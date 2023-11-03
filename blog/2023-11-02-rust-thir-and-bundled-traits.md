---
title: THIR and bundled traits for Rust to Coq
tags: [coq-of-rust, Rust, Coq, trait, THIR, HIR]
author: Guillaume Claret
---

We continued our work on [coq-of-rust](https://github.com/formal-land/coq-of-rust), a tool to formally verify [Rust](https://www.rust-lang.org/) programs using [Coq&nbsp;🐓](https://coq.inria.fr/). This tool translates Rust programs to an equivalent Coq program, which can then be verified using Coq's proof assistant.

We present two main improvements we made to the tool:

- Using the [THIR](https://rustc-dev-guide.rust-lang.org/thir.html) intermediate language of Rust to have more information during the translation to Coq.
- Bundling the type-classes representing the traits of Rust to have faster type-checking in Coq.

<!-- truncate -->

## THIR intermediate language

To translate Rust programs to Coq, we plug into the compiler of Rust, that operates on a series of intermediate languages:

- source code (`.rs` files)
- abstract syntax tree (AST)
- High-Level Intermediate Representation (HIR)
- Typed High-Level Intermediate Representation (THIR)
- Mid-level Intermediate Representation (MIR)
- machine code

We were previously using the HIR language to start our translation to Coq, because it is not too low-level and close to what the user has originally in the `.rs` file. This helps relating the generated Coq code to the original Rust code.

However, at the level of HIR, there are still a lot of implicit information. For example, Rust has [automatic dereferencing rules](https://users.rust-lang.org/t/automatic-dereferencing/53828) that are not yet explicit in HIR. In order not to make any mistakes during our translation to Coq, we prefer to use the next representation, THIR, that makes explicit such rules.

In addition, the THIR representation explicits when a method call is from a trait (and which trait) or from a standalone `impl` block. Given that we still have troubles translating the traits with [type-classes](https://coq.inria.fr/doc/V8.18.0/refman/addendum/type-classes.html) that are inferrable by Coq, this helps a lot.

A downside of the THIR representation is that it is much more verbose. For example, here is a formatting function generated from HIR:

```coq
Definition fmt
    `{H' : State.Trait}
    (self : ref Self)
    (f : mut_ref core.fmt.Formatter)
    : M (H := H') core.fmt.Result :=
  let* α0 := format_argument::["new_display"] (addr_of self.["radius"]) in
  let* α1 :=
    format_arguments::["new_v1"]
      (addr_of [ "Circle of radius " ])
      (addr_of [ α0 ]) in
  f.["write_fmt"] α1.
```

and the version with THIR, with the explicit borrowing and dereferencing:

```coq
Definition fmt
    `{ℋ : State.Trait}
    (self : ref Self)
    (f : mut_ref core.fmt.Formatter)
    : M ltac:(core.fmt.Result) :=
  let* α0 := deref f core.fmt.Formatter in
  let* α1 := borrow_mut α0 core.fmt.Formatter in
  let* α2 := borrow [ mk_str "Circle of radius " ] (list (ref str)) in
  let* α3 := deref α2 (list (ref str)) in
  let* α4 := borrow α3 (list (ref str)) in
  let* α5 := pointer_coercion "Unsize" α4 in
  let* α6 := deref self converting_to_string.Circle in
  let* α7 := α6.["radius"] in
  let* α8 := borrow α7 i32 in
  let* α9 := deref α8 i32 in
  let* α10 := borrow α9 i32 in
  let* α11 := core.fmt.rt.Argument::["new_display"] α10 in
  let* α12 := borrow [ α11 ] (list core.fmt.rt.Argument) in
  let* α13 := deref α12 (list core.fmt.rt.Argument) in
  let* α14 := borrow α13 (list core.fmt.rt.Argument) in
  let* α15 := pointer_coercion "Unsize" α14 in
  let* α16 := core.fmt.Arguments::["new_v1"] α5 α15 in
  core.fmt.Formatter::["write_fmt"] α1 α16.
```

We went from a function having two intermediate variables to seventeen!

## Bundled traits

Some Rust codebase can have a lot of traits, for example in [paritytech/ink/crates/env/src/types.rs](https://github.com/paritytech/ink/blob/ccb38d2c3ac27523fe3108f2bb7bffbbe908cdb7/crates/env/src/types.rs#L120) the trait&nbsp;`Environment` references more than forty other traits:

```rust
pub trait Environment: Clone {
    const MAX_EVENT_TOPICS: usize;

    type AccountId: 'static
        + scale::Codec
        + CodecAsType
        + Clone
        + PartialEq
        + ...;

    type Balance: 'static
        + scale::Codec
        + CodecAsType
        + ...;

    ...
```

We first used an unbundled approach to represent this trait by a type-class in Coq, as it felt more natural:

```coq
Module Environment.
  Class Trait (Self : Set) `{Clone.Trait Self}
    {AccountId : Set}
    `{scale.Codec.Trait AccountId}
    `{CodecAsType AccountId}
    `{Clone AccountId}
    `{PartialEq AccountId}
    ...
```

However the backquote operator generated too many implicit arguments, and the type-checker of Coq was very slow. We then switched to a bundled approach, as advocated in this blog post: [Exponential blowup when using unbundled typeclasses to model algebraic hierarchies](https://www.ralfj.de/blog/2019/05/15/typeclasses-exponential-blowup.html). The Coq code for this trait now looks like this:

```coq
Module Environment.
  Class Trait `{ℋ : State.Trait} (Self : Set) : Type := {
    ℋ_0 :: Clone.Trait Self;
    MAX_EVENT_TOPICS : usize;
    AccountId : Set;
    ℒ_0 :: parity_scale_codec.codec.Codec.Trait AccountId;
    ℒ_1 :: ink_env.types.CodecAsType.Trait AccountId;
    ℒ_2 :: core.clone.Clone.Trait AccountId;
    ℒ_3 ::
      core.cmp.PartialEq.Trait AccountId
        (Rhs := core.cmp.PartialEq.Default.Rhs AccountId);
    ...;
    Balance : Set;
    ℒ_8 :: parity_scale_codec.codec.Codec.Trait Balance;
    ℒ_9 :: ink_env.types.CodecAsType.Trait Balance;
    ...;

    ...
```

We use the notation&nbsp;`::` for fields that are trait instances. With this approach, traits have types as parameters but no other traits.

The type-checking is now much faster, and in particular we avoid some cases with exponential blowup or non-terminating type-checking. But this is not a perfect solution as we still have cases where the instance inference does not terminate or fails with hard-to-understand error messages.

## Conclusion

We have illustrated here some improvements we recently made to our [coq-of-rust](https://github.com/formal-land/coq-of-rust) translator. We are continuing our work with the goal of verifying a first small smart contract.

:::tip Contact

If you wish to formally verify your codebase to improve the security of your application, contact us at&nbsp;[&#099;&#111;&#110;&#116;&#097;&#099;&#116;&#064;formal&#046;&#108;&#097;&#110;&#100;](mailto:contact@formal.land)!

:::
