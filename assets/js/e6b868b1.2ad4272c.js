"use strict";(self.webpackChunkformal_land=self.webpackChunkformal_land||[]).push([[1709],{3905:function(t,e,n){n.d(e,{Zo:function(){return p},kt:function(){return f}});var r=n(7294);function a(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function o(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function i(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?o(Object(n),!0).forEach((function(e){a(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function s(t,e){if(null==t)return{};var n,r,a=function(t,e){if(null==t)return{};var n,r,a={},o=Object.keys(t);for(r=0;r<o.length;r++)n=o[r],e.indexOf(n)>=0||(a[n]=t[n]);return a}(t,e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);for(r=0;r<o.length;r++)n=o[r],e.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(t,n)&&(a[n]=t[n])}return a}var c=r.createContext({}),l=function(t){var e=r.useContext(c),n=e;return t&&(n="function"==typeof t?t(e):i(i({},e),t)),n},p=function(t){var e=l(t.components);return r.createElement(c.Provider,{value:e},t.children)},u={inlineCode:"code",wrapper:function(t){var e=t.children;return r.createElement(r.Fragment,{},e)}},m=r.forwardRef((function(t,e){var n=t.components,a=t.mdxType,o=t.originalType,c=t.parentName,p=s(t,["components","mdxType","originalType","parentName"]),m=l(n),f=a,h=m["".concat(c,".").concat(f)]||m[f]||u[f]||o;return n?r.createElement(h,i(i({ref:e},p),{},{components:n})):r.createElement(h,i({ref:e},p))}));function f(t,e){var n=arguments,a=e&&e.mdxType;if("string"==typeof t||a){var o=n.length,i=new Array(o);i[0]=m;var s={};for(var c in e)hasOwnProperty.call(e,c)&&(s[c]=e[c]);s.originalType=t,s.mdxType="string"==typeof t?t:a,i[1]=s;for(var l=2;l<o;l++)i[l]=n[l];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},1566:function(t,e,n){n.r(e),n.d(e,{frontMatter:function(){return s},contentTitle:function(){return c},metadata:function(){return l},toc:function(){return p},default:function(){return m}});var r=n(3117),a=n(102),o=(n(7294),n(3905)),i=["components"],s={},c="\ud83e\udd80 Rust verification",l={unversionedId:"verification/rust",id:"verification/rust",title:"\ud83e\udd80 Rust verification",description:"We are working on bringing more formal verification to the Rust community. You can also look at this page that is intending to group all the formal verification efforts on Rust, or at the company Cryspen doing formal verification on Rust.",source:"@site/docs/verification/rust.md",sourceDirName:"verification",slug:"/verification/rust",permalink:"/docs/verification/rust",tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"\ud83d\udc2b OCaml verification",permalink:"/docs/verification/ocaml"},next:{title:"\ud83c\udf10 TypeScript verification",permalink:"/docs/verification/typescript"}},p=[],u={toc:p};function m(t){var e=t.components,n=(0,a.Z)(t,i);return(0,o.kt)("wrapper",(0,r.Z)({},u,n,{components:e,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"-rust-verification"},"\ud83e\udd80 Rust verification"),(0,o.kt)("p",null,"We are working on bringing more ",(0,o.kt)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/Formal_verification"},(0,o.kt)("em",{parentName:"a"},"formal verification"))," to the ",(0,o.kt)("a",{parentName:"p",href:"https://www.rust-lang.org/"},"Rust \ud83e\udd80")," community. You can also look at ",(0,o.kt)("a",{parentName:"p",href:"https://rust-formal-methods.github.io/"},"this page")," that is intending to group all the formal verification efforts on Rust, or at the company ",(0,o.kt)("a",{parentName:"p",href:"https://www.cryspen.com/"},"Cryspen")," doing formal verification on Rust."),(0,o.kt)("p",null,"Our goal is achieve the verification of this ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/metaplex-foundation/metaplex-program-library/tree/master/candy-machine-core/program"},"NFT smart contract \ud83c\udf6c")," written in Rust for the ",(0,o.kt)("a",{parentName:"p",href:"https://solana.com/"},"Solana")," blockchain. An extract of the code is the following:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-rust"},"let name = if name_length > 0 {\n    let name_slice: &mut [u8] = &mut account_data[position..position + name_length];\n    let name = String::from_utf8(name_slice.to_vec())\n        .map_err(|_| CandyError::CouldNotRetrieveConfigLineData)?;\n    name.trim_end_matches(NULL_STRING).to_string()\n} else {\n    EMPTY_STR.to_string()\n};\n")),(0,o.kt)("p",null,"Our strategy is to work with the ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/AeneasVerif"},"AeneasVerif project")," to translate Rust code into idiomatic code in the interactive proof assistant ",(0,o.kt)("a",{parentName:"p",href:"https://coq.inria.fr/"},"Coq"),". This project works in two steps:"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("a",{parentName:"li",href:"https://github.com/AeneasVerif/charon"},"Charon")," translates Rust code to the intermediate language LLBC. This language is close to ",(0,o.kt)("a",{parentName:"li",href:"https://rustc-dev-guide.rust-lang.org/mir/index.html"},"MIR")," but with structured loops instead of ",(0,o.kt)("inlineCode",{parentName:"li"},"goto"),"."),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("a",{parentName:"li",href:"https://github.com/AeneasVerif/aeneas"},"Aeneas")," does the heavy work of translating code with mutations to a purely functional form, and then pretty-prints the result in Coq (or ",(0,o.kt)("a",{parentName:"li",href:"https://www.fstar-lang.org/"},"F","*"),").")),(0,o.kt)("p",null,"This project is already quite complete, but some features such as traits are still in ongoing development. Our strategy to make it work as fast as possible on our smart contract example is the following:"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},"Extend Charon to support more of the Rust syntax, and have an output directly from LLBC to Coq. This will require to rewrite our smart contract to avoid using mutations (hopefully in a few weeks)."),(0,o.kt)("li",{parentName:"ol"},"Be able to use the full pipeline with Aeneas (maybe in a few months).")),(0,o.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"Contact")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"For more information, you can contact us by email at ",(0,o.kt)("a",{parentName:"p",href:"mailto:contact@formal.land"},"c","o","n","t","a","c","t","@","formal",".","l","a","n","d")," \u2709\ufe0f or schedule a call on ",(0,o.kt)("a",{parentName:"p",href:"https://koalendar.com/e/meet-with-formal-land"},"koalendar.com/e/meet-with-formal-land")," \u260e\ufe0f. Our main expertise is in the Coq system. We translate code to Coq to after write specifications and proofs on the generated code."))),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"Helping you build \ud83d\ude80")))}m.isMDXComponent=!0}}]);