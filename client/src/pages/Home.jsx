/* eslint-disable react/prop-types */
import { useEffect } from "react"
import axios from "axios"
const Home = ({ props: { userId, username, setUsername } }) => {

    useEffect(() => {
        console.log(userId)
        axios.get(`http://localhost:3000/users/${userId}`)
            .then((res) => { setUsername(res.data.username) })
            .catch(err => console.log(err))
    }, [])
    return (
        <main>
            <h1>Welcome {username}!</h1>
        </main>
    )
}

export default Home