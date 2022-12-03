import Team from '../database/models/Team';

export default class TeamService {
  constructor(
    private _teamModel = Team,
  ) {}

  getTeam = async () => {
    const data = await this._teamModel.findAll();

    return { status: 200, message: data };
  };

  getTeamId = async (id: string) => {
    const data = await this._teamModel.findOne({ where: { id } });

    return { status: 200, message: data };
  };
}
