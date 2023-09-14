import React, { useEffect } from 'react'
import { useState } from 'react'
import Cookie from 'js-cookie';

const Addition = () => {

    const token = Cookie.get('token');
    const [response, setResponse] = useState(null);

    const [data, setData] = useState({
        task: '',
        priority: 'Nem sürgős',
        category: 'Családi',
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

    useEffect(() => {
        setData({
            task: '',
            priority: 'Nem sürgős',
            category: 'Családi',
            comment: ''
        })
    }, [response]);

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://127.0.0.1:8000/api/todo', config)
            .then(res => res.json())
            .then(res => {
                setResponse(res);
            });
    }

/* console.log(data); */
    return (

        <form onSubmit={handleSubmit}>
            {response && response.status === "success" && <div className="alert alert-success text-center" role="alert">
                {response.message}
            </div>}

            {response && response.status === "error" && <div className="alert alert-danger text-center" role="alert">
                {response.message}
            </div>}
            <div className='form-group'>
                <label htmlFor='task'>Tennivaló</label>
                <input type='text' className='form-control mb-2' id='task' name='task' placeholder='Írja be a tennivalót!'
                    defaultValue={data.task ? data.task : ""} onChange={handleChange} />
                    

                <label htmlFor='priority'>Prioritás</label>
                <select className='form-control mb-2' id='priority' name='priority' onChange={handleChange} defaultValue={'Nem sürgős'}>
                    <option value={'Nem sürgős'} >Nem sürgős</option>
                    <option value={'Normál'}>Normál</option>
                    <option value={'Sürgős'}>Sürgős</option>
                </select>

                <label htmlFor='category'>Kategória</label>
                <select className='form-control mb-2' id='category' name='category' onChange={handleChange} defaultValue={'Családi'}>
                    <option value={'Családi'}>Családi</option>
                    <option value={'Személyes'}>Személyes</option>
                    <option value={'Munka'}>Munka</option>
                    <option value={'Egyéb'}>Egyéb</option>
                </select>

                <label htmlFor='notes'>Megjegyzés</label>
                <textarea className='form-control mb-2' id='comment' name='comment' rows='3' onChange={handleChange} defaultValue={data.comment ? data.comment : ''}></textarea>

                <button type='submit' className='btn btn-primary my-2'>Hozzáadás</button>

            </div>
        </form>




    )
}

export default Addition
