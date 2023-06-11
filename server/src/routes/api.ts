import express from 'express'

import tictactoeRouter from './tictactoe'
import rockPaperScissorRouter from './rockpaperscissor';

const router=express.Router();

router.use('/tic-tac-toe',tictactoeRouter);
router.use('/rock-paper-scissors',rockPaperScissorRouter);

export default router;

