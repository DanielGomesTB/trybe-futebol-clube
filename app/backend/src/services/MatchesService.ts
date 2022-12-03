import { IMatch } from '../Interfaces/IMatch';
import Team from '../database/models/Team';
import Matches from '../database/models/Matches';

export default class MatchesService {
  constructor(
    private _matchModel = Matches,
    private _message422 = 'It is not possible to create a match with two equal teams',
    private _message404 = 'There is no team with such id!',

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

  getQuery = async (value: string) => {
    const inProgress = value === 'true';

    const data = await this._matchModel.findAll({
      where: { inProgress },
      include: [
        { model: Team, as: 'teamHome', attributes: { exclude: ['id'] } },
        { model: Team, as: 'teamAway', attributes: { exclude: ['id'] } },
      ],
    });
    return { status: 200, message: data };
  };

  postMatch = async (request: IMatch) => {
    const { id, homeTeam, awayTeam, homeTeamGoals, awayTeamGoals } = request;
    if (homeTeam === awayTeam) {
      return { status: 422, message: { message: this._message422 } };
    }
    const data = await this._matchModel.findOne({ where: { homeTeam } });
    if (!data) {
      return { status: 404, message: { message: this._message404 } };
    }
    const inProgress = true;
    const result = await Matches.create({
      id, homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress,
    });

    return { status: 201, message: result };
  };

  patchMatch = async (id: string) => {
    await this._matchModel.update(
      { inProgress: false },
      { where: { id } },
    );
    return { status: 200, message: { message: 'finished' } };
  };

  inGameMatch = async (id: string, homeTeamGoals: string, awayTeamGoals: string) => {
    await this._matchModel.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );
    return { status: 200, message: { message: 'updated' } };
  };
}
