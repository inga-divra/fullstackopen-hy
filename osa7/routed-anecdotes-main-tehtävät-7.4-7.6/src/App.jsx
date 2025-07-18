import { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route, Link,
  useParams,
  useNavigate
} from 'react-router-dom'
import { useField } from './hooks'


const Menu = () => {
  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link to='/' style={padding}>anecdotes</Link>
      <Link to='/create' style={padding}>create new</Link>
      <Link to='/about' style={padding}>about</Link>
    </div>
  )
}


const Anecdote = ({ anecdotes }) => {
  const { id } = useParams()
  const anecdote = anecdotes.find(a => a.id === Number(id))
  const { content, info, votes } = anecdote

  const style = {
    marginBottom: '20px'
  }

  return <div>
    <h2>{content}</h2>
    <div style={style}>has {votes} votes</div>
    <div style={style}>for more info see <a href={info}>{info}</a></div>
  </div>
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {anecdotes.map((anecdote) => {
        const { id, content } = anecdote
        return (
          <li key={id}>
            <Link to={`/anecdotes/${id}`}>{content}</Link>
          </li>
        )
      })}
    </ul>
  </div>
)


const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  const { addNew, setNotification } = props

  const navigate = useNavigate()

  const content = useField('text')
  const author = useField('text')
  const info = useField('text')
  //content obj destructuring
  const resetContent = content.reset
  const contentInput = {
    type: content.type,
    value: content.value,
    onChange: content.onChange
  }
  //author obj destructuring
  const resetAuthor = author.reset
  const authorInput = {
    type: author.type,
    value: author.value,
    onChange: author.onChange
  }
  //info obj destructuring
  const resetInfo = info.reset
  const infoInput = {
    type: info.type,
    value: info.value,
    onChange: info.onChange
  }

  //SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault()
    addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })

    setNotification(`A new anecdote ${content.value}`)
    setTimeout(() => {
      setNotification('')
    }, 5000)

    navigate('/')
  }


  //RESET
  const handleReset = (e) => {
    e.preventDefault()
    resetContent()
    resetAuthor()
    resetInfo()
  }



  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...contentInput} />
        </div>
        <div>
          author
          <input {...authorInput} />
        </div>
        <div>
          url for more info
          <input {...infoInput} />
        </div>
        <button type='submit'>create</button>
        <button type='button' onClick={handleReset}>reset</button>
      </form>
    </div>
  )

}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')


  const padding = {
    padding: 5
  }

  const notificationStyle = {
    border: '3px solid blue',
    margin: '10px 0',
    padding: '10px',
    backgroundColor: 'lightblue',
    color: 'blue',
    fontSize: '20px'
  }

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }



  return (
    <div>
      <h1>Software anecdotes</h1>

      <Menu />
      {notification && <div style={notificationStyle}>{notification}</div>}
      <Routes>
        <Route path='/' element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path='/about' element={<About />} />
        <Route path='/create' element={<CreateNew addNew={addNew} setNotification={setNotification} />} />
        <Route path='/anecdotes/:id' element={<Anecdote anecdotes={anecdotes} />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default App