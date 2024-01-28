import React,{useState} from 'react';
import './signup.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {useDispatch} from "react-redux"
import {authActions} from '../../store'

const Signin = () => {
  const dispatch=useDispatch()
  const history=useNavigate();
  const [Inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const change=(e)=>{
    const  {name,value}=e.target;
    // email: "yoyo@gmail.com", username: "wohooo", password: "nanana"  [name]->emaail:value->{Inputs.email}
    setInputs({...Inputs,[name]:value})
  }
  const Submit = async (e) => {
    e.preventDefault();
  try {
    const response = await axios.post(
      `${window.location.origin}/api/v1/signin`,
      Inputs
    );
    console.log("Response data:", response.data);

    if (response.data) {
      sessionStorage.setItem("id", response.data.user._id); // Assuming user ID is at _id
      dispatch(authActions.login());
      history("/todo");
    } else {
      console.error("Unexpected response format:", response);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
};
  return (
    <div className="signup">
      <div className="container d-flex justify-content-center align-items-center">
        <div className="col-lg-8 column d-flex justify-content-center align-items-center">
          <div className="d-flex flex-column  w-xl-75 w-100  p-3">
            <input className="p-2 my-3 input-signup w-100" type="email" name="email" placeholder="Enter Your Email" value={Inputs.email} onChange={change} />
            <input className="p-2 my-3 input-signup w-100" type="password" name="password" placeholder="Enter Your Password"   value={Inputs.password} onChange={change} />
            <button className="btn-signup p-2" onClick={Submit}>
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
