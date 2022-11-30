import { Request, Response } from 'express';
import TeamService from '../services/TeamService';

export default class TeamController {
  constructor(
    private _service = new TeamService(),
  ) {}

  getTeam = async (req: Request, res: Response) => {
    const data = await this._service.getLogin();
    const { status, message } = data;
    res.status(status).json(message);
  };
}
