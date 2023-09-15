import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import ToDoItems from './components/ToDoItems'
import Profile from './components/Profile'
import TodoEdit from './components/TodoEdit'
import Addition from './components/Addition'


function App() {

  return (
    <BrowserRouter>

      <Routes>
        <Route index element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/todo" element={<ToDoItems/>} />
        <Route path="/addition" element={<Addition/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/todoedit" element={<TodoEdit />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
