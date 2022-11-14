import { useState } from "react"
import { useDispatch } from "react-redux"
import { likeBlog } from "../reducers/blogReducer"

const Blog = ({ blog, user, deleteBlog, increaseLikesTest }) => {
    const [visible, setVisible] = useState(false)
    const dispatch = useDispatch()

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    const increaseLikes = () => {
        dispatch(likeBlog(blog.id))
    }

    const testLikes = () => {
        increaseLikesTest()
    }

    // since each user must have a unique username, we use the username
    // to determine if the current user is the creator of the blog
    const isUser = blog.user.username === user.username

    return (
        <div style={blogStyle}>

            {visible ?
                <div className="details">
                    <div>{blog.title} {blog.author} <button onClick={() => { setVisible(!visible) }}>hide</button></div>
                    <div>{blog.url}</div>
                    <div>
                        likes {blog.likes} <span></span>
                        <button className="buttonLike" onClick={increaseLikesTest === undefined ? increaseLikes : testLikes}> like </button>
                    </div>
                    <div>{blog.user.name}</div>
                </div>
                :
                <div className="title-and-author">
                    {blog.title} {blog.author} <span></span>
                    <button className="buttonShow" onClick={() => setVisible(!visible)}>
                        show
                    </button>
                </div>
            }
            {isUser ?
                <div>
                    <button
                        id="removeButton"
                        onClick={() => deleteBlog(blog.id)}>
                        remove
                    </button>
                </div>
                :
                null}
        </div>
    )
}




export default Blog