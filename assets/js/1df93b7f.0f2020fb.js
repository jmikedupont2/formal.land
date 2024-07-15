"use strict";(self.webpackChunkformal_land=self.webpackChunkformal_land||[]).push([[4583],{8501:(e,t,o)=>{o.r(t),o.d(t,{default:()=>j});var i=o(6540);function s(e){var t,o,i="";if("string"==typeof e||"number"==typeof e)i+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(o=s(e[t]))&&(i&&(i+=" "),i+=o);else for(t in e)e[t]&&(i&&(i+=" "),i+=t);return i}const r=function(){for(var e,t,o=0,i="";o<arguments.length;)(e=arguments[o++])&&(t=s(e))&&(i&&(i+=" "),i+=t);return i};var n=o(781),a=o(8774),l=o(4586);const c={heroBanner:"heroBanner_qdFl",buttons:"buttons_AeoN",hero__button:"hero__button_At_c",hero__container:"hero__container_CovH",hero__title:"hero__title_sobY",glow:"glow_rLah",hero__subtitle:"hero__subtitle_AUTZ",hero__subsubtitle:"hero__subsubtitle_yuZD",onlyDesktop:"onlyDesktop_mEGl",container:"container_bfhl"},h={features:"features_xdhU",featureImg:"featureImg_IxXR"};var d=o(4848);const m=[{title:"Solidity verification",image:"img/icons/water.png",imageNight:"img/icons/wolf-night.png",description:(0,d.jsxs)(d.Fragment,{children:[(0,d.jsxs)("p",{children:["We provide you a formal verification tool for ",(0,d.jsx)("a",{href:"https://soliditylang.org/",children:"Solidity"})," called ",(0,d.jsx)("a",{href:"https://github.com/formal-land/solidity",children:"coq-of-solidity"}),". You can now express and verify any property about a smart contract using the proof assistant\xa0",(0,d.jsx)("a",{href:"https://coq.inria.fr/",children:"Coq"}),"\xa0\ud83d\udc13."]}),(0,d.jsxs)("p",{children:["With ",(0,d.jsx)("code",{children:"coq-of-solidity"}),", you can ",(0,d.jsx)("strong",{children:"prove the absence of bugs"})," in your code and go further than with code audits. This tool is open-source, and we can help you set it up on your project."]})]})},{title:"Rust verification",image:"img/icons/hills.png",imageNight:"img/icons/hills-night.png",description:(0,d.jsxs)("p",{children:["We developed an open-source formal verification tool for Rust\xa0\ud83e\udd80 ",(0,d.jsx)("a",{href:"https://github.com/formal-land/coq-of-rust",children:"coq-of-rust"})," with the cryptocurrency ",(0,d.jsx)("a",{href:"https://alephzero.org/",children:"Aleph Zero"}),"\xa0\ud83d\udd17. You can now very arbitrarily large Rust programs, thanks to the use of the interactive theorem prover ",(0,d.jsx)("a",{href:"https://coq.inria.fr/",children:"Coq"}),"\xa0\ud83d\udc13 and our support of the ",(0,d.jsx)(a.A,{to:"/blog/2024/04/26/translation-core-alloc-crates",children:"Rust's standard library"}),".",(0,d.jsx)("br",{}),"We are now improving our reasoning principles for Rust, in order to make the verification process more efficient\xa0\ud83c\udfce\ufe0f."]})},{title:"EVM implementation",image:"img/icons/canyon.png",imageNight:"img/icons/canyon-night.png",description:(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)("p",{children:"To add more trust to the L2s built on top of Ethereum, we are proving the equivalence of the two EVM implementations:"}),(0,d.jsxs)("ul",{style:{listStylePosition:"inside",paddingLeft:0,marginTop:20},children:[(0,d.jsxs)("li",{children:[(0,d.jsx)("a",{href:"https://github.com/bluealloy/revm",children:"revm"})," in Rust\xa0\ud83e\udd80"]}),(0,d.jsxs)("li",{children:[(0,d.jsx)("a",{href:"https://github.com/ethereum/execution-specs",children:"execution-specs"})," in Python\xa0\ud83d\udc0d"]})]}),(0,d.jsxs)("p",{children:["This work relies on our tools ",(0,d.jsx)("a",{href:"https://github.com/formal-land/coq-of-rust",children:"coq-of-rust"})," and ",(0,d.jsx)("a",{href:"https://github.com/formal-land/coq-of-python",children:"coq-of-python"}),"."]})]})},{title:"L1 of Tezos",image:"img/icons/river.png",imageNight:"img/icons/river-night.png",description:(0,d.jsxs)("p",{children:["We ",(0,d.jsx)("a",{href:"https://formal-land.gitlab.io/coq-tezos-of-ocaml/",children:"formally verified\xa0\ud83d\udd0d"})," the ",(0,d.jsx)("em",{children:"code"})," of the layer 1 of the security-focused blockchain ",(0,d.jsx)("a",{href:"https://tezos.com/",children:"Tezos"}),". This is a significant achievement as no other blockchains have done that, verifying ",(0,d.jsx)("em",{children:"models"})," of the implementation at best.",(0,d.jsx)("br",{}),"We covered a codebase of more than 100,000 lines of ",(0,d.jsx)("a",{href:"",children:"OCaml"}),"\xa0\ud83d\udc2b code, including the storage system and the smart contracts VM, thanks to our ",(0,d.jsx)("a",{href:"https://github.com/formal-land/coq-of-ocaml",children:"innovative tools"})," and methods. See the ",(0,d.jsx)("a",{href:"https://formal-land.gitlab.io/coq-tezos-of-ocaml/blog",children:"blog of the project"})," for more details\xa0\ud83d\udcda."]})}];function u(e){let{title:t,image:o,imageNight:i,description:s}=e;return(0,d.jsx)("div",{className:r("col col--6"),style:{marginTop:50},children:(0,d.jsxs)("div",{style:{margin:"auto",maxWidth:500},children:[(0,d.jsx)("div",{className:"text--center",children:(0,d.jsx)("img",{alt:t,className:h.featureImg,src:o})}),(0,d.jsxs)("div",{className:"text--center padding-horiz--md",style:{marginTop:30},children:[(0,d.jsx)("h3",{children:t}),s]})]})})}function f(){return(0,d.jsx)("section",{className:h.features,children:(0,d.jsxs)("div",{className:"container",children:[(0,d.jsx)("h2",{className:"margin-bottom--lg text--center",children:"Our current and past projects"}),(0,d.jsx)("div",{className:"row",children:m.map(((e,t)=>(0,d.jsx)(u,{...e},t)))})]})})}function p(){return(0,d.jsx)("svg",{width:"13.5",height:"13.5","aria-hidden":"true",viewBox:"0 0 24 24",children:(0,d.jsx)("path",{fill:"currentColor",d:"M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"})})}function g(){const{siteConfig:e}=(0,l.A)();return(0,d.jsx)("header",{className:r("hero hero--primary",c.heroBanner),style:{},children:(0,d.jsx)("div",{className:r("container",c.hero__container),children:(0,d.jsxs)("div",{style:{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"space-between"},children:[(0,d.jsx)("div",{className:c.onlyDesktop,style:{flexShrink:0,padding:120},children:(0,d.jsx)("img",{style:{maxHeight:350},src:"img/icons/land.png"})}),(0,d.jsxs)("div",{style:{flex:1},children:[(0,d.jsx)("h1",{className:r("hero__title",c.hero__title),style:{letterSpacing:"0.03em"},children:e.title}),(0,d.jsx)("p",{className:c.hero__subtitle,children:"Formal verification for the blockchain"}),(0,d.jsxs)("p",{className:c.hero__subsubtitle,style:{marginTop:50,marginBottom:50},children:["We provide tools and services to ",(0,d.jsx)("strong",{children:"help you prove"})," that your code ",(0,d.jsx)("strong",{children:"contains no bugs"}),"."]}),(0,d.jsxs)("p",{className:c.hero__subsubtitle,style:{marginTop:50,marginBottom:50},children:["We check ",(0,d.jsx)("strong",{children:"every possible user inputs"})," and go further than traditional code audits thanks to a ",(0,d.jsx)("strong",{children:"mathematical reasoning"})," on the code."]}),(0,d.jsxs)("p",{className:c.hero__subsubtitle,style:{marginTop:50,marginBottom:50},children:["Complementing bug bounties, we give you a complete ",(0,d.jsx)("strong",{children:"peace of mind"})," in your deployments."]}),(0,d.jsxs)("div",{className:c.buttons,style:{marginTop:50},children:[(0,d.jsxs)(a.A,{className:r("button button--info button--lg",c.hero__button),to:"mailto:contact@formal.land",children:["Contact us\xa0",(0,d.jsx)(p,{})]}),(0,d.jsx)(a.A,{className:r("button button--secondary button--lg",c.hero__button),to:"/docs/company/about",children:"More info"})]})]})]})})})}const x=()=>((0,i.useEffect)((()=>{const e=document.createElement("script");e.src="https://js.hsforms.net/forms/v2.js",document.body.appendChild(e),e.addEventListener("load",(()=>{window.hbspt&&window.hbspt.forms.create({portalId:"144793130",formId:"44518a92-58ae-4923-8ae0-e8400fcff12c",region:"eu1",target:"#hubspotForm"})}))}),[]),(0,d.jsx)("div",{children:(0,d.jsx)("div",{id:"hubspotForm"})}));function j(){const{siteConfig:e}=(0,l.A)();return(0,d.jsxs)(n.A,{title:e.tagline,description:e.tagline,children:[(0,d.jsx)(g,{}),(0,d.jsxs)("main",{style:{marginTop:50,marginBottom:50},children:[(0,d.jsx)(f,{}),(0,d.jsx)("section",{style:{marginTop:80,marginBottom:80},children:(0,d.jsxs)("div",{className:"container",style:{maxWidth:800},children:[(0,d.jsx)("h2",{className:"margin-bottom--lg text--center",children:"Contact"}),(0,d.jsx)("p",{children:"For more information about how formal verification can help your project, please contact us!"}),(0,d.jsx)(x,{})]})})]})]})}}}]);