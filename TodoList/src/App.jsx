import React from 'react'
import TodoList from './todoList/TodoList'
import "./App.css"
import Signing from './signing/Signing'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import Login from './signing/Login'

const App = () => {
  return (
    <BrowserRouter>
    <div >      
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signin' element={<Signing/>}/>
        <Route path='/' element={<TodoList/>}/>
      </Routes>
    </div>
    </BrowserRouter>
  )
}

export default App