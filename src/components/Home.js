import React from 'react'
import './Home.css';
import Notes from './Notes.js';


const Home = (props) => {
  const {showAlert} = props;

  return (
    <div className='custom'>    
      <Notes showAlert={showAlert} mode={props.mode}/>

      {/* <div className="container my-4">
        <h2>Add a Note</h2>
      </div> */}
    </div>
  )
}

export default Home
