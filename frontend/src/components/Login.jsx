import React, { useEffect, useState } from 'react'
import Cookie from 'js-cookie'
import { useNavigate } from 'react-router-dom';
import GuestNav from './GuestNav';

const Login = () => {

  const [user, setUser] = useState(null); 
  const token = Cookie.get('token');
  const [data, setData] = useState({});
  const [result, setResult] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
  if(token) {
    nav('/todo')
  } 
  }, [])

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const configPost = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }, body: JSON.stringify(data)
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://127.0.0.1:8000/api/login', configPost)
      .then(res => res.json())
      .then(res => {
        if(res.status === 'success') {
          Cookie.set('token', res.token)
           nav('/todo') 
        } else {
          setResult(res);
        }
      })
  }

  return (
    <>
    <GuestNav />
      <div className="container my-5 ">
        <form action="" className="bg-senf mx-auto border rounded p-3 w-75 mw488" onSubmit={handleSubmit}>
          <h3 className='text-center mb-4'><span className='lobster'>Belépés</span></h3>

          <div className="mb-4">
            <input type="text" className="form-control bg-warning-subtle courgette" placeholder='Írd be az email címed!' name='email' id='email' onChange={handleChange} />
          </div>

          <div className="mb-4">
            <input type="password" className="form-control bg-warning-subtle courgette" placeholder='Írd be a jelszavad!' name='password' id='password' onChange={handleChange} />
          </div>

          <div className="mb-2">
            <button className="btn btn-outline-success form-control"><span className='courgette'>Belépek</span></button>
          </div>

          {result && result.status === 'error' && <div className="alert alert-danger mt-3 text-center">{result.message}</div>}

        </form>
      </div>
    </>
  )
}

export default Login
