import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const ForgotPass = (props) => {

    // change the pass from the data base
    // redirect to login page
    const [creds, setCreds] = useState({ email: "", password: "", cpassword: "" });
    const [error, setError] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    
    // eslint-disable-next-line
    const [message, setMessage] = useState(null);
    
    const [success, setSuccess] = useState(null);
    let navigate = useNavigate();


    const handleSubmit = async (e) => {
        // to prevent reloading
        e.preventDefault();
        const { email, password, cpassword } = creds;

        // check if the password matches the confirm password
        if (password !== cpassword) {
            setError("Passwords do not match");
            setTimeout(() => setError(null), 1500);
            return;
        }

        // Code to change the password in the database can go here
        try {
            // for local host/directly connecting to mongo db using local host
            // const response = await fetch("http://localhost:5000/api/auth/forgot", {
            
            // for connecting to vercel 
            const response = await fetch("https://i-note-book-backend-blue.vercel.app//api/auth/forgot", {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });

            const json = await response.json();
            setMessage(json.message);

            if (json.message === "Password has been reset successfully") {
                setSuccess("Password has been reset successfully! Redirecting to Login Page...");
                setTimeout(() => {
                    setSuccess(null);
                    navigate("/login");
                }, 2000);
            }
            else{
                setError(json.error);
                setTimeout(() => setError(null), 1500);
            }
        } catch (error) {
            console.error("Error resetting password:", error);
            setMessage("An error occurred. Please try again.");
        }
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
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" style={{ background: props.mode === 'dark' ? '#1e1e25' : '#dfdfed', border: props.mode === 'dark' ? 'none' : 'none', color: props.mode === 'dark' ? 'white' : 'black' }} id="name" name="name" onChange={onChange} minLength={3} required aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text" style={{ color: props.mode === 'dark' ? 'yellow' : '' }}>*Name Of Your Account</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" onChange={onChange} style={{ background: props.mode === 'dark' ? '#1e1e25' : '#dfdfed', border: props.mode === 'dark' ? 'none' : 'none', color: props.mode === 'dark' ? 'white' : 'black' }} id="email" name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text" style={{ color: props.mode === 'dark' ? 'yellow' : '' }}>*Email Of Your Account</div>
                </div>
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
                    <button type="submit" className="btn btn-warning mx-2">Continue</button>
                </div>
                <div className='my-3'>
                    {error && <div className="alert alert-danger">{error}</div>}
                    {success && <div className="alert alert-success">{success}</div>}
                </div>
            </form>
        </div>
    </div>
)
}

export default ForgotPass
