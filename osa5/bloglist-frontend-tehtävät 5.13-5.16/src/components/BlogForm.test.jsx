/* eslint-disable */

import { test, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import { vi } from 'vitest'

test('<BlogForm /> is created with correct values', async () => {
    const createBlog = vi.fn()
    const user = userEvent.setup()

    render(<BlogForm createBlog={createBlog} />)

    const title = screen.getByPlaceholderText('title')
    const author = screen.getByPlaceholderText('author')
    const url = screen.getByPlaceholderText('url')

    const createBtn = screen.getByText('create')

    await user.type(title, 'TDD harms architecture')
    await user.type(author, 'Robert C. Martin')
    await user.type(url, 'http://blog.cleancoder.com')
    await user.click(createBtn)

    expect(createBlog.mock.calls).toHaveLength(1)

    expect(createBlog.mock.calls[0][0].title).toBe('TDD harms architecture')
    expect(createBlog.mock.calls[0][0].author).toBe('Robert C. Martin')
    expect(createBlog.mock.calls[0][0].url).toBe('http://blog.cleancoder.com')
})