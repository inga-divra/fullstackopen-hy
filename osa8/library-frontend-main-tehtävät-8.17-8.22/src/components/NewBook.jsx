/* eslint-disable react/prop-types */
import { useState } from 'react'
import { useMutation, useApolloClient } from '@apollo/client'



import { ADD_BOOK, ALL_AUTHORS, ALL_BOOKS } from '../queries'



const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const client = useApolloClient()


  const [addBook] = useMutation(ADD_BOOK, {
    onError: (error) => {
      console.log(error.graphQLErrors.map(e => e.message).join('\n'))
    },
  })

  if (!props.show) {
    return null
  }

  const submit = async (e) => {
    e.preventDefault()


    const result = await addBook({
      variables: {
        title,
        author,
        published: Number(published),
        genres,
      }
    })

    const addedBook = result.data.addBook

    const uniqueGenres = [...new Set(addedBook.genres)]

    // refetch ALL_BOOKS for each genre
    uniqueGenres.forEach((genre) => {
      client.refetchQueries({
        include: [{
          query: ALL_BOOKS,
          variables: { genre }
        }]
      })
    })

    //refetch ALL_BOOKS without genre (for all genres btn)
    client.refetchQueries({
      include: [{ query: ALL_BOOKS }]
    })


    // and refetch ALL_AUTHORS
    client.refetchQueries({
      include: [{ query: ALL_AUTHORS }]
    })


    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook
