import React from 'react'

const Alert = (props) => {
    const mystyle={
        // background:props.mode==='light'?"#ffff7c":"#837be5",
        background:props.mode==='light'?"#ffff7c":"#ff0000",
        color:props.mode==='light'?"black":"white",    
    };
    return (
        <div>
            {/* <div className="alert alert-primary" style={{background:props.mode==='light'?"#ffff7c":"#837be5"}} role="alert"> */}
            <div className="alert alert-primary" style={mystyle} role="alert">
                {props.message}
            </div>
        </div>
    )
}

export default Alert
