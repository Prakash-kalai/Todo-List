const mongoose=require("mongoose")

mongoose.connect("mongodb://localhost:27017/todoList")
.then("successfully")
.catch(error => handleError(error));

