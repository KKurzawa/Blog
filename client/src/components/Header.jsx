/* eslint-disable react/prop-types */
import { useEffect } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useSnackbar } from "notistack"

const Header = ({ props: { loggedIn, setLoggedIn, username } }) => {
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar()

    useEffect(() => {
        console.log(loggedIn)
    })

    function handleLogout() {
        axios.post('http://localhost:3000/users/logout')
            .then(res => {
                console.log(res)
                enqueueSnackbar(`See you next time ${username}!`, { variant: 'success' })
                navigate('/login')
                setLoggedIn(false)
            })
    }
    return (
        <>
            {!loggedIn && (
                <header className="flex justify-between items-center p-10 bg-black text-white">
                    <h2 className='flex flex-col text-5xl'>Gear Share</h2>
                    <nav className="flex gap-10 text-3xl">
                        <a href="/">Register</a>
                        <a href="/login">Login</a>
                    </nav>
                </header>
            )}
            {loggedIn && (
                <header className="flex justify-between items-center p-10 bg-black text-white">
                    <Link className='flex flex-col text-5xl' to='/home'>Gear Share</Link>
                    <nav className="flex gap-10 text-3xl">
                        <Link to='/createPost'>Create Post</Link>
                        <button onClick={handleLogout}>Logout</button>
                    </nav>
                </header>
            )}
        </>
    )
}

export default Header