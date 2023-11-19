export interface EmailInterface {
  emailFound: boolean;
  emailState: string;
  error?: string;
}

export interface PasswordInterface {
  isPasswordValid: boolean;
  lockState: string;
  error?: string;
}
