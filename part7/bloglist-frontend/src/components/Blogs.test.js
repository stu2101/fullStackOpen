import React from "react";
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blogs from "./Blogs";

test("the form calls the event handler it received as props with the right details when a new blog is created.", async () => {
    const user = {
        username: "test username",
        name: "test name"
    }

    const blog = {
        title: "test title",
        author: "test author",
        url: "test url",
        likes: 5,
        user
    }

    const createBlog = jest.fn()
    const mockUser = userEvent.setup()
    const { container } = render(<Blogs createBlog={createBlog} user={user} blogs={[blog]}/>)

    await mockUser.click(container.querySelector("buttonNewBlog"))

    const title = container.querySelector(".inputTitle")
    const author = container.querySelector(".inputAuthor")
    const url = container.querySelector(".inputUrl")
    const create = container.querySelector(".buttonCreate")

    await mockUser.type(title, "test title")
    await mockUser.type(author, "test author")
    await mockUser.type(url, "test url")
    await mockUser.click(create)

    expect(createBlog.mock.calls).toHaveLength(1)

    delete blog.likes
    delete blog.user
    expect(createBlog.mock.calls[0][0]).toMatchObject(blog)
})