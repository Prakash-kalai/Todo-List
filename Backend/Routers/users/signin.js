const express=require("express")
const route=express.Router()
const controller=require("../../controllers/users/sign-controller")

route.get("/",controller.viewData)
route.post("/",controller.insertData)

module.exports=route




