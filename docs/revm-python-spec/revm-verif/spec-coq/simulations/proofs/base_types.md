# 🐓 base_types.v

[🐙 GitHub source](https://github.com/formal-land/coq-of-python/tree/main/CoqOfPython/ethereum/simulations/proofs/base_types.v)

```coq
Require Import CoqOfPython.CoqOfPython.

Require Import ethereum.simulations.base_types.

Module Uint.
  Definition to_value (value : Uint.t) : Value.t :=
    Value.Make globals "Uint" (Pointer.Imm (Object.wrapper (Data.Integer (Uint.get value)))).
End Uint.

Module U256.
  Definition to_value (value : U256.t) : Value.t :=
    Value.Make globals "U256" (Pointer.Imm (Object.wrapper (Data.Integer (U256.to_Z value)))).
End U256.
```
