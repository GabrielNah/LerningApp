import React from 'react';
import './../styles/loader.css'
const Loader = () => {
    return (
        <div className={"d-flex justify-content-center align-items-center"} style={{width:'100vw',height:'100vh'}}>
            <div className="lds-dual-ring">
            </div>
        </div>

    );
};

export default Loader;