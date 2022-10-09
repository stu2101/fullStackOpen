const blogRouter = require("express").Router();
const Blog = require("../models/blog")
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../utils/config');

blogRouter.get("/", async (request, response) => {
    const allBlogs = await Blog
        .find({})
        .populate("user", { username: 1, name: 1 })

    response.json(allBlogs)

    // // sometimes the db gets clogged and need a way to clear it
    // Blog
    //     .deleteMany({})
    //     .then(() => {
    //         response.status(204).end();
    //     })
})

blogRouter.get("/:id", (request, response, next) => {
    Blog
        .findById(request.params.id)
        .then(blog => {
            if (blog) {
                response.json(blog)
            }
            else {
                response.status(404).end();
            }
        })
        .catch(error => next(error))
})

blogRouter.post("/", async (request, response, next) => {
    const body = request.body;
    const token = request.token
    const decodedToken = jwt.verify(token, config.SECRET)

    if (!decodedToken.id) {
        return response.status(401).json({ error: "token missing or invalid" })
    }

    const user = await User.findOne({});

    if (body.title === undefined || body.url === undefined) {
        return response.status(400).end();
    }

    // MAY NEED EDITING LATER
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: user._id
    })

    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();

    response.status(201).json(savedBlog);
})

blogRouter.delete("/:id", async (request, response, next) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end();
})

blogRouter.put("/:id", async (request, response, next) => {
    const blog = {
        likes: request.body.likes
    }

    const updatedBlog = await Blog
        .findByIdAndUpdate(request.params.id, blog, { new: true })

    response.json(updatedBlog);
})

module.exports = blogRouter;