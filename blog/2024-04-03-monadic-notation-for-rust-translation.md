---
title: 🦀 Monadic notation for the Rust translation
tags: [coq-of-rust, Rust, Coq, translation, monad]
authors: []
---

At Formal Land our mission is to reduce the cost of finding bugs in software. We use [formal verification](https://runtimeverification.com/blog/formal-verification-lore), that is to say mathematical reasoning on code, to make sure we find more bugs than with testing. As part of this effort, we are working on a tool [coq-of-rust](https://github.com/formal-land/coq-of-rust) to translate Rust code to Coq, a proof assistant, to analyze Rust programs. Here we present a technical improvement we made in this tool.

One of the challenges of our translation from Rust to Coq is that the generated code is very verbose. The size increase is about ten folds in our examples. A reasons is that we use a monad to represent side effects in Coq, so we need to name each intermediate result and apply the `bind` operator. Here, we will present a monadic notation that prevents naming intermediate results to make the code more readable.

<!-- truncate -->

:::tip Contact

This work is funded by the [Aleph Zero](https://alephzero.org/) crypto-currency to verify their Rust smart contracts. You can [follow us on X](https://twitter.com/LandFoobar) to get our updates. We propose tools and services to make your codebase bug-free with [formal verification](https://en.wikipedia.org/wiki/Formal_verification).

Contact us at&nbsp;[&#099;&#111;&#110;&#116;&#097;&#099;&#116;&#064;formal&#046;&#108;&#097;&#110;&#100;](mailto:contact@formal.land) to chat&nbsp;☎️!

:::

<figure>
  ![Crab with a pen](2024-04-03/crab-writing.webp)
</figure>

## Example 🔎

Here is the Rust source code that we consider:

```rust
fn add(a: i32, b: i32) -> i32 {
    a + b
}
```

Before, we were generating the following Coq code, with `let*` as the notation for the bind:

```coq
Definition add (τ : list Ty.t) (α : list Value.t) : M :=
  match τ, α with
  | [], [ a; b ] =>
    let* a := M.alloc a in
    let* b := M.alloc b in
    let* α0 := M.read a in
    let* α1 := M.read b in
    BinOp.Panic.add α0 α1
  | _, _ => M.impossible
  end.
```

Now, with the new monadic notation, we generate:

```coq
Definition add (τ : list Ty.t) (α : list Value.t) : M :=
  match τ, α with
  | [], [ a; b ] =>
    ltac:(M.monadic
      (let a := M.alloc (| a |) in
      let b := M.alloc (| b |) in
      BinOp.Panic.add (| M.read (| a |), M.read (| b |) |)))
  | _, _ => M.impossible
  end.
```

The main change is that we do not need to introduce intermediate&nbsp;`let*` expressions with generated names. The code structure is more similar to the original Rust code, with additional calls to memory primitives such as `M.alloc` and&nbsp;`M.read`.

The notation&nbsp;`f (| x1, ..., xn |)` represents the call to the function&nbsp;`f` with the arguments&nbsp;`x1`, ..., `xn` returning a monadic result. We bind the result with the current continuation that goes up to the wrapping `ltac:(M.monadic ...)` tactic. We automatically transform the `let` into a `let*` with the `M.monadic` tactic when needed.

## Where do we use this notation? 🤔

We use this notation in all the function bodies that we generate, that are all in a monad to represent side effects. We call the `ltac:(M.monadic ...)` tactic at the start of the functions, as well as at the start of closure bodies that are defined inside functions. This also applies to the translation of `if`, `match`, and `loop` expressions, as we represent their bodies as functions.

Here is an example of code with a `match` expression:

```rust
fn add(a: i32, b: i32) -> i32 {
    match a - b {
        0 => a + b,
        _ => a - b,
    }
}
```

We translate it to:

```coq
Definition add (τ : list Ty.t) (α : list Value.t) : M :=
  match τ, α with
  | [], [ a; b ] =>
    ltac:(M.monadic
      (let a := M.alloc (| a |) in
      let b := M.alloc (| b |) in
      M.read (|
        M.match_operator (|
          M.alloc (| BinOp.Panic.sub (| M.read (| a |), M.read (| b |) |) |),
          [
            fun γ =>
              ltac:(M.monadic
                (let _ :=
                  M.is_constant_or_break_match (|
                    M.read (| γ |),
                    Value.Integer Integer.I32 0
                  |) in
                M.alloc (|
                  BinOp.Panic.add (| M.read (| a |), M.read (| b |) |)
                |)));
            fun γ =>
              ltac:(M.monadic (
                M.alloc (|
                  BinOp.Panic.sub (| M.read (| a |), M.read (| b |) |)
                |)
              ))
          ]
        |)
      |)))
  | _, _ => M.impossible
  end.
```

We see that we call the tactic `M.monadic` for each branch of the `match` expression.

## How does it work? 🛠️

The `M.monadic` tactic is defined in [M.v](https://github.com/formal-land/coq-of-rust/blob/main/CoqOfRust/M.v). The main part is:

```coq showLineNumbers
Ltac monadic e :=
  lazymatch e with
  (* ... *)
  | context ctxt [M.run ?x] =>
    lazymatch context ctxt [M.run x] with
    | M.run x => monadic x
    | _ =>
      refine (M.bind _ _);
        [ monadic x
        | let v := fresh "v" in
          intro v;
          let y := context ctxt [v] in
          monadic y
        ]
    end
  (* ... *)
  end.
```

In our translation of Rust, all of the values have the common type&nbsp;`Value.t`. The monadic bind is of type `M -> (Value.t -> M) -> M` where&nbsp;`M` is the type of the monad. The `M.run` function is an axiom that we use as a marker to know where we need to apply `M.bind`. The type of `M.run` is:

```coq
Axiom run : M -> Value.t.
```

The notation for monadic function calls is defined using the `M.run` axiom with:

```coq
Notation "e (| e1 , .. , en |)" := (M.run ((.. (e e1) ..) en)).
```

When we encounter a `M.run` (line 4) we apply the `M.bind` (line 8) to the monadic expression `x` (line 9) and its continuation `ctx` that we obtain thanks to the `context` keyword (line 4) of the matching of expressions in Ltac.

There is another case in the `M.monadic` tactic to handle the `let` expressions, that is not shown here.

## Conclusion

Thanks to this new monadic notation, the generated Coq code is more readable and closer to the original Rust code. This should simplify our work in writing proofs on the generated code, as well as debugging the translation.

If you are interested in formally verifying your Rust projects, do not hesitate to get in touch with us at&nbsp;[&#099;&#111;&#110;&#116;&#097;&#099;&#116;&#064;formal&#046;&#108;&#097;&#110;&#100;](mailto:contact@formal.land)&nbsp;💌! Formal verification provides the highest level of safety for critical applications, with a mathematical guarantee of the absence of bugs for a given specification.
