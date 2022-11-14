const UserStatistic = ({ username, number }) => {
    return (
        <tr>
            <td>{username}</td>
            <td>{number}</td>
        </tr>
    )
}

export default UserStatistic