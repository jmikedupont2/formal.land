"use strict";(self.webpackChunkformal_land=self.webpackChunkformal_land||[]).push([[1472],{3905:function(e,t,n){n.d(t,{Zo:function(){return p},kt:function(){return m}});var o=n(7294);function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){r(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,o,r=function(e,t){if(null==e)return{};var n,o,r={},a=Object.keys(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(o=0;o<a.length;o++)n=a[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=o.createContext({}),c=function(e){var t=o.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=c(e.components);return o.createElement(s.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return o.createElement(o.Fragment,{},t)}},u=o.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),u=c(n),m=r,y=u["".concat(s,".").concat(m)]||u[m]||d[m]||a;return n?o.createElement(y,i(i({ref:t},p),{},{components:n})):o.createElement(y,i({ref:t},p))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,i=new Array(a);i[0]=u;var l={};for(var s in t)hasOwnProperty.call(t,s)&&(l[s]=t[s]);l.originalType=e,l.mdxType="string"==typeof e?e:r,i[1]=l;for(var c=2;c<a;c++)i[c]=n[c];return o.createElement.apply(null,i)}return o.createElement.apply(null,n)}u.displayName="MDXCreateElement"},632:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return s},metadata:function(){return c},toc:function(){return p},default:function(){return u}});var o=n(7462),r=n(3366),a=(n(7294),n(3905)),i=["components"],l={id:"type-definitions",title:"Type definitions"},s=void 0,c={unversionedId:"coq-of-ocaml/type-definitions",id:"coq-of-ocaml/type-definitions",isDocsHomePage:!1,title:"Type definitions",description:"coq-of-ocaml generates the Coq definitions corresponding to OCaml's type definitions.",source:"@site/docs/coq-of-ocaml/type-definitions.md",sourceDirName:"coq-of-ocaml",slug:"/coq-of-ocaml/type-definitions",permalink:"/docs/coq-of-ocaml/type-definitions",tags:[],version:"current",frontMatter:{id:"type-definitions",title:"Type definitions"},sidebar:"sidebar",previous:{title:"OCaml core",permalink:"/docs/coq-of-ocaml/ocaml-core"},next:{title:"Module system",permalink:"/docs/coq-of-ocaml/module-system"}},p=[{value:"Single type definitions",id:"single-type-definitions",children:[{value:"Synonyms",id:"synonyms",children:[]},{value:"Records",id:"records",children:[]},{value:"Algebraic data types",id:"algebraic-data-types",children:[]},{value:"Extensible types",id:"extensible-types",children:[]},{value:"Polymorphic variants",id:"polymorphic-variants",children:[]}]},{value:"Mutually recursive types",id:"mutually-recursive-types",children:[{value:"With synonyms",id:"with-synonyms",children:[]},{value:"With records",id:"with-records",children:[]}]},{value:"GADTs",id:"gadts",children:[]}],d={toc:p};function u(e){var t=e.components,n=(0,r.Z)(e,i);return(0,a.kt)("wrapper",(0,o.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("p",null,(0,a.kt)("inlineCode",{parentName:"p"},"coq-of-ocaml")," generates the Coq definitions corresponding to OCaml's type definitions."),(0,a.kt)("h2",{id:"single-type-definitions"},"Single type definitions"),(0,a.kt)("h3",{id:"synonyms"},"Synonyms"),(0,a.kt)("p",null,"Type synonyms are transformed to Coq definitions:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ocaml"},"type string_list = string list\n")),(0,a.kt)("p",null,"generates:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-coq"},"Definition string_list := list string.\n")),(0,a.kt)("h3",{id:"records"},"Records"),(0,a.kt)("p",null,"OCaml records are transformed to Coq records, namespaced into a module to prevent name collisions. The transformation includes the ",(0,a.kt)("inlineCode",{parentName:"p"},"with_")," operators for field substitutions:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ocaml"},"type answer = {\n  code : int;\n  message : string }\n")),(0,a.kt)("p",null,"generates:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-coq"},"Module answer.\n  Record record := {\n    code : Z;\n    message : string }.\n  Definition with_code (r : record) code : record :=\n    {| code := code; message := message r |}.\n  Definition with_message (r : record) message : record :=\n    {| code := code r; message := message |}.\nEnd answer.\nDefinition answer := answer.record.\n")),(0,a.kt)("h3",{id:"algebraic-data-types"},"Algebraic data types"),(0,a.kt)("p",null,"Algebraic data types generate an inductive definition in Coq:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ocaml"},"type 'a tree =\n  | Leaf of 'a\n  | Node of 'a tree * 'a tree\n")),(0,a.kt)("p",null,"generates:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-coq"},"Inductive tree (a : Set) : Set :=\n| Leaf : a -> tree a\n| Node : (tree a) -> (tree a) -> tree a.\n\nArguments Leaf {_}.\nArguments Node {_}.\n")),(0,a.kt)("p",null,"The type parameter ",(0,a.kt)("inlineCode",{parentName:"p"},"a")," is set implicit for the data constructors with the command ",(0,a.kt)("inlineCode",{parentName:"p"},"Arguments"),", as it is implicit in OCaml too."),(0,a.kt)("p",null,"For data constructors with a record parameter, the convention (taken from the OCaml compiler) is to name the corresponding record ",(0,a.kt)("inlineCode",{parentName:"p"},"type.Constructor"),". For example:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ocaml"},"type element =\n  | Point of { x : int; y : int}\n  | Rectangle of { height : int; width : int}\n")),(0,a.kt)("p",null,"generates:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-coq"},"Module element.\n  Module Point.\n    Record record {x y : Set} := {\n      x : x;\n      y : y }.\n    Arguments record : clear implicits.\n  End Point.\n  Definition Point := Point.record.\n  \n  Module Rectangle.\n    Record record {height width : Set} := {\n      height : height;\n      width : width }.\n    Arguments record : clear implicits.\n  End Rectangle.\n  Definition Rectangle := Rectangle.record.\nEnd element.\n\nInductive element : Set :=\n| Point : element.Point Z Z -> element\n| Rectangle : element.Rectangle Z Z -> element.\n")),(0,a.kt)("p",null,"The definitions of the constructors' records are polymorphic so that they can be applied to the type being defined if needed (in this case the type ",(0,a.kt)("inlineCode",{parentName:"p"},"element"),")."),(0,a.kt)("h3",{id:"extensible-types"},"Extensible types"),(0,a.kt)("p",null,"The various forms of extensible types are ignored:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ocaml"},"exception Too_long of string\n")),(0,a.kt)("p",null,"generates:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-coq"},"(* exception Too_long *)\n")),(0,a.kt)("p",null,"and:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ocaml"},"type error += Lazy_script_decode\n")),(0,a.kt)("p",null,"generates:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-coq"},"(* type_extension *)\n")),(0,a.kt)("h3",{id:"polymorphic-variants"},"Polymorphic variants"),(0,a.kt)("p",null,"The polymorphic variant types are converted to the corresponding Coq inductive as an approximation:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ocaml"},"type json =\n  [ `O of (string * json) list\n  | `Bool of bool\n  | `Float of float\n  | `A of json list\n  | `Null\n  | `String of string ]\n")),(0,a.kt)("p",null,"generates:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-coq"},"Inductive json : Set :=\n| Bool : bool -> json\n| Null : json\n| O : list (string * json) -> json\n| Float : Z -> json\n| String : string -> json\n| A : list json -> json.\n")),(0,a.kt)("h2",{id:"mutually-recursive-types"},"Mutually recursive types"),(0,a.kt)("h3",{id:"with-synonyms"},"With synonyms"),(0,a.kt)("p",null,"Coq only accept mutually recursive types on inductive definitions. A known trick is to use a Coq notation to simulate mutual definitions on type synonyms:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ocaml"},"type path = path_item list\n\nand path_item =\n  | Field of string  (** A field in an object. *)\n  | Index of int  (** An index in an array. *)\n  | Star  (** Any / every field or index. *)\n")),(0,a.kt)("p",null,"generates:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-coq"},'Reserved Notation "\'path".\n\nInductive path_item : Set :=\n| Index : Z -> path_item\n| Field : string -> path_item\n| Star : path_item\n\nwhere "\'path" := (list path_item).\n\nDefinition path := \'path.\n')),(0,a.kt)("h3",{id:"with-records"},"With records"),(0,a.kt)("p",null,"For mutual definitions with a record, ",(0,a.kt)("inlineCode",{parentName:"p"},"coq-of-ocaml")," first generate record skeletons, so that the record definitions are transformed into type synonyms:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ocaml"},"type 'o t =\n  [ `Ok of 'o (* 200 *)\n  | `OkStream of 'o stream (* 200 *)\n  | `Error of error list option (* 500 *) ]\n\nand 'a stream = {next : unit -> 'a option Lwt.t; shutdown : unit -> unit}\n")),(0,a.kt)("p",null,"generates:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-coq"},"Reserved Notation \"'stream\".\n\nModule stream.\n  Record record {next shutdown : Set} := {\n    next : next;\n    shutdown : shutdown }.\n  Arguments record : clear implicits.\n  Definition with_next {next_type shutdown_type : Set}\n    (r : record next_type shutdown_type) next\n    : record next_type shutdown_type :=\n    {| next := next; shutdown := shutdown r |}.\n  Definition with_shutdown {next_type shutdown_type : Set}\n    (r : record next_type shutdown_type) shutdown\n    : record next_type shutdown_type :=\n    {| next := next r; shutdown := shutdown |}.\nEnd stream.\nDefinition stream_skeleton := stream.record.\n\nInductive t (o : Set) : Set :=\n| OkStream : 'stream o -> t o\n| Ok : o -> t o\n| Error : option (list Error_monad._error) -> t o\n\nwhere \"'stream\" := (fun (a : Set) =>\n  stream_skeleton (unit -> Lwt.t (option a)) (unit -> unit)).\n\nDefinition stream := 'stream.\n\nArguments OkStream {_}.\nArguments Ok {_}.\nArguments Error {_}.\n")),(0,a.kt)("h2",{id:"gadts"},"GADTs"),(0,a.kt)("p",null,"The type annotations on GADTs do not directly translate to Coq annotations compatible with the dependent pattern-matching of Coq. The solution adopted by ",(0,a.kt)("inlineCode",{parentName:"p"},"coq-of-ocaml")," is to erase the GADT type annotations, and let the user manually add axioms to validate pattern-matching on GADT expressions."),(0,a.kt)("p",null,"For example:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ocaml"},"type (_, _) comparable_struct =\n  | Int_key : type_annot option -> (z num, _) comparable_struct\n  | String_key : type_annot option -> (string, _) comparable_struct\n  | Bool_key : type_annot option -> (bool, _) comparable_struct\n  | Pair_key :\n      (('a, leaf) comparable_struct * field_annot option)\n      * (('b, _) comparable_struct * field_annot option)\n      * type_annot option\n      -> (('a, 'b) pair, comb) comparable_struct\n")),(0,a.kt)("p",null,"translates to:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-coq"},'Reserved Notation "\'comparable_struct".\n\nInductive comparable_struct_gadt : Set :=\n| Int_key : option type_annot -> comparable_struct_gadt\n| String_key : option type_annot -> comparable_struct_gadt\n| Bool_key : option type_annot -> comparable_struct_gadt\n| Pair_key :\n  comparable_struct_gadt * option field_annot ->\n  comparable_struct_gadt * option field_annot -> option type_annot ->\n  comparable_struct_gadt\n\nwhere "\'comparable_struct" := (fun (_ _ : Set) => comparable_struct_gadt).\n\nDefinition comparable_struct := \'comparable_struct.\n')),(0,a.kt)("p",null,"The type ",(0,a.kt)("inlineCode",{parentName:"p"},"comparable_struct_gadt")," is temporarily introduced as a version of ",(0,a.kt)("inlineCode",{parentName:"p"},"comparable_struct")," without type parameters. Then ",(0,a.kt)("inlineCode",{parentName:"p"},"comparable_struct")," is defined by ignoring its type parameters, preserving the arity of the OCaml type (here two type parameters). The use of a notation for ",(0,a.kt)("inlineCode",{parentName:"p"},"comparable_struct")," allows the use of GADTs in mutually recursive types, but is not strictly necessary in this specific example."))}u.isMDXComponent=!0}}]);