---
title: Make Tezos the first formally verified cryptocurrency
authors: [guillaume_claret]
tags: [tezos, coq-of-ocaml, coq]
---

![Elephants](elephants-elmira-gokoryan.webp)

Our primary goal at [Formal&nbsp;Land&nbsp;🌲](https://formal.land/) is to make [Tezos](https://tezos.com/) the first crypto-currency with a formally verified implementation. With [formal verification](https://en.wikipedia.org/wiki/Formal_verification), thanks to mathematical methods, we can check that a program behaves as expected for all possible inputs. Formal verification goes beyond what testing can do, as testing can only handle a finite amount of cases. That is critical as cryptocurrencies hold a large amount of money (around $3B for Tezos today). The current result of our verification project is available on [nomadic-labs.gitlab.io/coq-tezos-of-ocaml](https://nomadic-labs.gitlab.io/coq-tezos-of-ocaml/). Formal verification is also key to allowing Tezos to evolve constantly in a safe and backward compatible manner.

<!-- truncate -->

We proceed in two steps:
1. we translate the code of Tezos, written in [OCaml](https://ocaml.org/), to the proof language [Coq](https://coq.inria.fr/) using the translator [coq-of-ocaml](https://github.com/foobar-land/coq-of-ocaml);
2. we write our specifications and proofs in the Coq language.

We believe this is one of the most efficient ways to proceed, as we can work on an almost unmodified version of the codebase and use the full power of the mature proof system Coq. The code of Tezos is composed of around:
* 50,000 lines for the protocol (the kernel of Tezos), and
* 200,000 lines for the shell (everything else, including the peer-to-peer layer and the storage backend).

We are currently focusing on verifying the protocol for the following modules.

## Data-encoding
The [data-encoding](https://gitlab.com/nomadic-labs/data-encoding) library offers serialization and deserialization to binary and JSON formats. It is used in various parts of the Tezos protocol, especially on all the data types ending up in the storage system. In practice, many encodings are defined in the OCaml files named `*_repr.ml`. We verify that the `data-encoding` library is correctly used to define the encodings. We check that converting a value to binary format and from binary returns the initial value. We explicit the domain of validity of such conversions. This verification work generally reveals and propagates invariants about the data structures of the protocol. As an invariant example, all the account amounts should always be positive. Having these invariants will be helpful for the verification of higher-level layers of the protocol.

## Michelson smart contracts
The smart contract language of Tezos is [Michelson](https://tezos.gitlab.io/active/michelson.html). The interpreter and type-checker of smart contracts is one of the most complex and critical parts of the protocol. We are verifying two things about this code:
* The equivalence of the interpreter and the Coq semantics for Michelson defined in the project [Mi-Cho-Coq](https://gitlab.com/nomadic-labs/mi-cho-coq). Thanks to this equivalence, we can make sure that the formal verification of smart contracts is sound for the current version of the protocol.
* The compatibility of the parsing and unparsing functions for the Michelson types and values. The parsing functions take care of the type-checking and do a lot of sanity checks on Michelson expressions with appropriate error messages. Showing that the parsing and unparsing functions are inverses is important for security reasons. The Michelson values are always unparsed at the end of a smart contract execution to be stored on disk.

To do these proofs, we also give a new semantics of Michelson, expressed using dependent types rather than [GADTs](https://ocaml.org/manual/gadts-tutorial.html) in the OCaml implementation.

## Storage system
Cryptocurrencies typically take a lot of space on disk (in the hundreds of gigabytes). In Tezos, we use the key-value database [Irmin](https://irmin.org/). The protocol provides a lot of [abstractions](https://gitlab.com/tezos/tezos/-/blob/master/src/proto_alpha/lib_protocol/storage_functors.ml) over this database to expose higher-level interfaces with set and map-like APIs. We verify that these abstractions are valid doing a proof by simulation, where we show that the whole system is equivalent to an [in-memory database](https://en.wikipedia.org/wiki/In-memory_database) using simpler data structures. Thanks to this simulation, we will be able to reason about code using the storage as if we were using the simpler in-memory version.

## In addition
We also plan to verify:
* The implementation of the `data-encoding` library itself. This code is challenging for formal verification as it contains many imperative features. Another specificity of this library is that it sits outside of the protocol of Tezos, and we might need to adapt `coq-of-ocaml` to support it.
* The [property-based tests of the protocol](https://gitlab.com/tezos/tezos/-/tree/master/src/proto_alpha/lib_protocol/test/pbt). These tests are written as boolean functions (or functions raising exceptions), which must return `true` on any possible inputs. We will verify them in the general case by importing their definitions to Coq and verifying with mathematical proofs that they are always correct.

:::tip Contact
For any questions or remarks, contact us on 👉&nbsp;[&#099;&#111;&#110;&#116;&#097;&#099;&#116;&#064;formal&#046;&#108;&#097;&#110;&#100;](mailto:&#099;&#111;&#110;&#116;&#097;&#099;&#116;&#064;formal&#046;&#108;&#097;&#110;&#100;)&nbsp;👈.
:::
