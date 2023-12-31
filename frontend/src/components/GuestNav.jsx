import React from 'react'
import { NavLink } from 'react-router-dom'


const GuestNav = () => {
    return (
        <div className='courgette'>
            <nav className="navbar navbar-expand-lg bg-lightGreen">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link" aria-current="page" to="/"><b>Login</b></NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/register"><b>Register</b></NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default GuestNav
