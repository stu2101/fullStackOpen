import PropTypes from "prop-types"

const LoginForm = (props) => {
    return (
        <form onSubmit={props.onSubmit}>
            <div>
                username <input
                    id="usernameInput"
                    type="text"
                    value={props.usernameValue}
                    name="Username"
                    onChange={({ target }) => props.setUsername(target.value)}
                />
            </div>

            <div>
                password <input
                    id="passwordInput"
                    type="password"
                    value={props.passwordValue}
                    name="Password"
                    onChange={({ target }) => props.setPassword(target.value)}
                />
            </div>
            <button type='submit'>login</button>
        </form>
    )
}

LoginForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
    usernameValue: PropTypes.string.isRequired,
    passwordValue: PropTypes.string.isRequired
}

export default LoginForm