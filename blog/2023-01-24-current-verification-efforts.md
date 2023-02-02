---
title: Current formal verification efforts 💪
tags: [coq-of-ocaml, OCaml, Solidity, Rust, TypeScript]
---

We are diversifying ourselves to apply [formal verification](https://en.wikipedia.org/wiki/Formal_verification) on 3️⃣ new languages with **Solidity**, **Rust**, and **TypeScript**. In this article we describe our approach. For these three languages, we translate the code to the proof system [🐓&nbsp;Coq](https://coq.inria.fr/). We generate the cleanest&nbsp;🧼 possible output to simplify the formal verification&nbsp;📐 effort that comes after.

> Formal verification is a way to ensure that a program follows its specification in&nbsp;💯% of cases thanks to the use of mathematical methods. It removes far more bugs and security issues than testing, and is necessary to deliver software of the highest quality&nbsp;💎.

<!-- truncate -->

## 🗺️ General plan
To apply formal verification to real-sized applications, we need to handle thousands of lines of code in a seamless way. We rely on the proof system Coq to write our proofs, as it has a mature ecosystem, and automated (SMT) and interactive ways to write proofs. To keep the proofs simple, we must find an efficient way to convert an existing and evolving codebase to Coq.

For example, given the following TypeScript example:
```typescript
export function checkIfEnoughCredits(user: User, credits: number): boolean {
  if (user.isAdmin) {
    return credits >= 0;
  }

  return credits >= 1000;
}
```
we want to generate the corresponding Coq code in an automated way:
```coq
Definition checkIfEnoughCredits (user : User) (credits : number) : bool :=
  if user.(User.isAdmin) then
    credits >= 0
  else
    credits >= 1000.
```
This is the exact equivalent written using the Coq syntax, where we check the `credits` condition depending on the user's status. This is the `checkIfEnoughCredits` definition a Coq developer would directly write, in an idiomatic way.

We make some hypothesis on the input code. In TypeScript we assume the code does not contain mutations, which is often the case to simplify asynchronous code. In Rust we have other hypothesis as making safe mutations is one of the keys features of the language and a frequent pattern. For each language we look for a correct subset to work on, to support common use cases and still generate a clean&nbsp;Coq code.

## 🇸 Solidity
➡️ [Project page](/docs/verification/solidity) ⬅️

The [Solidity language](https://soliditylang.org/) is the main language to write smart contracts on the [Ethereum](https://ethereum.org/) blockchain. As smart contracts cannot be easily updated and handle a large amount of money, it is critical to formally verify them to prevent bugs.

Our strategy is to develop a translator [coq-of-solidity](https://gitlab.com/formal-land/coq-of-solidity) from Solidity to Coq. We are using an implementation of an [ERC-20](https://en.wikipedia.org/wiki/Ethereum#ERC20) smart contract as an example to guide our translation. Two top difficulties in the translation of Solidity programs are:
* the use of object-oriented programming with inheritance on classes,
* the use of mutations and errors, that need to be handled in a monad.

We are still trying various approach to handle these difficulties and generate a clean Coq output for most cases.

In addition to our work on Solidity, we are looking at the [EVM code](https://ethereum.org/en/developers/docs/evm/) that is the assembly language of Ethereum. It has the advantage of being more stable and with a simpler semantics than Solidity. However, it is not as expressive and programs in EVM are much harder to read. We have a prototype of translator from EVM to Coq named [ethereum-vm-to-coq](https://gitlab.com/formal-land/ethereum-vm-to-coq). An interesting goal will be to connect the translation of Solidity and of EVM in Coq to show that they have the same semantics on a given smart contract.

Note that EVM is the target language of many verification project on Ethereum such as [Certora](https://www.certora.com/) or static analyzers. We prefer to target Solidity as it is more expressive and the generated code in Coq will thus be easier to verify.

## 🦀 Rust
➡️ [Project page](/docs/verification/rust) ⬅️

The [Rust language](https://www.rust-lang.org/) is a modern systems programming language that is gaining popularity. It is a safe language that prevents many common errors such as buffer overflows or use-after-free. It is also a language that is used to write low-level code, such as drivers or operating systems. As such, it is critical to formally verify Rust programs to prevent bugs.

We work in collaboration with the team developing the [Aeneas](https://github.com/AeneasVerif) project, with people from Inria and Microsoft. The aim is to translate Rust code with mutations to a purely functional form in Coq (without mutations) to simplify the verification effort and avoid the need of separation logic. The idea of this translation is explained in the [Aeneas paper](https://dl.acm.org/doi/abs/10.1145/3547647).

There are two steps in the translation:
1. **From [MIR](https://rustc-dev-guide.rust-lang.org/mir/index.html) (low-level intermediate form of Rust) to LLBC.** This is a custom language for the project that contains all the information of MIR but is better suited for analysis. For example, instead of using a control-flow graph it uses control structures and an abstract syntax tree. This step is implemented in Rust.
2. **From LLBC to Coq.** This is the heart of the project and is implemented in OCaml. This is where the translation from mutations to a purely functional form occurs.

For now we are focusing on adding new features to LLBC and improving the user experience: better error messages, generation of an output with holes for unhandled Rust features.

## 🌐 TypeScript
➡️ [Project page](/docs/verification/typescript) ⬅️

We have a [📽️&nbsp;demo project](https://formal-land.github.io/coq-of-js/) to showcase the translation of a purely functional subset of JavaScript to Coq. We handle functions and basic data types such as records, enums and discriminated unions. We are now porting the code to TypeScript in [coq-of-ts](https://github.com/formal-land/coq-of-ts). We prefer to work on TypeScript rather than JavaScript as type information are useful to guide the translation, and avoid the need of additional annotations on the source code.

Our next target will be to make `coq-of-ts` usable on real-life project example.

:::info Social media
Follow us on Twitter at [Twitter](https://twitter.com/LandFoobar) 🐦 and [Telegram](https://t.me/formal_land) to get the latest news about our projects. If you think our work is interesting, please share it with your friends and colleagues. 🙏
:::
