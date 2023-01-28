import React, {useEffect, useRef, useState} from 'react';
const styles={
    textAlign:'center'
}
const stylesOfStyle={
    display:'block',
    width:'60%',
    height:'40px',
    border:'1px solid black'
}
const spanStyles={
        position: 'absolute',
        top: '-30px',
        left: '-2px',
        backgroundColor: 'black',
        padding: '5px 10px',
        fontSize: '15px',
        color:'white'
}
const HomeComponent = () => {
    const [html,setHtml]=useState('')
    const body=useRef(null)
    const InsertAdjastment=()=>{
        body.current.innerHTML=html
    }

    return (
        <div>
            <h1 style={styles}>This is my miserable home page</h1>
            <h2 style={styles}>If you don`t like it,edit it yourself</h2>
            <div className="d-flex flex-column justify-content-center align-items-center">

                <div className={'position-relative mt-5'}  style={stylesOfStyle}>
                    <span style={spanStyles}>styles for page</span>
                    <style className={'w-100 h-100'} contentEditable={true} style={stylesOfStyle} >

                    </style>
                </div>
                <div className={'position-relative mt-5 border-dark'} style={stylesOfStyle}>
                    <span style={spanStyles}>html into BODY</span>
                    <textarea onInput={e=>setHtml(e.target.value)} style={{width:'100%',height:'100%',paddingTop:'5px'}}/>
                    <button className={'btn btn-primary'}
                            onClick={InsertAdjastment}
                            style={{position:'absolute',right:0,bottom:'-37px'}}>Insert</button>
                </div>
                <div className={'position-relative mt-5'}  style={stylesOfStyle}>
                    <span style={spanStyles}>BODY</span>
                    <div className={'w-100 h-100'} id="body"  ref={body}>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeComponent;