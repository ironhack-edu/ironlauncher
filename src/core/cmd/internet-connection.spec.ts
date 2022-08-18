import { Result } from "@swan-io/boxed";
import { it } from "vitest";

it("should work", async () => {
  try {
    const itWorks = await makeTimeout(wait(1000), 100);
    console.log("itWorks:", itWorks);
  } catch (error) {
    console.log("error:", error);
  }
});

async function d(d: AbortController) {
  setTimeout(() => {}, 10);
}

function wait(time = 1000) {
  return new Promise<Result<boolean, string>>((r) =>
    setTimeout(() => {
      r(Result.Ok(true));
    }, time)
  );
}

function fail(time: number): Promise<Result<boolean, string>> {
  return new Promise((r) =>
    setTimeout(() => {
      r(Result.Error("Timedout"));
    }, time)
  );
}

function makeTimeout(
  fn: Promise<any>,
  timeout = 1000
): Promise<Result<boolean, string>> {
  return Promise.race([fail(timeout), fn]);
}
