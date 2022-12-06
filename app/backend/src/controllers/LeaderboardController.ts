import { Request, Response } from 'express';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  constructor(
    private _service = new LeaderboardService(),
  ) {}

  getLeaderboard = async (req: Request, res: Response) => {
    const data = await this._service.getLeaderboard();
    const { status, message } = data;
    res.status(status).json(message);
  };
}
