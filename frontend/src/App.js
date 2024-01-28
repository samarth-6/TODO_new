import React,{useEffect} from 'react'
import Navbar from './components/navbar/navbar.js'
import Home from './components/home/home.js'
import Signup from './components/signup/signup.js'
import Signin from './components/signup/signin.jsx'
import Todo from './components/todo/todo.jsx'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";

import {useDispatch} from "react-redux"
import {authActions} from './store'

const App = () => {
  const dispatch=useDispatch();
  useEffect(()=>{
    //refresh karne pe wo login hi rehega component and if iska use na kare to wo refresh karne pe logout ho jayega
    //isliye ham check kar rahe h whether session storage m id h if h to login rakho refresh karne par
    //component mount kar rahe
    const id=sessionStorage.getItem("id");
    if(id){
    dispatch(authActions.login())
    }
  },[])
  return (
    <div>
    <Router>
    <Navbar/>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/signin" element={<Signin/>}/>
        <Route exact path="/signup" element={<Signup/>}/>
        <Route exact path="/todo" element={<Todo/>}/>
      </Routes>
    </Router>
    
    </div>
  )
}

export default App
