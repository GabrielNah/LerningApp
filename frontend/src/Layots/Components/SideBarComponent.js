import React from 'react';
import {useAuthContext} from "../../Contexts/Auth/AuthContext";
import {useNavigate} from "react-router-dom";
const SideBarComponent = () => {
    let {logout}=useAuthContext()
    let navigate=useNavigate()
    const executeLogout =async () => {
      await logout()
      navigate('/login')
    }
    return (
        <>
            <nav className="st-menu st-effect-1" id="menu-1">
                <h2 className="icon icon-lab">Sidebar</h2>
                <ul>
                    <li><a className="icon icon-data" href="#">Data Management</a></li>
                    <li><a className="icon icon-location" href="#">Location</a></li>
                    <li><a className="icon icon-study" href="#">Study</a></li>
                    <li><a className="icon icon-photo" href="#">Collections</a></li>
                    <li><a className="icon icon-wallet" href="#">Credits</a></li>
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