declare module "cli-meow-help" {
  type StringFlag = Flag<"string", string>;
  type BooleanFlag = Flag<"boolean", boolean>;
  type NumberFlag = Flag<"number", number>;

  type AnyFlag = StringFlag | BooleanFlag | NumberFlag;
  type AnyFlags = Record<string, AnyFlag>;
  interface IMeowHelp {
    name?: string;
    desc?: string;
    commands?: Record<string, any>;
    flags?: AnyFlags;
    defaults?: boolean;
    header?: string;
    footer?: string;
  }
  function meowHelp(opts: IMeowHelp): string;
  export = meowHelp;
}
// declare module "cli-meow-help" {
// //   type StringFlag = Flag<"string", string>;
// //   type BooleanFlag = Flag<"boolean", boolean>;
// //   type NumberFlag = Flag<"number", number>;

// //   type AnyFlag = StringFlag | BooleanFlag | NumberFlag;
// //   type AnyFlags = Record<string, AnyFlag>;
// //   interface IMeowHelp {
// //     name?: string;
// //     desc?: string;
// //     commands?: Map<string, string>;
// //     flags?: AnyFlags;
// //     defaults?: boolean;
// //     header?: string;
// //     footer?: string;
// //   }
//   function meowHelp(arg: IMeowHelp): string;
//   export default meowHelp;
// }
