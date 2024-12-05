/* eslint-disable react/prop-types */
import { useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useSnackbar } from "notistack"

const Login = ({ props: {
    email,
    setEmail,
    password,
    setPassword,
    setUserId,
    setLoggedIn,
    username
} }) => {
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar()

    const port = 'http://localhost:3000/users/login'

    useEffect(() => {
        setEmail('')
        setPassword('')
    }, [])

    useEffect(() => {
        console.log(email)
        console.log(password)
    }, [email, password])

    async function handleSubmit(e) {
        e.preventDefault()
        await axios.post(port, { email, password })
            .then(res => {
                setUserId(res.data.id)
                setLoggedIn(true)
                enqueueSnackbar(`Welcome ${username}!`, { variant: 'success' })
                navigate('/home')
            }
            ).catch(err => {
                enqueueSnackbar('Incorrect email and/or password.', { variant: 'error' })
                console.log(err)
            })
    }
    return (
        <article className="flex flex-col items-center mt-10">
            <h2 className="text-3xl">Have an account?</h2>
            <h1 className="text-5xl">Login</h1>
            <form className='flex flex-col items-center my-5 gap-2' onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Email"
                    onChange={e => setEmail(e.target.value.toLowerCase())}
                    className="reg-log-input"
                    autoComplete="false"
                />
                <input
                    type="password"
                    placeholder="Password"
                    onChange={e => setPassword(e.target.value)}
                    className="reg-log-input"
                />
                <button className="reg-log-btn">Submit</button>
            </form>
            <h2 className="text-3xl">Don&apos;t have an account?</h2>
            <a className='text-3xl' href="/">Sign up</a>
        </article>
    )
}

export default Login