import { useState } from "react"
import Blog from "./Blog"
import Users from "./Users"
import Togglable from "./Togglable"
import { useSelector, useDispatch } from "react-redux"
import { removeBlog } from "../reducers/blogReducer"


const Blogs = (props) => {
    const [newBlog, setNewBlog] = useState({})
    const blogs = useSelector(state => [...state.blogs])
    const dispatch = useDispatch()

    const clearInputs = () => {
        document.getElementById("title").value = ""
        document.getElementById("author").value = ""
        document.getElementById("url").value = ""
    }

    const addBlog = (event) => {
        event.preventDefault()
        props.createBlog(newBlog)
        setNewBlog({})
    }

    const deleteBlog = (id) => {
        dispatch(removeBlog(id))
    }

    return (
        <div>
            <h2>blogs</h2>

            <Togglable
                buttonLabel="new blog"
                ref={props.blogFormRef}
                className="buttonNewBlog"
            >
                <h2>create new</h2>
                <form onSubmit={addBlog}>
                    <div>
                        title:
                        <input
                            className="inputTitle"
                            type="text"
                            name="title"
                            id="title"
                            onChange={
                                ({ target }) => {
                                    setNewBlog({ ...newBlog, title: target.value })
                                }
                            }
                        />
                    </div>
                    <div>
                        author:
                        <input
                            className="inputAuthor"
                            type="text"
                            name="author"
                            id="author"
                            onChange={
                                ({ target }) => {
                                    setNewBlog({ ...newBlog, author: target.value })
                                }
                            }
                        />
                    </div>
                    <div>
                        url:
                        <input
                            className="inputUrl"
                            type="text"
                            name="url"
                            id="url"
                            onChange={
                                ({ target }) => {
                                    setNewBlog({ ...newBlog, url: target.value })
                                }
                            }
                        />
                    </div>
                    <button
                        className="buttonCreate"
                        type="submit"
                        onClick={clearInputs}>create</button>
                </form>
            </Togglable>

            {blogs
                .sort((a, b) => b.likes - a.likes)
                .map(blog =>
                    <Blog
                        key={blog.id}
                        blog={blog}
                        user={props.user}
                        deleteBlog={deleteBlog}
                    />
                )
            }
        </div>
    )

}

export default Blogs