import { useState } from 'react'
import { UPDATE_BIRTHDATE, ALL_AUTHORS, ALL_BOOKS } from '../queries'
import { useMutation } from '@apollo/client'
import GroupedSelect from './GroupedSelect'


const UpdateBirthdate = () => {
    const [name, setName] = useState('')
    const [born, setBorn] = useState('')
    const [updateBirthdate] = useMutation(UPDATE_BIRTHDATE,
        {
            refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }]
        }
    )


    const submit = async (event) => {
        event.preventDefault()

        updateBirthdate({
            variables: {
                name,
                setBornTo: Number(born)
            }
        })

        console.log('Birthdate updated...')

        setName('')
        setBorn('')

    }



    return (
        <div>
            <h2>Update Birthdate</h2>
            <form onSubmit={submit}>
                <div>
                    Name
                    <GroupedSelect value={name} onChange={setName} />
                </div>
                <div>
                    Born
                    <input
                        value={born}
                        onChange={({ target }) => setBorn(target.value)}
                    />
                </div>

                <button type="submit">Update author</button>
            </form>
        </div>
    )
}

export default UpdateBirthdate