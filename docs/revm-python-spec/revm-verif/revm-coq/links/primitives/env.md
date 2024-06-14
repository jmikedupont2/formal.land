# 🐓 env.v

[🐙 GitHub source](https://github.com/formal-land/coq-of-rust/tree/main/CoqOfRust/revm/links/primitives/env.v)

```coq
Require Import CoqOfRust.CoqOfRust.
Require Import CoqOfRust.links.M.

(*
  /// Create scheme.
  #[derive(Clone, Copy, Debug, Eq, PartialEq, Hash)]
  #[cfg_attr(feature = "serde", derive(serde::Serialize, serde::Deserialize))]
  pub enum CreateScheme {
      /// Legacy create scheme of `CREATE`.
      Create,
      /// Create scheme of `CREATE2`.
      Create2 {
          /// Salt.
          salt: U256,
      },
  }
*)

Module CreateScheme.
  Inductive t : Set :=
  | Create
  | Create2 : Z -> t.

  Global Instance IsToTy : ToTy t := {
    Φ := Ty.path "revm_primitives::env::CreateScheme";
  }.

  Global Instance IsToValue : ToValue t := {
    φ x :=
      match x with
      | Create => Value.StructTuple "revm_primitives::env::CreateScheme::Create" []
      | Create2 x => Value.StructTuple "revm_primitives::env::CreateScheme::Create2" [φ x]
      end;
  }.
End CreateScheme.
```
