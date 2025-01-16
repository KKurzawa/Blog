import { useEffect, useState } from "react"
import axios from "axios"
import { useSnackbar } from "notistack"
import { useNavigate, useParams } from "react-router-dom"

const UpdatePost = () => {
    const [title, setTitle] = useState('')
    // const [author, setAuthor] = useState('')
    const [image, setImage] = useState()
    // const [createdAt, setCreatedAt] = useState('')
    const [summary, setSummary] = useState('')

    const { id } = useParams()

    const navigate = useNavigate()

    const { enqueueSnackbar } = useSnackbar()

    useEffect(() => {
        axios.get(`http://localhost:3000/post/${id}`)
            .then((result) => {
                setTitle(result.data.title)
                // setAuthor(result.data.author)
                // setCreatedAt(result.data.createdAt)
                setImage(result.data.image)
                setSummary(result.data.summary)
                console.log(title)
            }).catch((err) => {
                console.log(err)
            })
    }, [])

    function updatePost(e) {
        const data = new FormData()
        data.set('title', title)
        data.set('summary', summary)
        data.append('image', image)
        e.preventDefault()
        axios.put(`http://localhost:3000/post/update/${id}`, data)
            .then((result) => {
                console.log(result)
                enqueueSnackbar(`Post with id:${id} updated!`, { variant: 'success' })
                navigate('/home')

            })
            .catch((err) => {
                console.log(err)
            })
    }
    return (
        <article className="flex flex-col items-center mt-10">
            <h1 className="text-5xl">Update This Post</h1>
            <form className="flex flex-col items-center my-5 gap-2" onSubmit={updatePost}>
                <input
                    type="text"
                    placeholder="Year, make, and model"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="reg-log-input"
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    className="reg-log-input"
                />
                <input
                    type="file"
                    name="image"
                    // value={image}
                    onChange={(e) => setImage(e.target.image)}
                    className="reg-log-input"
                />
                <button className="reg-log-btn">Submit</button>
            </form>
        </article>
    )
}

export default UpdatePost