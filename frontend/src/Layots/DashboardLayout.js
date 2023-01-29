import React, {useState} from 'react';
import {Link,Outlet} from "react-router-dom";
import SideBarComponent from "./Components/SideBarComponent";
const styles={
    overflow:'hidden',
    overflowY:'scroll',
    maxHeight:'100vh',
    flex:1
}
const DashboardLayout = () => {
    const [actionAuthorized,setActionAuthorized]=useState('')
    window.addEventListener('notAuthorizedEvent',(e)=>{
        setActionAuthorized(e.detail.message)
    })
    return (
        <>
            <div className={"d-flex flex-row"}>
                    <SideBarComponent/>
                        <div style={styles}>
                            {actionAuthorized ?
                                <div className={'d-flex rounded-5 mt-5 flex-column alert-danger alert justify-content-center align-items-center'}>
                                    <h1 className={'text-center text-uppercase text-danger'}> {actionAuthorized}!! </h1>
                                    <Link onClick={()=>setActionAuthorized('')} to={'dashboard'} className={'fw-bold'}>Go to Dashboard</Link>
                                </div>:
                                <Outlet/>
                            }
                        </div>
            </div>
        </>
    );
};

export default DashboardLayout;