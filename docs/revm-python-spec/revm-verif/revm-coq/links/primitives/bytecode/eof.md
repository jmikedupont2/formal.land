# 🐓 eof.v

[🐙 GitHub source](https://github.com/formal-land/coq-of-rust/tree/main/CoqOfRust/revm/links/primitives/bytecode/eof.v)

```coq
Require Import CoqOfRust.CoqOfRust.
Require Import CoqOfRust.links.M.
Require Import CoqOfRust.revm.links.dependencies.
Require Import CoqOfRust.revm.links.primitives.bytecode.eof.header.
Require Import CoqOfRust.revm.links.primitives.bytecode.eof.body.

(*
  /// EOF - Ethereum Object Format.
  ///
  /// It consist of a header, body and raw original bytes Specified in EIP.
  /// Most of body contain Bytes so it references to the raw bytes.
  ///
  /// If there is a need to create new EOF from scratch, it is recommended to use `EofBody` and
  /// use `encode` function to create full [`Eof`] object.
  #[derive(Clone, Debug, PartialEq, Eq, Hash)]
  #[cfg_attr(feature = "serde", derive(serde::Serialize, serde::Deserialize))]
  pub struct Eof {
      pub header: EofHeader,
      pub body: EofBody,
      pub raw: Bytes,
  }
*)

Module Eof.
  Record t : Set := {
    header : EofHeader.t;
    body : EofBody.t;
    raw : Bytes.t;
  }.

  Global Instance IsToTy : ToTy t := {
    Φ := Ty.path "revm_primitives::bytecode::eof::Eof";
  }.

  Global Instance IsToValue : ToValue t := {
    φ x :=
      Value.StructRecord "revm_primitives::bytecode::eof::Eof" [
        ("header", φ x.(header));
        ("body", φ x.(body));
        ("raw", φ x.(raw))
      ];
  }.
End Eof.
```
