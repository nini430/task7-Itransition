import express from 'express'
import { addPlayer, endGame } from '../controllers/rockpaperscissor';

const router=express.Router();

router.put('/add-player',addPlayer);
router.put('/end',endGame);

export default router;

