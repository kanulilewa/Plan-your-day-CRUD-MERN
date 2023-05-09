import React, {useState} from "react";
import ReactDOM  from "react-dom";
import {PostPlans, UpdatePlans, DeletePlans, GetPlans} from "../api.js"

export default function Edit({ActivateEdit, arr, setArr, edit_id}) {
    const [edited, setEdited] = useState("");
    
    const Update = async (id, new_name) => {
        const updated_plan = await UpdatePlans(id, new_name);
        setArr((arr) => 
        arr.map((x) => (x._id === id ? {...x, name: new_name} : x))
        );
    }

    function HandleChanges(e) {
        e.preventDefault();
        console.log(edited);
        Update(edit_id, edited);
        ActivateEdit();
    }
    const edit = <div className="edit-form">
<form onSubmit={HandleChanges}>

        <input className="input-edit" type="text" value={edited} onChange={(e) => setEdited(e.target.value)}></input>
        <button type="submit" className="btn" >Apply changes</button>
        <button className="btn" onClick={ActivateEdit}>x</button>
    </form>
    </div>
    return ReactDOM.createPortal(edit, document.getElementById('edit-modal'));
}