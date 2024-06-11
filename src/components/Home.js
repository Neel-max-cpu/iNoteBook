import React from 'react'
import './Home.css';
import Notes from './Notes.js';

const Home = (props) => {

  return (
    <div className='custom'>
      <div className="container my-4">
        <h2>Add a Note</h2>
        <form className='my-3'>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
              <div id="emailHelp" className="form-text" style={{color :props.mode==='light'? "" : "#e0e044"}}>We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1"/>
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
              <label className="form-check-label" style={{color :props.mode==='light'? "" : "lightskyblue"}} htmlFor="exampleCheck1">Check me out</label>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>    
      
      <Notes mode={props.mode}/>

      <div className="container my-4">
        <h2>Add a Note</h2>
      </div>
    </div>
  )
}

export default Home
