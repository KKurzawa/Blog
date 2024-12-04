import './App.css'
import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { UserContextProvider } from './UserContext'
import Layout from './Layout'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'
import CreatePost from './pages/CreatePost'

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


  return (
    <UserContextProvider>
      <Routes>
        <Route path='/' element={<Layout
          props={{
            loggedIn,
            setLoggedIn,
            username
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
              email,
              setEmail,
              password,
              setPassword,
              setUserId,
              setLoggedIn,
              username
            }} />} />
          <Route path='/home' element={<Home
            props={{
              userId,
              username,
              setUsername
            }}
          />} />
          <Route path='/createPost' element={<CreatePost
            props={{
              loggedIn
            }}
          />} />
        </Route>
      </Routes>
    </UserContextProvider>
  )
}

export default App