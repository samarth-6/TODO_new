import React from 'react'
import { MdDelete } from "react-icons/md";
import { FaPencil } from "react-icons/fa6";

const Todocards = ({title,description,id,delid,display,updateId,tobeUpdate}) => {
  return (
    <div className="p-3 todo-card">
        <div>
            <h5>{title}</h5>
            <p className="todo-card-p">{description.split("",30)}...</p>
        </div>
        <div className="d-flex justify-content-around">
        <div className="d-flex justify-content-center align-items-center card-icon-head px-2 py-1"  onClick={() => {
            display("block");
            tobeUpdate(updateId)
            
          }}>
        {/* pencil */}
        <FaPencil className="card-icons m-2"/> Update
        </div>
        <div   className="d-flex justify-content-center align-items-center card-icon-head  px-2 py-1 text-danger" onClick={()=>{delid(id)}}>
            <MdDelete className="card-icons del m-2"/> Delete
        </div>
        </div>
    </div>
  )
}

export default Todocards