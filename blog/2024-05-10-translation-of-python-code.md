---
title: 🐍 Translation of Python code to Coq
tags: [coq-of-python, Python, Coq, translation, Ethereum]
authors: []
---

We are starting to work on a new product, [coq-of-python](https://github.com/formal-land/coq-of-python). The idea of this tool is, as you can guess, to translate Python code to the [proof system Coq](https://coq.inria.fr/).

We want to import specifications written in Python to a formal system like Coq. In particular, we are interested in the [reference specification](https://github.com/ethereum/execution-specs) of [Ethereum](https://ethereum.org/), which describes how [EVM smart contracts](https://ethereum.org/en/developers/docs/evm/) run. Then, we will be able to use this specification to either formally verify the various implementations of the EVM or smart contracts.

All this effort follows [a Tweet](https://twitter.com/VitalikButerin/status/1759369749887332577) from [Vitalik Buterin](https://en.wikipedia.org/wiki/Vitalik_Buterin) hoping for more formal verification of the Ethereum's code:

> One application of AI that I am excited about is AI-assisted formal verification of code and bug finding.
>
> Right now ethereum's biggest technical risk probably is bugs in code, and anything that could significantly change the game on that would be amazing.
>
> &mdash; <cite>Vitalik Buterin</cite>

We will now describe the technical development of `coq-of-python`. For the curious, all the code is on GitHub: [formal-land/coq-of-python](https://github.com/formal-land/coq-of-python).

<!-- truncate -->

<figure>
  ![Python with a rooster](2024-05-10/python_rooster.webp)
  <!-- <figcaption>A python with a rooster</figcaption> -->
</figure>

## Reading Python code 📖

A first step we need to do to translate Python code is to read it in a programmatic way. For simplicity and better integration, we chose to write `coq-of-python` in Python.

We use the [ast](https://docs.python.org/3/library/ast.html) module to parse the code and get an abstract syntax tree (AST) of the code. This is a tree representation of the code that we can manipulate in Python. We could have used other representations, such as the Python bytecode, but it seemed too low-level to be understandable by a human.

Given the path to a Python file, we get its AST with the following code:

```python
import ast

def read_python_file(path: str) -> ast.Module:
    with open(path, "r") as file:
        return ast.parse(file.read())
```

This code is very short, and we benefit from the general elegance of Python. There is no typing or advanced data types in Python, keeping the AST rather small. Here is an extract of it:

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

We translate each element of the Python's AST into a string of Coq code. We keep track of the current indentation level in order to present a nice output. Here is the code to translate the binary operator expressions:

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

We have the current number of indentation levels in the `indent` variable. We use the flag `is_with_paren` to know whether we should add parenthesis around the current expression if it is the sub-expression of another one.

We apply the `node.op` operator on the two parameters `node.left` and `node.right`. For example, the translation of the Python code `1 + 2` will be:

```coq
BinOp.add (|
  Constant.int 1,
  Constant.int 2
|)
```

We use a special notation `f (| x1, ..., xn |)` to represent a function application in a monadic context. In the next section, we explain why we need this notation.

## Monad and values 🔮

One of the difficulties in translating some code to a language such as Coq is that Coq is purely functional. This means that a function can never modify a variable or raise an exception. The non-purely functional actions are called side-effects.

To solve this issue, we represent the side-effects of the Python code in a [monad](<https://en.wikipedia.org/wiki/Monad_(functional_programming)>) in Coq. A monad is a special data structure representing the side-effects of a computation. We can chain monadic actions together to represent a sequence of side-effects.

We thus have two Coq types:

- `Value.t` for the Python values (there is only one type for all values, as Python is a dynamically typed language),
- `M` for the monadic expressions.

Note that we do not need to parametrize the monad by the type of the values, as we only have one type of value.

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

A `Pointer.t` is either an immutable object `Imm` or a mutable object `Mutable` with an address and a function to get the object from what is stored in the memory. This function `to_object` is required as we plan to allow the user to provide its own custom memory model.

An `Object.t` has a list of named fields that we can populate in the `__init__` method of a class. It also has a special `internal` field that we can use to store special kinds of data, like primitive values.

In `Data.t`, we list the various primitive values that we use to define the primitive types of the Python language. We have:

- atomic values such as booleans, integers, strings, ...
- composite values such as tuples, lists, dictionaries, ...
- closures with a function that takes the two arguments `*args` and `**kwargs` and returns a monadic value,
- classes with their bases, class methods, and instance methods.

### Monad

For now, we axiomatize the monad `M`:

```coq
Parameter M : Set.
```

We will see later how to define it, probably by taking some inspiration from our monad from our similar project [coq-of-rust](https://github.com/formal-land/coq-of-rust).

To make the monadic code less heavy, we use a notation inspired by the `async/await` notation of many languages. We believe it to be less heavy than the monadic notation of languages like [Haskell](https://www.haskell.org/). We note:

```coq
f (| x1, ..., xn |)
```

to call a function `f` of type:

```coq
Value.t -> ... -> Value.t -> M
```

with the arguments `x1`, ..., `xn` of type `Value.t` and binds its result to the current continuation in the context of the tactic `ltac:(M.monadic ...)`. See our blog post [Monadic notation for the Rust translation](/blog/2024/04/03/monadic-notation-for-rust-translation) for more information.

In summary:

- `f (| x1, ..., xn |)` is like `await`,
- `ltac:(M.monadic ...)` is like `async`.

## Handling of the names 🏷️

Now we talk about how we handle the variable names and link them to their definitions. In the reference manual of Python, the part [Execution model](https://docs.python.org/3/reference/executionmodel.html) gives some information.

For now, we distinguish between two scopes, the global one (top-level definitions) and the local one for variables defined in a function. We might introduce a stack of local scopes to handle nested functions.

We name the global scope with a string, that is the path of the current file. Having absolute names helps us translating each file independently. The only file that a translated file requires is `CoqOfPython.CoqOfPython`, to have the definition of the values and the monad.

To translate `import` statements, we use assertions:

```coq
Axiom ethereum_crypto_imports_elliptic_curve :
  IsImported globals "ethereum.crypto" "elliptic_curve".
Axiom ethereum_crypto_imports_finite_field :
  IsImported globals "ethereum.crypto" "finite_field".
```

This represents:

```python
from . import elliptic_curve, finite_field
```

It means that in the current global scope `globals` we can use the name `"elliptic_curve"` from the other global scope `"ethereum.crypto"`.

We set the local scope at the entry of a function with the call:

```coq
M.set_locals (| args, kwargs, [ "x1"; ...; "xn" ] |)
```

for a function whose parameter names are `x1`, ..., `xn`. For uniformity, we always group the function's parameters as `*args` and `**kwargs`. We do not yet handle the default values.

When a user creates or updates a local variable `x` with a value `value`, we run:

```coq
M.assign_local "x" value : M
```

To read a variable, we have a primitive:

```coq
M.get_name : string -> string -> M
```

It takes as a parameter the name of the current global scope and the name of the variable the are reading. The local scope should be accessible from the monad. For now all these primitives are axiomatized.

## Some numbers 📊

The code base that we analyze, the Python specification of Ethereum, contains _28,455 lines_ of Python, excluding comments. When we translate it to Coq we obtain _299,484 lines_. This is a roughly ten times increase.

The generated code completely compiles. For now, we avoid some complex Python expressions, like list comprehension, by generating a dummy expression instead. Having all the code that compiles will allow us to iterate and add support for more Python features with a simple check: making sure that all the code still compiles.

As an example, we translate the following function:

```python
def bnf2_to_bnf12(x: BNF2) -> BNF12:
    """
    Lift a field element in `BNF2` to `BNF12`.
    """
    return BNF12.from_int(x[0]) + BNF12.from_int(x[1]) * (
        BNF12.i_plus_9 - BNF12.from_int(9)
    )
```

to the Coq code:

```coq
Definition bnf2_to_bnf12 : Value.t -> Value.t -> M :=
  fun (args kwargs : Value.t) => ltac:(M.monadic (
    let _ := M.set_locals (| args, kwargs, [ "x" ] |) in
    let _ := Constant.str "
    Lift a field element in `BNF2` to `BNF12`.
    " in
    let _ := M.return_ (|
      BinOp.add (|
        M.call (|
          M.get_field (| M.get_name (| globals, "BNF12" |), "from_int" |),
          make_list [
            M.get_subscript (|
              M.get_name (| globals, "x" |),
              Constant.int 0
            |)
          ],
          make_dict []
        |),
        BinOp.mult (|
          M.call (|
            M.get_field (| M.get_name (| globals, "BNF12" |), "from_int" |),
            make_list [
              M.get_subscript (|
                M.get_name (| globals, "x" |),
                Constant.int 1
              |)
            ],
            make_dict []
          |),
          BinOp.sub (|
            M.get_field (| M.get_name (| globals, "BNF12" |), "i_plus_9" |),
            M.call (|
              M.get_field (| M.get_name (| globals, "BNF12" |), "from_int" |),
              make_list [
                Constant.int 9
              ],
              make_dict []
            |)
          |)
        |)
      |)
    |) in
    M.pure Constant.None_)).
```

## Conclusion

We continue working on the translation from Python to Coq, especially to now add a semantics to the translation. Our next goal is to have a version, written in idiomatic Coq, of the file [src/ethereum/paris/vm/instructions/arithmetic.py](https://github.com/ethereum/execution-specs/blob/master/src/ethereum/paris/vm/instructions/arithmetic.py), and proven equal to the original code. This will open the door to making a Coq specification of the EVM that is always synchronized to the Python's version.

For our services, reach us at&nbsp;[&#099;&#111;&#110;&#116;&#097;&#099;&#116;&#064;formal&#046;&#108;&#097;&#110;&#100;](mailto:contact@formal.land)&nbsp;🏇! We want to ensure the blockchain's L1 and L2 are bug-free, thanks to a mathematical analysis of the code. See [our previous project](https://formal-land.gitlab.io/coq-tezos-of-ocaml/) on the L1 of Tezos.
