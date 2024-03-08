---
title: Improvements in the Rust translation to Coq, part 1
tags: [coq-of-rust, Rust, Coq, translation]
authors: []
---

Our tool [coq-of-rust](https://github.com/formal-land/coq-of-rust) is translating Rust&nbsp;🦀 programs to the proof system Coq&nbsp;🐓 to do formal verification on Rust programs. Even if we are able to verify realistic code, such as an [ERC-20 smart contract](http://localhost:3000/blog/2023/12/13/rust-verify-erc-20-smart-contract), `coq-of-rust` still has some limitations:

- fragile trait handling
- difficulties in ordering the definitions, in their order of dependencies as required by Coq

We will present how we plan to improve our tool to address these limitations.

<!-- truncate -->

:::info

- Next post: [Improvements in the Rust translation to Coq, part 2](/blog/2024/03/08/improvements-rust-translation-part-2)

:::

## Introduction

As emphasized in the [recent report from the White House](https://www.whitehouse.gov/wp-content/uploads/2024/02/Final-ONCD-Technical-Report.pdf), memory safety and formal verification are keys to ensure secure and correct software. Rust provides memory safety and we provide formal verification on top of it with `coq-of-rust`.

We will take the Rust [serde](https://github.com/serde-rs/serde) serialization library to have an example of code to translate in Coq. This is a popular Rust library that is used in almost all projects, either as a direct or transitive dependency. Serialization has a simple specification (being a bijection between the data and its serialized form) and is a good candidate for formal verification. We might verify this library afterwards if there is a need.

:::tip Contact

This work is funded by the [Aleph Zero](https://alephzero.org/) crypto-currency in order to verify their Rust smart contracts. You can [follow us on X](https://twitter.com/LandFoobar) to get our updates. We propose tools and services to make your codebase totally bug-free. Contact us at&nbsp;[&#099;&#111;&#110;&#116;&#097;&#099;&#116;&#064;formal&#046;&#108;&#097;&#110;&#100;](mailto:contact@formal.land) to chat! We offer a free audit to assess the feasibility of formal verification on your case.

:::

:::note Goal

Our company goal is to make formal verification accessible to all projects, reducing its cost to&nbsp;20% of the development cost. There should be no reason to have bugs in end-user products!

:::

## Warnings

We start by running the command:

```sh
cargo coq-of-rust
```

in the `serde` directory. We get a lot of warnings, but the translation does not panic as it tries to always produce something for debugging purposes. We have two kinds of warnings.

### Constants in patterns

The warning is the following:

```
warning: Constants in patterns are not yet supported.
    --> serde/src/de/mod.rs:2277:13
     |
2277 |             0 => panic!(), // special case elsewhere
     |             ^
```

The reason why we did not handle constants in patterns is that they are represented in a special format in the Rust compiler that was not obvious to handle. The definition of [rustc_middle::mir::consts::Const](https://doc.rust-lang.org/beta/nightly-rustc/rustc_middle/mir/consts/enum.Const.html) representing the constants in patterns is:

```rust
pub enum Const<'tcx> {
    Ty(Const<'tcx>),
    Unevaluated(UnevaluatedConst<'tcx>, Ty<'tcx>),
    Val(ConstValue<'tcx>, Ty<'tcx>),
}
```

There are three cases, and each contains several more cases. To fix this issue, we added the code to handle the signed and unsigned integers, which are enough for our `serde` example. We will need to add other cases later, especially for the strings. This allowed us to discover and fix a bug in our handling of patterns for tuples with elision&nbsp;`..`, like in the example:

```rust
fn main() {
    let triple = (0, -2, 3);

    match triple {
        (0, y, z) => println!("First is `0`, `y` is {:?}, and `z` is {:?}", y, z),
        (1, ..) => println!("First is `1` and the rest doesn't matter"),
        (.., 2) => println!("last is `2` and the rest doesn't matter"),
        (3, .., 4) => println!("First is `3`, last is `4`, and the rest doesn't matter"),
        _ => println!("It doesn't matter what they are"),
    }
}
```

These changes are in the pull-request [coq-of-rust#470](https://github.com/formal-land/coq-of-rust/pull/470).

### Unimplemented `parent_kind`

We get a second form of warning:

```
unimplemented parent_kind: Struct
expression: Expr {
    kind: ZstLiteral {
        user_ty: None,
    },
    ty: FnDef(
        DefId(2:31137 ~ core[10bc]::cmp::Reverse::{constructor#0}),
        [
        T/#1,
        ],
    ),
    temp_lifetime: Some(
        Node(14),
    ),
    span: serde/src/de/impls.rs:778:22: 778:29 (#0),
}
```

This is for some cases of expressions [rustc_middle::thir::ExprKind::ZstLiteral](https://doc.rust-lang.org/beta/nightly-rustc/rustc_middle/thir/enum.ExprKind.html#variant.ZstLiteral) in the Rust's [THIR representation](https://rustc-dev-guide.rust-lang.org/thir.html) that we do not handle. If we look at the `span` field, we see that it appears in the source in the file `serde/src/de/impls.rs` at line 778:

```rust
forwarded_impl! {
    (T), Reverse<T>, Reverse // Here is the error
}
```

This is not very informative as this code is generated by a macro. Another similar kind of expression appears later:

```rust
impl<'de, T> Deserialize<'de> for Wrapping<T>
where
    T: Deserialize<'de>,
{
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: Deserializer<'de>,
    {
      Deserialize::deserialize(deserializer).map(
          // Here is the error:
          Wrapping
      )
    }
}
```

The `Wrapping` term is the constructor of a structure, used as a function. We add the support of this case in the pull-request [coq-of-rust#471](https://github.com/formal-land/coq-of-rust/pull/471).

## Coq errors

When we type-check the generated Coq code, we quickly get an error:

```coq
(* Generated by coq-of-rust *)
Require Import CoqOfRust.CoqOfRust.

Module lib.
  Module core.

  End core.
End lib.

Module macros.

End macros.

Module integer128.

End integer128.

Module de.
  Module value.
    Module  Error.
    Section Error.
      Record t : Set := {
        (* Here is the error: *)
        err : ltac:(serde.de.value.ErrorImpl);
      }.

      (* 180.000 more lines! *)
```

The reason is that&nbsp;`serde.de.value.ErrorImpl` is not yet defined here. In Coq, we must order the definitions in the order of dependencies to ensure that there are no non-terminating definitions with infinite recursive calls and to preserve the consistency of the system.

This issue does not seem easy to us, as in a Rust crate, everything can depend on each other:

- types
- definitions
- traits
- `impl` blocks

Our current solutions are:

1. **To reorder the definitions in the source Rust code**, so that they appear in the right order for Coq. This is technically the simplest solution (no changes in `coq-of-rust`), but it is not very practical. Indeed, reordering elements in a big project generates a lot of conflicts in the version control system, especially if we cannot upstream the changes to the original project.
2. **To use a configuration file** to specify the order of the definitions. This works in a lot of cases, but we need to write this file manually and have it complete to compile the whole crate in Coq, even if we are interested in verifying a small part of the code. There are also some cases that are hard to entangle, in particular with traits that can depend on both types and definitions, that themselves may depend on traits.

In order to handle large projects, such as `serde`, we need to find a more definitive solution to handle the order of dependencies.

## Plan for the order of definitions

Our idea is to use a more verbose, but simpler translation, to generate Coq code that is not sensitive to the ordering of Rust. In addition, we should have a more robust mechanism for the traits, as there are still some edge cases that we do not handle well.

Our main ingredients are:

1. Generating an untyped code, where all Rust values become part of a single and shared `Value` type. With this approach, we can represent mutually recursive Rust types, that are generally hard to translate in a sound manner to Coq. We should also avoid a lot of errors on the Coq side related to type inference.
2. Adding an indirection level to all function calls, as any function call might refer to a definition that appears later in the code.

These ingredients have some drawbacks:

- By removing the types, we will obtain a code that is less readable. It might contain translation errors that will be harder to spot. We will need to add the types back during the specification of the code.
- We will need to add error cases corresponding to type errors at runtime, as we will not have the type system to ensure that functions expecting a certain type of value receive it. We know from the Rust type checker that these errors should not happen, but we will need to prove it in Coq.
- We will have to resolve the indirections in the calls at proof time, or with other mechanisms, that will be more complex than the current translation.
- We will still need to have a translation of the types (as values), to guide the inference of trait instances.

## Definition of a new monad

We rework our definitions of values, pointers and monad to represent the effects, taking into account the fact that we remove the types from the translation. Here are the main definitions that we are planning to use. We have not tested them yet as we need to update the translation to Coq to use them. We will do that just after.

### Pointers

```coq
Module Pointer.
  Module Index.
    Inductive t : Set :=
    | Tuple (index : Z)
    | Array (index : Z)
    | StructRecord (constructor field : string)
    | StructTuple (constructor : string) (index : Z).
  End Index.

  Module Path.
    Definition t : Set := list Index.t.
  End Path.

  Inductive t (Value : Set) : Set :=
  | Immediate (value : Value)
  | Mutable {Address : Set} (address : Address) (path : Path.t).
  Arguments Immediate {_}.
  Arguments Mutable {_ _}.
End Pointer.
```

A pointer is either:

- a pointer to an immutable data, that is directly represented by its data;
- a pointer to a mutable data, that is inside a cell at a certain address in the memory. The exact location in the cell is given by the path.

The type of `Address` is not enforced yet, but we will do it when defining the semantics.

### Values

```coq
Module Value.
  Inductive t : Set :=
  | Bool : bool -> t
  | Integer : Integer.t -> Z -> t
  (** For now we do not know how to represent floats so we use a string *)
  | Float : string -> t
  | UnicodeChar : Z -> t
  | String : string -> t
  | Tuple : list t -> t
  | Array : list t -> t
  | StructRecord : string -> list (string * t) -> t
  | StructTuple : string -> list t -> t
  | Pointer : Pointer.t t -> t
  (** The two existential types of the closure must be [Value.t] and [M]. We
      cannot enforce this constraint there yet, but we will do when defining the
      semantics. *)
  | Closure : {'(t, M) : Set * Set @ t -> M} -> t.
End Value.
```

Here, this type aims to represent any Rust value. We might add a few cases later to represent the `dyn` values, for example. Most of the cases of this type are as expected:

- The constructor&nbsp;`StructRecord` is for constructors of `struct` or `enum` with named fields.
- The constructor&nbsp;`StructTuple` is for constructors of `struct` or `enum` with unnamed fields.
- The constructor&nbsp;`Pointer` is for pointers to data, that could be either `&`, `&mut`, `*const`, or `*mut`.
- The constructor&nbsp;`Closure` is for closures (anonymous functions). To prevent errors with the positivity checker of Coq, we use an existential type for the type `Value.t` (as well as `M`, which will be defined later). Note that we are using impredicative `Set` in Coq, and `{A : Set @ P A}` is our notation for existential `Set` in `Set`. Without impredicative sets, we could have issues with the universe levels. The fact that these existential types are always `Value.t` and `M` will be enforced when defining the semantics.

### Monad's primitives

```coq
Module Primitive.
  Inductive t : Set :=
  | StateAlloc (value : Value.t)
  | StateRead {Address : Set} (address : Address)
  | StateWrite {Address : Set} (address : Address) (value : Value.t)
  | EnvRead.
End Primitive.
```

Here are the IO calls to the system that the monad can make. This list might be extended later. For now, we mainly have primitives to access the memory.

### Monad: base

```coq
Module LowM.
  Inductive t (A : Set) : Set :=
  | Pure : A -> t A
  | CallPrimitive : Primitive.t -> (Value.t -> t A) -> t A
  | Loop : t A -> (A -> bool) -> (A -> t A) -> t A
  | Impossible : t A
  (** This constructor is not strictly necessary, but is used as a marker for
      functions calls in the generated code, to help the tactics to recognize
      points where we can compose about functions. *)
  | Call : t A -> (A -> t A) -> t A.
  Arguments Pure {_}.
  Arguments CallPrimitive {_}.
  Arguments Loop {_}.
  Arguments Impossible {_}.
  Arguments Call {_}.

  Fixpoint let_ {A : Set} (e1 : t A) (f : A -> t A) : t A :=
    match e1 with
    | Pure v => f v
    | CallPrimitive primitive k =>
      CallPrimitive primitive (fun v => let_ (k v) f)
    | Loop body is_break k =>
      Loop body is_break (fun v => let_ (k v) f)
    | Impossible => Impossible
    | Call e k =>
      Call e (fun v => let_ (k v) f)
  end.
End LowM.
```

This is the first layer of our monad, very similar to what we had before. We remove the cast operation, as now everything has the same type. We use a style by continuation, but we also define a `let_` function to have a "bind" operator. Note that we always have the same type as parameter, so this is not really a monad as the "bind" operator should have the type:

```coq
forall {A B : Set}, M A -> (A -> M B) -> M B
```

Always having the same type is enough for us as we use a single type of all Rust values.

### Monad: with exceptions

We have the same type as before for the exceptions, representing the panics and all the special control flow operations such as `continue`, `return`, and `break`:

```coq
Module Exception.
  Inductive t : Set :=
  (** exceptions for Rust's `return` *)
  | Return : Value.t -> t
  (** exceptions for Rust's `continue` *)
  | Continue : t
  (** exceptions for Rust's `break` *)
  | Break : t
  (** escape from a match branch once we know that it is not valid *)
  | BreakMatch : t
  | Panic : string -> t.
End Exception.
```

Our final monad definition is a thin wrapper around `LowM`, to add an error monad to propagate the exceptions:

```coq
Definition M : Set :=
  LowM.t (Value.t + Exception.t).

Definition let_ (e1 : M) (e2 : Value.t -> M) : M :=
  LowM.let_ e1 (fun v1 =>
  match v1 with
  | inl v1 => e2 v1
  | inr error => LowM.Pure (inr error)
  end).
```

Once again, this is not really a monad as the type of the values that we compute is always the same, and we do not need more. Having a definition in two steps (`LowM` and `M`) is useful to separate the part that can be defined by computation (the `M` part) from the part whose semantics can only be given by inductive predicates (the `LowM` part).

## Conclusion

Next, we will see how we can use this new definition of Rust values, whether it works to translate our examples, and most importantly, how to modify `coq-of-rust` to generate terms without types.

If you are interested in formally verifying Rust projects, do not hesitate to get in touch with us at&nbsp;[&#099;&#111;&#110;&#116;&#097;&#099;&#116;&#064;formal&#046;&#108;&#097;&#110;&#100;](mailto:contact@formal.land) or go to our [GitHub repository](https://github.com/formal-land/coq-of-rust) for `coq-of-rust`.
