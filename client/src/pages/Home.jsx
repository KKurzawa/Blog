/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import { format } from 'date-fns'
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"

const Home = ({ props: { username } }) => {
    const [posts, setPosts] = useState([])
    const [users, setUsers] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        axios.get(`http://localhost:3000/users`)
            .then((res) => {
                setUsers(res.data)
                console.log(users)
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        axios.get('http://localhost:3000/post')
            .then((res) => {
                setPosts(res.data)
                console.log(res.data)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <main className=" bg-[#171215] border-t-8 border-b-8 border-[#3f4144]">
            <h1 className="text-center text-5xl text-[#949AA2] p-10">Welcome {username}!</h1>
            <h2 className={posts.length === 0 ? 'text-3xl text-center mt-5 text-[#949AA2]' : 'hidden'}>No posts currently.</h2>
            <article className="grid lg:grid-cols-2 items-center justify-items-center justify-around pb-10">
                {posts.map((post) => (
                    <ul key={post._id} className="post flex flex-col border-8 border-[#74787e] outline outline-8 outline-[#3f4144] px-10 py-5 rounded-3xl mb-[3rem] bg-[#949AA2]">
                        <Link to={`/singlePost/${post._id}`} className="post-title text-5xl text-[#252528]">{post.title}</Link>
                        <section className="flex items-baseline gap-5 mb-2 px-[5px] text-[#252528cd]">
                            <button
                                onClick={(() => {
                                    const user = users.find(user => user.username === post.author)
                                    console.log(user)
                                    navigate(`/profilePage/${user._id}`)
                                })}
                                className="post-author text-2xl">{post.author}</button>
                            {post.likes.length === 1 ? <h2>{post.likes.length}&nbsp;Like</h2> : <h2>{post.likes.length}&nbsp;Likes</h2>}
                            <time className="text-sm">{format(new Date(post.createdAt), 'MMM d, yyyy HH:mm')}</time>
                        </section>
                        <Link to={`/singlePost/${post._id}`}>
                            <img
                                src={'http://localhost:3000/Images/' + post.image}
                                alt=""
                                className="w-[20rem] h-[10rem] md:w-[35rem] md:h-[20rem] object-cover rounded-3xl"
                            />
                        </Link>
                    </ul>
                ))}
            </article>
        </main>

    )
}

export default Home