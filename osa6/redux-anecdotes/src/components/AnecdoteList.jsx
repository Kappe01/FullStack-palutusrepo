import { useDispatch, useSelector } from 'react-redux'
import { addVote, sort_anecdotes } from '../reducers/anecdoteReducer'
import { displayNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => {
    if ( state.filter === '' ) {
      return state.anecdotes
    } 
    return state.anecdotes.filter(anecdote =>
      anecdote.content.includes(state.filter)
      )
  })

  const vote = (anecdote) => {
    const id = anecdote.id
    const content = anecdote.content
    console.log('vote', anecdote.id)
    dispatch(addVote({ id }))
    dispatch(displayNotification(`you voted '${content}'`))
    dispatch(sort_anecdotes())
  }
   
  return (
    <div>
      {anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
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