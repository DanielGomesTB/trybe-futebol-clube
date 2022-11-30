import { Router } from 'express';
import MatchesController from '../controllers/MatchesController';

const router = Router();
const matchesController = new MatchesController();

router.get('/matches', matchesController.getMatch);

export default router;
