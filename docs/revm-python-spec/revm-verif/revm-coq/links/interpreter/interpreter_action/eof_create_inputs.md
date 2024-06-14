# 🐓 eof_create_inputs.v

[🐙 GitHub source](https://github.com/formal-land/coq-of-rust/tree/main/CoqOfRust/revm/links/interpreter/interpreter_action/eof_create_inputs.v)

```coq
Require Import CoqOfRust.CoqOfRust.
Require Import CoqOfRust.links.M.
Require Import CoqOfRust.revm.links.dependencies.
Require Import CoqOfRust.revm.links.primitives.bytecode.eof.

(*
  /// Inputs for EOF create call.
  #[derive(Debug, Default, Clone, PartialEq, Eq)]
  #[cfg_attr(feature = "serde", derive(serde::Serialize, serde::Deserialize))]
  pub struct EOFCreateInput {
      /// Caller of Eof Craate
      pub caller: Address,
      /// New contract address.
      pub created_address: Address,
      /// Values of ether transfered
      pub value: U256,
      /// Init eof code that is going to be executed.
      pub eof_init_code: Eof,
      /// Gas limit for the create call.
      pub gas_limit: u64,
      /// Return memory range. If EOF creation Reverts it can return the
      /// the memory range.
      pub return_memory_range: Range<usize>,
  }
*)

Module EOFCreateInput.
  Record t : Set := {
    caller : Address.t;
    created_address : Address.t;
    value : U256;
    eof_init_code : Eof.t;
    gas_limit : Z;
    return_memory_range : (Z * Z);
  }.

  Global Instance IsToTy : ToTy t := {
    Φ := Ty.path "revm_interpreter::interpreter::eof_create_input::EOFCreateInput";
  }.

  Global Instance IsToValue : ToValue t := {
    φ x :=
      Value.StructRecord "revm_interpreter::interpreter::eof_create_input::EOFCreateInput" [
        ("caller", φ x.(caller));
        ("created_address", φ x.(created_address));
        ("value", φ x.(value));
        ("eof_init_code", φ x.(eof_init_code));
        ("gas_limit", φ x.(gas_limit));
        ("return_memory_range", φ x.(return_memory_range))
      ];
  }.
End EOFCreateInput.
```
