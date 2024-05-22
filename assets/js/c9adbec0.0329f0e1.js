"use strict";(self.webpackChunkformal_land=self.webpackChunkformal_land||[]).push([[4970],{1392:(o,t,e)=>{e.r(t),e.d(t,{assets:()=>s,contentTitle:()=>r,default:()=>m,frontMatter:()=>i,metadata:()=>l,toc:()=>c});var n=e(4848),a=e(8453);const i={title:"Simulation of Python code from traces in Coq",tags:["coq-of-python","Python","Coq","translation","Ethereum","simulation","trace"],authors:[]},r=void 0,l={permalink:"/blog/2024/05/22/translation-of-python-code-simulations-from-trace",source:"@site/blog/2024-05-22-translation-of-python-code-simulations-from-trace.md",title:"Simulation of Python code from traces in Coq",description:"In order to formally verify Python code in Coq our approach is the following:",date:"2024-05-22T00:00:00.000Z",formattedDate:"May 22, 2024",tags:[{label:"coq-of-python",permalink:"/blog/tags/coq-of-python"},{label:"Python",permalink:"/blog/tags/python"},{label:"Coq",permalink:"/blog/tags/coq"},{label:"translation",permalink:"/blog/tags/translation"},{label:"Ethereum",permalink:"/blog/tags/ethereum"},{label:"simulation",permalink:"/blog/tags/simulation"},{label:"trace",permalink:"/blog/tags/trace"}],readingTime:8.59,hasTruncateMarker:!0,authors:[],frontMatter:{title:"Simulation of Python code from traces in Coq",tags:["coq-of-python","Python","Coq","translation","Ethereum","simulation","trace"],authors:[]},unlisted:!1,nextItem:{title:"Simulation of Python code in Coq",permalink:"/blog/2024/05/14/translation-of-python-code-simulations"}},s={authorsImageUrls:[]},c=[];function h(o){const t={a:"a",li:"li",ol:"ol",p:"p",...(0,a.R)(),...o.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(t.p,{children:"In order to formally verify Python code in Coq our approach is the following:"}),"\n",(0,n.jsxs)(t.ol,{children:["\n",(0,n.jsxs)(t.li,{children:["Import Python code in Coq by running ",(0,n.jsx)(t.a,{href:"https://github.com/formal-land/coq-of-python",children:"coq-of-python"}),"."]}),"\n",(0,n.jsx)(t.li,{children:"Write a purely functional simulation in Coq of the code."}),"\n",(0,n.jsx)(t.li,{children:"Show that this simulation is equivalent to the translation."}),"\n",(0,n.jsx)(t.li,{children:"Verify the simulation."}),"\n"]}),"\n",(0,n.jsx)(t.p,{children:"We will show in this article how we can merge the steps 2. and 3. to save time in the verification process. We do so by relying on the proof mode of Coq and unification."}),"\n",(0,n.jsxs)(t.p,{children:["Our mid-term goal is to formally specify the ",(0,n.jsx)(t.a,{href:"https://ethereum.org/en/developers/docs/evm/",children:"Ethereum Virtual Machine"})," (EVM) and prove that this specification is correct according to ",(0,n.jsx)(t.a,{href:"https://github.com/ethereum/execution-specs",children:"reference implementation of the EVM"})," in Python. This would ensure that it is always up-to-date and exhaustive. The code of this project is open-source and available on GitHub: ",(0,n.jsx)(t.a,{href:"https://github.com/formal-land/coq-of-python",children:"formal-land/coq-of-python"}),"."]})]})}function m(o={}){const{wrapper:t}={...(0,a.R)(),...o.components};return t?(0,n.jsx)(t,{...o,children:(0,n.jsx)(h,{...o})}):h(o)}},8453:(o,t,e)=>{e.d(t,{R:()=>r,x:()=>l});var n=e(6540);const a={},i=n.createContext(a);function r(o){const t=n.useContext(i);return n.useMemo((function(){return"function"==typeof o?o(t):{...t,...o}}),[t,o])}function l(o){let t;return t=o.disableParentContext?"function"==typeof o.components?o.components(a):o.components||a:r(o.components),n.createElement(i.Provider,{value:t},o.children)}}}]);