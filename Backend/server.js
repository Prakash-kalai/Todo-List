const express=require("express")
const app=express()
const bodyParser=require("body-parser")
const port=3231
const db=require("./db")
const cors=require("cors")
const session = require("express-session");
const cookieParser = require("cookie-parser");


app.use(cookieParser());

app.use(session({
    secret: "prakash",
    saveUninitialized: true,
    resave: true,
    cookie: {
        secure: false, // Set to `true` if using HTTPS
        httpOnly: true,
        maxAge: 1000 * 60 * 60 // 1 hour
    }
}));


if(db){
    console.log('connected Database..!');
    
}else{
    console.log('aaa');
    
}
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(cors());


//sign user data
const userSign=require("./Routers/users/signin")
app.use("/signin",userSign)

//login check users
const loginCheck=require("./Routers/users/login")
app.use("/login",loginCheck)

const todoList=require("./Routers/todoRoute/route")
app.use("/todolist",todoList);



app.listen(port,()=>{
    console.log("Server is running Port:",port);
    
})