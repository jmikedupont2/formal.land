# 🐓 exceptions.v

[🐙 GitHub source](https://github.com/formal-land/coq-of-python/tree/main/CoqOfPython/ethereum/simulations/exceptions.v)

```coq
Require Import CoqOfPython.CoqOfPython.
Require ethereum.paris.vm.simulations.exceptions.

Module EthereumException.
  Inductive t : Set :=
  | ExceptionalHalt (exn : exceptions.ExceptionalHalt.t).
End EthereumException.
```
