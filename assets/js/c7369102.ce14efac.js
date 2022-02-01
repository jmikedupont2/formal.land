"use strict";(self.webpackChunkformal_land=self.webpackChunkformal_land||[]).push([[583],{3905:function(e,t,r){r.d(t,{Zo:function(){return p},kt:function(){return m}});var o=r(7294);function n(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,o)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){n(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,o,n=function(e,t){if(null==e)return{};var r,o,n={},a=Object.keys(e);for(o=0;o<a.length;o++)r=a[o],t.indexOf(r)>=0||(n[r]=e[r]);return n}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)r=a[o],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(n[r]=e[r])}return n}var l=o.createContext({}),s=function(e){var t=o.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},p=function(e){var t=s(e.components);return o.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},f=o.forwardRef((function(e,t){var r=e.components,n=e.mdxType,a=e.originalType,l=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),f=s(r),m=n,y=f["".concat(l,".").concat(m)]||f[m]||u[m]||a;return r?o.createElement(y,i(i({ref:t},p),{},{components:r})):o.createElement(y,i({ref:t},p))}));function m(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var a=r.length,i=new Array(a);i[0]=f;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:n,i[1]=c;for(var s=2;s<a;s++)i[s]=r[s];return o.createElement.apply(null,i)}return o.createElement.apply(null,r)}f.displayName="MDXCreateElement"},8223:function(e,t,r){r.r(t),r.d(t,{frontMatter:function(){return c},contentTitle:function(){return l},metadata:function(){return s},toc:function(){return p},default:function(){return f}});var o=r(3117),n=r(102),a=(r(7294),r(3905)),i=["components"],c={sidebar_position:1},l="Introduction",s={unversionedId:"company/intro",id:"company/intro",title:"Introduction",description:"Here we present our project.",source:"@site/docs/company/intro.md",sourceDirName:"company",slug:"/company/intro",permalink:"/docs/company/intro",tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"sidebar",next:{title:"Claims",permalink:"/docs/company/claims"}},p=[{value:"Technology",id:"technology",children:[],level:2},{value:"Our proposal",id:"our-proposal",children:[],level:2},{value:"Get started",id:"get-started",children:[],level:2}],u={toc:p};function f(e){var t=e.components,c=(0,n.Z)(e,i);return(0,a.kt)("wrapper",(0,o.Z)({},u,c,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h1",{id:"introduction"},"Introduction"),(0,a.kt)("p",null,"Here we present our project."),(0,a.kt)("h2",{id:"technology"},"Technology"),(0,a.kt)("p",null,"We formally verify programs by automatically translating the source code to the","\xa0",(0,a.kt)("a",{href:"https://coq.inria.fr/"},"Coq")," proof system. We then prove arbitrarily complex properties, either automatically or manually. We plug into continuous integration systems to make sure proofs are kept up-to-date with the code."),(0,a.kt)("p",null,"Our technology is used by the crypto-currency ",(0,a.kt)("a",{href:"https://tezos.com/"},"Tezos")," to formally verify its implementation. We believe Tezos to be the first crypto-currency with a process of formal verification of its implementation, making it one the safest decentralized platform. See the ",(0,a.kt)("a",{href:"https://nomadic-labs.gitlab.io/coq-tezos-of-ocaml/"},"Coq Tezos of OCaml")," project for the current status."),(0,a.kt)("p",null,"Besides the layers of type-checking and testing, we propose to add formal verification as a final layer of security for software development:"),(0,a.kt)("p",null,(0,a.kt)("img",{alt:"programming flow",src:r(8418).Z})),(0,a.kt)("h2",{id:"our-proposal"},"Our proposal"),(0,a.kt)("p",null,"Our proposal is to formally verify critical parts of existing projects. We support projects written in the ",(0,a.kt)("a",{href:"https://ocaml.org/"},"OCaml")," programming language. We focus on easy-to-catch bugs or safety critical properties. We configure our tools to make the translation to Coq works. We communicate with your teams to formally verify important properties. We maintain the Coq proofs to make sure there are no regressions. We can train the developers so that they can interact with the proofs."),(0,a.kt)("blockquote",null,(0,a.kt)("p",{parentName:"blockquote"},"The higher your requirements are, the more you need us.")),(0,a.kt)("h2",{id:"get-started"},"Get started"),(0,a.kt)("p",null,"Contact us at ",(0,a.kt)("code",null,(0,a.kt)("a",{href:"mailto:mailto:contact@formal.land"},"c","o","n","t","a","c","t","@","formal",".","l","a","n","d"))," for an evaluation of your code and discuss what is possible to do."))}f.isMDXComponent=!0},8418:function(e,t,r){t.Z=r.p+"assets/images/programming-flow-72ce81902ac0f71411c5ad631c522fc2.png"}}]);