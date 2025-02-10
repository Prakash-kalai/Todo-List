const mongoose=require("mongoose")

mongoose.connect("mongodb+srv://Prakash:root123@cluster0.9ctws.mongodb.net/App")
.then("successfully")
.catch(error => handleError(error));

