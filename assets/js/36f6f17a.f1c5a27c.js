"use strict";(self.webpackChunkformal_land=self.webpackChunkformal_land||[]).push([[3051],{3905:function(t,e,r){r.d(e,{Zo:function(){return p},kt:function(){return m}});var n=r(7294);function o(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function a(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function i(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?a(Object(r),!0).forEach((function(e){o(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function l(t,e){if(null==t)return{};var r,n,o=function(t,e){if(null==t)return{};var r,n,o={},a=Object.keys(t);for(n=0;n<a.length;n++)r=a[n],e.indexOf(r)>=0||(o[r]=t[r]);return o}(t,e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);for(n=0;n<a.length;n++)r=a[n],e.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(t,r)&&(o[r]=t[r])}return o}var u=n.createContext({}),s=function(t){var e=n.useContext(u),r=e;return t&&(r="function"==typeof t?t(e):i(i({},e),t)),r},p=function(t){var e=s(t.components);return n.createElement(u.Provider,{value:e},t.children)},c={inlineCode:"code",wrapper:function(t){var e=t.children;return n.createElement(n.Fragment,{},e)}},f=n.forwardRef((function(t,e){var r=t.components,o=t.mdxType,a=t.originalType,u=t.parentName,p=l(t,["components","mdxType","originalType","parentName"]),f=s(r),m=o,g=f["".concat(u,".").concat(m)]||f[m]||c[m]||a;return r?n.createElement(g,i(i({ref:e},p),{},{components:r})):n.createElement(g,i({ref:e},p))}));function m(t,e){var r=arguments,o=e&&e.mdxType;if("string"==typeof t||o){var a=r.length,i=new Array(a);i[0]=f;var l={};for(var u in e)hasOwnProperty.call(e,u)&&(l[u]=e[u]);l.originalType=t,l.mdxType="string"==typeof t?t:o,i[1]=l;for(var s=2;s<a;s++)i[s]=r[s];return n.createElement.apply(null,i)}return n.createElement.apply(null,r)}f.displayName="MDXCreateElement"},9888:function(t,e,r){r.r(e),r.d(e,{frontMatter:function(){return l},contentTitle:function(){return u},metadata:function(){return s},assets:function(){return p},toc:function(){return c},default:function(){return m}});var n=r(3117),o=r(102),a=(r(7294),r(3905)),i=["components"],l={title:"Optimizing Rust translation to Coq with THIR and bundled traits",tags:["coq-of-rust","Rust","Coq","trait","THIR","HIR"],author:"Guillaume Claret"},u=void 0,s={permalink:"/blog/2023/11/08/rust-thir-and-bundled-traits",source:"@site/blog/2023-11-08-rust-thir-and-bundled-traits.md",title:"Optimizing Rust translation to Coq with THIR and bundled traits",description:"We continued our work on coq-of-rust, a tool to formally verify Rust programs using the proof system Coq&nbsp;\ud83d\udc13. This tool translates Rust programs to an equivalent Coq program, which can then be verified using Coq's proof assistant. It opens the door to building mathematically proven bug-free Rust programs.",date:"2023-11-08T00:00:00.000Z",formattedDate:"November 8, 2023",tags:[{label:"coq-of-rust",permalink:"/blog/tags/coq-of-rust"},{label:"Rust",permalink:"/blog/tags/rust"},{label:"Coq",permalink:"/blog/tags/coq"},{label:"trait",permalink:"/blog/tags/trait"},{label:"THIR",permalink:"/blog/tags/thir"},{label:"HIR",permalink:"/blog/tags/hir"}],readingTime:5.205,truncated:!0,authors:[{name:"Guillaume Claret"}],nextItem:{title:"Trait representation in Coq",permalink:"/blog/2023/08/25/trait-representation-in-coq"}},p={authorsImageUrls:[void 0]},c=[],f={toc:c};function m(t){var e=t.components,r=(0,o.Z)(t,i);return(0,a.kt)("wrapper",(0,n.Z)({},f,r,{components:e,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"We continued our work on ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/formal-land/coq-of-rust"},"coq-of-rust"),", a tool to formally verify ",(0,a.kt)("a",{parentName:"p",href:"https://www.rust-lang.org/"},"Rust")," programs using the proof system ",(0,a.kt)("a",{parentName:"p",href:"https://coq.inria.fr/"},"Coq","\xa0","\ud83d\udc13"),". This tool translates Rust programs to an equivalent Coq program, which can then be verified using Coq's proof assistant. It opens the door to building mathematically proven bug-free Rust programs."),(0,a.kt)("p",null,"We present two main improvements we made to ",(0,a.kt)("inlineCode",{parentName:"p"},"coq-of-rust"),":"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},"Using the THIR intermediate language of Rust to have more information during the translation to Coq."),(0,a.kt)("li",{parentName:"ul"},"Bundling the type-classes representing the traits of Rust to have faster type-checking in Coq.")))}m.isMDXComponent=!0}}]);