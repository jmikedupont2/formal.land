"use strict";(self.webpackChunkformal_land=self.webpackChunkformal_land||[]).push([[5993],{3331:(e,n,i)=>{i.r(n),i.d(n,{assets:()=>l,contentTitle:()=>r,default:()=>d,frontMatter:()=>o,metadata:()=>a,toc:()=>c});var t=i(4848),s=i(8453);const o={title:"\ud83e\udd84 Software correctness from first principles",tags:["formal verification","software correctness","first principles","example","Python"],authors:[]},r=void 0,a={permalink:"/blog/2024/06/05/formal-verification-for-software-correctness",source:"@site/blog/2024-06-05-formal-verification-for-software-correctness.md",title:"\ud83e\udd84 Software correctness from first principles",description:"Formal verification is a technique to verify the absence of bugs in a program by reasoning from first principles. Instead of testing a program on examples, what can only cover a finite number of cases, formal verification checks all possible cases. It does so by going back to the definition of programming languages, showing why the whole code is correct given how each individual keyword behaves.",date:"2024-06-05T00:00:00.000Z",formattedDate:"June 5, 2024",tags:[{label:"formal verification",permalink:"/blog/tags/formal-verification"},{label:"software correctness",permalink:"/blog/tags/software-correctness"},{label:"first principles",permalink:"/blog/tags/first-principles"},{label:"example",permalink:"/blog/tags/example"},{label:"Python",permalink:"/blog/tags/python"}],readingTime:7.265,hasTruncateMarker:!0,authors:[],frontMatter:{title:"\ud83e\udd84 Software correctness from first principles",tags:["formal verification","software correctness","first principles","example","Python"],authors:[]},unlisted:!1,nextItem:{title:"\ud83e\udd84 Software correctness from first principles",permalink:"/blog/2024/06/05/software-correctness-from-first-principles"}},l={authorsImageUrls:[]},c=[{value:"Use of formal verification",id:"use-of-formal-verification",level:2},{value:"Definition of programming languages",id:"definition-of-programming-languages",level:2},{value:"Example to verify",id:"example-to-verify",level:2},{value:"Formal verification",id:"formal-verification",level:2},{value:"Completing the property",id:"completing-the-property",level:2},{value:"Conclusion",id:"conclusion",level:2}];function h(e){const n={a:"a",admonition:"admonition",blockquote:"blockquote",code:"code",em:"em",h2:"h2",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,s.R)(),...e.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsxs)(n.p,{children:[(0,t.jsx)(n.strong,{children:"Formal verification"})," is a technique to verify the absence of bugs in a program by reasoning from ",(0,t.jsx)(n.strong,{children:"first principles"}),". Instead of testing a program on examples, what can only cover a finite number of cases, formal verification checks all possible cases. It does so by going back to the definition of programming languages, showing why the whole code is correct given how each individual keyword behaves."]}),"\n",(0,t.jsx)(n.p,{children:"We will present this idea in detail and illustrate how it works for a very simple example."}),"\n",(0,t.jsx)(n.h2,{id:"use-of-formal-verification",children:"Use of formal verification"}),"\n",(0,t.jsx)(n.p,{children:"We typically use formal verification for critical applications, where either:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"life is at stake, like in the case of trains, airplanes, medical devices, or"}),"\n",(0,t.jsx)(n.li,{children:"money is at stake, like in the case of financial applications."}),"\n"]}),"\n",(0,t.jsxs)(n.p,{children:["With formal verification, in theory, ",(0,t.jsx)(n.strong,{children:"we can guarantee that the software will never fail"}),", as we can check ",(0,t.jsx)(n.strong,{children:"all possible cases"})," for a given property. A property can be that no non-admin users can read sensitive data, or that a program never fails with  uncaught exceptions."]}),"\n",(0,t.jsxs)(n.p,{children:["In this research paper ",(0,t.jsx)(n.a,{href:"https://users.cs.utah.edu/~regehr/papers/pldi11-preprint.pdf",children:"Finding and Understanding Bugs in C Compilers"}),", no bugs were found in the middle-end of the formally verified ",(0,t.jsx)(n.a,{href:"https://en.wikipedia.org/wiki/CompCert",children:"CompCert"})," C compiler, while the other C compilers (GCC, LLVM, ...) all contained subtle bugs. This illustrates that formal verification can be an effective way to make complex software with zero bugs!"]}),"\n",(0,t.jsx)(n.h2,{id:"definition-of-programming-languages",children:"Definition of programming languages"}),"\n",(0,t.jsxs)(n.p,{children:["To be able to reason on a program we go back to the definition of a programming language. These languages (C, JavaScript, Python, ...) are generally defined with a precise set of rules. For example, in Python, the ",(0,t.jsx)(n.code,{children:"if"})," statement is ",(0,t.jsx)(n.a,{href:"https://docs.python.org/3/reference/compound_stmts.html#if",children:"defined in the reference manual"})," by:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-python",children:'if_stmt ::=  "if" assignment_expression ":" suite\n             ("elif" assignment_expression ":" suite)*\n             ["else" ":" suite]\n'})}),"\n",(0,t.jsxs)(n.blockquote,{children:["\n",(0,t.jsx)(n.p,{children:"It selects exactly one of the suites by evaluating the expressions one by one until one is found to be true (see section Boolean operations for the definition of true and false); then that suite is executed (and no other part of the if statement is executed or evaluated). If all expressions are false, the suite of the else clause, if present, is executed."}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:"This means that the Python code:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-python",children:"if condition:\n    a\nelse:\n    b\n"})}),"\n",(0,t.jsxs)(n.p,{children:["will execute ",(0,t.jsx)(n.code,{children:"a"})," when the ",(0,t.jsx)(n.code,{children:"condition"})," is true, and ",(0,t.jsx)(n.code,{children:"b"})," otherwise. There are similar rules for all other program constructs (loops, function definitions, classes, ...)."]}),"\n",(0,t.jsx)(n.p,{children:"To make these rules more manageable, we generally split them into two parts:"}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["The syntax part, that defines what is a valid program in the language. For example, in Python, the syntax is defined by the ",(0,t.jsx)(n.a,{href:"https://docs.python.org/3/reference/grammar.html",children:"grammar"}),"."]}),"\n",(0,t.jsxs)(n.li,{children:["The semantics part, that defines what a program does. This is what we have seen above with the description of the behavior of the ",(0,t.jsx)(n.code,{children:"if"})," statement."]}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:'In formal verification, we will focus on the semantics of programs,  assuming that the syntax is already verified by the compiler or interpreter, generating "syntax errors" in case of ill-formed programs.'}),"\n",(0,t.jsx)(n.h2,{id:"example-to-verify",children:"Example to verify"}),"\n",(0,t.jsx)(n.p,{children:"We consider this short Python example of a function returning the maximum number in a list:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-python",children:"def my_max(l):\n    m = l[0]\n    for x in l:\n        if x > m:\n            m = x\n    return m\n"})}),"\n",(0,t.jsxs)(n.p,{children:["We assume that the list ",(0,t.jsx)(n.code,{children:"l"})," is not empty and only contains integers. If we run it on a few examples:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-python",children:"my_max([1, 2, 3]) # => 3\nmy_max([3, 2, 1]) # => 3\nmy_max([1, 3, 2]) # => 3\n"})}),"\n",(0,t.jsxs)(n.p,{children:["it always returns\xa0",(0,t.jsx)(n.code,{children:"3"}),", the biggest number in the list! But can we make sure this is always the case?"]}),"\n",(0,t.jsxs)(n.p,{children:["We can certainly not run\xa0",(0,t.jsx)(n.code,{children:"my_max"})," on all possible lists of integers, as there are infinitely many of them. We need to reason from the definition of the Python language, which is what we call formal verification reasoning."]}),"\n",(0,t.jsx)(n.h2,{id:"formal-verification",children:"Formal verification"}),"\n",(0,t.jsxs)(n.p,{children:["Here is a general specification that we give of the\xa0",(0,t.jsx)(n.code,{children:"my_max"})," function above:"]}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-python",children:"forall (index : int) (l : list[int]),\n    0 \u2264 index < len(l) \u21d2\n    l[index] \u2264 my_max(l)\n"})}),"\n",(0,t.jsxs)(n.p,{children:["It says that for all integer ",(0,t.jsx)(n.code,{children:"index"})," and list of integers ",(0,t.jsx)(n.code,{children:"l"}),", if the index is valid (between\xa0",(0,t.jsx)(n.code,{children:"0"})," and the length of the list), then the element at this index is less than or equal to the maximum of the list that we compute."]}),"\n",(0,t.jsxs)(n.p,{children:["To verify this property for all possible list\xa0",(0,t.jsx)(n.code,{children:"l"}),", we reason by induction. A non-empty list is either:"]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsx)(n.li,{children:"a list with one element, where the maximum is the only element, or"}),"\n",(0,t.jsx)(n.li,{children:"a list with at least two elements, where the maximum is either the last element or the maximum of the rest of the list."}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:"At the start of the code, we will always have:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-python",children:"def my_max(l):\n    m = l[0]\n"})}),"\n",(0,t.jsxs)(n.p,{children:["with ",(0,t.jsx)(n.code,{children:"m"})," being equal to the first item of the list. Then:"]}),"\n",(0,t.jsxs)(n.ul,{children:["\n",(0,t.jsxs)(n.li,{children:["If the list has only one element, we iterate only once in the ",(0,t.jsx)(n.code,{children:"for"})," loop, with ",(0,t.jsx)(n.code,{children:"x"})," equal to ",(0,t.jsx)(n.code,{children:"l[0]"}),". The condition:","\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-python",children:"if x > m:\n"})}),"\n","is then equivalent to:","\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-python",children:"if l[0] > l[0]:\n"})}),"\n","and is always false. We then return ",(0,t.jsx)(n.code,{children:"m = l[0]"}),", which is the only element of the list, and it verifies our property as:","\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-python",children:"l[0] \u2264 l[0]\n"})}),"\n"]}),"\n",(0,t.jsxs)(n.li,{children:["If the list has at least two elements, we unroll the code execution of the ",(0,t.jsx)(n.code,{children:"for"})," loop and iterate over all the elements until the last one. Our induction hypothesis tells us that the property we verify is true for the first part of the list, excluding the last element. This means that:","\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-python",children:"l[index] \u2264 m\n"})}),"\n","for all ",(0,t.jsx)(n.code,{children:"index"})," between ",(0,t.jsx)(n.code,{children:"0"})," and ",(0,t.jsx)(n.code,{children:"len(l) - 2"}),". When we reach the last element, we have:","\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-python",children:"if x > m:\n    m = x\n"})}),"\n","with ",(0,t.jsx)(n.code,{children:"x"})," being ",(0,t.jsx)(n.code,{children:"l[len(l) - 1]"}),". There are two possibilities. Either ",(0,t.jsx)(n.em,{children:"(i)"})," ",(0,t.jsx)(n.code,{children:"x"})," is less than or equal to ",(0,t.jsx)(n.code,{children:"m"}),", and we do not update ",(0,t.jsx)(n.code,{children:"m"}),", or ",(0,t.jsx)(n.em,{children:"(ii)"})," ",(0,t.jsx)(n.code,{children:"x"})," is greater than ",(0,t.jsx)(n.code,{children:"m"}),", and we update ",(0,t.jsx)(n.code,{children:"m"})," to ",(0,t.jsx)(n.code,{children:"x"}),". In both cases, the property is verified for the last element of the list, as:","\n",(0,t.jsxs)(n.ol,{children:["\n",(0,t.jsxs)(n.li,{children:["In the first case, ",(0,t.jsx)(n.code,{children:"m"})," stays the same, so it is still larger or equal to all the elements of the list except the last one, as well as larger or equal to the last one according to this last\xa0",(0,t.jsx)(n.code,{children:"if"})," statement."]}),"\n",(0,t.jsxs)(n.li,{children:["In the second case, ",(0,t.jsx)(n.code,{children:"m"})," is updated to ",(0,t.jsx)(n.code,{children:"x"}),", which is the last element of the list and a greater value than the original\xa0",(0,t.jsx)(n.code,{children:"m"}),". Then it means that ",(0,t.jsx)(n.code,{children:"m"})," is still larger or equal to all the elements of the list except the last one, being larger that the original\xa0",(0,t.jsx)(n.code,{children:"m"}),", and larger or equal to the last one as it is in fact equals to the last one."]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(n.p,{children:"We have now closed our induction proof and verified that our property is true for all possible lists of integers! The reasoning above is rather verbose but should actually correspond to the intuition of most programmers when reading this code."}),"\n",(0,t.jsxs)(n.p,{children:["In practice, with formal verification, the reasoning above is done in a proof assistance such as ",(0,t.jsx)(n.a,{href:"https://coq.inria.fr/",children:"Coq"})," to help making sure that we did not forget any case, and automatically solve simple cases for us. Having a proof written in a proof language like Coq also allows us to re-run it to check that it is still valid after a change in the code, and allows third-party persons to check it without reading all the details."]}),"\n",(0,t.jsx)(n.h2,{id:"completing-the-property",children:"Completing the property"}),"\n",(0,t.jsx)(n.p,{children:"An additional property that we did not verify is:"}),"\n",(0,t.jsx)(n.pre,{children:(0,t.jsx)(n.code,{className:"language-python",children:"forall (l : list[int]),\n    exists (index : int),\n        0 \u2264 index < len(l) and\n        l[index] = my_max(l)\n"})}),"\n",(0,t.jsx)(n.p,{children:"It says that the maximum of the list is actually in the list. We can verify it by induction in the same way as we did for the first property. You can detail this verification as an exercise."}),"\n",(0,t.jsx)(n.admonition,{title:"For more",type:"info",children:(0,t.jsxs)(n.p,{children:["If you want to go into more details for the formal verification of Python programs, you can look at our ",(0,t.jsx)(n.a,{href:"https://github.com/formal-land/coq-of-python",children:"coq-of-python"})," project, where we define the semantics of Python in Coq and verify properties of Python programs (ongoing project!). We also provide formal verification services for ",(0,t.jsx)(n.a,{href:"https://github.com/formal-land/coq-of-rust",children:"Rust"})," and other languages like ",(0,t.jsx)(n.a,{href:"https://github.com/formal-land/coq-of-ocaml",children:"OCaml"}),". Contact us at\xa0",(0,t.jsx)(n.a,{href:"mailto:contact@formal.land",children:"contact@formal.land"})," to discuss!"]})}),"\n",(0,t.jsx)(n.h2,{id:"conclusion",children:"Conclusion"}),"\n",(0,t.jsxs)(n.p,{children:["We have presented here the idea of ",(0,t.jsx)(n.strong,{children:"formal verification"}),", a technique to verify the absence of bugs in a program by reasoning from ",(0,t.jsx)(n.strong,{children:"first principles"}),". We have illustrated this idea for a simple Python example, showing how we can verify that a function computing the maximum of a list is correct ",(0,t.jsx)(n.strong,{children:"for all possible lists of integers"}),"."]}),"\n",(0,t.jsx)(n.p,{children:"We will continue with more blog posts explaining what we can do with formal verification and why it matters. Feel free to share this post and tell us what subjects you would like to see covered!"})]})}function d(e={}){const{wrapper:n}={...(0,s.R)(),...e.components};return n?(0,t.jsx)(n,{...e,children:(0,t.jsx)(h,{...e})}):h(e)}},8453:(e,n,i)=>{i.d(n,{R:()=>r,x:()=>a});var t=i(6540);const s={},o=t.createContext(s);function r(e){const n=t.useContext(o);return t.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:r(e.components),t.createElement(o.Provider,{value:n},e.children)}}}]);