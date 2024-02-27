---
title: Translating Go to Coq, part 1
tags: [coq-of-go, Go, Coq, translation]
authors: []
---

In this blog post, we present our development steps to build a tool to translate Go programs to the proof system Coq.

The goal is to formally verify Go programs to make them totally bug-free. It is actually possible to make a program totally bug-free, as [formal verification](https://en.wikipedia.org/wiki/Formal_verification) can cover all execution cases and kinds of properties thanks to the use of mathematical methods. This corresponds to the highest level of the [Evaluation Assurance Levels](https://en.wikipedia.org/wiki/Evaluation_Assurance_Level) used for critical applications, such as the space industry.

All the code of our work is available on GitHub at [github.com/formal-land/coq-of-go-experiment](https://github.com/formal-land/coq-of-go-experiment).

<!-- truncate -->

## Introduction

We believe that there are not yet a lot of formal verification tools for Go. We can cite [Goose](https://github.com/tchajed/goose), which is working by translation from Go to the proof system Coq. We will follow a similar approach, translating the Go language to our favorite proof system Coq. In contrast to Goose, we plan to support the whole Go language, even at the expense of the simplicity of the translation.

For that, we target the translation of the [SSA form of Go](https://pkg.go.dev/golang.org/x/tools/go/ssa) of Go instead of the [Go AST](https://pkg.go.dev/go/ast). The SSA form is a more low-level representation of Go, so we hope to capture the semantics of the whole Go language more easily. This should be at the expense of the simplicity of the generated translation, but we hope that having full language support outweighs this.

Go is an interesting target as:

- this is quite a popular language,
- it is focusing on simplicity, with a reduced set of language features,
- a lot of critical backend applications are written in Go, including for very large companies (Google, Netflix, Uber, Twitch, etc.).

Among interesting properties that we can verify are:

- the absence of reachable `panic` in the code,
- the absence of race conditions or deadlocks,
- the backward compatibility from release to release, for parts of the code whose behavior is not supposed to change,
- the strict application of business rules.

:::tip Contact

You can [follow us on X](https://twitter.com/LandFoobar) to get our updates. We propose tools and services to make your codebase totally bug-free. Contact us at&nbsp;[&#099;&#111;&#110;&#116;&#097;&#099;&#116;&#064;formal&#046;&#108;&#097;&#110;&#100;](mailto:contact@formal.land) to chat! We offer a free audit to assess the feasibility of formal verification on your case.

:::

:::note Goal

Our company goal is to make formal verification accessible to all projects, reducing its cost to&nbsp;20% of the development cost. There should be no reason to have bugs in end-user products!

:::

![Mole and Rooster](2024-02-22/mole_rooster.webp)

## First target

Our first target is to achieve the formal verification _including all the dependencies_ of the hello world program:

```go
package main

import "fmt"

func main() {
	fmt.Println("Hello, World!")
}
```

What we want to show about this code is that it does a single and only thing: outputting the string "Hello, World!" to the standard output. Its only dependency is the `fmt` package, but when we look at the transitive dependencies of this package:

```sh
go list -f '{{ .Deps }}' fmt
```

we get around forty packages:

```
errors
internal/abi
internal/bytealg
internal/coverage/rtcov
internal/cpu
internal/fmtsort
internal/goarch
internal/godebugs
internal/goexperiment
internal/goos
internal/itoa
internal/oserror
internal/poll
internal/race
internal/reflectlite
internal/safefilepath
internal/syscall/execenv
internal/syscall/unix
internal/testlog
internal/unsafeheader
io
io/fs
math
math/bits
os
path
reflect
runtime
runtime/internal/atomic
runtime/internal/math
runtime/internal/sys
runtime/internal/syscall
sort
strconv
sync
sync/atomic
syscall
time
unicode
unicode/utf8
unsafe
```

We will need to translate all these packages to meaningful Coq code.

## The start

We made the `coq-of-go` tool, with everything in a single file [main.go](https://github.com/formal-land/coq-of-go-experiment/blob/main/main.go) for now. We retrieve the SSA form of a Go package provided as a command line parameter (code without the error handling):

```go
func main() {
	packageToTranslate := os.Args[1]
	cfg := &packages.Config{Mode: packages.LoadSyntax}
	initial, _ := packages.Load(cfg, packageToTranslate)
	_, pkgs := ssautil.Packages(initial, 0)
	pkgs[0].Build()
	members := pkgs[0].Members
```

:::note SSA form

The [SSA form](https://en.wikipedia.org/wiki/Static_single-assignment_form) of a program is generally used internally by compilers to have a simple representation to work on. The [LLVM](https://llvm.org/) language is such an example. In SSA, each variable is assigned exactly once and the control flow is explicit, with jumps or conditional jumps to labels. There are no `for` loops, `if` statements, or non-primitive expressions.

:::

Then we iterate over all the SSA `members`, and directly print the corresponding Coq code to the standard output. We do not use an intermediate representation or make intermediate passes. We do not even do pretty-printing (splitting lines that are too long at the right place, and introducing indentation)! This should not be necessary as the SSA code cannot nest sub-expressions or statements. We still try to print a readable Coq code, as it will be used in the proofs.

There are four kinds of SSA members:

- named constants,
- globals,
- types,
- functions.

Named constants and globals are similar, and are for top-level variables whose value is either known at compile-time or computed at the program's init. Types are for type definitions. We will focus on functions, as this is where the code is.

## Functions

The SSA functions in Go are described by the type [`ssa.Function`](https://pkg.go.dev/golang.org/x/tools/go/ssa#Function):

```go
type Function struct {
	Signature *types.Signature

	// source information
	Synthetic string // provenance of synthetic function; "" for true source functions

	Pkg  *Package // enclosing package; nil for shared funcs (wrappers and error.Error)
	Prog *Program // enclosing program

	Params    []*Parameter  // function parameters; for methods, includes receiver
	FreeVars  []*FreeVar    // free variables whose values must be supplied by closure
	Locals    []*Alloc      // frame-allocated variables of this function
	Blocks    []*BasicBlock // basic blocks of the function; nil => external
	Recover   *BasicBlock   // optional; control transfers here after recovered panic
	AnonFuncs []*Function   // anonymous functions directly beneath this one
	// contains filtered or unexported fields
}
```

The main part of interest for us is&nbsp;`Blocks`. A block is a sequence of instructions, and the control flow is explicit. The last instruction of a block is a jump to another block, or a return. The first instructions of a block can be the special `Phi` instruction, which is used to merge control flow from different branches.

We decided to write a first version to see what the SSA code of Go looks like when printed in Coq, without thinking about generating a well-typed code. This looks like this:

```coq
with MakeUint64 (α : list Val.t) : M (list Val.t) :=
  M.Thunk (
  match α with
  | [x] =>
    M.Thunk (M.EvalBody [(0,
      let* "t0" := Instr.BinOp x "<" (Val.Lit (Lit.Int 9223372036854775808)) in
      Instr.If (Register.read "t0") 1 2
    );
    (1,
      let* "t1" := Instr.Convert x in
      let* "t2" := Instr.ChangeType (Register.read "t1") in
      let* "t3" := Instr.MakeInterface (Register.read "t2") in
      M.Return [(Register.read "t3")]
    );
    (2,
      let* "t4" := Instr.Alloc (* complit *) Alloc.Local "*go/constant.intVal" in
      let* "t5" := Instr.FieldAddr (Register.read "t4") 0 in
      let* "t6" := Instr.Call (CallKind.Function (newInt [])) in
      let* "t7" := Instr.Call (CallKind.Function (TODO_method [(Register.read "t6"); x])) in
      do* Instr.Store (Register.read "t5") (Register.read "t7") in
      let* "t8" := Instr.UnOp "*" (Register.read "t4") in
      let* "t9" := Instr.MakeInterface (Register.read "t8") in
      M.Return [(Register.read "t9")]
    )])
  | _ => M.Thunk (M.EvalBody [])
  end)
```

for a source Go code (from the [go/constant](https://pkg.go.dev/go/constant) package):

```go
// MakeUint64 returns the [Int] value for x.
func MakeUint64(x uint64) Value {
	if x < 1<<63 {
		return int64Val(int64(x))
	}
	return intVal{newInt().SetUint64(x)}
}
```

There are three blocks of code, labeled with `0`, `1`, and `2`. The first block ends with a conditional jump `If` corresponding to the `if` statement in the Go code. The following blocks are corresponding to the two possible branches of the `if` statement. They both end with a `Return` instruction, corresponding to the `return` statement in the Go code. They run various primitive instructions that we have translated as we can.

The generated Coq code is still readable but more verbose than the original Go code. We will later develop proof techniques using simulations to enable the user to define equivalent but simpler versions of the translation. Being able to define simulations of an imperative program is also important for the proofs, as we can rewrite the code in functional style to make it easier to reason about.

## Type-checking

From there, a second step is to have a generated code that type-checks, forgetting about making a code with sound semantics for now. We generate the various Coq definitions that are needed in a header of the generated code, using axioms for all the definitions. For example, for the allocations we do:

```coq
Module Alloc.
  Inductive t : Set :=
  | Heap
  | Local.
End Alloc.

Module Instr.
  Parameter Alloc : Alloc.t -> string -> M Val.t.
```

The `Inductive` keyword in Coq defines a type with two constructors `Heap` and `Local`. The `Parameter` keyword defines an axiomatized definition, where we only provide the type but not the definition itself. The `Instr.Alloc` instruction takes as parameters an allocation mode `Alloc.t` and a string and returns an `M Val.t` value.

### Representation of values

We make the choice to remove the types while doing the translation, as the type system of Go is probably incompatible with the one of Coq in many ways. We thus translate everything to a single type `Val.t` in Coq to represent all kinds of possible Go values. The downside of this approach is that is makes the generated code less readable and less safe, as types are useful to track the correct use of values.

For now, we define the&nbsp;`Val.t` type as:

```coq
Module Val.
  Inductive t : Set :=
  | Lit (_ : Lit.t)
  | Tuple (_ : list t).
End Val.
```

with the literals&nbsp;`Lit.t` as:

```coq
Module Lit.
  Inductive t : Set :=
  | Bool (_ : bool)
  | Int (_ : Z)
  | Float (_ : Rational)
  | Complex (_ _ : Rational)
  | String (_ : string)
  | Nil.
End Lit.
```

We plan to refine this type and add more cases as we improve `coq-of-go`. Structures, pointers, and closures are missing for now.

### Monadic style

In order to represent the side-effects of the Go code, we use a [monadic style](<https://en.wikipedia.org/wiki/Monad_(functional_programming)>). This is a standard approach to represent side-effects like mutations, exceptions, or non-termination in a purely function language such as Coq. We choose to use:

- A free monad, where all the primitives are constructor of the inductive type&nbsp;`M` of the monad. This simplifies the manipulation of the monad by allowing to compute on it and by delegating the actual implementation of the monadic primitives for later.
- A co-inductive type, to allow potentially non-terminating programs. Co-inductive types are like lazy definitions in Haskell where it is possible to make an infinite list for example, as long as only a finite number of elements are consumed.

In that sense, we follow the approach in the paper&nbsp;[Modular, Compositional, and Executable Formal Semantics for LLVM IR](https://cambium.inria.fr/~eyoon/paper/vir.pdf), that is using a co-inductive free monad (interaction tree) to formalize a reasonable subset of the LLVM language that is also an SSA representation but with more low-level instructions than Go.

Our definition for&nbsp;`M` for now is:

```coq
Module M.
  CoInductive t (A : Set) : Set :=
  | Return (_ : A)
  | Bind {B : Set} (_ : t B) (_ : B -> t A)
  | Thunk (_ : t A)
  | EvalBody (_ : list (Z * t A)).
  Arguments Return {A}.
  Arguments Bind {A B}.
  Arguments Thunk {A}.
  Arguments EvalBody {A}.
End M.
Definition M : Set -> Set := M.t.
```

We define all the functions that we translate as mutually recursive with the `CoFixpoint ... with ...` keyword of Coq. Thus, we do not have to preserve the ordering of definitions that is required by Coq or care for recursive or mutually recursive functions in Go.

However, we did not achieve to make the type-checker of Coq happy for our&nbsp;`CoFixpoint` as many definitions are axiomatized, and the type-checker of Coq wants their definitions to know if they produce co-inductive constructors. So, for now, we admit this step by disabling the termination checker with this flag:

```coq
Local Unset Guard Checking.
```

## Next

When we translate our hello world example we get the Coq code:

```coq
CoFixpoint Main (α : list Val.t) : M (list Val.t) :=
  M.Thunk (
  match α with
  | [] =>
    M.Thunk (M.EvalBody [(0,
      let* "t0" := Instr.Alloc (* varargs *) Alloc.Heap "*[1]any" in
      let* "t1" := Instr.IndexAddr (Register.read "t0") (Val.Lit (Lit.Int 0)) in
      let* "t2" := Instr.MakeInterface (Val.Lit (Lit.String "Hello, World!")) in
      do* Instr.Store (Register.read "t1") (Register.read "t2") in
      let* "t3" := Instr.Slice (Register.read "t0") None None in
      let* "t4" := Instr.Call (CallKind.Function (fmt.Println [(Register.read "t3")])) in
      M.Return []
    )])
  | _ => M.Thunk (M.EvalBody [])
  end)

with init (α : list Val.t) : M (list Val.t) :=
  M.Thunk (
  match α with
  | [] =>
    M.Thunk (M.EvalBody [(0,
      let* "t0" := Instr.UnOp "*" (Register.read "init$guard") in
      Instr.If (Register.read "t0") 2 1
    );
    (1,
      do* Instr.Store (Register.read "init$guard") (Val.Lit (Lit.Bool true)) in
      let* "t1" := Instr.Call (CallKind.Function (fmt.init [])) in
      Instr.Jump 2
    );
    (2,
      M.Return []
    )])
  | _ => M.Thunk (M.EvalBody [])
  end).
```

The&nbsp;`init` function, which is automatically generated by the Go compiler to initialize global variables, does not do much here. It checks whether it was already called or not reading the&nbsp;`init$guard` variable, and if not, it calls the&nbsp;`fmt.init` function. The&nbsp;`Main` function is the one that we are interested in. It allocates a variable to store the string "Hello, World!", and then calls the&nbsp;`fmt.Println` function to print it.

From there, to continue the project we have two possibilities:

1. Give actual definitions to each primitive instruction that is used in this example (for now, everything is axiomatized).
2. Translate all the transitive dependencies of the hello world program to Coq, and make sure that we can compile everything together.

For the next step, we choose to follow the second possibility as we are more confident in being able to define the semantics of the instructions, which is purely done on the Coq side, than in being able to use the Go compiler's APIs to retrieve the definitions of all the dependencies and related them together.

## Conclusion

We have presented the beginning of our journey to translate Go programs to Coq, to build a formal verification tool for Go. The translation type-checks on the few examples we have tried but has no semantics. We will follow by handling the translation of dependencies of a package.

If you are interested in this project, please contact us at&nbsp;[&#099;&#111;&#110;&#116;&#097;&#099;&#116;&#064;formal&#046;&#108;&#097;&#110;&#100;](mailto:contact@formal.land) or go to our [GitHub repository](https://github.com/formal-land/coq-of-go-experiment).
