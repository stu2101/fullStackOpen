import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
    name: "blog",
    initialState: [],
    reducers: {
        setBlogs(state, action) {
            return action.payload
        },
        addBlog(state, action) {
            return state.concat(action.payload)
        },
        deleteBlog(state, action) {
            const id = action.payload
            return state.filter(b => b.id !== id)
        },
        like(state, action) {
            const id = action.payload
            const likedBlog = state.find(b => b.id === id)
            return state.map(b => b.id !== id ? b : {...likedBlog, likes: likedBlog.likes + 1})
        }
    }
})

export const {setBlogs, addBlog, deleteBlog, like} = blogSlice.actions

export const initializeBlogs = () => {
    return async dispatch => {
        const allBlogs = await blogService.getAll();
        dispatch(setBlogs(allBlogs))
    }
}

export const createNew = (blogObject) => {
    return async dispatch => {
        const newBlog = await blogService.create(blogObject)
        dispatch(addBlog(newBlog))
    }
}

export const removeBlog = (id) => {
    return async dispatch => {
        await blogService.remove(id)
        dispatch(deleteBlog(id))
    }
}

export const likeBlog = (id) => {
    return async dispatch => {
        const allBlogs = await blogService.getAll()
        const likedBlog = allBlogs.find(b => b.id === id)
        await blogService.update(id, {...likedBlog, likes: likedBlog.likes + 1})
        dispatch(like(id))
    }
}

export default blogSlice.reducer