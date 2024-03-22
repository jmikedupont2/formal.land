"use strict";(self.webpackChunkformal_land=self.webpackChunkformal_land||[]).push([[640],{8857:(t,e,o)=>{o.r(e),o.d(e,{assets:()=>l,contentTitle:()=>a,default:()=>m,frontMatter:()=>s,metadata:()=>i,toc:()=>u});var n=o(4848),r=o(8453);const s={title:"Improvements in the Rust translation to Coq, part 2",tags:["coq-of-rust","Rust","Coq","translation"],authors:[]},a=void 0,i={permalink:"/blog/2024/03/08/improvements-rust-translation-part-2",source:"@site/blog/2024-03-08-improvements-rust-translation-part-2.md",title:"Improvements in the Rust translation to Coq, part 2",description:"In our previous blog post, we stated our plan to improve our translation of Rust&nbsp;\ud83e\udd80 to Coq&nbsp;\ud83d\udc13 with coq-of-rust. We also provided a new definition for our Rust monad in Coq, and the definition of a unified type to represent any Rust values. We will now see how we modify the Rust implementation of&nbsp;coq-of-rust to make the generated code use these new definitions.",date:"2024-03-08T00:00:00.000Z",formattedDate:"March 8, 2024",tags:[{label:"coq-of-rust",permalink:"/blog/tags/coq-of-rust"},{label:"Rust",permalink:"/blog/tags/rust"},{label:"Coq",permalink:"/blog/tags/coq"},{label:"translation",permalink:"/blog/tags/translation"}],readingTime:9.055,hasTruncateMarker:!0,authors:[],frontMatter:{title:"Improvements in the Rust translation to Coq, part 2",tags:["coq-of-rust","Rust","Coq","translation"],authors:[]},unlisted:!1,prevItem:{title:"Improvements in the Rust translation to Coq, part 3",permalink:"/blog/2024/03/22/improvements-rust-translation-part-3"},nextItem:{title:"Improvements in the Rust translation to Coq, part 1",permalink:"/blog/2024/02/29/improvements-rust-translation"}},l={authorsImageUrls:[]},u=[];function p(t){const e={a:"a",code:"code",li:"li",ol:"ol",p:"p",...(0,r.R)(),...t.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsxs)(e.p,{children:["In our ",(0,n.jsx)(e.a,{href:"/blog/2024/02/29/improvements-rust-translation",children:"previous blog post"}),", we stated our plan to improve our translation of Rust\xa0\ud83e\udd80 to Coq\xa0\ud83d\udc13 with ",(0,n.jsx)(e.a,{href:"https://github.com/formal-land/coq-of-rust",children:"coq-of-rust"}),". We also provided a new definition for our Rust monad in Coq, and the definition of a unified type to represent any Rust values. We will now see how we modify the Rust implementation of\xa0",(0,n.jsx)(e.code,{children:"coq-of-rust"})," to make the generated code use these new definitions."]}),"\n",(0,n.jsx)(e.p,{children:"With this new translation strategy, to support more Rust code, we want:"}),"\n",(0,n.jsxs)(e.ol,{children:["\n",(0,n.jsx)(e.li,{children:"to remove the types from the translation,"}),"\n",(0,n.jsx)(e.li,{children:"to avoid the need to order the definitions in the generated Coq code."}),"\n"]})]})}function m(t={}){const{wrapper:e}={...(0,r.R)(),...t.components};return e?(0,n.jsx)(e,{...t,children:(0,n.jsx)(p,{...t})}):p(t)}},8453:(t,e,o)=>{o.d(e,{R:()=>a,x:()=>i});var n=o(6540);const r={},s=n.createContext(r);function a(t){const e=n.useContext(s);return n.useMemo((function(){return"function"==typeof t?t(e):{...e,...t}}),[e,t])}function i(t){let e;return e=t.disableParentContext?"function"==typeof t.components?t.components(r):t.components||r:a(t.components),n.createElement(s.Provider,{value:e},t.children)}}}]);