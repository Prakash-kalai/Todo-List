const mongoose=require("mongoose");


const TodoList=new mongoose.Schema({
    id:{
        type: Number,
        required:true,
    },
    title:{
        type:String,
        require:true,
    },
    userId:{
        type:Number,
        require:true,
    },    date:{
        type:String,
        require:true,
    }


},{
    timestamps:true,
})

const todoList=mongoose.model("courses",TodoList);

module.exports=todoList;