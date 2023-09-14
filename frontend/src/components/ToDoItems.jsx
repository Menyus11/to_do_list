import React from 'react'
import { useState, useEffect } from 'react';
import Cookie from 'js-cookie';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faPencil, faListCheck } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';



const ToDoItems = () => {

    const [todolist, setTodolist] = useState([]);
    const token = Cookie.get('token');
    const [response, setResponse] = useState(null);
   /*  const [edit, setEdit] = useState({}); */
    const nav = useNavigate();;
    const [data, setData] = useState({
        task: '',
        priority: 'Nem sürgős',
        category: 'Családi',
        comment: '',
        task_completed: 0
    });

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

       /*  setEdit(prevState => ({
            ...prevState,
            id: id
        })),  */fetch('http://127.0.0.1:8000/api/selecttodo', {
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
    }, [response])


    useEffect(() => {

        todolist.todos &&
            fetch('http://127.0.0.1:8000/api/todosupdate', configPost)
                .then(res => res.json())
                .then(res => {
                    console.log(res)
                })
    }, [data])

    return (
        <div>
            {/* {response && response.status === "success" && <div className="alert alert-success text-center" role="alert">
                {response.message}
            </div>} */}

            {response && response.status === "error" && <div className="alert alert-danger text-center" role="alert">
                {response.message}
            </div>}

            <table className="table table-striped table-hover">

                <thead>
                    <tr>
                        <th scope="col"><FontAwesomeIcon icon={faListCheck} className='px-3' /></th>
                        <th scope="col">Tennivaló</th>
                        <th scope="col">Prioritás</th>
                        <th scope="col">Kategória</th>
                        <th scope="col">Megjegyzés</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>

                    {todolist.todos && todolist.todos.map((todo, index) => (

                        <tr key={index} className='align-middle'>

                            <td className='px-4'> <input className="form-check-input" type="checkbox" onChange={checkChange}
                                defaultChecked={todo.task_completed !== 0 ? 'checked' : ''} name={todo.id} /> </td>
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


    )
}

export default ToDoItems
