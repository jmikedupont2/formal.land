"use strict";(self.webpackChunkformal_land=self.webpackChunkformal_land||[]).push([[3030],{1252:(e,o,t)=>{t.r(o),t.d(o,{assets:()=>c,contentTitle:()=>s,default:()=>d,frontMatter:()=>a,metadata:()=>i,toc:()=>l});var n=t(4848),r=t(8453);const a={id:"introduction",title:"What is coq-of-ocaml"},s=void 0,i={id:"coq-of-ocaml/introduction",title:"What is coq-of-ocaml",description:"coq-of-ocaml is a transpiler from the \ud83d\udc2b&nbsp;OCaml programming language to the \ud83d\udc13&nbsp;Coq proof language. It allows formal verification on OCaml programs. We developed it for the Tezos crypto-currency, verifying more that 100K lines of OCaml code in Coq Tezos of OCaml&nbsp;\ud83d\udcab. The sources are on Github.",source:"@site/docs/coq-of-ocaml/introduction.md",sourceDirName:"coq-of-ocaml",slug:"/coq-of-ocaml/introduction",permalink:"/docs/coq-of-ocaml/introduction",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{id:"introduction",title:"What is coq-of-ocaml"},sidebar:"sidebar",previous:{title:"What is coq-of-rust",permalink:"/docs/coq-of-rust/introduction"},next:{title:"Install",permalink:"/docs/coq-of-ocaml/install"}},c={},l=[{value:"Example",id:"example",level:2},{value:"Workflow",id:"workflow",level:2},{value:"Concepts",id:"concepts",level:2},{value:"Related",id:"related",level:2},{value:"Credits",id:"credits",level:2}];function h(e){const o={a:"a",admonition:"admonition",code:"code",em:"em",h2:"h2",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,r.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(o.p,{children:[(0,n.jsx)(o.a,{href:"https://github.com/formal-land/coq-of-ocaml",children:(0,n.jsx)(o.strong,{children:"coq-of-ocaml"})})," is a transpiler from the ",(0,n.jsx)(o.a,{href:"https://ocaml.org/",children:"\ud83d\udc2b\xa0OCaml"})," programming language to the ",(0,n.jsx)(o.a,{href:"https://coq.inria.fr/",children:"\ud83d\udc13\xa0Coq"})," proof language. It allows ",(0,n.jsx)(o.strong,{children:"formal verification"})," on OCaml programs. We developed it for the ",(0,n.jsx)(o.a,{href:"https://tezos.com/",children:"Tezos"})," crypto-currency, verifying more that 100K lines of OCaml code in ",(0,n.jsx)(o.a,{href:"https://formal-land.gitlab.io/coq-tezos-of-ocaml/",children:"Coq Tezos of OCaml\xa0\ud83d\udcab"}),". The sources are on ",(0,n.jsx)(o.a,{href:"https://github.com/formal-land/coq-of-ocaml",children:"Github"}),"."]}),"\n",(0,n.jsxs)(o.p,{children:[(0,n.jsx)(o.code,{children:"coq-of-ocaml"})," generates idiomatic and human readable Coq code. Technically speaking, this is a ",(0,n.jsx)(o.a,{href:"https://cstheory.stackexchange.com/questions/1370/shallow-versus-deep-embeddings",children:"shallow embedding"})," of OCaml into Coq. We supports the purely functional parts of OCaml, including advanced features such as functors, first-class modules, and GADTs. Side-effects in an OCaml program can be translated when represented by a monad."]}),"\n",(0,n.jsx)(o.admonition,{title:"Contact",type:"tip",children:(0,n.jsxs)(o.p,{children:["If you want to formally verify OCaml programs or see what is possible, contact us at\xa0",(0,n.jsx)(o.a,{href:"mailto:contact@formal.land",children:"contact@formal.land"}),"."]})}),"\n",(0,n.jsx)(o.admonition,{title:"OCaml 5",type:"info",children:(0,n.jsx)(o.p,{children:"We do not support yet OCaml 5 and this is our next target."})}),"\n",(0,n.jsx)(o.h2,{id:"example",children:"Example"}),"\n",(0,n.jsxs)(o.p,{children:[(0,n.jsx)(o.code,{children:"coq-of-ocaml"})," translates the OCaml code:"]}),"\n",(0,n.jsx)(o.pre,{children:(0,n.jsx)(o.code,{className:"language-ocaml",children:"type 'a tree =\n  | Leaf of 'a\n  | Node of 'a tree * 'a tree\n\nlet rec sum tree =\n  match tree with\n  | Leaf n -> n\n  | Node (tree1, tree2) -> sum tree1 + sum tree2\n"})}),"\n",(0,n.jsx)(o.p,{children:"to the Coq code:"}),"\n",(0,n.jsx)(o.pre,{children:(0,n.jsx)(o.code,{className:"language-coq",children:"(* Generated by coq-of-ocaml *)\nInductive tree (a : Set) : Set :=\n| Leaf : a -> tree a\n| Node : tree a -> tree a -> tree a.\n\nArguments Leaf {_}.\nArguments Node {_}.\n\nFixpoint sum (tree : tree int) : int :=\n  match tree with\n  | Leaf n => n\n  | Node tree1 tree2 => Z.add (sum tree1) (sum tree2)\n  end.\n"})}),"\n",(0,n.jsxs)(o.p,{children:["We map the algebraic datatype ",(0,n.jsx)(o.code,{children:"tree"})," to an equivalent inductive type ",(0,n.jsx)(o.code,{children:"tree"})," in Coq. With the ",(0,n.jsx)(o.code,{children:"Arguments"})," command, we ask Coq to be able to infer the type parameter ",(0,n.jsx)(o.code,{children:"a"}),", as it is done in OCaml. We translate the recursive function ",(0,n.jsx)(o.code,{children:"sum"})," using the command ",(0,n.jsx)(o.code,{children:"Fixpoint"})," of Coq. Here, we represent the ",(0,n.jsx)(o.code,{children:"int"}),"\xa0type of OCaml by ",(0,n.jsx)(o.code,{children:"Z"})," in Coq, but this can be parametrized."]}),"\n",(0,n.jsx)(o.h2,{id:"workflow",children:"Workflow"}),"\n",(0,n.jsxs)(o.p,{children:[(0,n.jsx)(o.code,{children:"coq-of-ocaml"})," works by compiling the OCaml files one by one. Thanks to Merlin, we get access to the typing environment of each file. Thus names referencing external definitions are properly interpreted."]}),"\n",(0,n.jsxs)(o.p,{children:["In a typical project, we may want to translate some of the ",(0,n.jsx)(o.code,{children:".ml"})," files and keep the rest as axioms (for the libraries or non-critical files). To generate the axioms, we can run ",(0,n.jsx)(o.code,{children:"coq-of-ocaml"})," on the ",(0,n.jsx)(o.code,{children:".mli"})," files for the parts we want to abstract. When something is not properly handled, ",(0,n.jsx)(o.code,{children:"coq-of-ocaml"})," generates an error message. These errors do not necessarily need to be fixed. However, they are good warnings to help having a more extensive and reliable Coq formalization."]}),"\n",(0,n.jsx)(o.p,{children:"Generally, the generated Coq code for a project does not compile as it is. This can be due to unsupported OCaml features, or various small errors such as name collisions. In this case, you can:"}),"\n",(0,n.jsxs)(o.ul,{children:["\n",(0,n.jsxs)(o.li,{children:["modify the OCaml input code, so that it fits what ",(0,n.jsx)(o.code,{children:"coq-of-ocaml"})," handles or avoids Coq errors (follow the error messages);"]}),"\n",(0,n.jsxs)(o.li,{children:["use the ",(0,n.jsx)(o.a,{href:"attributes",children:"attributes"})," or ",(0,n.jsx)(o.a,{href:"configuration",children:"configuration"})," mechanism to customize the translation of ",(0,n.jsx)(o.code,{children:"coq-of-ocaml"}),";"]}),"\n",(0,n.jsxs)(o.li,{children:["fork ",(0,n.jsx)(o.code,{children:"coq-of-ocaml"})," to modify the code translation;"]}),"\n",(0,n.jsx)(o.li,{children:"post-process the output with a script;"}),"\n",(0,n.jsx)(o.li,{children:"post-process the output by hand."}),"\n"]}),"\n",(0,n.jsx)(o.h2,{id:"concepts",children:"Concepts"}),"\n",(0,n.jsxs)(o.p,{children:["We can import to Coq the OCaml programs which are either purely functional or whose side-effects are in a ",(0,n.jsx)(o.a,{href:"https://caml.inria.fr/pub/docs/manual-ocaml/bindingops.html",children:"monad"}),". We translate the primitive side-effects (references, exceptions, ...) to axioms. We have no proofs that we preserve the semantics of the source code. One should do manual reviews to assert that the generated Coq code is a correct formalization of the source code. We produce a dummy Coq term and an explicit message in case of error. In particular, we always generate something and no errors are fatal."]}),"\n",(0,n.jsxs)(o.p,{children:["We compile OCaml projects by pluging into the ",(0,n.jsx)(o.a,{href:"https://microsoft.github.io/language-server-protocol/",children:"LSP"})," of OCaml ",(0,n.jsx)(o.a,{href:"https://github.com/ocaml/merlin",children:"Merlin"}),". This means that if you are using Merlin then you can run ",(0,n.jsx)(o.code,{children:"coq-of-ocaml"})," with no additional configurations."]}),"\n",(0,n.jsxs)(o.p,{children:["We do not do special treatments for the termination of fixpoints. If needed, you can disable termination checks using the Coq's flag ",(0,n.jsx)(o.a,{href:"https://coq.inria.fr/refman/proof-engine/vernacular-commands.html#coq:flag.Guard-Checking",children:"Guard Checking"}),". We erase the type parameters for the ",(0,n.jsx)(o.a,{href:"https://ocaml.org/manual/gadts.html",children:"GADTs"}),". This makes sure that the type definitions are accepted, but can make the pattern matchings incomplete. In this case we offer the possibility to introduce dynamic casts guided by annotations in the OCaml code. We did not find a way to nicely represent GADTs in Coq yet. We think that this is hard because the dependent pattern matching works well on type indicies which are values, but does not with types."]}),"\n",(0,n.jsxs)(o.p,{children:["We support modules, module types, functors and first-class modules. For OCaml modules, we generate either Coq modules or polymorphic records depending on the case. We generate axioms for ",(0,n.jsx)(o.code,{children:".mli"})," files to help formalizations, but importing ",(0,n.jsx)(o.code,{children:".mli"})," files should not be necessary for a project to compile in Coq."]}),"\n",(0,n.jsx)(o.h2,{id:"related",children:"Related"}),"\n",(0,n.jsx)(o.p,{children:"In the OCaml community:"}),"\n",(0,n.jsxs)(o.ul,{children:["\n",(0,n.jsxs)(o.li,{children:[(0,n.jsx)(o.a,{href:"https://github.com/mariojppereira/cameleer",children:"Cameleer"})," (verify OCaml programs leveraging the ",(0,n.jsx)(o.a,{href:"http://why3.lri.fr/",children:"Why3"}),"'s infrastructure)"]}),"\n",(0,n.jsxs)(o.li,{children:[(0,n.jsx)(o.a,{href:"http://chargueraud.org/softs/cfml/",children:"CFML"})," (import OCaml to Coq using characteristic formulae)"]}),"\n",(0,n.jsxs)(o.li,{children:[(0,n.jsx)(o.a,{href:"https://github.com/mrmr1993/coq-of-ocaml",children:"coq-of-ocaml-mrmr1993"})," (fork of ",(0,n.jsx)(o.code,{children:"coq-of-ocaml"})," including side-effects, focusing on the compilation of the OCaml's stdlib)"]}),"\n"]}),"\n",(0,n.jsx)(o.p,{children:"In the JavaScript community:"}),"\n",(0,n.jsxs)(o.ul,{children:["\n",(0,n.jsxs)(o.li,{children:[(0,n.jsx)(o.a,{href:"https://github.com/clarus/coq-of-js",children:"coq-of-js"})," (sister project; ",(0,n.jsxs)(o.em,{children:["currently on halt to support ",(0,n.jsx)(o.code,{children:"coq-of-ocaml"})]}),")"]}),"\n"]}),"\n",(0,n.jsx)(o.p,{children:"In the Haskell community:"}),"\n",(0,n.jsxs)(o.ul,{children:["\n",(0,n.jsxs)(o.li,{children:[(0,n.jsx)(o.a,{href:"https://github.com/antalsz/hs-to-coq",children:"hs-to-coq"})," (import Haskell to Coq)"]}),"\n",(0,n.jsxs)(o.li,{children:[(0,n.jsx)(o.a,{href:"https://github.com/gdijkstra/hs-to-gallina",children:"hs-to-gallina"})," (2012, by Gabe Dijkstra, first known project to do a shallow embedding of a mainstream functional programming language to Coq)"]}),"\n"]}),"\n",(0,n.jsx)(o.p,{children:"In the Go community;"}),"\n",(0,n.jsxs)(o.ul,{children:["\n",(0,n.jsxs)(o.li,{children:[(0,n.jsx)(o.a,{href:"https://github.com/tchajed/goose",children:"goose"})," (import Go to Coq)"]}),"\n"]}),"\n",(0,n.jsx)(o.p,{children:"In the Rust community:"}),"\n",(0,n.jsxs)(o.ul,{children:["\n",(0,n.jsxs)(o.li,{children:[(0,n.jsx)(o.a,{href:"https://github.com/Kha/electrolysis",children:"electrolysis"})," (import Rust to Lean)"]}),"\n"]}),"\n",(0,n.jsx)(o.h2,{id:"credits",children:"Credits"}),"\n",(0,n.jsxs)(o.p,{children:["The ",(0,n.jsx)(o.code,{children:"coq-of-ocaml"})," project started as part of a PhD directed by ",(0,n.jsx)(o.a,{href:"https://yrg.gitlab.io/homepage/",children:"Yann Regis-Gianas"})," and ",(0,n.jsx)(o.a,{href:"http://pauillac.inria.fr/~herbelin/",children:"Hugo Herbelin\n"})," as the university of ",(0,n.jsx)(o.a,{href:"https://u-paris.fr/",children:"Paris 7"}),". Originally, the goal was to formalize real OCaml programs in Coq to study side-effects inference and proof techniques on functional programs. This project was then financed by ",(0,n.jsx)(o.a,{href:"https://www.nomadic-labs.com/",children:"Nomadic Labs"})," and then the ",(0,n.jsx)(o.a,{href:"https://tezos.foundation/",children:"Tezos Foundation"}),", with the aim to be able to reason about the implementation of the crypto-currency ",(0,n.jsx)(o.a,{href:"https://tezos.com/",children:"Tezos"}),". See this ",(0,n.jsx)(o.a,{href:"http://coq-blog.clarus.me/beginning-of-verification-for-the-parsing-of-smart-contracts.html",children:"blog post"})," to get an example about what we can prove."]})]})}function d(e={}){const{wrapper:o}={...(0,r.R)(),...e.components};return o?(0,n.jsx)(o,{...e,children:(0,n.jsx)(h,{...e})}):h(e)}},8453:(e,o,t)=>{t.d(o,{R:()=>s,x:()=>i});var n=t(6540);const r={},a=n.createContext(r);function s(e){const o=n.useContext(a);return n.useMemo((function(){return"function"==typeof e?e(o):{...o,...e}}),[o,e])}function i(e){let o;return o=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:s(e.components),n.createElement(a.Provider,{value:o},e.children)}}}]);