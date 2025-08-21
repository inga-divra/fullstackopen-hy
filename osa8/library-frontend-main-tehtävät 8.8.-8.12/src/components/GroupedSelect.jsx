/* eslint-disable react/prop-types */
import { useQuery, gql } from '@apollo/client'

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      id
    }
  }
`

const GroupedSelect = (props) => {
    const { value, onChange } = props
    const result = useQuery(ALL_AUTHORS)

    if (result.loading) {
        return <div>Loading...</div>
    }
    if (result.error) {
        return <div>Error: {result.error.message}</div>
    }

    const authors = result.data.allAuthors

    return (
        <select value={value} onChange={(e) => onChange(e.target.value)}>
            <option value=''>Select author</option>
            {authors.map((author) => {
                const { id, name } = author
                return (
                    <option key={id} value={name}>
                        {name}
                    </option>
                )
            })}
        </select>
    )
}


export default GroupedSelect
