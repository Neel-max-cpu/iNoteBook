import React, { useState, useEffect, useContext } from 'react';
import './About.css';
import noteContext from '../context/notes/noteContext';

const About = (props) => {
  // checking context switching ---
  const a = useContext(noteContext);
  useEffect(() => {
    a.update();
    // eslint-disable-next-line
  },[]);

  const capitalizedFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const initialStyle = {
    color: props.mode === 'dark' ? 'white' : 'rgb(0 0 0 / 85%)',
    backgroundColor: props.mode === 'dark' ? '#403d3d' : 'white',
    border: '1px solid',
    borderColor: props.mode === 'dark' ? 'white' : 'rgb(0 0 0 / 85%)'
  };

  const [myStyle, setMyStyle] = useState(initialStyle);

  useEffect(() => {
    document.title = `${capitalizedFirstLetter(props.name)} - iNoteBook`;
  }, [props.name]);

  // loading bar... do see from new app video how to----{todo}

  useEffect(() => {
    const updateStyles = (mode) => {
      setMyStyle({
        color: mode === 'dark' ? 'white' : 'rgb(0 0 0 / 85%)',
        backgroundColor: mode === 'dark' ? 'rgb(39 36 36 / 85%)' : 'white',
        border: '1px solid',
        borderColor: mode === 'dark' ? 'white' : 'rgb(0 0 0 / 85%)'
      });
    };

    updateStyles(props.mode);
  }, [props.mode]);

  const containerStyle = {
    minHeight: '100vh',
    padding: '20px',
    backgroundColor: props.mode === 'dark' ? '#403d3d' : 'white',
    color: props.mode === 'dark' ? 'white' : 'rgb(0 0 0 / 85%)'
  };

  return (
    <div className="container" style={containerStyle}>
      <h1 className="my-5">About Us</h1>
      <div className="accordion" id="accordionExample" style={myStyle}>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button collapsed" style={myStyle} type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">        
              <strong>Cloud-Based Notes</strong>
            </button>
          </h2>
          <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
            <div className="accordion-body" style={myStyle}>
              iNotebook offers a cloud-based solution to keep all your notes organized and accessible from anywhere. Whether you are at home or on the go, your notes are just a click away.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button collapsed" style={myStyle} type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
              <strong>Login, Save and Free To Use! </strong>
            </button>
          </h2>
          <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div className="accordion-body" style={myStyle}>
              With iNotebook, you can create an account for free, and securely save your notes. Access your notes anytime by logging into your account from any device.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button collapsed" style={myStyle} type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
              <strong>Tags and Organization</strong>
            </button>
          </h2>
          <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div className="accordion-body" style={myStyle}>
              iNotebook allows you to organize your notes with tags, making it easy to find what you need when you need it. Categorize your notes by topic, project, or any way that suits your workflow.
            </div>
          </div>
        </div>
        <div className="accordion-item">
          <h2 className="accordion-header">
            <button className="accordion-button collapsed" style={myStyle} type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
              <strong>Creator</strong>
            </button>
          </h2>
          <div id="collapseFour" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
            <div className="accordion-body" style={myStyle}>
              This app is a full <strong>MERN</strong> Stack application, made by <strong>Neel Bhattacharya</strong>. It is built using React, with the help of YouTube tutorials, ReactJS documentation, and other resources. Enjoy using iNotebook!
              🎉🥳
            </div>
          </div>
        </div>
      </div>

      {/* context swithcing eg */}
      This is About {a.state.name} and he is in classs {a.state.class};
    </div>
  );
};

export default About;
