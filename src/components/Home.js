import React from 'react'
import './Home.css';
import Notes from './Notes.js';


const Home = (props) => {

  return (
    <div className='custom'>    
      <Notes mode={props.mode}/>

      {/* <div className="container my-4">
        <h2>Add a Note</h2>
      </div> */}
    </div>
  )
}

export default Home
