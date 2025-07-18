import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { useRef } from 'react'
import styled from 'styled-components'

import Togglable from './Togglable'
import BlogForm from './BlogForm'

import blogService from '../services/blogs'
import { addBlog } from '../features/blog/blogsSlice'

//STYLES
const BlogListContainer = styled.div`
  background-color: #171717;
  padding: 20px 40px;
  border-radius: 10px;
  color: white;
  font-family: Arial, Helvetica, sans-serif;
  margin: 20px auto;
  max-width: 700px;
`

const BlogListUl = styled.ul`
  list-style: none;
  padding-left: 0;
`

const BlogListItem = styled.li`
  background-color: #222;
  padding: 10px 15px;
  margin-bottom: 8px;
  border-radius: 5px;
  border: 1px solid #333;
`

const BlogLink = styled(Link)`
  color: #5079ff;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`

const StyledButton = styled.button`
  background-color: #5079ff;
  color: white;
  padding: 16px 22px;
  border: 2px solid #cccccc;
  font-family: Arial, Helvetica, sans-serif;
  border-radius: 5px;
  font-weight: 500;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #1d50f6;
  }
`
const TogglableContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #171717;
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
`

//LOGIC
const BlogList = ({ showNotification }) => {
  const blogs = useSelector((store) => store.blogs)
  const user = useSelector((store) => store.user)
  const dispatch = useDispatch()

  const blogFormRef = useRef()

  const addNewBlog = async (newBlog) => {
    try {
      blogFormRef.current.toggleVisibility()
      const createdBlog = await blogService.create(newBlog)
      dispatch(addBlog({ ...createdBlog, user }))
      showNotification(
        `A new blog "${newBlog.title}" by ${newBlog.author} added`,
        'success'
      )
    } catch (error) {
      console.error(error)
      showNotification('Error adding blog', 'error')
    }
  }

  return (
    <BlogListContainer>
      <TogglableContainer>
        <Togglable
          buttonLabel={<StyledButton>Create New Blog</StyledButton>}
          ref={blogFormRef}
        >
          <BlogForm createBlog={addNewBlog} />
        </Togglable>
      </TogglableContainer>

      <BlogListUl>
        {blogs.map((blog) => (
          <BlogListItem key={blog.id}>
            <BlogLink to={`/blogs/${blog.id}`}>
              {blog.title} {blog.author}
            </BlogLink>
          </BlogListItem>
        ))}
      </BlogListUl>
    </BlogListContainer>
  )
}

export default BlogList
