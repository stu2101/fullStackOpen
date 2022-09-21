const dummy = (blogs) => {
    return 1;
}

const totalLikes = (blogPosts) => {
    return blogPosts
        .map(blog => blog.likes)
        .reduce((initial, next) => initial + next, 0)
}

const favoriteBlog = (blogs) => {
    const mostLiked = blogs.reduce((initial, next) => {
        return next.likes > initial.likes
            ? next
            : initial
    }, { likes: 0 })

    return mostLiked;
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}