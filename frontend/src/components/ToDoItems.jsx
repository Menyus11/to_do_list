import React from 'react'
import { useState, useEffect } from 'react';
import Cookie from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPencil, faCheck, faScrewdriverWrench } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import UserNav from './UserNav';

const ToDoItems = () => {

    const [todolist, setTodolist] = useState([]);
    const token = Cookie.get('token');
    const [response, setResponse] = useState(null);
    const nav = useNavigate();;
    const [data, setData] = useState({
        task: '',
        priority: 'Low',
        category: 'Family',
        comment: '',
        task_completed: 0
    });

    useEffect(() => {
        if (!token) {
            nav('/')
        }
    }, [])

    const checkChange = (e) => {

        const checked = e.target.checked ? 1 : 0;
        const id = e.target.name;
        const task = e.target.parentNode.parentNode.childNodes[1].innerText;
        const priority = e.target.parentNode.parentNode.childNodes[2].innerText;
        const category = e.target.parentNode.parentNode.childNodes[3].innerText;
        const comment = e.target.parentNode.parentNode.childNodes[4].innerText;
        setData(prevState => ({
            ...prevState,
            id: id,
            task_completed: checked,
            task: task,
            priority: priority,
            category: category,
            comment: comment
        }))

    }

    const itemDeleteHandle = (e) => {
        e.preventDefault();
        fetch('http://127.0.0.1:8000/api/tododelete', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }, body: JSON.stringify({ id: e.target.name.slice(12) })
        })
            .then(res => res.json())
            .then(res => {
                setResponse(res)
            })
    }

    const todoEditHandle = (e) => {
        e.preventDefault();

        const id = e.target.name.slice(12);

        fetch('http://127.0.0.1:8000/api/selecttodo', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            }, body: JSON.stringify({ id: id })
        })
            .then(res => res.json())
            .then(res => {
                setResponse(res)
                Cookie.set('edit', JSON.stringify(res.todo));
                nav('/todoedit')
            })

    }

    const configGet = {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }
    }

    const configPost = {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer ' + token,
            'Content-Type': 'application/json'
        }, body: JSON.stringify(data)
    }

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/todos', configGet)
            .then(res => res.json())
            .then(res => {
                setTodolist(res)
            })
    }, [response, data])

    useEffect(() => {

        todolist.todos &&
            fetch('http://127.0.0.1:8000/api/todosupdate', configPost)
                .then(res => res.json())
                .then(res => {
                    window.location.reload();
                })
    }, [data])

    return (

        <div>
            <UserNav />

            <div className='container d-flex justify-content-center'>

                <div className='row courgette'>
                    <h3 className='text-center py-2'>To-dos</h3>

                    <div className='col-12 bg-senf p-4 rounded shadow'>

                        {response && response.status === "error" && <div className="alert alert-danger text-center" role="alert">
                            {response.message}
                        </div>}

                        <table className="table table-striped table-hover shadow table-warning ">

                            <thead>
                                <tr>
                                    <th scope="col"><FontAwesomeIcon icon={faCheck} className='px-3' /></th>
                                    <th scope="col">To-dos</th>
                                    <th scope="col">Priority</th>
                                    <th scope="col">Category</th>
                                    <th scope="col">Comment</th>
                                    <th scope="col"><FontAwesomeIcon icon={faScrewdriverWrench} className='px-4' /></th>
                                </tr>
                            </thead>

                            <tbody>
                                {todolist.todos && todolist.todos.map((todo, index) => (
                                    todo.task_completed !== 1 &&


                                    <tr key={index} className={todo.task_completed !== 0 ? 'align-middle text-decoration-line-through table-success' : 'align-middle'} >

                                        <td className='px-4'>
                                            <input className="form-check-input" type="checkbox" onChange={checkChange}
                                                defaultChecked={todo.task_completed !== 0 ? 'checked' : ''} name={todo.id} />
                                        </td>
                                        <td>{todo.task}</td>
                                        <td>{todo.priority}</td>
                                        <td>{todo.category}</td>
                                        <td>{todo.comment}</td>
                                        <td>
                                            <div className="btn btn-group btn-group-sm p-0 m-0 ">
                                                <button className="btn btn-outline-primary" onClick={todoEditHandle} name={'pencilButton' + todo.id}><FontAwesomeIcon icon={faPencil} /></button>
                                                <button className="btn btn-outline-danger" onClick={itemDeleteHandle} name={'deleteButton' + todo.id}><FontAwesomeIcon icon={faTrashCan} /></button>
                                            </div>
                                        </td>
                                    </tr>

                                ))}

                                {todolist.todos && todolist.todos.map((todo, index) => (
                                    todo.task_completed !== 0 &&

                                    <tr key={index} className={todo.task_completed !== 0 ? 'align-middle text-decoration-line-through table-success' : 'align-middle'} >

                                        <td className='px-4'>
                                            <input className="form-check-input" type="checkbox" onChange={checkChange}
                                                defaultChecked={todo.task_completed !== 0 ? 'checked' : ''} name={todo.id} />
                                        </td>
                                        <td>{todo.task}</td>
                                        <td>{todo.priority}</td>
                                        <td>{todo.category}</td>
                                        <td>{todo.comment}</td>
                                        <td>
                                            <div className="btn btn-group btn-group-sm p-0 m-0 ">
                                                <button className="btn btn-outline-primary" onClick={todoEditHandle} name={'pencilButton' + todo.id}><FontAwesomeIcon icon={faPencil} /></button>
                                                <button className="btn btn-outline-danger" onClick={itemDeleteHandle} name={'deleteButton' + todo.id}><FontAwesomeIcon icon={faTrashCan} /></button>
                                            </div>
                                        </td>
                                    </tr>

                                ))}
                            </tbody>

                        </table>

                    </div>

                </div >
            </div>
        </div>




    )
}

export default ToDoItems
