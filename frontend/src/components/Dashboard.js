import React, {useEffect, useState} from 'react';
import HttpService from "../Axios/HttpService";
import Loader from "./Loader";
import {useLocation, useNavigate,useSearchParams,NavLink } from "react-router-dom";


const Dashboard = () => {
    const [searchParams]= useSearchParams();
    const [currentPage,setCurrentPage]=useState(1);
    const [lastPage,setLastPage]=useState(1);
    const [posts,setPosts]=useState([]);
    const createSearchParams=(page)=>{
        let search=new URLSearchParams
        search.append('page',page)
        return `?${search.toString()}`
    }
    const navigate=useNavigate();
    const navigateToPageWithPageQuery = (page) => {
      navigate(`/dashboard${createSearchParams(page)}`)
    }
    useEffect(()=>{
        fetchPosts(searchParams.get('page')??null)
    },[searchParams])

    const prevPageIsAvailable = () => {
      return currentPage > 1;
    }
    const nextPageIsAvailable = () => {
      return currentPage < lastPage;
    }
    const loadNextPagePosts=(e)=>{
        e.preventDefault()
        if (nextPageIsAvailable()){
            navigateToPageWithPageQuery(currentPage+1)
        }
    }
    const loadPrevPagePosts = (e) => {
        e.preventDefault()
        if (prevPageIsAvailable()){
            navigateToPageWithPageQuery(currentPage-1)
        }
    }
    const PostLinks=()=>{
        return [...Array(lastPage).keys()].map((page,index)=>(
            <li key={index} className="page-item">
                <NavLink className="page-link" to={`/dashboard${createSearchParams(page+1)}`}>{page +1}</NavLink>
            </li>
        ))

    }

    const POSTS=()=>{
       return  posts.map((post,index)=>(<div key={index} className="col-lg-2 mb-4 justify-content-between" style={{width:'30%'}}>
                    <div className="card">
                        <div className="bg-image hover-overlay ripple" data-mdb-ripple-color="light">
                            <img src={'/assets/'+post.image} alt={post.title}
                                 className="img-fluid"/>
                            <a href="#!">
                                <div className="mask"
                                     style={{backgroundColor: 'rgba(251, 251, 251, 0.15)'}}></div>
                            </a>
                        </div>
                        <div className="card-body">
                            <h5 className="card-title">{post.title}</h5>
                            <p className="card-text">
                                {post.article}
                            </p>
                            <a href="#!" className="btn btn-primary">Read</a>
                        </div>
                    </div>
                </div>))
    }

    const [loaded,setLoaded]=useState(false)
    const fetchPosts=async (page)=>{
        try{
            let {data:{posts}}=await   HttpService().get(`/post${page?`?page=${page}`:''}`)
            setCurrentPage(posts.current_page)
            setLastPage(posts.last_page)
            setPosts(posts.data)
            setLoaded(true)
        }catch (e){
            setLoaded(true)
        }

    }
    return (
        <>
            {!loaded ? <Loader/> :
                <main className="my-5">
                    <div className="container">
                        <section className="text-center">
                            <h4 className="mb-5"><strong>Latest posts</strong></h4>
                            <div className={'d-flex flex-row flex-wrap gap-1'}>
                                {POSTS()}
                            </div>
                        </section>
                        <nav className="my-4" aria-label="...">
                            <ul className="pagination pagination-circle justify-content-center">
                                <li className="page-item" onClick={loadPrevPagePosts}>
                                    <a className="page-link" href="#" tabIndex="-1" aria-disabled="true">Previous</a>
                                </li>
                                        {PostLinks()}
                                <li className="page-item" onClick={loadNextPagePosts}>
                                    <a className="page-link" href="#">Next</a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </main>
            }
        </>
    );
};

export default Dashboard;