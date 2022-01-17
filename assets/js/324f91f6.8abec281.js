"use strict";(self.webpackChunkformal_land=self.webpackChunkformal_land||[]).push([[7076],{3905:function(e,t,n){n.d(t,{Zo:function(){return d},kt:function(){return m}});var a=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function r(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,a,o=function(e,t){if(null==e)return{};var n,a,o={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var s=a.createContext({}),u=function(e){var t=a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):r(r({},t),e)),n},d=function(e){var t=u(e.components);return a.createElement(s.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return a.createElement(a.Fragment,{},t)}},c=a.forwardRef((function(e,t){var n=e.components,o=e.mdxType,l=e.originalType,s=e.parentName,d=i(e,["components","mdxType","originalType","parentName"]),c=u(n),m=o,h=c["".concat(s,".").concat(m)]||c[m]||p[m]||l;return n?a.createElement(h,r(r({ref:t},d),{},{components:n})):a.createElement(h,r({ref:t},d))}));function m(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var l=n.length,r=new Array(l);r[0]=c;var i={};for(var s in t)hasOwnProperty.call(t,s)&&(i[s]=t[s]);i.originalType=e,i.mdxType="string"==typeof e?e:o,r[1]=i;for(var u=2;u<l;u++)r[u]=n[u];return a.createElement.apply(null,r)}return a.createElement.apply(null,n)}c.displayName="MDXCreateElement"},5058:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return i},contentTitle:function(){return s},metadata:function(){return u},toc:function(){return d},default:function(){return c}});var a=n(7462),o=n(3366),l=(n(7294),n(3905)),r=["components"],i={id:"module-system",title:"Module system"},s=void 0,u={unversionedId:"coq-of-ocaml/module-system",id:"coq-of-ocaml/module-system",isDocsHomePage:!1,title:"Module system",description:"To handle the module system of OCaml, the compiler coq-of-ocaml generates either plain Coq modules or dependent records. It never generates Coq functors or module types. You can use coq-of-ocaml to translate modules, module types, functors and first-class modules.",source:"@site/docs/coq-of-ocaml/module-system.md",sourceDirName:"coq-of-ocaml",slug:"/coq-of-ocaml/module-system",permalink:"/docs/coq-of-ocaml/module-system",tags:[],version:"current",frontMatter:{id:"module-system",title:"Module system"},sidebar:"sidebar",previous:{title:"Type definitions",permalink:"/docs/coq-of-ocaml/type-definitions"},next:{title:"GADTs",permalink:"/docs/coq-of-ocaml/gadts"}},d=[{value:"General mechanism",id:"general-mechanism",children:[{value:"Example",id:"example",children:[]},{value:"Finding names",id:"finding-names",children:[]},{value:"Bundled vs unbundled",id:"bundled-vs-unbundled",children:[]}]},{value:"Signatures",id:"signatures",children:[]},{value:"Modules",id:"modules",children:[{value:"Existential tuples",id:"existential-tuples",children:[]},{value:"Projections",id:"projections",children:[]}]},{value:"Include",id:"include",children:[]},{value:"Functors",id:"functors",children:[]},{value:"First-class modules",id:"first-class-modules",children:[]}],p={toc:d};function c(e){var t=e.components,n=(0,o.Z)(e,r);return(0,l.kt)("wrapper",(0,a.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,l.kt)("p",null,"To handle the module system of OCaml, the compiler ",(0,l.kt)("inlineCode",{parentName:"p"},"coq-of-ocaml")," generates either plain Coq modules or dependent records. It never generates Coq functors or module types. You can use ",(0,l.kt)("inlineCode",{parentName:"p"},"coq-of-ocaml")," to translate modules, module types, functors and first-class modules."),(0,l.kt)("h2",{id:"general-mechanism"},"General mechanism"),(0,l.kt)("h3",{id:"example"},"Example"),(0,l.kt)("p",null,"The following code:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-ocaml"},"module MyModuleForNamespacing = struct\n  let foo x = x + 1\n  let bar = 12\nend\n\nmodule type COMPARABLE = sig\n  type t\n  val compare : t -> t -> int\nend\n\nmodule InstanceToUseInFunctors = struct\n  type t = string\n  let compare = String.compare\nend\n")),(0,l.kt)("p",null,"is translated to:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-coq"},"Module MyModuleForNamespacing.\n  Definition foo (x : Z) : Z := Z.add x 1.\n  \n  Definition bar : Z := 12.\nEnd MyModuleForNamespacing.\n\nModule COMPARABLE.\n  Record signature {t : Set} := {\n    t := t;\n    compare : t -> t -> Z;\n  }.\n  Arguments signature : clear implicits.\nEnd COMPARABLE.\n\nDefinition InstanceToUseInFunctors :=\n  let t := string in\n  let compare := Stdlib.String.compare in\n  existT (fun _ => _) tt\n    {|\n      COMPARABLE.compare := compare\n    |}.\n")),(0,l.kt)("p",null,"We use a plain module for ",(0,l.kt)("inlineCode",{parentName:"p"},"MyModuleForNamespacing")," as we think it will not be used in functors or first-class modules. We translate the module type ",(0,l.kt)("inlineCode",{parentName:"p"},"COMPARABLE")," to a record parametrized by ",(0,l.kt)("inlineCode",{parentName:"p"},"t")," as this type is abstract. The ",(0,l.kt)("inlineCode",{parentName:"p"},"InstanceToUseInFunctors")," is translated to a dependent record of type ",(0,l.kt)("inlineCode",{parentName:"p"},"COMPARABLE.signature")," as it may by used as a parameter for a functor for example. We will see how we determine that a module should translates to a record."),(0,l.kt)("h3",{id:"finding-names"},"Finding names"),(0,l.kt)("p",null,"The heuristic is to represent a module by a dependent record if and only if it has a named signature. The name of the signature is then the name of the record type. Each signature is translated to a record type."),(0,l.kt)("p",null,"The OCaml modules are structurally typed while the Coq records are nominally typed. Thus a large part of the conversion effort is dedicated to the naming of signatures. A signature is named by exploring the environment to find a similar signature definition with its name. Two signatures are deemed similar if they share the same list of names of values and sub-modules at top-level. We do not check for type names or values as they could be removed or changed by the use of type substitutions (operators ",(0,l.kt)("inlineCode",{parentName:"p"},"with type t = ...")," and ",(0,l.kt)("inlineCode",{parentName:"p"},"with type t := ..."),"). We only check top-level names for efficiency reasons, and because exploring sub-modules resulted in errors in some cases."),(0,l.kt)("p",null,"We generate an error message when multiple names are found for a signature. For example with:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-ocaml"},'module type S1 = sig\n  val v : string\nend\n\nmodule type S2 = sig\n  val v : int\nend\n\nmodule M = struct\n  let v = "hi"\nend\n')),(0,l.kt)("p",null,"the module ",(0,l.kt)("inlineCode",{parentName:"p"},"M")," could have the signatures ",(0,l.kt)("inlineCode",{parentName:"p"},"S1")," or ",(0,l.kt)("inlineCode",{parentName:"p"},"S2")," as we only look at the value names, so we output the error:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-text"},'   7 | end\n   8 | \n>  9 | module M = struct\n  10 |   let v = "hi"\n  11 | end\n  12 | \n\n\nIt is unclear which name has this signature. At least two similar\nsignatures found, namely:\nS2, S1\n\nWe were looking for a module signature name for the following shape:\n[ v ]\n(a shape is a list of names of values and sub-modules)\n\nWe use the concept of shape to find the name of a signature for Coq.\n')),(0,l.kt)("p",null,"To discriminate between two similar signatures, you can add a dummy tag field. With:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-ocaml"},'module type S1 = sig\n  val this_is_S1 : unit\n  val v : string\nend\n\nmodule type S2 = sig\n  val this_is_S2 : unit\n  val v : int\nend\n\nmodule M = struct\n  let this_is_S1 = ()\n  let v = "hi"\nend\n')),(0,l.kt)("p",null,(0,l.kt)("inlineCode",{parentName:"p"},"coq-of-ocaml")," generates without errors:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-coq"},'Module S1.\n  Record signature := {\n    this_is_S1 : unit;\n    v : string;\n  }.\nEnd S1.\n\nModule S2.\n  Record signature := {\n    this_is_S2 : unit;\n    v : Z;\n  }.\nEnd S2.\n\nDefinition M :=\n  let this_is_S1 := tt in\n  let v := "hi" in\n  existT (fun _ => _) tt\n    {|\n      S1.this_is_S1 := this_is_S1;\n      S1.v := v\n    |}.\n')),(0,l.kt)("p",null,"If no signatures are found, the module ",(0,l.kt)("inlineCode",{parentName:"p"},"M")," is translated to a plain Coq module:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-ocaml"},'module type S = sig\n  val v : string\nend\n\nmodule M = struct\n  let not_v = "hi"\nend\n')),(0,l.kt)("p",null,"generates:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-coq"},'Module S.\n  Record signature := {\n    v : string;\n  }.\nEnd S.\n\nModule M.\n  Definition not_v : string := "hi".\nEnd M.\n')),(0,l.kt)("h3",{id:"bundled-vs-unbundled"},"Bundled vs unbundled"),(0,l.kt)("p",null,"In OCaml modules may have some abstract types. In Coq we represent abstract types as type parameters for the records of the signatures. For module values, we instantiate known abstract types and use existential types for unknown abstract types. We always use a single existential ",(0,l.kt)("inlineCode",{parentName:"p"},"{... & ...}")," on the tuple of unknown types. If all types are known, we still use an existential on the empty tuple for uniformity."),(0,l.kt)("p",null,"We say that:"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"signatures are always unbundled (with universal types);"),(0,l.kt)("li",{parentName:"ul"},"module are always bundled (with existential types).")),(0,l.kt)("h2",{id:"signatures"},"Signatures"),(0,l.kt)("p",null,"Signatures can contain a mix of:"),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"abstract types (constant or polymorphic);"),(0,l.kt)("li",{parentName:"ul"},"type definitions as synonyms;"),(0,l.kt)("li",{parentName:"ul"},"values;"),(0,l.kt)("li",{parentName:"ul"},"sub-modules.")),(0,l.kt)("p",null,"A complex example is the following:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-ocaml"},"module type SubS = sig\n  type t\n  val v : t\n  type size\n  val n : size\nend\n\nmodule type S = sig\n  type 'a t\n  type int_t = int t\n  val numbers : int_t\n  module Sub : SubS with type t = int_t\n  val n : Sub.size\nend\n")),(0,l.kt)("p",null,"which gets translated to:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-coq"},"Module SubS.\n  Record signature {t size : Set} := {\n    t := t;\n    v : t;\n    size := size;\n    n : size;\n  }.\n  Arguments signature : clear implicits.\nEnd SubS.\n\nModule S.\n  Record signature {t : Set -> Set} {Sub_size : Set} := {\n    t := t;\n    int_t := t Z;\n    numbers : int_t;\n    Sub : SubS.signature int_t Sub_size;\n    n : Sub.(SubS.size);\n  }.\n  Arguments signature : clear implicits.\nEnd S.\n")),(0,l.kt)("p",null,"The signature ",(0,l.kt)("inlineCode",{parentName:"p"},"SubS")," has two abstract types ",(0,l.kt)("inlineCode",{parentName:"p"},"t")," and ",(0,l.kt)("inlineCode",{parentName:"p"},"size"),". We define two synonym record fields ",(0,l.kt)("inlineCode",{parentName:"p"},"t := t")," and ",(0,l.kt)("inlineCode",{parentName:"p"},"size := size")," for uniform access."),(0,l.kt)("p",null,"The signature ",(0,l.kt)("inlineCode",{parentName:"p"},"S")," is parametrized by its abstract type ",(0,l.kt)("inlineCode",{parentName:"p"},"t")," and the abstract type ",(0,l.kt)("inlineCode",{parentName:"p"},"Sub_size")," of its sub-module ",(0,l.kt)("inlineCode",{parentName:"p"},"Sub"),". The abstract type ",(0,l.kt)("inlineCode",{parentName:"p"},"t")," is polymorphic and of type ",(0,l.kt)("inlineCode",{parentName:"p"},"Set -> Set"),". The type synonym ",(0,l.kt)("inlineCode",{parentName:"p"},"int_t")," is defined as a synonym record field. The sub-module ",(0,l.kt)("inlineCode",{parentName:"p"},"Sub")," is a field of the record ",(0,l.kt)("inlineCode",{parentName:"p"},"S.signature")," and of type the record ",(0,l.kt)("inlineCode",{parentName:"p"},"SubS.signature"),". Its type parameter ",(0,l.kt)("inlineCode",{parentName:"p"},"t")," is instantiated by ",(0,l.kt)("inlineCode",{parentName:"p"},"int_t"),". Note that sub-module values appear as ",(0,l.kt)("em",{parentName:"p"},"unbundled")," records. This is the only case where module values are unbundled. We made this choice because the abstract types of the sub-module ",(0,l.kt)("inlineCode",{parentName:"p"},"Sub")," may be instantiated later as in:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-ocaml"},"S with type Sub.size = int\n")),(0,l.kt)("p",null,"Finally, a signature field such as ",(0,l.kt)("inlineCode",{parentName:"p"},"n")," can refer to a type defined in the sub-module ",(0,l.kt)("inlineCode",{parentName:"p"},"Sub"),"."),(0,l.kt)("h2",{id:"modules"},"Modules"),(0,l.kt)("p",null,"The modules with a named signature are represented as bundled dependent records. The abstract types are generally known at the moment of the definition, but may still be hidden by casting. For example, the following code:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-ocaml"},"module type Source = sig\n  type t\n  val x : t\nend\n\nmodule M_NoCast = struct\n  type t = int\n  let x = 12\nend\n\nmodule M_WithCast : Source = struct\n  type t = int\n  let x = 12\nend\n")),(0,l.kt)("p",null,"will generate:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-coq"},"Module Source.\n  Record signature {t : Set} := {\n    t := t;\n    x : t;\n  }.\n  Arguments signature : clear implicits.\nEnd Source.\n\nDefinition M_NoCast :=\n  let t := Z in\n  let x := 12 in\n  existT (fun _ => _) tt\n    {|\n      Source.x := x\n    |}.\n\nDefinition M_WithCast :=\n  let t := Z in\n  let x := 12 in\n  existT _ _\n    {|\n      Source.x := x\n    |}.\n")),(0,l.kt)("p",null,"The module ",(0,l.kt)("inlineCode",{parentName:"p"},"M_NoCast")," has no existential variables while the module ",(0,l.kt)("inlineCode",{parentName:"p"},"M_WithCast")," has one due to the cast to the ",(0,l.kt)("inlineCode",{parentName:"p"},"Source")," signature. This is visible in the use a ",(0,l.kt)("inlineCode",{parentName:"p"},"_")," to ask Coq to infer the value of this type, in place of a ",(0,l.kt)("inlineCode",{parentName:"p"},"tt")," to represent the absence of existential variables."),(0,l.kt)("h3",{id:"existential-tuples"},"Existential tuples"),(0,l.kt)("p",null,"In the presence of several existential variables we use tuples of types with primitive projections. Primitive projections help Coq to infer missing values in generated terms, so that we do not need to annotate too much module expressions. These tuples are a variant of the tuples of the standard library. We use the following notations:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-coq"},"[T1 * T2 * ... Tn] (* the type of a tuple *)\n[v1, v2, ..., vn]  (* the value of tuple *)\n")),(0,l.kt)("p",null,"A tuple of ",(0,l.kt)("em",{parentName:"p"},"n")," values is encoded as ",(0,l.kt)("em",{parentName:"p"},"n-1")," nested tuples of two values."),(0,l.kt)("h3",{id:"projections"},"Projections"),(0,l.kt)("p",null,"As modules are always bundled (unless in the case of sub-modules in signatures), we introduce a notation for the Coq projection ",(0,l.kt)("inlineCode",{parentName:"p"},"projT2"),":"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-coq"},"(|bundled_record|)\n")),(0,l.kt)("p",null,"Thus projections from modules encoded as a record:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-ocaml"},"let x = M_WithCast.x\n")),(0,l.kt)("p",null,"typically have this shape in Coq:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-coq"},"Definition x : (|M_WithCast|).(Source.t) := (|M_WithCast|).(Source.x).\n")),(0,l.kt)("p",null,"We did not add a notation for doing both the projection and the field access, as this would mess up with the inference for implicit variables in polymorphic fields."),(0,l.kt)("h2",{id:"include"},"Include"),(0,l.kt)("p",null,"Includes, either in signatures or modules, are generally inlined. For example, with signatures:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-ocaml"},"module type COMPARABLE = sig\n  type t\n  val compare : t -> t -> int\nend\n\nmodule type S = sig\n  include COMPARABLE\n  val ( = ) : t -> t -> bool\n  val ( <> ) : t -> t -> bool\n  val ( < ) : t -> t -> bool\n  val ( <= ) : t -> t -> bool\n  val ( >= ) : t -> t -> bool\n  val ( > ) : t -> t -> bool\n  val equal : t -> t -> bool\n  val max : t -> t -> t\n  val min : t -> t -> t\nend\n")),(0,l.kt)("p",null,"generates:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-coq"},"Module COMPARABLE.\n  Record signature {t : Set} := {\n    t := t;\n    compare : t -> t -> Z;\n  }.\n  Arguments signature : clear implicits.\nEnd COMPARABLE.\n\nModule S.\n  Record signature {t : Set} := {\n    t := t;\n    compare : t -> t -> Z;\n    op_eq : t -> t -> bool;\n    op_ltgt : t -> t -> bool;\n    op_lt : t -> t -> bool;\n    op_lteq : t -> t -> bool;\n    op_gteq : t -> t -> bool;\n    op_gt : t -> t -> bool;\n    equal : t -> t -> bool;\n    max : t -> t -> t;\n    min : t -> t -> t;\n  }.\n  Arguments signature : clear implicits.\nEnd S.\n")),(0,l.kt)("p",null,"Due to duplications, ",(0,l.kt)("inlineCode",{parentName:"p"},"coq-of-ocaml")," may generate Coq terms which are larger than the corresponding OCaml code. If you want to keep a generated Coq without duplications, we recommend you to use sub-modules rather than includes."),(0,l.kt)("h2",{id:"functors"},"Functors"),(0,l.kt)("p",null,"We represent functors as functions over bounded records. Here is the example of a functor declaration:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-ocaml"},"module Make (P : COMPARABLE) : (S with type t = P.t)\n")),(0,l.kt)("p",null,"generating:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-coq"},"Parameter Make :\n  forall (P : {t : _ & COMPARABLE.signature t}),\n    {_ : unit & S.signature (|P|).(COMPARABLE.t)}.\n")),(0,l.kt)("p",null,"We see that the return type of ",(0,l.kt)("inlineCode",{parentName:"p"},"Make")," is a dependent type depending on the value of the field ",(0,l.kt)("inlineCode",{parentName:"p"},"COMPARABLE.t")," of ",(0,l.kt)("inlineCode",{parentName:"p"},"P"),". A functor may also return another functor."),(0,l.kt)("p",null,"Here is an example of functor definition and application:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-ocaml"},"module type Source = sig\n  type t\n  val x : t\nend\n\nmodule type Target = sig\n  type t\n  val y : t\nend\n\nmodule F (X : Source) : Target with type t = X.t = struct\n  type t = X.t\n  let y = X.x\nend\n\nmodule M : Source = struct\n  type t = int\n  let x = 12\nend\n\nmodule N = F (M)\n")),(0,l.kt)("p",null,"generating:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-coq"},"Module Source.\n  Record signature {t : Set} := {\n    t := t;\n    x : t;\n  }.\n  Arguments signature : clear implicits.\nEnd Source.\n\nModule Target.\n  Record signature {t : Set} := {\n    t := t;\n    y : t;\n  }.\n  Arguments signature : clear implicits.\nEnd Target.\n\nDefinition F :=\n  fun (X : {t : _ & Source.signature t}) =>\n    (let t := (|X|).(Source.t) in\n    let y := (|X|).(Source.x) in\n    existT (fun _ => _) tt\n      {|\n        Target.y := y\n      |} : {_ : unit & Target.signature (|X|).(Source.t)}).\n\nDefinition M :=\n  let t := Z in\n  let x := 12 in\n  existT _ _\n    {|\n      Source.x := x\n    |}.\n\nDefinition N :=\n  F\n    (existT _ _\n      {|\n        Source.x := (|M|).(Source.x)\n      |}).\n")),(0,l.kt)("p",null,"Applications of functors are represented by standard function applications. We cast the module parameter to make sure he has the correct record type. We cast records by re-creating them with the right field names."),(0,l.kt)("h2",{id:"first-class-modules"},"First-class modules"),(0,l.kt)("p",null,"First-class modules are modules which appear as values in OCaml. The encoding to dependent records provides a perfect way to represent them in Coq. Here is an example from the Tezos source code:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-ocaml"},"module type Boxed_set = sig\n  type elt\n  val elt_ty : elt comparable_ty\n  module OPS : S.SET with type elt = elt\n  val boxed : OPS.t\n  val size : int\nend\n\ntype 'elt set = (module Boxed_set with type elt = 'elt)\n\nlet set_mem\n  : type elt. elt -> elt set -> bool\n  = fun v (module Box) ->\n    Box.OPS.mem v Box.boxed\n")),(0,l.kt)("p",null,"generates:"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-coq"},"Module Boxed_set.\n  Record signature {elt OPS_t : Set} := {\n    elt := elt;\n    elt_ty : comparable_ty elt;\n    OPS : S.SET.signature elt OPS_t;\n    boxed : OPS.(S.SET.t);\n    size : Z;\n  }.\n  Arguments signature : clear implicits.\nEnd Boxed_set.\n\nDefinition set (elt : Set) := {OPS_t : _ & Boxed_set.signature elt OPS_t}.\n\nDefinition set_mem {elt : Set} (v : elt) (Box : set elt) : bool :=\n  (|Box|).(Boxed_set.OPS).(S.SET.mem) v (|Box|).(Boxed_set.boxed).\n")),(0,l.kt)("p",null,'Many things are happening here, but the main thing to know is that we do not need to represent the OCaml lifts "module to value" or "value to module" since dependent records are already values in Coq.'))}c.isMDXComponent=!0}}]);