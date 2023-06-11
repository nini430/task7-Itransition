import mongoose from 'mongoose'


const RockPaperScissorSchema=new mongoose.Schema({
    player1Joined:{
        type:Boolean,
        default:false
    },
    player2Joined:{
        type:Boolean,
        default:false
    },
    roomName:{
        type:String,
        required:true
    }
    
})

export default mongoose.model('RockPaperScissor',RockPaperScissorSchema);