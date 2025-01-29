import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../redux/features/todoListSlice/todoSlice"
import signReducer from "../redux/features/signinUser/signSlice"
import loginReducer from "../redux/features/signinUser/loginSlice"

export const store=configureStore({
    reducer:{   
        TodoList:todoReducer,           
        signin:signReducer,
        login:loginReducer,
    }
})