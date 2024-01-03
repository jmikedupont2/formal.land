"use strict";(self.webpackChunkformal_land=self.webpackChunkformal_land||[]).push([[2301],{3905:function(t,e,r){r.d(e,{Zo:function(){return p},kt:function(){return f}});var a=r(7294);function n(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function o(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,a)}return r}function i(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?o(Object(r),!0).forEach((function(e){n(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):o(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function s(t,e){if(null==t)return{};var r,a,n=function(t,e){if(null==t)return{};var r,a,n={},o=Object.keys(t);for(a=0;a<o.length;a++)r=o[a],e.indexOf(r)>=0||(n[r]=t[r]);return n}(t,e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);for(a=0;a<o.length;a++)r=o[a],e.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(t,r)&&(n[r]=t[r])}return n}var l=a.createContext({}),c=function(t){var e=a.useContext(l),r=e;return t&&(r="function"==typeof t?t(e):i(i({},e),t)),r},p=function(t){var e=c(t.components);return a.createElement(l.Provider,{value:e},t.children)},u={inlineCode:"code",wrapper:function(t){var e=t.children;return a.createElement(a.Fragment,{},e)}},m=a.forwardRef((function(t,e){var r=t.components,n=t.mdxType,o=t.originalType,l=t.parentName,p=s(t,["components","mdxType","originalType","parentName"]),m=c(r),f=n,h=m["".concat(l,".").concat(f)]||m[f]||u[f]||o;return r?a.createElement(h,i(i({ref:e},p),{},{components:r})):a.createElement(h,i({ref:e},p))}));function f(t,e){var r=arguments,n=e&&e.mdxType;if("string"==typeof t||n){var o=r.length,i=new Array(o);i[0]=m;var s={};for(var l in e)hasOwnProperty.call(e,l)&&(s[l]=e[l]);s.originalType=t,s.mdxType="string"==typeof t?t:n,i[1]=s;for(var c=2;c<o;c++)i[c]=r[c];return a.createElement.apply(null,i)}return a.createElement.apply(null,r)}m.displayName="MDXCreateElement"},3673:function(t,e,r){r.r(e),r.d(e,{frontMatter:function(){return s},contentTitle:function(){return l},metadata:function(){return c},assets:function(){return p},toc:function(){return u},default:function(){return f}});var a=r(3117),n=r(102),o=(r(7294),r(3905)),i=["components"],s={title:"Translating Rust match patterns to Coq with coq-of-rust",tags:["coq-of-rust","Rust","Coq","Aleph-Zero"],authors:[]},l=void 0,c={permalink:"/blog/2024/01/04/rust-translating-match",source:"@site/blog/2024-01-04-rust-translating-match.md",title:"Translating Rust match patterns to Coq with coq-of-rust",description:"Our tool coq-of-rust enables formal verification of \ud83e\udd80&nbsp;Rust code to make sure that a program has no bugs. This technique checks all possible execution paths using mathematical techniques. This is important for example to ensure the security of smart contracts written in Rust language.",date:"2024-01-04T00:00:00.000Z",formattedDate:"January 4, 2024",tags:[{label:"coq-of-rust",permalink:"/blog/tags/coq-of-rust"},{label:"Rust",permalink:"/blog/tags/rust"},{label:"Coq",permalink:"/blog/tags/coq"},{label:"Aleph-Zero",permalink:"/blog/tags/aleph-zero"}],readingTime:6.005,truncated:!0,authors:[],nextItem:{title:"Verifying an ERC-20 smart contract in Rust",permalink:"/blog/2023/12/13/rust-verify-erc-20-smart-contract"}},p={authorsImageUrls:[]},u=[],m={toc:u};function f(t){var e=t.components,r=(0,n.Z)(t,i);return(0,o.kt)("wrapper",(0,a.Z)({},m,r,{components:e,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"Our tool ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/formal-land/coq-of-rust"},"coq-of-rust")," enables ",(0,o.kt)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/Formal_verification"},"formal verification")," of ",(0,o.kt)("a",{parentName:"p",href:"https://www.rust-lang.org/"},"\ud83e\udd80","\xa0","Rust")," code to make sure that a program has no bugs. This technique checks all possible execution paths using mathematical techniques. This is important for example to ensure the security of smart contracts written in Rust language."),(0,o.kt)("p",null,"Our tool ",(0,o.kt)("inlineCode",{parentName:"p"},"coq-of-rust")," works by translating Rust programs to the general proof system ",(0,o.kt)("a",{parentName:"p",href:"https://coq.inria.fr/"},"\ud83d\udc13","\xa0","Coq"),". Here we explain how we translate",(0,o.kt)("a",{parentName:"p",href:"https://doc.rust-lang.org/book/ch06-02-match.html"},"\xa0",(0,o.kt)("inlineCode",{parentName:"a"},"match")," patterns")," from Rust to Coq. The specificity of Rust patterns is to be able to match values either by value or reference."),(0,o.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"Purchase")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"To formally verify your Rust codebase and improve the security of your application, email us at","\xa0",(0,o.kt)("a",{parentName:"p",href:"mailto:contact@formal.land"},"c","o","n","t","a","c","t","@","formal",".","l","a","n","d"),"! Formal verification is the only way to prevent all bugs by exploring all possible executions of your program."))),(0,o.kt)("div",{className:"admonition admonition-info alert alert--info"},(0,o.kt)("div",{parentName:"div",className:"admonition-heading"},(0,o.kt)("h5",{parentName:"div"},(0,o.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,o.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},(0,o.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"Thanks")),(0,o.kt)("div",{parentName:"div",className:"admonition-content"},(0,o.kt)("p",{parentName:"div"},"This work and the development of ",(0,o.kt)("a",{parentName:"p",href:"https://github.com/formal-land/coq-of-rust"},"coq-of-rust")," is made possible thanks to the ",(0,o.kt)("a",{parentName:"p",href:"https://alephzero.org/"},"Aleph Zero"),"'s Foundation, to develop an extra safe platform to build decentralized applications with formally verified smart contracts."))))}f.isMDXComponent=!0}}]);