"use strict";(self.webpackChunkformal_land=self.webpackChunkformal_land||[]).push([[598],{3905:function(e,t,r){r.d(t,{Zo:function(){return p},kt:function(){return u}});var n=r(7294);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function l(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},a=Object.keys(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(n=0;n<a.length;n++)r=a[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var c=n.createContext({}),s=function(e){var t=n.useContext(c),r=t;return e&&(r="function"==typeof e?e(t):l(l({},t),e)),r},p=function(e){var t=s(e.components);return n.createElement(c.Provider,{value:t},e.children)},f={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},m=n.forwardRef((function(e,t){var r=e.components,o=e.mdxType,a=e.originalType,c=e.parentName,p=i(e,["components","mdxType","originalType","parentName"]),m=s(r),u=o,h=m["".concat(c,".").concat(u)]||m[u]||f[u]||a;return r?n.createElement(h,l(l({ref:t},p),{},{components:r})):n.createElement(h,l({ref:t},p))}));function u(e,t){var r=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=r.length,l=new Array(a);l[0]=m;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i.mdxType="string"==typeof e?e:o,l[1]=i;for(var s=2;s<a;s++)l[s]=r[s];return n.createElement.apply(null,l)}return n.createElement.apply(null,r)}m.displayName="MDXCreateElement"},2524:function(e,t,r){r.r(t),r.d(t,{frontMatter:function(){return i},contentTitle:function(){return c},metadata:function(){return s},assets:function(){return p},toc:function(){return f},default:function(){return u}});var n=r(3117),o=r(102),a=(r(7294),r(3905)),l=["components"],i={title:"Experiment on translation from Haskell to Coq",tags:["coq-of-hs","Haskell","Coq","translation"],authors:[]},c=void 0,s={permalink:"/blog/2024/02/14/experiment-coq-of-hs",source:"@site/blog/2024-02-14-experiment-coq-of-hs.md",title:"Experiment on translation from Haskell to Coq",description:"We present an experiment coq-of-hs that we have made on the translation of Haskell programs to the proof system Coq&nbsp;\ud83d\udc13. The goal is to formally verify Haskell programs to make them totally bug-free.",date:"2024-02-14T00:00:00.000Z",formattedDate:"February 14, 2024",tags:[{label:"coq-of-hs",permalink:"/blog/tags/coq-of-hs"},{label:"Haskell",permalink:"/blog/tags/haskell"},{label:"Coq",permalink:"/blog/tags/coq"},{label:"translation",permalink:"/blog/tags/translation"}],readingTime:4.365,truncated:!0,authors:[],prevItem:{title:"Translating Go to Coq, part 1",permalink:"/blog/2024/02/22/journey-coq-of-go"},nextItem:{title:"The importance of formal verification",permalink:"/blog/2024/02/02/formal-verification-for-aleph-zero"}},p={authorsImageUrls:[]},f=[],m={toc:f};function u(e){var t=e.components,r=(0,o.Z)(e,l);return(0,a.kt)("wrapper",(0,n.Z)({},m,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"We present an experiment ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/formal-land/coq-of-hs-experiment"},"coq-of-hs")," that we have made on the translation of ",(0,a.kt)("a",{parentName:"p",href:"https://www.haskell.org/"},"Haskell")," programs to the proof system ",(0,a.kt)("a",{parentName:"p",href:"https://coq.inria.fr/"},"Coq","\xa0","\ud83d\udc13"),". The goal is to formally verify Haskell programs to make them totally bug-free."),(0,a.kt)("p",null,"Indeed, even with the use of a strict type system, there can still be bugs for properties that cannot be expressed with types. An example of such a property is the backward compatibility of an API endpoint for the new release of a web service when there has been code refactoring. Only formal verification can cover all execution cases and kinds of properties."),(0,a.kt)("p",null,"The code of the tool is at: ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/formal-land/coq-of-hs-experiment"},"github.com/formal-land/coq-of-hs-experiment")," (AGPL license)"))}u.isMDXComponent=!0}}]);