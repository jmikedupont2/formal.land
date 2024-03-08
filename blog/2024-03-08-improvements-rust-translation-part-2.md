---
title: Improvements in the Rust translation to Coq, part 2
tags: [coq-of-rust, Rust, Coq, translation]
authors: []
---

In our [previous blog post](/blog/2024/02/29/improvements-rust-translation), we stated our plan to improve our translation of Rust&nbsp;🦀 to Coq&nbsp;🐓 with [coq-of-rust](https://github.com/formal-land/coq-of-rust). We also provided a new definition for our Rust monad in Coq, and the definition of a unified type to represent any Rust values. We will now see how we modify the Rust implementation of&nbsp;`coq-of-rust` to make the generated code use these new definitions.

With this new translation strategy, to support more Rust code, we want:

1. to remove the types from the translation,
2. to avoid the need to order the definitions in the generated Coq code.

<!-- truncate -->

:::info

- Previous post: [Improvements in the Rust translation to Coq, part 1](/blog/2024/02/29/improvements-rust-translation)

:::

:::tip Contact

This work is funded by the [Aleph Zero](https://alephzero.org/) crypto-currency to verify their Rust smart contracts. You can [follow us on X](https://twitter.com/LandFoobar) to get our updates. We propose tools and services to make your codebase bug-free with [formal verification](https://en.wikipedia.org/wiki/Formal_verification).

Contact us at&nbsp;[&#099;&#111;&#110;&#116;&#097;&#099;&#116;&#064;formal&#046;&#108;&#097;&#110;&#100;](mailto:contact@formal.land) to chat!

:::

## Implementation of the monad

We implemented the new monad and the type `Value.t` holding any kind of Rust values as described in the previous blog post. For now, we have removed the definitions related to the standard library of Rust (everything except the base definitions such as the integer types). This should not be an issue to type-check the generated Coq code, as the new code should be independent of the ordering of definitions: in particular, it should type-check even if the needed definitions are not yet there.

We added some definitions for the primitive unary and binary operators. These include some operations on the integers such arithmetic operations (with or without overflow, depending on the compilation mode), as well as comparisons (equality, lesser or equal than, ...).

Now that the main library file [CoqOfRust/CoqOfRust.v](https://github.com/formal-land/coq-of-rust/blob/main/CoqOfRust/CoqOfRust.v) compiles in Coq, we can start to test the translation on our examples.

## Generating the tests

We generate new snapshots for our translations with:

```sh
cargo build && time python run_tests.py
```

This builds the project `coq-of-rust` (with a lot of warning about unused code for now) and re-generates our snapshots: for each Rust file in the [examples](https://github.com/formal-land/coq-of-rust/tree/main/examples) directory, we generate a Coq file with the same name but the extension&nbsp;`.v`. We generate two versions:

- one in axiom mode, where all definitions are axiomatized, to translate libraries, for example, and
- one in full definition mode, where we also translate the bodies of the function definitions.

## Axiom mode

We first try to type-check and fix the code generated in axiom mode.

### Type aliases

We have a first error for type aliases that we do not translate properly. We need access to the fully qualified name of the alias. We do that by combining calls to the functions:

- [crate_name](https://doc.rust-lang.org/beta/nightly-rustc/rustc_middle/ty/context/struct.TyCtxt.html#method.crate_name) to get the name of the current crate and
- [def_path](https://doc.rust-lang.org/beta/nightly-rustc/rustc_middle/ty/context/struct.TyCtxt.html#method.def_path) to get the whole definition path without the crate name.

As a result, for the file [examples/ink_contracts/basic_contract_caller.rs](https://github.com/formal-land/coq-of-rust/blob/main/examples/ink_contracts/basic_contract_caller.rs), we translate the type alias:

```rust
type Hash = [u8; 32];
```

into the Coq code:

```coq
Axiom Hash :
  (Ty.path "basic_contract_caller::Hash") =
    (Ty.apply (Ty.path "array") [Ty.path "u8"]).
```

Then, during the proofs, we will be able to substitute the type `Hash` by its definition when it appears. Note that we now translate types by values of the type `Ty.t`, so there should be no difficulties in rewriting types.

We should add the length of the array in the type. This is not done yet.

### Traits

In axiom mode, we remove most of the trait definitions. Instead, with our new translation model, the traits are mostly unique names (the absolute path of the trait definition). The main use of traits is to distinguish them from other traits, to know which trait implementation to use when calling a trait's method. We still translate the provided methods (that are default methods in the trait definition) to axioms and add a predicate stating that they are associated with the current trait. For example, we translate the following Rust trait:

```rust
// crate `my_crate`

trait Animal {
    fn new(name: &'static str) -> Self;

    fn name(&self) -> &'static str;
    fn noise(&self) -> &'static str;

    fn talk(&self) {
        println!("{} says {}", self.name(), self.noise());
    }
}
```

to the Coq code:

```coq
(* Trait *)
Module Animal.
  Parameter talk : (list Ty.t) -> (list Value.t) -> M.

  Axiom ProvidedMethod_talk : M.IsProvidedMethod "my_crate::Animal" talk.
End Animal.
```

We realize with this example that the translation in axiom mode generates very few errors, as we remove all the type definitions and all the function axioms have the same signature:

```coq
(* A list of types that can be empty for non-polymorphic functions,
   a list of parameters, and a return value in the monad `M`. *)
list Ty.t -> list Value.t -> M
```

so the type-checking of these axioms never fails. We thus jump to the full definition mode as this is where our new approach might fail.

## Definition mode

We now try to type-check the generated Coq code in full definition mode. We start with the [dns.rs](https://github.com/formal-land/coq-of-rust/blob/main/examples/ink_contracts/dns.rs) smart contract example.

### Polymorphic trait implementation

This example is interesting, as it contains polymorphic implementations, such as for the [mock](https://en.wikipedia.org/wiki/Mock_object) type&nbsp;`Mapping`:

```rust
#[derive(Default)]
struct Mapping<K, V> {
    _key: core::marker::PhantomData<K>,
    _value: core::marker::PhantomData<V>,
}
```

that implements the [Default](https://doc.rust-lang.org/core/default/trait.Default.html) trait on the type `Mapping<K, V>` for two type parameters&nbsp;`K` and&nbsp;`V`. We translate it to:

```coq showLineNumbers
(* Struct Mapping *)

Module Impl_core_default_Default_for_dns_Mapping_K_V.
  (*
  Default
  *)
  Definition default (𝜏 : list Ty.t) (α : list Value.t) : M :=
    match 𝜏, α with
    | [ Self; K; V ], [] =>
      let* α0 :=
        M.get_method
          "core::default::Default"
          "default"
          [ (* Self *) Ty.apply (Ty.path "core::marker::PhantomData") [ K ] ] in
      let* α1 := M.call α0 [] in
      let* α2 :=
        M.get_method
          "core::default::Default"
          "default"
          [ (* Self *) Ty.apply (Ty.path "core::marker::PhantomData") [ V ] ] in
      let* α3 := M.call α2 [] in
      M.pure
        (Value.StructRecord "dns::Mapping" [ ("_key", α1); ("_value", α3) ])
    | _, _ => M.impossible
    end.

  Axiom Implements :
    forall (K V : Ty.t),
    M.IsTraitInstance
      "core::default::Default"
      (* Self *) (Ty.apply (Ty.path "dns::Mapping") [ K; V ])
      []
      [ ("default", InstanceField.Method default) ]
      [ K; V ].
End Impl_core_default_Default_for_dns_Mapping_K_V.
```

Here are the interesting bits of this code:

- On line 1, we translate the `Mapping` type into a single comment, as the types disappear in our translation and become just markers. The marker for `Mapping` is its absolute name `Ty.path "dns::Mapping"`.
- On line 7, the function `default` takes a list of types&nbsp;`𝜏` as a parameter in case it is polymorphic. Here, this method is not polymorphic, but we still add the&nbsp;`𝜏` parameter for uniformity. We also take three additional type parameters:

  - `Self`
  - `K`
  - `V`

  that represent the `Self` type on which the trait is implemented, and the two type parameters of the `Mapping` type. These will be provided when calling the&nbsp;`default` method.

- On line 11, we use the primitive&nbsp;`M.get_method` (axiomatized for now) to get the method `default` of the trait `core::default::Default` for the type `core::marker::PhantomData<K>`. Here, we see that having access to the type `K` in the body of the `default` function is useful, as it helps us to disambiguate between the various implementations of the `Default` trait instances that we call. Here, we provide the&nbsp;`Self` type of the trait in a list of a single element. If the `Default` trait or the `default` method were polymorphic, we would also append these type parameters in this list.
- On line 15, we call the&nbsp;`default` method instance that we found with an empty list of arguments.
- On line 23, we build a value of type `Mapping` with the two fields `_key` and `_value` initialized with the results of the two calls to the `default` method. We use the `Value.StructRecord` constructor to build the value, and its result is of type `Value.t` like all other Rust values.
- On line 24, we eliminate a case with a wrong number of type and value arguments. This should never happen as the arity of all the function calls is checked by the Rust type-checker.
- On line 27, we state that we have a new instance of the `Default` trait for the `Mapping` type, with the `default` method implemented by the `default` function. This is true for any values of the types `K` and `V`.
- On line 34, we specify that&nbsp;`[K, V]` are the type parameters of this implementation that should be given as extra parameters when calling the `default` method of this instance, together with the&nbsp;`Self` type.

### Polymorphic implementation

Next, we have a polymorphic implementation of mock associated functions for the&nbsp;`Mapping` type:

```rust
impl<K, V> Mapping<K, V> {
    fn contains(&self, _key: &K) -> bool {
        unimplemented!()
    }

    // ...
```

We translate it to:

```coq showLineNumbers
Module Impl_dns_Mapping_K_V.
  Definition Self (K V : Ty.t) : Ty.t :=
    Ty.apply (Ty.path "dns::Mapping") [ K; V ].

  (*
      fn contains(&self, _key: &K) -> bool {
          unimplemented!()
      }
  *)
  Definition contains (𝜏 : list Ty.t) (α : list Value.t) : M :=
    match 𝜏, α with
    | [ Self; K; V ], [ self; _key ] =>
      let* self := M.alloc self in
      let* _key := M.alloc _key in
      let* α0 := M.var "core::panicking::panic" in
      let* α1 := M.read (mk_str "not implemented") in
      let* α2 := M.call α0 [ α1 ] in
      never_to_any α2
    | _, _ => M.impossible
    end.

  Axiom AssociatedFunction_contains :
    forall (K V : Ty.t),
    M.IsAssociatedFunction (Self K V) "contains" contains [ K; V ].

  (* ... *)
```

We follow a similar approach as for the translation of trait implementations, especially regarding the handling of polymorphic type variables. Here are some differences:

- On line 2, we define a `Self` type as a function of the type parameters&nbsp;`K` and&nbsp;`V`. This is useful for avoiding repeating the same type expression later.
- On line 22, we use the predicate `M.IsAssociatedFunction` to state that we have a new associated function `contains` for the `Mapping` type, with the `contains` method implemented by the `contains` function. This is true for any values of the types `K` and `V`. Like for the trait implementations, we explicit the list&nbsp;`[K, V]` that will be given as an extra parameter to the function&nbsp;`contains`.

## Conclusion

In the next blog post, we will see how we continue to translate the examples in full definition mode. There is still a lot to do to get to the same level of Rust support as before, but we are hopeful that our new approach will be more robust and easier to maintain.

If you are interested in formally verifying your Rust projects, do not hesitate to get in touch with us at&nbsp;[&#099;&#111;&#110;&#116;&#097;&#099;&#116;&#064;formal&#046;&#108;&#097;&#110;&#100;](mailto:contact@formal.land)! Formal verification provides the highest level of safety for critical applications. See the [White House report on secure software development](https://www.whitehouse.gov/wp-content/uploads/2024/02/Final-ONCD-Technical-Report.pdf) for more on the importance of formal verification.
