import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

export default class TeamController {
  constructor(
    private _service = new TeamService(),
  ) {}

  getTeam = async (req: Request, res: Response) => {
    const data = await this._service.getTeam();
    const { status, message } = data;
    res.status(status).json(message);
  };

  getTeamId = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data = await this._service.getTeamId(id);
    const { status, message } = data;
    res.status(status).json(message);
  };
}
