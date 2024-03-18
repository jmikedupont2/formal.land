---
title: What Can You Verify? A Closer Look at Contract Verification
tags: [formal verification, contract audit]
authors: [Guanda Yuan]
---

Formal verification has been used in verifying softwares within which safety plays a critical role. There has been applications of formal verification to fields like hardware design, aerospace, railways and the general realm of the industrial software. Several situations could lead to your preference for applying formal verification service:

- Manual examination becomes too costy
- You demand the strictest test for security and safety
- Codebase being too large to write replicative yet inevitable unit tests
- Project contains different part(like software and hardware together) and you want to integrate them together into a rigorous simulation
- Projects contain internal properties that are hard to observe, and a throughout verification reveals deep and ignored threats.
- ...and so on.

## How Does Formal Verification Work Out?

A procedure of FV basically performs in two steps:

1. *Formalize* your contract with a mathematic *model*, specifically to concern about the requirements that you want to verify. 
2. *Specify* a series of *properties* under the model and prove them. 

What do you want to verify? What specifications you want to give? In this article, we're going to take a closer look at these questions.

**(TODO: FIX ABOVE)**

## Contract-Level Specification

Sometimes, you might want to specify properties for contracts:

- If I change the owner or the balance of a contract, what will it affect in the general transaction?
- Can I make sure the initiator of the contract is the user I assigned to?
- Will there be timestamp conflicts during a whole transaction?
- Will bid operations never happen after close operation?

All these questions aim at giving strict specifications to the finance model that simulates your contract, eventually ensure your contract behave well. These questions are high-level enough so that you can abstract away a lot of details, and only check if we have written the right code everywhere. When things get deeper, there could be internal properties like

- *fairness*: what should you do to ensure that everyone that are trading on your contract is playing a fair game? Is there a statistical average for a user's money loss?
- *completeness* of your model: can you assure that your operations would not result into some hacking operations?

Typically, a model that captures *interactions* between contracts, and *correctness* for financial operations, and their outer environments, would be a nice fit for these questions. These models include process algebra, linear temporal logic, etc..

Take the 4th example above, we'll show how such question would be concerned from a formal verification's point of view. Since it can be expressed in sentences like "Nothing *something* bad should ever happen", temporal logic offers a very good abstraction. Therefore, such sentence would be formalized into a math formula under temporal logic:
$$
\textbf{G}(close \rightarrow \neg \textbf{F} \space bid)
$$

## Program-Level Specification

Since we all build smart contracts out from computer programs, safety issues for contracts might merit from these underlying low-level code. Consider the following cases:

- You wrote/ calculated an out-of-bound integer within tons of code lines that your team has written
- With a memory-unsafe language, memory leak occurs inevitably after you deployed your contract
- Other common categories of vulnerabilities: reentrancy attacks, timestamp dependence, signatures replay, and so on.

Typically, these questions are classified as computer security questions. To deal with them, we have to choose models that can preserve those low-level information. Representations for programs can include [monads](https://formal.land/blog/2024/03/08/improvements-rust-translation-part-2), Control-Flow-Automata, logic systems like Hoare Logic, Rewriting Logic, etc.. Most of our projects are verifying program-level properties, ensuring a thorough verification for smart contracts. Note that since we're building the models at program-level, verifications can still be performed for contract-level specifications.