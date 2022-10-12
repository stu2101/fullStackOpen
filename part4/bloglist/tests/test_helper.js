const Blog = require("../models/blog");

const initialBlogs = [
    {
        title: "First blog",
        author: "First Author",
        url: "First ULR",
        likes: 3
    },
    {
        title: "Second blog",
        author: "Second Author",
        url: "Second ULR",
        likes: 5
    },
    {
        title: "Third blog",
        author: "Third Author",
        url: "Third ULR",
        likes: 0
    }
]

// this functing should return what is currently in the database
const getBlogsInDb = async () => {
    // get all blogs in db and store then in variable
    const blogs = await Blog.find({});

    // return an array consisting of blogs in the correct format
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