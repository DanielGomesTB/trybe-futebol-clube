import Team from '../database/models/Team';
import Matches from '../database/models/Matches';

export default class UserService {
  constructor(
    private _matchModel = Matches,
  ) {}

  getMatch = async () => {
    const data = await this._matchModel.findAll({
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });

    return { status: 200, message: data };
  };
}
