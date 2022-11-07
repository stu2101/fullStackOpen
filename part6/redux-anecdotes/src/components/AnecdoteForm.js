import { connect } from "react-redux";
import { setNotification } from "../reducers/notificationReducer"
import { createNew } from "../reducers/anecdoteReducer"

const AnecdoteForm = (props) => {
    const addNew = async (event) => {
        event.preventDefault();
        const current = event.target.anecdote.value
        event.target.anecdote.value = ""
        props.createNew(current)
        props.setNotification("Added " + current, 3)
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addNew}>
                <input
                    name='anecdote'
                />
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

export default connect(null, {createNew, setNotification})(AnecdoteForm)