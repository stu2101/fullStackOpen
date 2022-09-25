const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);

const Blog = require('../models/blog');

beforeEach(async () => {
    await Blog.deleteMany({});

    const blogObjects = helper.initialBlogs
        .map(blog => new Blog(blog));

    const promiseArray = blogObjects
        .map(blog => blog.save());

    await Promise.all(promiseArray);
})

test(" application returns the correct amount of blog posts in the JSON format", async () => {
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

test("blogs posts can be added", async () => {
    const newBlog = {
        title: "Temp Title",
        author: "Temp Author",
        url: "Some url",
        likes: 0
    }

    await api
        .post("/api/blogs")
        .send(newBlog)
        .expect(201)
        .expect("Content-Type", /application\/json/)

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    // newBlog doesn't have id. So in order to do an exact comparison, we save the id of the last element in the database
    // (which should be newBlog in the database, and since it's in the database it has id), and add it as the "id" field of 
    // the locally declared newBlog variable in the comparison
    const lastBlogId = blogsAtEnd[blogsAtEnd.length - 1].id;
    expect(blogsAtEnd).toContainEqual({ ...newBlog, id: lastBlogId })
});

test("blogs without likes property default likes to zero", async () => {
    const blogWithoutLikes = {
        title: "Temp Title",
        author: "Temp Author",
        url: "some url"
    }

    await api
        .post("/api/blogs")
        .send(blogWithoutLikes)
        .expect(201)
        .expect("Content-Type", /application\/json/)

    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0);
})

test("blogs without title or url are not added", async () => {
    const blogWithoutTitleAndUrl = {
        author: "some guy",
        likes: 6
    }

    await api
        .post("/api/blogs")
        .send(blogWithoutTitleAndUrl)
        .expect(400)
    
    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
})

afterAll(() => {
    mongoose.connection.close()
})