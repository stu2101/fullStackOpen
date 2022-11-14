describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            name: 'test',
            username: 'test',
            password: 'test'
        }
        cy.request("POST", "http://localhost:3003/api/users", user)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function () {
        cy.get("#usernameInput")
        cy.get("#passwordInput")
    })

    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            cy.get("#usernameInput").type("test")
            cy.get("#passwordInput").type("test")
            cy.contains("login").click();
            cy.contains("test logged in")
            cy.get("#logoutButton")
        })

        it('fails with wrong credentials', function () {
            cy.get("#usernameInput").type("test")
            cy.get("#passwordInput").type("wrong")
            cy.contains("login").click();

            cy.get(".error")
                .contains("Wrong username or password")
                .should('have.css', 'color', 'rgb(139, 0, 0)')

            cy.get('html').should('not.contain', 'test logged in')
        })
    })

    describe('When logged in', function () {
        beforeEach(function () {
            cy.login({ username: "test", password: "test" })
            cy.createBlog({ title: "first blog", author: "test", url: "test" })
            cy.createBlog({ title: "second blog", author: "test", url: "test" })
            cy.createBlog({ title: "third blog", author: "test", url: "test" })
        })

        it('a blog can be created', function () {
            cy.get("html")
                .should("not.contain", "another blog")

            cy.contains("new blog").click()

            cy.get(".inputTitle").type("another blog")
            cy.get(".inputAuthor").type("test")
            cy.get(".inputUrl").type("test")
            cy.get(".buttonCreate").click()

            cy.get(".notification")
                .contains("Blog added successfully")

            cy.contains("another blog")
        })

        it("users can like a blog", function () {
            cy.contains("first blog")
                .contains("show").click()

            cy.get(".details")
                .contains("likes 0")
                .get(".buttonLike").click()

            cy.get(".details")
                .contains("likes 1")
        })

        it("only the blogs created by the user can be deleted", function () {
            cy.get("#logoutButton").click()

            const newUser = {
                name: 'newTest',
                username: 'newTest',
                password: 'newTest'
            }

            const newBlog = {
                title: "blog created by new user",
                author: "newTest",
                url: "newTest"
            }

            cy.request("POST", "http://localhost:3003/api/users", newUser)

            cy.login({ username: newUser.username, password: newUser.password })
            cy.createBlog(newBlog)

            cy.contains("first blog")
                .parent()
                .should("not.contain", "remove")

            cy.contains(newBlog.title)
                .parent()
                .contains("remove")
                .should("have.id", "removeButton")
                .click()

            cy.get("html").should("not.contain", newBlog.title)
        })

        it("blogs are sorted according to likes", function () {

            cy.contains("second blog")
                .contains("show").click()
                .get(".details")
                .get(".buttonLike")
                .click().click().click()
                .parent().parent()
                .contains("hide")
                .click()

            cy.contains("third blog")
                .contains("show").click()
                .get(".details")
                .get(".buttonLike")
                .click()

            cy.reload()
                .login({ username: "test", password: "test" })

            cy.get('.title-and-author').eq(0).should('contain', 'second blog')
            cy.get('.title-and-author').eq(1).should('contain', 'third blog')
            cy.get('.title-and-author').eq(2).should('contain', 'first blog')
        })
    })
})