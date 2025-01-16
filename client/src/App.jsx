import './App.css'
import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { UserContextProvider } from './UserContext'
import Layout from './Layout'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import CreatePost from './pages/CreatePost'
import SinglePost from './pages/SinglePost'
import UpdatePost from './pages/UpdatePost'
import ProfilePage from './pages/ProfilePage'

const App = () => {
  const [username, setUsername] = useState('')
  const [validUsername, setValidUsername] = useState(false)
  const [usernameFocus, setUsernameFocus] = useState(false)

  const [email, setEmail] = useState('')
  const [validEmail, setValidEmail] = useState(false)
  const [emailFocus, setEmailFocus] = useState(false)

  const [password, setPassword] = useState('')
  const [validPassword, setValidPassword] = useState(false)
  const [passwordFocus, setPasswordFocus] = useState(false)

  const [matchPassword, setMatchPassword] = useState('')
  const [validMatchPassword, setValidMatchPassword] = useState(false)
  const [matchPasswordFocus, setMatchPasswordFocus] = useState(false)

  const [userId, setUserId] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)

  const [likes, setLikes] = useState(0)

  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout
          props={{
            loggedIn,
            setLoggedIn,
          }} />}>
          <Route index element={<Register
            props={{
              username,
              setUsername,
              validUsername,
              setValidUsername,
              usernameFocus,
              setUsernameFocus,
              email,
              setEmail,
              validEmail,
              setValidEmail,
              emailFocus,
              setEmailFocus,
              password,
              setPassword,
              validPassword,
              setValidPassword,
              passwordFocus,
              setPasswordFocus,
              matchPassword,
              setMatchPassword,
              validMatchPassword,
              setValidMatchPassword,
              matchPasswordFocus,
              setMatchPasswordFocus
            }} />} />
          <Route path='/login' element={<Login
            props={{
              password,
              setPassword,
              setUserId,
              setLoggedIn,
              username,
              setUsername
            }} />} />
          <Route path='/home' element={<Home
            props={{
              userId,
              username,
              likes,
              setLikes
            }}
          />} />
          <Route path='/createPost' element={<CreatePost
            props={{
              username
            }}
          />} />
          <Route path='/singlePost/:id' element={<SinglePost
            props={{
              username
            }}
          />} />
          <Route path='/updatePost/:id' element={<UpdatePost />} />
          <Route path='/profilePage/:id' element={<ProfilePage
            props={{
              userId
            }}
          />} />
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App