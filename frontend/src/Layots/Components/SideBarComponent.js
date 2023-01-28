import React from 'react';
import {useAuthContext} from "../../Contexts/Auth/AuthContext";
import {useNavigate,NavLink} from "react-router-dom";
const SideBarComponent = () => {
    let {logout,user}=useAuthContext()
    let navigate=useNavigate()
    const executeLogout =async () => {
      await logout()
      navigate('/login')
    }
    return (
        <>
            <nav className="st-menu st-effect-1" id="menu-1">
                <h2 className="icon icon-lab">{user.name}</h2>
                <ul>
                    <li><NavLink className="icon icon-data" to={'profile'}>Profile</NavLink></li>
                    <li><NavLink className="icon icon-location" to={'dashboard'}>Dashboard</NavLink></li>
                    <li><NavLink className="icon icon-study" to={'posts'}>Create Article</NavLink></li>
                    <li><NavLink className="icon icon-study" to={'users'}>Other Users</NavLink></li>
                    <li><NavLink className="icon icon-study" to={'requests'}>Friend Requests</NavLink></li>
                </ul>
                <div className="d-flex justify-content-center align-items-center mt-5">
                    <button onClick={executeLogout} className="btn btn-secondary m-auto">
                        Logout
                    </button>
                </div>
            </nav>
        </>
    );
};

export default SideBarComponent;