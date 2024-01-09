import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { displayNotification } from '../reducers/notificationReducer'


const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const newAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    console.log('add', content)
    event.target.anecdote.value = ''
    dispatch(displayNotification(`you added '${content}'`, 10))
    dispatch(addAnecdote(content))
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