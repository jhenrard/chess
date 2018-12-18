import React from 'react'

import {DragDropContextProvider} from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import {Board} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <DragDropContextProvider backend={HTML5Backend}>
        <Board />
      </DragDropContextProvider>

      {/* // Boilermaker code I don't need for the chess app
      <Navbar />
      <Routes /> */}
    </div>
  )
}

export default App
