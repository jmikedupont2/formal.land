---
title: 🦄 Software correctness from first principles
tags: [formal verification, software correctness, first principles, example, Python]
authors: []
---

**Formal verification** is a technique to verify the **absence of bugs** in a program by reasoning from **first principles**. Instead of testing a program on examples, what covers a finite number of cases, formal verification checks **all possible cases**. It does so by going back to the **definition of programming languages**, showing why the whole code is correct given how each individual keyword behaves.

We will present this idea in detail and illustrate how it works for a very simple example.

<!-- truncate -->

## Use of formal verification

We typically use formal verification for critical applications, where either:

- life is at stake, like in the case of trains, airplanes, medical devices, or
- money is at stake, like in the case of financial applications.

With formal verification, in theory, **we can guarantee that the software will never fail**, as we can check **all possible cases** for a given property. A property can be that no non-admin users can read sensitive data, or that a program never fails with uncaught exceptions. For that to be truly the case, we need to verify the whole software stack for all the relevant properties.

In this research paper [Finding and Understanding Bugs in C Compilers](https://users.cs.utah.edu/~regehr/papers/pldi11-preprint.pdf), no bugs were found in the middle-end of the formally verified [CompCert](https://en.wikipedia.org/wiki/CompCert) C compiler, while the other C compilers (GCC, LLVM, ...) all contained subtle bugs. This illustrates that formal verification can be an effective way to make complex software with zero bugs!

## Definition of programming languages

To be able to reason on a program we go back to the definition of programming languages. The programming languages (C, JavaScript, Python, ...) are generally defined with a precise set of rules. For example, in Python, the `if` statement is [defined in the reference manual](https://docs.python.org/3/reference/compound_stmts.html#if) by:

```python
if_stmt ::=  "if" assignment_expression ":" suite
             ("elif" assignment_expression ":" suite)*
             ["else" ":" suite]
```
> It selects exactly one of the suites by evaluating the expressions one by one until one is found to be true (see section Boolean operations for the definition of true and false); then that suite is executed (and no other part of the if statement is executed or evaluated). If all expressions are false, the suite of the else clause, if present, is executed.
>
> &mdash; <cite>The Python's reference manual</cite>

This means that the Python code:

```python
if condition:
    a
else:
    b
```

will execute `a` when the `condition` is true, and `b` otherwise. There are similar rules for all other program constructs (loops, function definitions, classes, ...).

To make these rules more manageable, we generally split them into two parts:

- The syntax part, that defines what is a valid program in the language. For example, in Python, the syntax is defined by the [grammar](https://docs.python.org/3/reference/grammar.html).
- The semantics part, that defines what a program does. This is what we have seen above with the description of the behavior of the `if` statement.

In formal verification, we will focus on the semantics of programs,  assuming that the syntax is already verified by the compiler or interpreter, generating "syntax errors" in case of ill-formed programs.

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

We can certainly not run&nbsp;`my_max` on all possible lists of integers, as there are infinitely many of them. We need to reason from the definition of the Python language, which is what we call formal verification reasoning.

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

At the start of the code, we will always have:

```python
def my_max(l):
    m = l[0]
```

with `m` being equal to the first item of the list. Then:

- If the list has only one element, we iterate only once in the `for` loop, with `x` equal to `l[0]`. The condition:
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
    1. In the first case, `m` stays the same, so it is still larger or equal to all the elements of the list except the last one, as well as larger or equal to the last one according to this last&nbsp;`if` statement.
    2. In the second case, `m` is updated to `x`, which is the last element of the list and a greater value than the original&nbsp;`m`. Then it means that `m` is still larger or equal to all the elements of the list except the last one, being larger that the original&nbsp;`m`, and larger or equal to the last one as it is in fact equals to the last one.

We have now closed our induction proof and verified that our property is true for all possible lists of integers! The reasoning above is rather verbose but should actually correspond to the intuition of most programmers when reading this code.

In practice, with formal verification, the reasoning above is done in a proof assistance such as [Coq](https://coq.inria.fr/) to help making sure that we did not forget any case, and automatically solve simple cases for us. Having a proof written in a proof language like Coq also allows us to re-run it to check that it is still valid after a change in the code, and allows third-party persons to check it without reading all the details.

## Completing the property

An additional property that we did not verify is:

```python
forall (l : list[int]),
    exists (index : int),
        0 ≤ index < len(l) and
        l[index] = my_max(l)
```

It says that the maximum of the list is actually in the list. We can verify it by induction in the same way as we did for the first property. You can detail this verification as an exercise.

:::info For more

If you want to go into more details for the formal verification of Python programs, you can look at our [coq-of-python](https://github.com/formal-land/coq-of-python) project, where we define the semantics of Python in Coq and verify properties of Python programs (ongoing project!). We also provide formal verification services for [Rust](https://github.com/formal-land/coq-of-rust) and other languages like [OCaml](https://github.com/formal-land/coq-of-ocaml). Contact us at&nbsp;[&#099;&#111;&#110;&#116;&#097;&#099;&#116;&#064;formal&#046;&#108;&#097;&#110;&#100;](mailto:contact@formal.land) to discuss if you have critical applications to check!

:::

## Conclusion

We have presented here the idea of **formal verification**, a technique to verify the absence of bugs in a program by reasoning from **first principles**. We have illustrated this idea for a simple Python example, showing how we can verify that a function computing the maximum of a list is correct **for all possible lists of integers**.

We will continue with more blog posts explaining what we can do with formal verification and why it matters. Feel free to share this post and to tell us what subjects you want to see covered!
