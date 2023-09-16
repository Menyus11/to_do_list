import React from 'react'
import { NavLink } from 'react-router-dom'
import Cookie from 'js-cookie'
import { useNavigate } from 'react-router-dom';

const UserNav = () => {

    const nav = useNavigate();
    const user = JSON.parse(Cookie.get('user'));
    const token = Cookie.get('token');

    const config = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    }

    const logOutHandle = () => {
        fetch('http://127.0.0.1:8000/api/logout', config)
            .then(res => res.json())
            .then(res => {
                if (res.status === 'success') {
                    Cookie.remove('token');
                    Cookie.remove('user');
                    nav('/')
                } else {
                    res => res.json()
                }
            })
    }

    return (
        <div className='courgette'>
            <nav className="navbar navbar-expand-lg bg-lightGreen ">
                <div className="container-fluid">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className="nav-link" aria-current="page" to="/todo"><b>Tennivalók</b></NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/addition"><b>Tennivaló hozzáadás</b></NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink className="nav-link" to="/profile"><b>Profilom</b></NavLink>
                            </li>
                        </ul>
                        <div className='mx-auto'>{user && 'Üdvözlünk ' + user.name + '!'}</div>
                        <div className="btn btn-outline-danger" onClick={logOutHandle}>Kilépés</div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default UserNav
