import './App.css';
import React, { useState, useEffect} from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar';
import About from './components/About';
import Home from './components/Home';
import LoadingBar from 'react-top-loading-bar'
import NoteState from './context/notes/NotesState';
import Alert from './components/Alert';
import SignUp from './components/SignUp';
import ForgotPass from './components/ForgotPass';
import Login from './components/Login';

function App() {

  const [mode, setMode] = useState('light');
  // for loading bar --
  const [progress, setProgress] = useState(0);

  // alert
  const [alert, setAlert] = useState(null);
  
  const showAlert = (message, type)=>{
    setAlert({
      // can give same name or different name
      msg : message,
      type : type
    })

    setTimeout(() =>{
      setAlert(null);
    }, 1500);
  }

  const applyBodyStyle = () => {
    // document.body.style.backgroundColor = mode === 'light' ? 'white' : '#403d3d';
    document.body.style.backgroundColor = mode === 'light' ? 'white' : 'black';
    document.body.style.color = mode === 'light' ? 'rgb(0 0 0 / 85%)' : 'white';
  };

  useEffect(() => {
    applyBodyStyle();
    // eslint-disable-next-line
  }, [mode]);

  const toggleMode = () => {
    setMode(prevMode => (prevMode === 'light' ? 'dark' : 'light'));
  };



  return (
    <>
    <NoteState>
      <BrowserRouter>
          <Navbar mode={mode} toggleMode={toggleMode}/>
          {/* <LoadingBar
            key={mode}
            color={`${mode==='light'? '#f11946' : 'yellow'}`}
            progress={progress}
            height={3}
            /> */}
          <Alert alert={alert}/>
          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home showAlert={showAlert} setProgress={setProgress} mode={mode}/>}></Route>
              <Route exact path="/about" element={<About setProgress={setProgress} name='about' mode={mode}/>}></Route>
              <Route exact path="/login" element={<Login showAlert={showAlert} setProgress={setProgress} mode={mode}/>}></Route>
              <Route exact path="/signup" element={<SignUp showAlert={showAlert} setProgress={setProgress} mode={mode}/>}></Route>
              <Route exact path="/forgetpass" element={<ForgotPass mode={mode}/>}></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
      </>
  );
}

export default App;
