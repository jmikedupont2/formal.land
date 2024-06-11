"use strict";(self.webpackChunkformal_land=self.webpackChunkformal_land||[]).push([[1801],{2488:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>r,contentTitle:()=>a,default:()=>h,frontMatter:()=>l,metadata:()=>s,toc:()=>c});var o=n(4848),i=n(8453);const l={title:"\ud83e\udea8 Coq of Solidity (part 1)",tags:["formal verification","Coq","Solidity","Yul"],authors:[]},a=void 0,s={permalink:"/blog/2024/06/11/coq-of-solidity-1",source:"@site/blog/2024-06-11-coq-of-solidity-1.md",title:"\ud83e\udea8 Coq of Solidity (part 1)",description:"Solidity is the most widely used smart contract language for the Ethereum blockchain. As smart contracts are critical software handling a lot of money, there is a huge interest in finding all possible bugs before putting them into production.",date:"2024-06-11T00:00:00.000Z",formattedDate:"June 11, 2024",tags:[{label:"formal verification",permalink:"/blog/tags/formal-verification"},{label:"Coq",permalink:"/blog/tags/coq"},{label:"Solidity",permalink:"/blog/tags/solidity"},{label:"Yul",permalink:"/blog/tags/yul"}],readingTime:13.22,hasTruncateMarker:!0,authors:[],frontMatter:{title:"\ud83e\udea8 Coq of Solidity (part 1)",tags:["formal verification","Coq","Solidity","Yul"],authors:[]},unlisted:!1,nextItem:{title:"\ud83e\udd84 Software correctness from first principles",permalink:"/blog/2024/06/05/software-correctness-from-first-principles"}},r={authorsImageUrls:[]},c=[{value:"Architecture of the tool",id:"architecture-of-the-tool",level:2},{value:"Translation of Yul",id:"translation-of-yul",level:2},{value:"Runtime in Coq",id:"runtime-in-coq",level:2},{value:"Notation",id:"notation",level:3},{value:"Monad",id:"monad",level:3},{value:"Evaluation rules",id:"evaluation-rules",level:3},{value:"Evaluation function",id:"evaluation-function",level:3},{value:"Testing",id:"testing",level:2},{value:"Existing solutions",id:"existing-solutions",level:2},{value:"Conclusion",id:"conclusion",level:2}];function d(e){const t={a:"a",admonition:"admonition",code:"code",em:"em",h2:"h2",h3:"h3",img:"img",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,i.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.a,{href:"https://soliditylang.org/",children:"Solidity"})," is the most widely used ",(0,o.jsx)(t.strong,{children:"smart contract language"})," for the ",(0,o.jsx)(t.a,{href:"https://ethereum.org/",children:"Ethereum blockchain"}),". As smart contracts are ",(0,o.jsx)(t.strong,{children:"critical software"})," handling a lot of money, there is a huge interest in finding ",(0,o.jsx)(t.strong,{children:"all possible bugs"})," before putting them into production."]}),"\n",(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.strong,{children:"Formal verification"})," is a technique to test a program on all possible entries, even if there are ",(0,o.jsx)(t.strong,{children:"infinite possibilities"}),", thanks to the use of ",(0,o.jsx)(t.strong,{children:"mathematical methods"}),". As such, it appears to be an ideal way to guarantee the absence of bugs in a smart contract. Many companies, like ",(0,o.jsx)(t.a,{href:"https://certora.com/",children:"Certora"})," and ",(0,o.jsx)(t.a,{href:"https://www.certik.io/",children:"CertiK"}),", are already providing formal verification services for Solidity."]}),"\n",(0,o.jsxs)(t.p,{children:["In this blog post, we present our ongoing development of a ",(0,o.jsx)(t.strong,{children:"formal verification tool for Solidity"})," using the ",(0,o.jsx)(t.a,{href:"https://coq.inria.fr/",children:"Coq proof assistant"}),". We show how we translate Solidity code into Coq using the intermediate language ",(0,o.jsx)(t.a,{href:"https://docs.soliditylang.org/en/latest/yul.html",children:"Yul"}),". We explain how we achieved to translate all the examples of the ",(0,o.jsx)(t.a,{href:"https://github.com/ethereum/solidity",children:"Solidity compiler"}),"'s test suite to valid Coq code, the semantics we defined and what remained to be done."]}),"\n",(0,o.jsxs)(t.p,{children:["The code is available under GPLv3 license in our fork of the Solidity compiler at ",(0,o.jsx)(t.a,{href:"https://github.com/formal-land/solidity/pull/3",children:"github.com/formal-land/solidity"}),"."]}),"\n",(0,o.jsx)("figure",{children:(0,o.jsx)(t.p,{children:(0,o.jsx)(t.img,{alt:"Ethereum in forst",src:n(6712).A+"",width:"1024",height:"1024"})})}),"\n",(0,o.jsx)(t.h2,{id:"architecture-of-the-tool",children:"Architecture of the tool"}),"\n",(0,o.jsxs)(t.p,{children:["We reuse the code of the standard Solidity compiler\xa0",(0,o.jsx)(t.code,{children:"solc"})," in order to make sure that we can stay in sync with the evolutions of the language and to be compatible with all the Solidity features. Thus, our most straightforward path to implementing a translation tool from Solidity to Coq was to fork the C++ code of ",(0,o.jsx)(t.code,{children:"solc"})," in ",(0,o.jsx)(t.a,{href:"https://github.com/formal-land/solidity",children:"github.com/formal-land/solidity"}),". We add a new\xa0",(0,o.jsx)(t.code,{children:"solc"}),"'s flag\xa0",(0,o.jsx)(t.code,{children:"--ir-coq"})," that tells the compiler to also generate a Coq output in addition to the expected EVM bytecode."]}),"\n",(0,o.jsxs)(t.p,{children:["At first, we looked at the direct translation from the Solidity language to Coq, but this was getting too complex. We changed our strategy to instead target the Yul language, an intermediate language used by the Solidity compiler to have an intermediate step in its translation to the EVM bytecode. The Yul language is simpler than Solidity and still has a higher level than the EVM bytecode, making it a good target for formal verification. In contrast to the EVM bytecode, there are no explicit stack-manipulation or\xa0",(0,o.jsx)(t.code,{children:"goto"})," instructions in Yul, which makes it easier to reason about."]}),"\n",(0,o.jsx)(t.p,{children:"To give an idea of the size difference between Solidity and Yul, here are the files to export these languages to JSON in the Solidity compiler:"}),"\n",(0,o.jsxs)(t.ul,{children:["\n",(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.a,{href:"https://github.com/ethereum/solidity/blob/develop/libsolidity/ast/ASTJsonExporter.cpp",children:"ast/ASTJsonExporter.cpp"}),": Solidity to JSON, 1127 lines"]}),"\n",(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.a,{href:"https://github.com/ethereum/solidity/blob/develop/libyul/AsmJsonConverter.cpp",children:"libyul/AsmJsonConverter.cpp"}),": Yul to JSON, 205 lines"]}),"\n"]}),"\n",(0,o.jsxs)(t.p,{children:["We copied the file above that translates Yul to JSON to make a version that outputs Coq code instead: ",(0,o.jsx)(t.a,{href:"https://github.com/formal-land/solidity/blob/guillaume-claret@experiments-with-yul/libyul/AsmCoqConverter.cpp",children:"libyul/AsmCoqConverter.cpp"}),". We reused the code for compilation flags to add a new option\xa0",(0,o.jsx)(t.code,{children:"--ir-coq"}),", which runs the conversion to Coq instead of the conversion to JSON."]}),"\n",(0,o.jsx)(t.h2,{id:"translation-of-yul",children:"Translation of Yul"}),"\n",(0,o.jsx)(t.p,{children:"To limit the size of the generated Coq code, we translate the Yul code after the optimization passes. This helps to remove boilerplate code but may make the Yul code less relatable to the Solidity sources. Thankfully, the optimized Yul code is still readable in our tests, and the Solidity compiler can pretty-print a version of the optimized Yul code with comments to quote the corresponding Solidity source code."}),"\n",(0,o.jsxs)(t.p,{children:["As an example, here is how we translate the\xa0",(0,o.jsx)(t.a,{href:"https://docs.soliditylang.org/en/latest/yul.html#if",children:"if keyword"})," of Yul:"]}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-cpp",children:'std::string AsmCoqConverter::operator()(If const& _node)\n{\n\tyulAssert(_node.condition, "Invalid if condition.");\n\tstd::string ret = "M.if_ (|\\n";\n\tm_indent++;\n\tret += indent() + std::visit(*this, *_node.condition) + ",\\n";\n\tret += indent() + (*this)(_node.body) + "\\n";\n\tm_indent--;\n\tret += indent() + "|)";\n\n\treturn ret;\n}\n'})}),"\n",(0,o.jsxs)(t.p,{children:["We convert each Yul\xa0",(0,o.jsx)(t.code,{children:"_node"})," to an\xa0",(0,o.jsx)(t.code,{children:"std::string"})," that represents the Coq code. We use the ",(0,o.jsx)(t.code,{children:"m_indent"})," variable to keep track of the indentation level, and the ",(0,o.jsx)(t.code,{children:"indent()"})," function to add the right number of spaces at the beginning of each line. We do not need to add extra parenthesis to disambiguate priorities, as the Yul language is simple enough."]}),"\n",(0,o.jsxs)(t.p,{children:["Here is the generated Coq code for the beginning of the ",(0,o.jsx)(t.a,{href:"https://github.com/ethereum/solidity/blob/develop/test/libsolidity/semanticTests/various/erc20.sol",children:"erc20.sol"})," example from the Solidity compiler's test suite:"]}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-coq",children:'(* Generated by solc *)\nRequire Import CoqOfSolidity.CoqOfSolidity.\n\nModule ERC20_403.\n  Definition code : M.t BlockUnit.t :=\n    do* ltac:(M.monadic (\n      M.function (|\n        "allocate_unbounded",\n        [],\n        ["memPtr"],\n        do* ltac:(M.monadic (\n          M.assign (|\n            ["memPtr"],\n            Some (M.call (|\n              "mload",\n              [\n                [Literal.number 64]\n              ]\n            |))\n          |)\n        )) in\n        M.od\n      |)\n    )) in\n    do* ltac:(M.monadic (\n      M.function (|\n        "revert_error_ca66f745a3ce8ff40e2ccaf1ad45db7774001b90d25810abd9040049be7bf4bb",\n        [],\n        [],\n        do* ltac:(M.monadic (\n          M.expr_stmt (|\n            M.call (|\n              "revert",\n              [\n                [Literal.number 0];\n                [Literal.number 0]\n              ]\n            |)\n          |)\n        )) in\n        M.od\n      |)\n    )) in\n    (* ... 6,000 remaining lines ... *)\n'})}),"\n",(0,o.jsx)(t.p,{children:"This code is quite verbose, for an original smart contract size of 100 lines of Solidity. As a reference, the corresponding Yul code is 1,000 lines long and starts with:"}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-go",children:'/// @use-src 0:"erc20.sol"\nobject "ERC20_403" {\n    code {\n        function allocate_unbounded() -> memPtr\n        { memPtr := mload(64) }\n        function revert_error_ca66f745a3ce8ff40e2ccaf1ad45db7774001b90d25810abd9040049be7bf4bb()\n        { revert(0, 0) }\n        // ... 1,000 remaining lines ...\n'})}),"\n",(0,o.jsx)(t.p,{children:"The content is actually the same up to the notations, but we use many more line breaks in the Coq version."}),"\n",(0,o.jsx)(t.h2,{id:"runtime-in-coq",children:"Runtime in Coq"}),"\n",(0,o.jsxs)(t.p,{children:['Now that the code is translated in Coq, we need to define a "runtime" for the Coq code. This means giving a definition for all the functions and types that are used in the generated code, like ',(0,o.jsx)(t.code,{children:"M.t BlockUnit.t"}),", ",(0,o.jsx)(t.code,{children:"M.monadic"}),", ",(0,o.jsx)(t.code,{children:"M.function"}),", ... This runtime gives the semantics of the Yul language, that is to say the meaning of all the primitives of the language."]}),"\n",(0,o.jsx)(t.h3,{id:"notation",children:"Notation"}),"\n",(0,o.jsxs)(t.p,{children:["We first define a monadic notation ",(0,o.jsx)(t.code,{children:"ltac:(M.monadic ...)"})," that does not require a monadic transformation of the generated code. We reuse here what we have done for our Rust translation to Coq, which we describe in our blog post ",(0,o.jsx)(t.a,{href:"/blog/2024/04/03/monadic-notation-for-rust-translation",children:"\ud83e\udd80 Monadic notation for the Rust translation"}),". The notation:"]}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-coq",children:"f (| x_1, ..., x_n |)\n"})}),"\n",(0,o.jsxs)(t.p,{children:["corresponds to the call of a monadic function. The tactic ",(0,o.jsx)(t.code,{children:"M.monadic"})," automatically chains all these calls using the monadic bind operator."]}),"\n",(0,o.jsxs)(t.p,{children:["The ",(0,o.jsx)(t.code,{children:"do* ... in ..."})," is another monadic notation to chain monadic expressions, directly calling the monadic bind. This notation is more explicit, and we use it in combination with the ",(0,o.jsx)(t.code,{children:"ltac:(M.monadic ...)"})," notation as it might be more efficient to type-check very large files."]}),"\n",(0,o.jsx)(t.h3,{id:"monad",children:"Monad"}),"\n",(0,o.jsxs)(t.p,{children:["To represent the side effects in Yul, we use the following Coq monad, which is given in ",(0,o.jsx)(t.a,{href:"https://github.com/formal-land/solidity/blob/guillaume-claret%40experiments-with-yul/CoqOfSolidity/CoqOfSolidity.v",children:"CoqOfSolidity/CoqOfSolidity.v"}),":"]}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-coq",children:"Module U256.\n  Definition t := Z.\nEnd U256.\n\nModule BlockUnit.\n  Inductive t : Set :=\n  | Ok\n  | Break\n  | Continue\n  | Leave.\nEnd BlockUnit.\n\nModule M.\n  Inductive t (A : Set) : Set :=\n  | Pure (output : A)\n  | GetVar\n      (name : string)\n      (k : U256.t -> t A)\n  | SetVar\n      (names : list string)\n      (values : list U256.t)\n      (k : t A)\n  | CallFunction\n      (name : string)\n      (arguments : list U256.t)\n      (k : list U256.t -> t A)\n  | DeclareFunction\n      (name : string)\n      (body : list U256.t -> t (list U256.t))\n      (k : t A)\n  | Impossible (message : string).\n  Arguments Pure {_}.\n  Arguments GetVar {_}.\n  Arguments SetVar {_}.\n  Arguments CallFunction {_}.\n  Arguments DeclareFunction {_}.\n  Arguments Impossible {_}.\n\n  (* ... auxiliary functions ... *)\nEnd M.\n"})}),"\n",(0,o.jsxs)(t.p,{children:["The only type for values in Yul is the 256-bit unsigned integer ",(0,o.jsx)(t.code,{children:"U256.t"})," that we represent with the ",(0,o.jsx)(t.code,{children:"Z"})," type of Coq. The ",(0,o.jsx)(t.code,{children:"BlockUnit.t"})," type represents the possible outcomes of a block of code:"]}),"\n",(0,o.jsxs)(t.ul,{children:["\n",(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.code,{children:"Ok"})," for the normal ending;"]}),"\n",(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.code,{children:"Break"})," or ",(0,o.jsx)(t.code,{children:"Continue"})," to propagate a premature return from a call to the ",(0,o.jsx)(t.code,{children:"break"})," or ",(0,o.jsx)(t.code,{children:"continue"})," primitives;"]}),"\n",(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.code,{children:"Leave"})," to propagate the call to the ",(0,o.jsx)(t.code,{children:"leave"})," primitive to terminate a function."]}),"\n"]}),"\n",(0,o.jsxs)(t.p,{children:["Finally, we define the ",(0,o.jsx)(t.code,{children:"M.t"})," monad parameterized by the type of output ",(0,o.jsx)(t.code,{children:"A"}),". The monad has the following constructors:"]}),"\n",(0,o.jsxs)(t.ul,{children:["\n",(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.code,{children:"Pure"})," to return a value without side effects;"]}),"\n",(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.code,{children:"GetVar"})," to get the value of a variable from the local environment;"]}),"\n",(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.code,{children:"SetVar"})," to set the value of a variable;"]}),"\n",(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.code,{children:"CallFunction"})," to call a function by its name with a list of arguments;"]}),"\n",(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.code,{children:"DeclareFunction"})," to declare a function with a name and a body, which is a function taking a list of arguments and returning a list of results;"]}),"\n",(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.code,{children:"Impossible"})," to signal an unexpected branch in the code."]}),"\n"]}),"\n",(0,o.jsxs)(t.p,{children:["This monad is purely descriptive. We give the list of primitives, but we do not explain here how each operator behaves. Most of the primitives take a continuation ",(0,o.jsx)(t.code,{children:"k"}),", which is a function from the output of the primitive to the rest of the code. This is a way to chain the primitives together. For convenience we define a monadic bind\xa0",(0,o.jsx)(t.code,{children:"let_"})," that chains these continuations to chain two monadic expressions."]}),"\n",(0,o.jsxs)(t.p,{children:["Then, we define the Yul keywords from these primitives. For example, for the ",(0,o.jsx)(t.code,{children:"if"})," keyword:"]}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-coq",children:'Definition if_ (condition : list U256.t) (success : t BlockUnit.t) : t BlockUnit.t :=\n  match condition with\n  | [0] => Pure BlockUnit.Ok\n  | [1] => success\n  | _ => Impossible "if_ condition must be a single boolean"\n  end.\n'})}),"\n",(0,o.jsx)(t.h3,{id:"evaluation-rules",children:"Evaluation rules"}),"\n",(0,o.jsxs)(t.p,{children:["To explain how to run the primitives of the Yul's monad, we use evaluation rules defined in ",(0,o.jsx)(t.a,{href:"https://github.com/formal-land/solidity/blob/guillaume-claret%40experiments-with-yul/CoqOfSolidity/simulations/CoqOfSolidity.v",children:"simulations/CoqOfSolidity.v"}),":"]}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-coq",children:"Module Run.\n  Reserved Notation \"{{ locals | e \u21d3 output | locals' }}\" (at level 70, no associativity).\n\n  Inductive t {A : Set} (locals : Locals.t) (output : A) : M.t A -> Locals.t -> Prop :=\n  | Pure : {{ locals | M.Pure output \u21d3 output | locals }}\n  | GetVar name k locals' :\n    {{ locals | k (Locals.get_var locals name) \u21d3 output | locals' }} ->\n    {{ locals | M.GetVar name k \u21d3 output | locals' }}\n  | SetVar names values k locals' :\n    {{ Locals.set_vars locals names values | k \u21d3 output | locals' }} ->\n    {{ locals | M.SetVar names values k \u21d3 output | locals' }}\n  | CallFunction name arguments k results locals_inter locals' :\n    let function := Locals.get_function locals name in\n    {{ locals | function arguments \u21d3 results | locals_inter }} ->\n    {{ locals_inter | k results \u21d3 output | locals' }} ->\n    {{ locals | M.CallFunction name arguments k \u21d3 output | locals' }}\n  | DeclareFunction name body k locals' :\n    {{ Locals.declare_function locals name body | k \u21d3 output | locals' }} ->\n    {{ locals | M.DeclareFunction name body k \u21d3 output | locals' }}\n\n  where \"{{ locals | e \u21d3 output | locals' }}\" :=\n    (t locals output e locals').\nEnd Run.\n"})}),"\n",(0,o.jsx)(t.p,{children:"We use the notation:"}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-coq",children:"{{ locals | e \u21d3 output | locals' }}\n"})}),"\n",(0,o.jsxs)(t.p,{children:["to say that a certain monadic expression\xa0",(0,o.jsx)(t.code,{children:"e"})," evaluates to the value\xa0",(0,o.jsx)(t.code,{children:"output"}),", with the local environment\xa0",(0,o.jsx)(t.code,{children:"locals"})," before the evaluation and\xa0",(0,o.jsx)(t.code,{children:"locals'"})," after the evaluation. We define the evaluation rules for each primitive of the monad."]}),"\n",(0,o.jsxs)(t.p,{children:["For example, for the\xa0",(0,o.jsx)(t.code,{children:"SetVar"})," primitive:"]}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-coq",children:"| SetVar names values k locals' :\n  {{ Locals.set_vars locals names values | k \u21d3 output | locals' }} ->\n  {{ locals | M.SetVar names values k \u21d3 output | locals' }}\n"})}),"\n",(0,o.jsxs)(t.p,{children:["we say that if the continuation\xa0",(0,o.jsx)(t.code,{children:"k"})," evaluates to the value\xa0",(0,o.jsx)(t.code,{children:"output"})," with the local environment\xa0",(0,o.jsx)(t.code,{children:"locals"})," extended with the new variables\xa0",(0,o.jsx)(t.code,{children:"names"})," and their values\xa0",(0,o.jsx)(t.code,{children:"values"}),", then the whole expression\xa0",(0,o.jsx)(t.code,{children:"M.SetVar names values k"})," evaluates to the value\xa0",(0,o.jsx)(t.code,{children:"output"}),"."]}),"\n",(0,o.jsx)(t.h3,{id:"evaluation-function",children:"Evaluation function"}),"\n",(0,o.jsx)(t.p,{children:"We also define an evaluation function that will be useful in further tests to extract the Coq code back to OCaml and run tests to compare its behavior with the original Yul code. We define the evaluation function as follows:"}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-coq",children:'(** A function to evaluate an expression given enough [fuel]. *)\nFixpoint eval {A : Set} (fuel : nat) (locals : Locals.t) (e : M.t A) : (A + string) * Locals.t :=\n  match fuel with\n  | O => (inr "out of fuel", locals)\n  | S fuel =>\n    match e with\n    | M.Pure output => (inl output, locals)\n    | M.GetVar name k =>\n      let value := Locals.get_var locals name in\n      eval fuel locals (k value)\n    | M.SetVar names values k =>\n      eval fuel (Locals.set_vars locals names values) k\n    | M.CallFunction name arguments k =>\n      let function := Locals.get_function locals name in\n      let (results, locals_inter) := eval fuel locals (function arguments) in\n      match results with\n      | inl results => eval fuel locals_inter (k results)\n      | inr message => (inr message, locals)\n      end\n    | M.DeclareFunction name body k =>\n      eval fuel (Locals.declare_function locals name body) k\n    | M.Impossible message => (inr ("impossible " ++ message)%string, locals)\n    end\n  end.\n'})}),"\n",(0,o.jsxs)(t.p,{children:["It uses a\xa0",(0,o.jsx)(t.code,{children:"fuel"})," parameter to make sure that the evaluation terminates. For a monadic expression\xa0",(0,o.jsx)(t.code,{children:"e"})," and in a local environment\xa0",(0,o.jsx)(t.code,{children:"locals"}),", it returns either the value of the expression or an error message, along with the local environment after the evaluation. The error might be due to an unexpected branch in the code, like a\xa0",(0,o.jsx)(t.code,{children:"break"})," outside a loop, or to a lack of fuel. We prove that it is equivalent to the evaluation rules defined above:"]}),"\n",(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:"language-coq",children:"Lemma eval_is_run {A : Set}\n    (fuel : nat) (locals : Locals.t) (e : M.t A) (output : A) (locals' : Locals.t) :\n  eval fuel locals e = (inl output, locals') ->\n  {{ locals | e \u21d3 output | locals' }}.\n"})}),"\n",(0,o.jsx)(t.h2,{id:"testing",children:"Testing"}),"\n",(0,o.jsxs)(t.p,{children:["To test that our translation works, we ran it on all the Solidity files in the test suite of the Solidity compiler. There are, at the time of writing, 4856 ",(0,o.jsx)(t.code,{children:".sol"})," example files in the ",(0,o.jsx)(t.a,{href:"https://github.com/ethereum/solidity/tree/develop/test/libsolidity/semanticTests",children:"semanticTests"})," and ",(0,o.jsx)(t.a,{href:"https://github.com/ethereum/solidity/tree/develop/test/libsolidity/syntaxTests",children:"syntaxTests"})," folders. On each of them we run the Solidity compiler with the ",(0,o.jsx)(t.code,{children:"--ir-coq"})," flag to generate the Coq code, and then type-check the generated code with Coq. It succeeds for all the files."]}),"\n",(0,o.jsxs)(t.p,{children:["We have to note that for some of the example files, the ",(0,o.jsx)(t.code,{children:"solc"})," compiler does not work as there are not plain Solidity files but rather concatenations of Solidity files. This still ensures that our translation generates valid Coq code for thousands of Solidity examples."]}),"\n",(0,o.jsx)(t.p,{children:"The next step will be to check that the translation executes with the same result as the original file."}),"\n",(0,o.jsx)(t.h2,{id:"existing-solutions",children:"Existing solutions"}),"\n",(0,o.jsx)(t.p,{children:"There are already a few formal verification tools for Solidity, as smart contracts are an important kind of program to check. A few of them, like the Certora Prover, are closed source. Most work at the EVM bytecode level, as the semantics of the EVM is simpler than the semantics of Solidity. A disadvantage of working at the EVM level is that this is a low-level language, so the code is hard to understand (explicit stack manipulations, ...). Thus, this approach is mostly used with automated verification tools."}),"\n",(0,o.jsxs)(t.p,{children:["It is hard to have a rather complete support for the Solidity language, despite of many attempts including ",(0,o.jsx)(t.a,{href:"https://gitlab.com/formal-land/coq-of-solidity",children:"one of ours"}),". There is the ",(0,o.jsx)(t.a,{href:"https://github.com/microsoft/verisol",children:"Verisol"})," project from Microsoft to verify Solidity programs."]}),"\n",(0,o.jsxs)(t.p,{children:["The Yul language offers a good compromise between the high-level Solidity language and the low-level EVM bytecode. It was actually designed with ",(0,o.jsx)(t.em,{children:"formal verification in mind"}),", according to its documentation. These ",(0,o.jsx)(t.a,{href:"https://hackmd.io/@FranckC/BJz02K4Za",children:"notes"})," from Franck Cassez give a good overview of the formal verification efforts for Yul. One of the conclusions is that a lot of the existing efforts are either incomplete/unmaintained or not designed for the formal verification of smart contracts but rather to verify the Yul language itself. As a result, they propose a formal verification framework for Yul in ",(0,o.jsx)(t.a,{href:"https://dafny.org/",children:"Dafny"})," with ",(0,o.jsx)(t.a,{href:"https://github.com/franck44/yul-dafny",children:"yul-dafny"}),"."]}),"\n",(0,o.jsx)(t.admonition,{title:"For more",type:"warning",children:(0,o.jsxs)(t.p,{children:["If you have smart contract projects that you want to formally verify, going further than a manual audit to find bugs, contact us at\xa0",(0,o.jsx)(t.a,{href:"mailto:contact@formal.land",children:"contact@formal.land"}),"! Formal verification is the only methodology that covers all the possible execution cases."]})}),"\n",(0,o.jsx)(t.h2,{id:"conclusion",children:"Conclusion"}),"\n",(0,o.jsx)(t.p,{children:"We have presented our ongoing development of a formal verification tool for Solidity using the Coq proof assistant. We have shown how we translate Solidity code to Coq using the Yul intermediate language and how we define the semantics of Yul in Coq. We have tested our tool on all the examples of the Solidity compiler's test suite to show that the generated Coq code is valid."}),"\n",(0,o.jsx)(t.p,{children:"Our next steps will be to run the generated Coq code to check that it behaves as the original Yul code, defining the around one hundred builtin Yul functions for the EVM, and to formally verify one example of Solidity smart contract."})]})}function h(e={}){const{wrapper:t}={...(0,i.R)(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(d,{...e})}):d(e)}},6712:(e,t,n)=>{n.d(t,{A:()=>o});const o=n.p+"assets/images/ethereum-in-forest-0b19cc9d19091e1c0c285bfd83dbafd7.webp"},8453:(e,t,n)=>{n.d(t,{R:()=>a,x:()=>s});var o=n(6540);const i={},l=o.createContext(i);function a(e){const t=o.useContext(l);return o.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function s(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:a(e.components),o.createElement(l.Provider,{value:t},e.children)}}}]);