import React, {useEffect, useState} from 'react';
import {useAuthContext} from "../Contexts/Auth/AuthContext";
import Loader from "./Loader";

const Profile = () => {
    const {user}=useAuthContext()
    const [loaded,setLoaded]=useState(false);
    useEffect(()=>{
        const link=<link rel="stylesheet"
                                          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/brands.min.css"
                                          integrity="sha512-G/T7HQJXSeNV7mKMXeJKlYNJ0jrs8RsWzYG7rVACye+qrcUhEAYKYzaa+VFy6eFzM2+/JT1Q+eqBbZFSHmJQew=="
                                          crossOrigin="anonymous" referrerpolicy="no-referrer"/>
        window.document.head.append(link)
        link.onload=()=>{
            setLoaded(true)
        }
    },[])
    return (
        <>
        {!loaded ? <Loader/>:
                (<div className="container d-flex justify-content-center align-items-center">
            <section className="vh-100" >
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-lg-6 mb-4 mb-lg-0">
                            <div className="card mb-3" >
                                <div className="row g-0">
                                    <div className="col-md-4 gradient-custom text-center bg-dark text-white">
                                        <img
                                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                                            alt="Avatar" className="img-fluid my-5" />
                                        <h5>{user.name}</h5>
                                        <i className="far fa-edit mb-5"></i>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body p-4">
                                            <h6>Information</h6>
                                            <hr className="mt-0 mb-4" />
                                                <div className="row pt-1">
                                                    <div className="col-6 mb-3">
                                                        <h6>Email</h6>
                                                        <p className="text-muted">info@example.com</p>
                                                    </div>
                                                </div>
                                                <hr className="mt-0 mb-4"/>
                                                    <div className="d-flex justify-content-start">
                                                        <a href="#!"><i className="fab fa-facebook-f fa-lg me-3"></i></a>
                                                        <a href="#!"><i className="fab fa-twitter fa-lg me-3"></i></a>
                                                        <a href="#!"><i className="fab fa-instagram fa-lg"></i></a>
                                                    </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>)}
            </>);
};

export default Profile;