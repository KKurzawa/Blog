/* eslint-disable react/prop-types */
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { format } from "date-fns"
import axios from "axios"
import { IoCreate } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate, Link } from "react-router-dom";
import { useSnackbar } from "notistack"
import { FaRegThumbsUp } from "react-icons/fa";
import { FaThumbsUp } from "react-icons/fa";

const SinglePost = ({ props: { username } }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [image, setImage] = useState('')
    const [createdAt, setCreatedAt] = useState('')
    const [summary, setSummary] = useState('')
    const [likes, setLikes] = useState([])
    const [users, setUsers] = useState([])

    const likeData = { likes: username }
    const dislikeData = { likes: username }

    const { id } = useParams()

    const navigate = useNavigate()

    const { enqueueSnackbar } = useSnackbar()

    useEffect(() => {
        axios.get(`http://localhost:3000/users`)
            .then((res) => {
                setUsers(res.data)
                console.log(users)
            })
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        axios.get(`http://localhost:3000/post/${id}`)
            .then((result) => {
                setLikes(result.data.likes)
                setTitle(result.data.title)
                setAuthor(result.data.author)
                setCreatedAt(format(new Date(result.data.createdAt), 'MMM d, yyyy HH:mm'))
                setImage(result.data.image)
                setSummary(result.data.summary)
                console.log(likes)
            }).catch((err) => {
                console.log(err)
            })
    }, [])

    function handleDelete() {
        axios.delete(`http://localhost:3000/post/delete/${id}`)
            .then((res) => {
                console.log(res)
                enqueueSnackbar(`${title} deleted!`, { variant: 'success' })
                navigate('/home')
            })
            .catch((err) => {
                console.log(err)
            })
    }

    function likePost() {
        axios.put(`http://localhost:3000/post/like/${id}`, likeData)
            .then((res) => {
                console.log(res)
                navigate('/home')
            })
            .catch((err) => {
                console.log(err)
            })
    }

    function dislikePost() {
        axios.put(`http://localhost:3000/post/dislike/${id}`, dislikeData)
            .then((res) => {
                console.log(res, 'Disliked')
                navigate('/home')
            })
            .catch((err) => {
                console.log(err)
            })
    }


    return (
        <article className="flex flex-col items-center justify-center w-full gap-5 bg-[#171215] border-t-8 border-b-8 border-[#3f4144]">
            <section className="post flex flex-col border-8 border-[#74787e] outline outline-8 outline-[#3f4144] px-10 py-5 rounded-3xl my-[3rem] bg-[#949AA2]">
                <h1 className="text-5xl text-[#252528]">{title}</h1>
                <section className="flex flex-row gap-10 items-baseline justify-between text-[#252528cd]">
                    <section className="flex items-baseline gap-10">
                        <button
                            onClick={(() => {
                                const user = users.find(user => user.username === author)
                                console.log(user)
                                navigate(`/profilePage/${user._id}`)
                            })}
                            className="text-2xl">{author}</button>
                        <article className="flex items-baseline gap-2">
                            {likes.includes(username) ? (
                                <>
                                    <button onClick={(() => {
                                        dislikePost()
                                    })}>
                                        <FaThumbsUp />
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button onClick={(() => {
                                        likePost()
                                    })}><FaRegThumbsUp /></button>
                                </>
                            )}
                            <h2 className="text-2xl">{likes.length}</h2>
                        </article>
                        <time className="text-sm">{createdAt}</time>
                    </section>
                    {username === author
                        ? <section className="flex justify-center gap-10">
                            <Link to={`/updatePost/${id}`} className="flex items-center text-2xl"><IoCreate /><h2>Update Post</h2></Link>
                            <button onClick={handleDelete} className="flex items-center text-2xl"><MdDeleteForever /><h2>Delete Post</h2></button>
                        </section>
                        : null
                    }
                </section>


                <img className='h-[35rem] rounded-3xl object-cover' src={'http://localhost:3000/Images/' + image} alt="" />
                <p className="text-3xl text-[#252528cd]">{summary}</p>
            </section>
        </article>
    )
}

export default SinglePost