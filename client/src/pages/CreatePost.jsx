/* eslint-disable react/prop-types */
import { useState, useEffect } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"

const CreatePost = ({ props: { username } }) => {
    const [title, setTitle] = useState('')
    const [summary, setSummary] = useState('')
    const [author, setAuthor] = useState('')
    const [file, setFile] = useState()

    const navigate = useNavigate()

    useEffect(() => {
        setAuthor(username)
    }, [])

    useEffect(() => {
        console.log(file)
    }, [file])

    function createNewPost(e) {
        const data = new FormData()
        data.set('title', title)
        data.set('summary', summary)
        data.set('author', author)
        data.append('file', file)
        e.preventDefault()
        axios.post('http://localhost:3000/post/create', data)
            .then((res) => {
                console.log(res.data)
                console.log('file', file)
                navigate('/home')
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <article className="flex flex-col items-center py-10 bg-[#171215] border-t-8 border-b-8 border-[#3f4144]">
            <h1 className="text-5xl text-[#949AA2]">Share Your Gear</h1>
            <form className="flex flex-col items-center my-5 gap-2" onSubmit={createNewPost}>
                <input
                    type="text"
                    placeholder="Instrument"
                    onChange={(e) => setTitle(e.target.value)}
                    className="reg-log-input"
                />
                <input
                    type="text"
                    placeholder="Year, make, and model"
                    onChange={(e) => setSummary(e.target.value)}
                    className="reg-log-input"
                />
                <input
                    type="file"
                    onChange={(e) => setFile(e.target.files[0])}
                    className="reg-log-input"
                />
                <button className="reg-log-btn">Submit</button>
            </form>
        </article>
    )
}

export default CreatePost