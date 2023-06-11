import { Request, Response, NextFunction } from 'express';
import asyncHandler from 'express-async-handler';
import TikTakToe from '../models/TikTakToe';
import ErrorResponse from '../utils/errorResponse';
import { GameInput } from '../types/game';

const addPlayer = asyncHandler(
  async (
    req: Request<{}, {}, GameInput>,
    res: Response,
    next: NextFunction
  ) => {
    let game: any;
    game = await TikTakToe.findOne({ roomName: req.body.roomName });

    if (!game) {
      game = await TikTakToe.create({
        roomName: req.body.roomName,
        player1Joined: true,
      });
      return res.status(201).json({success:true,message:'waiting',symbol:'X',roomName:game.roomName});
    } else {
      if (!game.player2Joined) {
        game.player2Joined = true;
        await game.save();
        return res.status(200).json({success:true,message:'start',symbol:'O',roomName:game.roomName});
      } else {
        return next(new ErrorResponse('Room is already full', 409));
      }
    }
  }
);

const endGame=asyncHandler(async(req:Request<{},{},GameInput>,res:Response,next:NextFunction)=>{
    const game=await TikTakToe.findOne({roomName:req.body.roomName});
    if(!game) {
      return next(new ErrorResponse('No game found',404))
    }
    await game.deleteOne();
    return res.status(200).json('deleted')
})

export { addPlayer, endGame };
