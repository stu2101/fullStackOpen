import { createSlice } from "@reduxjs/toolkit";

let id;

const messageSlice = createSlice({
    name: "message",
    initialState: "",
    reducers: {
        showMessage(state, action) {
            if (id !== null) {
                clearTimeout(id)
            }
            return action.payload
        },
        hideMessage(state, action) {
            id = null;
            return ""
        }
    }
})

export const { showMessage, hideMessage, getMessage } = messageSlice.actions

export const setNotification = (text, seconds) => {
    return async dispatch => {
        dispatch(showMessage(text))
        const durationInMs = seconds * 1000

        id = setTimeout(() => dispatch(hideMessage()), durationInMs)
    }
}

export default messageSlice.reducer