const mongoose = require("mongoose");

const VideoSchema= new mongoose.Schema({
    userId:{
       type:String,
       required: true 
    },
    title:{
        type:String,
        required: true 
     },
     description:{
            type:String,
            required: true 
     },
     videoUrl:{
        type:String,
        required: true 
     },
     videoViews:{
        type:Number,
        default:0
     },
     videoLikes:{
        type:Number,
        default:0
     },






},{timestamps: true})


export default mongoose.model("Video", VideoSchema)