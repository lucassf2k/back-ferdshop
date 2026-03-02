export interface PasswordProtocol {
  value: string;
  salt: string;
  algorithm: string;
  validate(password: string): boolean;
}
