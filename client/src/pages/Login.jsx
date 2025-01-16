/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useSnackbar } from "notistack"

const Login = ({ props: {
    password,
    setPassword,
    setUserId,
    setLoggedIn,
    username,
    setUsername
} }) => {
    const [loginUsername, setLoginUsername] = useState('')

    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar()

    const port = 'http://localhost:3000/users/login'

    useEffect(() => {
        setUsername('')
        setPassword('')
    }, [])

    useEffect(() => {
        console.log(username)
        console.log(password)
    }, [username, password])

    async function login() {
        const first = loginUsername.charAt(0).toUpperCase()
        const last = loginUsername.slice(1)
        const newUsername = first.concat(last)
        setUsername(newUsername)
        await axios.post(port, { username: newUsername, password },
        )
            .then(res => {
                setUserId(res.data.id)
                setLoggedIn(true)
                setUsername(res.data.username)
                console.log(res.data)
                enqueueSnackbar(`Welcome!`, { variant: 'success' })
                navigate('/home')
            }
            ).catch(err => {
                enqueueSnackbar('Incorrect email and/or password.', { variant: 'error' })
                console.log(err)
            })
    }

    function handleSubmit(e) {
        e.preventDefault()
        login()
    }
    return (
        <article className="flex flex-col items-center py-10 bg-[#171215] border-t-8 border-b-8 border-[#3f4144]">
            <h2 className="text-3xl text-[#949AA2]">Have an account?</h2>
            <h1 className="text-5xl text-[#949AA2]">Login</h1>
            <form className='flex flex-col items-center my-5 gap-2' onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    onChange={e => setLoginUsername(e.target.value.toLowerCase())}
                    className="reg-log-input"
                    autoComplete="false"
                />
                <input
                    type="password"
                    placeholder="Password"
                    onChange={e => setPassword(e.target.value)}
                    className="reg-log-input"
                />
                <button
                    className={!loginUsername || !password ? 'disabled-reg-btn' : 'reg-log-btn'}
                    disabled={!loginUsername || !password ? true : false}
                >Submit</button>
            </form>
            <h2 className="text-3xl text-[#949AA2]">Don&apos;t have an account?</h2>
            <a className='text-3xl text-[#949AA2]' href="/">Sign up</a>
        </article>
    )
}

export default Login