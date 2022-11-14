import { createSlice } from "@reduxjs/toolkit";
import loginService from "../services/login";
import blogService from "../services/blogs";
const initialState = { userObject: null, username: "", password: "" }

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser(state, action) {    // argument: userObject
            return { ...state, userObject: action.payload }
        },
        setUsername(state, action) { // argument: username
            return { ...state, username: action.payload }
        },
        setPassword(state, action) { // argument: password
            return { ...state, password: action.payload }
        },
    }
})

export const { setUser, setUsername, setPassword } = userSlice.actions

export const login = (username, password) => {
    return async dispatch => {
        const user = await loginService.login({ username, password });

        window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user))

        blogService.setToken(user.token)
        setUser(user);
        setUsername("")
        setPassword("")
    }
}

export default userSlice.reducer

