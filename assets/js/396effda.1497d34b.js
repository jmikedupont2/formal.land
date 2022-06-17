"use strict";(self.webpackChunkformal_land=self.webpackChunkformal_land||[]).push([[9607],{3905:function(e,t,a){a.d(t,{Zo:function(){return p},kt:function(){return f}});var o=a(7294);function n(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function r(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,o)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?r(Object(a),!0).forEach((function(t){n(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):r(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function s(e,t){if(null==e)return{};var a,o,n=function(e,t){if(null==e)return{};var a,o,n={},r=Object.keys(e);for(o=0;o<r.length;o++)a=r[o],t.indexOf(a)>=0||(n[a]=e[a]);return n}(e,t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(o=0;o<r.length;o++)a=r[o],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(n[a]=e[a])}return n}var l=o.createContext({}),c=function(e){var t=o.useContext(l),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},p=function(e){var t=c(e.components);return o.createElement(l.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},h=o.forwardRef((function(e,t){var a=e.components,n=e.mdxType,r=e.originalType,l=e.parentName,p=s(e,["components","mdxType","originalType","parentName"]),h=c(a),f=n,u=h["".concat(l,".").concat(f)]||h[f]||m[f]||r;return a?o.createElement(u,i(i({ref:t},p),{},{components:a})):o.createElement(u,i({ref:t},p))}));function f(e,t){var a=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var r=a.length,i=new Array(r);i[0]=h;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s.mdxType="string"==typeof e?e:n,i[1]=s;for(var c=2;c<r;c++)i[c]=a[c];return o.createElement.apply(null,i)}return o.createElement.apply(null,a)}h.displayName="MDXCreateElement"},4053:function(e,t,a){a.r(t),a.d(t,{frontMatter:function(){return s},contentTitle:function(){return l},metadata:function(){return c},assets:function(){return p},toc:function(){return m},default:function(){return f}});var o=a(3117),n=a(102),r=(a(7294),a(3905)),i=["components"],s={title:"Make Tezos the first formally verified cryptocurrency",authors:["guillaume_claret"],tags:["tezos","coq-of-ocaml","coq"]},l=void 0,c={permalink:"/blog/2022/02/02/make-tezos-a-formally-verified-crypto",source:"@site/blog/2022-02-02-make-tezos-a-formally-verified-crypto.md",title:"Make Tezos the first formally verified cryptocurrency",description:"Elephants",date:"2022-02-02T00:00:00.000Z",formattedDate:"February 2, 2022",tags:[{label:"tezos",permalink:"/blog/tags/tezos"},{label:"coq-of-ocaml",permalink:"/blog/tags/coq-of-ocaml"},{label:"coq",permalink:"/blog/tags/coq"}],readingTime:3.675,truncated:!0,authors:[{name:"Guillaume Claret",url:"https://github.com/clarus",imageURL:"https://github.com/clarus.png",key:"guillaume_claret"}],prevItem:{title:"Status update on the verification of Tezos",permalink:"/blog/2022/06/15/status update-tezos"},nextItem:{title:"New blog posts and Meetup talk",permalink:"/blog/2021/11/12/new-blog-posts-and-meetup-talk"}},p={authorsImageUrls:[void 0]},m=[{value:"Data-encoding",id:"data-encoding",children:[],level:2},{value:"Michelson smart contracts",id:"michelson-smart-contracts",children:[],level:2},{value:"Storage system",id:"storage-system",children:[],level:2},{value:"In addition",id:"in-addition",children:[],level:2}],h={toc:m};function f(e){var t=e.components,s=(0,n.Z)(e,i);return(0,r.kt)("wrapper",(0,o.Z)({},h,s,{components:t,mdxType:"MDXLayout"}),(0,r.kt)("p",null,(0,r.kt)("img",{alt:"Elephants",src:a(1620).Z})),(0,r.kt)("p",null,"Our primary goal at ",(0,r.kt)("a",{parentName:"p",href:"https://formal.land/"},"Formal","\xa0","Land","\xa0","\ud83c\udf32")," is to make ",(0,r.kt)("a",{parentName:"p",href:"https://tezos.com/"},"Tezos")," the first crypto-currency with a formally verified implementation. With ",(0,r.kt)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/Formal_verification"},"formal verification"),", thanks to mathematical methods, we can check that a program behaves as expected for all possible inputs. Formal verification goes beyond what testing can do, as testing can only handle a finite amount of cases. That is critical as cryptocurrencies hold a large amount of money (around $3B for Tezos today). The current result of our verification project is available on ",(0,r.kt)("a",{parentName:"p",href:"https://nomadic-labs.gitlab.io/coq-tezos-of-ocaml/"},"nomadic-labs.gitlab.io/coq-tezos-of-ocaml"),". Formal verification is also key to allowing Tezos to evolve constantly in a safe and backward compatible manner."),(0,r.kt)("p",null,"We proceed in two steps:"),(0,r.kt)("ol",null,(0,r.kt)("li",{parentName:"ol"},"we translate the code of Tezos, written in ",(0,r.kt)("a",{parentName:"li",href:"https://ocaml.org/"},"OCaml"),", to the proof language ",(0,r.kt)("a",{parentName:"li",href:"https://coq.inria.fr/"},"Coq")," using the translator ",(0,r.kt)("a",{parentName:"li",href:"https://github.com/foobar-land/coq-of-ocaml"},"coq-of-ocaml"),";"),(0,r.kt)("li",{parentName:"ol"},"we write our specifications and proofs in the Coq language.")),(0,r.kt)("p",null,"We believe this is one of the most efficient ways to proceed, as we can work on an almost unmodified version of the codebase and use the full power of the mature proof system Coq. The code of Tezos is composed of around:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"50,000 lines for the protocol (the kernel of Tezos), and"),(0,r.kt)("li",{parentName:"ul"},"200,000 lines for the shell (everything else, including the peer-to-peer layer and the storage backend).")),(0,r.kt)("p",null,"We are currently focusing on verifying the protocol for the following modules."),(0,r.kt)("h2",{id:"data-encoding"},"Data-encoding"),(0,r.kt)("p",null,"The ",(0,r.kt)("a",{parentName:"p",href:"https://gitlab.com/nomadic-labs/data-encoding"},"data-encoding")," library offers serialization and deserialization to binary and JSON formats. It is used in various parts of the Tezos protocol, especially on all the data types ending up in the storage system. In practice, many encodings are defined in the OCaml files named ",(0,r.kt)("inlineCode",{parentName:"p"},"*_repr.ml"),". We verify that the ",(0,r.kt)("inlineCode",{parentName:"p"},"data-encoding")," library is correctly used to define the encodings. We check that converting a value to binary format and from binary returns the initial value. We explicit the domain of validity of such conversions. This verification work generally reveals and propagates invariants about the data structures of the protocol. As an invariant example, all the account amounts should always be positive. Having these invariants will be helpful for the verification of higher-level layers of the protocol."),(0,r.kt)("h2",{id:"michelson-smart-contracts"},"Michelson smart contracts"),(0,r.kt)("p",null,"The smart contract language of Tezos is ",(0,r.kt)("a",{parentName:"p",href:"https://tezos.gitlab.io/active/michelson.html"},"Michelson"),". The interpreter and type-checker of smart contracts is one of the most complex and critical parts of the protocol. We are verifying two things about this code:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"The equivalence of the interpreter and the Coq semantics for Michelson defined in the project ",(0,r.kt)("a",{parentName:"li",href:"https://gitlab.com/nomadic-labs/mi-cho-coq"},"Mi-Cho-Coq"),". Thanks to this equivalence, we can make sure that the formal verification of smart contracts is sound for the current version of the protocol."),(0,r.kt)("li",{parentName:"ul"},"The compatibility of the parsing and unparsing functions for the Michelson types and values. The parsing functions take care of the type-checking and do a lot of sanity checks on Michelson expressions with appropriate error messages. Showing that the parsing and unparsing functions are inverses is important for security reasons. The Michelson values are always unparsed at the end of a smart contract execution to be stored on disk.")),(0,r.kt)("p",null,"To do these proofs, we also give a new semantics of Michelson, expressed using dependent types rather than ",(0,r.kt)("a",{parentName:"p",href:"https://ocaml.org/manual/gadts-tutorial.html"},"GADTs")," in the OCaml implementation."),(0,r.kt)("h2",{id:"storage-system"},"Storage system"),(0,r.kt)("p",null,"Cryptocurrencies typically take a lot of space on disk (in the hundreds of gigabytes). In Tezos, we use the key-value database ",(0,r.kt)("a",{parentName:"p",href:"https://irmin.org/"},"Irmin"),". The protocol provides a lot of ",(0,r.kt)("a",{parentName:"p",href:"https://gitlab.com/tezos/tezos/-/blob/master/src/proto_alpha/lib_protocol/storage_functors.ml"},"abstractions")," over this database to expose higher-level interfaces with set and map-like APIs. We verify that these abstractions are valid doing a proof by simulation, where we show that the whole system is equivalent to an ",(0,r.kt)("a",{parentName:"p",href:"https://en.wikipedia.org/wiki/In-memory_database"},"in-memory database")," using simpler data structures. Thanks to this simulation, we will be able to reason about code using the storage as if we were using the simpler in-memory version."),(0,r.kt)("h2",{id:"in-addition"},"In addition"),(0,r.kt)("p",null,"We also plan to verify:"),(0,r.kt)("ul",null,(0,r.kt)("li",{parentName:"ul"},"The implementation of the ",(0,r.kt)("inlineCode",{parentName:"li"},"data-encoding")," library itself. This code is challenging for formal verification as it contains many imperative features. Another specificity of this library is that it sits outside of the protocol of Tezos, and we might need to adapt ",(0,r.kt)("inlineCode",{parentName:"li"},"coq-of-ocaml")," to support it."),(0,r.kt)("li",{parentName:"ul"},"The ",(0,r.kt)("a",{parentName:"li",href:"https://gitlab.com/tezos/tezos/-/tree/master/src/proto_alpha/lib_protocol/test/pbt"},"property-based tests of the protocol"),". These tests are written as boolean functions (or functions raising exceptions), which must return ",(0,r.kt)("inlineCode",{parentName:"li"},"true")," on any possible inputs. We will verify them in the general case by importing their definitions to Coq and verifying with mathematical proofs that they are always correct.")),(0,r.kt)("div",{className:"admonition admonition-tip alert alert--success"},(0,r.kt)("div",{parentName:"div",className:"admonition-heading"},(0,r.kt)("h5",{parentName:"div"},(0,r.kt)("span",{parentName:"h5",className:"admonition-icon"},(0,r.kt)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"12",height:"16",viewBox:"0 0 12 16"},(0,r.kt)("path",{parentName:"svg",fillRule:"evenodd",d:"M6.5 0C3.48 0 1 2.19 1 5c0 .92.55 2.25 1 3 1.34 2.25 1.78 2.78 2 4v1h5v-1c.22-1.22.66-1.75 2-4 .45-.75 1-2.08 1-3 0-2.81-2.48-5-5.5-5zm3.64 7.48c-.25.44-.47.8-.67 1.11-.86 1.41-1.25 2.06-1.45 3.23-.02.05-.02.11-.02.17H5c0-.06 0-.13-.02-.17-.2-1.17-.59-1.83-1.45-3.23-.2-.31-.42-.67-.67-1.11C2.44 6.78 2 5.65 2 5c0-2.2 2.02-4 4.5-4 1.22 0 2.36.42 3.22 1.19C10.55 2.94 11 3.94 11 5c0 .66-.44 1.78-.86 2.48zM4 14h5c-.23 1.14-1.3 2-2.5 2s-2.27-.86-2.5-2z"}))),"Contact")),(0,r.kt)("div",{parentName:"div",className:"admonition-content"},(0,r.kt)("p",{parentName:"div"},"For any questions or remarks, contact us on \ud83d\udc49","\xa0",(0,r.kt)("a",{parentName:"p",href:"mailto:contact@formal.land"},"c","o","n","t","a","c","t","@","formal",".","l","a","n","d"),"\xa0","\ud83d\udc48."))))}f.isMDXComponent=!0},1620:function(e,t,a){t.Z=a.p+"assets/images/elephants-elmira-gokoryan-b8a3155720b2c012f6a486e791eb4ad4.webp"}}]);