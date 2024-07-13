import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const SignUp = (props) => {
  const [creads, setCreads] = useState({ name: "", email: "", password: "", cpassword: "" });
  const [showPassword, setShowPassword] = useState(false);
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    // to avoid reloading
    e.preventDefault();
    const { name, email, password, cpassword } = creads;

    // check if passwords match or not
    if (password !== cpassword) {
      alert("password doesn't match");
      return;
    }

    const response = await fetch("http://localhost:5000/api/auth/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name, email, password })
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // save the auth token and redirect
      localStorage.setItem('token', json.authtoken);
      navigate("/");
      props.showAlert("Account Created Successfully", "success")
    }
    else {
      props.showAlert("Either the user already exits or credentials are invalid", "warning")
      // alert("Either the user already exits or creds are invalid");
    }

  }

  const onChange = (e) => {
    setCreads({ ...creads, [e.target.name]: e.target.value })
  }

  // for password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  return (
    <div className='container mt-4'>
      <h2 className='my-3'>Create an account to use iNoteBook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" style={{ background: props.mode === 'dark' ? '#1e1e25' : '#dfdfed', border: props.mode === 'dark' ? 'none' : 'none', color: props.mode === 'dark' ? 'white' : 'black' }} id="name" name="name" onChange={onChange} minLength={3} required aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text" style={{ color: props.mode === 'dark' ? 'yellow' : '' }}>*Name should be minimum of 3 characters</div>
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" style={{ background: props.mode === 'dark' ? '#1e1e25' : '#dfdfed', border: props.mode === 'dark' ? 'none' : 'none', color: props.mode === 'dark' ? 'white' : 'black' }} id="email" name="email" onChange={onChange} aria-describedby="emailHelp" />
          <div id="emailHelp" className="form-text" style={{ color: props.mode === 'dark' ? 'yellow' : '' }}>We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type={showPassword ? "text" : "password"} className="form-control" style={{ background: props.mode === 'dark' ? '#1e1e25' : '#dfdfed', border: props.mode === 'dark' ? 'none' : 'none', color: props.mode === 'dark' ? 'white' : 'black' }} id="password" name="password" onChange={onChange} minLength={5} required />
          <div id="emailHelp" className="form-text" style={{ color: props.mode === 'dark' ? 'yellow' : '' }}>*Password should be minimum of 5 characters</div>
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Confirm Password</label>
          <input type={showPassword ? "text" : "password"} className="form-control" style={{ background: props.mode === 'dark' ? '#1e1e25' : '#dfdfed', border: props.mode === 'dark' ? 'none' : 'none', color: props.mode === 'dark' ? 'white' : 'black' }} id="cpassword" name="cpassword" onChange={onChange} minLength={5} required />
        </div>
        <div className='my-3'>
          <button type="button" className="btn btn-primary" onClick={togglePasswordVisibility}>{showPassword ? "Hide 🫣" : "Show 👁️"}</button>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default SignUp
