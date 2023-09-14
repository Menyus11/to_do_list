import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import ToDo from './components/ToDo'
import Profile from './components/Profile'
import TodoEdit from './components/TodoEdit'


function App() {

  return (
    <BrowserRouter>

      <Routes>
        <Route index element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/todo" element={<ToDo/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/todoedit" element={<TodoEdit />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
