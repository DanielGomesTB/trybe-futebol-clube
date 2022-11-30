import Team from '../database/models/Team';

export default class UserService {
  constructor(
    private _teamModel = Team,
  ) {}

  getLogin = async () => {
    const data = await this._teamModel.findAll();

    return { status: 200, message: data };
  };
}
