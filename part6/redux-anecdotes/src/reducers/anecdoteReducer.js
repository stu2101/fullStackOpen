import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from "../services/anecdotes"

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
    return {
        content: anecdote,
        id: getId(),
        votes: 0
    }
}

const anecdoteSlice = createSlice({
    name: "anecdote",
    initialState: [],
    reducers: {
        voteOn(state, action) {
            const id = action.payload
            const anecdoteToChange = state.find(a => a.id === id)
            const changedAnecdote = { ...anecdoteToChange, votes: anecdoteToChange.votes + 1 }
            return state.map(a => a.id !== id ? a : changedAnecdote)
        },
        appendNew(state, action) {
            return state.concat(action.payload)
        },
        setAll(state, action) {
            return action.payload
        }
    }
})

export const {voteOn, appendNew, setAll} = anecdoteSlice.actions

export const initialize = () => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll()
        dispatch(setAll(anecdotes))
    }
}

export const createNew = (content) => {
    return async dispatch => {
        const newAnecdote = await anecdoteService.appendNew(content)
        dispatch(appendNew(newAnecdote))
    }
}

export const voteAnecdote = (id) => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll()
        const current = anecdotes.find(a => a.id ===id)
        const votedAnecdote = await anecdoteService.update(id, {...current, votes: current.votes + 1})
        dispatch(voteOn(votedAnecdote.id))
    }
}

export default anecdoteSlice.reducer
