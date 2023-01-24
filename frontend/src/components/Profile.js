import React, {useEffect, useRef, useState} from 'react';
import {useAuthContext} from "../Contexts/Auth/AuthContext";
import Loader from "./Loader";
import httpService from "../Axios/HttpService";
const imageStyles={
    width:'60px',
    height:'60px',
    borderRadius:'50%'

}
const Profile = () => {
    const {user}=useAuthContext();
    const [loaded,setLoaded]=useState(false);
    const [preview,setPreview]=useState('');
    const [additional,setAdditional]=useState(null);
    const [fbLink,setFbLink]=useState(null);
    const [twLink,setTwLink]=useState(null);
    const [IGLink,setIGLink]=useState(null);
    const [name,setName]=useState(null);
    const [error,setError]=useState('');
    const [success,setSuccess]=useState('');
    const image=useRef(null);
    const fetchAdditional = async () => {
        try{
            let {data:{additional}}=await httpService().get('/additional')
            setAdditional(additional)
        }catch (e){
            console.log(e)
        }
    }

    const applyChanges = () => {
      const data=new FormData
      data.append('fb',fbLink)
      data.append('tw',twLink)
      data.append('ig',IGLink)
      data.append('name',name)
      data.append('avatar',image.current.files.length?image.current.files[0]:null)
      httpService().put('user/profile',data)
          .then(r=>{
              console.log(r)
              setSuccess('data changes successfully')
          })
          .catch(e=> {
              if (e?.response?.data?.message){
                  setError(e?.response?.data?.message)
              }
          })

    }

    const AlertStyles = () => {
        return `alert text-bold text-center ${ error?'alert-danger':(success?'alert-success':'')}`
    }
    const previewUploadedImage = (e) => {
        setPreview(URL.createObjectURL(e.target.files[0]))
    }
    useEffect(()=>{
        if (user){
            fetchAdditional()
                .then(_=>setLoaded(true))
        }
    },[user])
    useEffect(()=>{
        setTimeout(()=>{
            console.log('ruend')
            setSuccess('')
            setError('')
        },3000)
    },[(error || success)])
    return (
        <>
        {!loaded ? <Loader/>:
                (<div className="container d-flex justify-content-center align-items-center">
            <section className="vh-100" >
                <div className="container py-5 h-100">
                    {( success || error) &&  <div className={AlertStyles()}>
                        {success || error}
                    </div>}
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col col-lg-6 mb-4 mb-lg-0 w-100">
                            <div className="card mb-3" >
                                <div className="row g-0">
                                    <div className="col-md-4 gradient-custom text-center bg-dark text-white">
                                        <img style={imageStyles}
                                            src={preview? preview: additional?.avatar}
                                            alt="Avatar" className="img-fluid my-5" />
                                        <div>
                                            <label className={'w-100'}>
                                                <input type="file" ref={image} onChange={previewUploadedImage} className={'w-100'}/>
                                            </label>
                                        </div>
                                        <h5 className={'mt-4'}>
                                            <input type="text" className={'input w-100'}
                                                   onInput={e=>setName(e.target.value)} defaultValue={user.name}/>
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
                                                            <input type="text" defaultValue={user.email} disabled className={'input'}/>
                                                        </p>
                                                    </div>
                                                </div>
                                                <hr className="mt-0 mb-4"/>
                                                    <div className="d-flex flex-column justify-content-between gap-2">
                                                        <label className={'d-flex flex-row justify-content-between align-items-center'}>
                                                            <span>
                                                                Instagram
                                                            </span>
                                                            <input type="text" defaultValue={additional?.it}
                                                                   onInput={e=>setIGLink(e.target.value)} className={'input'}/>
                                                        </label>
                                                        <label className={'d-flex flex-row justify-content-between align-items-center'} >
                                                            <span>
                                                                Facebook
                                                            </span>
                                                            <input type="text"
                                                                   onInput={e=>setFbLink(e.target.value)}
                                                                   defaultValue={additional?.fb } className={'input'}/>
                                                        </label>
                                                        <label className={'d-flex flex-row justify-content-between align-items-center'}>
                                                            <span>
                                                              Twiter
                                                            </span>
                                                            <input type="text"
                                                                   onInput={e=>setTwLink(e.target.value)}
                                                                   defaultValue={additional?.tw} className={'input'}/>
                                                        </label>
                                                    </div>
                                            <div className={'d-flex justify-content-center align-items-center mt-2'}>
                                                <button onClick={applyChanges} className={'btn btn-primary m-auto'}>Apply Changes</button>
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