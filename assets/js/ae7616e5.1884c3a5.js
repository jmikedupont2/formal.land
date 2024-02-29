"use strict";(self.webpackChunkformal_land=self.webpackChunkformal_land||[]).push([[4617],{5761:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>l,contentTitle:()=>a,default:()=>h,frontMatter:()=>i,metadata:()=>s,toc:()=>c});var r=n(4848),o=n(8453);const i={title:"Optimizing Rust translation to Coq with THIR and bundled traits",tags:["coq-of-rust","Rust","Coq","trait","THIR","HIR"],author:"Guillaume Claret"},a=void 0,s={permalink:"/blog/2023/11/08/rust-thir-and-bundled-traits",source:"@site/blog/2023-11-08-rust-thir-and-bundled-traits.md",title:"Optimizing Rust translation to Coq with THIR and bundled traits",description:"We continued our work on coq-of-rust, a tool to formally verify Rust programs using the proof system Coq&nbsp;\ud83d\udc13. This tool translates Rust programs to an equivalent Coq program, which can then be verified using Coq's proof assistant. It opens the door to building mathematically proven bug-free Rust programs.",date:"2023-11-08T00:00:00.000Z",formattedDate:"November 8, 2023",tags:[{label:"coq-of-rust",permalink:"/blog/tags/coq-of-rust"},{label:"Rust",permalink:"/blog/tags/rust"},{label:"Coq",permalink:"/blog/tags/coq"},{label:"trait",permalink:"/blog/tags/trait"},{label:"THIR",permalink:"/blog/tags/thir"},{label:"HIR",permalink:"/blog/tags/hir"}],readingTime:5.22,hasTruncateMarker:!0,authors:[{name:"Guillaume Claret"}],frontMatter:{title:"Optimizing Rust translation to Coq with THIR and bundled traits",tags:["coq-of-rust","Rust","Coq","trait","THIR","HIR"],author:"Guillaume Claret"},unlisted:!1,prevItem:{title:"Translation of function bodies from Rust to Coq",permalink:"/blog/2023/11/26/rust-function-body"},nextItem:{title:"Trait representation in Coq",permalink:"/blog/2023/08/25/trait-representation-in-coq"}},l={authorsImageUrls:[void 0]},c=[{value:"THIR intermediate language",id:"thir-intermediate-language",level:2},{value:"Bundled traits",id:"bundled-traits",level:2},{value:"Conclusion",id:"conclusion",level:2}];function d(e){const t={a:"a",admonition:"admonition",code:"code",h2:"h2",img:"img",li:"li",p:"p",pre:"pre",ul:"ul",...(0,o.R)(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)(t.p,{children:["We continued our work on ",(0,r.jsx)(t.a,{href:"https://github.com/formal-land/coq-of-rust",children:"coq-of-rust"}),", a tool to formally verify ",(0,r.jsx)(t.a,{href:"https://www.rust-lang.org/",children:"Rust"})," programs using the proof system ",(0,r.jsx)(t.a,{href:"https://coq.inria.fr/",children:"Coq\xa0\ud83d\udc13"}),". This tool translates Rust programs to an equivalent Coq program, which can then be verified using Coq's proof assistant. It opens the door to building mathematically proven bug-free Rust programs."]}),"\n",(0,r.jsxs)(t.p,{children:["We present two main improvements we made to ",(0,r.jsx)(t.code,{children:"coq-of-rust"}),":"]}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsx)(t.li,{children:"Using the THIR intermediate language of Rust to have more information during the translation to Coq."}),"\n",(0,r.jsx)(t.li,{children:"Bundling the type-classes representing the traits of Rust to have faster type-checking in Coq."}),"\n"]}),"\n",(0,r.jsx)(t.p,{children:(0,r.jsx)(t.img,{alt:"Rust and Coq",src:n(8295).A+"",width:"512",height:"512"})}),"\n",(0,r.jsx)(t.h2,{id:"thir-intermediate-language",children:"THIR intermediate language"}),"\n",(0,r.jsx)(t.p,{children:"To translate Rust programs to Coq, we plug into the compiler of Rust, which operates on a series of intermediate languages:"}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsxs)(t.li,{children:["source code (",(0,r.jsx)(t.code,{children:".rs"})," files);"]}),"\n",(0,r.jsx)(t.li,{children:"abstract syntax tree (AST): immediately after parsing;"}),"\n",(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.a,{href:"https://rustc-dev-guide.rust-lang.org/hir.html",children:"High-Level Intermediate Representation"})," (HIR): after macro expansion, with name resolution and close to the AST;"]}),"\n",(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.a,{href:"https://rustc-dev-guide.rust-lang.org/thir.html",children:"Typed High-Level Intermediate Representation"})," (THIR): after the type-checking;"]}),"\n",(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.a,{href:"https://rustc-dev-guide.rust-lang.org/mir/index.html",children:"Mid-level Intermediate Representation"})," (MIR): low-level representation based on a ",(0,r.jsx)(t.a,{href:"https://en.wikipedia.org/wiki/Control-flow_graph",children:"control-flow graph"}),", inlining traits and polymorphic functions, and with ",(0,r.jsx)(t.a,{href:"https://doc.rust-lang.org/book/ch04-02-references-and-borrowing.html",children:"borrow checking"}),";"]}),"\n",(0,r.jsx)(t.li,{children:"machine code (assembly, LLVM IR, ...)."}),"\n"]}),"\n",(0,r.jsxs)(t.p,{children:["We were previously using the HIR language to start our translation to Coq, because it is not too low-level and close to what the user has originally in the ",(0,r.jsx)(t.code,{children:".rs"})," file. This helps relate the generated Coq code to the original Rust code."]}),"\n",(0,r.jsxs)(t.p,{children:["However, at the level of HIR, there is still a lot of implicit information. For example, Rust has ",(0,r.jsx)(t.a,{href:"https://users.rust-lang.org/t/automatic-dereferencing/53828",children:"automatic dereferencing rules"})," that are not yet explicit in HIR. In order not to make any mistakes during our translation to Coq, we prefer to use the next representation, THIR, that makes explicit such rules."]}),"\n",(0,r.jsxs)(t.p,{children:["In addition, the THIR representation shows when a method call is from a trait (and which trait) or from a standalone ",(0,r.jsx)(t.code,{children:"impl"})," block. Given that we still have trouble translating the traits with ",(0,r.jsx)(t.a,{href:"https://coq.inria.fr/doc/V8.18.0/refman/addendum/type-classes.html",children:"type-classes"})," that are inferrable by Coq, this helps a lot."]}),"\n",(0,r.jsx)(t.p,{children:"A downside of the THIR representation is that it is much more verbose. For example, here is a formatting function generated from HIR:"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-coq",children:'Definition fmt\n    `{\u210b : State.Trait}\n    (self : ref Self)\n    (f : mut_ref core.fmt.Formatter)\n    : M core.fmt.Result :=\n  let* \u03b10 := format_argument::["new_display"] (addr_of self.["radius"]) in\n  let* \u03b11 :=\n    format_arguments::["new_v1"]\n      (addr_of [ "Circle of radius " ])\n      (addr_of [ \u03b10 ]) in\n  f.["write_fmt"] \u03b11.\n'})}),"\n",(0,r.jsxs)(t.p,{children:["This is the kind of functions generated by the ",(0,r.jsx)(t.code,{children:"#[derive(Debug)]"})," macro of Rust, to implement a formatting function on a type. Here is the version translated from THIR, with explicit borrowing and dereferencing:"]}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-coq",children:'Definition fmt\n    `{\u210b : State.Trait}\n    (self : ref Self)\n    (f : mut_ref core.fmt.Formatter)\n    : M ltac:(core.fmt.Result) :=\n  let* \u03b10 := deref f core.fmt.Formatter in\n  let* \u03b11 := borrow_mut \u03b10 core.fmt.Formatter in\n  let* \u03b12 := borrow [ mk_str "Circle of radius " ] (list (ref str)) in\n  let* \u03b13 := deref \u03b12 (list (ref str)) in\n  let* \u03b14 := borrow \u03b13 (list (ref str)) in\n  let* \u03b15 := pointer_coercion "Unsize" \u03b14 in\n  let* \u03b16 := deref self converting_to_string.Circle in\n  let* \u03b17 := \u03b16.["radius"] in\n  let* \u03b18 := borrow \u03b17 i32 in\n  let* \u03b19 := deref \u03b18 i32 in\n  let* \u03b110 := borrow \u03b19 i32 in\n  let* \u03b111 := core.fmt.rt.Argument::["new_display"] \u03b110 in\n  let* \u03b112 := borrow [ \u03b111 ] (list core.fmt.rt.Argument) in\n  let* \u03b113 := deref \u03b112 (list core.fmt.rt.Argument) in\n  let* \u03b114 := borrow \u03b113 (list core.fmt.rt.Argument) in\n  let* \u03b115 := pointer_coercion "Unsize" \u03b114 in\n  let* \u03b116 := core.fmt.Arguments::["new_v1"] \u03b15 \u03b115 in\n  core.fmt.Formatter::["write_fmt"] \u03b11 \u03b116.\n'})}),"\n",(0,r.jsx)(t.p,{children:"We went from a function having two intermediate variables to seventeen intermediate variables. This code is much more verbose, but it is also more explicit. In particular, it details when the:"}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsxs)(t.li,{children:["borrowing (going from a value of type ",(0,r.jsx)(t.code,{children:"T"})," to ",(0,r.jsx)(t.code,{children:"&T"}),"), and the"]}),"\n",(0,r.jsxs)(t.li,{children:["dereferencing (going from a value of type ",(0,r.jsx)(t.code,{children:"&T"})," to ",(0,r.jsx)(t.code,{children:"T"}),")"]}),"\n"]}),"\n",(0,r.jsxs)(t.p,{children:["occur. It also shows that the method\xa0",(0,r.jsx)(t.code,{children:"write_fmt"})," is a method from the implementation of the type ",(0,r.jsx)(t.code,{children:"core.fmt.Formatter"}),", generating:"]}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-coq",children:'core.fmt.Formatter::["write_fmt"] \u03b11 \u03b116\n'})}),"\n",(0,r.jsx)(t.p,{children:"instead of:"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-coq",children:'f.["write_fmt"] \u03b11\n'})}),"\n",(0,r.jsx)(t.h2,{id:"bundled-traits",children:"Bundled traits"}),"\n",(0,r.jsxs)(t.p,{children:["Some Rust codebases can have a lot of traits. For example in ",(0,r.jsx)(t.a,{href:"https://github.com/paritytech/ink/blob/ccb38d2c3ac27523fe3108f2bb7bffbbe908cdb7/crates/env/src/types.rs#L120",children:"paritytech/ink/crates/env/src/types.rs"})," the trait\xa0",(0,r.jsx)(t.code,{children:"Environment"})," references more than forty other traits:"]}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-rust",children:"pub trait Environment: Clone {\n    const MAX_EVENT_TOPICS: usize;\n\n    type AccountId: 'static\n        + scale::Codec\n        + CodecAsType\n        + Clone\n        + PartialEq\n        + ...;\n\n    type Balance: 'static\n        + scale::Codec\n        + CodecAsType\n        + ...;\n\n    ...\n"})}),"\n",(0,r.jsx)(t.p,{children:"We first used an unbundled approach to represent this trait by a type-class in Coq, as it felt more natural:"}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-coq",children:"Module Environment.\n  Class Trait (Self : Set) `{Clone.Trait Self}\n    {AccountId : Set}\n    `{scale.Codec.Trait AccountId}\n    `{CodecAsType AccountId}\n    `{Clone AccountId}\n    `{PartialEq AccountId}\n    ...\n"})}),"\n",(0,r.jsxs)(t.p,{children:["However, the backquote operator generated too many implicit arguments, and the type-checker of Coq was very slow. We then switched to a bundled approach, as advocated in this blog post: ",(0,r.jsx)(t.a,{href:"https://www.ralfj.de/blog/2019/05/15/typeclasses-exponential-blowup.html",children:"Exponential blowup when using unbundled typeclasses to model algebraic hierarchies"}),". The Coq code for this trait now looks like this:"]}),"\n",(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:"language-coq",children:"Module Environment.\n  Class Trait `{\u210b : State.Trait} (Self : Set) : Type := {\n    \u210b_0 :: Clone.Trait Self;\n    MAX_EVENT_TOPICS : usize;\n    AccountId : Set;\n    \u2112_0 :: parity_scale_codec.codec.Codec.Trait AccountId;\n    \u2112_1 :: ink_env.types.CodecAsType.Trait AccountId;\n    \u2112_2 :: core.clone.Clone.Trait AccountId;\n    \u2112_3 ::\n      core.cmp.PartialEq.Trait AccountId\n        (Rhs := core.cmp.PartialEq.Default.Rhs AccountId);\n    ...;\n    Balance : Set;\n    \u2112_8 :: parity_scale_codec.codec.Codec.Trait Balance;\n    \u2112_9 :: ink_env.types.CodecAsType.Trait Balance;\n    ...;\n\n    ...\n"})}),"\n",(0,r.jsxs)(t.p,{children:["We use the notation\xa0",(0,r.jsx)(t.code,{children:"::"})," for fields that are trait instances. With this approach, traits have types as parameters but no other traits."]}),"\n",(0,r.jsx)(t.p,{children:"The type-checking is now much faster, and in particular, we avoid some cases with exponential blowup or non-terminating type-checking. But this is not a perfect solution as we still have cases where the instance inference does not terminate or fails with hard-to-understand error messages."}),"\n",(0,r.jsx)(t.h2,{id:"conclusion",children:"Conclusion"}),"\n",(0,r.jsxs)(t.p,{children:["We have illustrated here some improvements we recently made to our ",(0,r.jsx)(t.a,{href:"https://github.com/formal-land/coq-of-rust",children:"coq-of-rust"})," translator for two key areas:"]}),"\n",(0,r.jsxs)(t.ul,{children:["\n",(0,r.jsx)(t.li,{children:"the translation of traits;"}),"\n",(0,r.jsx)(t.li,{children:"the translation of the implicit borrowing and dereferencing, that can occur every time we call a function."}),"\n"]}),"\n",(0,r.jsxs)(t.p,{children:["These improvements will allow us to formally verify some more complex Rust codebases. In particular, we are applying ",(0,r.jsx)(t.code,{children:"coq-of-rust"})," to verify smart contracts written for the ",(0,r.jsx)(t.a,{href:"https://use.ink/",children:"ink!"})," platform, that is a subset of Rust."]}),"\n",(0,r.jsx)(t.admonition,{title:"Contact",type:"tip",children:(0,r.jsxs)(t.p,{children:["If you have comments, similar experiences to share, or wish to formally verify your codebase to improve the security of your application, contact us at\xa0",(0,r.jsx)(t.a,{href:"mailto:contact@formal.land",children:"contact@formal.land"}),"!"]})})]})}function h(e={}){const{wrapper:t}={...(0,o.R)(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(d,{...e})}):d(e)}},8295:(e,t,n)=>{n.d(t,{A:()=>r});const r=n.p+"assets/images/rust_and_coq-24841df3c1f402ea1ff783770d999040.png"},8453:(e,t,n)=>{n.d(t,{R:()=>a,x:()=>s});var r=n(6540);const o={},i=r.createContext(o);function a(e){const t=r.useContext(i);return r.useMemo((function(){return"function"==typeof e?e(t):{...t,...e}}),[t,e])}function s(e){let t;return t=e.disableParentContext?"function"==typeof e.components?e.components(o):e.components||o:a(e.components),r.createElement(i.Provider,{value:t},e.children)}}}]);