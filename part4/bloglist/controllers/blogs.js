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

blogRouter.delete("/:id", async (request, response, next) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end();
})

blogRouter.put("/:id", async (request, response, next) => {
    const blog = {
        likes: request.body.likes
    }

    const updatedBlog = await Blog
        .findByIdAndUpdate(request.params.id, blog, {new: true})

    response.json(updatedBlog);
})

module.exports = blogRouter;