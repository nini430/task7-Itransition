import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosApiInstance from '../axios';

interface GameInitialState {
  roomName: string;
  board: any,
  allowedMove:boolean;
  mySymbol:null|'X'|'O',
  roomEnterLoading:boolean;
}

const initialState:GameInitialState={
    roomName:'',
    board:[['', '', ''], ['', '', ''], ['', '', '']],
    allowedMove:false,
    mySymbol:null,
    roomEnterLoading:false
}

export const addPlayer=createAsyncThunk('game/player',async({roomName,onSuccess}:{roomName:string,onSuccess:(data:string)=>void;},thunkApi)=>{
    try{
      const response=await axiosApiInstance.put(`/tic-tac-toe/add-player`,{roomName});
      onSuccess && onSuccess(response.data.message);
      return response.data;
    }catch(err) {
      return thunkApi.rejectWithValue(err);
    }
})

export const endGame= createAsyncThunk('game/end',async({roomName}:{roomName:string},thunkApi)=>{
    try{
      const response=await axiosApiInstance.put('/tic-tact-toe/end',{roomName});
      return response.data;
    }catch(err) {
      return thunkApi.rejectWithValue(err);
    }
})

const ticTacToeSlice=createSlice({
    name:'tic-tact-toe',
    initialState,
    reducers:{
      setPoint:(state,action)=>{
        console.log(action.payload.x,action.payload.y)
          state.board[action.payload.x][action.payload.y]=action.payload.symbol;
      },
      setSymbol:(state,action)=>{
        state.mySymbol=action.payload;
      },
      allowMove:(state,action)=>{
        state.allowedMove=action.payload;
      },
      resetPlay:(state)=>{
        state.board=[['','',''],['','',''],['','','']];
        console.log(state.mySymbol,'symbb')
        state.mySymbol=state.mySymbol==='X'?'O':'X';
        state.allowedMove=state.mySymbol==='X'?true:false;
      }
    },
    extraReducers:builder=>{
      builder.addCase(addPlayer.pending,(state)=>{
        state.roomEnterLoading=true;
      });
      builder.addCase(addPlayer.fulfilled,(state,action)=>{
        state.mySymbol=action.payload.symbol;
        state.roomName=action.payload.roomName;
        state.roomEnterLoading=false;
        if(state.mySymbol==='X') {
          state.allowedMove=true;
        }
      });
      builder.addCase(addPlayer.rejected,(state)=>{
        state.roomEnterLoading=false;
      })
    }
})

export const {setPoint,setSymbol,allowMove,resetPlay}=ticTacToeSlice.actions;
export default ticTacToeSlice.reducer;