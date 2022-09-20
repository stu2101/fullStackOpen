const blogRouter = require("express").Router();
const Blog = require("../models/blog")

blogRouter.get("/", (request, response) => {
    Blog
        .find({})
        .then(allBlogs => {
            response.json(allBlogs);
        })
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

blogRouter.post("/", (request, response, next) => {
    const body = request.body;

    // MAY NEED EDITING LATER
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: 0
    })

    blog.save()
        .then(savedBlog => {
            response.json(savedBlog)
        })
        .catch(error => next(error))
})

blogRouter.delete("/:id", (request, response, next) => {
    Blog
        .findByIdAndRemove(request.params.id)
        .then(response => {
            response.status(204).end();
        })
        .catch(error => next(error))
})

blogRouter.put("/:id", (request, response, next) => {
    const body = request.body;

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    Blog
        .findByIdAndUpdate(request.params.id, blog, { new: true })
        .then(updatedNote => {
            response.json(updatedNote)
        })
        .catch(error => next(error))
})

module.exports = blogRouter;