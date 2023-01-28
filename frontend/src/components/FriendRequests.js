import React, {useEffect, useState} from 'react';
import HttpService from "../Axios/HttpService";
import {useAuthContext} from "../Contexts/Auth/AuthContext";
import Loader from "./Loader";
import button from "bootstrap/js/src/button";

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

    function actionsButtons(request) {
        if (request.state==='rejected'){
           return <button className={'btn btn-primary'}>Resent</button>
        }
        if (request.state==='sent'){
            if (request.from===user.id){
                return <button className={'btn btn-danger'}>Cancel</button>
            }
            if (request.to===user.id){
                return (<div className={'d-flex flex-column justify-content-center align-items-center gap-2'}>
                         <button className={'btn btn-success'}>Accept</button>
                         <button className={'btn btn-danger'}>Reject</button>
                    </div>)
            }
        }
        if (request.state==='accepted'){
            return <div></div>
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
                                        <p className={`text-center ${textStyles(request.state)}`}>{request.state}</p>
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