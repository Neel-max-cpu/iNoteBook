import React, {useState} from 'react'
import {useNavigate } from 'react-router-dom';



const Login = (props) => {

  const [creads, setCreads] = useState({email:"", password:""});
  let navigate = useNavigate();
  

  const handleSubmit = async (e) => {
    // to avoid reloading
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email:creads.email, password:creads.password})
    });
    const json = await response.json();
    console.log(json);
    if(json.success){
      // save the auth token and redirect
      localStorage.setItem('token', json.authtoken);
      navigate("/");
      props.showAlert("Logged In Successfully", "success");
    }
    else{
      props.showAlert("Invalid Credentials", "warning");
      // alert("invalid creds");
    }
  }

  const onChange = (e) => {
    setCreads({ ...creads, [e.target.name]: e.target.value })
  }

  return (
    <div className='container my-4'>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" value={creads.email} onChange={onChange} style={{ background: props.mode === 'dark' ? '#1e1e25' : '#dfdfed', border: props.mode === 'dark' ? 'none' : 'none', color: props.mode === 'dark' ? 'white' : 'black' }} id="email" name="email" aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" value={creads.password} onChange={onChange} style={{ background: props.mode === 'dark' ? '#1e1e25' : '#dfdfed', border: props.mode === 'dark' ? 'none' : 'none', color: props.mode === 'dark' ? 'white' : 'black' }} id="password" name="password" />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Login
