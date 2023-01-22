import React, {useState, useRef, useEffect} from 'react';
import {useAuthContext} from "../Contexts/Auth/AuthContext";
import CustomModal from "./Reusables/Modal";
import Loader from "./Loader";
import HttpService from "../Axios/HttpService";



const PostCreator = () => {
    const {user}=useAuthContext()
    const [post,setPost]=useState('');
    const [errors,setErrors]=useState('');
    const [success,setSuccess]=useState('');
    const [title,setTitle]=useState('');
    const [loading,setLoading]=useState(false);
    const [preview,setPreview]=useState('');
    const [showModal,setShowModal]=useState(false);
    const image=useRef(null)
    const titleArea=useRef(null)
    const articleArea=useRef(null)

    useEffect(()=>{
        setTimeout(()=>{
            setSuccess('')
            setErrors('')
        },2500)
    },[(success || errors)])

    const savePost = async () => {
      try{
          setLoading(true)
          let article=new FormData
          article.append('post',post)
          article.append('title',title)
          article.append('image',image.current.files[0])
          let {data:{success}}=await HttpService().post('/post/post',article)
          if (success){
              setLoading(false)
              setSuccess('Article posted successfully');
              return;
          }
      }catch (e) {
          if (e?.response?.data?.errors){
              let errror=Object.keys(e?.response?.data?.errors)
              setErrors(e?.response?.data?.errors[errror.at(0)][0]);
              setLoading(false)
              return;
          }
          setErrors('Something went wrong,refresh page and try again')
          setLoading(false)
      }

    }
    const displayImage = (e) => {
        setPreview(URL.createObjectURL(e.target.files[0]))
        setShowModal(true)
    }
    const resetDisplay=()=>{
        URL.revokeObjectURL(preview)
    }
    useEffect(()=>{
        if (!showModal){
            resetDisplay()
        }
    },[showModal])
    const handleSave = () => {
        setShowModal(false)
    }
    const handleReseted = () => {
      image.current.type='text';
      image.current.type='file';
      setShowModal(false)
    }
    const resetPosting = () => {
        image.current.type='text';
        image.current.type='file';
        articleArea.current.value=''
        titleArea.current.value=''
    }
    const AlertStyles = () => {
        console.log(errors)
        console.log(success)
        return `alert text-bold text-center ${ errors?'alert-danger':(success?'alert-success':'')}`
    }


    return (
        <>
            {loading ? <Loader/> :
        <div>
            <CustomModal show={showModal} content={<div className={'d-flex justify-content-center align-items-center'}>
                <img className={'w-100 h-100'}  src={preview} alt=""/>
            </div>}
                         footer={<div className={'d-flex align-items-center justify-content-end'}>
                             <div className={'d-flex flex-row gap-2'}>
                                 <div onClick={handleSave} className={'btn btn-success'}>Save</div>
                                 <div onClick={handleReseted} className={'btn btn-danger'}>Reset</div>
                             </div>
                         </div>}
            />
            <section >
                <div className="container my-5 py-5">
                    {( success || errors) &&  <div className={AlertStyles()}>
                        {success || errors}
                    </div>}
                    <div className="row d-flex justify-content-center">
                        <div className="col-md-12 col-lg-10 col-xl-8">
                            <div className="card">
                                <div className="card-body">
                                    <div className="d-flex flex-start align-items-center">
                                        <img className="rounded-circle shadow-1-strong me-3"
                                             src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(19).webp"
                                             alt="avatar" width="60"
                                             height="60"/>
                                        <div>
                                            <h6 className="fw-bold text-primary mb-1">
                                                {user.name}
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer py-3 border-0" >
                                    <div className="d-flex flex-start w-100">
                                        <img className="rounded-circle shadow-1-strong me-3"
                                             src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(19).webp"
                                             alt="avatar" width="40"
                                             height="40"/>
                                        <div className="form-outline w-100">
                                            <input onInput={(e)=>setTitle(e.target.value)}
                                                   className={'form-control input mb-2'}/>
                <textarea ref={articleArea} onInput={(e)=>setPost(e.target.value)}
                          className="form-control" id="textAreaExample" rows="4"></textarea>
                                            <label className="form-label" htmlFor="textAreaExample">Message</label>
                                        </div>
                                    </div>
                                    <div className="float-end mt-2 pt-1">
                                        <label>
                                            <input ref={image} onChange={displayImage} type="file"/>
                                        </label>
                                        <button type="button" disabled={!(post && image.current?.files[0])} onClick={savePost} className="btn btn-primary btn-sm">
                                            Post Article
                                        </button>
                                        <button type="button" onClick={resetPosting} className="btn btn-outline-primary btn-sm">
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>}
        </>
    );
};

export default PostCreator;