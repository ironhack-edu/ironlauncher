import net from "net";
import url from "url";

export async function hasInternetAvailable() {
  const req = url.parse("https://apple.com")!;

  return await makeConnection(443, req.hostname!);
}

const makeConnection = (port: number, host: string) => {
  const controller = new AbortController();
  return new Promise((res, rej) => {
    const client = new net.Socket();
    client.connect({ port, host }, () => {
      client.destroy();
      res(true);
    });

    client.on("error", (err) => {
      client.destroy();
      rej(err);
    });

    controller.signal.addEventListener("abort", () => {
      client.destroy();
      rej(false);
    });
  });
};
