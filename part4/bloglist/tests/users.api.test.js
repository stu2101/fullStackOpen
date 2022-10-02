const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require("./test_helper");
const app = require("../app");
const api = supertest(app);

const User = require("../models/user");
const bcryptjs = require('bcryptjs');

// beforeEach(async () => {
// 
// })

describe("users are not created if", () => {
    test("password isn't provided", async () => {
        const newUser = {
            username: "test",
            name: "test"
        }

        const result = await api
            .post("/api/users")
            .send(newUser)
            .expect(400)

        expect(result.body.error).toContain("password is required")
    })

    test("password is too short", async () => {
        const newUser = {
            username: "test",
            name: "test",
            password: "t"
        }

        const result = await api
            .post("/api/users")
            .send(newUser)
            .expect(400)

        expect(result.body.error).toContain("password must be at least 3 characters")
    })

    test("username already exists", async () => {
        const newUser = {
            username: "test",
            name: "test",
            password: "test"
        }

        await api
            .post("/api/users")
            .send(newUser)

        const result = await api
            .post("/api/users")
            .send(newUser)
            .expect(400)

        expect(result.body.error).toContain("username must be unique")
    })

    test("username isn't provided", async () => {
        const newUser = {
            name: "test",
            password: "test"
        }

        await api
            .post("/api/users")
            .send(newUser)
            .expect(400)
    })

    test("username is too short", async () => {
        const newUser = {
            username: "t",
            name: "test",
            password: "test"
        }
    })


})

afterAll(() => {
    mongoose.connection.close()
})