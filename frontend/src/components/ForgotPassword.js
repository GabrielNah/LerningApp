import React from 'react';
import {Link} from "react-router-dom";

const ForgotPassword = () => {
    return (
        <>
            <div className="login_page d-flex justify-content-center align-items-center">
                <div className="w-25">

                    <form className="form-control  pt-3 p-2 m-auto d-flex align-items-center  flex-column ">
                        <p className="text-dark m-0 text-decoration-underline mb-1">Some Error Message Here</p>
                        <h6 className={'font-monospace mb-0 text-center'}>Check your Email within 2min after pressing send button</h6>
                        <input type="text"  placeholder="Write Your Email" className="input mt-2 w-75 mb-1"/>
                        <div className="actions d-flex flex-row align-items-center w-75 mt-2 justify-content-between ">
                            <button className="btn font-monospace btn-secondary ">Send</button>
                            <div>
                                <h6 className="font-monospace mb-0 text-center">Remembered Password?</h6>
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

export default ForgotPassword;