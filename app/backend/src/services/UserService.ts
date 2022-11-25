import { compareSync } from 'bcryptjs';
import TokenJWT from '../utils/JWT';
import { IUser } from '../Interfaces/IUser';
import Users from '../database/models/User';

export default class UserService {
  constructor(
    private _JWT = new TokenJWT(),
    private _userModel = Users,
  ) {}

  postLogin = async (login: IUser) => {
    const { email, password } = login;

    const data = await this._userModel.findOne({ where: { email } });
    if (data) {
      const compare = compareSync(password, data.password);
      if (!compare) {
        return { status: 401, message: 'Unauthorized' };
      }
    }

    const token = this._JWT.createToken(login);
    return { status: 200, message: { token } };
  };
}
