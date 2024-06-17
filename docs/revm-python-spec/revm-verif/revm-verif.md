# Revm Verification

The goal of this project is to formally verify the [Rust implementation of the EVM](https://github.com/bluealloy/revm) by showing that it is equivalent to the [Python specification of the EVM](https://github.com/ethereum/execution-specs). The [EVM](https://ethereum.org/en/developers/docs/evm/) is the virtual machine of the Ethereum blockchain to execute smart contracts.

We use the [Coq](https://coq.inria.fr/) proof assistant to do the proofs. We use [coq-of-rust](https://github.com/formal-land/coq-of-rust) to convert the Rust code to Coq, and [coq-of-python](https://github.com/formal-land/coq-of-python) to convert the Python code to Coq.

Here we present the list of Rust, Python and Coq files from the project. Most of Coq files are automatically generated from the source files, and we have a beginning of simulation files and proofs.
