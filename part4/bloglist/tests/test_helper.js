const Blog = require("../models/blog");

const initialBlogs = [
    {
        title: "First blog",
        author: "First Author",
        likes: 3
    },
    {
        title: "Second blog",
        author: "Second Author",
        likes: 5
    },
    {
        title: "Third blog",
        author: "Third Author",
        likes: 0
    }
]

// this functing should return what is currently in the database
const getBlogsInDb = async () => {
    // get all blogs in db and store then in variable
    const blogs = await Blog.find({});

    // return an array consisting of blogs in the corrent format
    return blogs.map(blog => blog.toJSON());
}

const getNonExistingId = async () => {
    const blog = new Blog({title: "willremovethissoon"})
    await blog.save();
    await blog.remove();

    return blog._id.toString();
}

module.exports = {
    initialBlogs,
    getBlogsInDb,
    getNonExistingId
}