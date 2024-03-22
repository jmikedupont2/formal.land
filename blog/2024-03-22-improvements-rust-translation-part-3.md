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

We continue with our previous example [dns.rs](https://github.com/formal-land/coq-of-rust/blob/main/examples/ink_contracts/dns.rs), which is composed of around 200 lines of Rust code.

### Borrow and dereference

The next error that we encounter when type-checking the Coq translation of `dns.rs` is:

```
File "./examples/default/examples/ink_contracts/dns.v", line 233, characters 22-27:
Error: The reference deref was not found in the current environment.
```

In Rust, we can either take the address of a value with&nbsp;`&`, or dereference a reference with&nbsp;`*`. In our translation, we do not distinguish between the four following pointer types:

- `&`
- `&mut`
- `*const`
- `*mut`

We let the user handle these in different ways if it can simplify their proofs, especially regarding the distinction between mutable and non-mutable pointers. It simplifies the definition of our borrowing and dereferencing operators, as we need only two to cover all cases. We even go further: we remove these two operators in the translation, as they are the identity in our case!

To better understand why they are the identity, we need to see that there are two kinds of Rust values in our representation:

- the value itself and
- the value with its address.

The value itself is useful to compute over the values. For example, we use it to define the primitive addition over integers. The value with its address corresponds to the final Rust expression. Indeed, we can take the address of any sub-expression in Rust with the&nbsp;`&` operator, so each sub-expression should come with its address. When we take the address of an expression, we:

- start from a value with its address and go to
- a value that is an address to the value above, which we will need to allocate to have an address for it also.

Thus, the&nbsp;`&` operator behaves as the identity function followed by an allocation. Similarly, the&nbsp;`*` is a memory read followed by the identity function. Since we already use the alloc and read operations to go from a value to a value with its address and the other way around, we do not need to define the&nbsp;`*` and&nbsp;`&` operators in our translation and remove them.

### Primitive operators

We now need to distinguish between the function calls, that use the primitive:

```coq
M.get_function : string -> M
```

to find the right function to call when defining the semantics of the program (even if the function is defined later), and the calls to primitive operators (`+`, `*`, `!`, ...) that we define in our base library for Rust in Coq. The full list of primitive operators is given by:

- [rustc_middle::mir::syntax::BinOp](https://doc.rust-lang.org/beta/nightly-rustc/rustc_middle/mir/syntax/enum.BinOp.html)
- [rustc_middle::thir::LogicalOp](https://doc.rust-lang.org/beta/nightly-rustc/rustc_middle/thir/enum.LogicalOp.html) (with lazy evaluation of the parameters)
- [rustc_middle::mir::syntax::UnOp](https://doc.rust-lang.org/beta/nightly-rustc/rustc_middle/mir/syntax/enum.UnOp.html)

We adapted the handling of primitive operators from the code we had before and added a few other fixes so that now the `dns.rs` example type-checks in Coq&nbsp;🎊! We will now focus on fixing the other examples.

## Cleaning the code&nbsp;🧼

But let us first clean the code a bit. All the expressions in the internal [AST](https://en.wikipedia.org/wiki/Abstract_syntax_tree) of `coq-of-rust` are in a wrapper with the current type of the expression:

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

Having access to the type of each sub-expression was useful before annotating the&nbsp;`let` expressions. This is not required anymore, as all the values have the type&nbsp;`Value.t`. Thus, we remove the wrapper&nbsp;`Expr` and rename&nbsp;`ExprKind` into&nbsp;`Expr`. The resulting code is easier to read, as wrapping everything with a type was verbose sometimes.

We also cleaned some translated types that were not used anymore in the code, removed unused `Derive` traits, and removed the monadic translation on the types.

<figure>
  ![Crab in space](2024-03-22/crab-in-space.webp)
  <figcaption>A crab safely walking in space thanks to formal verification.</figcaption>
</figure>

## Handling the remaining examples

To handle the remaining examples of our test suite (extracted from the snippets of the [Rust by Example](https://doc.rust-lang.org/rust-by-example/) book), we mainly needed to re-implement the pattern matching on the new untyped values. Here is an example of Rust code with matching:

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

- On line 6 we call the&nbsp;`match_operator` primitive that takes a value to match on,&nbsp;`tuple`, and a list of functions that try to match the value with a pattern and execute some code in case of success. We execute the matching functions successively until one succeeds and we stop. There should be at least one succeeding function as pattern-match in Rust is exhaustive.
- On line 10 we get the first element of the tuple. Note that, more precisely, what we get is the address of the first element of&nbsp;`γ` that is the address of the tuple&nbsp;`tuple` given as parameter to the function. Having the address might be required for some operations, like doing subsequent matching by reference or using the&nbsp;`&` operator in the&nbsp;`match`'s body.
- On line 11 we do the same with the second element of the tuple. The indices for&nbsp;`γ` are generated to avoid name clashes. They correspond to the depth of the sub-pattern being considered, followed by the index of the current item in this sub-pattern.
- On line 14, we check that the first element of the tuple is&nbsp;`0`. We use the&nbsp;`M.is_constant_or_break_match` primitive that checks if the value is a constant and if it is equal to the expected value. If it is not the case, it exits the current matching function, and the&nbsp;`match_operator` primitive will evaluate the next one, going to line 19.
- On line 24 we return the final result. Note that we always do a&nbsp;`M.alloc` followed by&nbsp;`M.read` to return the result. This could be simplified, as immediately reading an allocated value is like running the identity function.

By implementing the new version of the pattern-matching, as well as a few other smaller fixes, we were able to make all the examples type-check again! We now need to fix the proofs we had on the [erc20.v](https://github.com/formal-land/coq-of-rust/blob/main/CoqOfRust/examples/default/examples/ink_contracts/erc20.v) example, as the generated code changed a lot.

## Updating the proofs&nbsp;👩‍🚀

Unfortunately, all these changes in the generated code are breaking our proofs. We still want to write our specifications and proofs by first showing a simulation of the Rust code with a simpler and functional definition. Before, with our simulations, we were:

- replacing the management of pointers by either stateless functions or functions in a state monad;
- simplifying the error handling, especially for code that cannot panic.

Now we also have to:

- define the types;
- add the typing information;
- add the trait constraints and resolve the trait instances;
- resolve the function or associated function calls.

We have not finished updating the proofs but still merged our work in `main` with the pull request [#472](https://github.com/formal-land/coq-of-rust/pull/472) as this was taking too long. The proof that we want to update is in the file [proofs/erc20.v](https://github.com/formal-land/coq-of-rust/blob/main/CoqOfRust/examples/default/examples/ink_contracts/proofs/erc20.v) and is about the smart contract [erc20.rs](https://github.com/formal-land/coq-of-rust/blob/main/examples/ink_contracts/erc20.rs).

### Phi operators&nbsp;🎠

Our basic strategy for the proof, in order to handle the untyped Rust values of the new translation, is to define various&nbsp;`φ` operators coming from a user-defined Coq type to a Rust value of type&nbsp;`Value.t`. These translate the data types that we define to represent the Rust types of the original program. Note that we previously had trouble translating the Rust types in the general case, especially for mutually recursive types or types involving a lot of trait manipulations.

More formally, we introduce the Coq typeclass:

```coq
Class ToValue (A : Set) : Set := {
  Φ : Ty.t;
  φ : A -> Value.t;
}.
Arguments Φ _ {_}.
```

This describes how to go from a user-defined type in Coq to the equivalent representation in&nbsp;`Value.t`. In addition to the&nbsp;`φ` operator, we also define the&nbsp;`Φ` operator that gives the Rust type of the Coq type. This type is required to give for polymorphic definitions.

We always go from user-defined types to&nbsp;`Value.t`. We write our simulation statements like this:

```coq
{{env, state |
    code.example.get_at_index [] [φ vector; φ index] ⇓
    inl (φ (simulations.example.get_at_index vector index))
| state'}}
```

where:

```coq
{{env, state | rust_program ⇓ simulation_result | state'}}
```

is our predicate to state an evaluation of a Rust program to a simulation result. We apply the&nbsp;`φ` operator to the arguments of the Rust program and to the result of the simulation. In some proofs, we set this operator as&nbsp;`Opaque` in order to keep track of it and avoid unwanted reductions.

### Traits

The trait definitions, as well as trait constraints, are absent from the generated Coq code. For now, we add them back as follows, for the example of the&nbsp;`Default` trait:

1. We define a&nbsp;`Default` typeclass in Coq:

   ```coq
   Module Default.
     Class Trait (Self : Set) : Set := {
       default : Self;
     }.
   End Default.
   ```

2. We define what it means to implement the&nbsp;`Default` trait and have a corresponding simulation:

   ```coq
   Module Default.
     Record TraitHasRun (Self : Set)
       `{ToValue Self}
       `{core.simulations.default.Default.Trait Self} :
       Prop := {
       default :
         exists default,
         IsTraitMethod
           "core::default::Default" (Φ Self) []
           "default" default /\
         Run.pure
           (default [] [])
           (inl (φ core.simulations.default.Default.default));
     }.
   End Default.
   ```

   where&nbsp;`Run.pure` is our simulation predicate for the case where the `state` does not change.

3. Finally, we use the&nbsp;`TraitHasRun` predicate as an additional hypothesis for simulation proofs on functions that depend on the&nbsp;`Default` trait in Rust:

   ```coq
   (** Simulation proof for `unwrap_or_default` on the type `Option`. *)
   Lemma run_unwrap_or_default {T : Set}
     {_ : ToValue T}
     {_ : core.simulations.default.Default.Trait T}
     (self : option T) :
     core.proofs.default.Default.TraitHasRun T ->
     Run.pure
       (core.option.Impl_Option_T.unwrap_or_default (Φ T) [] [φ self])
       (inl (φ (core.simulations.option.Impl_Option_T.unwrap_or_default self))).
   Proof.
     (* ... *)
   Qed.
   ```

## Conclusion&nbsp;✍️

We still have a lot to do, especially in finding the right approach to verify the newly generated Rust code. But we have finalized our new translation mode without types and ordering, which helps to successfully translate many more Rust examples. We also do not need to translate the dependencies of a project anymore before compiling it.

Our next target is to translate the whole of Rust's standard library (with the help of some axioms for the expressions which we do not handle yet), in order to have a faithful definition of the Rust primitives, such as functions of the [option](https://doc.rust-lang.org/core/option/) and [vec](https://doc.rust-lang.org/alloc/vec/) modules.

If you are interested in formally verifying your Rust projects, do not hesitate to get in touch with us at&nbsp;[&#099;&#111;&#110;&#116;&#097;&#099;&#116;&#064;formal&#046;&#108;&#097;&#110;&#100;](mailto:contact@formal.land)&nbsp;💌! Formal verification provides the highest level of safety for critical applications, with a mathematical guarantee of the absence of bugs for a given specification.
