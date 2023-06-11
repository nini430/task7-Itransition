import mongoose from 'mongoose'

const TikTakToeSchema=new mongoose.Schema({
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
    },

},{timestamps:true});

export default mongoose.model('GameRecord',TikTakToeSchema);