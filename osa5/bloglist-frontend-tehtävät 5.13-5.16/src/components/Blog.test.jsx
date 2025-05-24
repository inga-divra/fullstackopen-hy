/* eslint-disable */

import { test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

test('renders blog title and author, not url and likes', () => {
    const blog = {
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        user: {
            username: "mluukkai",
            name: "Matti Luukkainen",
            id: "6817a0c05297ef9a6ad68506"
        },
        id: "6825871ec6b1f28cad92d29b"
    }

    render(<Blog blog={blog} user={blog.user} handleLike={() => { }} handleDelete={() => { }} />)


    const contentToShow = screen.getByText(content =>
        content.includes('TDD harms architecture') && content.includes('Robert C. Martin')
    )
    expect(contentToShow).toBeDefined()

    expect(screen.queryByText(blog.url)).toBeNull()
    expect(screen.queryByText('likes: 0')).toBeNull()
})

test('show likes,url and user after pressing the VIEW btn', async () => {
    const user = userEvent.setup()

    const blog = {
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        user: {
            username: "mluukkai",
            name: "Matti Luukkainen",
            id: "6817a0c05297ef9a6ad68506"
        },
        id: "6825871ec6b1f28cad92d29b"
    }

    render(<Blog blog={blog} user={blog.user} handleLike={() => { }} handleDelete={() => { }} />)

    const viewBtn = screen.getByText('view')
    await user.click(viewBtn)


    expect(screen.queryByText(blog.url)).toBeDefined()
    expect(screen.queryByText(blog.user.name)).toBeDefined()
    expect(screen.queryByText('likes: 0')).toBeDefined()
})

test('show e.handler 2x if user clicked the LIKE btn twice', async () => {
    const user = userEvent.setup()

    const blog = {
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        user: {
            username: "mluukkai",
            name: "Matti Luukkainen",
            id: "6817a0c05297ef9a6ad68506"
        },
        id: "6825871ec6b1f28cad92d29b"
    }


    const mockHandler = vi.fn()

    render(<Blog blog={blog} user={blog.user} handleLike={mockHandler} handleDelete={() => { }} />)


    const viewBtn = screen.getByText('view')
    await user.click(viewBtn)

    const likeBtn = screen.getByText('like')
    await user.click(likeBtn)
    await user.click(likeBtn)


    expect(mockHandler.mock.calls).toHaveLength(2)
})