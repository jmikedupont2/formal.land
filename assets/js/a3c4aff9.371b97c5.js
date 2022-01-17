"use strict";(self.webpackChunkformal_land=self.webpackChunkformal_land||[]).push([[3467],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return m}});var a=n(7294);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function l(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function r(e,t){if(null==e)return{};var n,a,i=function(e,t){if(null==e)return{};var n,a,i={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var s=a.createContext({}),d=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):l(l({},t),e)),n},p=function(e){var t=d(e.components);return a.createElement(s.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},c=a.forwardRef((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,s=e.parentName,p=r(e,["components","mdxType","originalType","parentName"]),c=d(n),m=i,h=c["".concat(s,".").concat(m)]||c[m]||u[m]||o;return n?a.createElement(h,l(l({ref:t},p),{},{components:n})):a.createElement(h,l({ref:t},p))}));function m(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,l=new Array(o);l[0]=c;var r={};for(var s in t)hasOwnProperty.call(t,s)&&(r[s]=t[s]);r.originalType=e,r.mdxType="string"==typeof e?e:i,l[1]=r;for(var d=2;d<o;d++)l[d]=n[d];return a.createElement.apply(null,l)}return a.createElement.apply(null,n)}c.displayName="MDXCreateElement"},5455:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return r},contentTitle:function(){return s},metadata:function(){return d},toc:function(){return p},default:function(){return c}});var a=n(7462),i=n(3366),o=(n(7294),n(3905)),l=["components"],r={id:"cookbook",title:"Cookbook"},s=void 0,d={unversionedId:"coq-of-ocaml/cookbook",id:"coq-of-ocaml/cookbook",isDocsHomePage:!1,title:"Cookbook",description:"Here we list typical situations where we need to change the OCaml source code so that the translated code compiles in Coq.",source:"@site/docs/coq-of-ocaml/cookbook.md",sourceDirName:"coq-of-ocaml",slug:"/coq-of-ocaml/cookbook",permalink:"/docs/coq-of-ocaml/cookbook",tags:[],version:"current",frontMatter:{id:"cookbook",title:"Cookbook"},sidebar:"sidebar",previous:{title:"Run",permalink:"/docs/coq-of-ocaml/run"},next:{title:"OCaml core",permalink:"/docs/coq-of-ocaml/ocaml-core"}},p=[{value:"Abstractions in <code>.mli</code> files",id:"abstractions-in-mli-files",children:[]},{value:"Fixpoint struct annotations",id:"fixpoint-struct-annotations",children:[]},{value:"Ignored functions",id:"ignored-functions",children:[]},{value:"Mutual definitions as notations",id:"mutual-definitions-as-notations",children:[]},{value:"Named signatures",id:"named-signatures",children:[]},{value:"Named polymorphic variant types",id:"named-polymorphic-variant-types",children:[]},{value:"Nested anonymous signatures",id:"nested-anonymous-signatures",children:[]},{value:"Non-mutually recursive types",id:"non-mutually-recursive-types",children:[]},{value:"Top-level name collisions",id:"top-level-name-collisions",children:[]}],u={toc:p};function c(e){var t=e.components,n=(0,i.Z)(e,l);return(0,o.kt)("wrapper",(0,a.Z)({},u,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("p",null,"Here we list typical situations where we need to change the OCaml source code so that the translated code compiles in Coq."),(0,o.kt)("h2",{id:"abstractions-in-mli-files"},"Abstractions in ",(0,o.kt)("inlineCode",{parentName:"h2"},".mli")," files"),(0,o.kt)("p",null,"When generating the Coq code, we do not use the notion of ",(0,o.kt)("inlineCode",{parentName:"p"},".mli")," because there are no such interface files in Coq. So the typical setup is to generate a ",(0,o.kt)("inlineCode",{parentName:"p"},".v")," file for each ",(0,o.kt)("inlineCode",{parentName:"p"},".ml")," file, and only translate the ",(0,o.kt)("inlineCode",{parentName:"p"},".mli")," files of the external dependencies to axiom files."),(0,o.kt)("p",null,"An issue in this process is that there can be differences between what a ",(0,o.kt)("inlineCode",{parentName:"p"},".v")," file sees and what a ",(0,o.kt)("inlineCode",{parentName:"p"},".ml")," file was seeing. For example, let us say that we have the following files:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"a.ml"),":")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ocaml"},"module type S = sig\n  val pub : int -> int\nend\n\nmodule type S_internal = sig\n  val pub : int -> int\n  val priv : int -> int\nend\n\nmodule M : S_internal = struct\n  let pub x = x + 1\n  let priv x = x - 1\nend\n")),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"a.mli"),":")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ocaml"},"module type S = sig\n  val pub : int -> int\nend\n\nmodule M : S\n")),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("inlineCode",{parentName:"li"},"b.ml"),":")),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ocaml"},"let f x = A.M.pub x\n")),(0,o.kt)("p",null,"Then from the point of view of ",(0,o.kt)("inlineCode",{parentName:"p"},"b.ml"),", ",(0,o.kt)("inlineCode",{parentName:"p"},"A.M")," is of signature ",(0,o.kt)("inlineCode",{parentName:"p"},"A.S")," and there are no ways to know about ",(0,o.kt)("inlineCode",{parentName:"p"},"A.S_internal"),". However, in Coq, since we did not translate the ",(0,o.kt)("inlineCode",{parentName:"p"},".mli")," file, ",(0,o.kt)("inlineCode",{parentName:"p"},"A.M")," appears as having the signature ",(0,o.kt)("inlineCode",{parentName:"p"},"S_internal"),". Since we translate signatures to records, which do not have the notion of inclusion, ",(0,o.kt)("inlineCode",{parentName:"p"},"A.M")," does not have the same type in Coq and OCaml. This can introduce bugs when we translate a signature annotation ",(0,o.kt)("inlineCode",{parentName:"p"},"S")," to Coq, as Coq expects a signature ",(0,o.kt)("inlineCode",{parentName:"p"},"S_internal"),"."),(0,o.kt)("p",null,"A solution for this issue is to open the abstraction in ",(0,o.kt)("inlineCode",{parentName:"p"},"a.mli")," by using the signature ",(0,o.kt)("inlineCode",{parentName:"p"},"S_internal")," instead of ",(0,o.kt)("inlineCode",{parentName:"p"},"S"),". A general solution on the side of ",(0,o.kt)("inlineCode",{parentName:"p"},"coq-of-ocaml")," would be to translate the ",(0,o.kt)("inlineCode",{parentName:"p"},".mli")," to ",(0,o.kt)("inlineCode",{parentName:"p"},".v")," files doing the plumbing from ",(0,o.kt)("inlineCode",{parentName:"p"},"S")," to ",(0,o.kt)("inlineCode",{parentName:"p"},"S_internal"),". We have not done that yet, because of lack of time and because we believe that having ",(0,o.kt)("inlineCode",{parentName:"p"},".v")," files to do plumbing can also have a cost for the proofs."),(0,o.kt)("h2",{id:"fixpoint-struct-annotations"},"Fixpoint struct annotations"),(0,o.kt)("p",null,"In Coq, fixpoints (recursive functions) must be structurally decreasing on one of the arguments to make sure that the function always terminates. When structural termination is not obvious, we can disable this check with the configuration option ",(0,o.kt)("a",{parentName:"p",href:"configuration#without_guard_checking"},"without_guard_checking"),". However, Coq still requires to consider one of the parameters as the decreasing one, even if this is not structurally the case. A decreasing parameter is still required to know how far to unfold recursive definitions while doing proofs."),(0,o.kt)("p",null,"The way to specify the decreasing parameter is to use the attribute ",(0,o.kt)("a",{parentName:"p",href:"attributes#coq_struct"},"coq_struct"),". For example we annotate the operator ",(0,o.kt)("inlineCode",{parentName:"p"},"--\x3e")," as follows:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ocaml"},'let[@coq_struct "i"] rec ( --\x3e ) i j =\n  (* [i; i+1; ...; j] *)\n  if Compare.Int.(i > j) then [] else i :: (succ i --\x3e j)\n')),(0,o.kt)("p",null,"Here ",(0,o.kt)("inlineCode",{parentName:"p"},"i")," is decreasing when we consider the natural order on ",(0,o.kt)("inlineCode",{parentName:"p"},"-i"),". This generates the following Coq code:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-coq"},"Fixpoint op_minusminusgt (i : int) (j : int) {struct i} : list int :=\n  if i >i j then\n    nil\n  else\n    cons i (op_minusminusgt (Pervasives.succ i) j).\n")),(0,o.kt)("p",null,"The annotation ",(0,o.kt)("inlineCode",{parentName:"p"},"{struct i}")," specifies in Coq that the decreasing parameter is ",(0,o.kt)("inlineCode",{parentName:"p"},"i"),"."),(0,o.kt)("h2",{id:"ignored-functions"},"Ignored functions"),(0,o.kt)("p",null,"Sometimes definitions are too complex to translate to Coq, but we still want to go on with the rest of the files. A solution is to add the ",(0,o.kt)("a",{parentName:"p",href:"attributes#coq_axiom_with_reason"},"coq_axiom_with_reason")," to ignore a definition and replace it with an axiom of the same type."),(0,o.kt)("p",null,"For example, the following definition would not work in Coq as is it is, due to the use of GADTs:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ocaml"},"  let fold_all f set acc =\n    List.fold_left\n      (fun acc (_, Ex_Kind kind) -> fold kind (f.f kind) set acc)\n      acc\n      all\n")),(0,o.kt)("p",null,"We then add the attribute ",(0,o.kt)("inlineCode",{parentName:"p"},"@coq_axiom_with_reason"),":"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ocaml"},'let fold_all f set acc =\n    List.fold_left\n      (fun acc (_, Ex_Kind kind) -> fold kind (f.f kind) set acc)\n      acc\n      all\n    [@@coq_axiom_with_reason "gadt"]\n')),(0,o.kt)("p",null,"This generates the following Coq code:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-coq"},"Axiom fold_all : forall {A : Set}, fold_f A -> t -> A -> A.\n")),(0,o.kt)("p",null,"which compiles and has the right type, even if we lost the translation of the body of ",(0,o.kt)("inlineCode",{parentName:"p"},"fold_all"),". With this attribute we must add a reason, so that we document we chose to introduce an axiom. Among frequent reasons are the use of GADTs and complex recursive functions."),(0,o.kt)("h2",{id:"mutual-definitions-as-notations"},"Mutual definitions as notations"),(0,o.kt)("p",null,"Sometimes mutual definitions for a recursive function are used more as notations rather than to express a true mutual recursion. See the attribute ",(0,o.kt)("a",{parentName:"p",href:"attributes#coq_mutual_as_notation"},"coq_mutual_as_notation")," for more details about how to handle this kind of definition. Here is an example where this attribute is needed:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ocaml"},"let rec double_list l =\n  match l with\n  | [] -> l\n  | n :: l -> double n :: double_list l\n\nand[@coq_mutual_as_notation] double n = 2 * n\n")),(0,o.kt)("p",null,"which translates in Coq to:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-coq"},"Reserved Notation \"'double\".\n\nFixpoint double_list (l : list int) : list int :=\n  let double := 'double in\n  match l with\n  | [] => l\n  | cons n l => cons (double n) (double_list l)\n  end\n\nwhere \"'double\" := (fun (n : int) => Z.mul 2 n).\n\nDefinition double := 'double.\n")),(0,o.kt)("h2",{id:"named-signatures"},"Named signatures"),(0,o.kt)("p",null,"We translate modules used in functors as records in Coq. We require a name for the signatures to have a name for the corresponding records. Sometimes, in OCaml, when a signature is used just once it is inlined and not named. Here is an example of code with an anonymous signature for the return signature of the functor ",(0,o.kt)("inlineCode",{parentName:"p"},"Make_indexed_carbonated_data_storage"),":"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ocaml"},"module Make_indexed_carbonated_data_storage\n    (C : Raw_context.T)\n    (I : INDEX)\n    (V : VALUE) : sig\n  include\n    Non_iterable_indexed_carbonated_data_storage\n      with type t = C.t\n       and type key = I.t\n       and type value = V.t\n\n  val list_values :\n    ?offset:int ->\n    ?length:int ->\n    C.t ->\n    (Raw_context.t * V.t list) tzresult Lwt.t\nend = struct\n  include Make_indexed_carbonated_data_storage_INTERNAL (C) (I) (V)\nend\n")),(0,o.kt)("p",null,"This generates the following error message in ",(0,o.kt)("inlineCode",{parentName:"p"},"coq-of-ocaml"),":"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"--- storage_functors.ml:527:19 --------------------------------------------- not_supported (1/1) ---\n\n  525 |     (C : Raw_context.T)\n  526 |     (I : INDEX)\n> 527 |     (V : VALUE) : sig\n> 528 |   include\n> 529 |     Non_iterable_indexed_carbonated_data_storage\n> 530 |       with type t = C.t\n> 531 |        and type key = I.t\n> 532 |        and type value = V.t\n> 533 | \n> 534 |   val list_values :\n> 535 |     ?offset:int ->\n> 536 |     ?length:int ->\n> 537 |     C.t ->\n> 538 |     (Raw_context.t * V.t list) tzresult Lwt.t\n> 539 | end = struct\n  540 |   include Make_indexed_carbonated_data_storage_INTERNAL (C) (I) (V)\n  541 | end\n  542 | \n\n\nAnonymous definition of signatures is not handled\n")),(0,o.kt)("p",null,"We replace it by the following OCaml code, which translates into Coq without errors:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ocaml"},"module type Non_iterable_indexed_carbonated_data_storage_with_values = sig\n  include Non_iterable_indexed_carbonated_data_storage\n\n  val list_values :\n    ?offset:int ->\n    ?length:int ->\n    t ->\n    (Raw_context.t * value list) tzresult Lwt.t\nend\n\nmodule Make_indexed_carbonated_data_storage\n    (C : Raw_context.T)\n    (I : INDEX)\n    (V : VALUE) :\n  Non_iterable_indexed_carbonated_data_storage_with_values\n    with type t = C.t\n     and type key = I.t\n     and type value = V.t = struct\n  include Make_indexed_carbonated_data_storage_INTERNAL (C) (I) (V)\nend\n")),(0,o.kt)("p",null,"There we named the return signature of the functor ",(0,o.kt)("inlineCode",{parentName:"p"},"Non_iterable_indexed_carbonated_data_storage_with_values"),"."),(0,o.kt)("h2",{id:"named-polymorphic-variant-types"},"Named polymorphic variant types"),(0,o.kt)("p",null,"In the following OCaml code, the type of the parameter ",(0,o.kt)("inlineCode",{parentName:"p"},"depth")," is a polymorphic variant type:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ocaml"},"val fold :\n  ?depth:[`Eq of int | `Le of int | `Lt of int | `Ge of int | `Gt of int] ->\n  t ->\n  key ->\n  init:'a ->\n  f:(key -> tree -> 'a -> 'a Lwt.t) ->\n  'a Lwt.t\n")),(0,o.kt)("p",null,"We do not handle this kind of type in ",(0,o.kt)("inlineCode",{parentName:"p"},"coq-of-ocaml"),", because there are no clear equivalent features in Coq. In most of the code, we would replace this declaration with an algebraic datatype as follows:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ocaml"},"type depth =\n  | Eq of int\n  | Le of int\n  | Lt of int\n  | Ge of int\n  | Gt of int\n\nval fold :\n  ?depth:depth ->\n  t ->\n  key ->\n  init:'a ->\n  f:(key -> tree -> 'a -> 'a Lwt.t) ->\n  'a Lwt.t\n")),(0,o.kt)("p",null,"Sometimes it is not possible to do this kind of change, for backward compatibility of an API for example. In this case we name the polymorphic variant type:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ocaml"},"type depth = [`Eq of int | `Le of int | `Lt of int | `Ge of int | `Gt of int]\n\nval fold :\n  ?depth:depth ->\n  t ->\n  key ->\n  init:'a ->\n  f:(key -> tree -> 'a -> 'a Lwt.t) ->\n  'a Lwt.t\n")),(0,o.kt)("p",null,"We translate the definition of ",(0,o.kt)("inlineCode",{parentName:"p"},"depth")," as if it was an algebraic datatype:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-coq"},"Inductive depth : Set :=\n| Ge : int -> depth\n| Lt : int -> depth\n| Eq : int -> depth\n| Le : int -> depth\n| Gt : int -> depth.\n")),(0,o.kt)("p",null,"Then, using the configuration parameters ",(0,o.kt)("a",{parentName:"p",href:"configuration#variant_constructors"},"variant_constructors")," and ",(0,o.kt)("a",{parentName:"p",href:"configuration#variant_types"},"variant_types"),", we instruct ",(0,o.kt)("inlineCode",{parentName:"p"},"coq-of-ocaml")," to recognize that there is a type ",(0,o.kt)("inlineCode",{parentName:"p"},"depth")," whenever it finds a constructor ",(0,o.kt)("inlineCode",{parentName:"p"}," `Eq"),", ..., or ",(0,o.kt)("inlineCode",{parentName:"p"}," `Gt")," in the OCaml code."),(0,o.kt)("h2",{id:"nested-anonymous-signatures"},"Nested anonymous signatures"),(0,o.kt)("p",null,"There is support for nested anonymous signatures in ",(0,o.kt)("inlineCode",{parentName:"p"},"coq-of-ocaml"),", but this often does not work well for various reasons. The key reason is that we translate signatures to records, which can only be flat. An example of a nested anonymous signature is the following:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ocaml"},"module type TitleWithId = sig\n  val title : string\n\n  module Id : sig\n    include ID\n\n    module Temp : Temp_id with type t = private t\n  end\n\n  module IdSet : Set.S with type elt = Id.t\nend\n")),(0,o.kt)("p",null,"Here the signature of ",(0,o.kt)("inlineCode",{parentName:"p"},"Id")," is anonymous and nested in the signature ",(0,o.kt)("inlineCode",{parentName:"p"},"TitleWithId"),". By default, ",(0,o.kt)("inlineCode",{parentName:"p"},"coq-of-ocaml")," will try to prefix all the fields of the sub-module ",(0,o.kt)("inlineCode",{parentName:"p"},"Id")," by ",(0,o.kt)("inlineCode",{parentName:"p"},"Id_")," and flatten these fields into the fields of ",(0,o.kt)("inlineCode",{parentName:"p"},"TitleWithId"),":"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-coq"},"Module TitleWithId.\n  Record signature {Id_t IdSet_t : Set} : Set := {\n    title : string;\n    Id_t := Id_t;\n    Id_compare : Id_t -> Id_t -> int;\n    (* ... included fields from [ID] *)\n    Id_Temp : Temp_id (t := t); (* there is an error: should be [(t := Id_t)] *)\n    IdSet : _Set.S (elt := Id.(IdWithTemp.t)) (t := IdSet_t);\n  }.\nEnd TitleWithId.\nDefinition TitleWithId := @TitleWithId.signature.\nArguments TitleWithId {_ _}.\n")),(0,o.kt)("p",null,"This works well if ",(0,o.kt)("inlineCode",{parentName:"p"},"Id")," is used as a namespace in ",(0,o.kt)("inlineCode",{parentName:"p"},"TitleWithId")," to group the fields in different categories. However, this fails if we aim to directly reference the sub-module ",(0,o.kt)("inlineCode",{parentName:"p"},"Id")," later on."),(0,o.kt)("p",null,"A better solution is often to name the anonymous sub-signatures, by doing:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ocaml"},"module type IdWithTemp = sig\n  include ID\n\n  module Temp : Temp_id with type t = private t\nend\n\nmodule type TitleWithId = sig\n  val title : string\n\n  module Id : IdWithTemp\n\n  module IdSet : Set.S with type elt = Id.t\nend\n")),(0,o.kt)("p",null,"The translation is then:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-coq"},"Module IdWithTemp.\n  Record signature {t : Set} : Set := {\n    t := t;\n    compare : t -> t -> int;\n    (* ... included fields from [ID] *)\n    Temp : Temp_id (t := t);\n  }.\nEnd IdWithTemp.\nDefinition IdWithTemp := @IdWithTemp.signature.\nArguments IdWithTemp {_}.\n\nModule TitleWithId.\n  Record signature {Id_t IdSet_t : Set} : Set := {\n    title : string;\n    Id : IdWithTemp (t := Id_t);\n    IdSet : _Set.S (elt := Id.(IdWithTemp.t)) (t := IdSet_t);\n  }.\nEnd TitleWithId.\nDefinition TitleWithId := @TitleWithId.signature.\nArguments TitleWithId {_ _}.\n")),(0,o.kt)("h2",{id:"non-mutually-recursive-types"},"Non-mutually recursive types"),(0,o.kt)("p",null,"Sometimes, because this is convenient, we use the syntax ",(0,o.kt)("inlineCode",{parentName:"p"},"type ... and")," for types which are not mutually dependent. For example, we could write in OCaml:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ocaml"},"type 'a matching_function = 'a -> match_result\n\nand match_result = (string * int option) list\n")),(0,o.kt)("p",null,"to show the definition of ",(0,o.kt)("inlineCode",{parentName:"p"},"matching_function")," first. This example would not work in Coq because mutually recursive definitions have to be with at least one algebraic type definition. Even for cases where the translation works, having too many mutually recursive type definitions may complexify the proofs."),(0,o.kt)("p",null,"For all these reasons, it is better to only use the ",(0,o.kt)("inlineCode",{parentName:"p"},"and")," keyword for types that are truly mutually recursive. In this case, we rewrite our example as:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ocaml"},"type match_result = (string * int option) list\n\ntype 'a matching_function = 'a -> match_result\n")),(0,o.kt)("h2",{id:"top-level-name-collisions"},"Top-level name collisions"),(0,o.kt)("p",null,"In Coq, it is not possible to have two definitions of the same name at top-level. For example, if we translate the following OCaml code:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ocaml"},'let path = RPC_path.(open_root / "context" / "delegates")\n\nlet path = RPC_path.(path /: Signature.Public_key_hash.rpc_arg)\n')),(0,o.kt)("p",null,"we get in Coq:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-coq"},'Definition path : RPC_path.path Updater.rpc_context Updater.rpc_context :=\n  RPC_path.op_div (RPC_path.op_div RPC_path.open_root "context") "delegates".\n\nDefinition path\n  : RPC_path.path Updater.rpc_context\n    (Updater.rpc_context * Signature.public_key_hash) :=\n  RPC_path.op_divcolon path\n    Signature.Public_key_hash.(S.SIGNATURE_PUBLIC_KEY_HASH.rpc_arg).\n')),(0,o.kt)("p",null,"which generates the error:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre"},"Error: path already exists.\n")),(0,o.kt)("p",null,"A solution is to rename one of the two paths in OCaml:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-ocaml"},'let raw_path = RPC_path.(open_root / "context" / "delegates")\n\nlet path = RPC_path.(raw_path /: Signature.Public_key_hash.rpc_arg)\n')),(0,o.kt)("p",null,"This kind of situation can also happen when including modules. For example, there is a collision if an included module has names that already exist at the current level. We believe this is a good thing that Coq forbids redefining names at top-level. So using ",(0,o.kt)("inlineCode",{parentName:"p"},"coq-of-ocaml")," can be a good thing to forbid this practice in OCaml. Note however that it is still possible to redefine names inside an expression in Coq."))}c.isMDXComponent=!0}}]);