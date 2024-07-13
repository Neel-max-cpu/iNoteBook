import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ForgotPass = (props) => {

    // TODO -- TO check if pass==confirm pass



    // change the pass from the data base
    // redirect to login page
    const [creds, setCreds] = useState({ password: "", cpassword: "" });
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    let navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();
        const { password, cpassword } = creds;

        if (password !== cpassword) {
            setError("Passwords do not match");
            setTimeout(() => setError(null), 1500);
            return;
        }

        // Code to change the password in the database can go here

        // Navigate to login page
        navigate("/login");
    }

    const onChange = (e) => {
        setCreds({ ...creds, [e.target.name]: e.target.value });
        setError(null); // Clear the error when user starts typing
    }

    // for password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }


    return (
        <div>
            <div className='mt-4'>
                <h2 className='my-3'>Create A New Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">New Password</label>
                        <input type={showPassword ? "text" : "password"} className="form-control" onChange={onChange} style={{ background: props.mode === 'dark' ? '#1e1e25' : '#dfdfed', border: props.mode === 'dark' ? 'none' : 'none', color: props.mode === 'dark' ? 'white' : 'black' }} id="password" name="password" minLength={5} required />
                        <div id="emailHelp" className="form-text" style={{ color: props.mode === 'dark' ? 'yellow' : '' }}>*Password should be minimum of 5 characters</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                        <input type={showPassword ? "text" : "password"} className="form-control" onChange={onChange} style={{ background: props.mode === 'dark' ? '#1e1e25' : '#dfdfed', border: props.mode === 'dark' ? 'none' : 'none', color: props.mode === 'dark' ? 'white' : 'black' }} id="cpassword" name="cpassword" minLength={5} required />
                    </div>
                    <div className='my-3'>
                        <button type="button" className="btn btn-primary" onClick={togglePasswordVisibility}>{showPassword ? "Hide 🫣" : "Show 👁️"}</button>
                    </div>
                    <div>
                        <button type="submit" className="btn btn-warning">Continue</button>
                        {error && <div className="alert alert-danger">{error}</div>}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ForgotPass
