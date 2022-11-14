import { createSlice } from "@reduxjs/toolkit";

let id;

const messageSlice = createSlice({
    name: "notification",
    initialState: {message: null, type: ""},
    reducers: {
        showMessage(state, action) {
            if (id !== null) {
                clearTimeout(id)
            }
            return {...state, message: action.payload}
        },
        hideMessage(state, action) {
            id = null;
            return {message: null, type: ""}
        },
        setType(state, action) {
            return {...state, type: action.payload}
        }
    }
})

export const { showMessage, hideMessage, setType } = messageSlice.actions

export const setNotification = (type, text, seconds) => {
    return async dispatch => {
        dispatch(setType(type))
        dispatch(showMessage(text))
        const durationInMs = seconds * 1000

        id = setTimeout(() => dispatch(hideMessage()), durationInMs)
    }
}

export default messageSlice.reducer