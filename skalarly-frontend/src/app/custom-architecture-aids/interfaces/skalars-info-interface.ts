export interface AccountCredentials {
  readonly id: string;
  readonly email: string;
  readonly emailToken: string;
  readonly isVerified: boolean;
  readonly username: string;
  readonly password: string;
}
export interface SkalarInfoInterface {
  readonly id?: string;
  readonly username: string;
  club: string[] | null;
  domains: string[];
  sport: string[] | null;
  major: string[] | null;
  minor: string[] | null;
  name: string;
  region: string;
  institution: string;
  webPages: string[];
  readonly skalar?: string;
}
export interface InitialAccountInterface {
  email: string;
  username: string;
  password: string;
}
