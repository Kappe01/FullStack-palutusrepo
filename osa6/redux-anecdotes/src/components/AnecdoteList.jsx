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
    console.log('vote', anecdote.id)
    dispatch(addVote(anecdote))
    dispatch(displayNotification(`you voted '${anecdote.content}'`, 10))
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