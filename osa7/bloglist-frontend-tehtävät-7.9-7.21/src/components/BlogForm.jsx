import { useState } from 'react'
import styled from 'styled-components'

//STYLES
const FormContainer = styled.div`
  background-color: #171717;
  padding: 20px 30px;
  border-radius: 10px;
  color: white;
  font-family: Arial, Helvetica, sans-serif;
  max-width: 600px;
  margin: 0 auto;
`

const Title = styled.h2`
  margin-bottom: 20px;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
`

const Label = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
`

const Input = styled.input`
  padding: 8px 10px;
  border-radius: 5px;
  border: 1px solid #333;
  background-color: #222;
  color: white;

  &:focus {
    outline: none;
    border-color: #555;
  }
`

const Button = styled.button`
  background-color: #5079ff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  align-self: flex-start;

  &:hover {
    background-color: #3a61d8;
  }
`
const CreateButton = styled.button`
  text-decoration: none;
  color: white;
  font-family: Arial, Helvetica, sans-serif;
  font-weight: 500;
  font-size: 18px;
  padding: 12px 36px;
  border-radius: 5px;
  background-color: #5079ff;
  border: 2px solid #cccccc;
  max-width: 200px;
  margin: 10px auto;

  cursor: pointer;

  &:hover {
    background-color: #1d50f6;
  }
`

//LOGIC
const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()

    createBlog({
      title,
      author,
      url,
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <FormContainer>
      <Title>Create new blog</Title>
      <Form onSubmit={handleSubmit}>
        <InputGroup>
          <Label htmlFor="title">Title</Label>
          <Input
            type="text"
            value={title}
            name="title"
            onChange={({ target }) => setTitle(target.value)}
            placeholder="Title"
          />
        </InputGroup>
        <InputGroup>
          <Label htmlFor="author">Author</Label>
          <Input
            type="text"
            value={author}
            name="author"
            onChange={({ target }) => setAuthor(target.value)}
            placeholder="Author"
          />
        </InputGroup>
        <InputGroup>
          <Label htmlFor="url">Link</Label>
          <Input
            type="text"
            value={url}
            name="url"
            onChange={({ target }) => setUrl(target.value)}
            placeholder="Link"
          />
        </InputGroup>
        <CreateButton type="submit">Create</CreateButton>
      </Form>
    </FormContainer>
  )
}

export default BlogForm
