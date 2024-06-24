import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App'

const notes = [
  {
    id: 1,
    content: 'HTML is easy',
    important: true
  },
  {
    id: 2,
    content: 'Browser can execute only JavaScript',
    important: false
  },
  {
    id: 3,
    content: 'GET and POST are the most important methods of HTTP protocol',
    important: true
  }
]

const result1 = notes.map(note => note.content)
console.log("content of array 'notes'", result1)

const result2 = notes.map(note => note.id)
console.log("id of array 'notes'", result2)

ReactDOM.createRoot(document.getElementById('root')).render(
  <App notes={notes} />
)