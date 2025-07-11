import { useDispatch, useSelector } from "react-redux";
import { handleVoteAnecdote } from "../reducers/anecdoteReducer";
import { showNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)

    const filteredAnecdotes = anecdotes.filter(a => {
        return a.content.toLowerCase().includes(filter.toLowerCase())
    })

    const vote = (anecdote) => {
        dispatch(handleVoteAnecdote(anecdote))
        dispatch(showNotification(`you voted '${anecdote.content}'`))

        setTimeout(() => {
            dispatch(removeNotification())
        }, 5000);
    }


    const sortedAnecdotes = filteredAnecdotes.slice().sort((a, b) => b.votes - a.votes)
    return (
        <div>
            {sortedAnecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList
