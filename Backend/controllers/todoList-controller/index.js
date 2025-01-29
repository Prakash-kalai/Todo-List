const dbModule=require("../../dbModule/dbmodule")

const getData=async(req,res)=>{
    try{             
        const data=await dbModule.find().limit(5).sort({id:1});
        res.status(201).json({
            message:"succesfully",            
            data:data,
        })
    }catch(err){
        res.status(500).json({
            message:err,            
        })
    }
    
}


const postData=async(req,res)=>{ 
    console.log(req.body);
       
        try{             
            const data=await dbModule.create(req.body);
            res.status(201).json({
                message:"insert one data",            
                data:data,
            })
        }catch(err){
            res.status(500).json({
                message:err,            
            })
        }
        
    }

    const updateData = async (req, res) => {
        try {
            const title  = req.body.name;            
            const id  = req.body.id;            
            console.log(req.body);
            
            if (!id || !title) {
                return res.status(400).json({ message: "Invalid request: Missing ID or update data" });
            }                
            
            const data = await dbModule.findByIdAndUpdate(id, { title }, { new: true });
            console.log(data);
            
            if (!data) {
                return res.status(404).json({ message: "Document not found" });
            }
    
            res.status(200).json({
                message: "Successfully updated the document",
                data,
            });
        } catch (err) {
            console.error("Error updating data:", err.message);
            res.status(500).json({ message: "Internal server error", error: err.message });
        }
    };
    
const deletes=async(req,res)=>{
        
    try{             
        const data=await dbModule.deleteOne({id:req.body.id});
        res.status(201).json({
            message:"succesfully",                        
        })
    }catch(err){
        res.status(500).json({
            message:err,            
        })
    }
    
}


module.exports={postData,getData,deletes,updateData};