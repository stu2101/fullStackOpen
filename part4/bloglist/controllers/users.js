const bcryptjs = require('bcryptjs');
const userRouter = require("express").Router()
const User = require("../models/user")

userRouter.get("/", async (request, response) => {
    const users = await User
        .find({})
        .populate("blogs", {url: 1, title: 1, author: 1})

    response.json(users);
})

userRouter.post("/", async (request, response) => {
    const { username, name, password } = request.body;

    if (password === undefined) {
        return response.status(400).json({
            error: "password is required"
        });
    }

    if (password.length < 3) {
        return response.status(400).json({
            error: "password must be at least 3 characters"
        })
    }

    if (username === undefined) {
        return response.status(400).json({
            error: "username is required"
        });
    }

    if (username.length < 3) {
        return response.status(400).json({
            error: "username must be at least 3 characters"
        })
    }

    const existingUser = await User.findOne({ username })
    if (existingUser) {
        return response.status(400).json({
            error: "username must be unique"
        });
    }


    const saltRounds = 10;
    const passwordHash = await bcryptjs.hash(password, saltRounds);

    const newUser = new User({
        username,
        name,
        passwordHash
    })

    const savedUser = await newUser.save();

    response.status(201).json(savedUser);

})

module.exports = userRouter;