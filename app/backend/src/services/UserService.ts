import { compareSync } from 'bcryptjs';
import TokenJWT from '../utils/JWT';
import { IUser } from '../Interfaces/IUser';
import Users from '../database/models/User';

export default class UserService {
  private _badRequest = 'All fields must be filled';
  private _regex = /\S+@\S+\.\S+/;
  private _unauthorized = 'Incorrect email or password';

  constructor(
    private _JWT = new TokenJWT(),
    private _userModel = Users,
  ) {}

  postLogin = async (login: IUser) => {
    const { email, password } = login;

    if (!email || !password) {
      return { status: 400, message: { message: this._badRequest } };
    }

    const data = await this._userModel.findOne({ where: { email } });
    if (!data) {
      return { status: 401, message: { message: this._unauthorized } };
    }
    const compare = compareSync(password, data!.password);
    if (!compare) {
      return { status: 401, message: { message: this._unauthorized } };
    }
    const token = this._JWT.createToken(login);
    return { status: 200, message: { token } };
  };

  getLogin = async (authorization: string) => {
    const email = this._JWT.validateToken(authorization);
    const data = await this._userModel.findOne({ where: { email } });

    return { status: 200, message: { role: data!.role } };
  };
}
