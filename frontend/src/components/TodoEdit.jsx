import React from 'react'
import { useState, useEffect } from 'react';
import Cookie from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const TodoEdit = () => {

    const editCookie = JSON.parse(Cookie.get('edit'));
    const token = Cookie.get('token');
    const [response, setResponse] = useState(null);
    const nav = useNavigate();

    useEffect(() => {
        if (!token) {
            nav('/')
        } else {
            setData(editCookie);
        }
    }, []);

    const [data, setData] = useState({
        task: '',
        priority: 'Low',
        category: 'Family',
        comment: ''
    })

    const config = {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }, body: JSON.stringify(data)
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://127.0.0.1:8000/api/todosupdate', config)
            .then(res => res.json())
            .then(res => {
                setResponse(res);
                Cookie.remove('edit');
                nav('/todo')
            });
    }

    return (
        <div className='container d-flex justify-content-center'>

            <div className='row courgette'>
                <h3 className='text-center py-2'>Edit To-do</h3>
                <form onSubmit={handleSubmit} className='border border-warning rounded bg-senf shadow p-2' autoComplete='off'>
                    <div className='col'>


                        {response && response.status === "success" && <div className="alert alert-success text-center" role="alert">
                            {response.message}
                        </div>}
                        {response && response.status === "error" && <div className="alert alert-danger text-center" role="alert">
                            {response.message}
                        </div>}

                        {
                            editCookie &&
                            <div>
                                <div className='col mb-3'>
                                    <label htmlFor="task">To-do</label>
                                    <input className='form-control' type="text" name="task" defaultValue={editCookie.task} onChange={handleChange} />
                                </div>

                                <div className='col mb-3'>
                                    <label htmlFor="priority">Priority</label>
                                    <select className='form-control' name="priority" defaultValue={editCookie.priority} onChange={handleChange}>
                                        <option defaultValue={'Low'} >Low</option>
                                        <option defaultValue={'Normal'}>Normal</option>
                                        <option defaultValue={'High'}>High</option>
                                    </select>
                                </div>

                                <div className='col mb-3'>
                                    <label htmlFor="category">Category</label>
                                    <select className='form-control' name="category" defaultValue={editCookie.category} onChange={handleChange}>
                                        <option defaultValue={'Family'}>Family</option>
                                        <option defaultValue={'Personal'}>Personal</option>
                                        <option defaultValue={'Work'}>Work</option>
                                        <option defaultValue={'Other'}>Other</option>
                                    </select>
                                </div>

                                <div className='col mb-3'>
                                    <label htmlFor="comment">Comment</label>
                                    <textarea className='form-control' name="comment" defaultValue={editCookie.comment} onChange={handleChange} rows="8" />
                                </div>

                                <div className='col mb-3'>
                                    <button type="submit" className="btn btn-success form-control">Modification</button>
                                </div>
                            </div>
                        }
                    </div>

                </form>

            </div>
        </div>
    )
}

export default TodoEdit
