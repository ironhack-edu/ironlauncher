export interface Install {
  packages: string[];
  isDev: boolean;
  scope: string;
}

export type InitialPackages = Install & {
  isAuth?: boolean;
};

export interface InstallBase extends Install {
  prefix: string;
}
