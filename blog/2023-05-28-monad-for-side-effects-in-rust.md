---
title: Monad for side effects in Rust
tags: [coq-of-rust, Rust, Coq, monad, side effects]
---

To formally verify Rust programs, we are building [coq-of-rust](https://github.com/formal-land/coq-of-rust), a translator from Rust&nbsp;🦀 code to the proof system [Coq&nbsp;🐓](https://coq.inria.fr/). We generate Coq code that is as similar as possible to the original Rust code, so that the user can easily understand the generated code and write proofs about it. In this blog post, we explain how we are representing side effects in Coq.

<!-- truncate -->

## 🦀 Side effects in Rust

In programming, [side effects](<https://en.wikipedia.org/wiki/Side_effect_(computer_science)>) are all what is not representable by pure functions (mathematical functions, functions that always return the same output for given input parameters). In Rust there are various kinds of side effects:

- errors (the [panic!](https://doc.rust-lang.org/core/macro.panic.html) macro) that propagate and do appear in the return type of functions,
- non-termination, with some potentially non-terminating loops (never returning a result is considered as a side-effect),
- control-flow, with the `break`, `continue`, `return` keywords, that can jump to a different part of the code,
- memory allocations and memory mutations,
- I/O, with for example the [println!](https://doc.rust-lang.org/std/macro.println.html) macro, that prints a message to the standard output,
- concurrency, with the [thread::spawn](https://doc.rust-lang.org/std/thread/fn.spawn.html) function, that creates a new thread.

## 🐓 Coq, a purely functional language

Like most proof systems, Coq is a purely functional language. This means we need to find an encoding for the side effects. The reason for most proof systems to forbid side effects is to be logically consistent. Otherwise, it would be easy to write a proof of `False` by writing a term that does not terminate for example.

## 🔮&nbsp;Monads in Coq

Monads are a common way to represent side effects in a functional language. A monad is a type constructor `M`:

```coq
Definition M (A : Set) : Set :=
  ...
```

representing computations returning values of type `A`. As an example we can take the error monad of computations that can fail with an error message, using the [Result](https://doc.rust-lang.org/std/result/enum.Result.html) type like in Rust:

```coq
Definition M (A : Set) : Set :=
  Result A string.
```

It must have two operators, `Pure` and `Bind`.

### The `Pure` operator

The `Pure` operator has type:

```coq
Definition Pure {A : Set} (v : A) : M A :=
  ...
```

It lifts a pure value `v` into the monad. For our error monad, the `Pure` operator is:

```coq
Definition Pure {A : Set} (v : A) : M A :=
  Ok v.
```

### The `Bind` operator

The `Bind` operator has type:

```coq
Definition Bind {A B : Set} (e1 : M A) (f : A -> M B) : M B :=
  ...
```

It sequences two computations `e1` with `f`, where `f` is a function that takes the result of `e1` as input and returns a new computation. We also note the `Bind` operator:

```coq
let* x := e1 in
e2
```

assuming that `f` is a function that takes `x` as input and returns `e2`. Requiring this operator for all monads shows that sequencing computations is a very fundamental operation for side effects.

For our error monad, the `Bind` operator is:

```coq
Definition Bind {A B : Set} (e1 : M A) (f : A -> M B) : M B :=
  match e1 with
  | Ok v => f v
  | Err msg => Err msg
  end.
```

## 🚧 State, exceptions, non-termination, control-flow

We use a single monad to represent all the side effects that interest us in Rust. This monad is called&nbsp;`M` and is defined as follows:

```coq
Definition RawMonad `{State.Trait} :=
  ...

Module Exception.
  Inductive t (R : Set) : Set :=
  | Return : R -> t R
  | Continue : t R
  | Break : t R
  | Panic {A : Set} : A -> t R.
  Arguments Return {_}.
  Arguments Continue {_}.
  Arguments Break {_}.
  Arguments Panic {_ _}.
End Exception.
Definition Exception := Exception.t.

Definition Monad `{State.Trait} (R A : Set) : Set :=
  nat -> State -> RawMonad ((A + Exception R) * State).

Definition M `{State.Trait} (A : Set) : Set :=
  Monad Empty_set A.
```

We assume the definition of some `RawMonad` for memory handling that we will describe in a later post. Our monad&nbsp;`M` is a particular case of the monad&nbsp;`Monad` with `R = Empty_set`. It is a combination four monads:

1. The `RawMonad`.
2. A state monad, that takes a `State` as input and a return an updated state as output. The trait `State.Trait` provides read/write operations on the `State` type.
3. An error monad with errors of type `Exception R`. There errors include the `Return`, `Continue`, `Break` and `Panic` constructors. The `Return` constructor is used to return a value from a function. The `Continue` constructor is used to continue the execution of a loop. The `Break` constructor is used to break the execution of a loop. The `Panic` constructor is used to panic with an error message. We implement all these operations as exceptions, even if only `Panic` is really an error, as they behave in the same way: interrupting the execution of the current sub-expression to bubble up to a certain level.
4. A fuel monad for non-termination, with the additional `nat` parameter.

The parameter `R` of the type constructor `Monad` is used to represent the type of values that can be returned in the body of a function. It is the same as the return type of the function. So for a function returning a value of type `A`, we define its body in `Monad A A`. Then, we wrap it in an operator:

```coq
Definition catch_return {A : Set} (e : Monad A A) : M A :=
  ...
```

that catches the `Return` exceptions and returns the value.

## Conclusion

We will see in the next post how we define the `RawMonad` to handle the Rust state of a program and memory allocation.

:::tip Contact

If you have a Rust codebase that you wish to formally verify, or need advice in your work, contact us at&nbsp;[&#099;&#111;&#110;&#116;&#097;&#099;&#116;&#064;formal&#046;&#108;&#097;&#110;&#100;](mailto:contact@formal.land). We will be happy to set up a call with you.

:::
