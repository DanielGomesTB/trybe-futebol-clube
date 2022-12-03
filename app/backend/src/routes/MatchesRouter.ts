import { Router } from 'express';
import TokenJWT from '../utils/JWT';
import MatchesController from '../controllers/MatchesController';

const router = Router();
const matchesController = new MatchesController();
const authorizationToken = new TokenJWT();

router.get('/matches', matchesController.getMatch);
router.post('/matches', authorizationToken.authorization, matchesController.postMatch);
router.patch('/matches/:id/finish', matchesController.patchMatch);

export default router;
