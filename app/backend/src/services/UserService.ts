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

    console.log(password.length);
    if (!email || !password) {
      return { status: 400, message: { message: this._badRequest } };
    }

    if (!this._regex.test(email)) {
      return { status: 401, message: { message: this._unauthorized } };
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
}
