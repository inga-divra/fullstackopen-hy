import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import styled from 'styled-components'


//STYLES
const UserContainer = styled.div`
  background-color: #171717;
  padding: 20px 40px;
  border-radius: 10px;
  color: white;
  font-family: Arial, Helvetica, sans-serif;
  margin: 20px auto;
  max-width: 700px;
`

const UserName = styled.h2`
  margin-bottom: 20px;
  text-decoration: underline;
  color: #5079ff;
`

const SectionTitle = styled.h3`
  margin-bottom: 10px;
`

const BlogList = styled.ul`
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


//LOGIC
const User = () => {
  const { id } = useParams()
  const users = useSelector((store) => store.users)
  const user = users.find((user) => user.id === id)

  if (!user) {
    return null
  }

  return (
    <UserContainer>
      <UserName>{user.name}</UserName>
      <SectionTitle>Added blogs</SectionTitle>
      <BlogList>
        {user.blogs.map((blog) => (
          <BlogListItem key={blog.id}>{blog.title}</BlogListItem>
        ))}
      </BlogList>
    </UserContainer>
  )
}

export default User
