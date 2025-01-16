/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
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
    const [homeUsername, setHomeUsername] = useState('')

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
        const result = USER_REGEX.test(homeUsername)
        setValidUsername(result)
        console.log(homeUsername)
    }, [homeUsername])

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
        const first = homeUsername.charAt(0).toUpperCase();
        const last = homeUsername.slice(1)
        const newUsername = first.concat(last)
        setUsername(newUsername)
        console.log(username)
        axios.post(port, { username: newUsername, email, password })
            .then((res) => {
                console.log(res)
                enqueueSnackbar(`You are registered!`, { variant: 'success' })
                navigate('/login')
            })
            .catch((err) => {
                console.log(err)
                enqueueSnackbar('Username or email already exists', { variant: 'error' })
            })
    }

    return (
        <article className="flex flex-col items-center py-10 bg-[#171215] border-t-8 border-b-8 border-[#3f4144]">
            <h2 className="text-3xl text-[#949AA2]">Don&apos;t have an account?</h2>
            <h1 className="text-5xl text-[#949AA2]">Sign Up</h1>
            <form className="flex flex-col items-center my-5 gap-2" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    onChange={(e) => setHomeUsername(e.target.value.toLowerCase())}
                    onFocus={() => setUsernameFocus(true)}
                    onBlur={() => setUsernameFocus(false)}
                    className="reg-log-input"
                />
                <p className={(homeUsername.length !== 0 && usernameFocus && !validUsername) || (homeUsername.length !== 0 && !validUsername) ? 'block text-[#949AA2]' : 'hidden'}>
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
                <p className={(email.length !== 0 && emailFocus && !validEmail) || (email.length !== 0 && !validEmail) ? 'block text-[#949AA2]' : 'hidden'}>
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
                <p className={(password.length !== 0 && passwordFocus && !validPassword) || (password.length !== 0 && !validPassword) ? 'block text-[#949AA2]' : 'hidden'}>
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
                <p className={(matchPassword.length !== 0 && matchPasswordFocus && !validMatchPassword) || (matchPassword.length !== 0 && !validMatchPassword) ? 'block text-[#949AA2]' : 'hidden'}>
                    Passwords don&apos;t match.
                </p>
                <button
                    className={!validUsername || !validEmail || !validPassword || !validMatchPassword ? 'disabled-reg-btn' : 'reg-log-btn'}
                    disabled={!validUsername || !validEmail || !validPassword || !validMatchPassword ? true : false}
                >Submit</button>
            </form>
            <h2 className="text-3xl text-[#949AA2]">Already have an account?</h2>
            <a className='text-3xl text-[#949AA2]' href="/login">Sign In</a>
        </article>
    )
}

export default Register