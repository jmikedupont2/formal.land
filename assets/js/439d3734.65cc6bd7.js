"use strict";(self.webpackChunkformal_land=self.webpackChunkformal_land||[]).push([[3096],{2012:(e,n,o)=>{o.r(n),o.d(n,{assets:()=>s,contentTitle:()=>a,default:()=>h,frontMatter:()=>t,metadata:()=>l,toc:()=>c});var i=o(4848),r=o(8453);const t={},a="\ud83d\udc2b OCaml verification",l={id:"verification/ocaml",title:"\ud83d\udc2b OCaml verification",description:"To formally verify OCaml programs we are developing the translator coq-of-ocaml. It translates OCaml code to similar-looking code in the interactive proof assistant Coq. We are then expert in the Coq system and can formally verify arbitrarily complex properties.",source:"@site/docs/verification/ocaml.md",sourceDirName:"verification",slug:"/verification/ocaml",permalink:"/docs/verification/ocaml",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{}},s={},c=[];function d(e){const n={a:"a",admonition:"admonition",blockquote:"blockquote",code:"code",em:"em",h1:"h1",li:"li",p:"p",pre:"pre",ul:"ul",...(0,r.R)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.h1,{id:"-ocaml-verification",children:"\ud83d\udc2b OCaml verification"}),"\n",(0,i.jsxs)(n.p,{children:["To ",(0,i.jsx)(n.em,{children:(0,i.jsx)(n.a,{href:"https://en.wikipedia.org/wiki/Formal_verification",children:"formally verify"})})," OCaml programs we are developing the translator ",(0,i.jsx)(n.a,{href:"https://github.com/formal-land/coq-of-ocaml",children:"coq-of-ocaml"}),". It translates OCaml code to similar-looking code in the interactive proof assistant ",(0,i.jsx)(n.a,{href:"https://coq.inria.fr/",children:"Coq"}),". We are then expert in the Coq system and can formally verify arbitrarily complex properties."]}),"\n",(0,i.jsxs)(n.admonition,{type:"info",children:[(0,i.jsxs)(n.p,{children:["Our leading application is the project ",(0,i.jsx)(n.a,{href:"https://formal-land.gitlab.io/coq-tezos-of-ocaml/",children:"Coq Tezos of OCaml"}),", where we are formally verifying a codebase of around 100,000 lines of OCaml for the crypto-currency ",(0,i.jsx)(n.a,{href:"https://tezos.com/",children:"Tezos \ua729"}),". To this day, we have written around 60,000 lines of Coq code, and are verifying:"]}),(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"the absence of internal errors,"}),"\n",(0,i.jsx)(n.li,{children:"the backward compatibility,"}),"\n",(0,i.jsx)(n.li,{children:"the preservation of the invariants,"}),"\n",(0,i.jsx)(n.li,{children:"the serialization functions."}),"\n"]})]}),"\n",(0,i.jsxs)(n.p,{children:["As an example, ",(0,i.jsx)(n.code,{children:"coq-of-ocaml"})," translates the following OCaml code:"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ocaml",children:"(* OCaml code *)\nlet rec sum tree =\n  match tree with\n  | Leaf n -> n\n  | Node (tree1, tree2) -> sum tree1 + sum tree2\n"})}),"\n",(0,i.jsx)(n.p,{children:"to the corresponding Coq code:"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-coq",children:"(* Coq code generated by `coq-of-ocaml` *)\nFixpoint sum (tree : tree int) : int :=\n  match tree with\n  | Leaf n => n\n  | Node tree1 tree2 => sum tree1 +i sum tree2\n  end.\n"})}),"\n",(0,i.jsx)(n.p,{children:"As you can see, there are no much differences between the two apart from the syntax. For example, we try to never generate new variable names during the translation. Having a Coq code that is similar in shape and in size to the original program helps us to write formal proofs more efficiently. Following an existing codebase is also a good idea to organize all the proofs when certifying a software."}),"\n",(0,i.jsx)(n.p,{children:"We support a large subset of OCaml, including:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["the functional core (functions, ",(0,i.jsx)(n.code,{children:"let"}),", ",(0,i.jsx)(n.code,{children:"match"}),", ...)"]}),"\n",(0,i.jsx)(n.li,{children:"type definitions"}),"\n",(0,i.jsx)(n.li,{children:"monadic programs"}),"\n",(0,i.jsx)(n.li,{children:"modules, functors, and first-class modules"}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:".ml"})," and ",(0,i.jsx)(n.code,{children:".mli"})," files"]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"We also have partial support (with axioms) for:"}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"GADTs"}),"\n",(0,i.jsx)(n.li,{children:"polymorphic variants"}),"\n",(0,i.jsx)(n.li,{children:"extensible types"}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"We are now looking to support the new features introduced in OCaml 5."}),"\n",(0,i.jsx)(n.admonition,{title:"Offer",type:"tip",children:(0,i.jsxs)(n.p,{children:["If you want to make extra secure OCaml programs (to be applied in domains such as aviation, automotive, or medical devices) with formal verification, you can contact us by email at ",(0,i.jsx)(n.a,{href:"mailto:contact@formal.land",children:"contact@formal.land"})," \u2709\ufe0f or schedule a call on ",(0,i.jsx)(n.a,{href:"https://koalendar.com/e/meet-with-formal-land",children:"koalendar.com/e/meet-with-formal-land"})," \u260e\ufe0f. Our main expertise is in the Coq system. We estimate there should be one ",(0,i.jsx)(n.em,{children:"Coq developer"})," for each three or four ",(0,i.jsx)(n.em,{children:"OCaml developers"})," to make formally verified software."]})}),"\n",(0,i.jsxs)(n.blockquote,{children:["\n",(0,i.jsx)(n.p,{children:"Helping you build \ud83d\ude80"}),"\n"]})]})}function h(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(d,{...e})}):d(e)}},8453:(e,n,o)=>{o.d(n,{R:()=>a,x:()=>l});var i=o(6540);const r={},t=i.createContext(r);function a(e){const n=i.useContext(t);return i.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:a(e.components),i.createElement(t.Provider,{value:n},e.children)}}}]);