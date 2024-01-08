import { useDispatch } from 'react-redux'
import { addAnecdote, getId } from '../reducers/anecdoteReducer'
import { displayNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const newAnecdote = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    const id = getId()
    const votes = 0
    console.log('add', content)
    event.target.anecdote.value = ''
    dispatch(displayNotification(`you added '${content}'`))
    dispatch(addAnecdote({ content, id, votes }))
  }
  
  return (
    <div>
    <h2>create new</h2>
    <form onSubmit={newAnecdote}>
      <div><input name='anecdote'/></div>
      <button type='submit'>create</button>
    </form>
    </div>
  )
}

export default AnecdoteForm