import React, {useState} from 'react';
import {Link} from "react-router-dom";
import AxiosInstance from "../Axios/AxiosInstance";
const RegisterComponent = () => {
    let [name,setName]=useState('');
    let [email,setEmail]=useState('');
    let [password,setPassword]=useState('');
    let [password_confirmation,setPasswordConfirmation]=useState('');
    let getDetails=()=>{
        let data={
            name,
            email,
            password,
            password_confirmation
        }
        AxiosInstance.post('/register',{data})
            .then((r)=>console.log(r.data))

    }

    return (
        <>
            <div className="login_page d-flex justify-content-center align-items-center">
                <div className="w-25">

                    <form className="form-control  pt-3 p-2 m-auto d-flex align-items-center  flex-column ">
                        <p className="text-dark m-0 text-decoration-underline">Some Error Message Here</p>
                        <input type="text"  placeholder="Name" onInput={(event)=>setName(event.target.value)} className="input mt-2 w-75 mb-1"/>
                        <input type="text"  placeholder="Email"
                               onInput={(event)=>setEmail(event.target.value)}
                               className="input mt-2 w-75 mb-1"/>
                        <input type="password" placeholder="Password"
                               onInput={(event)=>setPassword(event.target.value)}
                               className="input w-75 mt-2 mb-1"/>
                        <input type="password" placeholder="Confirm Password"
                               onInput={(event)=>setPasswordConfirmation(event.target.value)}
                               className="input w-75 mt-2 mb-1"/>
                        <div className="actions d-flex flex-row align-items-center w-75 mt-2 justify-content-between ">
                            <button type="button"
                                    onClick={getDetails}
                                    className="btn font-monospace btn-secondary ">Register</button>
                            <div>
                                <h6 className="font-monospace mb-0 text-center">Have an account?</h6>
                                <hr className='m-1 border-top-1 w-100'/>
                                <Link to={'/login'}><h6 className='font-monospace mb-0 text-center'>Sign In Here</h6></Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default RegisterComponent;