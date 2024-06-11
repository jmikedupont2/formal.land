---
title: 🪨 Coq of Solidity (part 1)
tags: [formal verification, Coq, Solidity, Yul]
authors: []
---

[Solidity](https://soliditylang.org/) is the most widely used **smart contract language** for the [Ethereum blockchain](https://ethereum.org/). As smart contracts are **critical software** handling a lot of money, there is a huge interest in finding **all possible bugs** before putting them into production.

**Formal verification** is a technique to test a program on all possible entries, even if there are **infinite possibilities**, thanks to the use of **mathematical methods**. As such, it appears to be an ideal way to guarantee the absence of bugs in a smart contract. Many companies, like [Certora](https://certora.com/) and [CertiK](https://www.certik.io/), are already providing formal verification services for Solidity.

In this blog post, we present our ongoing development of a **formal verification tool for Solidity** using the [Coq proof assistant](https://coq.inria.fr/). We show how we translate Solidity code into Coq using the intermediate language [Yul](https://docs.soliditylang.org/en/latest/yul.html). We explain how we achieved to translate all the examples of the [Solidity compiler](https://github.com/ethereum/solidity)'s test suite to valid Coq code, the semantics we defined and what remained to be done.

The code is available under GPLv3 license in our fork of the Solidity compiler at [github.com/formal-land/solidity](https://github.com/formal-land/solidity/pull/3).

<!-- truncate -->

<figure>
  ![Ethereum in forst](2024-06-11/ethereum-in-forest.webp)
</figure>

## Architecture of the tool

We reuse the code of the standard Solidity compiler&nbsp;`solc` in order to make sure that we can stay in sync with the evolutions of the language and to be compatible with all the Solidity features. Thus, our most straightforward path to implementing a translation tool from Solidity to Coq was to fork the C++ code of `solc` in [github.com/formal-land/solidity](https://github.com/formal-land/solidity). We add a new&nbsp;`solc`'s flag&nbsp;`--ir-coq` that tells the compiler to also generate a Coq output in addition to the expected EVM bytecode.

At first, we looked at the direct translation from the Solidity language to Coq, but this was getting too complex. We changed our strategy to instead target the Yul language, an intermediate language used by the Solidity compiler to have an intermediate step in its translation to the EVM bytecode. The Yul language is simpler than Solidity and still has a higher level than the EVM bytecode, making it a good target for formal verification. In contrast to the EVM bytecode, there are no explicit stack-manipulation or&nbsp;`goto` instructions in Yul, which makes it easier to reason about.

To give an idea of the size difference between Solidity and Yul, here are the files to export these languages to JSON in the Solidity compiler:

- [ast/ASTJsonExporter.cpp](https://github.com/ethereum/solidity/blob/develop/libsolidity/ast/ASTJsonExporter.cpp): Solidity to JSON, 1127 lines
- [libyul/AsmJsonConverter.cpp](https://github.com/ethereum/solidity/blob/develop/libyul/AsmJsonConverter.cpp): Yul to JSON, 205 lines

We copied the file above that translates Yul to JSON to make a version that outputs Coq code instead: [libyul/AsmCoqConverter.cpp](https://github.com/formal-land/solidity/blob/guillaume-claret@experiments-with-yul/libyul/AsmCoqConverter.cpp). We reused the code for compilation flags to add a new option&nbsp;`--ir-coq`, which runs the conversion to Coq instead of the conversion to JSON.

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

The content is actually the same up to the notations, but we use many more line breaks in the Coq version.

## Runtime in Coq

Now that the code is translated in Coq, we need to define a "runtime" for the Coq code. This means giving a definition for all the functions and types that are used in the generated code, like `M.t BlockUnit.t`, `M.monadic`, `M.function`, ... This runtime gives the semantics of the Yul language, that is to say the meaning of all the primitives of the language.

### Notation

We first define a monadic notation `ltac:(M.monadic ...)` that does not require a monadic transformation of the generated code. We reuse here what we have done for our Rust translation to Coq, which we describe in our blog post [🦀 Monadic notation for the Rust translation](/blog/2024/04/03/monadic-notation-for-rust-translation). The notation:

```coq
f (| x_1, ..., x_n |)
```

corresponds to the call of a monadic function. The tactic `M.monadic` automatically chains all these calls using the monadic bind operator.

The `do* ... in ...` is another monadic notation to chain monadic expressions, directly calling the monadic bind. This notation is more explicit, and we use it in combination with the `ltac:(M.monadic ...)` notation as it might be more efficient to type-check very large files.

### Monad

To represent the side effects in Yul, we use the following Coq monad, which is given in [CoqOfSolidity/CoqOfSolidity.v](https://github.com/formal-land/solidity/blob/guillaume-claret%40experiments-with-yul/CoqOfSolidity/CoqOfSolidity.v):

```coq
Module U256.
  Definition t := Z.
End U256.

Module BlockUnit.
  Inductive t : Set :=
  | Ok
  | Break
  | Continue
  | Leave.
End BlockUnit.

Module M.
  Inductive t (A : Set) : Set :=
  | Pure (output : A)
  | GetVar
      (name : string)
      (k : U256.t -> t A)
  | SetVar
      (names : list string)
      (values : list U256.t)
      (k : t A)
  | CallFunction
      (name : string)
      (arguments : list U256.t)
      (k : list U256.t -> t A)
  | DeclareFunction
      (name : string)
      (body : list U256.t -> t (list U256.t))
      (k : t A)
  | Impossible (message : string).
  Arguments Pure {_}.
  Arguments GetVar {_}.
  Arguments SetVar {_}.
  Arguments CallFunction {_}.
  Arguments DeclareFunction {_}.
  Arguments Impossible {_}.

  (* ... auxiliary functions ... *)
End M.
```
The only type for values in Yul is the 256-bit unsigned integer `U256.t` that we represent with the `Z` type of Coq. The `BlockUnit.t` type represents the possible outcomes of a block of code:

- `Ok` for the normal ending;
- `Break` or `Continue` to propagate a premature return from a call to the `break` or `continue` primitives;
- `Leave` to propagate the call to the `leave` primitive to terminate a function.

Finally, we define the `M.t` monad parameterized by the type of output `A`. The monad has the following constructors:

- `Pure` to return a value without side effects;
- `GetVar` to get the value of a variable from the local environment;
- `SetVar` to set the value of a variable;
- `CallFunction` to call a function by its name with a list of arguments;
- `DeclareFunction` to declare a function with a name and a body, which is a function taking a list of arguments and returning a list of results;
- `Impossible` to signal an unexpected branch in the code.

This monad is purely descriptive. We give the list of primitives, but we do not explain here how each operator behaves. Most of the primitives take a continuation `k`, which is a function from the output of the primitive to the rest of the code. This is a way to chain the primitives together. For convenience we define a monadic bind&nbsp;`let_` that chains these continuations to chain two monadic expressions.

Then, we define the Yul keywords from these primitives. For example, for the `if` keyword:

```coq
Definition if_ (condition : list U256.t) (success : t BlockUnit.t) : t BlockUnit.t :=
  match condition with
  | [0] => Pure BlockUnit.Ok
  | [1] => success
  | _ => Impossible "if_ condition must be a single boolean"
  end.
```

### Evaluation rules

To explain how to run the primitives of the Yul's monad, we use evaluation rules defined in [simulations/CoqOfSolidity.v](https://github.com/formal-land/solidity/blob/guillaume-claret%40experiments-with-yul/CoqOfSolidity/simulations/CoqOfSolidity.v):

```coq
Module Run.
  Reserved Notation "{{ locals | e ⇓ output | locals' }}" (at level 70, no associativity).

  Inductive t {A : Set} (locals : Locals.t) (output : A) : M.t A -> Locals.t -> Prop :=
  | Pure : {{ locals | M.Pure output ⇓ output | locals }}
  | GetVar name k locals' :
    {{ locals | k (Locals.get_var locals name) ⇓ output | locals' }} ->
    {{ locals | M.GetVar name k ⇓ output | locals' }}
  | SetVar names values k locals' :
    {{ Locals.set_vars locals names values | k ⇓ output | locals' }} ->
    {{ locals | M.SetVar names values k ⇓ output | locals' }}
  | CallFunction name arguments k results locals_inter locals' :
    let function := Locals.get_function locals name in
    {{ locals | function arguments ⇓ results | locals_inter }} ->
    {{ locals_inter | k results ⇓ output | locals' }} ->
    {{ locals | M.CallFunction name arguments k ⇓ output | locals' }}
  | DeclareFunction name body k locals' :
    {{ Locals.declare_function locals name body | k ⇓ output | locals' }} ->
    {{ locals | M.DeclareFunction name body k ⇓ output | locals' }}

  where "{{ locals | e ⇓ output | locals' }}" :=
    (t locals output e locals').
End Run.
```

We use the notation:

```coq
{{ locals | e ⇓ output | locals' }}
```

to say that a certain monadic expression&nbsp;`e` evaluates to the value&nbsp;`output`, with the local environment&nbsp;`locals` before the evaluation and&nbsp;`locals'` after the evaluation. We define the evaluation rules for each primitive of the monad.

For example, for the&nbsp;`SetVar` primitive:

```coq
| SetVar names values k locals' :
  {{ Locals.set_vars locals names values | k ⇓ output | locals' }} ->
  {{ locals | M.SetVar names values k ⇓ output | locals' }}
```

we say that if the continuation&nbsp;`k` evaluates to the value&nbsp;`output` with the local environment&nbsp;`locals` extended with the new variables&nbsp;`names` and their values&nbsp;`values`, then the whole expression&nbsp;`M.SetVar names values k` evaluates to the value&nbsp;`output`.

### Evaluation function

We also define an evaluation function that will be useful in further tests to extract the Coq code back to OCaml and run tests to compare its behavior with the original Yul code. We define the evaluation function as follows:

```coq
(** A function to evaluate an expression given enough [fuel]. *)
Fixpoint eval {A : Set} (fuel : nat) (locals : Locals.t) (e : M.t A) : (A + string) * Locals.t :=
  match fuel with
  | O => (inr "out of fuel", locals)
  | S fuel =>
    match e with
    | M.Pure output => (inl output, locals)
    | M.GetVar name k =>
      let value := Locals.get_var locals name in
      eval fuel locals (k value)
    | M.SetVar names values k =>
      eval fuel (Locals.set_vars locals names values) k
    | M.CallFunction name arguments k =>
      let function := Locals.get_function locals name in
      let (results, locals_inter) := eval fuel locals (function arguments) in
      match results with
      | inl results => eval fuel locals_inter (k results)
      | inr message => (inr message, locals)
      end
    | M.DeclareFunction name body k =>
      eval fuel (Locals.declare_function locals name body) k
    | M.Impossible message => (inr ("impossible " ++ message)%string, locals)
    end
  end.
```

It uses a&nbsp;`fuel` parameter to make sure that the evaluation terminates. For a monadic expression&nbsp;`e` and in a local environment&nbsp;`locals`, it returns either the value of the expression or an error message, along with the local environment after the evaluation. The error might be due to an unexpected branch in the code, like a&nbsp;`break` outside a loop, or to a lack of fuel. We prove that it is equivalent to the evaluation rules defined above:

```coq
Lemma eval_is_run {A : Set}
    (fuel : nat) (locals : Locals.t) (e : M.t A) (output : A) (locals' : Locals.t) :
  eval fuel locals e = (inl output, locals') ->
  {{ locals | e ⇓ output | locals' }}.
```

## Testing

To test that our translation works, we ran it on all the Solidity files in the test suite of the Solidity compiler. There are, at the time of writing, 4856 `.sol` example files in the [semanticTests](https://github.com/ethereum/solidity/tree/develop/test/libsolidity/semanticTests) and [syntaxTests](https://github.com/ethereum/solidity/tree/develop/test/libsolidity/syntaxTests) folders. On each of them we run the Solidity compiler with the `--ir-coq` flag to generate the Coq code, and then type-check the generated code with Coq. It succeeds for all the files.

We have to note that for some of the example files, the `solc` compiler does not work as there are not plain Solidity files but rather concatenations of Solidity files. This still ensures that our translation generates valid Coq code for thousands of Solidity examples.

The next step will be to check that the translation executes with the same result as the original file.

## Existing solutions

There are already a few formal verification tools for Solidity, as smart contracts are an important kind of program to check. A few of them, like the Certora Prover, are closed source. Most work at the EVM bytecode level, as the semantics of the EVM is simpler than the semantics of Solidity. A disadvantage of working at the EVM level is that this is a low-level language, so the code is hard to understand (explicit stack manipulations, ...). Thus, this approach is mostly used with automated verification tools.

It is hard to have a rather complete support for the Solidity language, despite of many attempts including [one of ours](https://gitlab.com/formal-land/coq-of-solidity). There is the [Verisol](https://github.com/microsoft/verisol) project from Microsoft to verify Solidity programs.

The Yul language offers a good compromise between the high-level Solidity language and the low-level EVM bytecode. It was actually designed with *formal verification in mind*, according to its documentation. These [notes](https://hackmd.io/@FranckC/BJz02K4Za) from Franck Cassez give a good overview of the formal verification efforts for Yul. One of the conclusions is that a lot of the existing efforts are either incomplete/unmaintained or not designed for the formal verification of smart contracts but rather to verify the Yul language itself. As a result, they propose a formal verification framework for Yul in [Dafny](https://dafny.org/) with [yul-dafny](https://github.com/franck44/yul-dafny).

:::warning For more

If you have smart contract projects that you want to formally verify, going further than a manual audit to find bugs, contact us at&nbsp;[&#099;&#111;&#110;&#116;&#097;&#099;&#116;&#064;formal&#046;&#108;&#097;&#110;&#100;](mailto:contact@formal.land)! Formal verification is the only methodology that covers all the possible execution cases.

:::

## Conclusion

We have presented our ongoing development of a formal verification tool for Solidity using the Coq proof assistant. We have shown how we translate Solidity code to Coq using the Yul intermediate language and how we define the semantics of Yul in Coq. We have tested our tool on all the examples of the Solidity compiler's test suite to show that the generated Coq code is valid.

Our next steps will be to run the generated Coq code to check that it behaves as the original Yul code, defining the around one hundred builtin Yul functions for the EVM, and to formally verify one example of Solidity smart contract.
