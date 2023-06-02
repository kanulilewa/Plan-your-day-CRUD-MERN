import React, {useState, useEffect} from "react";
import {BrowserRouter, Routes, Route, Link} from "react-router-dom";
import Nav from "./components/Nav.js"
import Modal from "./components/Modal.js";
import Item from "./components/Item.js";
import Edit from "./components/Edit.js";
import {PostPlans, UpdatePlans, DeletePlans, GetPlans} from "./api.js"
import Signup from "./components/Signup.js";
import Login from "./components/Login.js";


function App() {
  const [arr, setArr] = useState([]);
  useEffect(() => {
    const fetchPlans = async () => {
      const data = await GetPlans();
      setArr(data);
    };
    fetchPlans();
  }, []);
  
  
  const [active_edit, setActive_edit] = useState(false);
  const [active, setActive] = useState(false);
  const [edit_id, setEdit_id] = useState("");
  function Activate_modal() {
    setActive(!active);
  }
  function ActivateEdit(id) {
    setActive_edit(!active_edit);
    setEdit_id(id);
  }
  
  
  return (
    
      <div>
        <Nav />   
        <Routes>
        
          <Route path="/" element={<div className="welcome"><Link style={{textDecoration: 'none'}} to="/api/plans"><h3 className="welcome-h3">See existing plans</h3></Link></div>}/>
          <Route path="/api/plans" exact={true} element={<div className="main"> 
        
        <button className="btn btn-mrgn-tp" onClick={Activate_modal}>Create a new task</button>
        <Item  edit_id={edit_id} arr={arr} setArr={setArr} ActivateEdit={ActivateEdit} active_edit={active_edit} setActive_edit={setActive_edit}/>
      </div> }/>
          <Route path="/api/plans/login" element={<Login />} />
          <Route path="/api/plans/signup" element={<Signup />} />
        </Routes>
         {active && <Modal active={active} setActive={setActive} arr={arr} setArr={setArr} Activate_modal={Activate_modal}/>}
        {active_edit && <Edit edit_id={edit_id}  ActivateEdit={ActivateEdit} arr={arr} setArr={setArr}/>}
        
       
    </div>
    
      
    
    
  );
}

export default App;

