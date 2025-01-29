import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'
import { signGetData } from '../redux/features/signinUser/signSlice'
import { useSelector,useDispatch } from 'react-redux'
import bcrypt from "bcryptjs-react"


const Login = () => {
    const dispatch=useDispatch()
    const singPas=useSelector((state)=>state.signin?.signin?.data || []);            
    const navigate=useNavigate();
    useEffect(()=>{
        dispatch(signGetData());        
    },[dispatch])
    

    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')
    const handleSubmit = async () => {        
        try {            
            const user = singPas.find((e) => e.username === username);            
            if (!user) {
                toast.error("Invalid username or password");
                return;
            }                        
            const isPasswordCorrect = await bcrypt.compare(password, user.password);                        
            
            if (isPasswordCorrect) {
                toast.success("Login successful!");
                localStorage.setItem("loginUser",JSON.stringify([user]));
                const index=setTimeout(() => {
                    navigate("/");
                }, 2000);
                clearTimeout(()=>index);
                setPassword('');
                setUsername('');
            } else {
                toast.error("Invalid username or password");
            }
        } catch (error) {
            console.error("Error during login:", error);
            toast.error("An error occurred. Please try again.");
        }
    };
    
  return (
    <div className=' mt-10 '>
<div className="max-w-sm mx-auto ">
  <div className="mb-5">
    <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username :</label>
    <input type="text" id="username" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder="Enter title..." required value={username} onChange={(e)=>setUsername(e.target.value)}/>
  </div>
  <div className="mb-5">
    <label htmlFor="repeat-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password :</label>
    <input type="password" id="repeat-password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder='Enter description..' value={password} onChange={(e)=>setPassword(e.target.value)} required />
  </div>  
  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={handleSubmit}>Send</button>
</div>
<ToastContainer/>
</div>
  )
}

export default Login