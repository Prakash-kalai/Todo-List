import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector,useDispatch } from 'react-redux';
import { signGetData,signPostData } from '../redux/features/signinUser/signSlice';
import { Link } from 'react-router-dom';

const Signing = () => {                
    const dispatch=useDispatch()
    const singData=useSelector((state)=>state.signin.signin);
    console.log(singData);
    
    useEffect(()=>{
        dispatch(signGetData());        
    },[dispatch]);

    const [username,setUsername]=useState("")
    const [degree,setDegree]=useState("")
    const [password,setPassword]=useState("")
    const [conformPas,setConformPas]=useState("")
    const [mes,setMes]=useState(false);
    const passwordcheckSpecialCharacker = (password) => {
        const specialCharacterRegex = /[!@#$%^&*(),.?":{}|<>]/;
        return specialCharacterRegex.test(password);
    };        
    const submit=(e)=>{
        e.preventDefault();
        const boolean=[username,degree,password].every((value)=>Boolean(value));        
        if(boolean){
        if(password==conformPas){
            if(passwordcheckSpecialCharacker(password)){
            const sign={id:1,username:username,degree:degree,password:password,userId:Math.random(singData.length).toFixed(0)};
            dispatch(signPostData(sign));
            toast.error("Successfully Added");  
            setConformPas('');
            setDegree('');
            setPassword('');
            setUsername('')
            }else{
                toast.error("Please strong password..!")
            }
        }else{
            toast.error("Please password check..!");
            setConformPas(' ');
        }}else{
            setMes(true);            
            const time=setTimeout(()=>{
                setMes(false);
            },2000)
            clearTimeout(()=>time);
        }
    }
  
  return (
    <div>
    <div className=' mt-10 '>
        
    <form className="max-w-sm mx-auto">
    <div className='w-full text-center text-2xl font-bold'>
    <h1>User Signing</h1>    
        </div>
    
    <div className="mb-5">
    <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username :</label>
    <input type="text" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder={`${mes?"please type":"Enter username.."}`} required value={username} onChange={(e)=>setUsername(e.target.value)}/>
  </div>
  <div className="mb-5">
    <label htmlFor="degree" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Degree :</label>
    <input type="text" id="degree" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder={`${mes?"please type":"Enter course.."}`} required value={degree} onChange={(e)=>setDegree(e.target.value)}/>
  </div>  
  <div className="mb-5">
    <label htmlFor="repeat-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password :</label>
    <input type="password" id="repeat-password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder={`${mes?"please type":"Enter password.."}`} required value={password} onChange={(e)=>setPassword(e.target.value)}/>
  </div>  
  <div className="mb-5">
    <label htmlFor="repeat-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Conform Password :</label>
    <input type="password" id="repeat-password" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light" placeholder={`${mes?"please type":"Enter conformPassword.."}`} required value={conformPas} onChange={(e)=>setConformPas(e.target.value)}/>
  </div>  
  <div className='w-full flex justify-between'>
  <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={submit}>Send</button>
  <button>
    <Link to={"/login"} className="text-white  bg-red-900  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Login</Link>
</button>
  </div>
</form>

</div>
<ToastContainer/>
    </div>
  )
}

export default Signing