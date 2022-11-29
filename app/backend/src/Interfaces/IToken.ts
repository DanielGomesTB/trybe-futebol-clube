import { ILogin } from './ILogin';

export interface IToken extends ILogin {
  iat: number;
  exp: number;
}
