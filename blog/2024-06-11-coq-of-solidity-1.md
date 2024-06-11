---
title: 🪨 Coq of Solidity (part 1)
tags: [formal verification, Coq, Solidity, Yul]
authors: []
---

[Solidity](https://soliditylang.org/) is the most widely used **smart contract language** for the [Ethereum blockchain](https://ethereum.org/). As smart contracts are **critical software** handling a lot of money, there is a huge interest in finding **all possible bugs** before putting them into production.

**Formal verification** is a technique to test a program on all possible entries, even if there are **infinite possibilities**, thanks to the use of **mathematical methods**. As such it appears as an ideal way to guarantee the absence of bugs in a smart contract. Many companies are already providing formal verification services for Solidity, like [Certora](https://certora.com/) and [CertiK](https://www.certik.io/).

In this blog post, we present our ongoing development of a **formal verification tool for Solidity** using the [Coq proof assistant](https://coq.inria.fr/). We show how we translate Solidity code into Coq using the intermediate language [Yul](https://docs.soliditylang.org/en/latest/yul.html). We explain how we achieved to translate all the examples of the [Solidity compiler](https://github.com/ethereum/solidity)'s test suite to valid Coq code, the semantics we defined and what remained to be done.

The code is available under GPLv3 license in our fork of the Solidity compiler at [github.com/formal-land/solidity](https://github.com/formal-land/solidity/pull/3).

<!-- truncate -->

<figure>
  ![Ethereum in forst](2024-06-11/ethereum-in-forest.webp)
</figure>

## Architecture of the tool

We reuse for code of the standard Solidity compiler&nbsp;`solc` in order to make sure that we can stay in sync with the evolutions of the language, and to be compatible with all the Solidity features. Thus our simpler path to implement a translation tool from Solidity to Coq was to fork the C++ code of `solc` in [github.com/formal-land/solidity](https://github.com/formal-land/solidity). We add a new&nbsp;`solc`'s flag&nbsp;`--ir-coq` that tells the compiler to also generate a Coq output in addition to the expected EVM bytecode.

At first we looked at the direct translation from the Solidity language to Coq but this was getting too complex. We changed our strategy to instead target the Yul language, an intermediate language used by the Solidity compiler to have an intermediate step in its translation to the EVM bytecode. The Yul language is simpler than Solidity and still higher level than the EVM bytecode, making it a good target for formal verification. In contrast to the EVM bytecode, there are no explicit stack-manipulation or&nbsp;`goto` instructions in Yul, which makes it easier to reason about.

To give an idea of the size difference between Solidity and Yul, here are the files to export these languages to JSON in the Solidity compiler:

- [ast/ASTJsonExporter.cpp](https://github.com/ethereum/solidity/blob/develop/libsolidity/ast/ASTJsonExporter.cpp): Solidity to JSON, 1127 lines
- [libyul/AsmJsonConverter.cpp](https://github.com/ethereum/solidity/blob/develop/libyul/AsmJsonConverter.cpp): Yul to JSON, 205 lines

We copied the file above to translate Yul to JSON to make a version that outputs Coq code instead: [libyul/AsmCoqConverter.cpp](https://github.com/formal-land/solidity/blob/guillaume-claret@experiments-with-yul/libyul/AsmCoqConverter.cpp). We reused the code for compilation flags to add a new option&nbsp;`--ir-coq` that runs the conversion to Coq instead of the conversion to JSON.

## Translation of Yul

To limit the size of the generated Coq code, we translate the Yul code after the optimization passes. This helps to remove boilerplate code but may make the Yul code less relatable to the Solidity sources. Thankfully the optimized Yul code is still readable in our tests, and the Solidity compiler can pretty-print a version of the optimized Yul code with comments to quote the corresponding Solidity source code.

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

The content is actually the same up to the notations, but we use much more line breaks in the Coq version.

## Runtime in Coq

## Testing

## Existing solutions

:::info For more

If you want to go into more details for the formal verification of Python programs, you can look at our [coq-of-python](https://github.com/formal-land/coq-of-python) project, where we define the semantics of Python in Coq and verify properties of Python programs (ongoing project!). We also provide formal verification services for [Rust](https://github.com/formal-land/coq-of-rust) and other languages like [OCaml](https://github.com/formal-land/coq-of-ocaml). Contact us at&nbsp;[&#099;&#111;&#110;&#116;&#097;&#099;&#116;&#064;formal&#046;&#108;&#097;&#110;&#100;](mailto:contact@formal.land) to discuss if you have critical applications to check!

:::

## Conclusion

We have presented here the idea of **formal verification**, a technique to verify the absence of bugs in a program by reasoning from **first principles**. We have illustrated this idea for a simple Python example, showing how we can verify that a function computing the maximum of a list is correct **for all possible lists of integers**.

We will continue with more blog posts explaining what we can do with formal verification and why it matters. Feel free to share this post and to tell us what subjects you want to see covered!
