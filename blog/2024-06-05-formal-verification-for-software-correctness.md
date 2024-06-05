---
title: 🦄 Software correctness from first principles
tags: [formal verification, software correctness]
authors: []
---

**Formal verification** is a technique to verify the absence of bugs in a program by reasoning from **first principles**. Instead of testing a program on examples, what can only cover a finite number of cases, formal verification checks all possible cases. It does so by going back to the definition of programming languages, showing why the whole code is correct given how each individual keyword behaves.

We will present this idea in details and illustrate how it works on a very simple example.

<!-- truncate -->

## Use of formal verification

We typically use formal verification for critical applications, where either:

- life is at stake, like in the case of trains, airplanes, medical devices, or
- money is at stake, like in the case of financial applications.

With formal verification, in theory, **we can guarantee that the software will never fail**, as we can check **all possible cases** for a given property. A property can be that no non-admin users can read sensitive data, or that a program never fails with  uncaught exceptions.

<!-- 1. Verify the whole system: for example, we rarely formally verify the operating system itself, while a bug in it, even if unlikely, can crash any applications.
2. Verify all the required *properties*. A property can be that a new software release is backward compatible with the previous one, if the goal is to make a release that only adds new features.

Even if these two conditions are rarely met, formal verification is a powerful tool to reduce the number of bugs, sometimes down to zero. -->

In this research paper [Finding and Understanding Bugs in C Compilers](https://users.cs.utah.edu/~regehr/papers/pldi11-preprint.pdf), no bugs were found in the middle-end of the formally verified [CompCert](https://en.wikipedia.org/wiki/CompCert) C compiler, while the other C compilers (GCC, LLVM, ...) all contained subtle bugs. This illustrate that formal verification can be an effective way to make complex software with zero bugs!

## Definition of programming languages

To be able to reason on a program, we go back to the definition of what is a programming language. These languages (C, JavaScript, Python, ...) are generally defined with a precise set of rules. For example, in Python, the `if` statement is [defined in the reference manual](https://docs.python.org/3/reference/compound_stmts.html#if) by:

```python
if_stmt ::=  "if" assignment_expression ":" suite
             ("elif" assignment_expression ":" suite)*
             ["else" ":" suite]
```
> It selects exactly one of the suites by evaluating the expressions one by one until one is found to be true (see section Boolean operations for the definition of true and false); then that suite is executed (and no other part of the if statement is executed or evaluated). If all expressions are false, the suite of the else clause, if present, is executed.

This means that the Python code:

```python
if condition:
    a
else:
    b
```

will execute `a` when the `condition` is true, and `b` otherwise. There are similar rules for all other program constructs (loops, function definitions, classes, ...).

To make these rules more manageable, there are generally split into two parts:

- The syntax, that defines what is a valid program in the language. For example, in Python, the syntax is defined by the [grammar](https://docs.python.org/3/reference/grammar.html).
- The semantics, that defines what a program does. This is what we have seen above with the description of the behavior of the `if` statement.

In formal verification, we will focus on the semantics of programs,  assuming that the syntax is already verified by the compiler or interpreter.

## Example to verify

We consider this short Python example of a function returning the maximum number in a list:

```python
def my_max(l):
    m = l[0]
    for x in l:
        if x > m:
            m = x
    return m
```

We assume that the list `l` is not empty and only contains integers. If we run it on a few examples:

```python
my_max([1, 2, 3]) # => 3
my_max([3, 2, 1]) # => 3
my_max([1, 3, 2]) # => 3
```

it always returns&nbsp;`3`, the biggest number in the list! But can we make sure this is always the case?

We can certainly not run&nbsp;`my_max` on all possible lists of integers, as there are infinitely many of them. We need to reason from the definition of the Python language, what we call formal verification reasoning.

## Formal verification

Here is a general specification that we give of the&nbsp;`my_max` function above:

```python
forall (index : int) (l : list[int]),
    0 ≤ index < len(l) ⇒
    l[index] ≤ my_max(l)
```

It says that for all integer `index` and list of integers `l`, if the index is valid (between&nbsp;`0` and the length of the list), then the element at this index is less than or equal to the maximum of the list that we compute.

To verify this property for all possible list&nbsp;`l`, we reason by induction. A non-empty list is either:

- a list with one element, where the maximum is the only element, or
- a list with at least two elements, where the maximum is either the last element or the maximum of the rest of the list.

At the start of the code we will always have:

```python
def my_max(l):
    m = l[0]
```

with `m` being equal to the first item of the list. Then:

- If the list has only one element, we iterate only once in the `for` loop, with `x` equals to `l[0]`. The condition:
  ```python
  if x > m:
  ```
  is then equivalent to:
  ```python
  if l[0] > l[0]:
  ```
  and is always false. We then return `m = l[0]`, which is the only element of the list, and it verifies our property as:
  ```python
  l[0] ≤ l[0]
  ```
- If the list has at least two elements, we unroll the code execution of the `for` loop and iterate over all the elements until the last one. Our induction hypothesis tells us that the property we verify is true for the first part of the list, excluding the last element. This means that:
    ```python
    l[index] ≤ m
    ```
    for all `index` between `0` and `len(l) - 2`. When we reach the last element, we have:
    ```python
    if x > m:
        m = x
    ```
    with `x` being `l[len(l) - 1]`. There are two possibilities. Either *(i)* `x` is less than or equal to `m`, and we do not update `m`, or *(ii)* `x` is greater than `m`, and we update `m` to `x`. In both cases, the property is verified for the last element of the list, as:
    1. In the first case, `m` stays the same so is still larger or equal to all the elements of the list except the last one, as well as larger or equal to the last one according to this last&nbsp;`if` statement.
    2. In the second case, `m` is updated to `x`, which is the last element of the list and a greater value than the original&nbsp;`m`. Then it means that `m` is still larger or equal to all the elements of the list except the last one, being larger that the original&nbsp;`m`, and larger or equal to the last one as it is in fact equals to the last one.

We have now closed our induction proof and verified that our property is true for all possible lists of integers! The reasoning above is rather verbose, but should actually correspond to the intuition of most programmers when reading this code.

## Completing the property

<!-- talk about verifying that the element is indeed in the list -->

## Conclusion

We have presented an alternative way to build simulations of imperative Python code in purely functional Coq code. The idea is to enable faster reasoning over Python code by removing the need to build explicit simulations. We plan to port this technique to other tools like [coq-of-rust](https://github.com/formal-land/coq-of-rust) as well.

To see what we can do for you talk with us at&nbsp;[&#099;&#111;&#110;&#116;&#097;&#099;&#116;&#064;formal&#046;&#108;&#097;&#110;&#100;](mailto:contact@formal.land)&nbsp;🏇. For our previous projects, see our [formal verification of the Tezos' L1](https://formal-land.gitlab.io/coq-tezos-of-ocaml/)!
