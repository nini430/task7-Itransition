import mongoose from 'mongoose'

const connectDB=async()=>{
    const conn=await mongoose.connect(process.env.MONGO_URI!);
    console.log(`Mongodb connected at host ${conn.connection.host}`);  
}


mongoose.connection.on('error',(err)=>{
    console.log(`Error: ${err.message}`)
})
export default connectDB;