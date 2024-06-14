# 🐓 body.v

[🐙 GitHub source](https://github.com/formal-land/coq-of-rust/tree/main/CoqOfRust/revm/links/primitives/bytecode/eof/body.v)

```coq
Require Import CoqOfRust.CoqOfRust.
Require Import CoqOfRust.links.M.
Require Import CoqOfRust.core.links.bool.
Require Import CoqOfRust.core.links.array.
Require Import CoqOfRust.revm.links.dependencies.
Require Import CoqOfRust.revm.links.primitives.bytecode.eof.type_section.

(*
  /// EOF Body, contains types, code, container and data sections.
  ///
  /// Can be used to create new EOF object.
  #[derive(Clone, Debug, Default, PartialEq, Eq, Hash)]
  #[cfg_attr(feature = "serde", derive(serde::Serialize, serde::Deserialize))]
  pub struct EofBody {
      pub types_section: Vec<TypesSection>,
      pub code_section: Vec<Bytes>,
      pub container_section: Vec<Bytes>,
      pub data_section: Bytes,
      pub is_data_filled: bool,
  }
*)

Module EofBody.
  Record t : Set := {
    types_section : list TypesSection.t;
    code_section : list Bytes.t;
    container_section : list Bytes.t;
    data_section : Bytes.t;
    is_data_filled : bool;
  }.

  Global Instance IsToTy : ToTy t := {
    Φ := Ty.path "revm_primitives::bytecode::eof::body::EofBody";
  }.

  Global Instance IsToValue : ToValue t := {
    φ x :=
      Value.StructRecord "revm_primitives::bytecode::eof::body::EofBody" [
        ("types_section", φ x.(types_section));
        ("code_section", φ x.(code_section));
        ("container_section", φ x.(container_section));
        ("data_section", φ x.(data_section));
        ("is_data_filled", φ x.(is_data_filled))
      ];
  }.
End EofBody.
```
