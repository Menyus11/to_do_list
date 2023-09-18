import React, { useState } from 'react'
import GuestNav from './GuestNav';
import { useNavigate } from 'react-router-dom';

const ErrorMsg = ({ result, field }) => <>{
  (result.status === 'error' && result.errors[field]) && <span className='text-danger'>{result.errors[field]}</span>
}</>

const Register = () => {

  const [data, setData] = useState({});
  const [result, setResult] = useState({ status: null })
  const nav = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const config = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }, body: JSON.stringify(data)
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://127.0.0.1:8000/api/register', config)
      .then(res => res.json())
      .then(res => {
        setResult(res);
        if (res.status === 'success') {
          setTimeout(() => {
          nav('/')
          }, 3000);
        }
      })
  }

  return (
    <>
      <GuestNav />
      <div className="container my-5 courgette">
        <form action="" className="bg-senf mx-auto border border-warning rounded p-3 w-75 mw488 shadow" onSubmit={handleSubmit} autoComplete='off'>
          <h3 className='text-center mb-4'>Regisztráció</h3>

          <div className="mb-4">
            <input type="text" className="form-control bg-warning-subtle" placeholder='Írd be a neved!' name='name' id='name' onChange={handleChange} defaultValue={data.name} autoComplete='off'/>
            {<ErrorMsg result={result} field="name" />}
          </div>

          <div className="mb-4">
            <input type="text" className="form-control bg-warning-subtle" placeholder='Írd be az email címed!' name='email' id='email' onChange={handleChange} defaultValue={data ? data.email : ""} />
            {<ErrorMsg result={result} field='email' />}
          </div>

          <div className="mb-4">
            <input type="password" className="form-control bg-warning-subtle" placeholder='Írd be a jelszavad!' name='password' id='password' onChange={handleChange} defaultValue={data ? data.password : ""} />
            {<ErrorMsg result={result} field='password' />}
          </div>

          <div className="mb-4">
            <input type="password" className="form-control bg-warning-subtle" placeholder='Írd be újra a jelszavad!' name='password_confirmation' id='password_confirmation' onChange={handleChange} defaultValue={data ? data.password_confirmation : ""} />
          </div>

          <div className="mb-2">
            <button className="btn btn-outline-success form-control">Regisztrálok</button>
          </div>

          {result && result.status === 'success' &&
            <div className="alert alert-success text-center mt-3" role="alert">{result.message}</div>
          }

        </form>
      </div>
    </>
  )
}

export default Register
