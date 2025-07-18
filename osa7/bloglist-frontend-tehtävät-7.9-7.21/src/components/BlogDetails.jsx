import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { updateBlog } from '../features/blog/blogsSlice'
import styled from 'styled-components'
import blogService from '../services/blogs'
//STYLES
const BlogContainer = styled.div`
  background-color: #171717;
  padding: 20px 40px;
  border-radius: 10px;
  color: white;
  font-family: Arial, Helvetica, sans-serif;
  margin: 20px auto;
  max-width: 700px;
`

const Title = styled.h2`
  font-size: 24px;
  margin-bottom: 16px;
`

const UrlLink = styled.a`
  color: #5079ff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`

const Likes = styled.p`
  margin: 16px 0;
`

const LikeButton = styled.button`
  background-color: #5079ff;
  color: white;
  padding: 8px 14px;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  margin-left: 8px;

  &:hover {
    background-color: #1d50f6;
  }
`

const AddedBy = styled.p`
  color: #ccc;
`

//LOGIC
const BlogDetails = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const blog = useSelector((store) => store.blogs.find((b) => b.id === id))
  const user = useSelector((store) => store.user)

  if (!blog) return null

  const handleLike = async () => {
    const updatedBlog = await blogService.update(blog.id, {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    })
    dispatch(updateBlog({ ...updatedBlog, user: blog.user }))
  }

  return (
    <BlogContainer>
      <Title>
        {blog.title} — {blog.author}
      </Title>
      <UrlLink href={blog.url} target="_blank" rel="noopener noreferrer">
        {blog.url}
      </UrlLink>
      <Likes>
        {blog.likes} likes
        <LikeButton onClick={handleLike}>Like</LikeButton>
      </Likes>
      <AddedBy>added by {blog.user.name}</AddedBy>
    </BlogContainer>
  )
}

export default BlogDetails
