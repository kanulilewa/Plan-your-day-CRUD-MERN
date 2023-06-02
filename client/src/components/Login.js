
import { useState } from "react";
import { LoginUser } from "../api";


export default function Login(){

    const [login, setLogin] = useState({
        
        email: "",
        password: "",
        
    })

    async function HandleSubmit(e) {
        e.preventDefault();
        const {email, password} = login;
        const logged_user = await LoginUser(email, password);
        setLogin({
            
            email: "",
            password: "",
             
        }); 
    }

    return(
        <div style={{width: '100vw', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <div className="form-frame">
        <h2 style={{marginBottom: '.5rem'}}>Log in to your account</h2>
        <form className="form" onSubmit={HandleSubmit}>
            
            <label>Email</label>
            <input name="email" type="email" placeholder="Enter your email" value={login.email} onChange={(e) => setLogin({...login, [e.target.name]: e.target.value})}/>
            <label>Password</label>
            <input name="password" type="password" placeholder="Enter your password" value={login.password} onChange={(e) => setLogin({...login, [e.target.name]: e.target.value})}/>
            
            <button className="signup-btn" type="submit">Log in</button>
        </form>
        </div>
        
        </div>
    );
}