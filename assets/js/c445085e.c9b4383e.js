"use strict";(self.webpackChunkformal_land=self.webpackChunkformal_land||[]).push([[1805],{4535:(e,t,o)=>{o.r(t),o.d(t,{assets:()=>l,contentTitle:()=>r,default:()=>h,frontMatter:()=>s,metadata:()=>a,toc:()=>c});var n=o(4848),i=o(8453);const s={title:"\ud83e\udd80 Translation of the Rust's core and alloc crates",tags:["coq-of-rust","Rust","Coq","translation","core","alloc"],authors:[]},r=void 0,a={permalink:"/blog/2024/04/26/translation-core-alloc-crates",source:"@site/blog/2024-04-26-translation-core-alloc-crates.md",title:"\ud83e\udd80 Translation of the Rust's core and alloc crates",description:"We continue our work on formal verification of Rust programs with our tool coq-of-rust, to translate Rust code to the formal proof system Coq. One of the limitation we had was the handling of primitive constructs from the standard library of Rust, like Option::unwrapordefault or all other primitive functions. For each of these functions, we had to make a Coq definition to represent its behavior. This is both tedious and error prone.",date:"2024-04-26T00:00:00.000Z",formattedDate:"April 26, 2024",tags:[{label:"coq-of-rust",permalink:"/blog/tags/coq-of-rust"},{label:"Rust",permalink:"/blog/tags/rust"},{label:"Coq",permalink:"/blog/tags/coq"},{label:"translation",permalink:"/blog/tags/translation"},{label:"core",permalink:"/blog/tags/core"},{label:"alloc",permalink:"/blog/tags/alloc"}],readingTime:5.365,hasTruncateMarker:!0,authors:[],frontMatter:{title:"\ud83e\udd80 Translation of the Rust's core and alloc crates",tags:["coq-of-rust","Rust","Coq","translation","core","alloc"],authors:[]},unlisted:!1,prevItem:{title:"\ud83d\udc0d Translation of Python code to Coq",permalink:"/blog/2024/05/10/translation-of-python-code"},nextItem:{title:"\ud83e\udd80 Monadic notation for the Rust translation",permalink:"/blog/2024/04/03/monadic-notation-for-rust-translation"}},l={authorsImageUrls:[]},c=[{value:"Initial run \ud83d\udc25",id:"initial-run-",level:2},{value:"Splitting the generated code \ud83e\ude93",id:"splitting-the-generated-code-",level:2},{value:"Fixing some bugs \ud83d\udc1e",id:"fixing-some-bugs-",level:2},{value:"Example \ud83d\udd0e",id:"example-",level:2},{value:"Conclusion",id:"conclusion",level:2}];function d(e){const t={a:"a",admonition:"admonition",code:"code",h2:"h2",img:"img",li:"li",p:"p",pre:"pre",ul:"ul",...(0,i.R)(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(t.p,{children:["We continue our work on formal verification of ",(0,n.jsx)(t.a,{href:"https://www.rust-lang.org/",children:"Rust"})," programs with our tool ",(0,n.jsx)(t.a,{href:"https://github.com/formal-land/coq-of-rust",children:"coq-of-rust"}),", to translate Rust code to the formal proof system ",(0,n.jsx)(t.a,{href:"https://coq.inria.fr/",children:"Coq"}),". One of the limitation we had was the handling of primitive constructs from the standard library of Rust, like ",(0,n.jsx)(t.a,{href:"https://doc.rust-lang.org/core/option/enum.Option.html#method.unwrap_or_default",children:"Option::unwrap_or_default"})," or all other primitive functions. For each of these functions, we had to make a Coq definition to represent its behavior. This is both tedious and error prone."]}),"\n",(0,n.jsxs)(t.p,{children:["To solve this issue, we worked on the translation of the ",(0,n.jsx)(t.a,{href:"https://doc.rust-lang.org/core/",children:"core"})," and ",(0,n.jsx)(t.a,{href:"https://doc.rust-lang.org/alloc/",children:"alloc"})," crates of Rust using ",(0,n.jsx)(t.code,{children:"coq-of-rust"}),'. These are very large code bases, with a lot of unsafe or advanced Rust code. We present what we did to have a "best effort" translation of these crates. The resulting translation is in the following folders:']}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsx)(t.li,{children:(0,n.jsx)(t.a,{href:"https://github.com/formal-land/coq-of-rust/blob/main/CoqOfRust/alloc",children:"CoqOfRust/alloc"})}),"\n",(0,n.jsx)(t.li,{children:(0,n.jsx)(t.a,{href:"https://github.com/formal-land/coq-of-rust/blob/main/CoqOfRust/core",children:"CoqOfRust/core"})}),"\n"]}),"\n",(0,n.jsxs)(t.admonition,{title:"Contact",type:"tip",children:[(0,n.jsxs)(t.p,{children:["This work is funded by the ",(0,n.jsx)(t.a,{href:"https://alephzero.org/",children:"Aleph Zero"})," crypto-currency to verify their Rust smart contracts. You can ",(0,n.jsx)(t.a,{href:"https://twitter.com/LandFoobar",children:"follow us on X"})," to get our updates. We propose tools and services to make your codebase bug-free with ",(0,n.jsx)(t.a,{href:"https://en.wikipedia.org/wiki/Formal_verification",children:"formal verification"}),"."]}),(0,n.jsxs)(t.p,{children:["Contact us at\xa0",(0,n.jsx)(t.a,{href:"mailto:contact@formal.land",children:"contact@formal.land"})," to chat\xa0\u260e\ufe0f!"]})]}),"\n",(0,n.jsx)("figure",{children:(0,n.jsxs)(t.p,{children:[(0,n.jsx)(t.img,{alt:"Crab with a pen",src:o(7745).A+"",width:"1024",height:"1024"}),"\n",(0,n.jsx)("figcaption",{children:"A crab in a library"})]})}),"\n",(0,n.jsx)(t.h2,{id:"initial-run-",children:"Initial run \ud83d\udc25"}),"\n",(0,n.jsxs)(t.p,{children:["An initial run of ",(0,n.jsx)(t.code,{children:"coq-of-rust"})," on the ",(0,n.jsx)(t.code,{children:"alloc"})," and ",(0,n.jsx)(t.code,{children:"core"})," crates of Rust generated us two files of a few hundred thousands lines of Coq corresponding to the whole translation of these crates. This is a first good news, as it means the tool runs of these large code bases. However the generated Coq code does not compile, even if the errors are very rare (one every few thousands lines)."]}),"\n",(0,n.jsxs)(t.p,{children:["To get an idea, here is the size of the input Rust code as given by the ",(0,n.jsx)(t.code,{children:"cloc"})," command:"]}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.code,{children:"alloc"}),": 26,299 lines of Rust code"]}),"\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.code,{children:"core"}),": 54,192 lines of Rust code"]}),"\n"]}),"\n",(0,n.jsx)(t.p,{children:"Given that this code uses macros that we expand in our translation, the actual size that we have to translate is even bigger."}),"\n",(0,n.jsx)(t.h2,{id:"splitting-the-generated-code-",children:"Splitting the generated code \ud83e\ude93"}),"\n",(0,n.jsxs)(t.p,{children:["The main change we made was to split the output generated by ",(0,n.jsx)(t.code,{children:"coq-of-rust"})," with one file for each input Rust file. This is possible because our translation is insensitive to the order of definitions and context-free. So, even if there are typically cyclic dependencies between the files in Rust, something that is forbidden in Coq, we can still split them."]}),"\n",(0,n.jsx)(t.p,{children:"We get the following sizes as output:"}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.code,{children:"alloc"}),": 54 Coq files, 171,783 lines of Coq code"]}),"\n",(0,n.jsxs)(t.li,{children:[(0,n.jsx)(t.code,{children:"core"}),": 190 Coq files, 592,065 lines of Coq code"]}),"\n"]}),"\n",(0,n.jsx)(t.p,{children:"The advantages of having the code split are:"}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsx)(t.li,{children:"it is easier to read and navigate in the generated code"}),"\n",(0,n.jsx)(t.li,{children:"it is easier to compile as we can parallelize the compilation"}),"\n",(0,n.jsx)(t.li,{children:"it is easier to debug as we can focus on one file at a time"}),"\n",(0,n.jsx)(t.li,{children:"it is easier to ignore files that do not compile"}),"\n",(0,n.jsx)(t.li,{children:"it will be easier to maintain, as it is easier to follow the diff of a single file"}),"\n"]}),"\n",(0,n.jsx)(t.h2,{id:"fixing-some-bugs-",children:"Fixing some bugs \ud83d\udc1e"}),"\n",(0,n.jsxs)(t.p,{children:["We had some bugs related to the collisions between module names. These can occur when we choose a name for the module for an ",(0,n.jsx)(t.code,{children:"impl"})," block. We fixed these by adding more information in the module names to make them more unique, like the ",(0,n.jsx)(t.code,{children:"where"})," clauses that were missing. For example, for the implementation of the ",(0,n.jsx)(t.code,{children:"Default"})," trait for the ",(0,n.jsx)(t.code,{children:"Mapping"})," type:"]}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-rust",children:"#[derive(Default)]\nstruct Mapping<K, V> {\n    // ...\n}\n"})}),"\n",(0,n.jsx)(t.p,{children:"we were generating the following Coq code:"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-coq",children:"Module Impl_core_default_Default_for_dns_Mapping_K_V.\n  (* ...trait implementation ... *)\nEnd Impl_core_default_Default_for_dns_Mapping_K_V.\n"})}),"\n",(0,n.jsx)(t.p,{children:"We now generate:"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-coq",children:"Module Impl_core_default_Default_where_core_default_Default_K_where_core_default_Default_V_for_dns_Mapping_K_V.\n  (* ... *)\n"})}),"\n",(0,n.jsxs)(t.p,{children:["with a module name that includes the ",(0,n.jsx)(t.code,{children:"where"})," clauses of the ",(0,n.jsx)(t.code,{children:"impl"})," block, stating that both ",(0,n.jsx)(t.code,{children:"K"})," and ",(0,n.jsx)(t.code,{children:"V"})," should implement the ",(0,n.jsx)(t.code,{children:"Default"})," trait."]}),"\n",(0,n.jsx)(t.p,{children:"Here is the list of files that do not compile in Coq, as of today:"}),"\n",(0,n.jsxs)(t.ul,{children:["\n",(0,n.jsx)(t.li,{children:(0,n.jsx)(t.code,{children:"alloc/boxed.v"})}),"\n",(0,n.jsx)(t.li,{children:(0,n.jsx)(t.code,{children:"core/any.v"})}),"\n",(0,n.jsx)(t.li,{children:(0,n.jsx)(t.code,{children:"core/array/mod.v"})}),"\n",(0,n.jsx)(t.li,{children:(0,n.jsx)(t.code,{children:"core/cmp/bytewise.v"})}),"\n",(0,n.jsx)(t.li,{children:(0,n.jsx)(t.code,{children:"core/error.v"})}),"\n",(0,n.jsx)(t.li,{children:(0,n.jsx)(t.code,{children:"core/escape.v"})}),"\n",(0,n.jsx)(t.li,{children:(0,n.jsx)(t.code,{children:"core/iter/adapters/flatten.v"})}),"\n",(0,n.jsx)(t.li,{children:(0,n.jsx)(t.code,{children:"core/net/ip_addr.v"})}),"\n"]}),"\n",(0,n.jsx)(t.p,{children:"This represents 4% of the files. Note that in the files that compile there are some unhandled Rust constructs that are axiomatized, so this does not give the whole picture of what we do not support."}),"\n",(0,n.jsx)(t.h2,{id:"example-",children:"Example \ud83d\udd0e"}),"\n",(0,n.jsxs)(t.p,{children:["Here is the source code of the ",(0,n.jsx)(t.code,{children:"unwrap_or_default"})," method for the ",(0,n.jsx)(t.code,{children:"Option"})," type:"]}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-rust",children:"pub fn unwrap_or_default(self) -> T\nwhere\n    T: Default,\n{\n    match self {\n        Some(x) => x,\n        None => T::default(),\n    }\n}\n"})}),"\n",(0,n.jsx)(t.p,{children:"We translate it to:"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-coq",children:'Definition unwrap_or_default (T : Ty.t) (\u03c4 : list Ty.t) (\u03b1 : list Value.t) : M :=\n  let Self : Ty.t := Self T in\n  match \u03c4, \u03b1 with\n  | [], [ self ] =>\n    ltac:(M.monadic\n      (let self := M.alloc (| self |) in\n      M.read (|\n        M.match_operator (|\n          self,\n          [\n            fun \u03b3 =>\n              ltac:(M.monadic\n                (let \u03b30_0 :=\n                  M.get_struct_tuple_field_or_break_match (|\n                    \u03b3,\n                    "core::option::Option::Some",\n                    0\n                  |) in\n                let x := M.copy (| \u03b30_0 |) in\n                x));\n            fun \u03b3 =>\n              ltac:(M.monadic\n                (M.alloc (|\n                  M.call_closure (|\n                    M.get_trait_method (| "core::default::Default", T, [], "default", [] |),\n                    []\n                  |)\n                |)))\n          ]\n        |)\n      |)))\n  | _, _ => M.impossible\n  end.\n'})}),"\n",(0,n.jsx)(t.p,{children:"We prove that it is equivalent to the simpler functional code:"}),"\n",(0,n.jsx)(t.pre,{children:(0,n.jsx)(t.code,{className:"language-coq",children:"Definition unwrap_or_default {T : Set}\n    {_ : core.simulations.default.Default.Trait T}\n    (self : Self T) :\n    T :=\n  match self with\n  | None => core.simulations.default.Default.default (Self := T)\n  | Some x => x\n  end.\n"})}),"\n",(0,n.jsxs)(t.p,{children:["This simpler definition is what we use when verifying code. The proof of equivalence is in ",(0,n.jsx)(t.a,{href:"https://github.com/formal-land/coq-of-rust/blob/main/CoqOfRust/core/proofs/option.v",children:"CoqOfRust/core/proofs/option.v"}),". In case the original source code changes, we are sure to capture these changes thanks to our proof. Because the translation of the ",(0,n.jsx)(t.code,{children:"core"})," library was done automatically, we trust the generated definitions more than definitions that would be done by hand. However, there can still be mistakes or incompleteness in ",(0,n.jsx)(t.code,{children:"coq-of-rust"}),", so we still need to check at proof time that the code makes sense."]}),"\n",(0,n.jsx)(t.h2,{id:"conclusion",children:"Conclusion"}),"\n",(0,n.jsx)(t.p,{children:"We can now work on the verification of Rust programs with more trust in our formalization of the standard library. Our next target is to simplify our proof process, which is still tedious. In particular, showing that simulations are equivalent to the original Rust code requires doing the name resolution, introduction of high-level types, and removal of the side-effects. We would like to split these steps."}),"\n",(0,n.jsxs)(t.p,{children:["If you are interested in formally verifying your Rust projects, do not hesitate to get in touch with us at\xa0",(0,n.jsx)(t.a,{href:"mailto:contact@formal.land",children:"contact@formal.land"}),"\xa0\ud83d\udc8c! Formal verification provides the highest level of safety for critical applications, with a mathematical guarantee of the absence of bugs for a given specification."]})]})}function h(e={}){const{wrapper:t}={...(0,i.R)(),...e.components};return t?(0,n.jsx)(t,{...e,children:(0,n.jsx)(d,{...e})}):d(e)}},7745:(e,t,o)=>{o.d(t,{A:()=>n});const n=o.p+"assets/images/crab-in-library-33b99a73bc3cfc9a6c36bcb893f870a1.webp"},8453:(e,t,o)=>{o.d(t,{R:()=>r,x:()=>a});var n=o(6540);const i={},s=n.createContext(i);function r(e){const t=n.useContext(s);return n.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function a(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),n.createElement(s.Provider,{value:t},e.children)}}}]);