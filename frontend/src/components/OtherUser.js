import React, {useEffect, useState} from 'react';
import Loader from "./Loader";
import {useParams,Navigate} from "react-router-dom";
import HttpService from "../Axios/HttpService";
const imageStyles={
    width:'60px',
    height:'60px',
    borderRadius:'50%'

}
const OtherUser = () => {
    const {id}=useParams()
    const [loaded,setLoaded]=useState(false);
    const [user,setUser]=useState(null);
    const fetchUserProfile=async ()=>{
            let {data:{user}}=await HttpService().get('/user/other/'+id);
            setUser(user)
    }
    const removeFromFriends = async () => {
        try{
            setLoaded(false);
            await HttpService().delete('/requests/'+id)
            setUser(null)
        }catch (e) {
            console.log(e)
        }
        setLoaded(true)
    }
    useEffect(()=>{
        fetchUserProfile()
            .catch((e)=>{
                console.log(e)
            })
            .finally(()=>setLoaded(true))
    },[])

    return (<>
            {
                !loaded ?
                user ? <Navigate to={'/dashboard'}/>:
                <Loader/>:
                (<div className="container d-flex justify-content-center align-items-center">
                    <section className="vh-100" >
                        <div className="container py-5 h-100">
                            <div className="row d-flex justify-content-center align-items-center h-100">
                                <div className="col col-lg-6 mb-4 mb-lg-0 w-100">
                                    <div className="card mb-3" >
                                        <div className="row g-0">
                                            <div className="col-md-4 gradient-custom text-center bg-dark text-white">
                                                <img style={imageStyles}
                                                     src= {user?.additional?.avatar ? 'assets/'+user?.additional?.avatar :'/Theme/user-default.png'}
                                                     alt="Avatar" className="img-fluid my-5" />
                                                <h5 className={'mt-4'}>
                                                    <input type="text" className={'input w-100'}
                                                           disabled defaultValue={user.name??''}/>
                                                </h5>
                                            </div>
                                            <div className="col-md-8">
                                                <div className="card-body p-4">
                                                    <h6 className={'text-dark'}>Information</h6>
                                                    <hr className="mt-0 mb-4" />
                                                    <div className="row pt-1">
                                                        <div className="col-6 mb-3">
                                                            <h6 className={'text-dark'}>Email</h6>
                                                            <p className="text-muted">
                                                                <input type="text" defaultValue={user.email??''} disabled className={'input'}/>
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <hr className="mt-0 mb-4"/>
                                                    <div className="d-flex flex-column justify-content-between gap-2">
                                                        { user?.additional?.ig && <label className={'d-flex flex-row justify-content-between align-items-center'}>
                                                            <a target='_blank' className={'link-primary'} href={user?.additional?.ig??''}>Instagram</a>
                                                        </label>}
                                                        {user?.additional?.fb && <label className={'d-flex flex-row justify-content-between align-items-center'} >
                                                            <a target='_blank' href={user?.additional?.fb??'' } className={'link-primary'}>
                                                                Facebook
                                                            </a>
                                                        </label>}
                                                        {user?.additional?.tw &&
                                                            <label className={'d-flex flex-row justify-content-between align-items-center'}>
                                                                <a target='_blank' href={user?.additional?.tw??''} className={'link-primary'}>
                                                                    Twitter
                                                                </a>
                                                            </label>
                                                        }
                                                    </div>
                                                    <div className={'d-flex justify-content-center align-items-center mt-2'}>
                                                        <button onClick={removeFromFriends} className={'btn btn-danger m-auto'}>Remove From Friends</button>
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

export default OtherUser;