# 🐓 stack.v

[🐙 GitHub source](https://github.com/formal-land/coq-of-rust/tree/main/CoqOfRust/revm/links/interpreter/interpreter/stack.v)

```coq
Require Import CoqOfRust.CoqOfRust.
Require Import CoqOfRust.links.M.
Require Import CoqOfRust.core.links.array.
Require Import CoqOfRust.revm.links.dependencies.

(*
  /// EVM stack with [STACK_LIMIT] capacity of words.
  #[derive(Debug, PartialEq, Eq, Hash)]
  #[cfg_attr(feature = "serde", derive(serde::Serialize))]
  pub struct Stack {
      /// The underlying data of the stack.
      data: Vec<U256>,
  }
*)

Module Stack.
  Inductive t : Set :=
  | data : list U256 -> t.

  Global Instance IsToTy : ToTy t := {
    Φ := Ty.path "revm_interpreter::interpreter::stack::Stack";
  }.

  Global Instance IsToValue : ToValue t := {
    φ '(data x) := 
      Value.StructRecord "revm_interpreter::interpreter::stack::Stack" [("data", φ x)]
  }.
End Stack.
```
