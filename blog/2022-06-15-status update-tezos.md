---
title: Status update on the verification of Tezos
# authors: [guillaume_claret]
tags: [tezos, coq-of-ocaml, coq]
---

Here we give an update on our [verification effort](https://formal-land.gitlab.io/coq-tezos-of-ocaml/) on the protocol of Tezos. We add the marks:
* ✅ for "rather done"
* 🌊 for "partially done"
* ❌ for "most is yet to do"

On the website of project, we also automatically generates pages such as [Compare](https://formal-land.gitlab.io/coq-tezos-of-ocaml/docs/status/compare/) to follow the status of the tasks.

<!-- truncate -->

## Maintenance of the translation ✅
We were able to maintain most of the translation from OCaml to Coq of the protocol of Tezos using [coq-of-ocaml](https://github.com/formal-land/coq-of-ocaml), including all the translation of the Michelson interpreter. There was an increase in the size of the OCaml code base in recent months, due to new features added in Tezos like the [rollups](https://research-development.nomadic-labs.com/tezos-is-scaling.html). Here are the numbers of lines of code (`.ml` and `.mli` files) for the various protocol versions:
* protocol H: `51147`
* protocol I: `59535`
* protocol J: `83271` (increase mainly due to the rollups)
* protocol Alpha (development version of K): `90716`

We still translate most of the protocol code up to version J. We stayed on version J for a while as we wanted to add as many proofs as possible before doing a proof of backward compatibility between J and K. We are currently updating the translation to support the protocol version Alpha, preparing for the translation of K.

For protocol J, we needed to add a [blacklist.txt](https://gitlab.com/nomadic-labs/coq-tezos-of-ocaml/-/blob/master/blacklist.txt) of files that we do not support. Indeed, we need to add new changes to `coq-of-ocaml` to support these or do hard-to-maintain changes to [our fork](https://gitlab.com/tezos/tezos/-/merge_requests/3303) of the Tezos protocol. We plan to complete the translation and remove this black-list for the protocol J soon (in a week or two).

## Size of the proofs ✅
One of our plans is to have a reasonable quantity of proofs, to cover a reasonable quantity of code and properties from the protocol. We believe we have a good quantity of proofs now, as we have more than 50,000 lines of Coq code (for an OCaml codebase of 80,000 lines).

In addition to our main targets, we verify many "smaller" properties, such as:
* conversion functions are inverses (when there are two `to_int` and `of_int` functions in a file, we show that they are inverses);
* the `compare` functions, to order elements, are well defined (see our blog post [Verifying the compare functions of OCaml](https://formal-land.gitlab.io/coq-tezos-of-ocaml/blog/2022/04/04/verifying-the-compare-functions));
* invariants are preserved. For example, [here](https://formal-land.gitlab.io/coq-tezos-of-ocaml/docs/proofs/carbonated_map#Make.update_is_valid) we show that updating a carbonated map preserves the property of having a size field actually equal to the number of elements.

We should note that the size of Coq proofs tends to grow faster than the size of the verified code. We have no coverage metrics to know how much of the code is covered by these proofs.

## Data-encodings 🌊
The [data-encoding](https://gitlab.com/nomadic-labs/data-encoding) library is a set of combinators to write serialization/de-serialization functions. We verify that the encodings defined for each protocol data type are bijective. The good thing we have is a semi-automated tactic to verify the use of the `data-encoding` primitives. We detail this approach in our blog post [Automation of `data_encoding` proofs](https://formal-land.gitlab.io/coq-tezos-of-ocaml/blog/2021/11/22/data-encoding-automation). We can verify most of the encoding functions that we encounter. From there, we also express the **invariant** associated with each data type, which the encodings generally check at runtime. The invariants are then the domain of definition of the encodings.

However, we have a hole: we do not verify the `data-encoding` library itself. Thus the [axioms we made](https://formal-land.gitlab.io/coq-tezos-of-ocaml/docs/environment/proofs/data_encoding) on the data-encoding primitives may have approximations. And indeed, we missed one issue in the development code of the protocol. This is thus a new high-priority target to verify the `data-encoding` library itself. One of the challenges for the proof is the use of side-effects (references and exceptions) in this library.

## Property-based tests 🌊
The property-based tests on the protocol are located in [`src/proto_alpha/lib_protocol/test/pbt`](https://gitlab.com/tezos/tezos/-/tree/master/src/proto_alpha/lib_protocol/test/pbt). These tests are composed of:
* a generator, generating random inputs of a certain shape;
* a property function, a boolean function taking a generated input and supposed to always answer `true`.

We translated a part of these tests to Coq, to convert them to theorems and have specifications extracted from the code. The result of this work is summarized in this blog post: [Formal verification of property based tests](https://formal-land.gitlab.io/coq-tezos-of-ocaml/blog/2022/06/07/formal-verification-of-property-based-tests). We have fully translated and verified four test files over a total of twelve. We are continuing the work of translations and proofs.

However, we found that for some of the files the proofs were taking a long time to write compared to the gains in safety. Indeed, the statements made in the tests are sometimes too complex when translated into general theorems. For example, for [test_carbonated_map.ml](https://gitlab.com/tezos/tezos/-/blob/master/src/proto_alpha/lib_protocol/test/pbt/test_carbonated_map.ml) we have to deal with:
* gas exhaustion (seemingly impossible in the tests);
* data structures of size greater than `max_int` (impossible in practice).

All of that complicate the proofs for little gain in safety. So I would say that not all the property-based tests have a nice and useful translation to Coq. We should still note that for some of the tests, like with saturation arithmetic, we have proofs that work well. For these, we rely on the automated linear arithmetic tactic [`lia`](https://coq.inria.fr/refman/addendum/micromega.html) of Coq to verify properties over integer overflows.

## Storage system 🌊
By "storage system" we understand the whole set of functors defined in [`storage_functors.ml`](https://gitlab.com/tezos/tezos/-/blob/master/src/proto_alpha/lib_protocol/storage_functors.ml) and how we apply them to define the protocol storage in [`storage.ml`](https://gitlab.com/tezos/tezos/-/blob/master/src/proto_alpha/lib_protocol/storage_functors.ml). These functors create sub-storages with signatures such as:
```ocaml
module type Non_iterable_indexed_data_storage = sig
  type t
  type context = t
  type key
  type value
  val mem : context -> key -> bool Lwt.t
  val get : context -> key -> value tzresult Lwt.t
  val find : context -> key -> value option tzresult Lwt.t
  val update : context -> key -> value -> Raw_context.t tzresult Lwt.t
  val init : context -> key -> value -> Raw_context.t tzresult Lwt.t
  val add : context -> key -> value -> Raw_context.t Lwt.t
  val add_or_remove : context -> key -> value option -> Raw_context.t Lwt.t
  val remove_existing : context -> key -> Raw_context.t tzresult Lwt.t
  val remove : context -> key -> Raw_context.t Lwt.t
end
```
This `Non_iterable_indexed_data_storage` API looks like the API of an OCaml's [Map](https://v2.ocaml.org/api/Map.Make.html). As a result, our goal for the storage is to show that is can be simulated by standard OCaml data structures such as sets and maps. This is a key step to unlock further reasoning about code using the storage.

Unfortunately, we were not able to verify the whole storage system yet. Among the difficulties are that:
* there are many layers in the definition of the storage;
* the storage functors use a lot of abstractions, and sometimes it is unclear how to specify them in the general case.

Still, we have verified some of the functors as seen in [`Proofs/Storage_functors.v`](https://formal-land.gitlab.io/coq-tezos-of-ocaml/docs/proofs/storage_functors) and specified the `storage.ml` file in [`Proos/Storage.v`](https://formal-land.gitlab.io/coq-tezos-of-ocaml/docs/storage). We believe in having the correct specifications for all of the storage abstractions now. We plan to complete all these proofs later.

## Michelson
The verification of the Michelson interpreter is what occupied most of our time. By considering the OCaml files whose name starts by `script_`, the size of the Michelson interpreter is around 20,000 lines of OCaml code.

### Simulations 🌊
The interpreter relies heavily on [GADTs](https://v2.ocaml.org/manual/gadts.html) in OCaml. Because these do not translate nicely in Coq, we need to write simulations in dependent types of the interpreter functions, and prove them correct in Coq. We describe this process in our [Michelson Guide](https://formal-land.gitlab.io/coq-tezos-of-ocaml/docs/guides/michelson).

The main difficulties we encountered are:
* the number of simulations to write (covering the 20,000 lines of OCaml);
* the execution time of the proof of correctness of the simulations. This is due to the large size of the inductive types describing the Michelson AST, and the use of dependent types generating large proof terms. For example, there are around 30 cases for the types and 150 for the instructions node in the AST.

When writing the simulations, we are also verifying the termination of all the functions and the absence of reachable `assert false`. We have defined the simulation of many functions, but are still missing important ones such as [`parse_instr_aux`](https://formal-land.gitlab.io/coq-tezos-of-ocaml/docs/script_ir_translator/#parse_instr_aux) to parse Michelson programs.

### Mi-Cho-Coq 🌊
We have a project to verify that the [Mi-Cho-Coq](https://gitlab.com/nomadic-labs/mi-cho-coq) framework, used to formally verify smart contracts written in Michelson, is compatible with the implementation of the Michelson interpreter in OCaml. We have a partial proof of compatibility in [Micho_to_dep.v](https://formal-land.gitlab.io/coq-tezos-of-ocaml/docs/simulations/micho_to_dep). We still need to complete this proof, especially to handle instructions with loops. Our goal is to show a complete inclusion of the semantics of Mi-Cho-Coq into the semantics of the implementation.

### Parse/unparse ❌
We wanted to verify that the various parsing and unparsing functions over Michelson are inverses. These functions exist for:
* comparable types
* types
* comparable data
* data

Because we are still focused on writing, verifying or updating the simulations, we are still not done for this task.

## Conclusion
We have many ongoing projects but few fully completed tasks. We will focus more on having terminated proofs.
