"use strict";(self.webpackChunkformal_land=self.webpackChunkformal_land||[]).push([[847],{3905:function(e,t,a){a.d(t,{Zo:function(){return u},kt:function(){return m}});var o=a(7294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function n(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,o)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?n(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):n(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,o,r=function(e,t){if(null==e)return{};var a,o,r={},n=Object.keys(e);for(o=0;o<n.length;o++)a=n[o],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(o=0;o<n.length;o++)a=n[o],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var l=o.createContext({}),p=function(e){var t=o.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},u=function(e){var t=p(e.components);return o.createElement(l.Provider,{value:t},e.children)},c={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},f=o.forwardRef((function(e,t){var a=e.components,r=e.mdxType,n=e.originalType,l=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),f=p(a),m=r,h=f["".concat(l,".").concat(m)]||f[m]||c[m]||n;return a?o.createElement(h,i(i({ref:t},u),{},{components:a})):o.createElement(h,i({ref:t},u))}));function m(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var n=a.length,i=new Array(n);i[0]=f;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:r,i[1]=s;for(var p=2;p<n;p++)i[p]=a[p];return o.createElement.apply(null,i)}return o.createElement.apply(null,a)}f.displayName="MDXCreateElement"},6589:function(e,t,a){a.r(t),a.d(t,{frontMatter:function(){return s},contentTitle:function(){return l},metadata:function(){return p},assets:function(){return u},toc:function(){return c},default:function(){return m}});var o=a(3117),r=a(102),n=(a(7294),a(3905)),i=["components"],s={title:"Upgrade the Rust version of coq-of-rust",tags:["coq-of-rust","Rust","Coq","Aleph-Zero"],authors:[]},l=void 0,p={permalink:"/blog/2024/01/18/update-coq-of-rust",source:"@site/blog/2024-01-18-update-coq-of-rust.md",title:"Upgrade the Rust version of coq-of-rust",description:"We continue our work on the coq-of-rust tool to formally verify Rust programs with the Coq proof assistant. We have upgraded the Rust version that we support, simplified the translation of the traits, and are adding better support for the standard library of Rust.",date:"2024-01-18T00:00:00.000Z",formattedDate:"January 18, 2024",tags:[{label:"coq-of-rust",permalink:"/blog/tags/coq-of-rust"},{label:"Rust",permalink:"/blog/tags/rust"},{label:"Coq",permalink:"/blog/tags/coq"},{label:"Aleph-Zero",permalink:"/blog/tags/aleph-zero"}],readingTime:3.5,truncated:!0,authors:[],prevItem:{title:"The importance of formal verification",permalink:"/blog/2024/02/02/formal-verification-for-aleph-zero"},nextItem:{title:"Translating Rust match patterns to Coq with coq-of-rust",permalink:"/blog/2024/01/04/rust-translating-match"}},u={authorsImageUrls:[]},c=[{value:"Upgrade of the Rust version",id:"upgrade-of-the-rust-version",children:[],level:2},{value:"Simplify the translation of traits",id:"simplify-the-translation-of-traits",children:[],level:2},{value:"Handling more of the standard library",id:"handling-more-of-the-standard-library",children:[],level:2},{value:"Conclusion",id:"conclusion",children:[],level:2}],f={toc:c};function m(e){var t=e.components,s=(0,r.Z)(e,i);return(0,n.kt)("wrapper",(0,o.Z)({},f,s,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("p",null,"We continue our work on the ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/formal-land/coq-of-rust"},"coq-of-rust")," tool to formally verify Rust programs with the ",(0,n.kt)("a",{parentName:"p",href:"https://coq.inria.fr/"},"Coq proof assistant"),". We have upgraded the Rust version that we support, simplified the translation of the traits, and are adding better support for the standard library of Rust."),(0,n.kt)("p",null,"Overall, we are now able to translate ",(0,n.kt)("strong",{parentName:"p"},"about 80%")," of the Rust examples from the ",(0,n.kt)("a",{parentName:"p",href:"https://doc.rust-lang.org/stable/rust-by-example/"},"Rust by Example")," book into valid Coq files. This means we support a large subset of the Rust language."),(0,n.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,n.kt)("div",{parentName:"div",className:"admonition-heading"},(0,n.kt)("h5",{parentName:"div"},(0,n.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,n.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,n.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"Purchase")),(0,n.kt)("div",{parentName:"div",className:"admonition-content"},(0,n.kt)("p",{parentName:"div"},"To formally verify your Rust codebase and improve the security of your application, email us at","\xa0",(0,n.kt)("a",{parentName:"p",href:"mailto:contact@formal.land"},"c","o","n","t","a","c","t","@","formal",".","l","a","n","d"),"! Formal verification is the only way to prevent all bugs by exploring all possible executions of your programs","\xa0","\ud83c\udfaf."))),(0,n.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,n.kt)("div",{parentName:"div",className:"admonition-heading"},(0,n.kt)("h5",{parentName:"div"},(0,n.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,n.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,n.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"Thanks")),(0,n.kt)("div",{parentName:"div",className:"admonition-content"},(0,n.kt)("p",{parentName:"div"},"This work and the development of ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/formal-land/coq-of-rust"},"coq-of-rust")," is made possible thanks to the ",(0,n.kt)("a",{parentName:"p",href:"https://alephzero.org/"},"Aleph Zero"),"'s Foundation, to develop an extra safe platform to build decentralized applications with formally verified smart contracts."))),(0,n.kt)("p",null,(0,n.kt)("img",{alt:"Rust rooster",src:a(5374).Z})),(0,n.kt)("h2",{id:"upgrade-of-the-rust-version"},"Upgrade of the Rust version"),(0,n.kt)("p",null,"The tool","\xa0",(0,n.kt)("inlineCode",{parentName:"p"},"coq-of-rust")," is tied to a particular version of the Rust compiler that we use to parse and type-check a ",(0,n.kt)("inlineCode",{parentName:"p"},"cargo")," project. We now support the","\xa0",(0,n.kt)("inlineCode",{parentName:"p"},"nightly-2023-12-15")," version of Rust, up from","\xa0",(0,n.kt)("inlineCode",{parentName:"p"},"nightly-2023-04-30"),". Most of the changes were minor, but it is good to handle these regularly to have smooth upgrades. The corresponding pull request is ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/formal-land/coq-of-rust/pull/445"},"coq-of-rust/pull/445"),". We also got more ",(0,n.kt)("a",{parentName:"p",href:"https://github.com/rust-lang/rust-clippy"},"Clippy")," warnings thanks to the new version of Rust."),(0,n.kt)("h2",{id:"simplify-the-translation-of-traits"},"Simplify the translation of traits"),(0,n.kt)("p",null,"The traits of Rust are similar to the ",(0,n.kt)("a",{parentName:"p",href:"https://coq.inria.fr/refman/addendum/type-classes.html"},"type-classes of Coq"),". This is how we translate traits to Coq."),(0,n.kt)("p",null,"But there are a lot of subtle differences between the two languages. The type-class inference mechanism of Coq does not work all the time on generated Rust code, even when adding a lot of code annotations. We think that the only reliable way to translate Rust traits would be to explicit the implementations inferred by the Rust compiler, but the Rust compiler currently throws away this information."),(0,n.kt)("p",null,"Instead, our new solution is to use a Coq tactic:"),(0,n.kt)("pre",null,(0,n.kt)("code",{parentName:"pre",className:"language-coq"},"(** Try first to infer the trait instance, and if unsuccessful, delegate it at\n    proof time. *)\nLtac get_method method :=\n  exact (M.pure (method _)) ||\n  exact (M.get_method method).\n")),(0,n.kt)("p",null,"that first tries to infer the trait instance for a particular method, and if it fails, delegates its definition to the user at proof time. This is a bit unsafe, as a user could provide invalid instances at proof time, by giving some custom instance definitions instead of the ones generated by","\xa0",(0,n.kt)("inlineCode",{parentName:"p"},"coq-of-rust"),". So, one should be careful to only apply generated instances to fill the hole made by this tactic in case of failure. We believe this to be a reasonable assumption that we could enforce someday if needed."),(0,n.kt)("p",null,"We are also starting to remove the trait constraints on polymorphic functions (the","\xa0",(0,n.kt)("inlineCode",{parentName:"p"},"where")," clauses). We start by doing it in our manual definition of the standard library of Rust. The rationale is that we can provide the actual trait instances at proof time by having the right hypothesis replicating the constraints of the","\xa0",(0,n.kt)("inlineCode",{parentName:"p"},"where")," clauses. Having fewer","\xa0",(0,n.kt)("inlineCode",{parentName:"p"},"where")," clauses reduces the complexity of the type inference of Coq on the generated code. There are still some cases that we need to clarify, for example, the handling of ",(0,n.kt)("a",{parentName:"p",href:"https://doc.rust-lang.org/rust-by-example/generics/assoc_items/types.html"},"associated types")," in the absence of traits."),(0,n.kt)("h2",{id:"handling-more-of-the-standard-library"},"Handling more of the standard library"),(0,n.kt)("p",null,"We have a definition of the standard library of Rust, mainly composed of axiomatized",(0,n.kt)("sup",{parentName:"p",id:"fnref-1"},(0,n.kt)("a",{parentName:"sup",href:"#fn-1",className:"footnote-ref"},"1"))," definitions, in these three folders:"),(0,n.kt)("ul",null,(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://github.com/formal-land/coq-of-rust/tree/main/CoqOfRust/alloc"},"CoqOfRust/alloc")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://github.com/formal-land/coq-of-rust/tree/main/CoqOfRust/core"},"CoqOfRust/core")),(0,n.kt)("li",{parentName:"ul"},(0,n.kt)("a",{parentName:"li",href:"https://github.com/formal-land/coq-of-rust/tree/main/CoqOfRust/std"},"CoqOfRust/std"))),(0,n.kt)("p",null,"By adding more of these axioms, as well as with some small changes to the","\xa0",(0,n.kt)("inlineCode",{parentName:"p"},"coq-of-rust")," tool, we are now able to successfully translate around 80% of the examples of the ",(0,n.kt)("a",{parentName:"p",href:"https://doc.rust-lang.org/stable/rust-by-example/"},"Rust by Example")," book. There can still be some challenges on larger programs, but this showcases the good support of","\xa0",(0,n.kt)("inlineCode",{parentName:"p"},"coq-of-rust")," for the Rust language."),(0,n.kt)("h2",{id:"conclusion"},"Conclusion"),(0,n.kt)("p",null,"We are continuing to improve our tool","\xa0",(0,n.kt)("inlineCode",{parentName:"p"},"coq-of-rust")," to support more of the Rust language and are making good progress. If you need to improve the security of critical applications written in Rust, contact us at","\xa0",(0,n.kt)("a",{parentName:"p",href:"mailto:contact@formal.land"},"c","o","n","t","a","c","t","@","formal",".","l","a","n","d")," to start formally verifying your code!"),(0,n.kt)("div",{className:"footnotes"},(0,n.kt)("hr",{parentName:"div"}),(0,n.kt)("ol",{parentName:"div"},(0,n.kt)("li",{parentName:"ol",id:"fn-1"},"An axiom in Coq is either a theorem whose proof is admitted, or a function/constant definition left for latter. This is the equivalent in Rust of the","\xa0",(0,n.kt)("inlineCode",{parentName:"li"},"todo!")," macro.",(0,n.kt)("a",{parentName:"li",href:"#fnref-1",className:"footnote-backref"},"\u21a9")))))}m.isMDXComponent=!0},5374:function(e,t,a){t.Z=a.p+"assets/images/rooster-2cc330eba42b601293b34c5d090b6bae.png"}}]);