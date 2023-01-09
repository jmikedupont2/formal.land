"use strict";(self.webpackChunkformal_land=self.webpackChunkformal_land||[]).push([[3478],{3905:function(e,t,r){r.d(t,{Zo:function(){return p},kt:function(){return f}});var o=r(7294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function n(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?n(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):n(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,o,a=function(e,t){if(null==e)return{};var r,o,a={},n=Object.keys(e);for(o=0;o<n.length;o++)r=n[o],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);for(o=0;o<n.length;o++)r=n[o],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var s=o.createContext({}),c=function(e){var t=o.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},p=function(e){var t=c(e.components);return o.createElement(s.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},d=o.forwardRef((function(e,t){var r=e.components,a=e.mdxType,n=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),d=c(r),f=a,u=d["".concat(s,".").concat(f)]||d[f]||m[f]||n;return r?o.createElement(u,i(i({ref:t},p),{},{components:r})):o.createElement(u,i({ref:t},p))}));function f(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var n=r.length,i=new Array(n);i[0]=d;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:a,i[1]=l;for(var c=2;c<n;c++)i[c]=r[c];return o.createElement.apply(null,i)}return o.createElement.apply(null,r)}d.displayName="MDXCreateElement"},1028:function(e,t,r){r.r(t),r.d(t,{frontMatter:function(){return l},contentTitle:function(){return s},metadata:function(){return c},toc:function(){return p},default:function(){return d}});var o=r(3117),a=r(102),n=(r(7294),r(3905)),i=["components"],l={},s="\ud83c\uddf8 Solidity verification",c={unversionedId:"verification/solidity",id:"verification/solidity",title:"\ud83c\uddf8 Solidity verification",description:"Presentation",source:"@site/docs/verification/solidity.md",sourceDirName:"verification",slug:"/verification/solidity",permalink:"/docs/verification/solidity",tags:[],version:"current",frontMatter:{},sidebar:"sidebar",previous:{title:"\ud83e\udd80 Rust verification",permalink:"/docs/verification/rust"},next:{title:"\ud83d\udc2b OCaml development",permalink:"/docs/services/ocaml-development"}},p=[],m={toc:p};function d(e){var t=e.components,r=(0,a.Z)(e,i);return(0,n.kt)("wrapper",(0,o.Z)({},m,r,{components:t,mdxType:"MDXLayout"}),(0,n.kt)("h1",{id:"-solidity-verification"},"\ud83c\uddf8 Solidity verification"),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://formal.land/presentation-verification-solidity/"},"Presentation ",(0,n.kt)("svg",{width:"13.5",height:"13.5","aria-hidden":"true",viewBox:"0 0 24 24"},(0,n.kt)("path",{fill:"currentColor",d:"M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"})))),(0,n.kt)("p",null,(0,n.kt)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/Formal_verification"},"Formal verification")," is the ",(0,n.kt)("strong",{parentName:"p"},"strongest method")," to ensure the safety of smart contracts, as it employs ",(0,n.kt)("strong",{parentName:"p"},"mathematical methods")," to explore all possible inputs and usage scenarios and make sure that the code is ",(0,n.kt)("strong",{parentName:"p"},"100% correct"),'. Think "the safety offered by Rust in comparison to C, by for arbitrarily complex properties". This is particularly relevant for smart contracts as a single mistake can cost millions of dollars, for code that is open-source and hard to upgrade. We propose formal verification using ',(0,n.kt)("strong",{parentName:"p"},"interactive theorem provers"),", that guarantees ",(0,n.kt)("strong",{parentName:"p"},"stronger properties")," than existing solutions such as ",(0,n.kt)("a",{parentName:"p",href:"https://www.certora.com/"},"Certora"),". Indeed there are ",(0,n.kt)("strong",{parentName:"p"},"no undecidable properties")," with interactive theorem provers (in theory ",(0,n.kt)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/G%C3%B6del%27s_incompleteness_theorems"},"yes")," but unreachable in practice). This is especially important to verify complex behaviors such as backward compatibility on upgrades, unbounded loops or inter-contracts calls."),(0,n.kt)("p",null,"To ",(0,n.kt)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/Formal_verification"},"formally verify")," Solidity programs, we develop tools to translate Ethereum programs to the interactive proof assistant ",(0,n.kt)("a",{parentName:"p",href:"https://coq.inria.fr/"},"Coq"),". The goal is to have a translation as idiomatic as possible for Coq. Then we express and verify arbitrary properties on the translated code in Coq with our existing expertise in Coq \ud83d\udc13."),(0,n.kt)("p",null,"We have two ongoing projects:"),(0,n.kt)("ol",null,(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("a",{parentName:"li",href:"https://gitlab.com/formal-land/coq-of-solidity"},"coq-of-solidity")," to directly translate Solidity code into idiomatic Coq code (with a shallow embedding). The resulting traduction is high-level, but it can be hard to make sure that the semantics is preserved."),(0,n.kt)("li",{parentName:"ol"},(0,n.kt)("a",{parentName:"li",href:"https://gitlab.com/formal-land/ethereum-vm-to-coq"},"ethereum-vm-to-coq")," to translate EVM code (the assembly code of Ethereum) to Coq (with a deep embedding). The translation mechanism is much simpler compared to Solidity, but the generated Coq is also more low-level and harder to follow for formal verification.")),(0,n.kt)("p",null,"In addition, we are thinking about relating the two translations (of Solidity and EVM) with an intermediate translation step, to get the best of both worlds (a reliable and high-level translation of Solidity code to Coq)."),(0,n.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,n.kt)("div",{parentName:"div",className:"admonition-heading"},(0,n.kt)("h5",{parentName:"div"},(0,n.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,n.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,n.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"Offer")),(0,n.kt)("div",{parentName:"div",className:"admonition-content"},(0,n.kt)("p",{parentName:"div"},"For more information or to formally verify your smart contracts, you can contact us by email at ",(0,n.kt)("a",{parentName:"p",href:"mailto:contact@formal.land"},"c","o","n","t","a","c","t","@","formal",".","l","a","n","d")," \u2709\ufe0f or schedule a call on ",(0,n.kt)("a",{parentName:"p",href:"https://koalendar.com/e/meet-with-formal-land"},"koalendar.com/e/meet-with-formal-land")," \u260e\ufe0f. Our target is to be as cheap as $50,000 to fully verify an existing dApp. By full verification we mean formalizing and verifying the specification given by a typical set of unit/integration tests on a project."))),(0,n.kt)("blockquote",null,(0,n.kt)("p",{parentName:"blockquote"},"The more you are demanding, the more you need us \ud83c\udfc7.")))}d.isMDXComponent=!0}}]);