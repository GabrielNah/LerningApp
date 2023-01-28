import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import httpService from "../Axios/HttpService";
import Loader from "./Loader";
import {useAuthContext} from "../Contexts/Auth/AuthContext";

const SinglePost = () => {
    const {id}=useParams();
    const [loaded,setLoaded]=useState(false);
    const [post,setPost]=useState(null);
    const [comment,setComment]=useState('');
    const {user}=useAuthContext()
    const leaveComment = async (e) => {
        try{
            e.preventDefault()
            setLoaded(false)
            let {data}=await httpService().post('/post/'+id+'/comment',{comment})
            if (data.comment){
                setPost((prev)=>{
                    const newComment=data.comment
                    newComment.writer=user
                    const oldComments=prev.comments
                    prev.comments=Array.from(new Set([...oldComments,newComment]))
                    return prev
                })
                setComment('')
                setLoaded(true)
            }
        }catch (e) {
            console.log(e)
        }
    }
    const fetchPost = async (id) => {
        try{
            let {data:{post}}=await httpService().get('/post/'+id)
            setPost(post)
            setLoaded(true)
        }catch (e) {
            console.log(e)
        }
    }
    useEffect(()=>{
        fetchPost(id)
    },[id])
    return(<>
        {!loaded ? <Loader/>:
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-lg-8">
                            <h1 className={'text-center mt-1 mb-2'}>{post.title}</h1>
                            <article>
                                <figure className="mb-4">
                                    <img className="img-fluid rounded" style={{width:'600px',height:'400px'}}
                                                              src={'/assets/'+post.image}
                                                              alt="..."/>
                                </figure>
                                <section className="mb-5">
                                    <p className="fs-5 mb-4" style={{wordBreak:'break-word'}}>
                                        {post.article}
                                    </p>
                                </section>
                            </article>
                            <section className="mb-5">
                                <div className="card bg-light">
                                    <div className="card-body">
                                        <form className="mb-4" onSubmit={leaveComment}>
                                            <textarea className="form-control" rows="3"
                                                      onInput={e=>setComment(e.target.value)}
                                                                         placeholder="Join the discussion and leave a comment!">
                                            </textarea>
                                            <div className={'d-flex justify-content-end align-items-center mt-2'}>
                                                <button  className={'btn btn-primary'}>Save Comment</button>
                                            </div>
                                        </form>
                                        <div className="d-flex flex-column gap-2">
                                            {post.comments.map((comment,index)=>{
                                               return (<div className="ms-3 border p-1 " style={{borderRadius:'12px'}} key={index}>
                                                    <div className="fw-bold">{comment?.writer?.name}</div>
                                                   {comment?.comment}
                                                </div>)
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>}
                </>)
};

export default SinglePost;