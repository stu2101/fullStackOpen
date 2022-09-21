const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogPosts) => {
    return blogPosts
        .map(blog => blog.likes)
        .reduce((initial, next) => initial + next, 0)
}

module.exports = {
    dummy,
    totalLikes
}