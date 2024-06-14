# 🐓 exceptions.v

[🐙 GitHub source](https://github.com/formal-land/coq-of-python/tree/main/CoqOfPython/ethereum/paris/vm/simulations/exceptions.v)

```coq
Require Import CoqOfPython.CoqOfPython.

Module ExceptionalHalt.
  Inductive t : Set :=
  | StackUnderflowError
  | StackOverflowError
  | OutOfGasError
  | InvalidOpcode (code : Z)
  | InvalidJumpDestError
  | StackDepthLimitError
  | WriteInStaticContext
  | OutOfBoundsRead
  | InvalidParameter
  | InvalidContractPrefix
  | AddressCollision.
End ExceptionalHalt.

Module Revert.
  Inductive t : Set :=.
End Revert.
```
