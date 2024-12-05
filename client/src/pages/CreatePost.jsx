/* eslint-disable react/prop-types */
import { useState } from "react"
import axios from 'axios'
// import { response } from "express"

const CreatePost = ({ props: { loggedIn } }) => {
    const [title, setTitle] = useState('')
    const [summary, setSummary] = useState('')
    const [content, setContent] = useState('')
    const [cover, setCover] = useState('')

    const createNewPost = () => {
        // e.prevetDefault()
        // const data = new FormData()
        // data.set('title', title)
        // data.set('summary', summary)
        // data.set('content', content)
        // data.set('cover', cover)
        const response = axios.post('http://localhost:3000/post/create', { title, summary, content, cover })
            .then((res) => {
                res.json(response)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <article className="flex flex-col items-center mt-10">
            <h1 className="text-5xl">Share Your Gear</h1>
            <form className="flex flex-col items-center my-5 gap-2" onSubmit={createNewPost}>
                <input
                    type="text"
                    placeholder="Year, make, and model"
                    onChange={(e) => setTitle(e.target.value)}
                    className="reg-log-input"
                />
                <input
                    type="text"
                    placeholder="Summary"
                    onChange={(e) => setSummary(e.target.value)}
                    className="reg-log-input"
                />
                <input
                    type="text"
                    placeholder="Description"
                    onChange={(e) => setContent(e.target.value)}
                    className="reg-log-input"
                />
                <input
                    type="text"
                    placeholder="Image"
                    onChange={(e) => setCover(e.target.value)}
                    className="reg-log-input"
                />
                <button className="reg-log-btn">Submit</button>
            </form>
        </article>
    )
}

export default CreatePost