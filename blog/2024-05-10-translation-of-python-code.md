---
title: Translation of Python code
tags: [coq-of-python, Python, Coq, translation, Ethereum]
authors: []
---

We are starting to work on a new product, [coq-of-python](https://github.com/formal-land). The idea of this tool is, as you can guess, to translate Python code to the [proof system Coq](https://coq.inria.fr/).

We want to import specifications written in Python to a formal system like Coq. In particular we are interested by the [reference specification](https://github.com/ethereum/execution-specs) of [Ethereum](https://ethereum.org/) which describes how [EVM smart contracts](https://ethereum.org/en/developers/docs/evm/) run. Then we will be able to use this specification to either formally verification the various implementations of the EVM, or smart contracts using it.

All this effort follows a Tweet from [Vitalik Buterin](https://twitter.com/VitalikButerin/status/1759369749887332577) hoping for more formal verification to limit the risk of bugs in the Ethereum code:

> One application of AI that I am excited about is AI-assisted formal verification of code and bug finding.
>
> Right now ethereum's biggest technical risk probably is bugs in code, and anything that could significantly change the game on that would be amazing.

Vitalik Buterin

We will now describe the technical development of `coq-of-python`.

<!-- truncate -->

<figure>
  ![Python with a rooster](2024-05-10/python_rooster.webp)
  <!-- <figcaption>A python with a rooster</figcaption> -->
</figure>

## Reading Python code 📖

A first we need to do to translate Python code is to read it in a programmatic way. For simplicity and better integration, we chose to write `coq-of-python` in Python.

We use the [ast](https://docs.python.org/3/library/ast.html) module to parse the code and get an abstract syntax tree (AST) of the code. This is a tree representation of the code that we can manipulate in Python. We could have used other representations, such as the Python bytecode, but it seemed too low-level to be understandable by a human.

Given the path to a Python file, we get its AST with the following code:

```python
import ast

def read_python_file(path: str) -> ast.Module:
    with open(path, "r") as file:
        return ast.parse(file.read())
```

This code is very short and we benefit from the general elegance of Python. There is no typing or advanced data types in Python, keeping the AST rather small. Here is an extract of it:

```
expr = BoolOp(boolop op, expr* values)
     | NamedExpr(expr target, expr value)
     | BinOp(expr left, operator op, expr right)
     | UnaryOp(unaryop op, expr operand)
     | Lambda(arguments args, expr body)
     | IfExp(expr test, expr body, expr orelse)
     | Dict(expr* keys, expr* values)
     | Set(expr* elts)
     | ListComp(expr elt, comprehension* generators)
     | SetComp(expr elt, comprehension* generators)
     | ... more cases ...
```

An expression is described as being of one of several kinds. For example, the application of a binary operator such as:

```python
1 + 2
```

corresponds to the case `BinOp` with `1` as the `left` expression, `+` as the `op` operator, and `2` as the `right` expression.

## Outputting Coq code 📝

We translate each element of the AST of Python to a string of Coq code. We keep track of the current indentation level in order to present a nice output. Here is the code to translate the binary operator expressions:

```python
def generate_expr(indent, is_with_paren, node: ast.expr):
    if isinstance(node, ast.BoolOp):
        ...
    elif isinstance(node, ast.BinOp):
        return paren(
            is_with_paren,
            generate_operator(node.op) + " (|\n" +
            generate_indent(indent + 1) +
            generate_expr(indent + 1, False, node.left) + ",\n" +
            generate_indent(indent + 1) +
            generate_expr(indent + 1, False, node.right) + "\n" +
            generate_indent(indent) + "|)"
        )
    elif ...
```

We have the current number of indentation levels in the `indent` variable. We use the flag `is_with_paren` to know whether we should add parenthesis around the current expression, in case it is the sub-expression of another one.

We apply the `node.op` operator on the two parameters `node.left` and `node.right`. For example, the translation of the Python code `1 + 2` will be:

```coq
BinOp.add (|
  Constant.int 1,
  Constant.int 2
|)
```

We use a special notation `f (| x1, ..., xn |)` to represent a function application in a monadic context. We explain in the next section why we need this notation.

## Monad and values 🔮

One of the difficulty in translating some code to a language such as Coq is that Coq is purely functional. This means that a function can never modify a variable or raise an exception. The non-purely functional actions are called side-effects.

To solve this issue, we represent the side-effects of the Python code in a [monad](<https://en.wikipedia.org/wiki/Monad_(functional_programming)>) in Coq. A monad is a special data structure representing the side-effects of a computation. We can chain monadic actions together to represent a sequence of side-effects.

We thus have two Coq types:

- `Value.t` for the Python values (there is only one type for all values, as Python is a dynamically typed language),
- `M` for the monadic expressions.

Note that we do not need to parametrize the monad by the type of the values, as we only have one type of values.

### Values

According to the reference manual of Python on the [data model](https://docs.python.org/3/reference/datamodel.html):

> All data in a Python program is represented by objects or by relations between objects.

> Every object has an identity, a type and a value. An object’s identity never changes once it has been created; you may think of it as the object’s address in memory.

> Like its identity, an object’s type is also unchangeable.

> The value of some objects can change. Objects whose value can change are said to be mutable; objects whose value is unchangeable once they are created are called immutable.

By following this description, we propose this formalization for the values:

```coq
Module Data.
  Inductive t (Value : Set) : Set :=
  | Ellipsis
  | Bool (b : bool)
  | Integer (z : Z)
  | Tuple (items : list Value)
  (* ... various other primitive types like lists, ... *)
  | Closure {Value M : Set} (f : Value -> Value -> M)
  | Klass {Value M : Set}
    (bases : list (string * string))
    (class_methods : list (string * (Value -> Value -> M)))
    (methods : list (string * (Value -> Value -> M))).
End Data.

Module Object.
  Record t {Value : Set} : Set := {
    internal : option (Data.t Value);
    fields : list (string * Value);
  }.
End Object.

Module Pointer.
  Inductive t (Value : Set) : Set :=
  | Imm (data : Object.t Value)
  | Mutable {Address A : Set}
    (address : Address)
    (to_object : A -> Object.t Value).
End Pointer.

Module Value.
  Inductive t : Set :=
  | Make (globals : string) (klass : string) (value : Pointer.t t).
End Value.
```

We describe a `Value.t` by:

- its type, given by a class name `klass` and a module name `globals` from which the class is defined,
- its value, given by a pointer to an object.

A `Pointer.t` is either an immutable object `Imm` or a mutable object `Mutable` with an address and a function to get the object from what is stored in the memory. This function `to_object` is required as we plan later to allow the user to provide its own custom memory model.

An `Object.t` has a list of named fiels that we can populate in the `__init__` method of a class. It also has a special field `internal` that we can use to store special kinds of data, like primitive values.

In `Data.t` we list the various primitive values, which we use to define the primitive types of the Python language. We have:

- atomic values such as booleans, integers, strings, ...
- composite values such as tuples, lists, dictionaries, ...
- closures with a function that takes the two arguments `*args` and `**kwargs` and returns a monadic value,
- classes with their bases, class methods, and instance methods.

## Splitting the generated code 🪓

The main change we made was to split the output generated by `coq-of-rust` with one file for each input Rust file. This is possible because our translation is insensitive to the order of definitions and context-free. So, even if there are typically cyclic dependencies between the files in Rust, something that is forbidden in Coq, we can still split them.

We get the following sizes as output:

- `alloc`: 54 Coq files, 171,783 lines of Coq code
- `core`: 190 Coq files, 592,065 lines of Coq code

The advantages of having the code split are:

- it is easier to read and navigate in the generated code
- it is easier to compile as we can parallelize the compilation
- it is easier to debug as we can focus on one file at a time
- it is easier to ignore files that do not compile
- it will be easier to maintain, as it is easier to follow the diff of a single file

## Fixing some bugs 🐞

We had some bugs related to the collisions between module names. These can occur when we choose a name for the module for an `impl` block. We fixed these by adding more information in the module names to make them more unique, like the `where` clauses that were missing. For example, for the implementation of the `Default` trait for the `Mapping` type:

```rust
#[derive(Default)]
struct Mapping<K, V> {
    // ...
}
```

we were generating the following Coq code:

```coq
Module Impl_core_default_Default_for_dns_Mapping_K_V.
  (* ...trait implementation ... *)
End Impl_core_default_Default_for_dns_Mapping_K_V.
```

We now generate:

```coq
Module Impl_core_default_Default_where_core_default_Default_K_where_core_default_Default_V_for_dns_Mapping_K_V.
  (* ... *)
```

with a module name that includes the `where` clauses of the `impl` block, stating that both `K` and `V` should implement the `Default` trait.

Here is the list of files that do not compile in Coq, as of today:

- `alloc/boxed.v`
- `core/any.v`
- `core/array/mod.v`
- `core/cmp/bytewise.v`
- `core/error.v`
- `core/escape.v`
- `core/iter/adapters/flatten.v`
- `core/net/ip_addr.v`

This represents 4% of the files. Note that in the files that compile there are some unhandled Rust constructs that are axiomatized, so this does not give the whole picture of what we do not support.

## Example 🔎

Here is the source code of the `unwrap_or_default` method for the `Option` type:

```rust
pub fn unwrap_or_default(self) -> T
where
    T: Default,
{
    match self {
        Some(x) => x,
        None => T::default(),
    }
}
```

We translate it to:

```coq
Definition unwrap_or_default (T : Ty.t) (τ : list Ty.t) (α : list Value.t) : M :=
  let Self : Ty.t := Self T in
  match τ, α with
  | [], [ self ] =>
    ltac:(M.monadic
      (let self := M.alloc (| self |) in
      M.read (|
        M.match_operator (|
          self,
          [
            fun γ =>
              ltac:(M.monadic
                (let γ0_0 :=
                  M.get_struct_tuple_field_or_break_match (|
                    γ,
                    "core::option::Option::Some",
                    0
                  |) in
                let x := M.copy (| γ0_0 |) in
                x));
            fun γ =>
              ltac:(M.monadic
                (M.alloc (|
                  M.call_closure (|
                    M.get_trait_method (| "core::default::Default", T, [], "default", [] |),
                    []
                  |)
                |)))
          ]
        |)
      |)))
  | _, _ => M.impossible
  end.
```

We prove that it is equivalent to the simpler functional code:

```coq
Definition unwrap_or_default {T : Set}
    {_ : core.simulations.default.Default.Trait T}
    (self : Self T) :
    T :=
  match self with
  | None => core.simulations.default.Default.default (Self := T)
  | Some x => x
  end.
```

This simpler definition is what we use when verifying code. The proof of equivalence is in [CoqOfRust/core/proofs/option.v](https://github.com/formal-land/coq-of-rust/blob/main/CoqOfRust/core/proofs/option.v). In case the original source code changes, we are sure to capture these changes thanks to our proof. Because the translation of the `core` library was done automatically, we trust the generated definitions more than definitions that would be done by hand. However, there can still be mistakes or incompleteness in `coq-of-rust`, so we still need to check at proof time that the code makes sense.

## Conclusion

We can now work on the verification of Rust programs with more trust in our formalization of the standard library. Our next target is to simplify our proof process, which is still tedious. In particular, showing that simulations are equivalent to the original Rust code requires doing the name resolution, introduction of high-level types, and removal of the side-effects. We would like to split these steps.

If you are interested in formally verifying your Rust projects, do not hesitate to get in touch with us at&nbsp;[&#099;&#111;&#110;&#116;&#097;&#099;&#116;&#064;formal&#046;&#108;&#097;&#110;&#100;](mailto:contact@formal.land)&nbsp;💌! Formal verification provides the highest level of safety for critical applications, with a mathematical guarantee of the absence of bugs for a given specification.
