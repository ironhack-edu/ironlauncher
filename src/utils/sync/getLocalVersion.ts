import pkg from "../pkg";

export const getLocalVersion = () => {
  return pkg.version.trim();
};
