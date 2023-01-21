import React, {useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import "../styles/loginPage.css"
import {useAuthContext} from "../Contexts/Auth/AuthContext";
const LoginComponent = () => {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [errors,setErrors]=useState([]);
    const {login}=useAuthContext();
    const navigate=useNavigate()
    const displayErrors = () => {
        return errors.map((e,index)=>{
            return (<p key={index} className=" m-0 text-decoration-underline text-danger">{e}</p>)
        })
    }
    const executeLogin =async (e) => {
        e.preventDefault();
      let success=await login({email,password})
        if(success===true){
            navigate('/profile')
        }
        if(typeof success==='object'){
            let errors=[]
            Object.values(success).forEach((e)=>errors.push(e[0]))
            setErrors(errors)
        }
    }
    return (
        <>
            <div className="login_page d-flex justify-content-center align-items-center">
                <div className="w-25">
                    <form  onSubmit={executeLogin} className="form-control  pt-3 p-2 m-auto d-flex align-items-center  flex-column ">
                        {displayErrors()}
                        <input type="text"  placeholder="Email" onInput={(e)=>setEmail(e.target.value)} className="input mt-2 w-75 mb-1"/>
                        <input type="password" placeholder="Password" onInput={(e)=>setPassword(e.target.value)} className="input w-75 mt-2 mb-1"/>
                        <div className="actions d-flex flex-row align-items-center w-75 mt-2 justify-content-between ">
                            <button  className="btn font-monospace btn-secondary w-25">Login</button>
                            <div>
                                <Link to={'/forgot'}><h6 className="font-monospace mb-0 text-center">Forgot Password?</h6></Link>
                                <hr className='m-1 border-top-1 w-100'/>
                                <Link to={'/register'}><h6 className='font-monospace mb-0 text-center'>Sign Up Here</h6></Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default LoginComponent;