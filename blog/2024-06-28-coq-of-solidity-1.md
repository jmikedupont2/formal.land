---
title: 🪨 Coq of Solidity – part 1
tags: [formal verification, Coq, Solidity, Yul]
authors: []
---

[Solidity](https://soliditylang.org/) is the most widely used **smart contract language** on the blockchain. As smart contracts are **critical software** handling a lot of money, there is a huge interest in finding **all possible bugs** before putting them into production.

:::info AlephZero

_We are happy to be working with [AlephZero](https://alephzero.org/) to develop tools to bring more security for the audit of Solidity smart contracts, thanks to the use of formal verification and the interactive theorem prover [Coq](https://coq.inria.fr/). We thank the Aleph Zero Foundation for their support._

:::

**Formal verification** is a technique to test a program on all possible entries, even when there are **infinitely many**. This contrasts with the traditional test techniques, which can only execute a finite set of scenarios. As such, it appears to be an ideal way to bring more security to smart contract audits.

<!-- Many companies, like [Certora](https://certora.com/) and [CertiK](https://www.certik.io/), are already providing formal verification services for Solidity. -->

In this blog post, we present the **formal verification tool `coq-of-solidity`** that we are developing for Solidity. Its specificities are that:

1. It is open-source (GPL-3 for the translation, MIT for the proofs).
2. It uses an interactive theorem prover, the system Coq, to verify arbitrarily complex properties.

Here, we present how we translate Solidity code into Coq using the intermediate language [Yul](https://docs.soliditylang.org/en/latest/yul.html). We explain the semantics we use and what remains to be done.

The code is available in our fork of the Solidity compiler at [github.com/formal-land/solidity](https://github.com/formal-land/solidity).

<!-- truncate -->

<figure>
  ![Ethereum in forest](2024-06-28/ethereum-in-forest.webp)
</figure>

## Architecture of the tool

We reuse the code of the standard Solidity compiler&nbsp;`solc` in order to make sure that we can stay in sync with the evolutions of the language and be compatible with all the Solidity features. Thus, our most straightforward path to implementing a translation tool from Solidity to Coq was to fork the C++ code of `solc` in [github.com/formal-land/solidity](https://github.com/formal-land/solidity). We add a new&nbsp;`solc`'s flag&nbsp;`--ir-coq` that tells the compiler to also generate a Coq output in addition to the expected EVM bytecode.

At first, we looked at the direct translation from the Solidity language to Coq, but this was getting too complex. We changed our strategy to instead target the Yul language, an intermediate language used by the Solidity compiler to have an intermediate step in its translation to the EVM bytecode. The Yul language is simpler than Solidity and still has a higher level than the EVM bytecode, making it a good target for formal verification. In contrast to the EVM bytecode, there are no explicit stack-manipulation or&nbsp;`goto` instructions in Yul simplifying formal verification.

To give an idea of the size difference between Solidity and Yul, here are the files to export these languages to JSON in the Solidity compiler:

- [ast/ASTJsonExporter.cpp](https://github.com/ethereum/solidity/blob/develop/libsolidity/ast/ASTJsonExporter.cpp): Solidity to JSON, 1127 lines
- [libyul/AsmJsonConverter.cpp](https://github.com/ethereum/solidity/blob/develop/libyul/AsmJsonConverter.cpp): Yul to JSON, 205 lines

The Solidity language appears as more complex than Yul as the code to translate it to JSON is five times longer.

We copied the file `libyul/AsmJsonConverter.cpp` above to make a version that translates Yul to Coq: [libyul/AsmCoqConverter.cpp](https://github.com/formal-land/solidity/blob/guillaume-claret@experiments-with-yul/libyul/AsmCoqConverter.cpp). We reused the code for compilation flags to add a new option&nbsp;`--ir-coq`, which runs the conversion to Coq instead of the conversion to JSON.

## Translation of Yul

To limit the size of the generated Coq code, we translate the Yul code after the optimization passes. This helps to remove boilerplate code but may make the Yul code less relatable to the Solidity sources. Thankfully, the optimized Yul code is still readable in our tests, and the Solidity compiler can pretty-print a version of the optimized Yul code with comments to quote the corresponding Solidity source code.

As an example, here is how we translate the&nbsp;[if keyword](https://docs.soliditylang.org/en/latest/yul.html#if) of Yul:

```cpp
std::string AsmCoqConverter::operator()(If const& _node)
{
	yulAssert(_node.condition, "Invalid if condition.");
	std::string ret = "M.if_ (|\n";
	m_indent++;
	ret += indent() + std::visit(*this, *_node.condition) + ",\n";
	ret += indent() + (*this)(_node.body) + "\n";
	m_indent--;
	ret += indent() + "|)";

	return ret;
}
```

We convert each Yul&nbsp;`_node` to an&nbsp;`std::string` that represents the Coq code. We use the `m_indent` variable to keep track of the indentation level, and the `indent()` function to add the right number of spaces at the beginning of each line. We do not need to add extra parenthesis to disambiguate priorities, as the Yul language is simple enough.

Here is the generated Coq code for the beginning of the [erc20.sol](https://github.com/ethereum/solidity/blob/develop/test/libsolidity/semanticTests/various/erc20.sol) example from the Solidity compiler's test suite:

```coq
(* Generated by solc *)
Require Import CoqOfSolidity.CoqOfSolidity.

Module ERC20_403.
  Definition code : M.t BlockUnit.t :=
    do* ltac:(M.monadic (
      M.function (|
        "allocate_unbounded",
        [],
        ["memPtr"],
        do* ltac:(M.monadic (
          M.assign (|
            ["memPtr"],
            Some (M.call (|
              "mload",
              [
                [Literal.number 64]
              ]
            |))
          |)
        )) in
        M.od
      |)
    )) in
    do* ltac:(M.monadic (
      M.function (|
        "revert_error_ca66f745a3ce8ff40e2ccaf1ad45db7774001b90d25810abd9040049be7bf4bb",
        [],
        [],
        do* ltac:(M.monadic (
          M.expr_stmt (|
            M.call (|
              "revert",
              [
                [Literal.number 0];
                [Literal.number 0]
              ]
            |)
          |)
        )) in
        M.od
      |)
    )) in
    (* ... 6,000 remaining lines ... *)
```

This code is quite verbose, for an original smart contract size of 100 lines of Solidity. As a reference, the corresponding Yul code is 1,000 lines long and starts with:

```go
/// @use-src 0:"erc20.sol"
object "ERC20_403" {
    code {
        function allocate_unbounded() -> memPtr
        { memPtr := mload(64) }
        function revert_error_ca66f745a3ce8ff40e2ccaf1ad45db7774001b90d25810abd9040049be7bf4bb()
        { revert(0, 0) }
        // ... 1,000 remaining lines ...
```

The content is actually the same up to the notations, but we use many more line breaks and keywords in the Coq version.

## Runtime in Coq

Now that the code is translated in Coq, we need to define a _runtime_ for the Coq code. This means giving a definition for all the functions and types that are used in the generated code, like `M.t BlockUnit.t`, `M.monadic`, `M.function`, ... This runtime gives the semantics of the Yul language, that is to say, the meaning of all the primitives of the language.

### Notation

We first define a monadic notation `ltac:(M.monadic ...)` to make a [monadic transformation](https://xavierleroy.org/mpri/2-4/monads.pdf) on the generated code. We reuse here what we have done for our [Rust translation to Coq](https://github.com/formal-land/coq-of-rust), which we describe in our blog post [🦀 Monadic notation for the Rust translation](/blog/2024/04/03/monadic-notation-for-rust-translation). The notation:

```coq
f (| x_1, ..., x_n |)
```

corresponds to the call of a monadic function. The tactic `M.monadic` automatically chains all these calls using the monadic bind operator.

The `do* ... in ...` is another monadic notation to chain monadic expressions, directly calling the monadic bind. This notation is more explicit, and we use it in combination with the `ltac:(M.monadic ...)` notation as it might be more efficient to type-check very large files.

### Monad

To represent the side effects in Yul, we use the following Coq monad, that we define in [CoqOfSolidity/CoqOfSolidity.v](https://github.com/formal-land/solidity/blob/guillaume-claret%40experiments-with-yul/CoqOfSolidity/CoqOfSolidity.v):


```coq
Module U256.
  Definition t := Z.
End U256.

Module Environment.
  Record t : Set := {
    caller : U256.t;
    (** Amount of wei sent to the current contract *)
    callvalue : U256.t;
    calldata : list Z;
    (** The address of the contract. *)
    address : U256.t;
  }.
End Environment.

Module BlockUnit.
  (** The return value of a code block. *)
  Inductive t : Set :=
  (** The default value in case of success *)
  | Tt
  (** The instruction `break` was called *)
  | Break
  (** The instruction `continue` was called *)
  | Continue
  (** The instruction `leave` was called *)
  | Leave.
End BlockUnit.

Module Result.
  (** A wrapper for the result of an expression or a code block. We can either return a normal value
      with [Ok], or a special instruction [Return] that will stop the execution of the contract. *)
  Inductive t (A : Set) : Set :=
  | Ok (output : A)
  | Return (p s : U256.t)
  | Revert (p s : U256.t).
  Arguments Ok {_}.
  Arguments Return {_}.
  Arguments Revert {_}.
End Result.

Module Primitive.
  (** We group together primitives that share being impure functions operating over the state. *)
  Inductive t : Set -> Set :=
  | OpenScope : t unit
  | CloseScope : t unit
  | GetVar (name : string) : t U256.t
  | DeclareVars (names : list string) (values : list U256.t) : t unit
  | AssignVars (names : list string) (values : list U256.t) : t unit
  | MLoad (address length : U256.t) : t (list Z)
  | MStore (address : U256.t) (bytes : list Z) : t unit
  | SLoad (address : U256.t) : t U256.t
  | SStore (address value : U256.t) : t unit
  | RLoad : t (list Z)
  | TLoad (address : U256.t) : t U256.t
  | TStore (address value : U256.t) : t unit
  | Log (topics : list U256.t) (payload : list Z) : t unit
  | GetEnvironment : t Environment.t
  | GetNonce : t U256.t
  | GetCodedata (address : U256.t) : t (list Z)
  | CreateAccount (address code : U256.t) (codedata : list Z) : t unit
  | UpdateCodeForDeploy (address code : U256.t) : t unit
  | LoadImmutable (name : U256.t) : t U256.t
  | SetImmutable (name value : U256.t) : t unit
  (** The call stack is there to debug the semantics of Yul. *)
  | CallStackPush (name : string) (arguments : list (string * U256.t)) : t unit
  | CallStackPop : t unit.
End Primitive.

Module LowM.
  Inductive t (A : Set) : Set :=
  | Pure (output : A)
  | Primitive {B : Set}
      (primitive : Primitive.t B)
      (k : B -> t A)
  | DeclareFunction
      (name : string)
      (body : list U256.t -> t (Result.t (list U256.t)))
      (k : t A)
  | CallFunction
      (name : string)
      (arguments : list U256.t)
      (k : Result.t (list U256.t) -> t A)
  | Loop {B : Set}
      (body : t B)
      (** The final value to return if we decide to break of the loop. *)
      (break_with : B -> option B)
      (k : B -> t A)
  | CallContract
      (address : U256.t)
      (value : U256.t)
      (input : list Z)
      (k : U256.t -> t A)
  (** Explicit cut in the monadic expressions, to provide better composition for the proofs. *)
  | Let {B : Set} (e1 : t B) (k : B -> t A)
  | Impossible (message : string).
End LowM.

Module M.
  Definition t (A : Set) := LowM.t (Result.t A).
```

The only type for values in Yul is the 256-bit unsigned integer `U256.t` that we represent with the `Z` type of Coq. The `BlockUnit.t` type represents the possible outcomes of a block of code:

- `Ok` for the normal ending;
- `Break` or `Continue` to propagate a premature return from a call to the `break` or `continue` primitives;
- `Leave` to propagate the call to the `leave` primitive to terminate a function.

We define the monad in two steps. First, we define the `LowM.t` monad parameterized by the type of output `A`. The monad has the following constructors:

- `Pure` to return a value without side effects;
- `Primitive` to execute one of the primitive, that are functions operating over the state (defined later);
- `DeclareFunction` to declare a function with a name and a body, which is a function taking a list of arguments and returning a list of results, as this is the case in Yul;
- `CallFunction` to call a function by its name with a list of arguments;
- `Loop` to execute a block of code in a loop, with a function to decide if we should break the loop, helpful to implement the `for` construct;
- `CallContract` a dedicated primitive to implement the `call` instruction of the EVM to call another contract located at a certain address;
- `Let` to compose two monadic expressions in a more explicit way than using the continuations;
- `Impossible` to signal an unexpected branch in the code.

This monad is purely descriptive. We give the list of primitives but we do not explain here how each operator behaves. Most of the primitives take a continuation `k`, which is a function from the output of the primitive to the rest of the code. This is a way to chain the primitives together. For convenience we define a monadic bind&nbsp;`let_` that chains these continuations to chain two monadic expressions.

Then we define a monad&nbsp;`M.t` as:
```coq
Module M.
  Definition t (A : Set) := LowM.t (Result.t A).
```

to represent calculations that return a `Result.t` to take into account that a contract might return or revert at any point in its execution.

Finally, we define the Yul keywords from these primitives. For example, for the `if` keyword:

```coq
Definition if_ (condition : list U256.t) (success : t BlockUnit.t) : t BlockUnit.t :=
  match condition with
  | [0] => pure BlockUnit.Tt
  | [_] => success
  | _ => LowM.Impossible "if: expected a single value as condition"
  end.
```

### Evaluation rules

To define how to run the primitives of the Yul's monad, we use evaluation rules in [CoqOfSolidity/simulations/CoqOfSolidity.v](https://github.com/formal-land/solidity/blob/guillaume-claret%40experiments-with-yul/CoqOfSolidity/simulations/CoqOfSolidity.v):

```coq
Module Run.
  Reserved Notation "{{ environment , state | e ⇓ output | state' }}"
    (at level 70, no associativity).

  Inductive t {A : Set} (environment : Environment.t) (state : State.t) (output : A) :
      LowM.t A -> State.t -> Prop :=
  | Pure : {{ environment, state | LowM.Pure output ⇓ output | state }}
  | Primitive {B : Set} (primitive : Primitive.t B) (k : B -> LowM.t A) value state_inter state' :
    inl (value, state_inter) = eval_primitive environment primitive state ->
    {{ environment, state_inter | k value ⇓ output | state' }} ->
    {{ environment, state | LowM.Primitive primitive k ⇓ output | state' }}
  | DeclareFunction name body k stack_inter state' :
    inl stack_inter = Stack.declare_function state.(State.stack) name body ->
    let state_inter := state <| State.stack := stack_inter |> in
    {{ environment, state_inter | k ⇓ output | state' }} ->
    {{ environment, state | LowM.DeclareFunction name body k ⇓ output | state' }}
  | CallFunction name arguments k results state_inter state' :
    let function := Stack.get_function state.(State.stack) name in
    {{ environment, state | function arguments ⇓ results | state_inter }} ->
    {{ environment, state_inter | k results ⇓ output | state' }} ->
    {{ environment, state | LowM.CallFunction name arguments k ⇓ output | state' }}
  | Let {B : Set} (e1 : LowM.t B) k state_inter output_inter state' :
    {{ environment, state | e1 ⇓ output_inter | state_inter }} ->
    {{ environment, state_inter | k output_inter ⇓ output | state' }} ->
    {{ environment, state | LowM.Let e1 k ⇓ output | state' }}

  where "{{ environment , state | e ⇓ output | state' }}" :=
    (t environment state output e state').
End Run.
```

We use the notation:

```coq
{{ environment , state | e ⇓ output | state' }}
```

to say that a certain monadic expression&nbsp;`e` evaluates to the value&nbsp;`output`, with the environment&nbsp;`environment`, the initial state&nbsp;`state`, and the final state&nbsp;`state'`. We define the evaluation rules for each primitive of the monad.

### Evaluation function

We also define an evaluation function that will be useful in further tests to extract the Coq code back to OCaml and run tests to compare its behavior with the original Yul code. We define the evaluation function as follows:

```coq
(** A function to evaluate an expression given enough [fuel]. *)
Fixpoint eval {A : Set}
    (fuel : nat)
    (environment : Environment.t)
    (e : LowM.t A) :
    State.t -> (A + string) * State.t :=
  match fuel with
  | O => fun state => (inr "out of fuel", state)
  | S fuel =>
    match e with
    | LowM.Pure output => fun state => (inl output, state)
    | LowM.Primitive primitive k =>
      fun state =>
      let value_state := eval_primitive environment primitive state in
      match value_state with
      | inl (value, state) => eval fuel environment (k value) state
      | inr error => (inr error, state)
      end
    | LowM.DeclareFunction name body k =>
      (* ... other cases ... *)
```

It uses a&nbsp;`fuel` parameter to make sure that the evaluation terminates. For a monadic expression&nbsp;`e` and an initial state and environment, it returns either the value of the expression or an error message, as well as a final state. The error might be due to an unexpected branch in the code, like a&nbsp;`break` outside a loop, or to a lack of fuel. We plan to prove that it is equivalent to the evaluation rules defined above.

## Testing

To test that our translation works, we ran it on all the Solidity files in the test suite of the Solidity compiler. There are, at the time of writing, 4856 `.sol` example files in the [semanticTests](https://github.com/ethereum/solidity/tree/develop/test/libsolidity/semanticTests) and [syntaxTests](https://github.com/ethereum/solidity/tree/develop/test/libsolidity/syntaxTests) folders. On each of them we run the Solidity compiler with the `--ir-coq` flag to generate the Coq code. This works for most of the test files, although some of the test files have a special format that combine several Solidity files into one file that we do not handle yet. Then type-check the generated code with Coq, what succeeds for all the Solidity files we translate.

A more complex check is to ensure that our semantics is correct, that is to say that when we run our `eval` function in Coq on a smart contract, we get the same output as running this smart contract on an actual EVM once compiled with the Solidity compiler. We have a mechanism to extract the expected execution traces in the semantic tests to equivalent checks in Coq. We succeed in more than 90% of the test cases now. There are still a few builtin functions that we need to implement, like pre-compiled contracts.

## Existing solutions

There are already a few formal verification tools for Solidity, as smart contracts are an important kind of program to check. A few of them, like the [Certora Prover](https://www.certora.com/), are closed source. Most work at the EVM bytecode level, as the semantics of the EVM is simpler than the semantics of Solidity. A disadvantage of working at the EVM level is that this is a low-level language, so the code is hard to understand (explicit stack manipulations, ...). This is the reason why we believe this approach is mostly used with automated verification tools.

It is hard to have a rather complete support for the Solidity language, despite of many attempts including [one of ours](https://gitlab.com/formal-land/coq-of-solidity). We can cite the [Verisol](https://github.com/microsoft/verisol) project from Microsoft to verify Solidity programs.

The Yul language offers a good compromise between the high-level Solidity language and the low-level EVM bytecode. It was actually designed with *formal verification in mind*, according to its documentation. These [notes](https://hackmd.io/@FranckC/BJz02K4Za) from [Franck Cassez](https://franck44.github.io/) give a good overview of the formal verification efforts for Yul. One of the conclusions is that a lot of the existing work is either incomplete/unmaintained or not designed for the formal verification of smart contracts, but rather to verify the Yul language itself. As a result, they propose a formal verification framework for Yul in [Dafny](https://dafny.org/) with [yul-dafny](https://github.com/franck44/yul-dafny).

:::warning For more

If you have smart contract projects that you want to formally verify, going further than a manual audit to find bugs, contact us at&nbsp;[&#099;&#111;&#110;&#116;&#097;&#099;&#116;&#064;formal&#046;&#108;&#097;&#110;&#100;](mailto:contact@formal.land)! Formal verification has the strong advantage of covering all possible execution cases.

:::

## Conclusion

We have presented our ongoing development of a formal verification tool for Solidity using the Coq proof assistant. We have briefly shown how we translate Solidity code to Coq using the Yul intermediate language and how we define the semantics of Yul in Coq. We have tested our tool on the examples of the Solidity compiler's test suite to check that our formalization is correct.

Our next steps will be to:

1. Complete our definitions of the Ethereum's primitives, to have a 100% success on the Solidity test suite.
2. Formally specify and verify an example of contract, looking at the [erc20.sol](https://github.com/formal-land/solidity/blob/guillaume-claret%40experiments-with-yul/test/libsolidity/semanticTests/various/erc20.sol) example.
