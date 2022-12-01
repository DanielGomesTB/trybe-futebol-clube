import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

export default class TeamController {
  constructor(
    private _service = new MatchesService(),
  ) {}

  // parte da 20 e 21 feitas com Ajuda de Marcelo Marques
  getMatch = async (req: Request, res: Response) => {
    const { inProgress } = req.query;
    if (inProgress !== undefined) {
      const data = await this._service.getQuery(inProgress as string);
      const { status, message } = data;
      return res.status(status).json(message);
    }
    const data = await this._service.getMatch();
    const { status, message } = data;
    res.status(status).json(message);
  };
}
