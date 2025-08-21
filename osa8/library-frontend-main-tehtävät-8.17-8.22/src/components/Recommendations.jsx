/* eslint-disable react/prop-types */
import { useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'

const Recommendations = (props) => {
    const loggedUser = useQuery(ME)
    const userFavoriteGenre = loggedUser.data?.me?.favoriteGenre

    const favoriteBooks = useQuery(ALL_BOOKS, {
        variables: { genre: userFavoriteGenre }
    })


    if (!props.show) {
        return null
    }


    if (loggedUser.loading || favoriteBooks.loading) {
        return <div>Loading...</div>
    }

    if (loggedUser.error || favoriteBooks.error) {
        return <div>Error: {loggedUser.error.message || favoriteBooks.error.message}</div>
    }

    if (!favoriteBooks.data || !favoriteBooks.data.allBooks) {
        return <div>No books found for your favorite genre.</div>
    }

    const books = favoriteBooks.data.allBooks

    return (
        <div>
            <h2>Recommendations</h2>
            <p>books in your favorite genre <span style={{ fontWeight: 'bold' }}>{userFavoriteGenre || 'unknown'}</span></p>

            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>Author </th>
                        <th>Published</th>
                    </tr>
                    {books.map((b) => (
                        <tr key={b.title}>
                            <td>{b.title}</td>
                            <td>{b.author.name}</td>
                            <td>{b.published}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Recommendations
