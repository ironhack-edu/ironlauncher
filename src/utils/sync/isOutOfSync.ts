import pkg from "../../../package.json";
import { getLocalVersion } from "./getLocalVersion";
import { getRemoteVersion } from "./getRemoteVersion";

export const isOutOfSync = async () => {
  return (await getRemoteVersion()) !== getLocalVersion();
};
