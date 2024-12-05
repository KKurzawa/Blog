/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import axios from "axios"
const Home = ({ props: { userId, username, setUsername } }) => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        console.log(userId)
        axios.get(`http://localhost:3000/users/${userId}`)
            .then((res) => { setUsername(res.data.username) })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        axios.get('http://localhost:3000/post')
            .then((res) => {
                setPosts(res.data)
                console.log(posts)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <main>
            <h1>Welcome {username}!</h1>
            {posts.map((post) => (
                <ul key={post._id}>
                    <li>{post.title}</li>
                    <li>{post.summary}</li>
                    <li>{post.content}</li>
                    <li>{post.cover}</li>
                </ul>
            ))}
        </main>

    )
}

export default Home