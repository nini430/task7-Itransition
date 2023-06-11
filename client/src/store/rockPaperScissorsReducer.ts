import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axiosApiInstance from '../axios';

interface IRockPaperScissors {
    round: number,
    myScore:number;
    opponentScore:number;
    roomName:string;

}

const initialState:IRockPaperScissors={
    round:1,
    myScore:0,
    opponentScore:0,
    roomName:''
}   

export const addRpsPlayer=createAsyncThunk('rcf/add-player',async({roomName,onSuccess}:{roomName:string,onSuccess:(data:string)=>void},thunkApi)=>{
        try{
        const response=await axiosApiInstance.put('/rock-paper-scissors/add-player',{roomName});
        onSuccess && onSuccess(response.data);
        return response.data;
        }catch(err) {
            return thunkApi.rejectWithValue(err);
        }
})

export const endGame=createAsyncThunk('rcf/end',async({roomName}:{roomName:string},thunkApi)=>{
        try{
        const response=await axiosApiInstance.put('/rock-paper-scissors/end',{roomName});
        return response.data;
        }catch(err) {
            return thunkApi.rejectWithValue(err);
        }
})

const rockPaperScissorsReducer=createSlice({
    name:'rps',
    initialState,
    reducers:{
       changeGame(state,action) {
            state.round=state.round+1;
            if(action.payload.youWon) {
                state.myScore=state.myScore+1;
            }else{
                state.opponentScore=state.opponentScore+1;
            }

       },
       resetPlay(state) {
        state.round=0;
        state.myScore=0;
        state.opponentScore=0;
        state.roomName='';
       }
    },
    extraReducers:builder=>{
        builder.addCase(addRpsPlayer.fulfilled,(state,action)=>{
            state.roomName=action.payload.roomName;
        })
    }
})

export const {changeGame,resetPlay}=rockPaperScissorsReducer.actions;

export default rockPaperScissorsReducer.reducer;