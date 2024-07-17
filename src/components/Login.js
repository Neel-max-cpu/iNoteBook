import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';



const Login = (props) => {

  const [creads, setCreads] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  let navigate = useNavigate();


  const handleSubmit = async (e) => {
    // to avoid reloading
    e.preventDefault();

    // for local host
    const response = await fetch("http://localhost:5000/api/auth/login", {

    // for vercel
    // const response = await fetch("https://i-note-book-backend-eight.vercel.app/api/auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: creads.email, password: creads.password })
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      // save the auth token and redirect
      localStorage.setItem('token', json.authtoken);
      props.showAlert("Logged In Successfully", "success");
      navigate("/");
    }
    else {
      props.showAlert("Invalid Credentials", "warning");
      // alert("invalid creds");
    }
  }

  const onChange = (e) => {
    setCreads({ ...creads, [e.target.name]: e.target.value })
  }


  // if forget password navigate to forget password
  const onNav = () => {
    navigate("/forgetpass");
  }

  // for password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  }

  return (
    <div className='mt-4'>
      <h2 className='my-3'>Login to continue to iNoteBook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" value={creads.email} onChange={onChange} style={{ background: props.mode === 'dark' ? '#1e1e25' : '#dfdfed', border: props.mode === 'dark' ? 'none' : 'none', color: props.mode === 'dark' ? 'white' : 'black' }} id="email" name="email" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type={showPassword ? "text" : "password"} className="form-control" value={creads.password} onChange={onChange} style={{ background: props.mode === 'dark' ? '#1e1e25' : '#dfdfed', border: props.mode === 'dark' ? 'none' : 'none', color: props.mode === 'dark' ? 'white' : 'black' }} id="password" name="password" />
        </div>
        <div className='my-3'>
          <button type="button" className="btn btn-primary" onClick={togglePasswordVisibility}>{showPassword ? "Hide 🫣" : "Show 👁️"}</button>
        </div>
        <button type="submit" className="btn btn-primary">Log in</button>
        <button type="button" className="btn btn-danger mx-3" onClick={onNav}>Forgot Password</button>
      </form>
    </div>
  )
}

export default Login
