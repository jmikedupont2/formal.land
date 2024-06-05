---
title: 🐍 Simulation of Python code from traces in Coq
tags: [coq-of-python, Python, Coq, translation, Ethereum, simulation, trace]
authors: []
---

In order to formally verify Python code in Coq our approach is the following:

1. Import Python code in Coq by running [coq-of-python](https://github.com/formal-land/coq-of-python).
2. Write a purely functional simulation in Coq of the code.
3. Show that this simulation is equivalent to the translation.
4. Verify the simulation.

We will show in this article how we can merge the steps 2. and 3. to save time in the verification process. We do so by relying on the proof mode of Coq and unification.

Our mid-term goal is to formally specify the [Ethereum Virtual Machine](https://ethereum.org/en/developers/docs/evm/) (EVM) and prove that this specification is correct according to [reference implementation of the EVM](https://github.com/ethereum/execution-specs) in Python. This would ensure that it is always up-to-date and exhaustive. The code of this project is open-source and available on GitHub: [formal-land/coq-of-python](https://github.com/formal-land/coq-of-python).

<!-- truncate -->

<figure>
  ![Python at work](2024-05-22/python.webp)
</figure>

## Our Python's monad&nbsp;🐍

We put the Python code that we import in Coq in a monad `M` to represent all the features that are hard to express in Coq, mainly the side effects. This monad is a combination of two levels:

- `LowM` for the side effects except the control flow.
- `M` that adds an error monad on top of `LowM` to handle the control flow (exceptions, `break` instruction, ...).

### LowM

Here is the definition of the `LowM` monad in [CoqOfPython.v](https://github.com/formal-land/coq-of-python/blob/main/CoqOfPython/CoqOfPython.v):

```coq
Module Primitive.
  Inductive t : Set -> Set :=
  | StateAlloc (object : Object.t Value.t) : t (Pointer.t Value.t)
  | StateRead (mutable : Pointer.Mutable.t Value.t) : t (Object.t Value.t)
  | StateWrite (mutable : Pointer.Mutable.t Value.t) (update : Object.t Value.t) : t unit
  | GetInGlobals (globals : Globals.t) (name : string) : t Value.t.
End Primitive.

Module LowM.
  Inductive t (A : Set) : Set :=
  | Pure (a : A)
  | CallPrimitive {B : Set} (primitive : Primitive.t B) (k : B -> t A)
  | CallClosure {B : Set} (closure : Data.t Value.t) (args kwargs : Value.t) (k : B -> t A)
  | Impossible.
  Arguments Pure {_}.
  Arguments CallPrimitive {_ _}.
  Arguments CallClosure {_ _}.
  Arguments Impossible {_}.

  Fixpoint bind {A B : Set} (e1 : t A) (e2 : A -> t B) : t B :=
    match e1 with
    | Pure a => e2 a
    | CallPrimitive primitive k => CallPrimitive primitive (fun v => bind (k v) e2)
    | CallClosure closure args kwargs k => CallClosure closure args kwargs (fun a => bind (k a) e2)
    | Impossible => Impossible
    end.
End LowM.
```

This is a monad defined by continuation (the variable&nbsp;`k`):

- We terminate a computation with the primitive `Pure` and some result&nbsp;`a`, that can be any purely functional expression.
- We can call some primitives grouped in `Primitive.t` that are side effects:
  - `StateAlloc` to allocate a new object in the memory,
  - `StateRead` to read an object from the memory,
  - `StateWrite` to write an object in the memory,
  - `GetInGlobals` to read a global variable, doing name resolution. This is a side effects as function definitions in Python do not need to be ordered.
- We can call a closure (an anonymous function) with `CallClosure`. This is required for termination, as we cannot define an eval function on the type of Python values since some do not terminate like the [Ω expression](https://medium.com/@dkeout/why-you-must-actually-understand-the-%CF%89-and-y-combinators-c9204241da7a). See our previous post [Translation of Python code to Coq](/blog/2024/05/10/translation-of-python-code) for our definition of Python values. The combinator `CallClosure` is also very convenient to modularize our proofs: we reason on each closure independently.
- We can mark a code path as unreachable with `Impossible`.

### M

The final monad&nbsp;`M` is defined as:

```coq
Definition M : Set :=
  LowM.t (Value.t + Exception.t).
```

It has no parameters as Python is untyped, so all expressions have the same result type:

- either a success value of type `Value.t`,
- or an exception of type `Exception.t`, with some special cases to represent a `return`, a `break`, or a `continue` instruction.

We define the monadic bind of&nbsp;`M` like for the error monad:

```coq
Definition bind (e1 : M) (e2 : Value.t -> M) : M :=
  LowM.bind e1 (fun v => match v with
  | inl v => e2 v
  | inr e => LowM.Pure (inr e)
  end).
```

## Traces&nbsp;🐾

We define our semantics of a computation&nbsp;`e` of type&nbsp;`M` in [simulations/proofs/CoqOfPython.v](https://github.com/formal-land/coq-of-python/blob/main/CoqOfPython/simulations/proofs/CoqOfPython.v) with the predicate:

```coq
{{ stack, heap | e ⇓ to_value | P_stack, P_heap }}
```

that we call a _run_ or a _trace_, saying that:

- starting from the initial state `stack`, `heap`,
- the computation `e` terminates with a value,
- that is in the image of the function `to_value`,
- and with a final stack and heap that satisfy the predicates `P_stack` and `P_heap`.

Note that we do not explicit the resulting value and memory state of a computation in this predicate. We only say that it exists and verifies a few properties, that are here for compositionality. We have a purely functional function&nbsp;`evaluate` that can derive the result of a run of a computation:

```coq
evaluate :
  forall `{Heap.Trait} {A B : Set}
    {stack : Stack.t} {heap : Heap} {e : LowM.t B}
    {to_value : A -> B} {P_stack : Stack.t -> Prop} {P_heap : Heap -> Prop}
    (run : {{ stack, heap | e ⇓ to_value | P_stack, P_heap }}),
  A * { stack : Stack.t | P_stack stack } * { heap : Heap | P_heap heap }
```

The function `evaluate` is defined in Coq by a `Fixpoint`. Its result is what we call a&nbsp;_simulation_, which is a purely functional definition equivalent to the orignal computation&nbsp;`e` from Python. It is equivalent by construction.

## Building a trace&nbsp;🔨

A trace is an inductive in&nbsp;`Set` that we can build with the following constructors:

```coq
Inductive t `{Heap.Trait} {A B : Set}
    (stack : Stack.t) (heap : Heap)
    (to_value : A -> B) (P_stack : Stack.t -> Prop) (P_heap : Heap -> Prop) :
    LowM.t B -> Set :=
(* [Pure] primitive *)
| Pure
  (result : A)
  (result' : B) :
  result' = to_value result ->
  P_stack stack ->
  P_heap heap ->
  {{ stack, heap |
    LowM.Pure result' ⇓
    to_value
  | P_stack, P_heap }}
(* [StateRead] primitive *)
| CallPrimitiveStateRead
    (mutable : Pointer.Mutable.t Value.t)
    (object : Object.t Value.t)
    (k : Object.t Value.t -> LowM.t B) :
  IsRead.t stack heap mutable object ->
  {{ stack, heap |
    k object ⇓
    to_value
  | P_stack, P_heap }} ->
  {{ stack, heap |
    LowM.CallPrimitive (Primitive.StateRead mutable) k ⇓
    to_value
  | P_stack, P_heap }}
(* [CallClosure] primitive *)
| CallClosure {C : Set}
    (f : Value.t -> Value.t -> M)
    (args kwargs : Value.t)
    (to_value_inter : C -> Value.t + Exception.t)
    (P_stack_inter : Stack.t -> Prop) (P_heap_inter : Heap -> Prop)
    (k : Value.t + Exception.t -> LowM.t B) :
  let closure := Data.Closure f in
  {{ stack, heap |
    f args kwargs ⇓
    to_value_inter
  | P_stack_inter, P_heap_inter }} ->
  (* We quantify over every possible values as we cannot compute the result of the closure here.
      We only know that it exists and respects some constraints in this inductive definition. *)
  (forall value_inter stack_inter heap_inter,
    P_stack_inter stack_inter ->
    P_heap_inter heap_inter ->
    {{ stack_inter, heap_inter |
      k (to_value_inter value_inter) ⇓
      to_value
    | P_stack, P_heap }}
  ) ->
  {{ stack, heap |
    LowM.CallClosure closure args kwargs k ⇓
    to_value
  | P_stack, P_heap }}
(* ...cases for the other primitives of the monad... *)
```

### Pure

In the `Pure` case we return the final result of the computation. We check the state fulfills the predicate `P_stack` and `P_heap`, and that the result is the image by the function `to_value` of some&nbsp;`result`.

### CallPrimitiveStateRead

To read a value in memory, we rely on another predicate `IsRead` that checks if the `mutable` pointer is valid in the `stack` or `heap` and that the `object` is the value at this pointer. We then call the continuation&nbsp;`k` with this object. We have similar rules for allocating a new object in memory and writing at a pointer.

Note that we parameterize all our semantics by `` `{Heap.Trait}`` that provides a specific&nbsp;`Heap` type with read and write primitives. We can choose the implementation of the memory model that we want to use in our simulations in order to simplify the reasoning.

### CallClosure

To call a closure, we first evaluate the closure with the arguments and keyword arguments. We then call the continuation&nbsp;`k` with the result of the closure. We quantify over all possible results of the closure, as we cannot compute it here. This would require to be able to define `Fixpoint` together with `Inductive`, which is not possible in Coq. So we only know that the result of the closure exists, and can use the constraints on its result (the function `to_value` and the predicates `P_stack_inter` and `P_heap_inter`) to build a run of the continuation.

The other constructors are not presented here but are similar to the above. We will also add a monadic primitive for loops with the following idea: we show that a loop terminates by building a trace, as traces are `Inductive` so must be finite. We have no rules for the `Impossible` case so that building the trace of a computation also shows that the `Impossible` calls are in unreachable paths.

## Example&nbsp;🔍

We have applied these technique to a small code example with allocation, memory read, and closure call primitives. We were able to show that the resulting simulation obtained by running&nbsp;`evaluate` on the trace is equal to a simulation written by hand. The proof was just the tactic&nbsp;`reflexivity`. We believe that we can automate most of the tactics used to build a run, except for the allocations were the user needs to make a choice (immediate, stack, or heap allocation, which address, ...).

To continue our experiments we now need to complete our semantics of Python, especially to take into account method and operator calls.

## Conclusion

We have presented an alternative way to build simulations of imperative Python code in purely functional Coq code. The idea is to enable faster reasoning over Python code by removing the need to build explicit simulations. We plan to port this technique to other tools like [coq-of-rust](https://github.com/formal-land/coq-of-rust) as well.

To see what we can do for you talk with us at&nbsp;[&#099;&#111;&#110;&#116;&#097;&#099;&#116;&#064;formal&#046;&#108;&#097;&#110;&#100;](mailto:contact@formal.land)&nbsp;🏇. For our previous projects, see our [formal verification of the Tezos' L1](https://formal-land.gitlab.io/coq-tezos-of-ocaml/)!
