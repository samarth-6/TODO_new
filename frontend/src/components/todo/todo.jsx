import React, { useState,useEffect } from 'react';
import './todo.css'
import Todocards from './todocards.jsx'
import Update from './update.jsx'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"
let id=sessionStorage.getItem("id")
let toUpdateArray=[];

const Todo = () => {
    const [Inputs, setInputs] = useState({ title: "", description: "" });
   
    const [Array, setArray] = useState([]);
    const show=()=>{
    document.getElementById("textarea").style.display="block";
    };
    const change=(e)=>{
     const {name,value}=e.target;
     //setInputs kar rahe h jo kuch input m pehle se h and jo new name and value m aaya h
     setInputs({...Inputs,[name]:value})
    };
    const submit = async () => {
      const randomQueryParam = Math.floor(Math.random() * 1000);
      if (Inputs.title === "" || Inputs.description === "") {
        toast.error("Title Or Description Can't Be Empty");
      } else {
        if (id) {
          await axios
          .post(`${window.location.origin}/api/v2/addTodo?nocache=${randomQueryParam}`, {
              title: Inputs.title,
              description: Inputs.description,
              id: id,
            })
            .then((response) => {
              console.log(response);
            });
            
          setInputs({ title: "", description: "" });
          toast.success("Your Task Is Added");
         
         
        } else {
          //jo array ke andar h wo and jo ab inputs m aaya h wo ek array m aa jayega jaise 
            //title :hi descrip:nonebar->0 index//array ke andar pehle se hoga ye let's suppose
            //title:hey ,descrip:new input ->1 index //new input dono ab array m aise index 0 and 1 ke jaise store ho jayenge
            
          setArray([...Array, Inputs]);
          setInputs({ title: "", description: "" });
          toast.success("Your Task Is Added");
          toast.error("Your Task Is Not Saved ! Please SignUp");
        }
      }
    };
    const del=async(Cardid)=>{
        //child component se parent component se delete karaya
        //child component todocontainer h and parent todo
     if(id){
      await axios.delete(`${window.location.origin}/api/v2/deleteTodo/${Cardid}`,{data:{id:id}}).then((response)=>{
        toast.success("Your Task Is Deleted");
      })
    }else{
      toast.error("Please Sign Up first");
    }
    }
    const dis = (value) => {
        document.getElementById("todo-update").style.display = value;
      };
    const update=(value)=>{
      toUpdateArray=Array[value]
    }
       useEffect(() => {
        if (id) {
          //jab bhi ham todo khole vo hame is userid ki jitni bhi todolist h wo hame get method ke through frontend pe fetch karwa de
          const fetch = async () => {
            await axios
              .get(`${window.location.origin}/api/v2/getTodo/${id}`)
              .then((response) => {
                setArray(response.data.list);
              });
          };
          fetch();
        }
      }, [submit]);//matlab jab bhi submit wala click ho add button ke through to hamara use Effect chal jaana chahiye isse jo newly abhi abhi add kiya h add button ke through vo bhi dikhega bina refresh kiye aise refresh karne pe hi mount hota h useEffect but ab jaise hi submit button click hoga use Effect chalega
    
      

  return (
    <>
    <div className="todo ">
    <ToastContainer/>
        <div className="todo-main container d-flex justify-content-center align-items-center mt-5 flex-column">
        <div className="d-flex flex-column todo-inputs-div w-100 p-3 ">
            <input type="text" placeholder="Todo Task Title" className="my-2 p-2 todo-inputs"
                onClick={show}
                onChange={change}
                
                name="title"
                value={Inputs.title}
            />
            <textarea id="textarea" type="text" placeholder="Description" className="my-2 p-2 todo-inputs"
                onChange={change}
                name="description"
                value={Inputs.description}
            />
            </div>
            <div className=" w-lg-50 w-100 d-flex justify-content-end my-3">
            <button className="home-btn px-2 py-1" onClick={submit}>Add</button>
            
      </div>  
      </div>
      <div className="todo-body">
        <div className="container-fluid">
        <div className="row " >
        {Array &&
                Array.map((item, index) => (
                  <div

                    className="col-lg-3 col-11 mx-lg-5 mx-3 my-2"
                    key={index}
                  >
                    <Todocards title={item.title} description={item.description} id={item._id} delid={del}  display={dis} updateId={index} tobeUpdate={update}/>
                  </div>
                ))}
            </div>
        </div>
        </div>
      </div>
       <div className="todo-update " id="todo-update">
        <div className="container update">
       <Update display={dis} update={toUpdateArray} />
       </div>
       </div>
 
  </>
  )
}

export default Todo