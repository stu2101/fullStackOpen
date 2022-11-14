import { useSelector } from "react-redux";

const Message = () => {
    const message = useSelector(state => state.notification.message)
    const type = useSelector(state => state.notification.type)
    if (message === null) {
        return null;
    }

    if (type === "error") {
        return (
            <div className="error">
                {message}
            </div>
        )
    }

    return (
        <div className="notification">
            {message}
        </div>
    )
}

export default Message