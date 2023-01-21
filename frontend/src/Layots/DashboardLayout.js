import React from 'react';
import {Outlet} from "react-router-dom";
import SideBarComponent from "./Components/SideBarComponent";
const styles={
    overflow:'hidden',
    overflowY:'scroll',
    maxHeight:'100vh',
    flex:1
}
const DashboardLayout = () => {
    return (
        <>
            <div className={"d-flex flex-row"}>
                <SideBarComponent/>
                <div style={styles}>
                    <Outlet/>
                </div>
            </div>
        </>
    );
};

export default DashboardLayout;