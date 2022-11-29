import 'dotenv/config';
import * as JWT from 'jsonwebtoken';
import { IToken } from '../Interfaces/IToken';
import { ILogin } from '../Interfaces/ILogin';

export default class TokenJWT {
  constructor(private _secret = process.env.JWT_SECRET || 'jwt_secret') {
  }

  createToken = (data: ILogin) => {
    const token = JWT.sign(data, this._secret, {
      algorithm: 'HS256', expiresIn: '1d',
    });

    return token;
  };

  validateToken = (authorization: string) => {
    const data = JWT.verify(authorization, this._secret);
    const { email } = data as IToken;
    return email;
  };
}
