import React, { useEffect } from 'react'
import { useState } from 'react'
import Cookie from 'js-cookie';
import UserNav from './UserNav';

const Addition = () => {

    const token = Cookie.get('token');
    const [response, setResponse] = useState(null);
    const [data, setData] = useState({
        task: '',
        priority: 'Low',
        category: 'Family',
        comment: ''
    })

    useEffect(() => {
        if (!token) {
            nav('/')
        }
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const config = {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }, body: JSON.stringify(data)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://127.0.0.1:8000/api/todo', config)
            .then(res => res.json())
            .then(res => {
                setResponse(res);
                setTimeout(() => {
                    window.location.reload()
                }, 700);
            });
    }

    return (

        <div>
            <UserNav />
            <div className='container d-flex justify-content-center'>

                <div className='row courgette w-75'>
                    <h3 className='text-center py-2'>To-dos</h3>

                    <div>
                        <form onSubmit={handleSubmit} className='bg-senf p-4 border border-warning rounded shadow' autoComplete='off'>
                            {response && response.status === "success" && <div className="alert alert-success text-center" role="alert">
                                {response.message}
                            </div>}

                            {response && response.status === "error" && <div className="alert alert-danger text-center" role="alert">
                                {response.message}
                            </div>}

                            <div className='form-group'>
                                <label htmlFor='task'>To-do</label>
                                <input type='text' className='form-control mb-2 bg-warning-subtle' id='task' name='task' placeholder='Enter the to-do!'
                                    defaultValue={data.task ? data.task : ""} onChange={handleChange} />

                                <label htmlFor='priority'>Priority</label>
                                <select className='form-control mb-2 bg-warning-subtle' id='priority' name='priority' onChange={handleChange} defaultValue={'Low'}>
                                    <option value={'Low'} >Low</option>
                                    <option value={'Normal'}>Normal</option>
                                    <option value={'High'}>High</option>
                                </select>

                                <label htmlFor='category'>Category</label>
                                <select className='form-control mb-2 bg-warning-subtle' id='category' name='category' onChange={handleChange} defaultValue={'Family'}>
                                    <option value={'Family'}>Family</option>
                                    <option value={'Personal'}>Personal</option>
                                    <option value={'Work'}>Work</option>
                                    <option value={'Other'}>Other</option>
                                </select>

                                <label htmlFor='notes'>Comment</label>
                                <textarea className='form-control mb-2 bg-warning-subtle' id='comment' name='comment' rows='3' onChange={handleChange} defaultValue={data.comment ? data.comment : ''}></textarea>

                                <button type='submit' className='btn btn-primary my-2'>Addition</button>

                            </div>
                        </form>

                    </div >
                </div>
            </div>

        </div>

    )
}

export default Addition
