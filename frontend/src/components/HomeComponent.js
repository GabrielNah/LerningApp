import React from 'react';
const styles={
    textAlign:'center'
}
const stylesOfStyle={
    display:'block',
    width:'60%',
    height:'40px',
    border:'1px solid black'
}
const HomeComponent = () => {
    return (
        <div>
            <h1 style={styles}>This is my miserable home page</h1>
            <h2 style={styles}>If you don`t like it,edit it yourself</h2>
            <div className="d-flex justify-content-center align-items-center">
                <style contentEditable={true} style={stylesOfStyle}></style>
            </div>
        </div>
    );
};

export default HomeComponent;