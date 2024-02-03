import React,{useState} from 'react'
import './signup.css'
import Heading from './heading.jsx'
import axios from "axios"
import { useNavigate } from "react-router-dom";
const Signup = () => {
  const history = useNavigate();
  const [Inputs,setInputs]=useState({email:"",username:"",password:""})
  const change=(e)=>{
    const  {name,value}=e.target;
    // email: "yoyo@gmail.com", username: "wohooo", password: "nanana"  [name]->emaail:value->{Inputs.email}
    setInputs({...Inputs,[name]:value})
  }
  const Submit=async(e)=>{
    e.preventDefault();
    await axios.post(`${window.location.origin}/api/v1/register`,Inputs).then((response)=>{
      if (response.data.message === "User Already Exists") {
        alert(response.data.message);
      } else {
        alert(response.data.message);
        setInputs({
          email: "",
          username: "",
          password: "",
        })
        history("/signin/");
      }
      

 //submit ke baad inputs ko empty bhi karna h
      
    })
    
   
  
  }
  return (
    <div className="signup">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 column d-flex justify-content-center align-items-center ">
            <div className="d-flex flex-column  w-100 p-3">
              <input
                className="p-2  my-3 input-signup"
                type="email"
                name="email"
                placeholder="Enter Your Email"
                 
                 onChange={change}
                 value={Inputs.email}
              
              />
              <input
                className="p-2 my-3 input-signup"
                type="username"
                name="username"
                placeholder="Enter Your Username"
                 
                 onChange={change}
                 value={Inputs.username}
              />
              <input
                className="p-2 my-3 input-signup"
                type="password"
                name="password"
                placeholder="Enter Your Password" 
                onChange={change}
                value={Inputs.password}
              />

              <button className="btn-signup p-2" onClick={Submit}>
                Sign Up
              </button>
            </div>
          </div>
          <div className="d-lg-block d-none col-lg-4 column col-left d-lg-flex justify-content-center align-items-center  d-none">
           <Heading first="Sign " second="up"/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup