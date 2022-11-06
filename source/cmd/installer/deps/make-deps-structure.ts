import { IProjectDependency } from "../../../types/deps.types";
import { REACT_DEPS } from "./fs.deps";
import { JSON_DEPS } from "./json.deps";
import { VIEWS_DEPS } from "./views.deps";
import groupBy from "just-group-by";
import { join } from "path";
import { IronlauncherTemplate } from "../../../types/template.type";
import { DependencyInstaller } from "../command-runner";

function assertCannotReach(x: never): Record<string, IProjectDependency[]> {
  throw new Error("this should never ever be reached");
}

function makeTemplateArr<T>(
  template: IronlauncherTemplate,
  fn: (deps: Readonly<IProjectDependency[]>[]) => T
) {
  switch (template) {
    case "fullstack": {
      return fn([REACT_DEPS, JSON_DEPS]);
    }

    case "views": {
      return fn([VIEWS_DEPS]);
    }

    case "json": {
      return fn([JSON_DEPS]);
    }

    default: {
      assertCannotReach(template);
      return fn([]);
    }
  }
}

export function makePathsToProjects(
  outDir: string,
  template: IronlauncherTemplate
): (IProjectDependency & { path: string })[] {
  switch (template) {
    case "fullstack": {
      return makeTemplateArr(template, (deps) => {
        const [client, server] = deps;
        const clientPath = join(outDir, "client");
        const serverPath = join(outDir, "server");

        const clientDeps = client.map((dep) => ({
          ...dep,
          path: clientPath,
        }));

        const serverDeps = server.map((dep) => ({ ...dep, path: serverPath }));

        return [...clientDeps, ...serverDeps];
      });
    }

    default: {
      return makeTemplateArr(template, (deps) => {
        const [allDeps] = deps;
        return allDeps.map((dep) => ({ ...dep, path: outDir }));
      });
    }
  }
}
