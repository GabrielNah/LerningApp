import React, {useState} from 'react';
import {Link,useNavigate} from "react-router-dom";
import {useAuthContext} from "../Contexts/Auth/AuthContext";
const RegisterComponent = () => {
    let [name,setName]=useState('');
    let [email,setEmail]=useState('');
    let [password,setPassword]=useState('');
    let [password_confirmation,setPasswordConfirmation]=useState('');
    let [errors,setErrors]=useState([])
    const navigate=useNavigate()

    const displayErrors = () => {
      return errors.map((e,index)=>{
          return (<p key={index} className=" m-0 text-decoration-underline text-danger">{e}</p>)
      })
    }
    let {register}=useAuthContext();
    let executeRegister=async ()=>{
        let success=await register({name,email,password,password_confirmation})
        if (success === true){
            navigate('/profile')
        }
        if (typeof success ==='object'){
            let errors=[]
            Object.values(success).forEach((e)=>errors.push(e[0]))
            setErrors(errors)
        }
    }

    return (
        <>
            <div className="login_page d-flex justify-content-center align-items-center">
                <div className="w-25">
                    {displayErrors()}
                    <form className="form-control  pt-3 p-2 m-auto d-flex align-items-center  flex-column ">

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
                                    onClick={executeRegister}
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