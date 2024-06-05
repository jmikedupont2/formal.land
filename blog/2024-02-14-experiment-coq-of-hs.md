---
title: λ Experiment on translation from Haskell to Coq
tags: [coq-of-hs, Haskell, Coq, translation]
authors: []
---

We present an experiment [coq-of-hs](https://github.com/formal-land/coq-of-hs-experiment) that we have made on the translation of [Haskell](https://www.haskell.org/) programs to the proof system [Coq&nbsp;🐓](https://coq.inria.fr/). The goal is to formally verify Haskell programs to make them totally bug-free.

Indeed, even with the use of a strict type system, there can still be bugs for properties that cannot be expressed with types. An example of such a property is the backward compatibility of an API endpoint for the new release of a web service when there has been code refactoring. Only formal verification can cover all execution cases and kinds of properties.

The code of the tool is at: [github.com/formal-land/coq-of-hs-experiment](https://github.com/formal-land/coq-of-hs-experiment) (AGPL license)

<!-- truncate -->

:::tip Contact

We propose tools to make your codebase totally bug-free. Contact us at&nbsp;[&#099;&#111;&#110;&#116;&#097;&#099;&#116;&#064;formal&#046;&#108;&#097;&#110;&#100;](mailto:contact@formal.land) for more information! We offer a free audit to assess the feasibility of formal verification for your case.

:::

:::info Info

We estimate that the cost of formal verification should be 20% of the development cost. There are no reasons to still have bugs today!

:::

![Haskell Logo](2024-02-14/haskell_logo.svg)

## Goal of the experiment

There are already some tools to formally verify Haskell programs:

- [🐓 hs-to-coq](https://github.com/plclub/hs-to-coq) translation from Haskell to Coq
- [💧 Liquid Haskell](https://en.wikipedia.org/wiki/Liquid_Haskell) verification using [SMT solvers](https://en.wikipedia.org/wiki/Satisfiability_modulo_theories)

In this experiment, we want to check the feasibility of translation from Haskell to Coq:

- 👍 covering all the language without manual configuration or code changes,
- 👎 even if this is at the cost of a more verbose and low-level translation.

## Example

Here is an example of a Haskell function:

```haskell
fixObvious :: (a -> a) -> a
fixObvious f = f (fixObvious f)
```

that `coq-of-hs` translates to this valid Coq code:

```coq
CoFixpoint fixObvious : Val.t :=
  (Val.Lam (fun (f : Val.t) => (Val.App f (Val.App fixObvious f)))).
```

## Infrastructure

We read the [Haskell Core](https://serokell.io/blog/haskell-to-core) representation of Haskell using the GHC plugin system. Thus, we read the exact same code version as the one that is compiled down to assembly code by [GHC](https://www.haskell.org/ghc/), to take into account all compilation options.

Haskell Core is an intermediate representation of Haskell that is close to the lambda calculus and used by the Haskell compiler for various optimizations passes. Here are all the constructors of the&nbsp;`Expr` type of Haskell Core:

```haskell
data Expr b
  = Var   Id
  | Lit   Literal
  | App   (Expr b) (Arg b)
  | Lam   b (Expr b)
  | Let   (Bind b) (Expr b)
  | Case  (Expr b) b Type [Alt b]
  | Cast  (Expr b) Coercion
  | Tick  (Tickish Id) (Expr b)
  | Type  Type
  | Coercion Coercion
```

This paper [System FC, as implemented in GHC](https://repository.brynmawr.edu/cgi/viewcontent.cgi?article=1015&context=compsci_pubs) presents it as [System F](https://en.wikipedia.org/wiki/System_F) plus coercions. We translate Haskell code to an untyped version of the lambda calculus in Coq, with co-induction to allow for infinite data structures:

```coq
Module Val.
  #[bypass_check(positivity)]
  CoInductive t : Set :=
  | Lit (_ : Lit.t)
  | Con (_ : string) (_ : list t)
  | App (_ _ : t)
  | Lam (_ : t -> t)
  | Case (_ : t) (_ : t -> list (Case.t t))
  | Impossible.
End Val.
```

We make the translation by induction over the Haskell Core representation, and we translate each constructor to a corresponding constructor of the Coq representation. We pretty-print the Coq code directly without using an intermediate representation. We use the [prettyprinter](https://github.com/quchen/prettyprinter) package with the two main following primitives:

```haskell
concatNest :: [Doc ()] -> Doc ()
concatNest = group . nest 2 . vsep

concatGroup :: [Doc ()] -> Doc ()
concatGroup = group . vsep
```

to display a sub-term with or without indentation when splitting lines that are too long. This translation works well on all the Haskell expressions that we have tested.

## Missing features

### Semantics

We have not yet defined a semantics. For now, the terms that we generate in Coq are purely descriptive. We will wait to have examples of things to verify to define semantics that are practical to use.

### Type-classes

We have not yet translated typeclasses. The Haskell Core language hides most of the typeclasses-related code. For example, it represents instances as additional function parameters for functions that have a typeclass constraints. But we still need to declare the functions corresponding to the member of the typeclasses, what we have not done yet.

### Multi-file projects

We have not yet implemented the translation of multi-file projects. We have only tested the translation of a single-file project.

### Standard library

Similarly to the handling of multi-file projects, we have not yet tested the translation of projects using external libraries or translating the base library of Haskell.

### Strict positivity

We had to turn off the strict positivity condition for the definition of&nbsp;`Val.t` in Coq with:

```coq
#[bypass_check(positivity)]
```

This is for to the case:

```coq
| Lam (_ : t -> t)
```

where&nbsp;`t` appears as a parameter of a function (negative position). We do not know if this causes any problem in practice, on values that correspond to well-typed Haskell programs.

## Conclusion

We have presented an experiment on the translation of Haskell programs to Coq. If you are interested in this project, please get in touch with us at&nbsp;[&#099;&#111;&#110;&#116;&#097;&#099;&#116;&#064;formal&#046;&#108;&#097;&#110;&#100;](mailto:contact@formal.land) or go to the [GitHub repository](https://github.com/formal-land/coq-of-hs-experiment) of the project.
