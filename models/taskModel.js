///import the mongoose
const mongoose=require('mongoose');
///define the task schema -> Requirements of model
const taskSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["pending","in-process","completed"],
        required:true
    },
    priority:{
        type:String,
        enum:["High","Low","Moderate"],
        required:true
    },
    dueDate:{
        type:Date,
        default:Date.now,
    },
    createdDate:{
        type:Date,
    }
})

//export the model
module.exports=mongoose.model("Task",taskSchema);