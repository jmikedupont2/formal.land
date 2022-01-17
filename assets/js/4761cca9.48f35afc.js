"use strict";(self.webpackChunkformal_land=self.webpackChunkformal_land||[]).push([[3422],{3905:function(e,t,n){n.d(t,{Zo:function(){return u},kt:function(){return d}});var a=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function r(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var c=a.createContext({}),s=function(e){var t=a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},u=function(e){var t=s(e.components);return a.createElement(c.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},m=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,c=e.parentName,u=r(e,["components","mdxType","originalType","parentName"]),m=s(n),d=i,h=m["".concat(c,".").concat(d)]||m[d]||p[d]||o;return n?a.createElement(h,l(l({ref:t},u),{},{components:n})):a.createElement(h,l({ref:t},u))}));function d(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,l=new Array(o);l[0]=m;var r={};for(var c in t)hasOwnProperty.call(t,c)&&(r[c]=t[c]);r.originalType=e,r.mdxType="string"==typeof e?e:i,l[1]=r;for(var s=2;s<o;s++)l[s]=n[s];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},6947:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return r},contentTitle:function(){return c},metadata:function(){return s},toc:function(){return u},default:function(){return m}});var a=n(7462),i=n(3366),o=(n(7294),n(3905)),l=["components"],r={id:"attributes",title:"Attributes"},c=void 0,s={unversionedId:"coq-of-ocaml/attributes",id:"coq-of-ocaml/attributes",isDocsHomePage:!1,title:"Attributes",description:"We present the attributes which we can use with coq-of-ocaml. See the attributes documentation of OCaml for general information about the attributes mechanism. Note that the OCaml attributes do not change the behavior of a program. There are there to help developer tools.",source:"@site/docs/coq-of-ocaml/attributes.md",sourceDirName:"coq-of-ocaml",slug:"/coq-of-ocaml/attributes",permalink:"/docs/coq-of-ocaml/attributes",tags:[],version:"current",frontMatter:{id:"attributes",title:"Attributes"},sidebar:"sidebar",previous:{title:"GADTs",permalink:"/docs/coq-of-ocaml/gadts"},next:{title:"Configuration",permalink:"/docs/coq-of-ocaml/configuration"}},u=[{value:"coq_axiom_with_reason",id:"coq_axiom_with_reason",children:[]},{value:"coq_cast",id:"coq_cast",children:[]},{value:"coq_force_gadt",id:"coq_force_gadt",children:[]},{value:"coq_grab_existentials",id:"coq_grab_existentials",children:[]},{value:"coq_implicit",id:"coq_implicit",children:[]},{value:"coq_match_gadt",id:"coq_match_gadt",children:[]},{value:"coq_match_gadt_with_result",id:"coq_match_gadt_with_result",children:[]},{value:"coq_match_with_default",id:"coq_match_with_default",children:[]},{value:"coq_mutual_as_notation",id:"coq_mutual_as_notation",children:[]},{value:"coq_phantom",id:"coq_phantom",children:[]},{value:"coq_plain_module",id:"coq_plain_module",children:[]},{value:"coq_precise_signature",id:"coq_precise_signature",children:[]},{value:"coq_struct",id:"coq_struct",children:[]},{value:"coq_tag_gadt",id:"coq_tag_gadt",children:[]},{value:"coq_tagged_match",id:"coq_tagged_match",children:[]},{value:"coq_type_annotation",id:"coq_type_annotation",children:[]}],p={toc:u};function m(e){var t=e.components,n=(0,i.Z)(e,l);return(0,o.kt)("wrapper",(0,a.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"We present the attributes which we can use with ",(0,o.kt)("inlineCode",{parentName:"p"},"coq-of-ocaml"),". See the ",(0,o.kt)("a",{parentName:"p",href:"https://caml.inria.fr/pub/docs/manual-ocaml/attributes.html"},"attributes documentation")," of OCaml for general information about the attributes mechanism. Note that the OCaml attributes do not change the behavior of a program. There are there to help developer tools."),(0,o.kt)("p",null,"We prefix all the attributes of ",(0,o.kt)("inlineCode",{parentName:"p"},"coq-of-ocaml")," by ",(0,o.kt)("inlineCode",{parentName:"p"},"coq_"),". According to the OCaml syntax, depending on the context, you may use a single ",(0,o.kt)("inlineCode",{parentName:"p"},"@")," or a double ",(0,o.kt)("inlineCode",{parentName:"p"},"@@"),"."),(0,o.kt)("h2",{id:"coq_axiom_with_reason"},"coq_axiom_with_reason"),(0,o.kt)("p",null,"When we cannot import the definition of a value, we can use the ",(0,o.kt)("inlineCode",{parentName:"p"},"[@coq_axiom_with_reason]")," attribute to transform it to a Coq axiom. For example:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ocaml"},'let[@coq_axiom_with_reason "mutable state"] function_hard_to_translate_to_coq =\n  let n = ref 0 in\n  fun () ->\n    n := !n + 1;\n    !n\n')),(0,o.kt)("p",null,"is translated to:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-coq"},"Definition function_hard_to_translate_to_coq : unit -> Z := axiom.\n")),(0,o.kt)("p",null,"Note that we must give a reason for the use of ",(0,o.kt)("inlineCode",{parentName:"p"},"[@coq_axiom_with_reason]")," in a string parameter. We define the ",(0,o.kt)("inlineCode",{parentName:"p"},"axiom")," value in the ",(0,o.kt)("inlineCode",{parentName:"p"},"coq-of-ocaml"),"'s Coq library. The definition of ",(0,o.kt)("inlineCode",{parentName:"p"},"axiom")," is:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-coq"},"Axiom axiom : forall {A : Set}, A.\n")),(0,o.kt)("h2",{id:"coq_cast"},"coq_cast"),(0,o.kt)("p",null,"With the attribute ",(0,o.kt)("inlineCode",{parentName:"p"},"[@coq_cast]")," we can force the type in Coq of an arbitrary OCaml expression using the following axiom:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-coq"},"Axiom cast : forall {A : Set} (B : Set), A -> B.\n")),(0,o.kt)("p",null,"For example, we translate:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ocaml"},"type _ t =\n  | Int : int t\n\nlet f (type a) (kind : a t) (x : a) : int =\n  match kind with\n  | Int -> (x[@coq_cast] : int) + 1\n")),(0,o.kt)("p",null,"to:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-coq"},"Inductive t : Set :=\n| Int : t.\n\nDefinition f {a : Set} (kind : t) (x : a) : int :=\n  let 'Int := kind in\n  Z.add (cast int x) 1.\n")),(0,o.kt)("p",null,"Thanks to the ",(0,o.kt)("inlineCode",{parentName:"p"},"cast")," axiom, we can get the information in Coq that ",(0,o.kt)("inlineCode",{parentName:"p"},"x")," is of type ",(0,o.kt)("inlineCode",{parentName:"p"},"int"),". Without this axiom the example would not work. Indeed, we do not track the type equations generated by the ",(0,o.kt)("a",{parentName:"p",href:"https://caml.inria.fr/pub/docs/manual-ocaml/gadts.html"},"GADTs")," so ",(0,o.kt)("inlineCode",{parentName:"p"},"x")," would be considered of type ",(0,o.kt)("inlineCode",{parentName:"p"},"a"),". Without the cast, the Coq code:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-coq"},"Definition f {a : Set} (kind : t) (x : a) : int :=\n  let 'Int := kind in\n  Z.add x 1.\n")),(0,o.kt)("p",null,"generates the error:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-text"},'>   Z.add x 1.\n>         ^\nError:\nIn environment\na : Set\nkind : t\nx : a\nThe term "x" has type "a" while it is expected to have type "Z".\n')),(0,o.kt)("h2",{id:"coq_force_gadt"},"coq_force_gadt"),(0,o.kt)("p",null,"The ",(0,o.kt)("inlineCode",{parentName:"p"},"[@coq_force_gadt]")," attribute forces a type definition to be considered as a GADT during the translation to Coq. In particular, it forces the translation to erase the type parameters. For example:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ocaml"},"type 'a standard_list =\n  | SNil\n  | SCons of 'a * 'a standard_list\n\ntype 'a gadt_list =\n  | GNil\n  | GCons of 'a * 'a gadt_list\n[@@coq_force_gadt]\n")),(0,o.kt)("p",null,"generates:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-coq"},"Inductive standard_list (a : Set) : Set :=\n| SNil : standard_list a\n| SCons : a -> standard_list a -> standard_list a.\n\nArguments SNil {_}.\nArguments SCons {_}.\n\nInductive gadt_list : Set :=\n| GNil : gadt_list\n| GCons : forall {a : Set}, a -> gadt_list -> gadt_list.\n")),(0,o.kt)("p",null,"One possible reason to force a type to be a GADT is to make sure that all the inductive types in a mutually recursive type definition have the same (zero) arity, as it is expected by Coq."),(0,o.kt)("h2",{id:"coq_grab_existentials"},"coq_grab_existentials"),(0,o.kt)("p",null,"When translating terms that mentions existential variables it might be necessary to make that existential variable explicit.\nTo achieve this we use the ",(0,o.kt)("inlineCode",{parentName:"p"},"[@coq_grab_existentials]")," attribute. Here is an example:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ocaml"},"type wrap1 =\n  | Cw1 : ('a -> 'b) -> wrap1\n\ntype wrap2 =\n  | Cw2 : ('a -> 'a) -> wrap2\n\nlet w2_of_w1 (w : wrap2) : wrap1  =\n  match [@coq_grab_existentials]w with\n  | Cw2 f ->\n    Cw1 (fun y -> f y)\n")),(0,o.kt)("p",null,"Notice that the type of ",(0,o.kt)("inlineCode",{parentName:"p"},"inj")," is ",(0,o.kt)("inlineCode",{parentName:"p"},"'a -> 'a")," for some existential variable ",(0,o.kt)("inlineCode",{parentName:"p"},"'a"),".\nSince ",(0,o.kt)("inlineCode",{parentName:"p"},"coq-of-ocaml")," always generates fully anotated code, we need to explicitely\nname ",(0,o.kt)("inlineCode",{parentName:"p"},"'a")," in order to properly anotate the type of ",(0,o.kt)("inlineCode",{parentName:"p"},"y")," in the body of ",(0,o.kt)("inlineCode",{parentName:"p"},"Cw1"),".\nThis gives us the following translation:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-coq"},"Inductive wrap1 : Set :=\n| Cw1 : forall {a b : Set}, (a -> b) -> wrap1.\n\nInductive wrap2 : Set :=\n| Cw2 : forall {a : Set}, (a -> a) -> wrap2.\n\nDefinition w2_of_w1 (w : wrap2) : wrap1 :=\n  let 'Cw2 f := w in\n  let 'existT _ __Cw2_'a f as exi :=\n    existT (A := Set) (fun __Cw2_'a => __Cw2_'a -> __Cw2_'a) _ f\n    return\n      let fst := projT1 exi in\n      let __Cw2_'a := fst in\n      wrap1 in\n  Cw1 (fun (y : __Cw2_'a) => f y).\n")),(0,o.kt)("p",null,"In the coq side we use an ",(0,o.kt)("inlineCode",{parentName:"p"},"existT")," to grab these existential variables.  The key\nhere is that this allows us to explicitely name ",(0,o.kt)("inlineCode",{parentName:"p"},"'a")," as ",(0,o.kt)("inlineCode",{parentName:"p"},"__Cw2_'a"),". "),(0,o.kt)("p",null,"The return clause is used to bind this new name in the return type of the term\nthat is being built, in this example it wouldn't be necessary but we generate\nthe same code for a simpler boilerplate."),(0,o.kt)("h2",{id:"coq_implicit"},"coq_implicit"),(0,o.kt)("p",null,"The ",(0,o.kt)("inlineCode",{parentName:"p"},'[@coq_implicit "(A := ...)"]')," attribute adds an arbitrary annotation on an OCaml identifier or constructor. We typically use this attribute to help Coq to infer implicit types where there is an ambiguity:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ocaml"},"let forget x = ()\n\nlet u = forget []\n")),(0,o.kt)("p",null,"generates the following Coq code:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-coq"},"Definition forget {A : Set} (x : A) : unit := tt.\n\nDefinition u : unit := forget nil.\n")),(0,o.kt)("p",null,"which fails to compile due to the error:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},'> Definition u : unit := forget nil.\n>                               ^^^\nError: Cannot infer the implicit parameter A of nil whose type is "Set".\n')),(0,o.kt)("p",null,"Indeed, the type parameter of this empty list does not matter as it is dropped by the ",(0,o.kt)("inlineCode",{parentName:"p"},"forget")," function. We can force it to an arbitrary value like ",(0,o.kt)("inlineCode",{parentName:"p"},"unit"),":"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ocaml"},'let u = forget ([] [@coq_implicit "(A := unit)"])\n')),(0,o.kt)("p",null,"so that the generated Coq code compiles:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-coq"},"Definition u : unit := forget (nil (A := unit)).\n")),(0,o.kt)("h2",{id:"coq_match_gadt"},"coq_match_gadt"),(0,o.kt)("p",null,"The ",(0,o.kt)("inlineCode",{parentName:"p"},"[@coq_match_gadt]")," attribute adds type annotations for the pattern variables in a ",(0,o.kt)("inlineCode",{parentName:"p"},"match"),". We force the type annotations to be valid using axioms (dynamic casts). For example:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ocaml"},"type 'a int_or_bool =\n  | Int : int int_or_bool\n  | Bool : bool int_or_bool\n\nlet to_int (type a) (kind : a int_or_bool) (x : a) : int =\n  match[@coq_match_gadt] (kind, x) with\n  | (Int, (x : int)) -> x\n  | (Bool, (x : bool)) -> if x then 1 else 0\n")),(0,o.kt)("p",null,"translates to:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-coq"},"Inductive int_or_bool : Set :=\n| Int : int_or_bool\n| Bool : int_or_bool.\n\nDefinition to_int {a : Set} (kind : int_or_bool) (x : a) : Z :=\n  match (kind, x) with\n  | (Int, _ as x) =>\n    let x := cast Z x in\n    x\n  | (Bool, _ as x) =>\n    let x := cast bool x in\n    if x then\n      1\n    else\n      0\n  end.\n")),(0,o.kt)("p",null,"The ",(0,o.kt)("inlineCode",{parentName:"p"},"cast")," operator is a dynamic cast defined by:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-coq"},"Axiom cast : forall {A : Set} (B : Set), A -> B.\n")),(0,o.kt)("p",null,"Note that without the ",(0,o.kt)("inlineCode",{parentName:"p"},"[@coq_match_gadt]")," attribute this would generate:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-coq"},"Definition to_int {a : Set} (kind : int_or_bool) (x : a) : Z :=\n  match (kind, x) with\n  | (Int, _ as x) => x\n  | (Bool, _ as x) =>\n    if x then\n      1\n    else\n      0\n  end.\n")),(0,o.kt)("p",null,"which is ill-typed in Coq."),(0,o.kt)("h2",{id:"coq_match_gadt_with_result"},"coq_match_gadt_with_result"),(0,o.kt)("p",null,"The attribute ",(0,o.kt)("inlineCode",{parentName:"p"},"[@coq_match_gadt_with_result]")," is similar to ",(0,o.kt)("inlineCode",{parentName:"p"},"[@coq_match_gadt]")," and also adds a cast for the result of each ",(0,o.kt)("inlineCode",{parentName:"p"},"match")," branch. Here is an example where it is useful:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ocaml"},"let incr_if_int (type a) (kind : a int_or_bool) (x : a) : a =\n  match[@coq_match_gadt_with_result] (kind, x) with\n  | (Int, (x : int)) -> x + 1\n  | (Bool, (x : bool)) -> x \n")),(0,o.kt)("p",null,"generates in Coq:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-coq"},"Definition incr_if_int {a : Set} (kind : int_or_bool) (x : a) : a :=\n  match (kind, x) with\n  | (Int, _ as x) =>\n    let x := cast Z x in\n    cast a (Z.add x 1)\n  | (Bool, _ as x) =>\n    let x := cast bool x in\n    cast a x\n  end.\n")),(0,o.kt)("h2",{id:"coq_match_with_default"},"coq_match_with_default"),(0,o.kt)("p",null,"The ",(0,o.kt)("inlineCode",{parentName:"p"},"[@coq_match_with_default]")," adds a default branch for ",(0,o.kt)("inlineCode",{parentName:"p"},"match")," which are syntactically incomplete. For example, when we annotate the following code:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ocaml"},"let incr_int (kind_and_value : int int_or_bool * int) : int =\n  match[@coq_match_with_default] kind_and_value with\n  | (Int, x) -> x + 1\n")),(0,o.kt)("p",null,"we generate the following valid Coq code:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-coq"},"Definition incr_int (kind_and_value : int_or_bool * Z) : Z :=\n  match kind_and_value with\n  | (Int, x) => Z.add x 1\n  | _ => unreachable_gadt_branch\n  end.\n")),(0,o.kt)("p",null,"even if the ",(0,o.kt)("inlineCode",{parentName:"p"},"match")," is syntactically incomplete due to the GADT's constraints. We define ",(0,o.kt)("inlineCode",{parentName:"p"},"unreachable_gadt_branch")," as an axiom by:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-coq"},"Axiom unreachable_gadt_branch : forall {A : Set}, A.\n")),(0,o.kt)("p",null,"We can combine this attribute with ",(0,o.kt)("inlineCode",{parentName:"p"},"[@coq_match_gadt]")," or ",(0,o.kt)("inlineCode",{parentName:"p"},"[@coq_match_gadt_with_result]")," if needed."),(0,o.kt)("h2",{id:"coq_mutual_as_notation"},"coq_mutual_as_notation"),(0,o.kt)("p",null,"The attribute ",(0,o.kt)("inlineCode",{parentName:"p"},"[@coq_mutual_as_notation]")," makes the definition of a mutually recursive function a notation. For example, we transform the following OCaml code:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ocaml"},"let rec double_list l =\n  match l with\n  | [] -> l\n  | n :: l -> double n :: double_list l\n\nand[@coq_mutual_as_notation] double n = 2 * n\n")),(0,o.kt)("p",null,"to:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-coq"},"Reserved Notation \"'double\".\n\nFixpoint double_list (l : list int) : list int :=\n  let double := 'double in\n  match l with\n  | [] => l\n  | cons n l => cons (double n) (double_list l)\n  end\n\nwhere \"'double\" := (fun (n : int) => Z.mul 2 n).\n\nDefinition double := 'double.\n")),(0,o.kt)("p",null,"Without this attribute, we would generate a mutually recursive definition:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-coq"},"Fixpoint double_list (l : list int) : list int :=\n  match l with\n  | [] => l\n  | cons n l => cons (double n) (double_list l)\n  end\n\nwith double (n : int) : int := Z.mul 2 n.\n")),(0,o.kt)("p",null,"which is rejected by the type-checker of Coq:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},'Error:\nRecursive definition of double_list is ill-formed.\nIn environment\ndouble_list : list int -> list int\ndouble : int -> int\nl : list int\nn : int\nl0 : list int\nRecursive call to double has principal argument equal to \n"n" instead of "l0".\nRecursive definition is:\n"fun l : list int =>\n match l with\n | [] => l\n | n :: l0 => double n :: double_list l0\n end".\n')),(0,o.kt)("p",null,"For recursive notations, you can combine this attribute with ",(0,o.kt)("inlineCode",{parentName:"p"},"@coq_struct")," to tell ",(0,o.kt)("inlineCode",{parentName:"p"},"coq-of-ocaml")," to generate a recursive notation. For example, we transform:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ocaml"},"type 'a tree =\n  | Leaf of 'a\n  | Node of 'a tree list\n\nlet rec sum (t : int tree) =\n  match t with\n  | Leaf n -> n\n  | Node ts -> sums ts\n\nand[@coq_mutual_as_notation][@coq_struct \"ts\"] sums (ts : int tree list) =\n  match ts with\n  | [] -> 0\n  | t :: ts -> sum t + sums ts\n")),(0,o.kt)("p",null,"to:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-coq"},"Reserved Notation \"'sums\".\n\nFixpoint sum (t : tree int) : int :=\n  let sums := 'sums in\n  match t with\n  | Leaf n => n\n  | Node ts => sums ts\n  end\n\nwhere \"'sums\" :=\n  (fix sums (ts : list (tree int)) {struct ts} : int :=\n    match ts with\n    | [] => 0\n    | cons t ts => Z.add (sum t) (sums ts)\n    end).\n\nDefinition sums := 'sums.\n")),(0,o.kt)("p",null,"using the keyword ",(0,o.kt)("inlineCode",{parentName:"p"},"fix")," for the defintion of ",(0,o.kt)("inlineCode",{parentName:"p"},"sums"),". In this example too, the type-checker of Coq would reject the definition without a notation."),(0,o.kt)("blockquote",null,(0,o.kt)("p",{parentName:"blockquote"},"In the proofs, whenever the definition of ",(0,o.kt)("inlineCode",{parentName:"p"},"sums")," appears unfolded, you can run the tactic ",(0,o.kt)("inlineCode",{parentName:"p"},"fold sums")," to hide it.")),(0,o.kt)("h2",{id:"coq_phantom"},"coq_phantom"),(0,o.kt)("p",null,"When it can, ",(0,o.kt)("inlineCode",{parentName:"p"},"coq-of-ocaml")," detects phantom types and remove their type annotations. For example, we translate the following OCaml code:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ocaml"},"type 'a num = int\n\ntype even = Even\n\nlet two : even num = 2\n")),(0,o.kt)("p",null,"to:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-coq"},"Definition num : Set := Z.\n\nInductive even : Set :=\n| Even : even.\n\nDefinition two : num := 2.\n")),(0,o.kt)("p",null,"The reason is that phantom types may generate ambiguities during type inference in Coq."),(0,o.kt)("p",null,"The ",(0,o.kt)("inlineCode",{parentName:"p"},"[@coq_phantom]")," attribute forces ",(0,o.kt)("inlineCode",{parentName:"p"},"coq-of-ocaml")," to consider a type as phantom. This can be useful for abstract types in ",(0,o.kt)("inlineCode",{parentName:"p"},".mli")," files, since their definition is not reachable. For example:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ocaml"},"type 'a num\n")),(0,o.kt)("p",null,"translates to:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-coq"},"Parameter num : forall (a : Set), Set.\n")),(0,o.kt)("p",null,"but:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ocaml"},"type 'a num\n[@@coq_phantom]\n")),(0,o.kt)("p",null,"generates:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-coq"},"Parameter num : Set.\n")),(0,o.kt)("h2",{id:"coq_plain_module"},"coq_plain_module"),(0,o.kt)("p",null,"We may prefer to translate a module to a plain Coq module rather than a record. The ",(0,o.kt)("inlineCode",{parentName:"p"},"[@coq_plain_module]")," attribute requires a module to be translated as a plain Coq module. For example:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ocaml"},"module type T = sig\n  type t\n\n  val v : t\nend\n\nmodule M = struct\n  type t = int\n\n  let v = 12\nend\n")),(0,o.kt)("p",null,"translates to:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-coq"},"Module T.\n  Record signature {t : Set} : Set := {\n    t := t;\n    v : t;\n  }.\nEnd T.\n\nDefinition M :=\n  let t : Set := int in\n  let v := 12 in\n  existT (A := unit) (fun _ => _) tt\n    {|\n      T.v := v\n    |}.\n")),(0,o.kt)("p",null,"With the ",(0,o.kt)("inlineCode",{parentName:"p"},"[@coq_plain_module]")," attribute we translate:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ocaml"},"module type T = sig\n  type t\n\n  val v : t\nend\n\nmodule[@coq_plain_module] M = struct\n  type t = int\n\n  let v = 12\nend\n")),(0,o.kt)("p",null,"to:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-coq"},"Module T.\n  Record signature {t : Set} : Set := {\n    t := t;\n    v : t;\n  }.\nEnd T.\n\nModule M.\n  Definition t : Set := int.\n  \n  Definition v : int := 12.\nEnd M.\n")),(0,o.kt)("h2",{id:"coq_precise_signature"},"coq_precise_signature"),(0,o.kt)("p",null,"In order to distinguish between two signatures with the same value names, we can add the ",(0,o.kt)("inlineCode",{parentName:"p"},"[@coq_precise_signature]")," attribute. For example, we can translate:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ocaml"},"module type Sig1 = sig\n  type t\n\n  val f : t -> t -> t * t\nend\n[@@coq_precise_signature]\n\nmodule type Sig2 = sig\n  type t\n\n  val f : t -> t list\nend\n[@@coq_precise_signature]\n\nmodule M1 : Sig1 = struct\n  type t = int\n\n  let f n m = (n, m)\nend\n\nmodule M2 : Sig2 = struct\n  type t = int\n\n  let f n = []\nend\n")),(0,o.kt)("p",null,"to:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-coq"},"Module Sig1.\n  Record signature {t : Set} : Set := {\n    t := t;\n    f : t -> t -> t * t;\n  }.\nEnd Sig1.\n\nModule Sig2.\n  Record signature {t : Set} : Set := {\n    t := t;\n    f : t -> list t;\n  }.\nEnd Sig2.\n\nModule M1.\n  Definition t : Set := int.\n  \n  Definition f {A B : Set} (n : A) (m : B) : A * B := (n, m).\n  \n  Definition module :=\n    existT (A := Set) _ t\n      {|\n        Sig1.f := f\n      |}.\nEnd M1.\nDefinition M1 := M1.module.\n\nModule M2.\n  Definition t : Set := int.\n  \n  Definition f {A B : Set} (n : A) : list B := nil.\n  \n  Definition module :=\n    existT (A := Set) _ t\n      {|\n        Sig2.f := f\n      |}.\nEnd M2.\nDefinition M2 := M2.module.\n")),(0,o.kt)("p",null,"Here we can distinguish between the signature ",(0,o.kt)("inlineCode",{parentName:"p"},"Sig1")," and ",(0,o.kt)("inlineCode",{parentName:"p"},"Sig2")," thanks to the type shape of ",(0,o.kt)("inlineCode",{parentName:"p"},"f"),". Without this attribute, we would get the following error message:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-text"},"--- tests/precise_signature.ml:13:1 ----------------------------------------------- module (1/2) ---\n\n  11 | end\n  12 | \n> 13 | module M1 : Sig1 = struct\n> 14 |   type t = int\n> 15 | \n> 16 |   let f n m = (n, m)\n> 17 | end\n  18 | \n  19 | module M2 : Sig2 = struct\n  20 |   type t = int\n\n\nIt is unclear which name this signature has. At least two similar\nsignatures found, namely:\n\n* Sig1\n* Sig2\n\nWe were looking for a module signature name for the following shape:\n[ f ]\n(a shape is a list of names of values and sub-modules)\n\nWe use the concept of shape to find the name of a signature for Coq.\n")),(0,o.kt)("p",null,"Indeed, by default, we only compare signatures based on the names of their fields. With the ",(0,o.kt)("inlineCode",{parentName:"p"},"[@coq_precise_signature]")," we also use a heuristic to distinguish the types of the values."),(0,o.kt)("h2",{id:"coq_struct"},"coq_struct"),(0,o.kt)("p",null,"For recursive definitions, we can force the name of the parameter on which we do structural recursion using the attribute ",(0,o.kt)("inlineCode",{parentName:"p"},'[@coq_struct "name"]'),". This has the same effect as the ",(0,o.kt)("inlineCode",{parentName:"p"},"{struct name}")," keyword in Coq. For example, we translate:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ocaml"},'let[@coq_struct "accumulator"] rec length l accumulator =\n  match l with\n  | [] -> accumulator\n  | _ :: l -> length l (accumulator + 1)\n')),(0,o.kt)("p",null,"to:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-coq"},"Fixpoint length {A : Set} (l : list A) (accumulator : Z) {struct accumulator}\n  : Z :=\n  match l with\n  | [] => accumulator\n  | cons _ l => length l (Z.add accumulator 1)\n  end.\n")),(0,o.kt)("p",null,"which is invalid in Coq as the decreasing argument is ",(0,o.kt)("inlineCode",{parentName:"p"},"l"),"."),(0,o.kt)("h2",{id:"coq_tag_gadt"},"coq_tag_gadt"),(0,o.kt)("p",null,"We use this tag in order to generate GADTs with a closer semantics to OCaml. Using this tag we translate the following code:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ocaml"},"type 'a term =\n  | T_Int : int -> int term\n  | T_String : string -> string term\n  | T_Sum : int term * int term -> int term\n[@@coq_tag_gadt]\n")),(0,o.kt)("p",null,"to:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-coq"},"Inductive term : vtag -> Set :=\n| T_Int : int -> term int_tag\n| T_String : string -> term string_tag\n| T_Sum : term int_tag -> term int_tag -> term int_tag.\n")),(0,o.kt)("p",null,"To see its usefulness translating impossible branches without extra axioms check ",(0,o.kt)("inlineCode",{parentName:"p"},"coq_tagged_match")),(0,o.kt)("h2",{id:"coq_tagged_match"},"coq_tagged_match"),(0,o.kt)("p",null,"With the ",(0,o.kt)("inlineCode",{parentName:"p"},"coq_tag_gadt")," attribute we can translate OCaml code closer to its actual semantics. This allows us to translate pattern matches with impossible branches without the use of axioms. For example:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ocaml"},"type 'a term =\n  | Int : int -> int term\n  | String : string -> string term\n  | Sum : int term * int term -> int term\n[@@coq_tag_gadt]\n\nlet rec get_int (e : int term) : int =\n  match[@coq_tagged_match][@coq_match_with_default] e with\n  | Int n -> n\n  | Sum (e1, e2) -> get_int e1 + get_int e2\n  | _ -> .\n")),(0,o.kt)("p",null,"Will be translated to:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-coq"},"Inductive term : vtag -> Set :=\n| Int : int -> term int_tag\n| String : string -> term string_tag\n| Sum : term int_tag -> term int_tag -> term int_tag.\n\nFixpoint get_int (e : term int_tag) : int :=\n  match e in term t0 return t0 = int_tag -> int with\n  | Int n => fun eq0 => ltac:(subst; exact n)\n  | Sum e1 e2 =>\n    fun eq0 => ltac:(subst; exact (Z.add (get_int e1) (get_int e2)))\n  | _ => ltac:(discriminate)\n  end eq_refl.\n")),(0,o.kt)("p",null,"Notice that without the use of tags we would have the following code instead:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-coq"},"Inductive term : Set :=\n| Int : int -> term\n| String : string -> term\n| Sum : expr -> expr -> term\n| Pair : expr -> expr -> term.\n\n\nFixpoint get_int (e : term) : int :=\n  match e with\n  | Int n => n\n  | Sum e1 e2 => Z.add (get_int e1) (get_int e2)\n  | _ => unreachable_gadt_branch\n  end.\n")),(0,o.kt)("p",null,"As we can see this naive translation uses the ",(0,o.kt)("inlineCode",{parentName:"p"},"unreachable_gadt_branch")," axiom."),(0,o.kt)("h2",{id:"coq_type_annotation"},"coq_type_annotation"),(0,o.kt)("p",null,"Sometimes we need to add a type annotation on an expression, either as a documentation or to help the Coq code to compile. We translate this OCaml example:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ocaml"},"let n1 =\n  let m = 12 in\n  let n1 = m[@coq_type_annotation] in\n  n1\n")),(0,o.kt)("p",null,"to:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-coq"},"Definition n1 : int :=\n  let m := 12 in\n  let n1 := (m : int) in\n  n1.\n")),(0,o.kt)("p",null,"where we add an annotation ",(0,o.kt)("inlineCode",{parentName:"p"},": int")," on the expression ",(0,o.kt)("inlineCode",{parentName:"p"},"m"),". The type we use for the annotation is the type inferred by the OCaml compiler."))}m.isMDXComponent=!0}}]);