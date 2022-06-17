"use strict";(self.webpackChunkformal_land=self.webpackChunkformal_land||[]).push([[9140],{3905:function(e,t,o){o.d(t,{Zo:function(){return s},kt:function(){return f}});var r=o(7294);function n(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}function a(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,r)}return o}function l(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?a(Object(o),!0).forEach((function(t){n(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):a(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}function i(e,t){if(null==e)return{};var o,r,n=function(e,t){if(null==e)return{};var o,r,n={},a=Object.keys(e);for(r=0;r<a.length;r++)o=a[r],t.indexOf(o)>=0||(n[o]=e[o]);return n}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)o=a[r],t.indexOf(o)>=0||Object.prototype.propertyIsEnumerable.call(e,o)&&(n[o]=e[o])}return n}var c=r.createContext({}),p=function(e){var t=r.useContext(c),o=t;return e&&(o="function"==typeof e?e(t):l(l({},t),e)),o},s=function(e){var t=p(e.components);return r.createElement(c.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var o=e.components,n=e.mdxType,a=e.originalType,c=e.parentName,s=i(e,["components","mdxType","originalType","parentName"]),m=p(o),f=n,h=m["".concat(c,".").concat(f)]||m[f]||u[f]||a;return o?r.createElement(h,l(l({ref:t},s),{},{components:o})):r.createElement(h,l({ref:t},s))}));function f(e,t){var o=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var a=o.length,l=new Array(a);l[0]=m;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i.mdxType="string"==typeof e?e:n,l[1]=i;for(var p=2;p<a;p++)l[p]=o[p];return r.createElement.apply(null,l)}return r.createElement.apply(null,o)}m.displayName="MDXCreateElement"},4938:function(e,t,o){o.r(t),o.d(t,{frontMatter:function(){return i},contentTitle:function(){return c},metadata:function(){return p},assets:function(){return s},toc:function(){return u},default:function(){return f}});var r=o(3117),n=o(102),a=(o(7294),o(3905)),l=["components"],i={title:"New blog posts and Meetup talk",authors:["guillaume_claret"],tags:["tezos","mi-cho-coq","coq-of-ocaml","meetup"]},c=void 0,p={permalink:"/blog/2021/11/12/new-blog-posts-and-meetup-talk",source:"@site/blog/2021-11-12-new-blog-posts-and-meetup-talk.md",title:"New blog posts and Meetup talk",description:"Recently, we added two new blog posts about the verification of the crypto-currency Tezos:",date:"2021-11-12T00:00:00.000Z",formattedDate:"November 12, 2021",tags:[{label:"tezos",permalink:"/blog/tags/tezos"},{label:"mi-cho-coq",permalink:"/blog/tags/mi-cho-coq"},{label:"coq-of-ocaml",permalink:"/blog/tags/coq-of-ocaml"},{label:"meetup",permalink:"/blog/tags/meetup"}],readingTime:.58,truncated:!1,authors:[{name:"Guillaume Claret",url:"https://github.com/clarus",imageURL:"https://github.com/clarus.png",key:"guillaume_claret"}],prevItem:{title:"Make Tezos the first formally verified cryptocurrency",permalink:"/blog/2022/02/02/make-tezos-a-formally-verified-crypto"},nextItem:{title:"Verification of the use of data-encoding",permalink:"/blog/2021/10/27/verification-data-encoding"}},s={authorsImageUrls:[void 0]},u=[],m={toc:u};function f(e){var t=e.components,o=(0,n.Z)(e,l);return(0,a.kt)("wrapper",(0,r.Z)({},m,o,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"Recently, we added two new blog posts about the verification of the crypto-currency ",(0,a.kt)("a",{parentName:"p",href:"https://tezos.com/"},"Tezos"),":"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://nomadic-labs.gitlab.io/coq-tezos-of-ocaml/blog/2021/11/01/verify-michelson-types-mi-cho-coq/"},"Verify the Michelson types of Mi-Cho-Coq")," to compare the types defined in the Tezos code for the ",(0,a.kt)("a",{parentName:"li",href:"http://tezos.gitlab.io/active/michelson.html"},"Michelson")," interpreter and in the ",(0,a.kt)("a",{parentName:"li",href:"https://gitlab.com/nomadic-labs/mi-cho-coq"},"Mi-Cho-Coq library")," to verify smart contracts;"),(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("a",{parentName:"li",href:"https://nomadic-labs.gitlab.io/coq-tezos-of-ocaml/blog/2021/11/08/translate-tenderbake/"},"Translate the Tenderbake's code to Coq")," to explain how we translated the recent changes in Tezos to the Coq using ",(0,a.kt)("a",{parentName:"li",href:"https://github.com/foobar-land/coq-of-ocaml"},"coq-of-ocaml"),". In particular we translated the code of the new ",(0,a.kt)("a",{parentName:"li",href:"https://research-development.nomadic-labs.com/a-look-ahead-to-tenderbake.html"},"Tenderbake")," consensus algorithm.")),(0,a.kt)("p",null,"We also talked at the ",(0,a.kt)("a",{parentName:"p",href:"https://www.meetup.com/LambdaLille/events/281374644/"},"Lambda Lille Meetup")," (in French) to present our work on ",(0,a.kt)("inlineCode",{parentName:"p"},"coq-of-ocaml")," for Tezos. A video on the ",(0,a.kt)("a",{parentName:"p",href:"https://www.youtube.com/channel/UC-hC7y_ilQBq0QCa9xDu1iA"},"Youtube channel")," of the Meetup should be available shortly. We thanks the organizers for hosting the talk."))}f.isMDXComponent=!0}}]);