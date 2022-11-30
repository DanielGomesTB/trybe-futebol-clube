import { Router } from 'express';
import TeamController from '../controllers/TeamController';

const router = Router();
const teamController = new TeamController();

router.get('/teams', teamController.getTeam);
router.get('/teams/:id', teamController.getTeamId);

export default router;
