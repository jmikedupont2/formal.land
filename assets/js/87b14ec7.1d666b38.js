"use strict";(self.webpackChunkformal_land=self.webpackChunkformal_land||[]).push([[130],{3905:function(e,t,n){n.d(t,{Zo:function(){return m},kt:function(){return f}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var c=r.createContext({}),u=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},m=function(e){var t=u(e.components);return r.createElement(c.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},s=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,c=e.parentName,m=i(e,["components","mdxType","originalType","parentName"]),s=u(n),f=o,d=s["".concat(c,".").concat(f)]||s[f]||p[f]||a;return n?r.createElement(d,l(l({ref:t},m),{},{components:n})):r.createElement(d,l({ref:t},m))}));function f(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,l=new Array(a);l[0]=s;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i.mdxType="string"==typeof e?e:o,l[1]=i;for(var u=2;u<a;u++)l[u]=n[u];return r.createElement.apply(null,l)}return r.createElement.apply(null,n)}s.displayName="MDXCreateElement"},3034:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return i},contentTitle:function(){return c},metadata:function(){return u},toc:function(){return m},default:function(){return s}});var r=n(3117),o=n(102),a=(n(7294),n(3905)),l=["components"],i={id:"run",title:"Run"},c=void 0,u={unversionedId:"coq-of-ocaml/run",id:"coq-of-ocaml/run",title:"Run",description:"coq-of-ocaml translates the OCaml files one by one. It uses Merlin to get the typing environment of each file. Thus you should first have a project which works with Merlin. This is generally the case for a project compiled with dune.",source:"@site/docs/coq-of-ocaml/run.md",sourceDirName:"coq-of-ocaml",slug:"/coq-of-ocaml/run",permalink:"/docs/coq-of-ocaml/run",tags:[],version:"current",frontMatter:{id:"run",title:"Run"},sidebar:"sidebar",previous:{title:"Install",permalink:"/docs/coq-of-ocaml/install"},next:{title:"Cookbook",permalink:"/docs/coq-of-ocaml/cookbook"}},m=[{value:"Minimal example",id:"minimal-example",children:[],level:2},{value:"Command line arguments",id:"command-line-arguments",children:[],level:2}],p={toc:m};function s(e){var t=e.components,n=(0,o.Z)(e,l);return(0,a.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"coq-of-ocaml")," translates the OCaml files one by one. It uses ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/ocaml/merlin"},"Merlin")," to get the typing environment of each file. Thus you should first have a project which works with Merlin. This is generally the case for a project compiled with ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/ocaml/dune"},"dune"),"."),(0,a.kt)("h2",{id:"minimal-example"},"Minimal example"),(0,a.kt)("p",null,"Create a file ",(0,a.kt)("inlineCode",{parentName:"p"},"example.ml"),":"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ocaml"},"type 'a tree =\n  | Leaf of 'a\n  | Node of 'a tree * 'a tree\n\nlet rec sum tree =\n  match tree with\n  | Leaf n -> n\n  | Node (tree1, tree2) -> sum tree1 + sum tree2\n")),(0,a.kt)("p",null,"Run:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"coq-of-ocaml example.ml\n")),(0,a.kt)("p",null,"You should get a file ",(0,a.kt)("inlineCode",{parentName:"p"},"Example.v")," representing the corresponding version in Coq:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-coq"},"Require Import CoqOfOCaml.CoqOfOCaml.\nRequire Import CoqOfOCaml.Settings.\n\nInductive tree (a : Set) : Set :=\n| Leaf : a -> tree a\n| Node : tree a -> tree a -> tree a.\n\nArguments Leaf {_}.\nArguments Node {_}.\n\nFixpoint sum (tree : tree Z) : Z :=\n  match tree with\n  | Leaf n => n\n  | Node tree1 tree2 => Z.add (sum tree1) (sum tree2)\n  end.\n\n")),(0,a.kt)("h2",{id:"command-line-arguments"},"Command line arguments"),(0,a.kt)("p",null,"The general usage pattern is the following:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-sh"},"coq-of-ocaml [options] file.ml\n")),(0,a.kt)("p",null,"The options are:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"-output file"),": specify the name of the Coq ",(0,a.kt)("inlineCode",{parentName:"li"},".v")," file to output (by default the capitalized OCaml file name with a ",(0,a.kt)("inlineCode",{parentName:"li"},".v")," extension)"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"-json-mode"),": produce the list of error messages in JSON format; useful for post-processing")))}s.isMDXComponent=!0}}]);