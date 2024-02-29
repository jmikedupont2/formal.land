"use strict";(self.webpackChunkformal_land=self.webpackChunkformal_land||[]).push([[3186],{4654:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>i,contentTitle:()=>o,default:()=>d,frontMatter:()=>s,metadata:()=>l,toc:()=>c});var a=t(4848),r=t(8453);const s={title:"Translating Rust match patterns to Coq with coq-of-rust",tags:["coq-of-rust","Rust","Coq","Aleph-Zero"],authors:[]},o=void 0,l={permalink:"/blog/2024/01/04/rust-translating-match",source:"@site/blog/2024-01-04-rust-translating-match.md",title:"Translating Rust match patterns to Coq with coq-of-rust",description:"Our tool coq-of-rust enables formal verification of \ud83e\udd80&nbsp;Rust code to make sure that a program has no bugs. This technique checks all possible execution paths using mathematical techniques. This is important for example to ensure the security of smart contracts written in Rust language.",date:"2024-01-04T00:00:00.000Z",formattedDate:"January 4, 2024",tags:[{label:"coq-of-rust",permalink:"/blog/tags/coq-of-rust"},{label:"Rust",permalink:"/blog/tags/rust"},{label:"Coq",permalink:"/blog/tags/coq"},{label:"Aleph-Zero",permalink:"/blog/tags/aleph-zero"}],readingTime:6.005,hasTruncateMarker:!0,authors:[],frontMatter:{title:"Translating Rust match patterns to Coq with coq-of-rust",tags:["coq-of-rust","Rust","Coq","Aleph-Zero"],authors:[]},unlisted:!1,prevItem:{title:"Upgrade the Rust version of coq-of-rust",permalink:"/blog/2024/01/18/update-coq-of-rust"},nextItem:{title:"Verifying an ERC-20 smart contract in Rust",permalink:"/blog/2023/12/13/rust-verify-erc-20-smart-contract"}},i={authorsImageUrls:[]},c=[{value:"Rust example\xa0\ud83e\udd80",id:"rust-example",level:2},{value:"Coq translation\xa0\ud83d\udc13",id:"coq-translation",level:2},{value:"<code>None</code> branch",id:"none-branch",level:3},{value:"<code>Some</code> branch",id:"some-branch",level:3},{value:"General translation",id:"general-translation",level:2},{value:"Conclusion",id:"conclusion",level:2}];function h(e){const n={a:"a",admonition:"admonition",code:"code",h2:"h2",h3:"h3",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",ul:"ul",...(0,r.R)(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)(n.p,{children:["Our tool ",(0,a.jsx)(n.a,{href:"https://github.com/formal-land/coq-of-rust",children:"coq-of-rust"})," enables ",(0,a.jsx)(n.a,{href:"https://en.wikipedia.org/wiki/Formal_verification",children:"formal verification"})," of ",(0,a.jsx)(n.a,{href:"https://www.rust-lang.org/",children:"\ud83e\udd80\xa0Rust"})," code to make sure that a program has no bugs. This technique checks all possible execution paths using mathematical techniques. This is important for example to ensure the security of smart contracts written in Rust language."]}),"\n",(0,a.jsxs)(n.p,{children:["Our tool ",(0,a.jsx)(n.code,{children:"coq-of-rust"})," works by translating Rust programs to the general proof system ",(0,a.jsx)(n.a,{href:"https://coq.inria.fr/",children:"\ud83d\udc13\xa0Coq"}),". Here we explain how we translate",(0,a.jsxs)(n.a,{href:"https://doc.rust-lang.org/book/ch06-02-match.html",children:["\xa0",(0,a.jsx)(n.code,{children:"match"})," patterns"]})," from Rust to Coq. The specificity of Rust patterns is to be able to match values either by value or reference."]}),"\n",(0,a.jsx)(n.admonition,{title:"Purchase",type:"tip",children:(0,a.jsxs)(n.p,{children:["To formally verify your Rust codebase and improve the security of your application, email us at\xa0",(0,a.jsx)(n.a,{href:"mailto:contact@formal.land",children:"contact@formal.land"}),"! Formal verification is the only way to prevent all bugs by exploring all possible executions of your program."]})}),"\n",(0,a.jsx)(n.admonition,{title:"Thanks",type:"info",children:(0,a.jsxs)(n.p,{children:["This work and the development of ",(0,a.jsx)(n.a,{href:"https://github.com/formal-land/coq-of-rust",children:"coq-of-rust"})," is made possible thanks to the ",(0,a.jsx)(n.a,{href:"https://alephzero.org/",children:"Aleph Zero"}),"'s Foundation, to develop an extra safe platform to build decentralized applications with formally verified smart contracts."]})}),"\n",(0,a.jsx)(n.p,{children:(0,a.jsx)(n.img,{alt:"Rust rooster",src:t(8566).A+"",width:"512",height:"512"})}),"\n",(0,a.jsx)(n.h2,{id:"rust-example",children:"Rust example\xa0\ud83e\udd80"}),"\n",(0,a.jsx)(n.p,{children:"To illustrate the pattern matching in Rust, we will use the following example featuring a match by reference:"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-rust",children:"pub(crate) fn is_option_equal<A>(\n    is_equal: fn(x: &A, y: &A) -> bool,\n    lhs: Option<A>,\n    rhs: &A,\n) -> bool {\n    match lhs {\n        None => false,\n        Some(ref value) => is_equal(value, rhs),\n    }\n}\n"})}),"\n",(0,a.jsxs)(n.p,{children:["We take a function\xa0",(0,a.jsx)(n.code,{children:"is_equal"})," as a parameter, operating only on references to the type\xa0",(0,a.jsx)(n.code,{children:"A"}),". We apply it to compare two values\xa0",(0,a.jsx)(n.code,{children:"lhs"})," and\xa0",(0,a.jsx)(n.code,{children:"rhs"}),":"]}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:["if\xa0",(0,a.jsx)(n.code,{children:"lhs"})," is\xa0",(0,a.jsx)(n.code,{children:"None"}),", we return\xa0",(0,a.jsx)(n.code,{children:"false"}),","]}),"\n",(0,a.jsxs)(n.li,{children:["if\xa0",(0,a.jsx)(n.code,{children:"lhs"})," is\xa0",(0,a.jsx)(n.code,{children:"Some"}),", we get its value by reference and apply\xa0",(0,a.jsx)(n.code,{children:"is_equal"}),"."]}),"\n"]}),"\n",(0,a.jsx)(n.p,{children:"When we apply the pattern:"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-rust",children:"Some(ref value) => ...\n"})}),"\n",(0,a.jsxs)(n.p,{children:["we do something interesting: we read the value of\xa0",(0,a.jsx)(n.code,{children:"lhs"})," to know if we are in a\xa0",(0,a.jsx)(n.code,{children:"Some"})," case but leave it in place and return\xa0",(0,a.jsx)(n.code,{children:"value"})," the reference to its content."]}),"\n",(0,a.jsx)(n.p,{children:"To simulate this behavior in Coq, we need to match in two steps:"}),"\n",(0,a.jsxs)(n.ol,{children:["\n",(0,a.jsxs)(n.li,{children:["match the value of\xa0",(0,a.jsx)(n.code,{children:"lhs"})," to know if we are in a\xa0",(0,a.jsx)(n.code,{children:"Some"})," case or not,"]}),"\n",(0,a.jsxs)(n.li,{children:["if we are in a\xa0",(0,a.jsx)(n.code,{children:"Some"})," case, create the reference to the content of a\xa0",(0,a.jsx)(n.code,{children:"Some"})," case based on the reference to\xa0",(0,a.jsx)(n.code,{children:"lhs"}),"."]}),"\n"]}),"\n",(0,a.jsx)(n.h2,{id:"coq-translation",children:"Coq translation\xa0\ud83d\udc13"}),"\n",(0,a.jsxs)(n.p,{children:["The Coq translation that our tool ",(0,a.jsx)(n.a,{href:"https://github.com/formal-land/coq-of-rust",children:"coq-of-rust"})," generates is the following:"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-coq",children:'Definition is_option_equal\n    {A : Set}\n    (is_equal : (ref A) -> (ref A) -> M bool.t)\n    (lhs : core.option.Option.t A)\n    (rhs : ref A)\n    : M bool.t :=\n  let* is_equal := M.alloc is_equal in\n  let* lhs := M.alloc lhs in\n  let* rhs := M.alloc rhs in\n  let* \u03b10 : M.Val bool.t :=\n    match_operator\n      lhs\n      [\n        fun \u03b3 =>\n          (let* \u03b10 := M.read \u03b3 in\n          match \u03b10 with\n          | core.option.Option.None => M.alloc false\n          | _ => M.break_match\n          end) :\n          M (M.Val bool.t);\n        fun \u03b3 =>\n          (let* \u03b10 := M.read \u03b3 in\n          match \u03b10 with\n          | core.option.Option.Some _ =>\n            let \u03b30_0 := \u03b3.["Some.0"] in\n            let* value := M.alloc (borrow \u03b30_0) in\n            let* \u03b10 : (ref A) -> (ref A) -> M bool.t := M.read is_equal in\n            let* \u03b11 : ref A := M.read value in\n            let* \u03b12 : ref A := M.read rhs in\n            let* \u03b13 : bool.t := M.call (\u03b10 \u03b11 \u03b12) in\n            M.alloc \u03b13\n          | _ => M.break_match\n          end) :\n          M (M.Val bool.t)\n      ] in\n  M.read \u03b10.\n'})}),"\n",(0,a.jsxs)(n.p,{children:["We run the\xa0",(0,a.jsx)(n.code,{children:"match_operator"})," on\xa0",(0,a.jsx)(n.code,{children:"lhs"})," and the two branches of the\xa0",(0,a.jsx)(n.code,{children:"match"}),". This operator is of type:"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-coq",children:"Definition match_operator {A B : Set}\n    (scrutinee : A)\n    (arms : list (A -> M B)) :\n    M B :=\n  ...\n"})}),"\n",(0,a.jsxs)(n.p,{children:["It takes a\xa0",(0,a.jsx)(n.code,{children:"scrutinee"})," value to match as a parameter, and runs a sequence of functions\xa0",(0,a.jsx)(n.code,{children:"arms"})," on it. Each function\xa0",(0,a.jsx)(n.code,{children:"arms"})," takes the value of the\xa0",(0,a.jsx)(n.code,{children:"scrutinee"})," and returns a monadic value\xa0",(0,a.jsx)(n.code,{children:"M B"}),". This monadic value can either be a success value if the pattern matches, or a special failure value if the pattern does not match. We evaluate the branches until one succeeds."]}),"\n",(0,a.jsxs)(n.h3,{id:"none-branch",children:[(0,a.jsx)(n.code,{children:"None"})," branch"]}),"\n",(0,a.jsxs)(n.p,{children:["The\xa0",(0,a.jsx)(n.code,{children:"None"})," branch is the simplest one. We read the value at the address given by\xa0",(0,a.jsx)(n.code,{children:"lhs"})," (we represent each Rust variable by its address) and match it with the\xa0",(0,a.jsx)(n.code,{children:"None"})," constructor:"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-coq",children:"fun \u03b3 =>\n  (let* \u03b10 := M.read \u03b3 in\n  match \u03b10 with\n  | core.option.Option.None => M.alloc false\n  | _ => M.break_match\n  end) :\n  M (M.Val bool.t)\n"})}),"\n",(0,a.jsxs)(n.p,{children:["If it matches, we return\xa0",(0,a.jsx)(n.code,{children:"false"}),". If it does not, we return the special value\xa0",(0,a.jsx)(n.code,{children:"M.break_match"})," to indicate that the pattern does not match."]}),"\n",(0,a.jsxs)(n.h3,{id:"some-branch",children:[(0,a.jsx)(n.code,{children:"Some"})," branch"]}),"\n",(0,a.jsxs)(n.p,{children:["In the\xa0",(0,a.jsx)(n.code,{children:"Some"})," branch, we first also read the value at the address given by\xa0",(0,a.jsx)(n.code,{children:"lhs"})," and match it with the\xa0",(0,a.jsx)(n.code,{children:"Some"})," constructor:"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-coq",children:'fun \u03b3 =>\n  (let* \u03b10 := M.read \u03b3 in\n  match \u03b10 with\n  | core.option.Option.Some _ =>\n    let \u03b30_0 := \u03b3.["Some.0"] in\n    let* value := M.alloc (borrow \u03b30_0) in\n    let* \u03b10 : (ref A) -> (ref A) -> M bool.t := M.read is_equal in\n    let* \u03b11 : ref A := M.read value in\n    let* \u03b12 : ref A := M.read rhs in\n    let* \u03b13 : bool.t := M.call (\u03b10 \u03b11 \u03b12) in\n    M.alloc \u03b13\n  | _ => M.break_match\n  end) :\n  M (M.Val bool.t)\n'})}),"\n",(0,a.jsx)(n.p,{children:"If we are in that case, we create the value:"}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-coq",children:'let \u03b30_0 := \u03b3.["Some.0"] in\n'})}),"\n",(0,a.jsxs)(n.p,{children:["with the address of the first field of the\xa0",(0,a.jsx)(n.code,{children:"Some"})," constructor, relative to the address of\xa0",(0,a.jsx)(n.code,{children:"lhs"})," given in\xa0",(0,a.jsx)(n.code,{children:"\u03b3"}),". We define the operator\xa0",(0,a.jsx)(n.code,{children:'.["Some.0"]'})," when we define the option type and generate such definitions for all user-defined enum types."]}),"\n",(0,a.jsxs)(n.p,{children:["We then encapsulate the address\xa0",(0,a.jsx)(n.code,{children:"\u03b30_0"})," in a proper Rust reference:"]}),"\n",(0,a.jsx)(n.pre,{children:(0,a.jsx)(n.code,{className:"language-coq",children:"let* value := M.alloc (borrow \u03b30_0) in\n"})}),"\n",(0,a.jsxs)(n.p,{children:["of type\xa0",(0,a.jsx)(n.code,{children:"ref A"})," in the original Rust code. Finally, we call the function\xa0",(0,a.jsx)(n.code,{children:"is_equal"})," on the two references\xa0",(0,a.jsx)(n.code,{children:"value"})," and\xa0",(0,a.jsx)(n.code,{children:"rhs"}),", with some boilerplate code to read and allocate the variables."]}),"\n",(0,a.jsx)(n.h2,{id:"general-translation",children:"General translation"}),"\n",(0,a.jsx)(n.p,{children:"We generalize this translation to all patterns by:"}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:["flattening all the or patterns ",(0,a.jsx)(n.code,{children:"|"})," so that only patterns with a single choice remain,"]}),"\n",(0,a.jsxs)(n.li,{children:["evaluating each match branch in order with the\xa0",(0,a.jsx)(n.code,{children:"match_operator"})," operator,"]}),"\n",(0,a.jsxs)(n.li,{children:["in each branch, evaluating the inner patterns in order. This evaluation might fail at any point if the pattern does not match. In this case, we return the special value\xa0",(0,a.jsx)(n.code,{children:"M.break_match"})," and continue with the next branch."]}),"\n"]}),"\n",(0,a.jsxs)(n.p,{children:["At least one branch should succeed as the Rust compiler checks that all cases are covered. We still have a special value\xa0",(0,a.jsx)(n.code,{children:"M.impossible"})," in Coq for the case where no patterns match and satisfy the type checker."]}),"\n",(0,a.jsx)(n.p,{children:"We distinguish and handle the following kind of patterns (and all their combinations):"}),"\n",(0,a.jsxs)(n.ul,{children:["\n",(0,a.jsxs)(n.li,{children:["wild patterns\xa0",(0,a.jsx)(n.code,{children:"_"}),","]}),"\n",(0,a.jsxs)(n.li,{children:["binding patterns\xa0",(0,a.jsx)(n.code,{children:"(ref) name"})," or\xa0",(0,a.jsx)(n.code,{children:"(ref) name as pattern"})," (the\xa0",(0,a.jsx)(n.code,{children:"ref"})," keyword is optional),"]}),"\n",(0,a.jsxs)(n.li,{children:["struct patterns\xa0",(0,a.jsx)(n.code,{children:"Name { field1: pattern1, ... }"})," or\xa0",(0,a.jsx)(n.code,{children:"Name(pattern1, ...)"})]}),"\n",(0,a.jsxs)(n.li,{children:["tuple patterns\xa0",(0,a.jsx)(n.code,{children:"(pattern1, ...)"}),","]}),"\n",(0,a.jsxs)(n.li,{children:["literal patterns\xa0",(0,a.jsx)(n.code,{children:"12"}),", ",(0,a.jsx)(n.code,{children:"true"}),", ...,"]}),"\n",(0,a.jsxs)(n.li,{children:["slice patterns\xa0",(0,a.jsx)(n.code,{children:"[first, second, tail @ ..]"}),","]}),"\n",(0,a.jsxs)(n.li,{children:["dereference patterns\xa0",(0,a.jsx)(n.code,{children:"&pattern"}),"."]}),"\n"]}),"\n",(0,a.jsxs)(n.p,{children:["This was enough to cover all of our examples. The Rust compiler can also automatically add some\xa0",(0,a.jsx)(n.code,{children:"ref"})," patterns when matching on references. We do not need to handle this case as this is automatically done by the Rust compiler during its compilation to the intermediate\xa0",(0,a.jsx)(n.a,{href:"https://rustc-dev-guide.rust-lang.org/thir.html",children:"THIR"})," representation, and e directly read the THIR code."]}),"\n",(0,a.jsx)(n.h2,{id:"conclusion",children:"Conclusion"}),"\n",(0,a.jsxs)(n.p,{children:["In this blog post, we have presented how we translate Rust patterns to the proof system Coq. The difficult part is handling the\xa0",(0,a.jsx)(n.code,{children:"ref"})," patterns, which we do by matching in two steps: matching on the values and then computing the addresses of the sub-fields."]}),"\n",(0,a.jsxs)(n.p,{children:["If you have Rust smart contracts or programs to verify, feel free to email us at\xa0",(0,a.jsx)(n.a,{href:"mailto:contact@formal.land",children:"contact@formal.land"}),". We will be happy to help!"]})]})}function d(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(h,{...e})}):h(e)}},8566:(e,n,t)=>{t.d(n,{A:()=>a});const a=t.p+"assets/images/rust-rooster-46899f1cbd5eacd04a10ed1fbe28d497.png"},8453:(e,n,t)=>{t.d(n,{R:()=>o,x:()=>l});var a=t(6540);const r={},s=a.createContext(r);function o(e){const n=a.useContext(s);return a.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function l(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:o(e.components),a.createElement(s.Provider,{value:n},e.children)}}}]);