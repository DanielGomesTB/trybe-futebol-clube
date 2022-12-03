import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
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

  postMatch = async (req: Request, res: Response) => {
    const result = await this._service.postMatch(req.body);
    const { status, message } = result;
    res.status(status).json(message);
  };

  patchMatch = async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await this._service.patchMatch(id);
    const { status, message } = result;
    res.status(status).json(message);
  };
}
