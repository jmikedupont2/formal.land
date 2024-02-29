"use strict";(self.webpackChunkformal_land=self.webpackChunkformal_land||[]).push([[8840],{7589:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>r,contentTitle:()=>l,default:()=>u,frontMatter:()=>o,metadata:()=>a,toc:()=>d});var s=t(4848),i=t(8453);const o={id:"module-system",title:"Module system"},l=void 0,a={id:"coq-of-ocaml/module-system",title:"Module system",description:"To handle the module system of OCaml, the compiler coq-of-ocaml generates either plain Coq modules or dependent records. It never generates Coq functors or module types. You can use coq-of-ocaml to translate modules, module types, functors and first-class modules.",source:"@site/docs/coq-of-ocaml/module-system.md",sourceDirName:"coq-of-ocaml",slug:"/coq-of-ocaml/module-system",permalink:"/docs/coq-of-ocaml/module-system",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{id:"module-system",title:"Module system"},sidebar:"sidebar",previous:{title:"Type definitions",permalink:"/docs/coq-of-ocaml/type-definitions"},next:{title:"GADTs",permalink:"/docs/coq-of-ocaml/gadts"}},r={},d=[{value:"General mechanism",id:"general-mechanism",level:2},{value:"Example",id:"example",level:3},{value:"Finding names",id:"finding-names",level:3},{value:"Bundled vs unbundled",id:"bundled-vs-unbundled",level:3},{value:"Signatures",id:"signatures",level:2},{value:"Modules",id:"modules",level:2},{value:"Existential tuples",id:"existential-tuples",level:3},{value:"Projections",id:"projections",level:3},{value:"Include",id:"include",level:2},{value:"Functors",id:"functors",level:2},{value:"First-class modules",id:"first-class-modules",level:2}];function c(e){const n={code:"code",em:"em",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",ul:"ul",...(0,i.R)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsxs)(n.p,{children:["To handle the module system of OCaml, the compiler ",(0,s.jsx)(n.code,{children:"coq-of-ocaml"})," generates either plain Coq modules or dependent records. It never generates Coq functors or module types. You can use ",(0,s.jsx)(n.code,{children:"coq-of-ocaml"})," to translate modules, module types, functors and first-class modules."]}),"\n",(0,s.jsx)(n.h2,{id:"general-mechanism",children:"General mechanism"}),"\n",(0,s.jsx)(n.h3,{id:"example",children:"Example"}),"\n",(0,s.jsx)(n.p,{children:"The following code:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ocaml",children:"module MyModuleForNamespacing = struct\n  let foo x = x + 1\n  let bar = 12\nend\n\nmodule type COMPARABLE = sig\n  type t\n  val compare : t -> t -> int\nend\n\nmodule InstanceToUseInFunctors = struct\n  type t = string\n  let compare = String.compare\nend\n"})}),"\n",(0,s.jsx)(n.p,{children:"is translated to:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-coq",children:"Module MyModuleForNamespacing.\n  Definition foo (x : Z) : Z := Z.add x 1.\n  \n  Definition bar : Z := 12.\nEnd MyModuleForNamespacing.\n\nModule COMPARABLE.\n  Record signature {t : Set} := {\n    t := t;\n    compare : t -> t -> Z;\n  }.\n  Arguments signature : clear implicits.\nEnd COMPARABLE.\n\nDefinition InstanceToUseInFunctors :=\n  let t := string in\n  let compare := Stdlib.String.compare in\n  existT (fun _ => _) tt\n    {|\n      COMPARABLE.compare := compare\n    |}.\n"})}),"\n",(0,s.jsxs)(n.p,{children:["We use a plain module for ",(0,s.jsx)(n.code,{children:"MyModuleForNamespacing"})," as we think it will not be used in functors or first-class modules. We translate the module type ",(0,s.jsx)(n.code,{children:"COMPARABLE"})," to a record parametrized by ",(0,s.jsx)(n.code,{children:"t"})," as this type is abstract. The ",(0,s.jsx)(n.code,{children:"InstanceToUseInFunctors"})," is translated to a dependent record of type ",(0,s.jsx)(n.code,{children:"COMPARABLE.signature"})," as it may by used as a parameter for a functor for example. We will see how we determine that a module should translates to a record."]}),"\n",(0,s.jsx)(n.h3,{id:"finding-names",children:"Finding names"}),"\n",(0,s.jsx)(n.p,{children:"The heuristic is to represent a module by a dependent record if and only if it has a named signature. The name of the signature is then the name of the record type. Each signature is translated to a record type."}),"\n",(0,s.jsxs)(n.p,{children:["The OCaml modules are structurally typed while the Coq records are nominally typed. Thus a large part of the conversion effort is dedicated to the naming of signatures. A signature is named by exploring the environment to find a similar signature definition with its name. Two signatures are deemed similar if they share the same list of names of values and sub-modules at top-level. We do not check for type names or values as they could be removed or changed by the use of type substitutions (operators ",(0,s.jsx)(n.code,{children:"with type t = ..."})," and ",(0,s.jsx)(n.code,{children:"with type t := ..."}),"). We only check top-level names for efficiency reasons, and because exploring sub-modules resulted in errors in some cases."]}),"\n",(0,s.jsx)(n.p,{children:"We generate an error message when multiple names are found for a signature. For example with:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ocaml",children:'module type S1 = sig\n  val v : string\nend\n\nmodule type S2 = sig\n  val v : int\nend\n\nmodule M = struct\n  let v = "hi"\nend\n'})}),"\n",(0,s.jsxs)(n.p,{children:["the module ",(0,s.jsx)(n.code,{children:"M"})," could have the signatures ",(0,s.jsx)(n.code,{children:"S1"})," or ",(0,s.jsx)(n.code,{children:"S2"})," as we only look at the value names, so we output the error:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-text",children:'   7 | end\n   8 | \n>  9 | module M = struct\n  10 |   let v = "hi"\n  11 | end\n  12 | \n\n\nIt is unclear which name has this signature. At least two similar\nsignatures found, namely:\nS2, S1\n\nWe were looking for a module signature name for the following shape:\n[ v ]\n(a shape is a list of names of values and sub-modules)\n\nWe use the concept of shape to find the name of a signature for Coq.\n'})}),"\n",(0,s.jsx)(n.p,{children:"To discriminate between two similar signatures, you can add a dummy tag field. With:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ocaml",children:'module type S1 = sig\n  val this_is_S1 : unit\n  val v : string\nend\n\nmodule type S2 = sig\n  val this_is_S2 : unit\n  val v : int\nend\n\nmodule M = struct\n  let this_is_S1 = ()\n  let v = "hi"\nend\n'})}),"\n",(0,s.jsxs)(n.p,{children:[(0,s.jsx)(n.code,{children:"coq-of-ocaml"})," generates without errors:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-coq",children:'Module S1.\n  Record signature := {\n    this_is_S1 : unit;\n    v : string;\n  }.\nEnd S1.\n\nModule S2.\n  Record signature := {\n    this_is_S2 : unit;\n    v : Z;\n  }.\nEnd S2.\n\nDefinition M :=\n  let this_is_S1 := tt in\n  let v := "hi" in\n  existT (fun _ => _) tt\n    {|\n      S1.this_is_S1 := this_is_S1;\n      S1.v := v\n    |}.\n'})}),"\n",(0,s.jsxs)(n.p,{children:["If no signatures are found, the module ",(0,s.jsx)(n.code,{children:"M"})," is translated to a plain Coq module:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ocaml",children:'module type S = sig\n  val v : string\nend\n\nmodule M = struct\n  let not_v = "hi"\nend\n'})}),"\n",(0,s.jsx)(n.p,{children:"generates:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-coq",children:'Module S.\n  Record signature := {\n    v : string;\n  }.\nEnd S.\n\nModule M.\n  Definition not_v : string := "hi".\nEnd M.\n'})}),"\n",(0,s.jsx)(n.h3,{id:"bundled-vs-unbundled",children:"Bundled vs unbundled"}),"\n",(0,s.jsxs)(n.p,{children:["In OCaml modules may have some abstract types. In Coq we represent abstract types as type parameters for the records of the signatures. For module values, we instantiate known abstract types and use existential types for unknown abstract types. We always use a single existential ",(0,s.jsx)(n.code,{children:"{... & ...}"})," on the tuple of unknown types. If all types are known, we still use an existential on the empty tuple for uniformity."]}),"\n",(0,s.jsx)(n.p,{children:"We say that:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"signatures are always unbundled (with universal types);"}),"\n",(0,s.jsx)(n.li,{children:"module are always bundled (with existential types)."}),"\n"]}),"\n",(0,s.jsx)(n.h2,{id:"signatures",children:"Signatures"}),"\n",(0,s.jsx)(n.p,{children:"Signatures can contain a mix of:"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsx)(n.li,{children:"abstract types (constant or polymorphic);"}),"\n",(0,s.jsx)(n.li,{children:"type definitions as synonyms;"}),"\n",(0,s.jsx)(n.li,{children:"values;"}),"\n",(0,s.jsx)(n.li,{children:"sub-modules."}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"A complex example is the following:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ocaml",children:"module type SubS = sig\n  type t\n  val v : t\n  type size\n  val n : size\nend\n\nmodule type S = sig\n  type 'a t\n  type int_t = int t\n  val numbers : int_t\n  module Sub : SubS with type t = int_t\n  val n : Sub.size\nend\n"})}),"\n",(0,s.jsx)(n.p,{children:"which gets translated to:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-coq",children:"Module SubS.\n  Record signature {t size : Set} := {\n    t := t;\n    v : t;\n    size := size;\n    n : size;\n  }.\n  Arguments signature : clear implicits.\nEnd SubS.\n\nModule S.\n  Record signature {t : Set -> Set} {Sub_size : Set} := {\n    t := t;\n    int_t := t Z;\n    numbers : int_t;\n    Sub : SubS.signature int_t Sub_size;\n    n : Sub.(SubS.size);\n  }.\n  Arguments signature : clear implicits.\nEnd S.\n"})}),"\n",(0,s.jsxs)(n.p,{children:["The signature ",(0,s.jsx)(n.code,{children:"SubS"})," has two abstract types ",(0,s.jsx)(n.code,{children:"t"})," and ",(0,s.jsx)(n.code,{children:"size"}),". We define two synonym record fields ",(0,s.jsx)(n.code,{children:"t := t"})," and ",(0,s.jsx)(n.code,{children:"size := size"})," for uniform access."]}),"\n",(0,s.jsxs)(n.p,{children:["The signature ",(0,s.jsx)(n.code,{children:"S"})," is parametrized by its abstract type ",(0,s.jsx)(n.code,{children:"t"})," and the abstract type ",(0,s.jsx)(n.code,{children:"Sub_size"})," of its sub-module ",(0,s.jsx)(n.code,{children:"Sub"}),". The abstract type ",(0,s.jsx)(n.code,{children:"t"})," is polymorphic and of type ",(0,s.jsx)(n.code,{children:"Set -> Set"}),". The type synonym ",(0,s.jsx)(n.code,{children:"int_t"})," is defined as a synonym record field. The sub-module ",(0,s.jsx)(n.code,{children:"Sub"})," is a field of the record ",(0,s.jsx)(n.code,{children:"S.signature"})," and of type the record ",(0,s.jsx)(n.code,{children:"SubS.signature"}),". Its type parameter ",(0,s.jsx)(n.code,{children:"t"})," is instantiated by ",(0,s.jsx)(n.code,{children:"int_t"}),". Note that sub-module values appear as ",(0,s.jsx)(n.em,{children:"unbundled"})," records. This is the only case where module values are unbundled. We made this choice because the abstract types of the sub-module ",(0,s.jsx)(n.code,{children:"Sub"})," may be instantiated later as in:"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ocaml",children:"S with type Sub.size = int\n"})}),"\n",(0,s.jsxs)(n.p,{children:["Finally, a signature field such as ",(0,s.jsx)(n.code,{children:"n"})," can refer to a type defined in the sub-module ",(0,s.jsx)(n.code,{children:"Sub"}),"."]}),"\n",(0,s.jsx)(n.h2,{id:"modules",children:"Modules"}),"\n",(0,s.jsx)(n.p,{children:"The modules with a named signature are represented as bundled dependent records. The abstract types are generally known at the moment of the definition, but may still be hidden by casting. For example, the following code:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ocaml",children:"module type Source = sig\n  type t\n  val x : t\nend\n\nmodule M_NoCast = struct\n  type t = int\n  let x = 12\nend\n\nmodule M_WithCast : Source = struct\n  type t = int\n  let x = 12\nend\n"})}),"\n",(0,s.jsx)(n.p,{children:"will generate:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-coq",children:"Module Source.\n  Record signature {t : Set} := {\n    t := t;\n    x : t;\n  }.\n  Arguments signature : clear implicits.\nEnd Source.\n\nDefinition M_NoCast :=\n  let t := Z in\n  let x := 12 in\n  existT (fun _ => _) tt\n    {|\n      Source.x := x\n    |}.\n\nDefinition M_WithCast :=\n  let t := Z in\n  let x := 12 in\n  existT _ _\n    {|\n      Source.x := x\n    |}.\n"})}),"\n",(0,s.jsxs)(n.p,{children:["The module ",(0,s.jsx)(n.code,{children:"M_NoCast"})," has no existential variables while the module ",(0,s.jsx)(n.code,{children:"M_WithCast"})," has one due to the cast to the ",(0,s.jsx)(n.code,{children:"Source"})," signature. This is visible in the use a ",(0,s.jsx)(n.code,{children:"_"})," to ask Coq to infer the value of this type, in place of a ",(0,s.jsx)(n.code,{children:"tt"})," to represent the absence of existential variables."]}),"\n",(0,s.jsx)(n.h3,{id:"existential-tuples",children:"Existential tuples"}),"\n",(0,s.jsx)(n.p,{children:"In the presence of several existential variables we use tuples of types with primitive projections. Primitive projections help Coq to infer missing values in generated terms, so that we do not need to annotate too much module expressions. These tuples are a variant of the tuples of the standard library. We use the following notations:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-coq",children:"[T1 * T2 * ... Tn] (* the type of a tuple *)\n[v1, v2, ..., vn]  (* the value of tuple *)\n"})}),"\n",(0,s.jsxs)(n.p,{children:["A tuple of ",(0,s.jsx)(n.em,{children:"n"})," values is encoded as ",(0,s.jsx)(n.em,{children:"n-1"})," nested tuples of two values."]}),"\n",(0,s.jsx)(n.h3,{id:"projections",children:"Projections"}),"\n",(0,s.jsxs)(n.p,{children:["As modules are always bundled (unless in the case of sub-modules in signatures), we introduce a notation for the Coq projection ",(0,s.jsx)(n.code,{children:"projT2"}),":"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-coq",children:"(|bundled_record|)\n"})}),"\n",(0,s.jsx)(n.p,{children:"Thus projections from modules encoded as a record:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ocaml",children:"let x = M_WithCast.x\n"})}),"\n",(0,s.jsx)(n.p,{children:"typically have this shape in Coq:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-coq",children:"Definition x : (|M_WithCast|).(Source.t) := (|M_WithCast|).(Source.x).\n"})}),"\n",(0,s.jsx)(n.p,{children:"We did not add a notation for doing both the projection and the field access, as this would mess up with the inference for implicit variables in polymorphic fields."}),"\n",(0,s.jsx)(n.h2,{id:"include",children:"Include"}),"\n",(0,s.jsx)(n.p,{children:"Includes, either in signatures or modules, are generally inlined. For example, with signatures:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ocaml",children:"module type COMPARABLE = sig\n  type t\n  val compare : t -> t -> int\nend\n\nmodule type S = sig\n  include COMPARABLE\n  val ( = ) : t -> t -> bool\n  val ( <> ) : t -> t -> bool\n  val ( < ) : t -> t -> bool\n  val ( <= ) : t -> t -> bool\n  val ( >= ) : t -> t -> bool\n  val ( > ) : t -> t -> bool\n  val equal : t -> t -> bool\n  val max : t -> t -> t\n  val min : t -> t -> t\nend\n"})}),"\n",(0,s.jsx)(n.p,{children:"generates:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-coq",children:"Module COMPARABLE.\n  Record signature {t : Set} := {\n    t := t;\n    compare : t -> t -> Z;\n  }.\n  Arguments signature : clear implicits.\nEnd COMPARABLE.\n\nModule S.\n  Record signature {t : Set} := {\n    t := t;\n    compare : t -> t -> Z;\n    op_eq : t -> t -> bool;\n    op_ltgt : t -> t -> bool;\n    op_lt : t -> t -> bool;\n    op_lteq : t -> t -> bool;\n    op_gteq : t -> t -> bool;\n    op_gt : t -> t -> bool;\n    equal : t -> t -> bool;\n    max : t -> t -> t;\n    min : t -> t -> t;\n  }.\n  Arguments signature : clear implicits.\nEnd S.\n"})}),"\n",(0,s.jsxs)(n.p,{children:["Due to duplications, ",(0,s.jsx)(n.code,{children:"coq-of-ocaml"})," may generate Coq terms which are larger than the corresponding OCaml code. If you want to keep a generated Coq without duplications, we recommend you to use sub-modules rather than includes."]}),"\n",(0,s.jsx)(n.h2,{id:"functors",children:"Functors"}),"\n",(0,s.jsx)(n.p,{children:"We represent functors as functions over bounded records. Here is the example of a functor declaration:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ocaml",children:"module Make (P : COMPARABLE) : (S with type t = P.t)\n"})}),"\n",(0,s.jsx)(n.p,{children:"generating:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-coq",children:"Parameter Make :\n  forall (P : {t : _ & COMPARABLE.signature t}),\n    {_ : unit & S.signature (|P|).(COMPARABLE.t)}.\n"})}),"\n",(0,s.jsxs)(n.p,{children:["We see that the return type of ",(0,s.jsx)(n.code,{children:"Make"})," is a dependent type depending on the value of the field ",(0,s.jsx)(n.code,{children:"COMPARABLE.t"})," of ",(0,s.jsx)(n.code,{children:"P"}),". A functor may also return another functor."]}),"\n",(0,s.jsx)(n.p,{children:"Here is an example of functor definition and application:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ocaml",children:"module type Source = sig\n  type t\n  val x : t\nend\n\nmodule type Target = sig\n  type t\n  val y : t\nend\n\nmodule F (X : Source) : Target with type t = X.t = struct\n  type t = X.t\n  let y = X.x\nend\n\nmodule M : Source = struct\n  type t = int\n  let x = 12\nend\n\nmodule N = F (M)\n"})}),"\n",(0,s.jsx)(n.p,{children:"generating:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-coq",children:"Module Source.\n  Record signature {t : Set} := {\n    t := t;\n    x : t;\n  }.\n  Arguments signature : clear implicits.\nEnd Source.\n\nModule Target.\n  Record signature {t : Set} := {\n    t := t;\n    y : t;\n  }.\n  Arguments signature : clear implicits.\nEnd Target.\n\nDefinition F :=\n  fun (X : {t : _ & Source.signature t}) =>\n    (let t := (|X|).(Source.t) in\n    let y := (|X|).(Source.x) in\n    existT (fun _ => _) tt\n      {|\n        Target.y := y\n      |} : {_ : unit & Target.signature (|X|).(Source.t)}).\n\nDefinition M :=\n  let t := Z in\n  let x := 12 in\n  existT _ _\n    {|\n      Source.x := x\n    |}.\n\nDefinition N :=\n  F\n    (existT _ _\n      {|\n        Source.x := (|M|).(Source.x)\n      |}).\n"})}),"\n",(0,s.jsx)(n.p,{children:"Applications of functors are represented by standard function applications. We cast the module parameter to make sure he has the correct record type. We cast records by re-creating them with the right field names."}),"\n",(0,s.jsx)(n.h2,{id:"first-class-modules",children:"First-class modules"}),"\n",(0,s.jsx)(n.p,{children:"First-class modules are modules which appear as values in OCaml. The encoding to dependent records provides a perfect way to represent them in Coq. Here is an example from the Tezos source code:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-ocaml",children:"module type Boxed_set = sig\n  type elt\n  val elt_ty : elt comparable_ty\n  module OPS : S.SET with type elt = elt\n  val boxed : OPS.t\n  val size : int\nend\n\ntype 'elt set = (module Boxed_set with type elt = 'elt)\n\nlet set_mem\n  : type elt. elt -> elt set -> bool\n  = fun v (module Box) ->\n    Box.OPS.mem v Box.boxed\n"})}),"\n",(0,s.jsx)(n.p,{children:"generates:"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-coq",children:"Module Boxed_set.\n  Record signature {elt OPS_t : Set} := {\n    elt := elt;\n    elt_ty : comparable_ty elt;\n    OPS : S.SET.signature elt OPS_t;\n    boxed : OPS.(S.SET.t);\n    size : Z;\n  }.\n  Arguments signature : clear implicits.\nEnd Boxed_set.\n\nDefinition set (elt : Set) := {OPS_t : _ & Boxed_set.signature elt OPS_t}.\n\nDefinition set_mem {elt : Set} (v : elt) (Box : set elt) : bool :=\n  (|Box|).(Boxed_set.OPS).(S.SET.mem) v (|Box|).(Boxed_set.boxed).\n"})}),"\n",(0,s.jsx)(n.p,{children:'Many things are happening here, but the main thing to know is that we do not need to represent the OCaml lifts "module to value" or "value to module" since dependent records are already values in Coq.'})]})}function u(e={}){const{wrapper:n}={...(0,i.R)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(c,{...e})}):c(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>l,x:()=>a});var s=t(6540);const i={},o=s.createContext(i);function l(e){const n=s.useContext(o);return s.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:l(e.components),s.createElement(o.Provider,{value:n},e.children)}}}]);