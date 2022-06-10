---
sidebar_position: 2
---
# 📣 Claims
Here are our claims.

## Verify
### Mathematical methods
With formal verification, we can check that a program verifies a boolean property for all possible inputs. This is true even if the set of inputs is infinite. For that, we use mathematical reasoning verified by the proof system Coq. The Coq system offers a language to write mathematical proofs and check that nothing is missing. To verify a program, we typically reason by symbolic evaluation or by recursion. The online book [Certified Programming with Dependent Types](http://adam.chlipala.net/cpdt/) from [Adam Chlipala](http://adam.chlipala.net/) offers an in-depth introduction to program verification.

### Scale your code
As a project grows, it can become harder to add new program layers or change legacy code. Indeed, any change might break implicit requirements or introduce security issues. We think formal verification can change this state of affairs, making scaling more predictable. Thanks to explicit specifications and proofs, we can change an existing code and know if we impact other components. We can build safe new layers on top of formally specified code. Formal specifications act like documentation, plus we can verify and keep it in sync with the implementation.

### Onboard new developers
With formal specifications, we can simplify the onboarding of new developers having explicit code specifications. New developers can work with limited risk of breaking existing invariants and read the specifications to understand how things are supposed to work.

### Perfect code reviews
We can formally specify new features during a code review and verify that they follow the specification. This forces us to have a clear semantic of what is being added and ensures that we do not introduce new bugs. This can also help to simplify the code to have cleaner proofs. Finally, with formal verification, we can make precise remarks on every detail of the code thanks to the help of Coq to step through the definitions.

## Battle-tested
### Verify the implementation of Tezos
We work on the formal verification of the crypto-currency [Tezos](https://tezos.com/) with the project [Coq Tezos of OCaml](https://nomadic-labs.gitlab.io/coq-tezos-of-ocaml/). This amounts to the verification of around [40,000 lines of code](https://gitlab.com/tezos/tezos/-/tree/master/src/proto_alpha/lib_protocol) written in the [OCaml](https://ocaml.org/) language. We verify various properties, including the validity of the serialization functions, the storage system, and the smart contracts interpreter. Note that this proof effort is still an ongoing project. Eventually, we hope to attain proof volume equivalent to those of the code.

### Mature proof system
We rely exclusively on the proof system [Coq](https://coq.inria.fr/) for our verification effort. This system is mature and has been under development for more than 30 years. There is a [large user community](https://twitter.com/CoqLang) and hundreds of existing [packages](https://coq.inria.fr/opam/www/). Thus we can access to various libraries and plugins to help to write our proofs, either in a manual or an automated way.

## Minimal cost
The cost is the main point on which we try to differentiate ourselves from competitors.

### Minimize the cost
Formal verification has the reputation of being too expensive. To minimize the cost, we work by translating the code into similar-looking expressions in the proof system [Coq](https://coq.inria.fr/). Then, the verification process occurs on a very similar representation to what we would model by hand. We think that this process is optimal for functional code, for which the translation is primarily syntactical. For a code made with formal verification, we envision an equal sharing of the development time as follows:
* code: 25%
* review: 25%
* test: 25%
* formal verification: 25%

Note that there is an entrance cost, as we first need to set up the translation pipeline to Coq.

### Use shortcuts
We use some shortcuts to simplify the verification process. For example, we provide an option to ignore the termination check of recursive functions in Coq. This option is unsound, but we consider that bugs rarely occur due to non-termination issues. For variable names, we do not try to avoid name collisions by generating indexed names. Instead, we let the collision occurs, and we expect the user to rename some variables if that happens. Having no generated names helps to have a generated code more resistant to changes. We also use various cast axioms for language constructs that we cannot represent directly in Coq.

We believe that we are still able to catch most of the bugs. However, for cases where we need to capture all the bugs, we can either:
* track the axioms using the [Print Assumptions](https://coq.inria.fr/refman/proof-engine/vernacular-commands.html#coq:cmd.Print-Assumptions) command of Coq, or:
* consider the generated Coq code as the new reference and use [program extraction](https://coq.inria.fr/refman/addendum/extraction.html) to compile the code.

### Everyday-life programs
We claim to target everyday-life programs, as we handle general-purpose programming languages with a cost similar to the tests or code review. As an illustration, we work on the [implementation](https://nomadic-labs.gitlab.io/coq-tezos-of-ocaml/) of the crypto-currency [Tezos](https://tezos.com/), while (to our knowledge) most other projects verify models of crypto-currencies or smart contracts.
