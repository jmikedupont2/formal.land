"use strict";(self.webpackChunkformal_land=self.webpackChunkformal_land||[]).push([[8797],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return d}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=r.createContext({}),c=function(e){var t=r.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=c(e.components);return r.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),m=c(n),d=a,f=m["".concat(s,".").concat(d)]||m[d]||u[d]||o;return n?r.createElement(f,i(i({ref:t},p),{},{components:n})):r.createElement(f,i({ref:t},p))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=m;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:a,i[1]=l;for(var c=2;c<o;c++)i[c]=n[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},4199:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return s},metadata:function(){return c},assets:function(){return p},toc:function(){return u},default:function(){return d}});var r=n(3117),a=n(102),o=(n(7294),n(3905)),i=["components"],l={title:"Optimizing Rust translation to Coq with THIR and bundled traits",tags:["coq-of-rust","Rust","Coq","trait","THIR","HIR"],author:"Guillaume Claret"},s=void 0,c={permalink:"/blog/2023/11/08/rust-thir-and-bundled-traits",source:"@site/blog/2023-11-08-rust-thir-and-bundled-traits.md",title:"Optimizing Rust translation to Coq with THIR and bundled traits",description:"We continued our work on coq-of-rust, a tool to formally verify Rust programs using the proof system Coq&nbsp;\ud83d\udc13. This tool translates Rust programs to an equivalent Coq program, which can then be verified using Coq's proof assistant. It opens the door to building mathematically proven bug-free Rust programs.",date:"2023-11-08T00:00:00.000Z",formattedDate:"November 8, 2023",tags:[{label:"coq-of-rust",permalink:"/blog/tags/coq-of-rust"},{label:"Rust",permalink:"/blog/tags/rust"},{label:"Coq",permalink:"/blog/tags/coq"},{label:"trait",permalink:"/blog/tags/trait"},{label:"THIR",permalink:"/blog/tags/thir"},{label:"HIR",permalink:"/blog/tags/hir"}],readingTime:5.205,truncated:!0,authors:[{name:"Guillaume Claret"}],prevItem:{title:"Translation of function bodies from Rust to Coq",permalink:"/blog/2023/11/26/rust-function-body"},nextItem:{title:"Trait representation in Coq",permalink:"/blog/2023/08/25/trait-representation-in-coq"}},p={authorsImageUrls:[void 0]},u=[{value:"THIR intermediate language",id:"thir-intermediate-language",children:[],level:2},{value:"Bundled traits",id:"bundled-traits",children:[],level:2},{value:"Conclusion",id:"conclusion",children:[],level:2}],m={toc:u};function d(e){var t=e.components,n=(0,a.Z)(e,i);return(0,o.kt)("wrapper",(0,r.Z)({},m,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"We continued our work on ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/formal-land/coq-of-rust"},"coq-of-rust"),", a tool to formally verify ",(0,o.kt)("a",{parentName:"p",href:"https://www.rust-lang.org/"},"Rust")," programs using the proof system ",(0,o.kt)("a",{parentName:"p",href:"https://coq.inria.fr/"},"Coq","\xa0","\ud83d\udc13"),". This tool translates Rust programs to an equivalent Coq program, which can then be verified using Coq's proof assistant. It opens the door to building mathematically proven bug-free Rust programs."),(0,o.kt)("p",null,"We present two main improvements we made to ",(0,o.kt)("inlineCode",{parentName:"p"},"coq-of-rust"),":"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Using the THIR intermediate language of Rust to have more information during the translation to Coq."),(0,o.kt)("li",{parentName:"ul"},"Bundling the type-classes representing the traits of Rust to have faster type-checking in Coq.")),(0,o.kt)("h2",{id:"thir-intermediate-language"},"THIR intermediate language"),(0,o.kt)("p",null,"To translate Rust programs to Coq, we plug into the compiler of Rust, which operates on a series of intermediate languages:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"source code (",(0,o.kt)("inlineCode",{parentName:"li"},".rs")," files);"),(0,o.kt)("li",{parentName:"ul"},"abstract syntax tree (AST): immediately after parsing;"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://rustc-dev-guide.rust-lang.org/hir.html"},"High-Level Intermediate Representation")," (HIR): after macro expansion, with name resolution and close to the AST;"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://rustc-dev-guide.rust-lang.org/thir.html"},"Typed High-Level Intermediate Representation")," (THIR): after the type-checking;"),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://rustc-dev-guide.rust-lang.org/mir/index.html"},"Mid-level Intermediate Representation")," (MIR): low-level representation based on a ",(0,o.kt)("a",{parentName:"li",href:"https://en.wikipedia.org/wiki/Control-flow_graph"},"control-flow graph"),", inlining traits and polymorphic functions, and with ",(0,o.kt)("a",{parentName:"li",href:"https://doc.rust-lang.org/book/ch04-02-references-and-borrowing.html"},"borrow checking"),";"),(0,o.kt)("li",{parentName:"ul"},"machine code (assembly, LLVM IR, ...).")),(0,o.kt)("p",null,"We were previously using the HIR language to start our translation to Coq, because it is not too low-level and close to what the user has originally in the ",(0,o.kt)("inlineCode",{parentName:"p"},".rs")," file. This helps relate the generated Coq code to the original Rust code."),(0,o.kt)("p",null,"However, at the level of HIR, there is still a lot of implicit information. For example, Rust has ",(0,o.kt)("a",{parentName:"p",href:"https://users.rust-lang.org/t/automatic-dereferencing/53828"},"automatic dereferencing rules")," that are not yet explicit in HIR. In order not to make any mistakes during our translation to Coq, we prefer to use the next representation, THIR, that makes explicit such rules."),(0,o.kt)("p",null,"In addition, the THIR representation shows when a method call is from a trait (and which trait) or from a standalone ",(0,o.kt)("inlineCode",{parentName:"p"},"impl")," block. Given that we still have trouble translating the traits with ",(0,o.kt)("a",{parentName:"p",href:"https://coq.inria.fr/doc/V8.18.0/refman/addendum/type-classes.html"},"type-classes")," that are inferrable by Coq, this helps a lot."),(0,o.kt)("p",null,"A downside of the THIR representation is that it is much more verbose. For example, here is a formatting function generated from HIR:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-coq"},'Definition fmt\n    `{\u210b : State.Trait}\n    (self : ref Self)\n    (f : mut_ref core.fmt.Formatter)\n    : M core.fmt.Result :=\n  let* \u03b10 := format_argument::["new_display"] (addr_of self.["radius"]) in\n  let* \u03b11 :=\n    format_arguments::["new_v1"]\n      (addr_of [ "Circle of radius " ])\n      (addr_of [ \u03b10 ]) in\n  f.["write_fmt"] \u03b11.\n')),(0,o.kt)("p",null,"This is the kind of functions generated by the ",(0,o.kt)("inlineCode",{parentName:"p"},"#[derive(Debug)]")," macro of Rust, to implement a formatting function on a type. Here is the version translated from THIR, with explicit borrowing and dereferencing:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-coq"},'Definition fmt\n    `{\u210b : State.Trait}\n    (self : ref Self)\n    (f : mut_ref core.fmt.Formatter)\n    : M ltac:(core.fmt.Result) :=\n  let* \u03b10 := deref f core.fmt.Formatter in\n  let* \u03b11 := borrow_mut \u03b10 core.fmt.Formatter in\n  let* \u03b12 := borrow [ mk_str "Circle of radius " ] (list (ref str)) in\n  let* \u03b13 := deref \u03b12 (list (ref str)) in\n  let* \u03b14 := borrow \u03b13 (list (ref str)) in\n  let* \u03b15 := pointer_coercion "Unsize" \u03b14 in\n  let* \u03b16 := deref self converting_to_string.Circle in\n  let* \u03b17 := \u03b16.["radius"] in\n  let* \u03b18 := borrow \u03b17 i32 in\n  let* \u03b19 := deref \u03b18 i32 in\n  let* \u03b110 := borrow \u03b19 i32 in\n  let* \u03b111 := core.fmt.rt.Argument::["new_display"] \u03b110 in\n  let* \u03b112 := borrow [ \u03b111 ] (list core.fmt.rt.Argument) in\n  let* \u03b113 := deref \u03b112 (list core.fmt.rt.Argument) in\n  let* \u03b114 := borrow \u03b113 (list core.fmt.rt.Argument) in\n  let* \u03b115 := pointer_coercion "Unsize" \u03b114 in\n  let* \u03b116 := core.fmt.Arguments::["new_v1"] \u03b15 \u03b115 in\n  core.fmt.Formatter::["write_fmt"] \u03b11 \u03b116.\n')),(0,o.kt)("p",null,"We went from a function having two intermediate variables to seventeen intermediate variables. This code is much more verbose, but it is also more explicit. In particular, it details when the:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"borrowing (going from a value of type ",(0,o.kt)("inlineCode",{parentName:"li"},"T")," to ",(0,o.kt)("inlineCode",{parentName:"li"},"&T"),"), and the"),(0,o.kt)("li",{parentName:"ul"},"dereferencing (going from a value of type ",(0,o.kt)("inlineCode",{parentName:"li"},"&T")," to ",(0,o.kt)("inlineCode",{parentName:"li"},"T"),")")),(0,o.kt)("p",null,"occur. It also shows that the method","\xa0",(0,o.kt)("inlineCode",{parentName:"p"},"write_fmt")," is a method from the implementation of the type ",(0,o.kt)("inlineCode",{parentName:"p"},"core.fmt.Formatter"),", generating:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-coq"},'core.fmt.Formatter::["write_fmt"] \u03b11 \u03b116\n')),(0,o.kt)("p",null,"instead of:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-coq"},'f.["write_fmt"] \u03b11\n')),(0,o.kt)("h2",{id:"bundled-traits"},"Bundled traits"),(0,o.kt)("p",null,"Some Rust codebases can have a lot of traits. For example in ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/paritytech/ink/blob/ccb38d2c3ac27523fe3108f2bb7bffbbe908cdb7/crates/env/src/types.rs#L120"},"paritytech/ink/crates/env/src/types.rs")," the trait","\xa0",(0,o.kt)("inlineCode",{parentName:"p"},"Environment")," references more than forty other traits:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-rust"},"pub trait Environment: Clone {\n    const MAX_EVENT_TOPICS: usize;\n\n    type AccountId: 'static\n        + scale::Codec\n        + CodecAsType\n        + Clone\n        + PartialEq\n        + ...;\n\n    type Balance: 'static\n        + scale::Codec\n        + CodecAsType\n        + ...;\n\n    ...\n")),(0,o.kt)("p",null,"We first used an unbundled approach to represent this trait by a type-class in Coq, as it felt more natural:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-coq"},"Module Environment.\n  Class Trait (Self : Set) `{Clone.Trait Self}\n    {AccountId : Set}\n    `{scale.Codec.Trait AccountId}\n    `{CodecAsType AccountId}\n    `{Clone AccountId}\n    `{PartialEq AccountId}\n    ...\n")),(0,o.kt)("p",null,"However, the backquote operator generated too many implicit arguments, and the type-checker of Coq was very slow. We then switched to a bundled approach, as advocated in this blog post: ",(0,o.kt)("a",{parentName:"p",href:"https://www.ralfj.de/blog/2019/05/15/typeclasses-exponential-blowup.html"},"Exponential blowup when using unbundled typeclasses to model algebraic hierarchies"),". The Coq code for this trait now looks like this:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-coq"},"Module Environment.\n  Class Trait `{\u210b : State.Trait} (Self : Set) : Type := {\n    \u210b_0 :: Clone.Trait Self;\n    MAX_EVENT_TOPICS : usize;\n    AccountId : Set;\n    \u2112_0 :: parity_scale_codec.codec.Codec.Trait AccountId;\n    \u2112_1 :: ink_env.types.CodecAsType.Trait AccountId;\n    \u2112_2 :: core.clone.Clone.Trait AccountId;\n    \u2112_3 ::\n      core.cmp.PartialEq.Trait AccountId\n        (Rhs := core.cmp.PartialEq.Default.Rhs AccountId);\n    ...;\n    Balance : Set;\n    \u2112_8 :: parity_scale_codec.codec.Codec.Trait Balance;\n    \u2112_9 :: ink_env.types.CodecAsType.Trait Balance;\n    ...;\n\n    ...\n")),(0,o.kt)("p",null,"We use the notation","\xa0",(0,o.kt)("inlineCode",{parentName:"p"},"::")," for fields that are trait instances. With this approach, traits have types as parameters but no other traits."),(0,o.kt)("p",null,"The type-checking is now much faster, and in particular, we avoid some cases with exponential blowup or non-terminating type-checking. But this is not a perfect solution as we still have cases where the instance inference does not terminate or fails with hard-to-understand error messages."),(0,o.kt)("h2",{id:"conclusion"},"Conclusion"),(0,o.kt)("p",null,"We have illustrated here some improvements we recently made to our ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/formal-land/coq-of-rust"},"coq-of-rust")," translator for two key areas:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"the translation of traits;"),(0,o.kt)("li",{parentName:"ul"},"the translation of the implicit borrowing and dereferencing, that can occur every time we call a function.")),(0,o.kt)("p",null,"These improvements will allow us to formally verify some more complex Rust codebases. In particular, we are applying ",(0,o.kt)("inlineCode",{parentName:"p"},"coq-of-rust")," to verify smart contracts written for the ",(0,o.kt)("a",{parentName:"p",href:"https://use.ink/"},"ink!")," platform, that is a subset of Rust."),(0,o.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"Contact")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"If you have comments, similar experiences to share, or wish to formally verify your codebase to improve the security of your application, contact us at","\xa0",(0,o.kt)("a",{parentName:"p",href:"mailto:contact@formal.land"},"c","o","n","t","a","c","t","@","formal",".","l","a","n","d"),"!"))))}d.isMDXComponent=!0}}]);