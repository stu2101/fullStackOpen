import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from "./Blog"

const user = {
    username: "test username",
    name: "test name"
}

const blog = {
    title: "test title",
    author: "test author",
    url: "test url",
    likes: 5,
    user: {
        user
    }
}



test("By default, only the blog's title and author are displayed", async () => {
    const { container } = render(<Blog blog={blog} user={user} />)

    const titleAndAuthor = container.querySelector(".title-and-author")
    const details = container.querySelector(".details")

    expect(titleAndAuthor.textContent).toBe(`${blog.title} ${blog.author} show`)
    expect(details).toBe(null)
})

test("The blog's url and number of likes appear when the \"show\" button is clicked", async () => {
    const { container } = render(<Blog blog={blog} user={user} />)

    const mockUser = userEvent.setup()
    const buttonShow = container.querySelector(".buttonShow")

    await mockUser.click(buttonShow)

    const titleAndAuthor = container.querySelector(".title-and-author")
    const details = container.querySelector(".details")

    expect(titleAndAuthor).toBe(null)
    expect(details.textContent).toContain(blog.title, blog.author, blog.url, blog.likes, blog.user.name)
})

test("when the like button is clicked twice, the event handler is called twice", async () => {
    const mockUser = userEvent.setup()
    const mockInscreaseLikes = jest.fn()
    const { container } = render(<Blog blog={blog} user={user} increaseLikesTest={mockInscreaseLikes}/>)

    const buttonShow = container.querySelector(".buttonShow")
    await mockUser.click(buttonShow)

    const buttonLike = container.querySelector(".buttonLike")
    await mockUser.click(buttonLike)
    await mockUser.click(buttonLike)

    expect(mockInscreaseLikes.mock.calls).toHaveLength(2)


})

