import { useSelector } from "react-redux"
import UserStatistic from "./UserStatistic"

const Users = (props) => {
    const blogs = useSelector(state => [...state.blogs])
    const usernames = blogs.map(blog => blog.user.username)

    let usersAndBlogs = {
    }

    for (let i = 0; i < usernames.length; i++) {
        if (usersAndBlogs.hasOwnProperty(usernames[i])) {
            usersAndBlogs[usernames[i]] = usersAndBlogs[usernames[i]] + 1;
        }
        else {
            usersAndBlogs[usernames[i]] = 1;
        }
    }

    const userStats = Object.entries(usersAndBlogs)

    return (
        <div>
            <h2>blogs</h2>
            <h2>Users</h2>
            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>blogs created</th>
                    </tr>
                    {userStats.map(user => <UserStatistic key={user[0]} username={user[0]} number={user[1]} />)}
                </tbody>
            </table>
        </div>
    )
}

export default Users