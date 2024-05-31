"use strict";(self.webpackChunkformal_land=self.webpackChunkformal_land||[]).push([[4946],{6659:(e,t,o)=>{o.r(t),o.d(t,{assets:()=>r,contentTitle:()=>c,default:()=>h,frontMatter:()=>s,metadata:()=>a,toc:()=>l});var n=o(4848),i=o(8453);const s={id:"faq",title:"Faq"},c=void 0,a={id:"coq-of-ocaml/faq",title:"Faq",description:"Here we answer to some questions you may have when using coq-of-ocaml.",source:"@site/docs/coq-of-ocaml/faq.md",sourceDirName:"coq-of-ocaml",slug:"/coq-of-ocaml/faq",permalink:"/docs/coq-of-ocaml/faq",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{id:"faq",title:"Faq"},sidebar:"sidebar",previous:{title:"Examples",permalink:"/docs/coq-of-ocaml/examples"}},r={},l=[{value:"Why is there an <code>-impredicative-set</code> option to Coq?",id:"why-is-there-an--impredicative-set-option-to-coq",level:2}];function d(e){const t={a:"a",code:"code",h2:"h2",p:"p",pre:"pre",...(0,i.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(t.p,{children:["Here we answer to some questions you may have when using ",(0,n.jsx)(t.code,{children:"coq-of-ocaml"}),"."]}),"\n",(0,n.jsxs)(t.h2,{id:"why-is-there-an--impredicative-set-option-to-coq",children:["Why is there an ",(0,n.jsx)(t.code,{children:"-impredicative-set"})," option to Coq?"]}),"\n",(0,n.jsxs)(t.p,{children:["To compile the files generated by ",(0,n.jsx)(t.code,{children:"coq-of-ocaml"}),", we need to use the ",(0,n.jsx)(t.code,{children:"-impredicative-set"})," option with Coq. The ",(0,n.jsx)(t.a,{href:"https://github.com/coq/coq/wiki/Impredicative-Set",children:"Impredicative Set"})," page of the Coq wiki gives some details about this option. The reason for that is to avoid getting into universe inconsistency errors. If we take the following example:"]}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-ocaml",children:"type t =\n  | Empty\n  | Node : 'a -> t\n\n(* This function could be a deserializing function from [string] to [t]. We\n   use lists for the sake of simplicity. *)\nlet rec t_of_list (l : 'a list) : t =\n  match l with\n  | [] -> Empty\n  | _ :: l -> Node (t_of_list l)\n"})}),"\n",(0,n.jsx)(t.p,{children:"we generate the Coq translation:"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-coq",children:"Require Import CoqOfOCaml.CoqOfOCaml.\nRequire Import CoqOfOCaml.Settings.\n\nInductive t : Set :=\n| Empty : t\n| Node : forall {a : Set}, a -> t.\n\nFixpoint t_of_list {a : Set} (l : list a) : t :=\n  match l with\n  | [] => Empty\n  | cons _ l => Node (t_of_list l)\n  end.\n"})}),"\n",(0,n.jsxs)(t.p,{children:["The type ",(0,n.jsx)(t.code,{children:"t"})," has a constructor ",(0,n.jsx)(t.code,{children:"Node"})," with an existential type ",(0,n.jsx)(t.code,{children:"a"}),". With the function ",(0,n.jsx)(t.code,{children:"t_of_list"})," we generate a value with a number of nested existential types equals to the length of the list ",(0,n.jsx)(t.code,{children:"l"}),". This generated Coq code is valid."]}),"\n",(0,n.jsxs)(t.p,{children:["In contrast, if we were using ",(0,n.jsx)(t.code,{children:"Type"})," instead of ",(0,n.jsx)(t.code,{children:"Set"})," this would not work. Indeed, an existential type increases the universe level by one in ",(0,n.jsx)(t.code,{children:"Type"}),". So this function would have a universe level for its result equals to the length on the list. This does not seem easy to express, even with polymorphic universes."]})]})}function h(e={}){const{wrapper:t}={...(0,i.R)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(d,{...e})}):d(e)}},8453:(e,t,o)=>{o.d(t,{R:()=>c,x:()=>a});var n=o(6540);const i={},s=n.createContext(i);function c(e){const t=n.useContext(s);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:c(e.components),n.createElement(s.Provider,{value:t},e.children)}}}]);