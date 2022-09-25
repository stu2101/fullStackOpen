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

afterAll(() => {
    mongoose.connection.close()
})