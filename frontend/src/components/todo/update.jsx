import React,{useState,useEffect} from 'react'
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';

const Update = ({display,update}) => {
useEffect(()=>{
setinput({
  title:update.title,
  description:update.description,
})
},[update])

  const [input,setinput]=useState({title:"",description:""})
  const change=(e)=>{
    const {name,value}=e.target
    setinput({...input,[name]:value})
  }

  const submit=async()=>{
    await axios
    .put(`${window.location.origin}/api/v2/updateTodo/${update._id}`, input)
    .then((response) => {
      toast.success(response.data.message);
    });

  display("none");
  }
  return (
    <div className="p-5 d-flex justify-content-center align-items-start flex-column update ">
    <h3>Update Your Task</h3>
    <input type="text"  className="todo-inputs my-4 w-100 p-3" name="title" value={input.title} onChange={change}/>
    <textarea className="todo-inputs w-100 p-3" name="description" value={input.description} onChange={change}/>
    <div>
        <button className="btn btn-dark my-4" onClick={submit}>
          UPDATE
        </button>
        <button className="btn btn-danger my-4 mx-3" onClick={() => {
            display("none");
          }} >
          Close
        </button>
      </div>
    </div>
  )
}

export default Update