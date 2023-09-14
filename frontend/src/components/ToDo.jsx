import React from 'react';
import UserNav from './UserNav';
import { useState, useEffect } from 'react';
import Cookie from 'js-cookie';
import Addition from './Addition';
import ToDoItems from './ToDoItems';

const ToDo = () => {

    const token = Cookie.get('token');
    const [user, setUser] = useState(null);
    const [todolist, setTodolist] = useState([]);


    const configGet = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
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
            })
    }, [])


    return (
        <div className='courgette '>
            <UserNav />
            <div className='container'>
                <div className='row'>
                    <div className='col-12'>
                        <h3 className='text-center my-3'>Tennivalók</h3>

                        <div className="accordion shadow" id="accordionExample" style={{ 'minWidth': '694px' }}>

                            <div className="accordion-item bg-warning-subtle">
                                <h2 className="accordion-header">
                                    <button className="accordion-button collapsed bg-warning-subtle" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo"
                                        aria-expanded="false" aria-controls="collapseTwo">
                                        Tennivalók hozzáadása
                                    </button>
                                </h2>
                                <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <Addition />
                                    </div>
                                </div>
                            </div>

                            <div className="accordion-item">
                                <h2 className="accordion-header ">
                                    <button className="accordion-button bg-success-subtle" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        Tennivalók
                                    </button>
                                </h2>
                                <div id="collapseOne" className="accordion-collapse collapse show  bg-success-subtle" data-bs-parent="#accordionExample">
                                    <div className="accordion-body">
                                        <ToDoItems/>
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ToDo
