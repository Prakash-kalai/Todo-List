const express=require("express");
const router=express.Router();
const controller=require("../../controllers/todoList-controller/index")

router.get("/",controller.getData);
router.post("/",controller.postData);
router.put("/update",controller.updateData);
router.post("/delete",controller.deletes);


module.exports=router;