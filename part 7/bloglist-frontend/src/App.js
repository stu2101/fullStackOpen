import { useState, useEffect, useRef } from 'react'

// components
import LoginForm from './components/LoginForm'
import Blogs from './components/Blogs'
import Message from './components/Message'
import Users from './components/Users'

// services
import blogService from './services/blogs'
import loginService from './services/login'

// state
import { useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs, createNew } from './reducers/blogReducer'

import {
    Routes,
    Route,
    Link
} from "react-router-dom"

const App = () => {
    const dispatch = useDispatch()
    const [user, setUser] = useState(null)
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const blogFormRef = useRef()

    const createBlog = async (blogObject) => {
        blogFormRef.current.toggleVisibility()
        dispatch(createNew(blogObject))
        dispatch(setNotification("message", "Blog added successfully", 3.5))
    }

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({ username, password });

            window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user))

            blogService.setToken(user.token)
            setUser(user);
            setUsername("")
            setPassword("")
        }
        catch (error) {
            dispatch(setNotification("error", "Wrong username or password", 3.5))
        }
    }

    const logOut = () => {
        window.localStorage.removeItem("loggedBlogappUser")

        // Calling setUser() modifies `th`e state of the component, causing it to re-render.
        // The details of the logged in user are erased, but if setUser() isn't called, the application
        // will stay on the same page, going back to the login form only after the page is refreshed
        setUser(null)
    }

    useEffect(() => {
        dispatch(initializeBlogs())
    }, [])

    useEffect(() => {
        const loggedUser = window.localStorage.getItem("loggedBlogappUser")

        if (loggedUser) {
            const user = JSON.parse(loggedUser)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const linkStyle = {
        "textDecoration": "none",
        "margin": "0.5rem",
        "padding": "0.2rem",
    }

    const navStlye = {
        "display": "flex",
        "alignItems": "center",
        "backgroundColor": "lightGray"
    }

    return (
        <div>
            <Message />
            {user === null ? (
                <LoginForm
                    onSubmit={handleLogin}
                    usernameValue={username}
                    setUsername={setUsername}
                    passwordValue={password}
                    setPassword={setPassword}
                />
            ) : (
                <div>
                    <div style={navStlye}>
                        <Link style={linkStyle} to="/">Blogs</Link>
                        <Link style={linkStyle} to="/users">User Statistics</Link>
                        <div>
                            {user.username} logged in <button onClick={logOut}>logout </button>
                        </div>
                    </div>

                    <Routes>
                        <Route path='/' element={
                            <Blogs
                                blogFormRef={blogFormRef}
                                createBlog={createBlog}
                                user={user}
                            />
                        } />
                        <Route path='/users' element={<Users />} />
                    </Routes>
                </div>
            )
            }
        </div>
    )
}

export default App
