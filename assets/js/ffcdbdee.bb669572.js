"use strict";(self.webpackChunkformal_land=self.webpackChunkformal_land||[]).push([[1930],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return h}});var a=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n,a,o={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=a.createContext({}),c=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},p=function(e){var t=c(e.components);return a.createElement(s.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},u=a.forwardRef((function(e,t){var n=e.components,o=e.mdxType,i=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),u=c(n),h=o,m=u["".concat(s,".").concat(h)]||u[h]||d[h]||i;return n?a.createElement(m,r(r({ref:t},p),{},{components:n})):a.createElement(m,r({ref:t},p))}));function h(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var i=n.length,r=new Array(i);r[0]=u;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:o,r[1]=l;for(var c=2;c<i;c++)r[c]=n[c];return a.createElement.apply(null,r)}return a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},9050:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return s},metadata:function(){return c},assets:function(){return p},toc:function(){return d},default:function(){return h}});var a=n(3117),o=n(102),i=(n(7294),n(3905)),r=["components"],l={title:"Translating Go to Coq, part 1",tags:["coq-of-go","Go","Coq","translation"],authors:[]},s=void 0,c={permalink:"/blog/2024/02/22/journey-coq-of-go",source:"@site/blog/2024-02-22-journey-coq-of-go.md",title:"Translating Go to Coq, part 1",description:"In this blog post, we present our development steps to build a tool to translate Go programs to the proof system Coq.",date:"2024-02-22T00:00:00.000Z",formattedDate:"February 22, 2024",tags:[{label:"coq-of-go",permalink:"/blog/tags/coq-of-go"},{label:"Go",permalink:"/blog/tags/go"},{label:"Coq",permalink:"/blog/tags/coq"},{label:"translation",permalink:"/blog/tags/translation"}],readingTime:12.03,truncated:!0,authors:[],nextItem:{title:"Experiment on translation from Haskell to Coq",permalink:"/blog/2024/02/14/experiment-coq-of-hs"}},p={authorsImageUrls:[]},d=[{value:"Introduction",id:"introduction",children:[],level:2},{value:"First target",id:"first-target",children:[],level:2},{value:"The start",id:"the-start",children:[],level:2},{value:"Functions",id:"functions",children:[],level:2},{value:"Type-checking",id:"type-checking",children:[{value:"Representation of values",id:"representation-of-values",children:[],level:3},{value:"Monadic style",id:"monadic-style",children:[],level:3}],level:2},{value:"Next",id:"next",children:[],level:2},{value:"Conclusion",id:"conclusion",children:[],level:2}],u={toc:d};function h(e){var t=e.components,l=(0,o.Z)(e,r);return(0,i.kt)("wrapper",(0,a.Z)({},u,l,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"In this blog post, we present our development steps to build a tool to translate Go programs to the proof system Coq."),(0,i.kt)("p",null,"The goal is to formally verify Go programs to make them totally bug-free. It is actually possible to make a program totally bug-free, as ",(0,i.kt)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/Formal_verification"},"formal verification")," can cover all execution cases and kinds of properties thanks to the use of mathematical methods. This corresponds to the highest level of the ",(0,i.kt)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/Evaluation_Assurance_Level"},"Evaluation Assurance Levels")," used for critical applications, such as the space industry."),(0,i.kt)("p",null,"All the code of our work is available on GitHub at ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/formal-land/coq-of-go-experiment"},"github.com/formal-land/coq-of-go-experiment"),"."),(0,i.kt)("h2",{id:"introduction"},"Introduction"),(0,i.kt)("p",null,"We believe that there are not yet a lot of formal verification tools for Go. We can cite ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/tchajed/goose"},"Goose"),", which is working by translation from Go to the proof system Coq. We will follow a similar approach, translating the Go language to our favorite proof system Coq. In contrast to Goose, we plan to support the whole Go language, even at the expense of the simplicity of the translation."),(0,i.kt)("p",null,"For that, we target the translation of the ",(0,i.kt)("a",{parentName:"p",href:"https://pkg.go.dev/golang.org/x/tools/go/ssa"},"SSA form of Go")," of Go instead of the ",(0,i.kt)("a",{parentName:"p",href:"https://pkg.go.dev/go/ast"},"Go AST"),". The SSA form is a more low-level representation of Go, so we hope to capture the semantics of the whole Go language more easily. This should be at the expense of the simplicity of the generated translation, but we hope that having full language support outweighs this."),(0,i.kt)("p",null,"Go is an interesting target as:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"this is quite a popular language,"),(0,i.kt)("li",{parentName:"ul"},"it is focusing on simplicity, with a reduced set of language features,"),(0,i.kt)("li",{parentName:"ul"},"a lot of critical backend applications are written in Go, including for very large companies (Google, Netflix, Uber, Twitch, etc.).")),(0,i.kt)("p",null,"Among interesting properties that we can verify are:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"the absence of reachable ",(0,i.kt)("inlineCode",{parentName:"li"},"panic")," in the code,"),(0,i.kt)("li",{parentName:"ul"},"the absence of race conditions or deadlocks,"),(0,i.kt)("li",{parentName:"ul"},"the backward compatibility from release to release, for parts of the code whose behavior is not supposed to change,"),(0,i.kt)("li",{parentName:"ul"},"the strict application of business rules.")),(0,i.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"Contact")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"You can ",(0,i.kt)("a",{parentName:"p",href:"https://twitter.com/LandFoobar"},"follow us on X")," to get our updates. We propose tools and services to make your codebase totally bug-free. Contact us at","\xa0",(0,i.kt)("a",{parentName:"p",href:"mailto:contact@formal.land"},"c","o","n","t","a","c","t","@","formal",".","l","a","n","d")," to chat! We offer a free audit to assess the feasibility of formal verification on your case."))),(0,i.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"Goal")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"Our company goal is to make formal verification accessible to all projects, reducing its cost to","\xa0","20% of the development cost. There should be no reason to have bugs in end-user products!"))),(0,i.kt)("p",null,(0,i.kt)("img",{alt:"Mole and Rooster",src:n(7694).Z})),(0,i.kt)("h2",{id:"first-target"},"First target"),(0,i.kt)("p",null,"Our first target is to achieve the formal verification ",(0,i.kt)("em",{parentName:"p"},"including all the dependencies")," of the hello world program:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-go"},'package main\n\nimport "fmt"\n\nfunc main() {\n    fmt.Println("Hello, World!")\n}\n')),(0,i.kt)("p",null,'What we want to show about this code is that it does a single and only thing: outputting the string "Hello, World!" to the standard output. Its only dependency is the ',(0,i.kt)("inlineCode",{parentName:"p"},"fmt")," package, but when we look at the transitive dependencies of this package:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-sh"},"go list -f '{{ .Deps }}' fmt\n")),(0,i.kt)("p",null,"we get around forty packages:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre"},"errors\ninternal/abi\ninternal/bytealg\ninternal/coverage/rtcov\ninternal/cpu\ninternal/fmtsort\ninternal/goarch\ninternal/godebugs\ninternal/goexperiment\ninternal/goos\ninternal/itoa\ninternal/oserror\ninternal/poll\ninternal/race\ninternal/reflectlite\ninternal/safefilepath\ninternal/syscall/execenv\ninternal/syscall/unix\ninternal/testlog\ninternal/unsafeheader\nio\nio/fs\nmath\nmath/bits\nos\npath\nreflect\nruntime\nruntime/internal/atomic\nruntime/internal/math\nruntime/internal/sys\nruntime/internal/syscall\nsort\nstrconv\nsync\nsync/atomic\nsyscall\ntime\nunicode\nunicode/utf8\nunsafe\n")),(0,i.kt)("p",null,"We will need to translate all these packages to meaningful Coq code."),(0,i.kt)("h2",{id:"the-start"},"The start"),(0,i.kt)("p",null,"We made the ",(0,i.kt)("inlineCode",{parentName:"p"},"coq-of-go")," tool, with everything in a single file ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/formal-land/coq-of-go-experiment/blob/main/main.go"},"main.go")," for now. We retrieve the SSA form of a Go package provided as a command line parameter (code without the error handling):"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-go"},"func main() {\n    packageToTranslate := os.Args[1]\n    cfg := &packages.Config{Mode: packages.LoadSyntax}\n    initial, _ := packages.Load(cfg, packageToTranslate)\n    _, pkgs := ssautil.Packages(initial, 0)\n    pkgs[0].Build()\n    members := pkgs[0].Members\n")),(0,i.kt)("div",{className:"admonition admonition-note alert alert--secondary"},(0,i.kt)("div",{parentName:"div",className:"admonition-heading"},(0,i.kt)("h5",{parentName:"div"},(0,i.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,i.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,i.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"}))),"SSA form")),(0,i.kt)("div",{parentName:"div",className:"admonition-content"},(0,i.kt)("p",{parentName:"div"},"The ",(0,i.kt)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/Static_single-assignment_form"},"SSA form")," of a program is generally used internally by compilers to have a simple representation to work on. The ",(0,i.kt)("a",{parentName:"p",href:"https://llvm.org/"},"LLVM")," language is such an example. In SSA, each variable is assigned exactly once and the control flow is explicit, with jumps or conditional jumps to labels. There are no ",(0,i.kt)("inlineCode",{parentName:"p"},"for")," loops, ",(0,i.kt)("inlineCode",{parentName:"p"},"if")," statements, or non-primitive expressions."))),(0,i.kt)("p",null,"Then we iterate over all the SSA ",(0,i.kt)("inlineCode",{parentName:"p"},"members"),", and directly print the corresponding Coq code to the standard output. We do not use an intermediate representation or make intermediate passes. We do not even do pretty-printing (splitting lines that are too long at the right place, and introducing indentation)! This should not be necessary as the SSA code cannot nest sub-expressions or statements. We still try to print a readable Coq code, as it will be used in the proofs."),(0,i.kt)("p",null,"There are four kinds of SSA members:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"named constants,"),(0,i.kt)("li",{parentName:"ul"},"globals,"),(0,i.kt)("li",{parentName:"ul"},"types,"),(0,i.kt)("li",{parentName:"ul"},"functions.")),(0,i.kt)("p",null,"Named constants and globals are similar, and are for top-level variables whose value is either known at compile-time or computed at the program's init. Types are for type definitions. We will focus on functions, as this is where the code is."),(0,i.kt)("h2",{id:"functions"},"Functions"),(0,i.kt)("p",null,"The SSA functions in Go are described by the type ",(0,i.kt)("a",{parentName:"p",href:"https://pkg.go.dev/golang.org/x/tools/go/ssa#Function"},(0,i.kt)("inlineCode",{parentName:"a"},"ssa.Function")),":"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-go"},'type Function struct {\n    Signature *types.Signature\n\n    // source information\n    Synthetic string // provenance of synthetic function; "" for true source functions\n\n    Pkg  *Package // enclosing package; nil for shared funcs (wrappers and error.Error)\n    Prog *Program // enclosing program\n\n    Params    []*Parameter  // function parameters; for methods, includes receiver\n    FreeVars  []*FreeVar    // free variables whose values must be supplied by closure\n    Locals    []*Alloc      // frame-allocated variables of this function\n    Blocks    []*BasicBlock // basic blocks of the function; nil => external\n    Recover   *BasicBlock   // optional; control transfers here after recovered panic\n    AnonFuncs []*Function   // anonymous functions directly beneath this one\n    // contains filtered or unexported fields\n}\n')),(0,i.kt)("p",null,"The main part of interest for us is","\xa0",(0,i.kt)("inlineCode",{parentName:"p"},"Blocks"),". A block is a sequence of instructions, and the control flow is explicit. The last instruction of a block is a jump to another block, or a return. The first instructions of a block can be the special ",(0,i.kt)("inlineCode",{parentName:"p"},"Phi")," instruction, which is used to merge control flow from different branches."),(0,i.kt)("p",null,"We decided to write a first version to see what the SSA code of Go looks like when printed in Coq, without thinking about generating a well-typed code. This looks like this:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-coq"},'with MakeUint64 (\u03b1 : list Val.t) : M (list Val.t) :=\n  M.Thunk (\n  match \u03b1 with\n  | [x] =>\n    M.Thunk (M.EvalBody [(0,\n      let* "t0" := Instr.BinOp x "<" (Val.Lit (Lit.Int 9223372036854775808)) in\n      Instr.If (Register.read "t0") 1 2\n    );\n    (1,\n      let* "t1" := Instr.Convert x in\n      let* "t2" := Instr.ChangeType (Register.read "t1") in\n      let* "t3" := Instr.MakeInterface (Register.read "t2") in\n      M.Return [(Register.read "t3")]\n    );\n    (2,\n      let* "t4" := Instr.Alloc (* complit *) Alloc.Local "*go/constant.intVal" in\n      let* "t5" := Instr.FieldAddr (Register.read "t4") 0 in\n      let* "t6" := Instr.Call (CallKind.Function (newInt [])) in\n      let* "t7" := Instr.Call (CallKind.Function (TODO_method [(Register.read "t6"); x])) in\n      do* Instr.Store (Register.read "t5") (Register.read "t7") in\n      let* "t8" := Instr.UnOp "*" (Register.read "t4") in\n      let* "t9" := Instr.MakeInterface (Register.read "t8") in\n      M.Return [(Register.read "t9")]\n    )])\n  | _ => M.Thunk (M.EvalBody [])\n  end)\n')),(0,i.kt)("p",null,"for a source Go code (from the ",(0,i.kt)("a",{parentName:"p",href:"https://pkg.go.dev/go/constant"},"go/constant")," package):"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-go"},"// MakeUint64 returns the [Int] value for x.\nfunc MakeUint64(x uint64) Value {\n    if x < 1<<63 {\n        return int64Val(int64(x))\n    }\n    return intVal{newInt().SetUint64(x)}\n}\n")),(0,i.kt)("p",null,"There are three blocks of code, labeled with ",(0,i.kt)("inlineCode",{parentName:"p"},"0"),", ",(0,i.kt)("inlineCode",{parentName:"p"},"1"),", and ",(0,i.kt)("inlineCode",{parentName:"p"},"2"),". The first block ends with a conditional jump ",(0,i.kt)("inlineCode",{parentName:"p"},"If")," corresponding to the ",(0,i.kt)("inlineCode",{parentName:"p"},"if")," statement in the Go code. The following blocks are corresponding to the two possible branches of the ",(0,i.kt)("inlineCode",{parentName:"p"},"if")," statement. They both end with a ",(0,i.kt)("inlineCode",{parentName:"p"},"Return")," instruction, corresponding to the ",(0,i.kt)("inlineCode",{parentName:"p"},"return")," statement in the Go code. They run various primitive instructions that we have translated as we can."),(0,i.kt)("p",null,"The generated Coq code is still readable but more verbose than the original Go code. We will later develop proof techniques using simulations to enable the user to define equivalent but simpler versions of the translation. Being able to define simulations of an imperative program is also important for the proofs, as we can rewrite the code in functional style to make it easier to reason about."),(0,i.kt)("h2",{id:"type-checking"},"Type-checking"),(0,i.kt)("p",null,"From there, a second step is to have a generated code that type-checks, forgetting about making a code with sound semantics for now. We generate the various Coq definitions that are needed in a header of the generated code, using axioms for all the definitions. For example, for the allocations we do:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-coq"},"Module Alloc.\n  Inductive t : Set :=\n  | Heap\n  | Local.\nEnd Alloc.\n\nModule Instr.\n  Parameter Alloc : Alloc.t -> string -> M Val.t.\n")),(0,i.kt)("p",null,"The ",(0,i.kt)("inlineCode",{parentName:"p"},"Inductive")," keyword in Coq defines a type with two constructors ",(0,i.kt)("inlineCode",{parentName:"p"},"Heap")," and ",(0,i.kt)("inlineCode",{parentName:"p"},"Local"),". The ",(0,i.kt)("inlineCode",{parentName:"p"},"Parameter")," keyword defines an axiomatized definition, where we only provide the type but not the definition itself. The ",(0,i.kt)("inlineCode",{parentName:"p"},"Instr.Alloc")," instruction takes as parameters an allocation mode ",(0,i.kt)("inlineCode",{parentName:"p"},"Alloc.t")," and a string and returns an ",(0,i.kt)("inlineCode",{parentName:"p"},"M Val.t")," value."),(0,i.kt)("h3",{id:"representation-of-values"},"Representation of values"),(0,i.kt)("p",null,"We make the choice to remove the types while doing the translation, as the type system of Go is probably incompatible with the one of Coq in many ways. We thus translate everything to a single type ",(0,i.kt)("inlineCode",{parentName:"p"},"Val.t")," in Coq to represent all kinds of possible Go values. The downside of this approach is that is makes the generated code less readable and less safe, as types are useful to track the correct use of values."),(0,i.kt)("p",null,"For now, we define the","\xa0",(0,i.kt)("inlineCode",{parentName:"p"},"Val.t")," type as:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-coq"},"Module Val.\n  Inductive t : Set :=\n  | Lit (_ : Lit.t)\n  | Tuple (_ : list t).\nEnd Val.\n")),(0,i.kt)("p",null,"with the literals","\xa0",(0,i.kt)("inlineCode",{parentName:"p"},"Lit.t")," as:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-coq"},"Module Lit.\n  Inductive t : Set :=\n  | Bool (_ : bool)\n  | Int (_ : Z)\n  | Float (_ : Rational)\n  | Complex (_ _ : Rational)\n  | String (_ : string)\n  | Nil.\nEnd Lit.\n")),(0,i.kt)("p",null,"We plan to refine this type and add more cases as we improve ",(0,i.kt)("inlineCode",{parentName:"p"},"coq-of-go"),". Structures, pointers, and closures are missing for now."),(0,i.kt)("h3",{id:"monadic-style"},"Monadic style"),(0,i.kt)("p",null,"In order to represent the side-effects of the Go code, we use a ",(0,i.kt)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/Monad_(functional_programming)"},"monadic style"),". This is a standard approach to represent side-effects like mutations, exceptions, or non-termination in a purely function language such as Coq. We choose to use:"),(0,i.kt)("ul",null,(0,i.kt)("li",{parentName:"ul"},"A free monad, where all the primitives are constructor of the inductive type","\xa0",(0,i.kt)("inlineCode",{parentName:"li"},"M")," of the monad. This simplifies the manipulation of the monad by allowing to compute on it and by delegating the actual implementation of the monadic primitives for later."),(0,i.kt)("li",{parentName:"ul"},"A co-inductive type, to allow potentially non-terminating programs. Co-inductive types are like lazy definitions in Haskell where it is possible to make an infinite list for example, as long as only a finite number of elements are consumed.")),(0,i.kt)("p",null,"In that sense, we follow the approach in the paper","\xa0",(0,i.kt)("a",{parentName:"p",href:"https://cambium.inria.fr/~eyoon/paper/vir.pdf"},"Modular, Compositional, and Executable Formal Semantics for LLVM IR"),", that is using a co-inductive free monad (interaction tree) to formalize a reasonable subset of the LLVM language that is also an SSA representation but with more low-level instructions than Go."),(0,i.kt)("p",null,"Our definition for","\xa0",(0,i.kt)("inlineCode",{parentName:"p"},"M")," for now is:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-coq"},"Module M.\n  CoInductive t (A : Set) : Set :=\n  | Return (_ : A)\n  | Bind {B : Set} (_ : t B) (_ : B -> t A)\n  | Thunk (_ : t A)\n  | EvalBody (_ : list (Z * t A)).\n  Arguments Return {A}.\n  Arguments Bind {A B}.\n  Arguments Thunk {A}.\n  Arguments EvalBody {A}.\nEnd M.\nDefinition M : Set -> Set := M.t.\n")),(0,i.kt)("p",null,"We define all the functions that we translate as mutually recursive with the ",(0,i.kt)("inlineCode",{parentName:"p"},"CoFixpoint ... with ...")," keyword of Coq. Thus, we do not have to preserve the ordering of definitions that is required by Coq or care for recursive or mutually recursive functions in Go."),(0,i.kt)("p",null,"However, we did not achieve to make the type-checker of Coq happy for our","\xa0",(0,i.kt)("inlineCode",{parentName:"p"},"CoFixpoint")," as many definitions are axiomatized, and the type-checker of Coq wants their definitions to know if they produce co-inductive constructors. So, for now, we admit this step by disabling the termination checker with this flag:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-coq"},"Local Unset Guard Checking.\n")),(0,i.kt)("h2",{id:"next"},"Next"),(0,i.kt)("p",null,"When we translate our hello world example we get the Coq code:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-coq"},'CoFixpoint Main (\u03b1 : list Val.t) : M (list Val.t) :=\n  M.Thunk (\n  match \u03b1 with\n  | [] =>\n    M.Thunk (M.EvalBody [(0,\n      let* "t0" := Instr.Alloc (* varargs *) Alloc.Heap "*[1]any" in\n      let* "t1" := Instr.IndexAddr (Register.read "t0") (Val.Lit (Lit.Int 0)) in\n      let* "t2" := Instr.MakeInterface (Val.Lit (Lit.String "Hello, World!")) in\n      do* Instr.Store (Register.read "t1") (Register.read "t2") in\n      let* "t3" := Instr.Slice (Register.read "t0") None None in\n      let* "t4" := Instr.Call (CallKind.Function (fmt.Println [(Register.read "t3")])) in\n      M.Return []\n    )])\n  | _ => M.Thunk (M.EvalBody [])\n  end)\n\nwith init (\u03b1 : list Val.t) : M (list Val.t) :=\n  M.Thunk (\n  match \u03b1 with\n  | [] =>\n    M.Thunk (M.EvalBody [(0,\n      let* "t0" := Instr.UnOp "*" (Register.read "init$guard") in\n      Instr.If (Register.read "t0") 2 1\n    );\n    (1,\n      do* Instr.Store (Register.read "init$guard") (Val.Lit (Lit.Bool true)) in\n      let* "t1" := Instr.Call (CallKind.Function (fmt.init [])) in\n      Instr.Jump 2\n    );\n    (2,\n      M.Return []\n    )])\n  | _ => M.Thunk (M.EvalBody [])\n  end).\n')),(0,i.kt)("p",null,"The","\xa0",(0,i.kt)("inlineCode",{parentName:"p"},"init")," function, which is automatically generated by the Go compiler to initialize global variables, does not do much here. It checks whether it was already called or not reading the","\xa0",(0,i.kt)("inlineCode",{parentName:"p"},"init$guard")," variable, and if not, it calls the","\xa0",(0,i.kt)("inlineCode",{parentName:"p"},"fmt.init")," function. The","\xa0",(0,i.kt)("inlineCode",{parentName:"p"},"Main"),' function is the one that we are interested in. It allocates a variable to store the string "Hello, World!", and then calls the',"\xa0",(0,i.kt)("inlineCode",{parentName:"p"},"fmt.Println")," function to print it."),(0,i.kt)("p",null,"From there, to continue the project we have two possibilities:"),(0,i.kt)("ol",null,(0,i.kt)("li",{parentName:"ol"},"Give actual definitions to each primitive instruction that is used in this example (for now, everything is axiomatized)."),(0,i.kt)("li",{parentName:"ol"},"Translate all the transitive dependencies of the hello world program to Coq, and make sure that we can compile everything together.")),(0,i.kt)("p",null,"For the next step, we choose to follow the second possibility as we are more confident in being able to define the semantics of the instructions, which is purely done on the Coq side, than in being able to use the Go compiler's APIs to retrieve the definitions of all the dependencies and related them together."),(0,i.kt)("h2",{id:"conclusion"},"Conclusion"),(0,i.kt)("p",null,"We have presented the beginning of our journey to translate Go programs to Coq, to build a formal verification tool for Go. The translation type-checks on the few examples we have tried but has no semantics. We will follow by handling the translation of dependencies of a package."),(0,i.kt)("p",null,"If you are interested in this project, please contact us at","\xa0",(0,i.kt)("a",{parentName:"p",href:"mailto:contact@formal.land"},"c","o","n","t","a","c","t","@","formal",".","l","a","n","d")," or go to our ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/formal-land/coq-of-go-experiment"},"GitHub repository"),"."))}h.isMDXComponent=!0},7694:function(e,t,n){t.Z=n.p+"assets/images/mole_rooster-69abedffe91c988310aef61e9bf9d2e3.webp"}}]);