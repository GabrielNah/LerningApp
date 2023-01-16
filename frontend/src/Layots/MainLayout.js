import React from 'react';
import HeaderComponent from "../components/HeaderComponent";
import {NavLink,Outlet} from "react-router-dom";

const MainLayout = () => {
    return (
        <div>
            <HeaderComponent/>
            <Outlet/>
        </div>
    );
};

export default MainLayout;