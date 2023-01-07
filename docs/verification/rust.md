# 🦀 Rust verification

We are working on bringing more [*formal verification*](https://en.wikipedia.org/wiki/Formal_verification) to the [Rust :crab:](https://www.rust-lang.org/) community. You can look at [this page](https://rust-formal-methods.github.io/) that is intending to group all the formal verification efforts on Rust, or at the company [Cryspen](https://www.cryspen.com/) doing formal verification on Rust.

Our goal is achieve the verification of this [NFT smart contract :candy:](https://github.com/metaplex-foundation/metaplex-program-library/tree/master/candy-machine-core/program) written in Rust for the [Solana](https://solana.com/) blockchain. An extract of the code is the following:
```rust
let name = if name_length > 0 {
    let name_slice: &mut [u8] = &mut account_data[position..position + name_length];
    let name = String::from_utf8(name_slice.to_vec())
        .map_err(|_| CandyError::CouldNotRetrieveConfigLineData)?;
    name.trim_end_matches(NULL_STRING).to_string()
} else {
    EMPTY_STR.to_string()
};
```
Our strategy is to work with the [AeneasVerif project](https://github.com/AeneasVerif) to translate Rust code into idiomatic code in the interactive proof assistant [Coq](https://coq.inria.fr/). This project works in two steps:
1. [Charon](https://github.com/AeneasVerif/charon) translates Rust code to the intermediate language LLBC. This language is close to [MIR](https://rustc-dev-guide.rust-lang.org/mir/index.html) but with structured loops instead of `goto`.
2. [Aeneas](https://github.com/AeneasVerif/aeneas) does the heavy work of translating code with mutations to a purely functional form, and then pretty-prints the result in Coq (or [F*](https://www.fstar-lang.org/)).

This project is already quite complete, but some features such as traits are still in ongoing development. Our strategy to make it work as fast as possible on our smart contract example is the following:
1. Extend Charon to support more of the Rust syntax, and have an output directly from LLBC to Coq. This will require to rewrite our smart contract to avoid using mutations (hopefully in a few weeks).
2. Be able to use the full pipeline with Aeneas (maybe in a few months).

:::tip Contact
For more information, you can contact us by email at [&#099;&#111;&#110;&#116;&#097;&#099;&#116;&#064;formal&#046;&#108;&#097;&#110;&#100;](mailto:&#099;&#111;&#110;&#116;&#097;&#099;&#116;&#064;formal&#046;&#108;&#097;&#110;&#100;) ✉️ or schedule a call on [koalendar.com/e/meet-with-formal-land](https://koalendar.com/e/meet-with-formal-land) ☎️. Our main expertise is in the Coq system. We translate code to Coq to after write specifications and proofs on the generated code.
:::

> The more you are demanding, the more you need us 🏇.
