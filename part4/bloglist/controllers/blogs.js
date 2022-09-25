const blogRouter = require("express").Router();
const Blog = require("../models/blog")

blogRouter.get("/", (request, response) => {
    Blog
        .find({})
        .then(allBlogs => {
            response.json(allBlogs);
        })

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

blogRouter.post("/", (request, response, next) => {
    const body = request.body;

    if (body.title === undefined || body.url === undefined) {
        response.status(400).end();
    }
    else {
        // MAY NEED EDITING LATER
        const blog = new Blog({
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes || 0
        })

        blog.save()
            .then(savedBlog => {
                response.status(201).json(savedBlog)
            })
            .catch(error => next(error))
    }
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
        .then(updatedBlog => {
            response.json(updatedBlog)
        })
        .catch(error => next(error))
})

module.exports = blogRouter;