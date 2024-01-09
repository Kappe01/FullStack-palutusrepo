import { createSlice } from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    sort_anecdotes(state) {
      return state.slice().sort((a,b) => b.votes - a.votes)
    },
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    },
    updateAnecdote(state, action) {
      const { id, updatedAnecdote } = action.payload
      return state.map(anecdote =>
        anecdote.id === id ? { ...anecdote, ...updatedAnecdote } : anecdote
      )
    }
  }
})

export const { sort_anecdotes, appendAnecdote, setAnecdotes, updateAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const addAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const addVote = object => {
  return async dispatch => {
    const votes = object.votes + 1
    const content = object.content
    const id = object.id
    const updatedAnecdote = await anecdoteService.addVote({ content, id, votes })
    dispatch(updateAnecdote({ id: id, updatedAnecdote: updatedAnecdote }))
  }
}

export default anecdoteSlice.reducer