import React from 'react'
import UserNav from './UserNav'
import { useState, useEffect } from 'react';
import Cookie from 'js-cookie'

const ErrorMsg = ({ result, field }) => <>{
    (result.status === 'error' && result.errors[field]) && <span className='text-danger'>{result.errors[field]}</span>
}</>

const Profile = () => {

    const [data, setData] = useState({});
    const [result, setResult] = useState({ status: null });
    const [user, setUser] = useState(null);

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    }

    const configGet = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + Cookie.get('token')
        }
    }

    const configPost = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + Cookie.get('token')
        }, body: JSON.stringify(data)
    }


    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/user', configGet)
            .then(function (res) {
                if (!res.ok) {
                    nav('/')
                } else {
                    return res.json()
                }
            })
            .then(res => {
                setUser(res)
                setData({
                    name: res.name,
                    email: res.email,
                })
            })
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://127.0.0.1:8000/api/profileupdate', configPost)
            .then(res => res.json())
            .then(res => {
                setResult(res);
            })
    }

    return (
        <div>
            <UserNav />
            <div className="container my-5">
                <form action="" className="bg-senf mx-auto border border-warning rounded p-3 w-75 mw488 courgette shadow" onSubmit={handleSubmit}>
                    <h3 className='text-center mb-4'>Profilom</h3>

                    <div className="mb-4">
                        <input type="text" className="form-control bg-warning-subtle" name='name' id='name' onChange={handleChange} defaultValue={user ? user.name : ''} />
                        {<ErrorMsg result={result} field="name" />}
                    </div>

                    <div className="mb-4">
                        <input type="text" className="form-control bg-warning-subtle" name='email' id='email' onChange={handleChange} defaultValue={user ? user.email : ''} />
                        {<ErrorMsg result={result} field='email' />}
                    </div>

                    <div className="mb-4">
                        <input type="password" className="form-control bg-warning-subtle" placeholder='Írd be a jelszavad!' name='password' id='password' onChange={handleChange} />
                        {<ErrorMsg result={result} field='password' />}
                    </div>

                    <div className="mb-2">
                        <button className="btn btn-outline-success form-control">Módosítás</button>
                    </div>

                    {result && result.status === 'success' &&
                        <div className="alert alert-success text-center mt-3" role="alert">{result.message}</div>
                    }

                </form>
            </div>
        </div>
    )
}

export default Profile
