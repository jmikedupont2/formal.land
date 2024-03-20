---
title: Improvements in the Rust translation to Coq, part 3
tags: [coq-of-rust, Rust, Coq, translation]
authors: []
---

We explained how we started updating our translation tool [coq-of-rust](https://github.com/formal-land/coq-of-rust) in our [previous blog post](/blog/2024/03/08/improvements-rust-translation-part-2), to support more of the Rust language. Our goal is to provide formal verification for the Rust&nbsp;🦀 language, relying on the proof system Coq&nbsp;🐓. We will see in this post how we continue implementing changes in&nbsp;`coq-of-rust` to:

1. remove the types from the translation,
2. be independent of the ordering of the definitions.

<!-- truncate -->

:::info

- Previous post: [Improvements in the Rust translation to Coq, part 2](/blog/2024/03/08/improvements-rust-translation-part-2)

:::

:::tip Contact

This work is funded by the [Aleph Zero](https://alephzero.org/) crypto-currency to verify their Rust smart contracts. You can [follow us on X](https://twitter.com/LandFoobar) to get our updates. We propose tools and services to make your codebase bug-free with [formal verification](https://en.wikipedia.org/wiki/Formal_verification).

Contact us at&nbsp;[&#099;&#111;&#110;&#116;&#097;&#099;&#116;&#064;formal&#046;&#108;&#097;&#110;&#100;](mailto:contact@formal.land) to chat&nbsp;☎️!

:::

## Translating the `dns` example&nbsp;🚀

We continue with our previous example [dns.rs](https://github.com/formal-land/coq-of-rust/blob/main/examples/ink_contracts/dns.rs), composed of around 200 lines of Rust code.

### Borrow and dereference

The next error that we encounter when type-checking the Coq translation of `dns.rs` is:

```
File "./examples/default/examples/ink_contracts/dns.v", line 233, characters 22-27:
Error: The reference deref was not found in the current environment.
```

In Rust, we can either take the address of a value with&nbsp;`&`, or dereference a reference with&nbsp;`*`. In our translation we do not distinguish between the four following pointer types:

- `&`
- `&mut`
- `*const`
- `*mut`

We let the user handle the user handle these in different ways, if it can simplify their proofs, especially regarding the distinction between mutable and non-mutable pointers. It simplifies the definition of our borrowing and dereferencing operators, as we need only two to cover all cases. We even go further: we remove these two operators in the translation, as they are the identity in our case!

To better understand why they are the identity, we need to see that there are two kinds of Rust values in our representation:

- the value itself and
- the value with its address.

The value itself is useful to compute over the values. For example, we use it to define the primitive addition over integers. The value with its address corresponds to the final Rust expression. Indeed, we can take the address of any sub-expression in Rust with the&nbsp;`&` operator, so each sub-expression should come with its address. When we take the address of an expression, we:

- start from a value with its address and go to
- a value that is an address to the value above, which we will need to allocate to have an address for it also.

Thus the&nbsp;`&` operator behaves as the identity function followed by an allocation. Similarly, the&nbsp;`*` is a memory read followed by the identity function. Since we already use the alloc and read operations to go from a value to a value with its address and the other way around, we do not need to define the&nbsp;`*` and&nbsp;`&` operators in our translation and remove them.

### Primitive operators

We now need to distinguish between the function calls, that use the primitive:

```coq
M.get_function : string -> M
```

to find the right function to call when defining the semantics of the program (even if the function is defined later), and the calls to primitive operators (`+`, `*`, `!`, ...) that we define in our base library for Rust in Coq. The full list of primitive operators is given by:

- [rustc_middle::mir::syntax::BinOp](https://doc.rust-lang.org/beta/nightly-rustc/rustc_middle/mir/syntax/enum.BinOp.html)
- [rustc_middle::thir::LogicalOp](https://doc.rust-lang.org/beta/nightly-rustc/rustc_middle/thir/enum.LogicalOp.html) (with lazy evaluation of the parameters)
- [rustc_middle::mir::syntax::UnOp](https://doc.rust-lang.org/beta/nightly-rustc/rustc_middle/mir/syntax/enum.UnOp.html)

We adapted the handling of primitive operators from the code we had before, and added a few other fixes, so that now the `dns.rs` example type-checks in Coq&nbsp;🎊! We will now focus on fixing the other examples.

## Cleaning the code&nbsp;🧼

But let us first clean the code a bit. All the expressions in the internal [AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree) of `coq-of-rust` are in wrapper with the current type of the expression:

```rust
pub(crate) struct Expr {
    pub(crate) kind: Rc<ExprKind>,
    pub(crate) ty: Option<Rc<CoqType>>,
}

pub(crate) enum ExprKind {
    Pure(Rc<Expr>),
    LocalVar(String),
    Var(Path),
    Constructor(Path),
    // ... all the cases
```

Having access to the type of each sub-expressions was useful before to annotate the&nbsp;`let` expressions. This is not required anymore, as all the values have the type&nbsp;`Value.t`. Thus we remove the wrapper&nbsp;`Expr`, and rename&nbsp;`ExprKind` into&nbsp;`Expr`. The resulting code is easier to read, as wrapping everything with a type was verbose sometimes.

We also cleaned some translated types that were not used anymore in the code, removed unused `Derive` traits, and removed the monadic translation on the types.

## Handling the remaining examples

To handle the remaining examples of our test suite (extracted from the snippets of the [Rust by Example](https://doc.rust-lang.org/rust-by-example/) book), we mainly needed to re-implement the pattern-matching on the new untyped values. Here is an example of Rust code with matching:

```rust
fn matching(tuple: (i32, i32)) -> i32 {
    match tuple {
        (0, 0) => 0,
        (_, _) => 1,
    }
}
```

with its translation in Coq:

```coq showLineNumbers
Definition matching (𝜏 : list Ty.t) (α : list Value.t) : M :=
  match 𝜏, α with
  | [], [ tuple ] =>
    let* tuple := M.alloc tuple in
    let* α0 :=
      match_operator
        tuple
        [
          fun γ =>
            let* γ0_0 := M.get_tuple_field γ 0 in
            let* γ0_1 := M.get_tuple_field γ 1 in
            let* _ :=
              let* α0 := M.read γ0_0 in
              M.is_constant_or_break_match α0 (Value.Integer Integer.I32 0) in
            let* _ :=
              let* α0 := M.read γ0_1 in
              M.is_constant_or_break_match α0 (Value.Integer Integer.I32 0) in
            M.alloc (Value.Integer Integer.I32 0);
          fun γ =>
            let* γ0_0 := M.get_tuple_field γ 0 in
            let* γ0_1 := M.get_tuple_field γ 1 in
            M.alloc (Value.Integer Integer.I32 1)
        ] in
    M.read α0
  | _, _ => M.impossible
  end.
```

Here is a breakdown of how it works:

- On line 6 we call the&nbsp;`match_operator` primitive that takes a value to match on,&nbsp;`tuple`, and a list of functions that try to match the value with a pattern and execute some code in case of success. We execute the matching functions successfully, until one succeeds and stop. There should be at least one succeeding function as pattern-match in Rust is exhaustive.
- On line 10 we get the first element of the tuple. Note that, more precisely, what we get is the address of the first element of&nbsp;`γ` that is the address of the tuple&nbsp;`tuple` given as parameter to the function. Having the address might be required for some operations, like doing subsequent matching by reference or using the&nbsp;`&` operator in the&nbsp;`match`'s body.
- On line 11 we do the same with the second element of the tuple. The indices for&nbsp;`γ` are generated to avoid name clashes. They correspond to the depth of the sub-pattern being considered, followed by the index of the current item in this sub-pattern.
- On line 14, we check that the first element of the tuple is&nbsp;`0`. We use the&nbsp;`M.is_constant_or_break_match` primitive that checks if the value is a constant and if it is equal to the expected value. If it is not the case, it exits the current matching function, and the&nbsp;`match_operator` primitive will evaluate the next one, going to line 19.
- On line 24 we return the final result. Note that we always do a&nbsp;`M.alloc` followed by&nbsp;`M.read` to return the result. This could be simplified as immediately reading an allocated value is like running the identity function.

By implementing the new version of the pattern-matching, as well as a few other smaller fixes, we were able to make all the examples type-check again! We now need to fix the proofs we had on the [erc20.v](https://github.com/formal-land/coq-of-rust/blob/main/CoqOfRust/examples/default/examples/ink_contracts/erc20.v) example, as the generated code changed a lot.

## Updating the proofs&nbsp;👩‍🚀

## Conclusion&nbsp;✍️

In the next blog post, we will see how we continue to translate the examples in full definition mode. There is still a lot to do to get to the same level of Rust support as before, but we are hopeful that our new approach will be more robust and easier to maintain.

If you are interested in formally verifying your Rust projects, do not hesitate to get in touch with us at&nbsp;[&#099;&#111;&#110;&#116;&#097;&#099;&#116;&#064;formal&#046;&#108;&#097;&#110;&#100;](mailto:contact@formal.land)&nbsp;💌! Formal verification provides the highest level of safety for critical applications. See the [White House report on secure software development](https://www.whitehouse.gov/wp-content/uploads/2024/02/Final-ONCD-Technical-Report.pdf) for more on the importance of formal verification.
