import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom';

import './Navbar.css';

const Navbar = (props) => {
    let navigate = useNavigate();
    const handleLogout = () =>{
        localStorage.removeItem('token');
        navigate('/login');
    }
    const [activeIndex, setActiveIndex] = useState(null);

    const handleItemClick = (index) => {
        setActiveIndex(index);
    };

    const { mode, toggleMode } = props;

    return (
        <div>
              <nav className={`navbar navbar-expand-lg ${mode === 'light' ? 'navbar-light' : 'navbar-dark'}`}>
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">iNoteBook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item" onClick={() => handleItemClick(0)}>
                                <Link className={`nav-link ${activeIndex === 0 ? 'active' : ''}`} aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item" onClick={() => handleItemClick(1)}>
                              <Link className={`nav-link ${activeIndex === 1 ? 'active' : ''}`} to="/about">About</Link>
                            </li>
                        </ul>
                        {!localStorage.getItem('token')?<form className="d-flex">
                            <Link className="btn btn-primary mx-1" to="/login" style={{background:props.mode==='dark'?'#b9ba35':'', border:props.mode==='dark'?'solid 2px #b9ba35':''}} role="button">Log In</Link>
                            <Link className="btn btn-danger mx-1" to="/signup" style={{background:props.mode==='dark'?'#135ae8':'', border:props.mode==='dark'?'solid 2px #135ae8':''}} role="button">Sign Up</Link>
                        </form>: <button onClick={handleLogout} className="btn btn-primary mx-1" style={{background:props.mode==='dark'?'red':'', border:props.mode==='dark'? "solid 2px red":""}} >Log Out</button>}

                        <div className={`form-check form-switch text-${mode === 'light' ? 'dark' : 'light'} mx-1`}>
                          <input className="form-check-input" type="checkbox" role="switch" onClick={toggleMode} id="flexSwitchCheckDefault"/>
                          <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
                            {mode === 'light' ? 'Enable Dark Mode' : 'Disable Dark Mode'}
                          </label>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
