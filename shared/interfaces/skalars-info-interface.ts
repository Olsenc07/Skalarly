export interface AccountCredentials {
  readonly id: string;
  readonly email: string;
  readonly emailToken: string;
  readonly isVerified: boolean;
  readonly username: string;
  readonly password: string;
}
export interface SocialLink {
  platform: string;
  url: string;
}
// see if  this can be broken down!
export interface SkalarInfoInterface {
  readonly id?: string;
  readonly username: string;
  name?: string;
  bio?: string;
  region?: string;
  institution?: string;
  webPages: string[];
  birthday?: string;
  major: string[];
  minor: string[];
  sport: string[];
  club: string[];
  socialLinks: SocialLink[];
  publicAccount?: boolean;
  followers: number;
  following: number;
  completedCourses: string[];
  pursuingCourses: string[];
  profilePic: string;
  cloudinaryId: string;
  blocklist: string[];
  readonly skalar?: string;
}
export interface InitialAccountInterface {
  email: string;
  username: string;
  password: string;
}
