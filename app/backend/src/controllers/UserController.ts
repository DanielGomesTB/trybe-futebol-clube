import { Request, Response } from 'express';
import UserService from '../services/UserService';

export default class UserController {
  constructor(
    private _service = new UserService(),
  ) {}

  postLogin = async (req: Request, res: Response) => {
    const data = await this._service.postLogin(req.body);
    const { status, message } = data;
    console.log(status);
    res.status(status).json(message);
  };
}
