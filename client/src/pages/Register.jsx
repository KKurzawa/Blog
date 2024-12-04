/* eslint-disable react/prop-types */
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { useSnackbar } from "notistack"

import { USER_REGEX, PWD_REGEX, EMAIL_REGEX } from '../utils/regexs'


const Register = ({ props: {
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
    setMatchPasswordFocus } }) => {
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar()

    const port = 'http://localhost:3000/users/register'

    useEffect(() => {
        setUsername('')
        setEmail('')
        setPassword('')
        setMatchPassword('')
    }, [])

    useEffect(() => {
        const result = USER_REGEX.test(username)
        setValidUsername(result)
    }, [username])

    useEffect(() => {
        const result = EMAIL_REGEX.test(email)
        setValidEmail(result)
    }, [email])

    useEffect(() => {
        const result = PWD_REGEX.test(password)
        setValidPassword(result)
        const match = password === matchPassword
        setValidMatchPassword(match)
    }, [password, matchPassword])

    function handleSubmit(e) {
        e.preventDefault()
        console.log(username, email, password)
        axios.post(port, { username, email, password })
            .then((res) => {
                console.log(res)
                enqueueSnackbar('Account created!', { variant: 'success' })
                navigate('/login')
            })
            .catch((err) => {
                console.log(err)
                enqueueSnackbar('Username or email already exists', { variant: 'error' })
            })
    }
    return (
        <article className="flex flex-col items-center mt-10">
            <h2 className="text-3xl">Don&apos;t have an account?</h2>
            <h1 className="text-5xl">Sign Up</h1>
            <form className="flex flex-col items-center my-5 gap-2" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                    onFocus={() => setUsernameFocus(true)}
                    onBlur={() => setUsernameFocus(false)}
                    className="reg-log-input"
                />
                <p className={(username.length !== 0 && usernameFocus && !validUsername) || (username.length !== 0 && !validUsername) ? 'block' : 'hidden'}>
                    Must be 4 to 24 characters, begin with a letter, and can contain letters, numbers, and underscores.
                </p>
                <input
                    type="text"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value.toLowerCase())}
                    onFocus={() => setEmailFocus(true)}
                    onBlur={() => setEmailFocus(false)}
                    className="reg-log-input"
                />
                <p className={(email.length !== 0 && emailFocus && !validEmail) || (email.length !== 0 && !validEmail) ? 'block' : 'hidden'}>
                    Email must be valid.
                </p>
                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setPasswordFocus(true)}
                    onBlur={() => setPasswordFocus(false)}
                    className="reg-log-input"
                />
                <p className={(password.length !== 0 && passwordFocus && !validPassword) || (password.length !== 0 && !validPassword) ? 'block' : 'hidden'}>
                    Must contain 8 to 24 characters and include an uppercase and lowercase letter, a number, and a special character (!, @, #. $. %).
                </p>
                <input
                    type="password"
                    placeholder="Confirm Password"
                    onChange={(e) => setMatchPassword(e.target.value)}
                    onFocus={() => setMatchPasswordFocus(true)}
                    onBlur={() => setMatchPasswordFocus(false)}
                    className="reg-log-input"
                />
                <p className={(matchPassword.length !== 0 && matchPasswordFocus && !validMatchPassword) || (matchPassword.length !== 0 && !validMatchPassword) ? 'block' : 'hidden'}>
                    Passwords don&apos;t match.
                </p>
                <button
                    className={!validUsername || !validEmail || !validPassword || !validMatchPassword ? 'disabled-reg-btn' : 'reg-log-btn'}
                    disabled={!validUsername || !validEmail || !validPassword || !validMatchPassword ? true : false}
                >Submit</button>
            </form>
            <h2 className="text-3xl">Already have an account?</h2>
            <a className='text-3xl' href="/login">Sign In</a>
        </article>
    )
}

export default Register