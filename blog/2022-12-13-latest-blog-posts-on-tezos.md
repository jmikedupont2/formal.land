---
title: Latest blog posts on our formal verification effort on Tezos
# authors: [guillaume_claret]
tags: [coq-tezos-of-ocaml, Tezos, coq-of-ocaml]
---

Here we recall some blog articles that we have written since this summer, on the [formal verification of the protocol of Tezos](https://formal-land.gitlab.io/coq-tezos-of-ocaml/). For this project, we are verifying a code base of around 100,000 lines of OCaml code. We automatically convert the OCaml code to the proof system Coq using the converter [coq-of-ocaml](https://github.com/formal-land/coq-of-ocaml). We then apply various proof techniques to make sure that the protocol of Tezos does not contain bugs.

<!-- truncate -->

## Blog articles 📝
Here is the list of articles about the work we have done since this summer. We believe that some of this work is very unique and specific to Tezos.

* [The error monad, internal errors and validity predicates, step-by-step](https://formal-land.gitlab.io/coq-tezos-of-ocaml/blog/2022/12/12/internal-errors-step-by-step/) by *Pierre Vial*: a detailed explanation of what we are doing to verify the absence of unexpected errors in the whole code base;
* [Absence of internal errors](https://formal-land.gitlab.io/coq-tezos-of-ocaml/blog/2022/10/18/absence-of-internal-errors/) by *Guillaume Claret*: the current state of our proofs to verify the absence of unexpected errors;
* [Skip-list verification. Using inductive predicates](https://formal-land.gitlab.io/coq-tezos-of-ocaml/blog/2022/10/03/verifying-the-skip-list-inductive-predicates/) by *Bartłomiej Królikowski* and *Natalie Klaus*: a presentation of our verification effort on the skip-list algorithm implementation (part 2);
* [Verifying the skip-list](https://formal-land.gitlab.io/coq-tezos-of-ocaml/blog/2022/10/03/verifying-the-skip-list/) by *Natalie Klaus* and *Bartłomiej Królikowski*: a presentation of our verification effort on the skip-list algorithm implementation (part 1);
* [Verifying json-data-encoding](https://formal-land.gitlab.io/coq-tezos-of-ocaml/blog/2022/08/15/verify-json-data-encoding/) by *Tait van Strien*: our work to verify an external library used by the Tezos protocol, to safely serialize data to JSON values;
* [Fixing reused proofs](https://formal-land.gitlab.io/coq-tezos-of-ocaml/blog/2022/07/19/fixing-proofs/) by *Bartłomiej Królikowski*: a presentation, with examples, of the work we do to maintain existing proofs and specifications as the code evolves;
* [Formal verification of property based tests](https://formal-land.gitlab.io/coq-tezos-of-ocaml/blog/2022/06/07/formal-verification-of-property-based-tests/) by *Guillaume Claret*: the principle and status of our work to formally verify the generalized case of property-based tests;
* [Plan for backward compatibility verification](https://formal-land.gitlab.io/coq-tezos-of-ocaml/blog/2022/06/02/plan-backward-compatibility) by *Guillaume Claret*: an explanation of the strategy we use to show that two successive versions of the Tezos protocol are fully backward compatible.

To follow more of our activity, feel free to register on our [Twitter account 🐦](https://twitter.com/LandFoobar)! If you need services or advices to formally verify your code base, you can drop us an [email 📧](mailto:&#099;&#111;&#110;&#116;&#097;&#099;&#116;&#064;formal&#046;&#108;&#097;&#110;&#100;)!
