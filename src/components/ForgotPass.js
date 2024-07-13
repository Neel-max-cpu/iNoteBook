import React from 'react'
import { useNavigate } from 'react-router-dom'

const ForgotPass = (props) => {

    // TODO -- TO check if pass==confirm pass
    


    // change the pass from the data base
    // redirect to login page
    let navigate = useNavigate();
    const onNav = ()=>{
        navigate("/login");
    }

    return (
        <div>
            <div className='mt-4'>
                <h2 className='my-3'>Create A New Password</h2>
                {/* <form onSubmit={handleSubmit}> */}
                <form>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">New Password</label>
                        <input type="password" className="form-control" style={{ background: props.mode === 'dark' ? '#1e1e25' : '#dfdfed', border: props.mode === 'dark' ? 'none' : 'none', color: props.mode === 'dark' ? 'white' : 'black' }} id="email" name="email" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text" style={{ color: props.mode === 'dark' ? 'yellow' : '' }}>*Password should be minimum of 5 characters</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Confirm Password</label>
                        <input type="password" className="form-control" style={{ background: props.mode === 'dark' ? '#1e1e25' : '#dfdfed', border: props.mode === 'dark' ? 'none' : 'none', color: props.mode === 'dark' ? 'white' : 'black' }} id="password" name="password" />
                    </div>
                    <button type="submit" className="btn btn-primary" onChange={onNav}>Continue</button>
                </form>
            </div>
        </div>
    )
}

export default ForgotPass
