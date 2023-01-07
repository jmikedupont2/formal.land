# 🇸 Solidity verification

[Formal verification](https://en.wikipedia.org/wiki/Formal_verification) is the **strongest method** to ensure the safety of smart contracts, as it employs **mathematical methods** to explore all possible inputs and usage scenarios and make sure that the code is **100% correct**. Think "the safety offered by Rust in comparison to C, by for arbitrarily complex properties". This is particularly relevant for smart contracts as a single mistake can cost millions of dollars, for code that is open-source and hard to upgrade. We propose formal verification using **interactive theorem provers**, that guarantees **stronger properties** than existing solutions such as [Certora](https://www.certora.com/). Indeed there are **no undecidable properties** with interactive theorem provers (in theory [yes](https://en.wikipedia.org/wiki/G%C3%B6del%27s_incompleteness_theorems) but unreachable in practice). This is especially important to verify complex behaviors such as backward compatibility on upgrades, unbounded loops or inter-contracts calls.

To [formally verify](https://en.wikipedia.org/wiki/Formal_verification) Solidity programs, we develop tools to translate Ethereum programs to the interactive proof assistant [Coq](https://coq.inria.fr/). The goal is to have a translation as idiomatic as possible for Coq. Then we express and verify arbitrary properties on the translated code in Coq with our existing expertise in Coq 🐓.

We have two ongoing projects:
1. [coq-of-solidity](https://gitlab.com/formal-land/coq-of-solidity) to directly translate Solidity code into idiomatic Coq code (with a shallow embedding). The resulting traduction is high-level, but it can be hard to make sure that the semantics is preserved.
2. [ethereum-vm-to-coq](https://gitlab.com/formal-land/ethereum-vm-to-coq) to translate EVM code (the assembly code of Ethereum) to Coq (with a deep embedding). The translation mechanism is much simpler compared to Solidity, but the generated Coq is also more low-level and harder to follow for formal verification.

In addition, we are thinking about relating the two translations (of Solidity and EVM) with an intermediate translation step, to get the best of both worlds (a reliable and high-level translation of Solidity code to Coq).

:::tip Offer
For more information or to formally verify your smart contracts, you can contact us by email at [&#099;&#111;&#110;&#116;&#097;&#099;&#116;&#064;formal&#046;&#108;&#097;&#110;&#100;](mailto:&#099;&#111;&#110;&#116;&#097;&#099;&#116;&#064;formal&#046;&#108;&#097;&#110;&#100;) ✉️ or schedule a call on [koalendar.com/e/meet-with-formal-land](https://koalendar.com/e/meet-with-formal-land) ☎️. Our target is to be as cheap as $50,000 to fully verify an existing dApp. By full verification we mean formalizing and verifying the specification given by a typical set of unit/integration tests on a project.
:::

> The more you are demanding, the more you need us 🏇.

