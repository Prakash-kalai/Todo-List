const mongoose=require("mongoose")
const signSchema=mongoose.Schema

const singUser=new signSchema({
    id:{
        type:Number,
        require:true,
    },
    userId:{
        type:Number,
        require:true
    },
    name:{type:String,
    require:true
    },
    username:{type:String,
        require:true
    },
    password:{type:String,
            require:true
    }
},{
    timestamps:true
})

const sign=mongoose.model("signin",singUser)
module.exports=sign