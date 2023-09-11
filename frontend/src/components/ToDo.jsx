import React from 'react'
import UserNav from './UserNav'
import { useState, useEffect } from 'react';
import Cookie from 'js-cookie'

const ToDo = () => {

    const [user, setUser] = useState(null);
    const token = Cookie.get('token');

    const config = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    }

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/user', config)
            .then(function (res) {
                if (!res.ok) {
                    nav('/')
                } else {
                    return res.json()
                }
            })
            .then(res => {
                setUser(res)
            })
    }, [])
     
  return (
    <div className='courgette'>
        <UserNav/>
      <h3>To-Do</h3>
    </div>
  )
}

export default ToDo
