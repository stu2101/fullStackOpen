const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);

const Blog = require('../models/blog');
const User = require("../models/user")

const user = {
    username: "test",
    password: "test"
}

const userObject = new User(user);

let token = "";

api
    .post("/api/login")
    .send(user)
    .then(response => {
        token = response.body.token;
    })


beforeEach(async () => {
    await Blog.deleteMany({});

    const blogObjects = helper.initialBlogs
        .map(blog => new Blog({ ...blog, user: userObject }));

    const promiseArray = blogObjects
        .map(blog => blog.save());

    await Promise.all(promiseArray);
})

describe("when there is initially some blogs saved", () => {
    test("correct amount of blog posts are returned and are in the JSON format", async () => {
        const response = await api
            .get("/api/blogs")
            .expect(200)    // status code OK. Operation was successful
            .expect("Content-Type", /application\/json/)    // blogs are returned as JSON

        expect(response.body).toHaveLength(helper.initialBlogs.length);
    })

    test("blog posts contain id property", async () => {
        const response = await api
            .get("/api/blogs")

        response.body.forEach(blog => {
            expect(blog.id).toBeDefined();
        });
    })
})


describe("addition of a new blog", () => {
    test("succeeds with valid data ", async () => {
        const newBlog = {
            title: "Temp Title",
            author: "Temp Author",
            url: "Some url",
            likes: 0
        }

        await api
            .post("/api/blogs")
            .set({ "Authorization": "bearer " + token })
            .send(newBlog)
            .expect(201)
            .expect("Content-Type", /application\/json/)

        const blogsAtEnd = await helper.getBlogsInDb();
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

        // newBlog doesn't have id. So in order to do an exact comparison, we save the id of the last element in the database
        // (which should be newBlog in the database, and since it's in the database it has id), and add it as the "id" field of 
        // the locally declared newBlog variable in the comparison
        const lastBlogId = blogsAtEnd[blogsAtEnd.length - 1].id;

        // same goes for user
        const lastBlogUser = blogsAtEnd[blogsAtEnd.length - 1].user;
        const lastBlog = { ...newBlog, id: lastBlogId, user: lastBlogUser }
        expect(blogsAtEnd).toContainEqual(lastBlog)
    });


    test("without likes property defaults likes to zero", async () => {
        const blogWithoutLikes = {
            title: "Temp Title",
            author: "Temp Author",
            url: "some url"
        }

        await api
            .post("/api/blogs")
            .set({ "Authorization": "bearer " + token })
            .send(blogWithoutLikes)
            .expect(201)
            .expect("Content-Type", /application\/json/)

        const blogsAtEnd = await helper.getBlogsInDb();
        expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0);
    })


    test("fails without title or url provided", async () => {
        const blogWithoutTitleAndUrl = {
            author: "some guy",
            likes: 6
        }

        await api
            .post("/api/blogs")
            .set({ "Authorization": "bearer " + token })
            .send(blogWithoutTitleAndUrl)
            .expect(400)

        const blogsAtEnd = await helper.getBlogsInDb();
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
    })


    test("fails without token provided", async () => {
        const newBlog = {
            title: "Temp Title",
            author: "Temp Author",
            url: "Some url",
            likes: 0
        }

        await api
            .post("/api/blogs")
            .send(newBlog)
            .expect(401)

        const blogsAtEnd = await helper.getBlogsInDb();
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })
})

// This test is broken but it isn't required to fix it in order to complete this part - from the 4.23 requirements:
// "After adding token based authentication the tests for adding a new blog broke down. Fix the tests."
test("a blog can be deleted", async () => {
    const blogsAtStart = await helper.getBlogsInDb();

    await api
        .delete(`/api/blogs/${blogsAtStart[0].id}`)
        .set({ "Authorization": "bearer " + token })
        .expect(204)
})

test("the likes of a blog can be edited", async () => {
    const updatedBlog = {
        likes: 1000000
    }

    const blogs = await helper.getBlogsInDb();
    const firstBlog = blogs[0];

    await api
        .put(`/api/blogs/${firstBlog.id}`)
        .send(updatedBlog)
        .expect(200)

    const blogsAtEnd = await helper.getBlogsInDb();
    expect(blogsAtEnd[0].likes).toBe(updatedBlog.likes);
})

afterAll(() => {
    mongoose.connection.close()
})