/* eslint-disable react/prop-types */
import { useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useSnackbar } from "notistack"
import Logo from "./Logo"

const Header = ({ props: { loggedIn, setLoggedIn } }) => {
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar()

    useEffect(() => {
        console.log(loggedIn)
    })

    function handleLogout() {
        axios.post('http://localhost:3000/users/logout')
            .then(res => {
                console.log(res)
                enqueueSnackbar(`See you next time!`, { variant: 'success' })
                navigate('/login')
                setLoggedIn(false)
            })
    }
    return (
        <>
            {!loggedIn && (
                <header id='top' className="flex justify-between items-center px-[3rem] bg-[#949AA2] text-[#252528] border-b-8 border-[#74787e]">
                    <Link><Logo /></Link>
                    <nav className="flex gap-10 text-5xl">
                        <a href="/" className="header-btn">Register</a>
                        <a href="/login" className="header-btn">Login</a>
                    </nav>
                </header>
            )}
            {loggedIn && (
                <header id='top' className="flex justify-between items-center px-[3rem] bg-[#949AA2] text-[#252528] border-b-8 border-[#74787e]">
                    <Link className='' to='/home'><Logo /></Link>
                    <nav className="flex gap-10 text-5xl">
                        <Link to='/createPost' className="header-btn">Share Your Gear</Link>
                        <button onClick={handleLogout} className="header-btn">Logout</button>
                    </nav>
                </header>
            )}
        </>
    )
}

export default Header