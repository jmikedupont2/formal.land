---
title: Translating Rust match patterns to Coq with coq-of-rust
tags: [coq-of-rust, Rust, Coq, Aleph-Zero]
authors: []
---

Our tool [coq-of-rust](https://github.com/formal-land/coq-of-rust) enables [formal verification](https://en.wikipedia.org/wiki/Formal_verification) of [🦀&nbsp;Rust](https://www.rust-lang.org/) code to make sure that a program has no bugs. This technique checks all possible execution paths using mathematical techniques. This is important for example to ensure the security of smart contracts written in Rust language.

Our tool `coq-of-rust` works by translating Rust programs to the general proof system [🐓&nbsp;Coq](https://coq.inria.fr/). Here we explain how we translate[&nbsp;`match` patterns](https://doc.rust-lang.org/book/ch06-02-match.html) from Rust to Coq. The specificity of Rust patterns is to be able to match values either by value or reference.

<!-- truncate -->

:::tip Purchase

To formally verify your Rust codebase and improve the security of your application, email us at&nbsp;[&#099;&#111;&#110;&#116;&#097;&#099;&#116;&#064;formal&#046;&#108;&#097;&#110;&#100;](mailto:contact@formal.land)! Formal verification is the only way to prevent all bugs by exploring all possible executions of your program.

:::

:::info Thanks

This work and the development of [coq-of-rust](https://github.com/formal-land/coq-of-rust) is made possible thanks to the [Aleph Zero](https://alephzero.org/)'s Foundation, to develop an extra safe platform to build decentralized applications with formally verified smart contracts.

:::

![Rust rooster](2024-01-04/rust-rooster.png)

## Rust example&nbsp;🦀

To illustrate the pattern matching in Rust, we will use the following example featuring a match by reference:

```rust
pub(crate) fn is_option_equal<A>(
    is_equal: fn(x: &A, y: &A) -> bool,
    lhs: Option<A>,
    rhs: &A,
) -> bool {
    match lhs {
        None => false,
        Some(ref value) => is_equal(value, rhs),
    }
}
```

We take a function&nbsp;`is_equal` as a parameter, operating only on references to the type&nbsp;`A`. We apply it to compare two values&nbsp;`lhs` and&nbsp;`rhs`:

- if&nbsp;`lhs` is&nbsp;`None`, we return&nbsp;`false`,
- if&nbsp;`lhs` is&nbsp;`Some`, we get its value by reference and apply&nbsp;`is_equal`.

When we apply the pattern:

```rust
Some(ref value) => ...
```

we do something interesting: we read the value of&nbsp;`lhs` to know if we are in a&nbsp;`Some` case but leave it in place and return&nbsp;`value` the reference to its content.

To simulate this behavior in Coq, we need to match in two steps:

1. match the value of&nbsp;`lhs` to know if we are in a&nbsp;`Some` case or not,
2. if we are in a&nbsp;`Some` case, create the reference to the content of a&nbsp;`Some` case based on the reference to&nbsp;`lhs`.

## Coq translation&nbsp;🐓

The Coq translation that our tool [coq-of-rust](https://github.com/formal-land/coq-of-rust) generates is the following:

```coq
Definition is_option_equal
    {A : Set}
    (is_equal : (ref A) -> (ref A) -> M bool.t)
    (lhs : core.option.Option.t A)
    (rhs : ref A)
    : M bool.t :=
  let* is_equal := M.alloc is_equal in
  let* lhs := M.alloc lhs in
  let* rhs := M.alloc rhs in
  let* α0 : M.Val bool.t :=
    match_operator
      lhs
      [
        fun γ =>
          (let* α0 := M.read γ in
          match α0 with
          | core.option.Option.None => M.alloc false
          | _ => M.break_match
          end) :
          M (M.Val bool.t);
        fun γ =>
          (let* α0 := M.read γ in
          match α0 with
          | core.option.Option.Some _ =>
            let γ0_0 := γ.["Some.0"] in
            let* value := M.alloc (borrow γ0_0) in
            let* α0 : (ref A) -> (ref A) -> M bool.t := M.read is_equal in
            let* α1 : ref A := M.read value in
            let* α2 : ref A := M.read rhs in
            let* α3 : bool.t := M.call (α0 α1 α2) in
            M.alloc α3
          | _ => M.break_match
          end) :
          M (M.Val bool.t)
      ] in
  M.read α0.
```

We run the&nbsp;`match_operator` on&nbsp;`lhs` and the two branches of the&nbsp;`match`. This operator is of type:

```coq
Definition match_operator {A B : Set}
    (scrutinee : A)
    (arms : list (A -> M B)) :
    M B :=
  ...
```

It takes a&nbsp;`scrutinee` value to match as a parameter, and runs a sequence of functions&nbsp;`arms` on it. Each function&nbsp;`arms` takes the value of the&nbsp;`scrutinee` and returns a monadic value&nbsp;`M B`. This monadic value can either be a success value if the pattern matches, or a special failure value if the pattern does not match. We evaluate the branches until one succeeds.

### `None` branch

The&nbsp;`None` branch is the simplest one. We read the value at the address given by&nbsp;`lhs` (we represent each Rust variable by its address) and match it with the&nbsp;`None` constructor:

```coq
fun γ =>
  (let* α0 := M.read γ in
  match α0 with
  | core.option.Option.None => M.alloc false
  | _ => M.break_match
  end) :
  M (M.Val bool.t)
```

If it matches, we return&nbsp;`false`. If it does not, we return the special value&nbsp;`M.break_match` to indicate that the pattern does not match.

### `Some` branch

In the&nbsp;`Some` branch, we first also read the value at the address given by&nbsp;`lhs` and match it with the&nbsp;`Some` constructor:

```coq
fun γ =>
  (let* α0 := M.read γ in
  match α0 with
  | core.option.Option.Some _ =>
    let γ0_0 := γ.["Some.0"] in
    let* value := M.alloc (borrow γ0_0) in
    let* α0 : (ref A) -> (ref A) -> M bool.t := M.read is_equal in
    let* α1 : ref A := M.read value in
    let* α2 : ref A := M.read rhs in
    let* α3 : bool.t := M.call (α0 α1 α2) in
    M.alloc α3
  | _ => M.break_match
  end) :
  M (M.Val bool.t)
```

If we are in that case, we create the value:

```coq
let γ0_0 := γ.["Some.0"] in
```

with the address of the first field of the&nbsp;`Some` constructor, relative to the address of&nbsp;`lhs` given in&nbsp;`γ`. We define the operator&nbsp;`.["Some.0"]` when we define the option type and generate such definitions for all user-defined enum types.

We then encapsulate the address&nbsp;`γ0_0` in a proper Rust reference:

```coq
let* value := M.alloc (borrow γ0_0) in
```

of type&nbsp;`ref A` in the original Rust code. Finally, we call the function&nbsp;`is_equal` on the two references&nbsp;`value` and&nbsp;`rhs`, with some boilerplate code to read and allocate the variables.

## General translation

We generalize this translation to all patterns by:

- flattening all the or patterns `|` so that only patterns with a single choice remain,
- evaluating each match branch in order with the&nbsp;`match_operator` operator,
- in each branch, evaluating the inner patterns in order. This evaluation might fail at any point if the pattern does not match. In this case, we return the special value&nbsp;`M.break_match` and continue with the next branch.

At least one branch should succeed as the Rust compiler checks that all cases are covered. We still have a special value&nbsp;`M.impossible` in Coq for the case where no patterns match and satisfy the type checker.

We distinguish and handle the following kind of patterns (and all their combinations):

- wild patterns&nbsp;`_`,
- binding patterns&nbsp;`(ref) name` or&nbsp;`(ref) name as pattern` (the&nbsp;`ref` keyword is optional),
- struct patterns&nbsp;`Name { field1: pattern1, ... }` or&nbsp;`Name(pattern1, ...)`
- tuple patterns&nbsp;`(pattern1, ...)`,
- literal patterns&nbsp;`12`, `true`, ...,
- slice patterns&nbsp;`[first, second, tail @ ..]`,
- dereference patterns&nbsp;`&pattern`.

This was enough to cover all of our examples. The Rust compiler can also automatically add some&nbsp;`ref` patterns when matching on references. We do not need to handle this case as this is automatically done by the Rust compiler during its compilation to the intermediate&nbsp;[THIR](https://rustc-dev-guide.rust-lang.org/thir.html) representation, and e directly read the THIR code.

## Conclusion

In this blog post, we have presented how we translate Rust patterns to the proof system Coq. The difficult part is handling the&nbsp;`ref` patterns, which we do by matching in two steps: matching on the values and then computing the addresses of the sub-fields.

If you have Rust smart contracts or programs to verify, feel free to email us at&nbsp;[&#099;&#111;&#110;&#116;&#097;&#099;&#116;&#064;formal&#046;&#108;&#097;&#110;&#100;](mailto:contact@formal.land). We will be happy to help!
