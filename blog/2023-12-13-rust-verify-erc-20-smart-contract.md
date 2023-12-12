---
title: Verifying an ERC-20 smart contract in Rust
tags: [Aleph-Zero, coq-of-rust, Rust, Coq, ERC-20, ink!]
authors: []
---

Our tool [coq-of-rust](https://github.com/formal-land/coq-of-rust) enables formal verification of [🦀&nbsp;Rust](https://www.rust-lang.org/) code to make sure that a program has no bugs given a precise specification. We work by translating Rust programs to the general proof system [🐓&nbsp;Coq](https://coq.inria.fr/).

Here, we show how we formally verify an [ERC-20 smart contract](https://github.com/paritytech/ink/blob/master/integration-tests/erc20/lib.rs) written in Rust for the [Aleph Zero](https://alephzero.org/) blockchain. [ERC-20](https://en.wikipedia.org/wiki/Ethereum#ERC20) smart contracts are used to create new kinds of tokens in an existing blockchain. Examples are stablecoins such as the [💲USDT](https://tether.to/).

:::tip Purchase

To formally verify your Rust codebase and improve the security of your application, email us at&nbsp;[&#099;&#111;&#110;&#116;&#097;&#099;&#116;&#064;formal&#046;&#108;&#097;&#110;&#100;](mailto:contact@formal.land)! Formal verification is the only way to prevent all bugs by exploring all possible executions of your program.

:::

:::info Thanks

This work and the development of [coq-of-rust](https://github.com/formal-land/coq-of-rust) is made possible thanks to the [Aleph Zero](https://alephzero.org/)'s Foundation, to develop an extra safe platform to build decentralized applications with formally verified smart contracts.

:::

<!-- truncate -->

![Rooster verifying](2023-12-13/rooster-verifying.png)

## Smart contract code&nbsp;🦀

Here is the Rust code of the smart contract that we want to verify:

```rust
#[ink::contract]
mod erc20 {
    use ink::storage::Mapping;

    #[ink(storage)]
    #[derive(Default)]
    pub struct Erc20 {
        total_supply: Balance,
        balances: Mapping<AccountId, Balance>,
        allowances: Mapping<(AccountId, AccountId), Balance>,
    }

    #[ink(event)]
    pub struct Transfer {
        // ...
    }

    #[ink(event)]
    pub struct Approval {
        // ...
    }

    #[derive(Debug, PartialEq, Eq)]
    #[ink::scale_derive(Encode, Decode, TypeInfo)]
    pub enum Error {
        // ...
    }

    pub type Result<T> = core::result::Result<T, Error>;

    impl Erc20 {
        #[ink(constructor)]
        pub fn new(total_supply: Balance) -> Self {
            let mut balances = Mapping::default();
            let caller = Self::env().caller();
            balances.insert(caller, &total_supply);
            Self::env().emit_event(Transfer {
                from: None,
                to: Some(caller),
                value: total_supply,
            });
            Self {
                total_supply,
                balances,
                allowances: Default::default(),
            }
        }

        #[ink(message)]
        pub fn total_supply(&self) -> Balance {
            self.total_supply
        }

        #[ink(message)]
        pub fn balance_of(&self, owner: AccountId) -> Balance {
            self.balance_of_impl(&owner)
        }

        #[inline]
        fn balance_of_impl(&self, owner: &AccountId) -> Balance {
            self.balances.get(owner).unwrap_or_default()
        }

        #[ink(message)]
        pub fn allowance(&self, owner: AccountId, spender: AccountId) -> Balance {
            self.allowance_impl(&owner, &spender)
        }

        #[inline]
        fn allowance_impl(&self, owner: &AccountId, spender: &AccountId) -> Balance {
            self.allowances.get((owner, spender)).unwrap_or_default()
        }

        #[ink(message)]
        pub fn transfer(&mut self, to: AccountId, value: Balance) -> Result<()> {
            let from = self.env().caller();
            self.transfer_from_to(&from, &to, value)
        }

        #[ink(message)]
        pub fn approve(&mut self, spender: AccountId, value: Balance) -> Result<()> {
            let owner = self.env().caller();
            self.allowances.insert((&owner, &spender), &value);
            self.env().emit_event(Approval {
                owner,
                spender,
                value,
            });
            Ok(())
        }

        #[ink(message)]
        pub fn transfer_from(
            &mut self,
            from: AccountId,
            to: AccountId,
            value: Balance,
        ) -> Result<()> {
            let caller = self.env().caller();
            let allowance = self.allowance_impl(&from, &caller);
            if allowance < value {
                return Err(Error::InsufficientAllowance)
            }
            self.transfer_from_to(&from, &to, value)?;
            // We checked that allowance >= value
            #[allow(clippy::arithmetic_side_effects)]
            self.allowances
                .insert((&from, &caller), &(allowance - value));
            Ok(())
        }

        fn transfer_from_to(
            &mut self,
            from: &AccountId,
            to: &AccountId,
            value: Balance,
        ) -> Result<()> {
            let from_balance = self.balance_of_impl(from);
            if from_balance < value {
                return Err(Error::InsufficientBalance)
            }
            // We checked that from_balance >= value
            #[allow(clippy::arithmetic_side_effects)]
            self.balances.insert(from, &(from_balance - value));
            let to_balance = self.balance_of_impl(to);
            self.balances
                .insert(to, &(to_balance.checked_add(value).unwrap()));
            self.env().emit_event(Transfer {
                from: Some(*from),
                to: Some(*to),
                value,
            });
            Ok(())
        }
    }
}
```

This whole code is rather short and contains no loops, which will simplify our verification process. It uses a lot of macros, such as `#[ink(message)]`, that are specific to the [ink!](https://use.ink/) language for smart contracts, built on top of Rust. To verify this smart contract, we removed all the macros and added a mock of the dependencies, such as `ink::storage::Mapping` to get a map data structure.

## The Coq translation&nbsp;🐓

By running our tool [coq-of-rust](https://github.com/formal-land/coq-of-rust) we automatically obtain the corresponding Coq code for the contract [erc20.v](https://github.com/formal-land/coq-of-rust/blob/main/CoqOfRust/examples/default/examples/ink_contracts/erc20.v). Here is an extract for the `transfer` function:

```coq
(*
    fn transfer(&mut self, to: AccountId, value: Balance) -> Result<()> {
        let from = self.env().caller();
        self.transfer_from_to(&from, &to, value)
    }
*)
Definition transfer
    (self : mut_ref ltac:(Self))
    (to : erc20.AccountId.t)
    (value : ltac:(erc20.Balance))
    : M ltac:(erc20.Result unit) :=
  let* self : M.Val (mut_ref ltac:(Self)) := M.alloc self in
  let* to : M.Val erc20.AccountId.t := M.alloc to in
  let* value : M.Val ltac:(erc20.Balance) := M.alloc value in
  let* from : M.Val erc20.AccountId.t :=
    let* α0 : mut_ref erc20.Erc20.t := M.read self in
    let* α1 : erc20.Env.t :=
      M.call (erc20.Erc20.t::["env"] (borrow (deref α0))) in
    let* α2 : M.Val erc20.Env.t := M.alloc α1 in
    let* α3 : erc20.AccountId.t :=
      M.call (erc20.Env.t::["caller"] (borrow α2)) in
    M.alloc α3 in
  let* α0 : mut_ref erc20.Erc20.t := M.read self in
  let* α1 : u128.t := M.read value in
  let* α2 : core.result.Result.t unit erc20.Error.t :=
    M.call
      (erc20.Erc20.t::["transfer_from_to"] α0 (borrow from) (borrow to) α1) in
  let* α0 : M.Val (core.result.Result.t unit erc20.Error.t) := M.alloc α2 in
  M.read α0.
```

More details of the translation are given in previous blog posts, but basically:

- we make explicit all memory and implicit operations (like borrowing and dereferencing),
- we apply a monadic translation to chain the primitive operations with `let*`.

## Proof strategy

![Proof strategy](2023-12-13/proof-strategy.png)

We verify the code in two steps:

1. Show that a simpler, purely functional Coq code can simulate all the smart contract code.
2. Show that the simulation is correct.

That way, we can eliminate all the memory-related operations by showing the equivalence with a simulation. Then, we can focus on the functional code, which is more straightforward to reason about. We can cite another project, [Aeneas](https://github.com/AeneasVerif/aeneas), which proposes to do the first step (removing memory operations) automatically.

## Simulations

### Simulation code

We will work on the example of the `transfer` function. We define the simulations in [Simulations/erc20.v](https://github.com/formal-land/coq-of-rust/blob/main/CoqOfRust/examples/default/examples/ink_contracts/Simulations/erc20.v). For the `transfer` function this is:

```coq
Definition transfer
    (env : erc20.Env.t)
    (to : erc20.AccountId.t)
    (value : ltac:(erc20.Balance)) :
    MS? State.t ltac:(erc20.Result unit) :=
  transfer_from_to (Env.caller env) to value.
```

The function `transfer` is a wrapper around `transfer_from_to`, using the smart contract caller as the `from` account. The monad `MS?` combines the state and error effect. The state is given by the `State.t` type:

```coq
Module State.
  Definition t : Set := erc20.Erc20.t * list erc20.Event.t.
End State.
```

It combines the state of the contract (type `Self` in the Rust code) and a list of events to represent the logs. The errors of the monad include panic errors, as well as control flow primitives such as `return` or `break` that we implement with exceptions.

### Equivalence statement

We write all our proofs in [Proofs/erc20.v](https://github.com/formal-land/coq-of-rust/blob/main/CoqOfRust/examples/default/examples/ink_contracts/Proofs/erc20.v). The lemma stating that the simulation is equivalent to the original code is:

```coq
Lemma run_transfer
    (env : erc20.Env.t)
    (storage : erc20.Erc20.t)
    (to : erc20.AccountId.t)
    (value : ltac:(erc20.Balance))
    (H_storage : Erc20.Valid.t storage)
    (H_value : Integer.Valid.t value) :
  let state := State.of_storage storage in
  let self := Ref.mut_ref Address.storage in
  let simulation :=
    lift_simulation
      (Simulations.erc20.transfer env to value) storage in
  {{ Environment.of_env env, state |
    erc20.Impl_erc20_Erc20_t_2.transfer self to value ⇓
    simulation.(Output.result)
  | simulation.(Output.state) }}.
```

The main predicate is:

```coq
{{ env, state | translated_code ⇓ result | final_state }}.
```

This predicate defines our semantics, explaining how to evaluate a translated Rust code in an environment `env` and a state `state`, to obtain a result `result` and a final state `final_state`. We use an environment in addition to a state to initialize various globals and other information related to the execution context. For example, here, we use the environment to store the `caller` of the contract and the pointer to the list of logs.

### Semantics

We define our monad for the translated code `M A` in a style by continuation:

```coq
Inductive t (A : Set) : Set :=
| Pure : A -> t A
| CallPrimitive {B : Set} : Primitive.t B -> (B -> t A) -> t A
| Cast {B1 B2 : Set} : B1 -> (B2 -> t A) -> t A
| Impossible : t A.
Arguments Pure {_}.
Arguments CallPrimitive {_ _}.
Arguments Cast {_ _ _}.
Arguments Impossible {_}.
```

For now, we use the primitives to access the memory and the environment:

```coq
Module Primitive.
  Inductive t : Set -> Set :=
  | StateAlloc {A : Set} : A -> t (Ref.t A)
  | StateRead {Address A : Set} : Address -> t A
  | StateWrite {Address A : Set} : Address -> A -> t unit
  | EnvRead {A : Set} : t A.
End Primitive.
```

For each of our monad constructs, we add a case to our evaluation predicate that we will describe:

- `Pure` The result is the value itself, and the state is unchanged:
  ```coq
  | Pure :
    {{ env, state' | LowM.Pure result ⇓ result | state' }}
  ```
- `Cast` The evaluation is only possible when `B1` and `B2` are the same type `B`:
  ```coq
  | Cast {B : Set} (state : State) (v : B) (k : B -> LowM A) :
    {{ env, state | k v ⇓ result | state' }} ->
    {{ env, state | LowM.Cast v k ⇓ result | state' }}
  ```
  In this case, we return the result of the continuation `k` of the cast. We do not change the state in the cast.
- We read the state using the primitive `State.read`, checking that the `address` is indeed allocated (it returns `None` otherwise). Note that the type of `v` depends on its address. We directly allocate values with their original type, to avoid serializations/deserializations to represent the state.
  ```coq
  | CallPrimitiveStateRead
      (address : Address) (v : State.get_Set address)
      (state : State)
      (k : State.get_Set address -> LowM A) :
    State.read address state = Some v ->
    {{ env, state | k v ⇓ result | state' }} ->
    {{ env, state |
      LowM.CallPrimitive (Primitive.StateRead address) k ⇓ result
    | state' }}
  ```
- Similarly, we write into the state with `State.alloc_write`, that only succeeds for allocated addresses:
  ```coq
  | CallPrimitiveStateWrite
      (address : Address) (v : State.get_Set address)
      (state state_inter : State)
      (k : unit -> LowM A) :
    State.alloc_write address state v = Some state_inter ->
    {{ env, state_inter | k tt ⇓ result | state' }} ->
    {{ env, state |
      LowM.CallPrimitive (Primitive.StateWrite address v) k ⇓ result
    | state' }}
  ```
- To allocate a new value in memory, we have to make a choice depending on whether we want this value to be writable or not. For immutable values, we do not create a new address and instead say that the address is the value itself:
  ```coq
  | CallPrimitiveStateAllocNone {B : Set}
      (state : State) (v : B)
      (k : Ref B -> LowM A) :
    {{ env, state | k (Ref.Imm v) ⇓ result | state' }} ->
    {{ env, state |
      LowM.CallPrimitive (Primitive.StateAlloc v) k ⇓ result
    | state' }}
  ```
  If we later attempt to update this value, it will not be possible to define a semantics and we will be stuck. It is up to the user to correctly anticipate if a value will be updated or not to define the semantics. For values that might be updated, we use:
  ```coq
  | CallPrimitiveStateAllocSome
      (address : Address) (v : State.get_Set address)
      (state : State)
      (k : Ref (State.get_Set address) -> LowM A) :
    let r :=
      Ref.MutRef (A := State.get_Set address) (B := State.get_Set address)
        address (fun full_v => full_v) (fun v _full_v => v) in
    State.read address state = None ->
    State.alloc_write address state v = Some state' ->
    {{ env, state | k r ⇓ result | state' }} ->
    {{ env, state |
      LowM.CallPrimitive (Primitive.StateAlloc v) k ⇓ result
    | state' }}
  ```
  We need to provide an address not already allocated: `State.read` should return `None`. At this point, we can make any choice of unallocated address in order to simplify the proofs later.
- Finally, we read the whole environment with:
  ```coq
  | CallPrimitiveEnvRead
      (state : State) (k : Env -> LowM A) :
    {{ env, state | k env ⇓ result | state' }} ->
    {{ env, state |
      LowM.CallPrimitive Primitive.EnvRead k ⇓ result
    | state' }}
  ```

### Semantics remarks

We can make a few remarks about our semantics:

- There are no cases for `M.Impossible` as this primitive corresponds to impossible branches in the code.
- The semantics is not computable, in the sense that we cannot define a function `run` to evaluate a monadic program in a certain environment and state. Indeed, the user needs to make a choice during the allocation of new values, to know if we allocate the value as immutable or mutable, and with which address. The `M.Cast` operator is also not computable, as we cannot decide if two types are equal.
- We can choose the type that we use for the `State`, as well as the primitives `State.read` and `State.alloc_write`, as long as they verify well-formedness properties. For example, reading after a write at the same address should return the written value. One should choose a `State` that simplifies its proofs the most. To verify the smart contract, we have taken a record with two fields:
  1. the storage of the contract (the `Self` type in Rust),
  2. the list of events logged by the contract.
- Even if the monad is in continuation-passing style, we add a primitive `M.Call` corresponding to a bind, to explicit the points in the code where we call user-defined functions. This is not necessary but helpful to track things in the proofs. Otherwise, the monadic bind is defined as a fixpoint with:
  ```coq
  Fixpoint bind {A B : Set} (e1 : t A) (f : A -> t B) : t B :=
    match e1 with
    | Pure v => f v
    | CallPrimitive primitive k =>
      CallPrimitive primitive (fun v => bind (k v) f)
    | Cast v k =>
      Cast v (fun v' => bind (k v') f)
    | Impossible => Impossible
    end.
  ```
- To handle the panic and `return`/`break` exceptions, we wrap our monad into an error monad:
  ```coq
  Definition M (A : Set) : Set :=
    LowM (A + Exception.t).
  ```
  where `LowM` is the monad without errors as defined above and `Exception.t` is:
  ```coq
  Module Exception.
    Inductive t : Set :=
    (** exceptions for Rust's `return` *)
    | Return {A : Set} : A -> t
    (** exceptions for Rust's `continue` *)
    | Continue : t
    (** exceptions for Rust's `break` *)
    | Break : t
    | Panic : Coq.Strings.String.string -> t.
  End Exception.
  ```

### Proof of equivalence

To prove that the equivalence between the simulation and the original code holds, we proceed by induction on the monadic code. This corresponds to symbolically evaluating the monadic code, in the proof mode of Coq, applying the primitives of the semantics predicate at each step. We use the following tactic to automate this work:

```coq
run_symbolic.
```

We manually handle the following cases:

- branching (`if` or `match`),
- external function calls: generally, we apply an existing equivalence proof for a call to another function instead of doing the symbolic evaluation of the function,
- memory allocations: we need to choose the type of allocation (mutable or immutable) and the address of the allocation for mutable ones.

Here is the proof for the `transfer` function:

```coq
Proof.
  unfold erc20.Impl_erc20_Erc20_t_2.transfer,
    Simulations.erc20.transfer,
    lift_simulation.
  Opaque erc20.transfer_from_to.
  run_symbolic.
  eapply Run.Call. {
    apply run_env.
  }
  run_symbolic.
  eapply Run.Call. {
    apply Env.run_caller.
  }
  run_symbolic.
  eapply Run.Call. {
    now apply run_transfer_from_to.
  }
  unfold lift_simulation.
  destruct erc20.transfer_from_to as [[] [?storage ?logs]]; run_symbolic.
  Transparent erc20.transfer_from_to.
Qed.
```

## Proofs

### Handling of integers

We distinguish the various types of integers used in Rust:

- unsigned ones: `u8`, `u16`, `u32`, `u64`, `u128`, `usize`,
- signed ones: `i8`, `i16`, `i32`, `i64`, `i128`, `isize`.

We define a separate type for each of them, that is to say, a wrapper around the `Z` type of unbounded integers from Coq:

```coq
Module u8.
  Inductive t : Set := Make (z : Z) : t.
End u8.
```

To enforce the bounds, we define a validity predicate for each type:

```coq
Module Valid.
  Definition t {A : Set} `{Integer.C A} (v : A) : Prop :=
    Integer.min <= Integer.to_Z v <= Integer.max.
End Valid.
```

All integer types are of the class `Integer.C` with a `min`, `max`, and `to_Z` functions. We do not embed this predicate with the integer type ([refinement type](https://en.wikipedia.org/wiki/Refinement_type)) to avoid mixing proofs and code. We pay a cost by having to handle the values and the validity proofs separately.

Depending on the configuration mode of Rust, integer operations can overflow or panic. We have several implementations of the arithmetic operations, depending on the mode:

```coq
Module BinOp.
  (** Operators with panic, in the monad. *)
  Module Panic.
    Definition add {A : Set} `{Integer.C A} (v1 v2 : A) : M A :=
      (* ... *)

    Definition sub (* ... *)
  End Panic.

  (** Operators with overflow, outside of the monad as
      there cannot be any errors. *)
  Module Wrap.
    Definition add {A : Set} `{Integer.C A} (v1 v2 : A) : A :=
      (* ... *)

    Definition sub (* ... *)
  End Wrap.
End BinOp.
```

We also have additional operators, useful for the definition of simulations:

- optimistic operators, operating on `Z` without checking the bounds of the result (for cases where we can prove that the result is never out of bounds),
- operators returning in the option monad, to handle the case where the result is out of bounds.

Note that the comparison operators (`=`, `<`, ...) never panic or overflow. In the context of these smart contracts, the arithmetic operators are panicking in case of overflow.

### Definition of messages

We can call the smart contract with three read primitives (`total_supply`, `balance_of`, `allowance`) and three write primitives (`transfer`, `approve`, `transfer_from`). We define two message types to formalize these access points. This will later allow us to express properties over all possible read and write messages:

```coq
Module ReadMessage.
  (** The type parameter is the type of result of the call. *)
  Inductive t : Set -> Set :=
  | total_supply :
    t ltac:(erc20.Balance)
  | balance_of
    (owner : erc20.AccountId.t) :
    t ltac:(erc20.Balance)
  | allowance
    (owner : erc20.AccountId.t)
    (spender : erc20.AccountId.t) :
    t ltac:(erc20.Balance).
End ReadMessage.

Module WriteMessage.
  Inductive t : Set :=
  | transfer
    (to : erc20.AccountId.t)
    (value : ltac:(erc20.Balance)) :
    t
  | approve
    (spender : erc20.AccountId.t)
    (value : ltac:(erc20.Balance)) :
    t
  | transfer_from
    (from : erc20.AccountId.t)
    (to : erc20.AccountId.t)
    (value : ltac:(erc20.Balance)) :
    t.
End WriteMessage.
```

### No panics on read messages

We show that for all possible read messages, the smart contract does not panic:

```coq
Lemma read_message_no_panic
    (env : erc20.Env.t)
    (message : ReadMessage.t ltac:(erc20.Balance))
    (storage : erc20.Erc20.t) :
  let state := State.of_storage storage in
  exists result,
  {{ Environment.of_env env, state |
    ReadMessage.dispatch message ⇓
    (* [inl] means success (no panics) *)
    inl result
  | state }}.
```

This is done by symbolic evaluation of the simulations:

```coq
Proof.
  destruct message; simpl.
  { eexists.
    apply run_total_supply.
  }
  { eexists.
    apply run_balance_of.
  }
  { eexists.
    apply run_allowance.
  }
Qed.
```

### Invariants

The data structure of the storage of the smart contract is as follows:

```rust
pub struct Erc20 {
    total_supply: Balance,
    balances: Mapping<AccountId, Balance>,
    allowances: Mapping<(AccountId, AccountId), Balance>,
}
```

An invariant is that the total supply is always equal to the sum of all the balances in the mapping `Mapping<AccountId, Balance>`. We define this invariant in Coq as:

```coq
Definition sum_of_money (storage : erc20.Erc20.t) : Z :=
  Lib.Mapping.sum Integer.to_Z storage.(erc20.Erc20.balances).

Module Valid.
  Definition t (storage : erc20.Erc20.t) : Prop :=
    Integer.to_Z storage.(erc20.Erc20.total_supply) =
    sum_of_money storage.
End Valid.
```

We show that this invariant holds for any output of the write messages, given that it holds for the input storage:

```coq
Lemma write_dispatch_is_valid
    (env : erc20.Env.t)
    (storage : erc20.Erc20.t)
    (write_message : WriteMessage.t)
    (H_storage : Erc20.Valid.t storage)
    (H_write_message : WriteMessage.Valid.t write_message) :
  let state := State.of_storage storage in
  let '(result, (storage, _)) :=
    WriteMessage.simulation_dispatch env write_message (storage, []) in
  match result with
  | inl _ => Erc20.Valid.t storage
  | _ => True
  end.
```

We assume that the initial storage is valid with the hypothesis:

```coq
(H_storage : Erc20.Valid.t storage)
```

We show the property in the case without panics with:

```coq
match result with
  | inl _ => ...
```

When the smart contract panics (integer overflow), the storage is discarded anyways, and it might actually by invalid. For example, in the `transfer_from_to` function we have:

```rust
self.balances.insert(*from, from_balance - value);
let to_balance = self.balance_of_impl(to);
self.balances.insert(*to, to_balance + value);
```

So if there is a panic during the addition&nbsp;`+`, like an overflow, the final storage can have the `from` account modified but not the `to` account. So here, the balance sum is no longer equal to the total supply.

### Total supply is constant

We show that the total supply is also a constant, meaning that no calls to the smart contract can modify its value. The statement is the following:

```coq
Lemma write_dispatch_is_constant
    (env : erc20.Env.t)
    (storage : erc20.Erc20.t)
    (write_message : WriteMessage.t) :
  let state := State.of_storage storage in
  let '(result, (storage', _)) :=
    WriteMessage.simulation_dispatch env write_message (storage, []) in
  match result with
  | inl _ =>
    storage.(erc20.Erc20.total_supply) =
    storage'.(erc20.Erc20.total_supply)
  | _ => True
  end.
```

It says that for any initial `storage` and `write_message` sent to the smart contract, if we return a result without panicking (`inl _`), then the total supply in the final storage `storage'` is equal to the initial one. We verify this fact by symbolic evaluation of all the branches of the simulation. There are no difficulties in this proof as the code never modifies the `total_supply`.

### Action from the logs

We infer the action of the smart contract on the storage from its logs. This characterizes exactly what we modifications we can deduce on the storage from the logs. We define an action as a function from the storage to a set of possible new storages, given the knowledge of the logs of the contract:

```coq
Module Action.
  Definition t : Type := erc20.Erc20.t -> erc20.Erc20.t -> Prop.
End Action.
```

The main statement is the following:

```coq
Lemma retrieve_action_from_logs
    (env : erc20.Env.t)
    (storage : erc20.Erc20.t)
    (write_message : WriteMessage.t)
    (events : list erc20.Event.t) :
  match
    WriteMessage.simulation_dispatch env write_message (storage, [])
  with
  | (inl (result.Result.Ok tt), (storage', events)) =>
    action_of_events events storage storage'
  | _ => True
  end.
```

This relates the final storage `storage'` to the initial storage `storage` using the logs `events` when there are no panics. We define the `action_of_events` predicate as the successive application of the `action_of_event` predicate, which is defined as:

```coq
Definition action_of_event (event : erc20.Event.t) : Action.t :=
  fun storage storage' =>
  match event with
  | erc20.Event.Transfer (erc20.Transfer.Build_t
      (option.Option.Some from)
      (option.Option.Some to)
      value
    ) =>
    (* In case of transfer event, we do not know how the allowances are
       updated. *)
    exists allowances',
    storage' =
    storage <|
      erc20.Erc20.balances := balances_of_transfer storage from to value
    |> <|
      erc20.Erc20.allowances := allowances'
    |>
  | erc20.Event.Transfer (erc20.Transfer.Build_t _ _ _) => False
  | erc20.Event.Approval (erc20.Approval.Build_t owner spender value) =>
    storage' =
    storage <|
      erc20.Erc20.allowances :=
        Lib.Mapping.insert (owner, spender) value
          storage.(erc20.Erc20.allowances)
    |>
  end.
```

When the `event` in the logs is of kind `erc20.Event.Transfer`, the resulting storage has:

- the `balances` updated according to the function `balances_of_transfer`;
- the `allowances` updated to an unknown value `allowances'`.

When the `event` in the logs is of kind `erc20.Event.Approval`, the resulting storage has:

- the `allowances` updated calling `Lib.Mapping.insert` on `(owner, spender)`;
- the `balances` unchanged.

### Approve only on caller

We added one last proof to say that when the `approve` function succeeds, it only modifies the allowance of the caller:

```coq
Lemma approve_only_changes_owner_allowance
    (env : erc20.Env.t)
    (storage : erc20.Erc20.t)
    (spender : erc20.AccountId.t)
    (value : ltac:(erc20.Balance)) :
  let '(result, (storage', _)) :=
    Simulations.erc20.approve env spender value (storage, []) in
  match result with
  | inl (result.Result.Ok tt) =>
    forall owner spender,
    Integer.to_Z (Simulations.erc20.allowance storage' owner spender) <>
      Integer.to_Z (Simulations.erc20.allowance storage owner spender) ->
    owner = Simulations.erc20.Env.caller env
  | _ => True
  end.
```

If an allowance changes after the call to `approve`, then the owner of the allowance is the caller of the smart contract. This is done by symbolic evaluation of the simulation.

## Conclusion

In this example, we have shown how we formally verify the ERC-20 smart contract written in Rust for the [Aleph Zero](https://alephzero.org/) project. Formally verifying smart contracts is extremely important as they can hold a lot of money, and a single bug can prove fatal as recent attacks continue to show: [List of crypto hacks in 2023](https://www.ccn.com/education/crypto-hacks-2023-full-list-of-scams-and-exploits-as-millions-go-missing/).

If you have Rust smart contracts to verify, feel free to email us at&nbsp;[&#099;&#111;&#110;&#116;&#097;&#099;&#116;&#064;formal&#046;&#108;&#097;&#110;&#100;](mailto:contact@formal.land). We will be happy to help!
