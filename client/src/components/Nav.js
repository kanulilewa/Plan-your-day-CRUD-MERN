import React from "react";
import {NavLink} from "react-router-dom";
export default function Nav() {
    return(
        <nav className="nav">
        <NavLink to="/" className="login-link"><h5 className="title">Plan Your Day</h5></NavLink>
        <div className="login-nav">
            <NavLink to="/api/plans/login" className="login-link"><h5 className="login">Log in</h5></NavLink>
            <NavLink to="/api/plans/signup" className="signup-link"><h5 className="signup">Sign up</h5></NavLink>
        </div>
        
        </nav>
    );
}