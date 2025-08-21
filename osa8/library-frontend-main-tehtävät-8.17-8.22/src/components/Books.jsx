/* eslint-disable react/prop-types */
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'
import { useState } from 'react'

const Books = (props) => {
  const [selectedGenre, setSelectedGenre] = useState(null)

  const filteredByGenreBooks = useQuery(ALL_BOOKS, {
    variables: selectedGenre ? { genre: selectedGenre } : {}
  })

  const allBooks = useQuery(ALL_BOOKS)

  if (!props.show) {
    return null
  }

  if (filteredByGenreBooks.loading || allBooks.loading) {
    return <div>Loading...</div>
  }

  if (filteredByGenreBooks.error || allBooks.error) {
    return <div>Error: {filteredByGenreBooks.error.message || allBooks.error.message}</div>
  }

  // get all filtered books 
  const filteredBooks = filteredByGenreBooks.data.allBooks

  //get all genres
  let allGenres = []
  allBooks.data.allBooks.forEach((book) => {
    allGenres = allGenres.concat(book.genres)
  })

  const genres = [...new Set(allGenres)]

  return (
    <div>
      <h2>Books</h2>

      {selectedGenre && <p>in genre <span style={{ fontWeight: 'bold' }}>{selectedGenre}</span></p>}

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>Author </th>
            <th>Published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Genres buttons */}
      <div >

        {genres.map((genre, index) => {
          return <button type='button'
            key={index}
            onClick={() => setSelectedGenre(genre)}>
            {genre}
          </button>
        })}

        <button type='button' onClick={() => setSelectedGenre(null)}>
          all genres
        </button>
      </div>
    </div>
  )
}

export default Books
