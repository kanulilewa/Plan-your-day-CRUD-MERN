import { useState } from "react";
import ReactDOM  from "react-dom";
import {PostPlans, UpdatePlans, DeletePlans, GetPlans} from "../api.js"

export default function Modal({active, setActive, arr, setArr, Activate_modal}) {
    
    const [task, setTask] = useState("");
    
    async function HandleSubmit(e) {
        e.preventDefault();
        const new_plan = await PostPlans(task);
        setArr([...arr, new_plan]);
        setTask("");        
    }
    
    console.log(task);
    const modal = <form onSubmit={HandleSubmit} className="modal">
    <h3>Add a new task</h3>
    <input className="input"  type="text" value={task} onChange={(e) => setTask(e.target.value)}></input>
    <div className="mdl-btn-sctn">
        <button type="submit" className="btn btn-margn" >Add task</button> 
        <button className="btn" onClick={Activate_modal}>Close</button>
    </div>
    
</form>
    return ReactDOM.createPortal(modal, document.getElementById('modal'));
}
      