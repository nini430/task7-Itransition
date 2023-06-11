import asyncHandler from 'express-async-handler';
import { Request, Response, NextFunction } from 'express';

import RockPaperScissor from '../models/RockPaperScissor';
import { GameInput } from '../types/game';
import ErrorResponse from '../utils/errorResponse';

const addPlayer = asyncHandler(
  async (
    req: Request<{}, {}, GameInput>,
    res: Response,
    next: NextFunction
  ) => {
    let room: any;
    room = await RockPaperScissor.findOne({ roomName: req.body.roomName });

    if (!room) {
      room = await RockPaperScissor.create({
        roomName: req.body.roomName,
        player1Joined: true,
      });
      return res.status(201).json({message:'waiting',success:true,roomName:room.roomName})
    } else {
      if (!room.player2Joined) {
        room.player2Joined = true;
        await room.save();
        return res.status(200).json({message:'start',success:true,roomName:room.roomName})
      } else {
        return next(new ErrorResponse('Room is full!', 409));
      }
    }
  }
);

const endGame=asyncHandler(async(req:Request<{},{},GameInput>,res:Response,next:NextFunction)=>{
    const game=await RockPaperScissor.findOne({roomName:req.body.roomName});

    if(!game) {
        return next(new ErrorResponse('No game found',404));
    }
    await game.deleteOne();
    return res.status(200).json('ended')
})

export { addPlayer, endGame };
