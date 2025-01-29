const signModel=require("../../dbModule/signModule")
const bcrypt=require("bcrypt")

exports.viewData=async(req,res)=>{
    try{
        const data=await signModel.find({});
        res.status(200).json({
            messag:"All Data",
            data:data
        })
        
    }catch(err){
        res.status(500).json({
            err:err
        })
    }
}
exports.insertData=async(req,res)=>{
    console.log(req.body);    
     try{
         const {id,userId,name,username,password}=req.body
         const bcryptPass=await bcrypt.hash(password,10)
         const fildata=await signModel.find({})
         const filterData=fildata.map((e)=>e.username)        
  
         if (filterData.includes(username)){
             res.json({
                 message:"all ready name exites",                 
              })
         }else{
             const insert={
                 id:id,
                 userId:userId,
                 name:name,
                 username:username,
                 password:bcryptPass
         }
             const data=await signModel.create(insert)
             res.status(201).json({
             message:"ond data insert",
             data:data
         })
     }
  
  
     }catch(err){
         res.status(500).json({
             err:err
         })
  
     }
}


