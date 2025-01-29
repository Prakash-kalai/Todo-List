const express=require("express")
const route=express.Router()
const controller=require("../../controllers/users/login-controller")

route.get("/",controller.getLogin);
route.post("/",controller.checkLogin)

module.exports=route




