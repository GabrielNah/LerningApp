import React from 'react';
import HeaderComponent from "../components/HeaderComponent";
import {NavLink,Outlet} from "react-router-dom";
import {useAuthContext} from "../Contexts/Auth/AuthContext";

const MainLayout = () => {
    let {user}=useAuthContext();
    return (
        <div>
            {!user && <HeaderComponent/>}
            <Outlet/>
        </div>
    );
};

export default MainLayout;