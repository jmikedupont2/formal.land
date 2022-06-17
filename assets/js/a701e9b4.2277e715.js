"use strict";(self.webpackChunkformal_land=self.webpackChunkformal_land||[]).push([[1902],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return m}});var o=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function a(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},i=Object.keys(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var c=o.createContext({}),s=function(e){var t=o.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):a(a({},t),e)),n},p=function(e){var t=s(e.components);return o.createElement(c.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},f=o.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,c=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),f=s(n),m=r,d=f["".concat(c,".").concat(m)]||f[m]||u[m]||i;return n?o.createElement(d,a(a({ref:t},p),{},{components:n})):o.createElement(d,a({ref:t},p))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,a=new Array(i);a[0]=f;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l.mdxType="string"==typeof e?e:r,a[1]=l;for(var s=2;s<i;s++)a[s]=n[s];return o.createElement.apply(null,a)}return o.createElement.apply(null,n)}f.displayName="MDXCreateElement"},373:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return c},metadata:function(){return s},toc:function(){return p},default:function(){return f}});var o=n(3117),r=n(102),i=(n(7294),n(3905)),a=["components"],l={id:"faq",title:"Faq"},c=void 0,s={unversionedId:"coq-of-ocaml/faq",id:"coq-of-ocaml/faq",title:"Faq",description:"Here we answer to some questions you may have when using coq-of-ocaml.",source:"@site/docs/coq-of-ocaml/faq.md",sourceDirName:"coq-of-ocaml",slug:"/coq-of-ocaml/faq",permalink:"/docs/coq-of-ocaml/faq",tags:[],version:"current",frontMatter:{id:"faq",title:"Faq"},sidebar:"sidebar",previous:{title:"Examples",permalink:"/docs/coq-of-ocaml/examples"}},p=[{value:"Why is there an <code>-impredicative-set</code> option to Coq?",id:"why-is-there-an--impredicative-set-option-to-coq",children:[],level:2}],u={toc:p};function f(e){var t=e.components,n=(0,r.Z)(e,a);return(0,i.kt)("wrapper",(0,o.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,i.kt)("p",null,"Here we answer to some questions you may have when using ",(0,i.kt)("inlineCode",{parentName:"p"},"coq-of-ocaml"),"."),(0,i.kt)("h2",{id:"why-is-there-an--impredicative-set-option-to-coq"},"Why is there an ",(0,i.kt)("inlineCode",{parentName:"h2"},"-impredicative-set")," option to Coq?"),(0,i.kt)("p",null,"To compile the files generated by ",(0,i.kt)("inlineCode",{parentName:"p"},"coq-of-ocaml"),", we need to use the ",(0,i.kt)("inlineCode",{parentName:"p"},"-impredicative-set")," option with Coq. The ",(0,i.kt)("a",{parentName:"p",href:"https://github.com/coq/coq/wiki/Impredicative-Set"},"Impredicative Set")," page of the Coq wiki gives some details about this option. The reason for that is to avoid getting into universe inconsistency errors. If we take the following example:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-ocaml"},"type t =\n  | Empty\n  | Node : 'a -> t\n\n(* This function could be a deserializing function from [string] to [t]. We\n   use lists for the sake of simplicity. *)\nlet rec t_of_list (l : 'a list) : t =\n  match l with\n  | [] -> Empty\n  | _ :: l -> Node (t_of_list l)\n")),(0,i.kt)("p",null,"we generate the Coq translation:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-coq"},"Require Import CoqOfOCaml.CoqOfOCaml.\nRequire Import CoqOfOCaml.Settings.\n\nInductive t : Set :=\n| Empty : t\n| Node : forall {a : Set}, a -> t.\n\nFixpoint t_of_list {a : Set} (l : list a) : t :=\n  match l with\n  | [] => Empty\n  | cons _ l => Node (t_of_list l)\n  end.\n")),(0,i.kt)("p",null,"The type ",(0,i.kt)("inlineCode",{parentName:"p"},"t")," has a constructor ",(0,i.kt)("inlineCode",{parentName:"p"},"Node")," with an existential type ",(0,i.kt)("inlineCode",{parentName:"p"},"a"),". With the function ",(0,i.kt)("inlineCode",{parentName:"p"},"t_of_list")," we generate a value with a number of nested existential types equals to the length of the list ",(0,i.kt)("inlineCode",{parentName:"p"},"l"),". This generated Coq code is valid."),(0,i.kt)("p",null,"In contrast, if we were using ",(0,i.kt)("inlineCode",{parentName:"p"},"Type")," instead of ",(0,i.kt)("inlineCode",{parentName:"p"},"Set")," this would not work. Indeed, an existential type increases the universe level by one in ",(0,i.kt)("inlineCode",{parentName:"p"},"Type"),". So this function would have a universe level for its result equals to the length on the list. This does not seem easy to express, even with polymorphic universes."))}f.isMDXComponent=!0}}]);