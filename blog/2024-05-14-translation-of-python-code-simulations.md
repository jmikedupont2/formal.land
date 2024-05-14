---
title: Simulation of Python code in Coq
tags: [coq-of-python, Python, Coq, translation, Ethereum]
authors: []
---

We are continuing to specify the [Ethereum Virtual Machine](https://ethereum.org/en/developers/docs/evm/) (EVM) in the formal verification language&nbsp;[Coq](https://coq.inria.fr/). We are working from the [automatic translation in Coq](https://github.com/formal-land/coq-of-python/tree/main/CoqOfPython/ethereum) of the [reference implementation of the EVM](https://github.com/ethereum/execution-specs), which is written in the language [Python](https://www.python.org/).

In this article, we will see how we specify the EVM in Coq by writing an interpreter that closely mimics the behavior of the Python code. We call that implementation a _simulation_ as it aims to reproduce the behavior of the Python code, the reference.

In contrast to the automatic translation from Python, the simulation is a manual translation written in idiomatic Coq. We expect it to be ten times smaller in lines compared to the automatic translation, and of about the same size as the Python code. This is because the automatic translation needs to encode all the Python specific features in Coq, like variable mutations and the class system.

In the following article, we will show how we can prove that the simulation is correct, meaning that it behaves exactly as the automatic translation.

The code of this project is open-source and available on GitHub: [formal-land/coq-of-python](https://github.com/formal-land/coq-of-python). This work follows a call from [Vitalik Buterin](https://en.wikipedia.org/wiki/Vitalik_Buterin) for more formal verification of the Ethereum's code.

<!-- truncate -->

<figure>
  ![Python writing simulations](2024-05-14/python_simulation.webp)
</figure>

## The `add` function 🧮

We focus on a simulation for the `add` function in [vm/instructions/arithmetic.py](https://github.com/ethereum/execution-specs/blob/master/src/ethereum/paris/vm/instructions/arithmetic.py) that implements the addition primitive of the EVM. The Python code is:

```python
def add(evm: Evm) -> None:
    """
    Adds the top two elements of the stack together, and pushes the result back
    on the stack.

    Parameters
    ----------
    evm :
        The current EVM frame.

    """
    # STACK
    x = pop(evm.stack)
    y = pop(evm.stack)

    # GAS
    charge_gas(evm, GAS_VERY_LOW)

    # OPERATION
    result = x.wrapping_add(y)

    push(evm.stack, result)

    # PROGRAM COUNTER
    evm.pc += 1
```

Most of the functions of the interpreter are written in this style. They take the global state of the interpreter, called `Evm` as input, and mutate it with the effect of the current instruction.

The `Evm` structure is defined as:

```python
@dataclass
class Evm:
    """The internal state of the virtual machine."""

    pc: Uint
    stack: List[U256]
    memory: bytearray
    code: Bytes
    gas_left: Uint
    env: Environment
    valid_jump_destinations: Set[Uint]
    logs: Tuple[Log, ...]
    refund_counter: int
    running: bool
    message: Message
    output: Bytes
    accounts_to_delete: Set[Address]
    touched_accounts: Set[Address]
    return_data: Bytes
    error: Optional[Exception]
    accessed_addresses: Set[Address]
    accessed_storage_keys: Set[Tuple[Address, Bytes32]]
```

It contains the current instruction pointer `pc`, the stack of the EVM, the memory, the code, the gas left, ...

As the EVM is a stack-based machine, the addition function does the following:

1. It pops the two top elements of the stack `x` and `y`,
2. It charges a very low amount of gas,
3. It computes the result of the addition `result = x + y`,
4. It pushes the result back on the stack,
5. It increments the program counter `pc`.

Note that all these operations might fail and raise an exception, for example,if the stack is empty when we pop&nbsp;`x`and&nbsp;`y` at the beginning.

## Monad for the simulations&nbsp;🧪

The main side-effects that we want to integrate into the Coq simulations are:

- the mutation of the global state `Evm`,
- the raising of exceptions.

For that, we use a state and error monad `MS?`:

```coq
Module StateError.
  Definition t (State Error A : Set) : Set :=
    State -> (A + Error) * State.

  Definition return_ {State Error A : Set}
      (value : A) :
      t State Error A :=
    fun state => (inl value, state).

  Definition bind {State Error A B : Set}
      (value : t State Error A)
      (f : A -> t State Error B) :
      t State Error B :=
    fun state =>
      let (value, state) := value state in
      match value with
      | inl value => f value state
      | inr error => (inr error, state)
      end.
End StateError.

Notation "MS?" := StateError.t.
```

We parametrize it by an equivalent definition in Coq of the type `Evm` and the type of exceptions that we might raise.

In Python the exceptions are a class that is extended as needed to add new kinds of exceptions. We use a closed sum type in Coq to represent the all possible exceptions that might happen in the EVM interpreter.

For the `Evm` state, some functions might actually only modify a part of it. For example, the `pop` function only modifies the `stack` field. We use a mechanism of [lens](https://medium.com/javascript-scene/lenses-b85976cb0534) to specialize the state monad to only modify a part of the state. For example, the `pop` function has the type:

```coq
pop : MS? (list U256.t) Exception.t U256.t
```

where `list U256.t` is the type of the stack, while the `add` function has type:

```coq
add : MS? Evm.t Exception.t unit
```

We define a lens for the stack in the `Evm` type with:

```coq
Module Lens.
  Record t (Big_A A : Set) : Set := {
    read : Big_A -> A;
    write : Big_A -> A -> Big_A
  }.
End Lens.

Module Evm.
  Module Lens.
    Definition stack : Lens.t Evm.t (list U256.t) := {|
      Lens.read := (* ... *);
      Lens.write := (* ... *);
    |}.
```

We can then lift the `pop` function to be used in a context where the `Evm` state is modified with:

```coq
letS? x := StateError.lift_lens Evm.Lens.stack pop in
```

## Typing discipline 👮

We keep in Coq all the type names from the Python source code. When a new class is created we create a new Coq type. When the class inherits from another one, we add a field in the Coq type to represent the parent class. Thus we work by composition rather than inheritance.

Here is an example of the primitive types defined in [base_types.py](https://github.com/ethereum/execution-specs/blob/master/src/ethereum/base_types.py):

```python
class FixedUint(int):
    MAX_VALUE: ClassVar["FixedUint"]

    # ...

    def __add__(self: T, right: int) -> T:
        # ...

class U256(FixedUint):
    MAX_VALUE = 2**256 - 1

    # ...
```

We simulate it by:

```coq
Module FixedUint.
  Record t : Set := {
    MAX_VALUE : Z;
    value : Z;
  }.

  Definition __add__ (self right_ : t) : M? Exception.t t :=
    (* ... *).
End FixedUint.

Module U256.
  Inductive t : Set :=
  | Make (value : FixedUint.t).

  Definition of_Z (value : Z) : t :=
    Make {|
      FixedUint.MAX_VALUE := 2^256 - 1;
      FixedUint.value := value;
    |}.

  (* ... *)
End U256.
```

For the imports, that are generally written with an explicit list of names:

```python
from ethereum.base_types import U255_CEIL_VALUE, U256, U256_CEIL_VALUE, Uint
```

we follow the same pattern in Coq:

```coq
Require ethereum.simulations.base_types.
Definition U255_CEIL_VALUE := base_types.U255_CEIL_VALUE.
Module U256 := base_types.U256.
Definition U256_CEIL_VALUE := base_types.U256_CEIL_VALUE.
Module Uint := base_types.Uint.
```

This is a bit more verbose than the usual way in Coq to import a module, but it makes the translation more straightforward.

## Final simulation 🪶

Finally, our Coq simulation of the `add` function is the following:

```coq
Definition add : MS? Evm.t Exception.t unit :=
  (* STACK *)
  letS? x := StateError.lift_lens Evm.Lens.stack pop in
  letS? y := StateError.lift_lens Evm.Lens.stack pop in

  (* GAS *)
  letS? _ := charge_gas GAS_VERY_LOW in

  (* OPERATION *)
  let result := U256.wrapping_add x y in

  letS? _ := StateError.lift_lens Evm.Lens.stack (push result) in

  (* PROGRAM COUNTER *)
  letS? _ := StateError.lift_lens Evm.Lens.pc (fun pc =>
    (inl tt, Uint.__add__ pc (Uint.Make 1))) in

  returnS? tt.
```

We believe that it has a size and readability close to the original Python code. You can look at this definition in [vm/instructions/simulations/arithmetic.v](https://github.com/formal-land/coq-of-python/blob/main/CoqOfPython/ethereum/paris/vm/instructions/simulations/arithmetic.v). As a reference, the automatic translation is&nbsp;65&nbsp;lines long and in [vm/instructions/arithmetic.v](https://github.com/formal-land/coq-of-python/blob/main/CoqOfPython/ethereum/paris/vm/instructions/arithmetic.v).

## Conclusion

We have seen how to write a simulation for one example of a Python function. We now need to do it for the rest of the code of the interpreter. We wil also see in a following article how to prove that the simulation behaves as the automatic translation of the Python code in Coq.

For our formal verification services, reach us at&nbsp;[&#099;&#111;&#110;&#116;&#097;&#099;&#116;&#064;formal&#046;&#108;&#097;&#110;&#100;](mailto:contact@formal.land)&nbsp;🏇! To know more about what we have done, see [our previous project](https://formal-land.gitlab.io/coq-tezos-of-ocaml/) on the verification of the L1 of Tezos.
