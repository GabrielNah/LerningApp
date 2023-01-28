import React, {useEffect, useState} from 'react';
import HttpService from "../Axios/HttpService";
import {useAuthContext} from "../Contexts/Auth/AuthContext";
import Loader from "./Loader";
import button from "bootstrap/js/src/button";
import { NavLink } from "react-router-dom"

const FriendRequests = () => {
    const {user}=useAuthContext();
    const [requests,setRequests]=useState([]);
    const [loaded,setLoaded]=useState(false);

    useEffect(()=>{
        HttpService().get('/requests')
            .then(({data:{requests}})=>setRequests(requests))
            .catch(e=>console.log(e))
            .finally(()=>setLoaded(true))
    },[])
    function userAvatar(request){
        if (!!request?.sender?.additional?.avatar){
            return '/assets/'+ request?.sender?.additional?.avatar;
        }
        if (!!request?.receiver?.additional?.avatar){
            return '/assets/'+request?.receiver?.additional?.avatar;
        }
        return '/Theme/user-default.png'

    }

    function username(request){
        if (request?.sender){
            return request?.sender?.name
        }
        if (request?.receiver){
            return request?.receiver?.name
        }
    }
    function textStyles(state){
        switch (state){
            case 'rejected':
                return 'text-danger';
            case 'sent':
                return 'text-warning';
            case 'accepted':
                return 'text-success'
        }
    }
    async function resendRequest(id) {
        setLoaded(false)
        HttpService().patch('/requests/resend/'+id)
            .then(()=>{
                setRequests((prev)=>{
                   return  prev.map((req)=>{
                        if (req.id===id){
                            req.state='sent'
                        }
                        return req;
                    })
                })
            })
            .catch()
            .finally(()=>setLoaded(true))
    }

    async function rejectRequest(id){
        setLoaded(false)
        HttpService().put('/requests/reject/'+id)
            .then(()=>{
                setRequests((prev)=>{
                    return  prev.map((req)=>{
                        if (req.id===id){
                            req.state='rejected'
                        }
                        return req;
                    })
                })
            })
            .catch()
            .finally(()=>setLoaded(true))
    }

    async function cancelSentRequest(id){
        setLoaded(false)
        HttpService().delete('/requests/cancel/'+id)
            .then(()=> {
                setRequests(prev=>prev.filter(single=>single.id!==id))
            })
            .catch()
            .finally(()=>setLoaded(true))
    }
    async function acceptRequest(request){
        setLoaded(false)
        let friend_id;
        if (request.from===user.id){
            friend_id=request.to
        }
        if (request.to===user.id){
            friend_id=request.from
        }
        await HttpService().patch('/requests/accept/'+friend_id)
            .then(()=>{
                setRequests((prev)=>{
                    return  prev.map((req)=>{
                        if (req.id===request.id){
                            req.state='accepted'
                        }
                        return req;
                    })
                })
            })
            .catch()
            .finally(()=>setLoaded(true))
    }

    function actionsButtons(request) {
        if (request.state==='rejected'){
            if (request.from===user.id){
                return <button onClick={resendRequest.bind(null,request.id)} className={'btn btn-primary'}>Resend</button>
            }
            if (request.to===user.id){
                    return <div onClick={acceptRequest.bind(null,request)} className={'btn btn-success'}>Accept</div>
            }
        }
        if (request.state==='sent'){
            if (request.from===user.id){
                return <button onClick={cancelSentRequest.bind(null,request.id)}  className={'btn btn-danger'}>Cancel</button>
            }
            if (request.to===user.id){
                return (<div className={'d-flex flex-column justify-content-center align-items-center gap-2'}>
                         <button onClick={acceptRequest.bind(null,request)} className={'btn btn-success'}>Accept</button>
                         <button onClick={rejectRequest.bind(null,request.id)} className={'btn btn-danger'}>Reject</button>
                    </div>)
            }
        }
        if (request.state==='accepted'){
            let UserId;
            if (request.from===user.id){
                UserId=request.to;
            }
            if (request.to===user.id){
                UserId=request.from
            }
            return <div><NavLink className={'link-dark btn btn-info '} to={'/users/'+UserId}> View Profile</NavLink></div>
        }
    }
    return (
        <>{!loaded?<Loader/>:
            <div className="container">
                <h1 className={'text-center'}>Friend Requests</h1>
                <table className="table table-dark">
                    <thead>
                    <tr>
                        <th scope="col" className={'text-center'}>User</th>
                        <th scope="col" className={'text-center'}>State</th>
                        <th scope="col" className={'text-center'}>Actions</th>
                        <th scope="col" className={'text-center'}>Sent/Received</th>
                    </tr>
                    </thead>
                    <tbody>

                           {requests.map((request)=>(
                               <tr key={request.id}>
                                <td >
                                    <div className={'d-flex flex-column justify-content-center align-items-center'}>
                                        <img src={userAvatar(request)} className={'rounded-circle'} alt="user"/>
                                        <h4>{username(request)}</h4>
                                    </div>
                                </td>
                                <td >
                                    <div className={'d-flex justify-content-center align-items-center'}>
                                        <p className={`text-center fw-bold text-uppercase ${textStyles(request.state)}`}>{request.state}</p>
                                    </div>
                                </td>
                                <td >
                                    <div className={'d-flex flex-column justify-content-center align-items-center'}>
                                        { actionsButtons(request)}
                                    </div>
                                </td>
                                <td >
                                    <div className={'text-center'}>{request?.from===user?.id ?'Sent':'Received'}</div>
                                </td>
                               </tr>))
                           }
                    </tbody>
                </table>
            </div>}
        </>
    );
};

export default FriendRequests;