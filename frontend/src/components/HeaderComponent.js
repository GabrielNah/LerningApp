import React, {useEffect, useState} from 'react';
import {NavLink, useLocation} from "react-router-dom";
import {useAuthContext} from "../Contexts/Auth/AuthContext";

const HeaderComponent = () => {
    const location = useLocation();
    const [isLoginPage,setIsLoginPage]=useState(location.pathname==='/login')
    useEffect(() => {
        if (location.pathname==='/login'){
            setIsLoginPage(true);
            return;
        }
        setIsLoginPage(false)
    }, [location]);
    return (
        <>
          <header className="d-flex flex-row align-items-center container-xl">
              <h1 className="flex-grow-1 text-dark text-center"> Some Learning Project</h1>
              <div>

                  {!isLoginPage && (<NavLink to="/login">Login</NavLink>)}
              </div>
          </header>
        </>
    );
};

export default HeaderComponent;