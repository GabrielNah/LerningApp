import React, {useEffect, useState} from 'react';
import HttpService from "../Axios/HttpService";
import Loader from "./Loader";
import {NavLink} from "react-router-dom"

const OtherUsers = () => {
    const [users,setUsers]=useState([]);
    const [friends,setFriends]=useState([]);
    const [sentFriendRequestsTo,setSentFriendRequestsTo]=useState([]);
    const [loaded,setLoaded]=useState(false);

    const getUsers=async ()=>{
        try {
            let {data}=await HttpService().get('/user/others')
            return data;
        }catch (e) {
            console.log(e)
            throw e;
        }
    }

    const sendFriendRequest=async (id)=>{
        try{
            setLoaded(false)
            let {data:{success}}=await HttpService().post(`/requests/${id}`)
            if (success){
                setSentFriendRequestsTo(Array.from(new Set([...sentFriendRequestsTo,id])))
            }
            setLoaded(true)
        }catch (e) {
         console.log(e)
            setLoaded(true)
        }
    }
    useEffect(()=>{
        getUsers().then(({users,friends,sentFriendRequestsTo})=>{
            setUsers(users)
            setFriends(friends)
            setSentFriendRequestsTo(sentFriendRequestsTo)
            setLoaded(true)
        }).catch(e=>console.log(e))
    },[])

    const FRIENDS=()=>{
       return  users.map((user)=>(     <div key={user.id} className="col-lg-2 mb-4 justify-content-between " style={ {width:'30%'}} >
           <div className="card">
                <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                    <img src={user?.additional?.avatar ?  '/assets/'+ user?.additional?.avatar : '/Theme/user-default.png'}
                         alt="avatar" className="img-fluid"/><a>
                    <div className="mask"
                         style={{backgroundColor: 'rgba(251, 251, 251, 0.15)'}}></div>
                </a></div>
                <div className="card-body">
                    <h5 className="card-title">{user?.name}</h5>
                    {friends.includes(user.id) ?
                        <NavLink className="btn btn-success" to={'/users/'+user?.id}>View Profile</NavLink>
                        :sentFriendRequestsTo.includes(user?.id) ? <button className={'btn btn-secondary'}>Friend request is sent</button>
                            :<button onClick={()=>sendFriendRequest(user.id)} className={'btn btn-primary'}> Send Friend request </button>
                    }
                </div>
            </div>
       </div>));
    }
    return (
        <>
            {!loaded ? <Loader/> : (
                <div style={{
                    overflow:'hidden scroll',
                    maxHeight:'100vh',
                    flex:'1 1 0%'
                }}>
                <main className="my-5">
                    <div className="container">
                        <section className="text-center"><h4 className="mb-5"><strong>All Users</strong></h4>
                            <div className="d-flex flex-row flex-wrap gap-1">
                                    {FRIENDS()}
                            </div>
                        </section>
                    </div>
                </main>
            </div>)}
        </>
    );
};

export default OtherUsers;