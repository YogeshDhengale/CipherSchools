const mongoose = require("mongoose");

const CommentsSchema= new mongoose.Schema({
    userId:{
       type:String,
       required: true 
    },
    videoID:{
        type:String,
        required: true 
     },
     desc:{
        type: String,
        required: true
     }
},{timestamps: true});


export default mongoose.model("Comment", CommentsSchema)