import './App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Navbar from './components/Navbar'
import Home from './components/Home'
import CreatePost from './components/CreatePost'
import EditPost from './components/EditPost'
import PostDetails from './components/PostDetails'

function App() {

  return (
    <>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/create' element={<CreatePost/>} />
          <Route path='/edit/:id' element={<EditPost/>} />
          <Route path='/posts/:id' element={<PostDetails/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
