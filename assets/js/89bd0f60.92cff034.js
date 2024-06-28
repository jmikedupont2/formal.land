"use strict";(self.webpackChunkformal_land=self.webpackChunkformal_land||[]).push([[1688],{168:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>s,default:()=>h,frontMatter:()=>a,metadata:()=>r,toc:()=>c});var i=n(4848),o=n(8453);const a={title:"\ud83e\udea8 Coq of Solidity \u2013 part 1",tags:["formal verification","Coq","Solidity","Yul"],authors:[]},s=void 0,r={permalink:"/blog/2024/06/28/coq-of-solidity-1",source:"@site/blog/2024-06-28-coq-of-solidity-1.md",title:"\ud83e\udea8 Coq of Solidity \u2013 part 1",description:"Solidity is the most widely used smart contract language on the blockchain. As smart contracts are critical software handling a lot of money, there is a huge interest in finding all possible bugs before putting them into production.",date:"2024-06-28T00:00:00.000Z",formattedDate:"June 28, 2024",tags:[{label:"formal verification",permalink:"/blog/tags/formal-verification"},{label:"Coq",permalink:"/blog/tags/coq"},{label:"Solidity",permalink:"/blog/tags/solidity"},{label:"Yul",permalink:"/blog/tags/yul"}],readingTime:16.34,hasTruncateMarker:!0,authors:[],frontMatter:{title:"\ud83e\udea8 Coq of Solidity \u2013 part 1",tags:["formal verification","Coq","Solidity","Yul"],authors:[]},unlisted:!1,nextItem:{title:"\ud83e\udd84 Software correctness from first principles",permalink:"/blog/2024/06/05/software-correctness-from-first-principles"}},l={authorsImageUrls:[]},c=[{value:"Architecture of the tool",id:"architecture-of-the-tool",level:2},{value:"Translation of Yul",id:"translation-of-yul",level:2},{value:"Runtime in Coq",id:"runtime-in-coq",level:2},{value:"Notation",id:"notation",level:3},{value:"Monad",id:"monad",level:3},{value:"Evaluation rules",id:"evaluation-rules",level:3},{value:"Evaluation function",id:"evaluation-function",level:3},{value:"Testing",id:"testing",level:2},{value:"Existing solutions",id:"existing-solutions",level:2},{value:"Conclusion",id:"conclusion",level:2}];function d(e){const t={a:"a",admonition:"admonition",code:"code",em:"em",h2:"h2",h3:"h3",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,o.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.a,{href:"https://soliditylang.org/",children:"Solidity"})," is the most widely used ",(0,i.jsx)(t.strong,{children:"smart contract language"})," on the blockchain. As smart contracts are ",(0,i.jsx)(t.strong,{children:"critical software"})," handling a lot of money, there is a huge interest in finding ",(0,i.jsx)(t.strong,{children:"all possible bugs"})," before putting them into production."]}),"\n",(0,i.jsx)(t.admonition,{title:"AlephZero",type:"info",children:(0,i.jsx)(t.p,{children:(0,i.jsxs)(t.em,{children:["We are happy to be working with ",(0,i.jsx)(t.a,{href:"https://alephzero.org/",children:"AlephZero"})," to develop tools to bring more security for the audit of Solidity smart contracts, thanks to the use of formal verification and the interactive theorem prover ",(0,i.jsx)(t.a,{href:"https://coq.inria.fr/",children:"Coq"}),". We thank the Aleph Zero Foundation for their support."]})})}),"\n",(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.strong,{children:"Formal verification"})," is a technique to test a program on all possible entries, even when there are ",(0,i.jsx)(t.strong,{children:"infinitely many"}),". This contrasts with the traditional test techniques, which can only execute a finite set of scenarios. As such, it appears to be an ideal way to bring more security to smart contract audits."]}),"\n",(0,i.jsxs)(t.p,{children:["In this blog post, we present the ",(0,i.jsxs)(t.strong,{children:["formal verification tool ",(0,i.jsx)(t.code,{children:"coq-of-solidity"})]})," that we are developing for Solidity. Its specificities are that:"]}),"\n",(0,i.jsxs)(t.ol,{children:["\n",(0,i.jsx)(t.li,{children:"It is open-source (GPL-3 for the translation, MIT for the proofs)."}),"\n",(0,i.jsx)(t.li,{children:"It uses an interactive theorem prover, the system Coq, to verify arbitrarily complex properties."}),"\n"]}),"\n",(0,i.jsxs)(t.p,{children:["Here, we present how we translate Solidity code into Coq using the intermediate language ",(0,i.jsx)(t.a,{href:"https://docs.soliditylang.org/en/latest/yul.html",children:"Yul"}),". We explain the semantics we use and what remains to be done."]}),"\n",(0,i.jsxs)(t.p,{children:["The code is available in our fork of the Solidity compiler at ",(0,i.jsx)(t.a,{href:"https://github.com/formal-land/solidity",children:"github.com/formal-land/solidity"}),"."]}),"\n",(0,i.jsx)("figure",{children:(0,i.jsx)(t.p,{children:(0,i.jsx)(t.img,{alt:"Ethereum in forest",src:n(1548).A+"",width:"1024",height:"1024"})})}),"\n",(0,i.jsx)(t.h2,{id:"architecture-of-the-tool",children:"Architecture of the tool"}),"\n",(0,i.jsxs)(t.p,{children:["We reuse the code of the standard Solidity compiler\xa0",(0,i.jsx)(t.code,{children:"solc"})," in order to make sure that we can stay in sync with the evolutions of the language and be compatible with all the Solidity features. Thus, our most straightforward path to implementing a translation tool from Solidity to Coq was to fork the C++ code of ",(0,i.jsx)(t.code,{children:"solc"})," in ",(0,i.jsx)(t.a,{href:"https://github.com/formal-land/solidity",children:"github.com/formal-land/solidity"}),". We add a new\xa0",(0,i.jsx)(t.code,{children:"solc"}),"'s flag\xa0",(0,i.jsx)(t.code,{children:"--ir-coq"})," that tells the compiler to also generate a Coq output in addition to the expected EVM bytecode."]}),"\n",(0,i.jsxs)(t.p,{children:["At first, we looked at the direct translation from the Solidity language to Coq, but this was getting too complex. We changed our strategy to instead target the Yul language, an intermediate language used by the Solidity compiler to have an intermediate step in its translation to the EVM bytecode. The Yul language is simpler than Solidity and still has a higher level than the EVM bytecode, making it a good target for formal verification. In contrast to the EVM bytecode, there are no explicit stack-manipulation or\xa0",(0,i.jsx)(t.code,{children:"goto"})," instructions in Yul simplifying formal verification."]}),"\n",(0,i.jsx)(t.p,{children:"To give an idea of the size difference between Solidity and Yul, here are the files to export these languages to JSON in the Solidity compiler:"}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.a,{href:"https://github.com/ethereum/solidity/blob/develop/libsolidity/ast/ASTJsonExporter.cpp",children:"ast/ASTJsonExporter.cpp"}),": Solidity to JSON, 1127 lines"]}),"\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.a,{href:"https://github.com/ethereum/solidity/blob/develop/libyul/AsmJsonConverter.cpp",children:"libyul/AsmJsonConverter.cpp"}),": Yul to JSON, 205 lines"]}),"\n"]}),"\n",(0,i.jsx)(t.p,{children:"The Solidity language appears as more complex than Yul as the code to translate it to JSON is five times longer."}),"\n",(0,i.jsxs)(t.p,{children:["We copied the file ",(0,i.jsx)(t.code,{children:"libyul/AsmJsonConverter.cpp"})," above to make a version that translates Yul to Coq: ",(0,i.jsx)(t.a,{href:"https://github.com/formal-land/solidity/blob/guillaume-claret@experiments-with-yul/libyul/AsmCoqConverter.cpp",children:"libyul/AsmCoqConverter.cpp"}),". We reused the code for compilation flags to add a new option\xa0",(0,i.jsx)(t.code,{children:"--ir-coq"}),", which runs the conversion to Coq instead of the conversion to JSON."]}),"\n",(0,i.jsx)(t.h2,{id:"translation-of-yul",children:"Translation of Yul"}),"\n",(0,i.jsx)(t.p,{children:"To limit the size of the generated Coq code, we translate the Yul code after the optimization passes. This helps to remove boilerplate code but may make the Yul code less relatable to the Solidity sources. Thankfully, the optimized Yul code is still readable in our tests, and the Solidity compiler can pretty-print a version of the optimized Yul code with comments to quote the corresponding Solidity source code."}),"\n",(0,i.jsxs)(t.p,{children:["As an example, here is how we translate the\xa0",(0,i.jsx)(t.a,{href:"https://docs.soliditylang.org/en/latest/yul.html#if",children:"if keyword"})," of Yul:"]}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-cpp",children:'std::string AsmCoqConverter::operator()(If const& _node)\n{\n\tyulAssert(_node.condition, "Invalid if condition.");\n\tstd::string ret = "M.if_ (|\\n";\n\tm_indent++;\n\tret += indent() + std::visit(*this, *_node.condition) + ",\\n";\n\tret += indent() + (*this)(_node.body) + "\\n";\n\tm_indent--;\n\tret += indent() + "|)";\n\n\treturn ret;\n}\n'})}),"\n",(0,i.jsxs)(t.p,{children:["We convert each Yul\xa0",(0,i.jsx)(t.code,{children:"_node"})," to an\xa0",(0,i.jsx)(t.code,{children:"std::string"})," that represents the Coq code. We use the ",(0,i.jsx)(t.code,{children:"m_indent"})," variable to keep track of the indentation level, and the ",(0,i.jsx)(t.code,{children:"indent()"})," function to add the right number of spaces at the beginning of each line. We do not need to add extra parenthesis to disambiguate priorities, as the Yul language is simple enough."]}),"\n",(0,i.jsxs)(t.p,{children:["Here is the generated Coq code for the beginning of the ",(0,i.jsx)(t.a,{href:"https://github.com/ethereum/solidity/blob/develop/test/libsolidity/semanticTests/various/erc20.sol",children:"erc20.sol"})," example from the Solidity compiler's test suite:"]}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-coq",children:'(* Generated by solc *)\nRequire Import CoqOfSolidity.CoqOfSolidity.\n\nModule ERC20_403.\n  Definition code : M.t BlockUnit.t :=\n    do* ltac:(M.monadic (\n      M.function (|\n        "allocate_unbounded",\n        [],\n        ["memPtr"],\n        do* ltac:(M.monadic (\n          M.assign (|\n            ["memPtr"],\n            Some (M.call (|\n              "mload",\n              [\n                [Literal.number 64]\n              ]\n            |))\n          |)\n        )) in\n        M.od\n      |)\n    )) in\n    do* ltac:(M.monadic (\n      M.function (|\n        "revert_error_ca66f745a3ce8ff40e2ccaf1ad45db7774001b90d25810abd9040049be7bf4bb",\n        [],\n        [],\n        do* ltac:(M.monadic (\n          M.expr_stmt (|\n            M.call (|\n              "revert",\n              [\n                [Literal.number 0];\n                [Literal.number 0]\n              ]\n            |)\n          |)\n        )) in\n        M.od\n      |)\n    )) in\n    (* ... 6,000 remaining lines ... *)\n'})}),"\n",(0,i.jsx)(t.p,{children:"This code is quite verbose, for an original smart contract size of 100 lines of Solidity. As a reference, the corresponding Yul code is 1,000 lines long and starts with:"}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-go",children:'/// @use-src 0:"erc20.sol"\nobject "ERC20_403" {\n    code {\n        function allocate_unbounded() -> memPtr\n        { memPtr := mload(64) }\n        function revert_error_ca66f745a3ce8ff40e2ccaf1ad45db7774001b90d25810abd9040049be7bf4bb()\n        { revert(0, 0) }\n        // ... 1,000 remaining lines ...\n'})}),"\n",(0,i.jsx)(t.p,{children:"The content is actually the same up to the notations, but we use many more line breaks and keywords in the Coq version."}),"\n",(0,i.jsx)(t.h2,{id:"runtime-in-coq",children:"Runtime in Coq"}),"\n",(0,i.jsxs)(t.p,{children:["Now that the code is translated in Coq, we need to define a ",(0,i.jsx)(t.em,{children:"runtime"})," for the Coq code. This means giving a definition for all the functions and types that are used in the generated code, like ",(0,i.jsx)(t.code,{children:"M.t BlockUnit.t"}),", ",(0,i.jsx)(t.code,{children:"M.monadic"}),", ",(0,i.jsx)(t.code,{children:"M.function"}),", ... This runtime gives the semantics of the Yul language, that is to say, the meaning of all the primitives of the language."]}),"\n",(0,i.jsx)(t.h3,{id:"notation",children:"Notation"}),"\n",(0,i.jsxs)(t.p,{children:["We first define a monadic notation ",(0,i.jsx)(t.code,{children:"ltac:(M.monadic ...)"})," to make a ",(0,i.jsx)(t.a,{href:"https://xavierleroy.org/mpri/2-4/monads.pdf",children:"monadic transformation"})," on the generated code. We reuse here what we have done for our ",(0,i.jsx)(t.a,{href:"https://github.com/formal-land/coq-of-rust",children:"Rust translation to Coq"}),", which we describe in our blog post ",(0,i.jsx)(t.a,{href:"/blog/2024/04/03/monadic-notation-for-rust-translation",children:"\ud83e\udd80 Monadic notation for the Rust translation"}),". The notation:"]}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-coq",children:"f (| x_1, ..., x_n |)\n"})}),"\n",(0,i.jsxs)(t.p,{children:["corresponds to the call of a monadic function. The tactic ",(0,i.jsx)(t.code,{children:"M.monadic"})," automatically chains all these calls using the monadic bind operator."]}),"\n",(0,i.jsxs)(t.p,{children:["The ",(0,i.jsx)(t.code,{children:"do* ... in ..."})," is another monadic notation to chain monadic expressions, directly calling the monadic bind. This notation is more explicit, and we use it in combination with the ",(0,i.jsx)(t.code,{children:"ltac:(M.monadic ...)"})," notation as it might be more efficient to type-check very large files."]}),"\n",(0,i.jsx)(t.h3,{id:"monad",children:"Monad"}),"\n",(0,i.jsxs)(t.p,{children:["To represent the side effects in Yul, we use the following Coq monad, that we define in ",(0,i.jsx)(t.a,{href:"https://github.com/formal-land/solidity/blob/guillaume-claret%40experiments-with-yul/CoqOfSolidity/CoqOfSolidity.v",children:"CoqOfSolidity/CoqOfSolidity.v"}),":"]}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-coq",children:"Module U256.\n  Definition t := Z.\nEnd U256.\n\nModule Environment.\n  Record t : Set := {\n    caller : U256.t;\n    (** Amount of wei sent to the current contract *)\n    callvalue : U256.t;\n    calldata : list Z;\n    (** The address of the contract. *)\n    address : U256.t;\n  }.\nEnd Environment.\n\nModule BlockUnit.\n  (** The return value of a code block. *)\n  Inductive t : Set :=\n  (** The default value in case of success *)\n  | Tt\n  (** The instruction `break` was called *)\n  | Break\n  (** The instruction `continue` was called *)\n  | Continue\n  (** The instruction `leave` was called *)\n  | Leave.\nEnd BlockUnit.\n\nModule Result.\n  (** A wrapper for the result of an expression or a code block. We can either return a normal value\n      with [Ok], or a special instruction [Return] that will stop the execution of the contract. *)\n  Inductive t (A : Set) : Set :=\n  | Ok (output : A)\n  | Return (p s : U256.t)\n  | Revert (p s : U256.t).\n  Arguments Ok {_}.\n  Arguments Return {_}.\n  Arguments Revert {_}.\nEnd Result.\n\nModule Primitive.\n  (** We group together primitives that share being impure functions operating over the state. *)\n  Inductive t : Set -> Set :=\n  | OpenScope : t unit\n  | CloseScope : t unit\n  | GetVar (name : string) : t U256.t\n  | DeclareVars (names : list string) (values : list U256.t) : t unit\n  | AssignVars (names : list string) (values : list U256.t) : t unit\n  | MLoad (address length : U256.t) : t (list Z)\n  | MStore (address : U256.t) (bytes : list Z) : t unit\n  | SLoad (address : U256.t) : t U256.t\n  | SStore (address value : U256.t) : t unit\n  | RLoad : t (list Z)\n  | TLoad (address : U256.t) : t U256.t\n  | TStore (address value : U256.t) : t unit\n  | Log (topics : list U256.t) (payload : list Z) : t unit\n  | GetEnvironment : t Environment.t\n  | GetNonce : t U256.t\n  | GetCodedata (address : U256.t) : t (list Z)\n  | CreateAccount (address code : U256.t) (codedata : list Z) : t unit\n  | UpdateCodeForDeploy (address code : U256.t) : t unit\n  | LoadImmutable (name : U256.t) : t U256.t\n  | SetImmutable (name value : U256.t) : t unit\n  (** The call stack is there to debug the semantics of Yul. *)\n  | CallStackPush (name : string) (arguments : list (string * U256.t)) : t unit\n  | CallStackPop : t unit.\nEnd Primitive.\n\nModule LowM.\n  Inductive t (A : Set) : Set :=\n  | Pure (output : A)\n  | Primitive {B : Set}\n      (primitive : Primitive.t B)\n      (k : B -> t A)\n  | DeclareFunction\n      (name : string)\n      (body : list U256.t -> t (Result.t (list U256.t)))\n      (k : t A)\n  | CallFunction\n      (name : string)\n      (arguments : list U256.t)\n      (k : Result.t (list U256.t) -> t A)\n  | Loop {B : Set}\n      (body : t B)\n      (** The final value to return if we decide to break of the loop. *)\n      (break_with : B -> option B)\n      (k : B -> t A)\n  | CallContract\n      (address : U256.t)\n      (value : U256.t)\n      (input : list Z)\n      (k : U256.t -> t A)\n  (** Explicit cut in the monadic expressions, to provide better composition for the proofs. *)\n  | Let {B : Set} (e1 : t B) (k : B -> t A)\n  | Impossible (message : string).\nEnd LowM.\n\nModule M.\n  Definition t (A : Set) := LowM.t (Result.t A).\n"})}),"\n",(0,i.jsxs)(t.p,{children:["The only type for values in Yul is the 256-bit unsigned integer ",(0,i.jsx)(t.code,{children:"U256.t"})," that we represent with the ",(0,i.jsx)(t.code,{children:"Z"})," type of Coq. The ",(0,i.jsx)(t.code,{children:"BlockUnit.t"})," type represents the possible outcomes of a block of code:"]}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:"Ok"})," for the normal ending;"]}),"\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:"Break"})," or ",(0,i.jsx)(t.code,{children:"Continue"})," to propagate a premature return from a call to the ",(0,i.jsx)(t.code,{children:"break"})," or ",(0,i.jsx)(t.code,{children:"continue"})," primitives;"]}),"\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:"Leave"})," to propagate the call to the ",(0,i.jsx)(t.code,{children:"leave"})," primitive to terminate a function."]}),"\n"]}),"\n",(0,i.jsxs)(t.p,{children:["We define the monad in two steps. First, we define the ",(0,i.jsx)(t.code,{children:"LowM.t"})," monad parameterized by the type of output ",(0,i.jsx)(t.code,{children:"A"}),". The monad has the following constructors:"]}),"\n",(0,i.jsxs)(t.ul,{children:["\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:"Pure"})," to return a value without side effects;"]}),"\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:"Primitive"})," to execute one of the primitive, that are functions operating over the state (defined later);"]}),"\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:"DeclareFunction"})," to declare a function with a name and a body, which is a function taking a list of arguments and returning a list of results, as this is the case in Yul;"]}),"\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:"CallFunction"})," to call a function by its name with a list of arguments;"]}),"\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:"Loop"})," to execute a block of code in a loop, with a function to decide if we should break the loop, helpful to implement the ",(0,i.jsx)(t.code,{children:"for"})," construct;"]}),"\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:"CallContract"})," a dedicated primitive to implement the ",(0,i.jsx)(t.code,{children:"call"})," instruction of the EVM to call another contract located at a certain address;"]}),"\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:"Let"})," to compose two monadic expressions in a more explicit way than using the continuations;"]}),"\n",(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:"Impossible"})," to signal an unexpected branch in the code."]}),"\n"]}),"\n",(0,i.jsxs)(t.p,{children:["This monad is purely descriptive. We give the list of primitives but we do not explain here how each operator behaves. Most of the primitives take a continuation ",(0,i.jsx)(t.code,{children:"k"}),", which is a function from the output of the primitive to the rest of the code. This is a way to chain the primitives together. For convenience we define a monadic bind\xa0",(0,i.jsx)(t.code,{children:"let_"})," that chains these continuations to chain two monadic expressions."]}),"\n",(0,i.jsxs)(t.p,{children:["Then we define a monad\xa0",(0,i.jsx)(t.code,{children:"M.t"})," as:"]}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-coq",children:"Module M.\n  Definition t (A : Set) := LowM.t (Result.t A).\n"})}),"\n",(0,i.jsxs)(t.p,{children:["to represent calculations that return a ",(0,i.jsx)(t.code,{children:"Result.t"})," to take into account that a contract might return or revert at any point in its execution."]}),"\n",(0,i.jsxs)(t.p,{children:["Finally, we define the Yul keywords from these primitives. For example, for the ",(0,i.jsx)(t.code,{children:"if"})," keyword:"]}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-coq",children:'Definition if_ (condition : list U256.t) (success : t BlockUnit.t) : t BlockUnit.t :=\n  match condition with\n  | [0] => pure BlockUnit.Tt\n  | [_] => success\n  | _ => LowM.Impossible "if: expected a single value as condition"\n  end.\n'})}),"\n",(0,i.jsx)(t.h3,{id:"evaluation-rules",children:"Evaluation rules"}),"\n",(0,i.jsxs)(t.p,{children:["To define how to run the primitives of the Yul's monad, we use evaluation rules in ",(0,i.jsx)(t.a,{href:"https://github.com/formal-land/solidity/blob/guillaume-claret%40experiments-with-yul/CoqOfSolidity/simulations/CoqOfSolidity.v",children:"CoqOfSolidity/simulations/CoqOfSolidity.v"}),":"]}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-coq",children:"Module Run.\n  Reserved Notation \"{{ environment , state | e \u21d3 output | state' }}\"\n    (at level 70, no associativity).\n\n  Inductive t {A : Set} (environment : Environment.t) (state : State.t) (output : A) :\n      LowM.t A -> State.t -> Prop :=\n  | Pure : {{ environment, state | LowM.Pure output \u21d3 output | state }}\n  | Primitive {B : Set} (primitive : Primitive.t B) (k : B -> LowM.t A) value state_inter state' :\n    inl (value, state_inter) = eval_primitive environment primitive state ->\n    {{ environment, state_inter | k value \u21d3 output | state' }} ->\n    {{ environment, state | LowM.Primitive primitive k \u21d3 output | state' }}\n  | DeclareFunction name body k stack_inter state' :\n    inl stack_inter = Stack.declare_function state.(State.stack) name body ->\n    let state_inter := state <| State.stack := stack_inter |> in\n    {{ environment, state_inter | k \u21d3 output | state' }} ->\n    {{ environment, state | LowM.DeclareFunction name body k \u21d3 output | state' }}\n  | CallFunction name arguments k results state_inter state' :\n    let function := Stack.get_function state.(State.stack) name in\n    {{ environment, state | function arguments \u21d3 results | state_inter }} ->\n    {{ environment, state_inter | k results \u21d3 output | state' }} ->\n    {{ environment, state | LowM.CallFunction name arguments k \u21d3 output | state' }}\n  | Let {B : Set} (e1 : LowM.t B) k state_inter output_inter state' :\n    {{ environment, state | e1 \u21d3 output_inter | state_inter }} ->\n    {{ environment, state_inter | k output_inter \u21d3 output | state' }} ->\n    {{ environment, state | LowM.Let e1 k \u21d3 output | state' }}\n\n  where \"{{ environment , state | e \u21d3 output | state' }}\" :=\n    (t environment state output e state').\nEnd Run.\n"})}),"\n",(0,i.jsx)(t.p,{children:"We use the notation:"}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-coq",children:"{{ environment , state | e \u21d3 output | state' }}\n"})}),"\n",(0,i.jsxs)(t.p,{children:["to say that a certain monadic expression\xa0",(0,i.jsx)(t.code,{children:"e"})," evaluates to the value\xa0",(0,i.jsx)(t.code,{children:"output"}),", with the environment\xa0",(0,i.jsx)(t.code,{children:"environment"}),", the initial state\xa0",(0,i.jsx)(t.code,{children:"state"}),", and the final state\xa0",(0,i.jsx)(t.code,{children:"state'"}),". We define the evaluation rules for each primitive of the monad."]}),"\n",(0,i.jsx)(t.h3,{id:"evaluation-function",children:"Evaluation function"}),"\n",(0,i.jsx)(t.p,{children:"We also define an evaluation function that will be useful in further tests to extract the Coq code back to OCaml and run tests to compare its behavior with the original Yul code. We define the evaluation function as follows:"}),"\n",(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:"language-coq",children:'(** A function to evaluate an expression given enough [fuel]. *)\nFixpoint eval {A : Set}\n    (fuel : nat)\n    (environment : Environment.t)\n    (e : LowM.t A) :\n    State.t -> (A + string) * State.t :=\n  match fuel with\n  | O => fun state => (inr "out of fuel", state)\n  | S fuel =>\n    match e with\n    | LowM.Pure output => fun state => (inl output, state)\n    | LowM.Primitive primitive k =>\n      fun state =>\n      let value_state := eval_primitive environment primitive state in\n      match value_state with\n      | inl (value, state) => eval fuel environment (k value) state\n      | inr error => (inr error, state)\n      end\n    | LowM.DeclareFunction name body k =>\n      (* ... other cases ... *)\n'})}),"\n",(0,i.jsxs)(t.p,{children:["It uses a\xa0",(0,i.jsx)(t.code,{children:"fuel"})," parameter to make sure that the evaluation terminates. For a monadic expression\xa0",(0,i.jsx)(t.code,{children:"e"})," and an initial state and environment, it returns either the value of the expression or an error message, as well as a final state. The error might be due to an unexpected branch in the code, like a\xa0",(0,i.jsx)(t.code,{children:"break"})," outside a loop, or to a lack of fuel. We plan to prove that it is equivalent to the evaluation rules defined above."]}),"\n",(0,i.jsx)(t.h2,{id:"testing",children:"Testing"}),"\n",(0,i.jsxs)(t.p,{children:["To test that our translation works, we ran it on all the Solidity files in the test suite of the Solidity compiler. There are, at the time of writing, 4856 ",(0,i.jsx)(t.code,{children:".sol"})," example files in the ",(0,i.jsx)(t.a,{href:"https://github.com/ethereum/solidity/tree/develop/test/libsolidity/semanticTests",children:"semanticTests"})," and ",(0,i.jsx)(t.a,{href:"https://github.com/ethereum/solidity/tree/develop/test/libsolidity/syntaxTests",children:"syntaxTests"})," folders. On each of them we run the Solidity compiler with the ",(0,i.jsx)(t.code,{children:"--ir-coq"})," flag to generate the Coq code. This works for most of the test files, although some of the test files have a special format that combine several Solidity files into one file that we do not handle yet. Then type-check the generated code with Coq, what succeeds for all the Solidity files we translate."]}),"\n",(0,i.jsxs)(t.p,{children:["A more complex check is to ensure that our semantics is correct, that is to say that when we run our ",(0,i.jsx)(t.code,{children:"eval"})," function in Coq on a smart contract, we get the same output as running this smart contract on an actual EVM once compiled with the Solidity compiler. We have a mechanism to extract the expected execution traces in the semantic tests to equivalent checks in Coq. We succeed in more than 90% of the test cases now. There are still a few builtin functions that we need to implement, like pre-compiled contracts."]}),"\n",(0,i.jsx)(t.h2,{id:"existing-solutions",children:"Existing solutions"}),"\n",(0,i.jsxs)(t.p,{children:["There are already a few formal verification tools for Solidity, as smart contracts are an important kind of program to check. A few of them, like the ",(0,i.jsx)(t.a,{href:"https://www.certora.com/",children:"Certora Prover"}),", are closed source. Most work at the EVM bytecode level, as the semantics of the EVM is simpler than the semantics of Solidity. A disadvantage of working at the EVM level is that this is a low-level language, so the code is hard to understand (explicit stack manipulations, ...). This is the reason why we believe this approach is mostly used with automated verification tools."]}),"\n",(0,i.jsxs)(t.p,{children:["It is hard to have a rather complete support for the Solidity language, despite of many attempts including ",(0,i.jsx)(t.a,{href:"https://gitlab.com/formal-land/coq-of-solidity",children:"one of ours"}),". We can cite the ",(0,i.jsx)(t.a,{href:"https://github.com/microsoft/verisol",children:"Verisol"})," project from Microsoft to verify Solidity programs."]}),"\n",(0,i.jsxs)(t.p,{children:["The Yul language offers a good compromise between the high-level Solidity language and the low-level EVM bytecode. It was actually designed with ",(0,i.jsx)(t.em,{children:"formal verification in mind"}),", according to its documentation. These ",(0,i.jsx)(t.a,{href:"https://hackmd.io/@FranckC/BJz02K4Za",children:"notes"})," from ",(0,i.jsx)(t.a,{href:"https://franck44.github.io/",children:"Franck Cassez"})," give a good overview of the formal verification efforts for Yul. One of the conclusions is that a lot of the existing work is either incomplete/unmaintained or not designed for the formal verification of smart contracts, but rather to verify the Yul language itself. As a result, they propose a formal verification framework for Yul in ",(0,i.jsx)(t.a,{href:"https://dafny.org/",children:"Dafny"})," with ",(0,i.jsx)(t.a,{href:"https://github.com/franck44/yul-dafny",children:"yul-dafny"}),"."]}),"\n",(0,i.jsx)(t.admonition,{title:"For more",type:"warning",children:(0,i.jsxs)(t.p,{children:["If you have smart contract projects that you want to formally verify, going further than a manual audit to find bugs, contact us at\xa0",(0,i.jsx)(t.a,{href:"mailto:contact@formal.land",children:"contact@formal.land"}),"! Formal verification has the strong advantage of covering all possible execution cases."]})}),"\n",(0,i.jsx)(t.h2,{id:"conclusion",children:"Conclusion"}),"\n",(0,i.jsx)(t.p,{children:"We have presented our ongoing development of a formal verification tool for Solidity using the Coq proof assistant. We have briefly shown how we translate Solidity code to Coq using the Yul intermediate language and how we define the semantics of Yul in Coq. We have tested our tool on the examples of the Solidity compiler's test suite to check that our formalization is correct."}),"\n",(0,i.jsx)(t.p,{children:"Our next steps will be to:"}),"\n",(0,i.jsxs)(t.ol,{children:["\n",(0,i.jsx)(t.li,{children:"Complete our definitions of the Ethereum's primitives, to have a 100% success on the Solidity test suite."}),"\n",(0,i.jsxs)(t.li,{children:["Formally specify and verify an example of contract, looking at the ",(0,i.jsx)(t.a,{href:"https://github.com/formal-land/solidity/blob/guillaume-claret%40experiments-with-yul/test/libsolidity/semanticTests/various/erc20.sol",children:"erc20.sol"})," example."]}),"\n"]})]})}function h(e={}){const{wrapper:t}={...(0,o.R)(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},1548:(e,t,n)=>{n.d(t,{A:()=>i});const i=n.p+"assets/images/ethereum-in-forest-0b19cc9d19091e1c0c285bfd83dbafd7.webp"},8453:(e,t,n)=>{n.d(t,{R:()=>s,x:()=>r});var i=n(6540);const o={},a=i.createContext(o);function s(e){const t=i.useContext(a);return i.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function r(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:s(e.components),i.createElement(a.Provider,{value:t},e.children)}}}]);