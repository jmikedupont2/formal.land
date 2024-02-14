---
title: The importance of formal verification
#tags: [coq-of-rust, Rust, Coq, Aleph-Zero]
authors: []
---

> Ensuring Flawless Software in a Flawed World

In this blog post, we present what formal verification is and why this is such a valuable tool to improve the security of your applications.

<!-- truncate -->

![Formal verification](2024-02-02/formal_verification.png)

:::tip Contact

If you want to formally verify your codebase to improve the security of your application, contact us at&nbsp;[&#099;&#111;&#110;&#116;&#097;&#099;&#116;&#064;formal&#046;&#108;&#097;&#110;&#100;](mailto:contact@formal.land)! We offer a free audit of your codebase to assess the feasibility of formal verification.

:::

:::info Thanks

The current development of our tool [coq-of-rust](https://github.com/formal-land/coq-of-rust), for the formal verification of Rust code, is made possible thanks to the [Aleph Zero](https://alephzero.org/)'s Foundation and its [Ecosystem Funding Program](https://alephzero.org/ecosystem-funding-program). The aim is to develop an extra safe platform to build decentralized applications with formally verified smart contracts.

:::

## What is formal verification?

Formal verification is a set of techniques to check for the complete correctness of a program, reasoning at a symbolic level rather than executing a particular instance of the code. By symbolic reasoning, we mean following the values of the variables by tracking their names and constraints, without necessarily giving them an example value. This is what we would do in our heads to understand a code where a variable&nbsp;`username` appears, following which functions it is given to, to know where we use the user name. The concrete user name that we consider is irrelevant, although some people prefer to think with an example.

In formal verification, we rely on precise mathematical reasoning to make sure that there are no mistakes or missing cases. We check this reasoning with a dedicated program ([SMT](https://en.wikipedia.org/wiki/Satisfiability_modulo_theories) solver, [Coq](https://coq.inria.fr/) proof system, ...). Indeed, as programs grow in complexity, it could be easy to forget an&nbsp;`if` branch or an error case.

For example, to say that the following Rust program is valid:

```coq
/// Return the maximum of [a] and [b]
fn get_max(a: u128, b: u128) -> u128 {
    if a > b {
        a
    } else {
        b
    }
}
```

we reason on two cases (reasoning by disjunction):

- `a > b` where&nbsp;`a` is the maximum,
- `a <= b` where&nbsp;`b` is the maximum,

with the values of&nbsp;`a` and&nbsp;`b` being irrelevant (symbolic). In both cases, we can conclude that&nbsp;`get_max` returns the maximum.

This is in contrast with testing, where we need to execute the program with all possible instances of&nbsp;`a` and&nbsp;`b` to check that the program is correct with 100% certainty. This is infeasible in this case as the type&nbsp;`u128` is too large to be tested exhaustively: there are&nbsp;`2^256` possible values for&nbsp;`a` and&nbsp;`b`, meaning `115792089237316195423570985008687907853269984665640564039457584007913129639936` possible values!

A program is shown correct with respect to an expected behavior, called a _formal specification_. This is expressed in a mathematical language to be non-ambiguous. For example, we can specify the behavior of the previous program as:

```
FORALL (a b : u128),
  (get_max a b = a OR get_max a b = b) AND
  (get_max a b >= a AND get_max a b >= b)
```

stating that we indeed return the maximum of&nbsp;`a` and&nbsp;`b`.

When a program is formally verified, we are mathematically sure it will always follow its specifications. This is a way to eliminate all bugs, as long as we have a complete specification of what it is supposed to do or not do. This corresponds to the highest level of Evaluation Assurance Level, [EAL7](https://en.wikipedia.org/wiki/Evaluation_Assurance_Level#EAL7:_Formally_Verified_Design_and_Tested). This is used for critical applications, such as space rocket software, where a single bug can be extremely expensive (the loss of a rocket!).

There are various formal verification tools, such as the proof system [Coq](https://coq.inria.fr/). The C compiler [CompCert](https://en.wikipedia.org/wiki/CompCert) is an example of large software verified in Coq. It is proven correct, in contrast to most other C compilers that contain [subtle bugs](https://users.cs.utah.edu/~regehr/papers/pldi11-preprint.pdf). CompCert is now used by Airbus to compile C programs embedded in planes&nbsp;🛫.

## Why is it such a useful tool?

Formal verification is extremely useful as it can anticipate all the bugs by exploring all possible execution cases of a program. Here is a quote from [Edsger W. Dijkstra](https://en.wikipedia.org/wiki/Formal_verification):

> Program testing can be used to show the presence of bugs, but never to show their absence!

It offers the possibility to make software that never fails. This is often required for applications with human life at stake, such as planes or medical devices. But it can also be useful for applications where a single bug can be extremely expensive, such as financial applications.

Smart contracts are a good example of such applications. They are programs that are executed on a blockchain and are used to manage assets worth billions of dollars. A single bug in a smart contract can lead to the loss of all the assets managed by the contract. In the first half of 2023, some estimate that attacks on web3 platforms resulted in a loss of [$655.61 million](https://www.linkedin.com/pulse/h1-2023-global-web3-security-report-aml-analysis-crypto-regulatory/), with most of these losses due to bugs in smart contracts. These bugs could be prevented using formally verified smart contracts.

Finally, formal verification is useful to improve the quality of a program by enforcing the need to use:

- clear programming constructs,
- an explicit specification of the behavior of the program.

## Comparison of formal verification and testing

Compared to testing, formal verification is more complex as:

- it typically takes much more time to formally verify a program than to test it on a reasonable set of inputs,
- it requires a formal specification of the program, which is not always available,
- it requires some specific expertise to use the formal verification tools and to write the specifications.

In addition, formal verification assumes a certain model of the environment of the program, which is not always accurate. When actually executing the code, we also exercise all the dependencies (libraries, operating system, network, ...) that might cause issues at runtime.

However, formal verification is the only way to have an exhaustive check of the program. It verifies all corner cases, such as integer overflows, or hard-to-reproduce issues, such as concurrency bugs. We recommend combining both approaches as they do not catch the same kinds of bugs.

At [Formal Land](https://formal.land/), we consider it critical to lower the cost of formal verification to apply it to a larger scope of programs and prevent more bugs and attacks. We work on the formal verification of Rust with [coq-of-rust](https://github.com/formal-land/coq-of-rust) and OCaml with [coq-of-ocaml](https://github.com/formal-land/coq-of-ocaml).

## Conclusion

Formal verification is a powerful tool to improve the security of your applications. It is the only way to prevent all bugs by exploring all possible executions of your programs. It complements existing testing methods. It is particularly useful for critical applications, such as smart contracts, where a single bug can be extremely expensive.
