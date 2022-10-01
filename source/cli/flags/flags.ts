import { Option } from "@swan-io/boxed";
import { fromTruthy } from "../../lib/option-wrapper";
import { IHL_FLAGS } from "../../shared";
import { FlagData, IIronlauncherConfig } from "../../types/cli-config";
import { handleBooleanValues } from "../../utils";
import { validateKeysInObj } from "../../utils/validate-keys-in-obj";

type IGetInfoFromFlag = (flags?: IIronlauncherConfig) => boolean;

export function flagsData(flags: IIronlauncherConfig = {}) {
  const auth = getFlagsAuth(flags);

  const template = getFlagsProjectVariant(flags);

  const isSkipInstall = getFlagsSkipInstall(flags);

  const isDryRun = getFlagsDryRun(flags);

  const isPnpm = getFlagsIsPnpm(flags);

  return {
    auth,
    template,
    isSkipInstall,
    isDryRun,
    isPnpm,
  };
}

const getFlagsProjectVariant = (flags: IIronlauncherConfig = {}) => {
  return fromTruthy(flags).flatMap<"views" | "json" | "fs">((e) => {
    if (getFlagsView(e)) {
      return Option.Some("views");
    }

    if (getFlagsJson(e)) {
      return Option.Some("json");
    }

    if (getFlagsFs(e)) {
      return Option.Some("fs");
    }

    return Option.None();
  });
};

const getFlagsAuth = (flags?: IIronlauncherConfig): "session" | "jwt" => {
  if (getFlagsAuthSession(flags)) {
    return "session";
  }

  return "jwt";
};

const getFlagsIsPnpm: IGetInfoFromFlag = (flags = {}) => {
  return getInfoFromFlags(flags, IHL_FLAGS.pnpm);
};

const getFlagsView: IGetInfoFromFlag = (flags = {}) => {
  return getInfoFromFlags(flags, IHL_FLAGS.views);
};

const getFlagsJson: IGetInfoFromFlag = (flags = {}) => {
  return getInfoFromFlags(flags, IHL_FLAGS.json);
};

const getFlagsFs: IGetInfoFromFlag = (flags = {}) => {
  return getInfoFromFlags(flags, IHL_FLAGS.fs);
};

const getFlagsAuthSession: IGetInfoFromFlag = (flags = {}) => {
  return flags.auth === "session";
};

function getInfoFromFlags(flags: IIronlauncherConfig, arr: readonly string[]) {
  return handleBooleanValues(
    ...(Object.values(validateKeysInObj(flags, arr)) as Array<
      FlagData | undefined
    >)
  );
}

const getFlagsSkipInstall: IGetInfoFromFlag = (flags = {}) => {
  return getInfoFromFlags(flags, IHL_FLAGS.skipInstall);
};

const getFlagsDryRun: IGetInfoFromFlag = (flags = {}) => {
  return getInfoFromFlags(flags, IHL_FLAGS.dryRun);
};

if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest;

  describe("flag", () => {
    it("pnpm in flags", () => {
      expect(getFlagsIsPnpm()).toBe(false);
      expect(getFlagsIsPnpm({})).toBe(false);
      expect(getFlagsIsPnpm({ pnpm: true })).toBe(true);
      expect(getFlagsIsPnpm({ p: true })).toBe(true);
    });

    it("skip-install in flags", () => {
      expect(getFlagsSkipInstall()).toBe(false);
      expect(getFlagsSkipInstall({})).toBe(false);
      expect(getFlagsSkipInstall({ "skip-install": true })).toBe(true);
      expect(getFlagsSkipInstall({ skipInstall: true })).toBe(true);
    });

    it("dry-run in flags", () => {
      expect(getFlagsDryRun()).toBe(false);
      expect(getFlagsDryRun({})).toBe(false);
      expect(getFlagsDryRun({ dryRun: true })).toBe(true);
      expect(getFlagsDryRun({ "dry-run": true })).toBe(true);
    });
  });

  describe("get template variant", () => {
    type TemplateVariantTestCase = {
      flags: IIronlauncherConfig | undefined;
      name: string;
    };

    describe("none", () => {
      const testCases: TemplateVariantTestCase[] = [
        {
          flags: undefined,
          name: "no arg",
        },
        {
          flags: {},
          name: "empty object",
        },
        {
          flags: { auth: true },
          get name() {
            return `${JSON.stringify(this.flags)}`;
          },
        },
        {
          flags: { view: true },
          get name() {
            return `${JSON.stringify(this.flags)}`;
          },
        },
        {
          flags: { views: false },
          get name() {
            return `${JSON.stringify(this.flags)}`;
          },
        },
        {
          flags: { auth: true },
          get name() {
            return `${JSON.stringify(this.flags)}`;
          },
        },
      ];

      for (const tc of testCases) {
        it(`works when ${tc.name} is passed`, () => {
          const opt = getFlagsProjectVariant(tc.flags);
          expect(opt.isNone()).toBe(true);
        });
      }
    });

    describe("views", () => {
      const testCases: TemplateVariantTestCase[] = [
        {
          flags: { views: true },
          name: "views with bool",
        },
        {
          flags: { views: "true" },
          name: "views with true string",
        },
        {
          flags: { fs: true, views: "true" },
          name: "views and other variants are defined",
        },
      ];

      for (const tc of testCases) {
        it(`retuns Some(views) in case the arg passed is ${tc.name}`, async () => {
          const opt = getFlagsProjectVariant(tc.flags);
          expect(opt.isSome()).toBe(true);

          // @ts-expect-error
          expect(opt.get()).toBe("views");
        });
      }
    });

    describe("json", () => {
      const testCases: TemplateVariantTestCase[] = [
        {
          flags: { json: true },
          name: "json with bool",
        },
        {
          flags: { json: "true" },
          name: "json with true string",
        },
        {
          flags: { fs: true, json: "true" },
          name: "json and other variants (not views) are defined",
        },
      ];

      for (const tc of testCases) {
        it(`retuns Some(views) in case the arg passed is ${tc.name}`, () => {
          const opt = getFlagsProjectVariant(tc.flags);
          expect(opt.isSome()).toBe(true);
          // @ts-expect-error
          expect(opt.get()).toBe("json");
        });
      }
    });

    describe("fs", () => {
      const testCases: Array<Omit<TemplateVariantTestCase, "name">> =
        IHL_FLAGS.fs.map((el) => {
          return {
            flags: {
              [el]: true,
            },
          };
        });

      for (const tc of testCases) {
        it("retuns Some(views) in case the arg passed is with any of variants of fs", () => {
          const opt = getFlagsProjectVariant(tc.flags);
          expect(opt.isSome()).toBe(true);
          // @ts-expect-error
          expect(opt.get()).toBe("fs");
        });
      }
    });
  });

  describe("get flags auth", () => {
    type TemplateVariantTestCase = {
      flags: IIronlauncherConfig | undefined;
      name: string;
      result: "session" | "jwt";
    };

    const testCases: TemplateVariantTestCase[] = [
      {
        flags: { views: true },
        name: "jwt where auth is not defined",
        result: "jwt",
      },
      {
        flags: { auth: "session" },
        name: "auth is specified",
        result: "session",
      },
      {
        flags: undefined,
        name: "somehow flags are not passed",
        result: "jwt",
      },
    ];

    for (const tc of testCases) {
      it(`should get ${tc.result} whenever ${tc.name}`, () => {
        const opt = getFlagsAuth(tc.flags);

        expect(opt).toBe(tc.result);
      });
    }
  });
}
