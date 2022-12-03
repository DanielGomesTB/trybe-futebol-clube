import 'dotenv/config';
import * as JWT from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
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
    console.log(data);
    const { email } = data as IToken;
    return email;
  };

  // feito com ajuda de Marcelo Marques
  authorization = (req: Request, res: Response, next: NextFunction) => {
    try {
      const { authorization } = req.headers;
      const data = JWT.verify(authorization as string, this._secret);
      if (!data) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
    } catch (error) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
    next();
  };
}
