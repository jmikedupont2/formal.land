"use strict";(self.webpackChunkformal_land=self.webpackChunkformal_land||[]).push([[339],{80:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>s,default:()=>p,frontMatter:()=>i,metadata:()=>a,toc:()=>l});var o=t(4848),r=t(8453);const i={id:"type-definitions",title:"Type definitions"},s=void 0,a={id:"coq-of-ocaml/type-definitions",title:"Type definitions",description:"coq-of-ocaml generates the Coq definitions corresponding to OCaml's type definitions.",source:"@site/docs/coq-of-ocaml/type-definitions.md",sourceDirName:"coq-of-ocaml",slug:"/coq-of-ocaml/type-definitions",permalink:"/docs/coq-of-ocaml/type-definitions",draft:!1,unlisted:!1,tags:[],version:"current",frontMatter:{id:"type-definitions",title:"Type definitions"},sidebar:"sidebar",previous:{title:"OCaml core",permalink:"/docs/coq-of-ocaml/ocaml-core"},next:{title:"Module system",permalink:"/docs/coq-of-ocaml/module-system"}},c={},l=[{value:"Single type definitions",id:"single-type-definitions",level:2},{value:"Synonyms",id:"synonyms",level:3},{value:"Records",id:"records",level:3},{value:"Algebraic data types",id:"algebraic-data-types",level:3},{value:"Extensible types",id:"extensible-types",level:3},{value:"Polymorphic variants",id:"polymorphic-variants",level:3},{value:"Mutually recursive types",id:"mutually-recursive-types",level:2},{value:"With synonyms",id:"with-synonyms",level:3},{value:"With records",id:"with-records",level:3},{value:"GADTs",id:"gadts",level:2}];function d(e){const n={code:"code",h2:"h2",h3:"h3",p:"p",pre:"pre",...(0,r.R)(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsxs)(n.p,{children:[(0,o.jsx)(n.code,{children:"coq-of-ocaml"})," generates the Coq definitions corresponding to OCaml's type definitions."]}),"\n",(0,o.jsx)(n.h2,{id:"single-type-definitions",children:"Single type definitions"}),"\n",(0,o.jsx)(n.h3,{id:"synonyms",children:"Synonyms"}),"\n",(0,o.jsx)(n.p,{children:"Type synonyms are transformed to Coq definitions:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ocaml",children:"type string_list = string list\n"})}),"\n",(0,o.jsx)(n.p,{children:"generates:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-coq",children:"Definition string_list := list string.\n"})}),"\n",(0,o.jsx)(n.h3,{id:"records",children:"Records"}),"\n",(0,o.jsxs)(n.p,{children:["OCaml records are transformed to Coq records, namespaced into a module to prevent name collisions. The transformation includes the ",(0,o.jsx)(n.code,{children:"with_"})," operators for field substitutions:"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ocaml",children:"type answer = {\n  code : int;\n  message : string }\n"})}),"\n",(0,o.jsx)(n.p,{children:"generates:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-coq",children:"Module answer.\n  Record record := {\n    code : Z;\n    message : string }.\n  Definition with_code (r : record) code : record :=\n    {| code := code; message := message r |}.\n  Definition with_message (r : record) message : record :=\n    {| code := code r; message := message |}.\nEnd answer.\nDefinition answer := answer.record.\n"})}),"\n",(0,o.jsx)(n.h3,{id:"algebraic-data-types",children:"Algebraic data types"}),"\n",(0,o.jsx)(n.p,{children:"Algebraic data types generate an inductive definition in Coq:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ocaml",children:"type 'a tree =\n  | Leaf of 'a\n  | Node of 'a tree * 'a tree\n"})}),"\n",(0,o.jsx)(n.p,{children:"generates:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-coq",children:"Inductive tree (a : Set) : Set :=\n| Leaf : a -> tree a\n| Node : (tree a) -> (tree a) -> tree a.\n\nArguments Leaf {_}.\nArguments Node {_}.\n"})}),"\n",(0,o.jsxs)(n.p,{children:["The type parameter ",(0,o.jsx)(n.code,{children:"a"})," is set implicit for the data constructors with the command ",(0,o.jsx)(n.code,{children:"Arguments"}),", as it is implicit in OCaml too."]}),"\n",(0,o.jsxs)(n.p,{children:["For data constructors with a record parameter, the convention (taken from the OCaml compiler) is to name the corresponding record ",(0,o.jsx)(n.code,{children:"type.Constructor"}),". For example:"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ocaml",children:"type element =\n  | Point of { x : int; y : int}\n  | Rectangle of { height : int; width : int}\n"})}),"\n",(0,o.jsx)(n.p,{children:"generates:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-coq",children:"Module element.\n  Module Point.\n    Record record {x y : Set} := {\n      x : x;\n      y : y }.\n    Arguments record : clear implicits.\n  End Point.\n  Definition Point := Point.record.\n  \n  Module Rectangle.\n    Record record {height width : Set} := {\n      height : height;\n      width : width }.\n    Arguments record : clear implicits.\n  End Rectangle.\n  Definition Rectangle := Rectangle.record.\nEnd element.\n\nInductive element : Set :=\n| Point : element.Point Z Z -> element\n| Rectangle : element.Rectangle Z Z -> element.\n"})}),"\n",(0,o.jsxs)(n.p,{children:["The definitions of the constructors' records are polymorphic so that they can be applied to the type being defined if needed (in this case the type ",(0,o.jsx)(n.code,{children:"element"}),")."]}),"\n",(0,o.jsx)(n.h3,{id:"extensible-types",children:"Extensible types"}),"\n",(0,o.jsx)(n.p,{children:"The various forms of extensible types are ignored:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ocaml",children:"exception Too_long of string\n"})}),"\n",(0,o.jsx)(n.p,{children:"generates:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-coq",children:"(* exception Too_long *)\n"})}),"\n",(0,o.jsx)(n.p,{children:"and:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ocaml",children:"type error += Lazy_script_decode\n"})}),"\n",(0,o.jsx)(n.p,{children:"generates:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-coq",children:"(* type_extension *)\n"})}),"\n",(0,o.jsx)(n.h3,{id:"polymorphic-variants",children:"Polymorphic variants"}),"\n",(0,o.jsx)(n.p,{children:"The polymorphic variant types are converted to the corresponding Coq inductive as an approximation:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ocaml",children:"type json =\n  [ `O of (string * json) list\n  | `Bool of bool\n  | `Float of float\n  | `A of json list\n  | `Null\n  | `String of string ]\n"})}),"\n",(0,o.jsx)(n.p,{children:"generates:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-coq",children:"Inductive json : Set :=\n| Bool : bool -> json\n| Null : json\n| O : list (string * json) -> json\n| Float : Z -> json\n| String : string -> json\n| A : list json -> json.\n"})}),"\n",(0,o.jsx)(n.h2,{id:"mutually-recursive-types",children:"Mutually recursive types"}),"\n",(0,o.jsx)(n.h3,{id:"with-synonyms",children:"With synonyms"}),"\n",(0,o.jsx)(n.p,{children:"Coq only accept mutually recursive types on inductive definitions. A known trick is to use a Coq notation to simulate mutual definitions on type synonyms:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ocaml",children:"type path = path_item list\n\nand path_item =\n  | Field of string  (** A field in an object. *)\n  | Index of int  (** An index in an array. *)\n  | Star  (** Any / every field or index. *)\n"})}),"\n",(0,o.jsx)(n.p,{children:"generates:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-coq",children:'Reserved Notation "\'path".\n\nInductive path_item : Set :=\n| Index : Z -> path_item\n| Field : string -> path_item\n| Star : path_item\n\nwhere "\'path" := (list path_item).\n\nDefinition path := \'path.\n'})}),"\n",(0,o.jsx)(n.h3,{id:"with-records",children:"With records"}),"\n",(0,o.jsxs)(n.p,{children:["For mutual definitions with a record, ",(0,o.jsx)(n.code,{children:"coq-of-ocaml"})," first generate record skeletons, so that the record definitions are transformed into type synonyms:"]}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ocaml",children:"type 'o t =\n  [ `Ok of 'o (* 200 *)\n  | `OkStream of 'o stream (* 200 *)\n  | `Error of error list option (* 500 *) ]\n\nand 'a stream = {next : unit -> 'a option Lwt.t; shutdown : unit -> unit}\n"})}),"\n",(0,o.jsx)(n.p,{children:"generates:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-coq",children:"Reserved Notation \"'stream\".\n\nModule stream.\n  Record record {next shutdown : Set} := {\n    next : next;\n    shutdown : shutdown }.\n  Arguments record : clear implicits.\n  Definition with_next {next_type shutdown_type : Set}\n    (r : record next_type shutdown_type) next\n    : record next_type shutdown_type :=\n    {| next := next; shutdown := shutdown r |}.\n  Definition with_shutdown {next_type shutdown_type : Set}\n    (r : record next_type shutdown_type) shutdown\n    : record next_type shutdown_type :=\n    {| next := next r; shutdown := shutdown |}.\nEnd stream.\nDefinition stream_skeleton := stream.record.\n\nInductive t (o : Set) : Set :=\n| OkStream : 'stream o -> t o\n| Ok : o -> t o\n| Error : option (list Error_monad._error) -> t o\n\nwhere \"'stream\" := (fun (a : Set) =>\n  stream_skeleton (unit -> Lwt.t (option a)) (unit -> unit)).\n\nDefinition stream := 'stream.\n\nArguments OkStream {_}.\nArguments Ok {_}.\nArguments Error {_}.\n"})}),"\n",(0,o.jsx)(n.h2,{id:"gadts",children:"GADTs"}),"\n",(0,o.jsxs)(n.p,{children:["The type annotations on GADTs do not directly translate to Coq annotations compatible with the dependent pattern-matching of Coq. The solution adopted by ",(0,o.jsx)(n.code,{children:"coq-of-ocaml"})," is to erase the GADT type annotations, and let the user manually add axioms to validate pattern-matching on GADT expressions."]}),"\n",(0,o.jsx)(n.p,{children:"For example:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-ocaml",children:"type (_, _) comparable_struct =\n  | Int_key : type_annot option -> (z num, _) comparable_struct\n  | String_key : type_annot option -> (string, _) comparable_struct\n  | Bool_key : type_annot option -> (bool, _) comparable_struct\n  | Pair_key :\n      (('a, leaf) comparable_struct * field_annot option)\n      * (('b, _) comparable_struct * field_annot option)\n      * type_annot option\n      -> (('a, 'b) pair, comb) comparable_struct\n"})}),"\n",(0,o.jsx)(n.p,{children:"translates to:"}),"\n",(0,o.jsx)(n.pre,{children:(0,o.jsx)(n.code,{className:"language-coq",children:'Reserved Notation "\'comparable_struct".\n\nInductive comparable_struct_gadt : Set :=\n| Int_key : option type_annot -> comparable_struct_gadt\n| String_key : option type_annot -> comparable_struct_gadt\n| Bool_key : option type_annot -> comparable_struct_gadt\n| Pair_key :\n  comparable_struct_gadt * option field_annot ->\n  comparable_struct_gadt * option field_annot -> option type_annot ->\n  comparable_struct_gadt\n\nwhere "\'comparable_struct" := (fun (_ _ : Set) => comparable_struct_gadt).\n\nDefinition comparable_struct := \'comparable_struct.\n'})}),"\n",(0,o.jsxs)(n.p,{children:["The type ",(0,o.jsx)(n.code,{children:"comparable_struct_gadt"})," is temporarily introduced as a version of ",(0,o.jsx)(n.code,{children:"comparable_struct"})," without type parameters. Then ",(0,o.jsx)(n.code,{children:"comparable_struct"})," is defined by ignoring its type parameters, preserving the arity of the OCaml type (here two type parameters). The use of a notation for ",(0,o.jsx)(n.code,{children:"comparable_struct"})," allows the use of GADTs in mutually recursive types, but is not strictly necessary in this specific example."]})]})}function p(e={}){const{wrapper:n}={...(0,r.R)(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(d,{...e})}):d(e)}},8453:(e,n,t)=>{t.d(n,{R:()=>s,x:()=>a});var o=t(6540);const r={},i=o.createContext(r);function s(e){const n=o.useContext(i);return o.useMemo((function(){return"function"==typeof e?e(n):{...n,...e}}),[n,e])}function a(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(r):e.components||r:s(e.components),o.createElement(i.Provider,{value:n},e.children)}}}]);