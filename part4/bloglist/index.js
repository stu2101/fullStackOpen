const app = require("./app");
const http = require("http");
const config = require("./utils/config");
const logger = require("./utils/logger");

const server = http.createServer(app);

server.listen(config.PORT, () => {
    logger.info("Server running on port", config.PORT);
});


// const http = require('http')
// const express = require('express')
// const app = express()
// const cors = require('cors')
// const mongoose = require('mongoose')
// const config = require("./utils/config");
// const Blog = require("./models/blog")
// require("dotenv").config();
// 
// mongoose.connect(config.MONGODB_URI)
//     .then(() => {
//         console.log("Connected to MongoDB");
//     })
//     .catch(error => {
//         console.log(error.message);
//     })
// 
// app.use(cors())
// app.use(express.json())
// 
// app.get('/api/blogs', (request, response) => {
//     Blog
//         .find({})
//         .then(blogs => {
//             response.json(blogs)
//         })
// })
// 
// app.post('/api/blogs', (request, response) => {
//     const blog = new Blog(request.body)
// 
//     blog
//         .save()
//         .then(savedBlog => {
//             response.json(savedBlog);
//         })
// })
// 
// app.listen(config.PORT, () => {
//     console.log(`Server running on port ${config.PORT}`)
// })