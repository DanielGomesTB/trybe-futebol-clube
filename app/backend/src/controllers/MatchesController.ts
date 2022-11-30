import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

export default class TeamController {
  constructor(
    private _service = new MatchesService(),
  ) {}

  getMatch = async (req: Request, res: Response) => {
    const data = await this._service.getMatch();
    const { status, message } = data;
    res.status(status).json(message);
  };
}
